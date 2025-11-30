// src/providers/auth-provider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    authService.getSession().then((session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
