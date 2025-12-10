import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Users } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Profile {
  id: string;
  username: string | null;
  created_at: string;
  role?: string;
}

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOwner } = useUserRole();
  const { toast } = useToast();

  const fetchProfiles = async () => {
    // Fetch profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profileError) {
      console.error('Error fetching profiles:', profileError);
      setLoading(false);
      return;
    }

    // Fetch roles
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('user_id, role');

    const roleMap = new Map(roleData?.map(r => [r.user_id, r.role]) || []);

    const profilesWithRoles = (profileData || []).map(p => ({
      ...p,
      role: roleMap.get(p.id) || 'user',
    }));

    setProfiles(profilesWithRoles);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!isOwner) {
      toast({
        title: 'Error',
        description: 'Only owners can change roles',
        variant: 'destructive',
      });
      return;
    }

    // Check if role exists
    const { data: existingRole } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (existingRole) {
      // Update existing role
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole } as any)
        .eq('user_id', userId);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update role',
          variant: 'destructive',
        });
        return;
      }
    } else {
      // Insert new role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: newRole } as any);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to assign role',
          variant: 'destructive',
        });
        return;
      }
    }

    toast({
      title: 'Success',
      description: 'Role updated successfully',
    });

    fetchProfiles();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'destructive';
      case 'admin':
        return 'default';
      case 'moderator':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Manage Users ({profiles.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Role</TableHead>
                {isOwner && <TableHead>Change Role</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map(profile => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">
                    {profile.username || 'No username'}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm font-mono">
                    {profile.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    {format(new Date(profile.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(profile.role || 'user')}>
                      {profile.role || 'user'}
                    </Badge>
                  </TableCell>
                  {isOwner && (
                    <TableCell>
                      <Select
                        value={profile.role || 'user'}
                        onValueChange={(value) => handleRoleChange(profile.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="owner">Owner</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {profiles.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No users found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
