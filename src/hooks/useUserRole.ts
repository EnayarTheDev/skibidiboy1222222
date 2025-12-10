import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type AppRole = 'owner' | 'admin' | 'moderator' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching role:', error);
        setRole(null);
      } else {
        setRole(data?.role as AppRole || null);
      }
      setLoading(false);
    };

    fetchRole();
  }, [user]);

  const isOwner = role === 'owner';
  const isAdmin = role === 'admin' || role === 'owner';
  const isModerator = role === 'moderator' || isAdmin;

  return { role, loading, isOwner, isAdmin, isModerator };
};
