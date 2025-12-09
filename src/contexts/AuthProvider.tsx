import { ReactNode } from 'react';
import { AuthContext, useAuthState } from '@/hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthState();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
