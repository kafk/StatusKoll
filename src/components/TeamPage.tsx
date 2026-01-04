import { useState } from 'react';
import { useTeam, TeamRole } from '@/hooks/useTeam';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Trash2, Mail, Crown, Briefcase, Sparkles } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const TeamPage = () => {
  const { teamMembers, loading, addTeamMember, removeTeamMember, getRoleLabel } = useTeam();
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<TeamRole>('partner');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMember = async () => {
    if (!newEmail.trim()) return;

    setIsAdding(true);
    await addTeamMember(newEmail.trim(), newName.trim(), newRole);
    setNewEmail('');
    setNewName('');
    setNewRole('partner');
    setIsAdding(false);
  };

  const getRoleIcon = (role: TeamRole) => {
    switch (role) {
      case 'owner':
      case 'co_owner':
        return <Crown className="w-4 h-4 text-warning" />;
      case 'partner':
        return <Briefcase className="w-4 h-4 text-primary" />;
      case 'cleaner':
        return <Sparkles className="w-4 h-4 text-secondary" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleDescription = (role: TeamRole) => {
    switch (role) {
      case 'co_owner':
        return 'Full åtkomst till allt';
      case 'partner':
        return 'Kan se bokningar (begränsad vy)';
      case 'cleaner':
        return 'Kan se bokningar (begränsad vy)';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">Team</h1>
          <p className="text-sm text-muted-foreground">
            Bjud in delägare, partners och städare
          </p>
        </div>
      </div>

      {/* Add new member */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserPlus className="w-5 h-5" />
            Lägg till teammedlem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-post</label>
              <Input
                type="email"
                placeholder="namn@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Namn (valfritt)</label>
              <Input
                type="text"
                placeholder="Förnamn Efternamn"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Roll</label>
            <Select value={newRole} onValueChange={(v) => setNewRole(v as TeamRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="co_owner">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-warning" />
                    <span>Delägare</span>
                    <span className="text-xs text-muted-foreground ml-2">- Full åtkomst</span>
                  </div>
                </SelectItem>
                <SelectItem value="partner">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span>Partner</span>
                    <span className="text-xs text-muted-foreground ml-2">- Ser bokningar</span>
                  </div>
                </SelectItem>
                <SelectItem value="cleaner">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span>Städare</span>
                    <span className="text-xs text-muted-foreground ml-2">- Ser bokningar</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleAddMember} 
            disabled={!newEmail.trim() || isAdding}
            className="w-full"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {isAdding ? 'Lägger till...' : 'Lägg till'}
          </Button>
        </CardContent>
      </Card>

      {/* Team members list */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Teammedlemmar ({teamMembers.length})</h2>
        
        {teamMembers.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Inga teammedlemmar än</p>
              <p className="text-sm">Bjud in din första teammedlem ovan</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        {getRoleIcon(member.role)}
                      </div>
                      <div>
                        <div className="font-medium">
                          {member.member_name || member.member_email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {member.member_email}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {getRoleLabel(member.role)} • {getRoleDescription(member.role)}
                        </div>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Ta bort teammedlem?</AlertDialogTitle>
                          <AlertDialogDescription>
                            {member.member_name || member.member_email} kommer inte längre ha åtkomst till dina bokningar.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Avbryt</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeTeamMember(member.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Ta bort
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
