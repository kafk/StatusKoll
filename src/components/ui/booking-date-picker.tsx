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
  const [step, setStep] = useState<Step>("year-month");
  
  const currentDate = value ? new Date(value) : new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(value ? currentDate.getDate() : null);

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i - 2);

  const handleYearMonthDone = () => {
    setStep("day");
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleFinalDone = () => {
    if (selectedDay) {
      const date = new Date(selectedYear, selectedMonth, selectedDay);
      onChange(format(date, "yyyy-MM-dd"));
      setOpen(false);
      setStep("year-month");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Reset to year-month step when opening
      setStep("year-month");
      if (value) {
        const date = new Date(value);
        setSelectedYear(date.getFullYear());
        setSelectedMonth(date.getMonth());
        setSelectedDay(date.getDate());
      } else {
        setSelectedYear(new Date().getFullYear());
        setSelectedMonth(new Date().getMonth());
        setSelectedDay(null);
      }
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
    return date < minDate;
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full px-3 py-3 bg-muted border rounded-lg font-mono text-sm text-left flex items-center justify-between focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all",
            !value && "text-muted-foreground",
            error ? "border-destructive" : "border-border"
          )}
        >
          <span>{value ? format(new Date(value), "d MMMM yyyy", { locale: sv }) : placeholder}</span>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 pointer-events-auto" align="start">
        {step === "year-month" ? (
          <div className="p-4">
            {/* Year selector */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevYear}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-display font-bold text-lg">{selectedYear}</span>
              <button
                type="button"
                onClick={handleNextYear}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
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
                  onClick={() => setSelectedMonth(index)}
                  className={cn(
                    "py-2 px-3 text-sm rounded-lg transition-all font-mono",
                    selectedMonth === index
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
            
            <Button
              type="button"
              onClick={handleYearMonthDone}
              className="w-full"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="p-4">
            {/* Header showing selected month/year */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setStep("year-month")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Tillbaka
              </button>
              <span className="font-display font-bold">
                {MONTHS[selectedMonth]} {selectedYear}
              </span>
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
            <div className="grid grid-cols-7 gap-1 mb-4">
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={day === null || isDateDisabled(day)}
                  onClick={() => day && handleDaySelect(day)}
                  className={cn(
                    "h-9 w-9 text-sm rounded-lg transition-all font-mono flex items-center justify-center",
                    day === null && "invisible",
                    day !== null && isDateDisabled(day) && "text-muted-foreground opacity-50 cursor-not-allowed",
                    day !== null && !isDateDisabled(day) && selectedDay === day
                      ? "bg-primary text-primary-foreground"
                      : day !== null && !isDateDisabled(day) && "hover:bg-muted"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
            
            <Button
              type="button"
              onClick={handleFinalDone}
              disabled={!selectedDay}
              className="w-full"
            >
              <Check className="h-4 w-4 mr-2" />
              Done
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
