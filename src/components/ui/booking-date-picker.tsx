import * as React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarIcon, Check } from "lucide-react";
import { format, setMonth, setYear, getDaysInMonth, startOfMonth, getDay } from "date-fns";
import { sv } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BookingDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  minDate?: Date;
}

type Step = "year-month" | "day";

const MONTHS = [
  "Januari", "Februari", "Mars", "April", "Maj", "Juni",
  "Juli", "Augusti", "September", "Oktober", "November", "December"
];

const WEEKDAYS = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

export function BookingDatePicker({ value, onChange, placeholder = "Välj datum", error, minDate }: BookingDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("day");
  
  const currentDate = value ? new Date(value) : new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(value ? currentDate.getDate() : null);

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    const date = new Date(selectedYear, selectedMonth, day);
    onChange(format(date, "yyyy-MM-dd"));
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setStep("day");
      if (value) {
        const date = new Date(value);
        setSelectedYear(date.getFullYear());
        setSelectedMonth(date.getMonth());
        setSelectedDay(date.getDate());
      } else {
        const today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
      }
    }
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(y => y - 1);
    } else {
      setSelectedMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(y => y + 1);
    } else {
      setSelectedMonth(m => m + 1);
    }
  };

  const handlePrevYear = () => setSelectedYear(y => y - 1);
  const handleNextYear = () => setSelectedYear(y => y + 1);

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = startOfMonth(new Date(selectedYear, selectedMonth));
    const daysInMonth = getDaysInMonth(firstDay);
    let startDay = getDay(firstDay) - 1; // Convert to Monday = 0
    if (startDay < 0) startDay = 6;
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const isDateDisabled = (day: number) => {
    if (!minDate) return false;
    const date = new Date(selectedYear, selectedMonth, day);
    // Strip time for clean comparison
    const minDateOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return date < minDateOnly;
  };

  const isSelected = (day: number) => {
    if (!value || selectedDay !== day) return false;
    const date = new Date(value);
    return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth && date.getDate() === day;
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm text-left flex items-center justify-between focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer",
            !value && "text-muted-foreground",
            error ? "border-destructive" : "border-border"
          )}
        >
          <span>{value ? format(new Date(value), "d MMMM yyyy", { locale: sv }) : placeholder}</span>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 pointer-events-auto z-[1200] bg-card border border-border shadow-2xl" align="start">
        {step === "year-month" ? (
          <div className="p-4">
            {/* Year selector */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevYear}
                className="p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-display font-bold text-lg">{selectedYear}</span>
              <button
                type="button"
                onClick={handleNextYear}
                className="p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            {/* Month grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {MONTHS.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => {
                    setSelectedMonth(index);
                    setStep("day");
                  }}
                  className={cn(
                    "py-2 px-3 text-sm rounded-lg transition-all font-mono cursor-pointer",
                    selectedMonth === index
                      ? "bg-primary text-primary-foreground font-bold"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Header showing selected month/year with prev/next buttons */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                title="Föregående månad"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep("year-month")}
                className="font-display font-bold text-sm hover:text-primary transition-colors cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted"
                title="Välj månad och år"
              >
                <span>{MONTHS[selectedMonth]} {selectedYear}</span>
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                title="Nästa månad"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {WEEKDAYS.map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground font-mono py-1">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={day === null || isDateDisabled(day)}
                  onClick={() => day && handleDaySelect(day)}
                  className={cn(
                    "h-9 w-9 text-sm rounded-lg transition-all font-mono flex items-center justify-center cursor-pointer",
                    day === null && "invisible pointer-events-none",
                    day !== null && isDateDisabled(day) && "text-muted-foreground/40 opacity-40 cursor-not-allowed",
                    day !== null && !isDateDisabled(day) && isSelected(day)
                      ? "bg-primary text-primary-foreground font-bold shadow-sm"
                      : day !== null && !isDateDisabled(day) && "hover:bg-primary/20 text-foreground"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
