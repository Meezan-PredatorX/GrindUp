/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowserClient } from "../supabase/client";

type UserContextType = {
   user: any;
   loading: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = supabaseBrowserClient();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (mounted) {
        setUser(user ?? null);
        setLoading(false);
      }
    };

    loadUser();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event: any, session: { user: any; }) => {
        if (mounted) {
          setUser(session?.user ?? null);
        }
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
   const ctx = useContext(UserContext);
   if (!ctx) throw new Error("useUser must be inside UseProvider");
   return ctx;
}
