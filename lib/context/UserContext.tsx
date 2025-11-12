/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowserClient } from "../supabase/client";

type UserContextType = {
   user: any,
   loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({children} : {children: React.ReactNode}) => {
   const supabase = supabaseBrowserClient();
   const [user, setUser] = useState<any>(null);
   const [loading, setLoading] = useState(false);

   useEffect (() => {
      const getUser = async () => {
         const {data:{user}} = await supabase.auth.getUser();
         setUser(user ?? null);
         setLoading(false);
      };

      getUser();

      const {data:{subscription}} = supabase.auth.onAuthStateChange(() => {
         getUser();
      })

      return () => subscription.unsubscribe();
   }, [supabase]);

   return (
      <UserContext.Provider value={{user, loading}}>
         {children}
      </UserContext.Provider>
   );
};

export const useUser = () => {
   const context = useContext(UserContext);
   if (!context) throw new Error('useUser must be used within a UserProvider');
   return context;
}