import { useState } from 'react';
import { useTeam, TeamRole } from '@/hooks/useTeam';
import { useLanguage } from '@/contexts/LanguageContext';
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

const TeamSettings = () => {
  const { t } = useLanguage();
  const { teamMembers, loading, addTeamMember, removeTeamMember } = useTeam();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {t('team.description')}
      </p>

      {/* Add new member */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <UserPlus className="w-4 h-4" />
            {t('team.addMember')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t('team.email')}</label>
              <Input
                type="email"
                placeholder="namn@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t('team.name')}</label>
              <Input
                type="text"
                placeholder="Förnamn Efternamn"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t('team.role')}</label>
              <Select value={newRole} onValueChange={(v) => setNewRole(v as TeamRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="co_owner">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-warning" />
                      <span>{t('role.co_owner')}</span>
                      <span className="text-xs text-muted-foreground ml-1">- {t('role.co_owner.desc')}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="partner">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span>{t('role.partner')}</span>
                      <span className="text-xs text-muted-foreground ml-1">- {t('role.partner.desc')}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="cleaner">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-secondary" />
                      <span>{t('role.cleaner')}</span>
                      <span className="text-xs text-muted-foreground ml-1">- {t('role.cleaner.desc')}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleAddMember} 
            disabled={!newEmail.trim() || isAdding}
            className="w-full"
            size="sm"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {isAdding ? t('team.adding') : t('team.add')}
          </Button>
        </CardContent>
      </Card>

      {/* Team members list */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">{t('team.members')} ({teamMembers.length})</h3>
        
        {teamMembers.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-6 text-center text-muted-foreground">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{t('team.noMembers')}</p>
              <p className="text-xs">{t('team.inviteFirst')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                        {getRoleIcon(member.role)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {member.member_name || member.member_email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {member.member_email}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {t(`role.${member.role}`)}
                        </div>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t('team.remove')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {member.member_name || member.member_email} {t('team.removeConfirm')}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('team.cancel')}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeTeamMember(member.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {t('team.delete')}
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

export default TeamSettings;
