import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/user.type";
import { getMe } from "../api-services/auth.api";

type ContextValue = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
};

const CurrentUserContext = createContext<ContextValue | null>(null);

function CurrentUserProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    refetchOnWindowFocus: false,
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        isLoading: isLoading || isPending,
        setUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserProvider;

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);
  if (!ctx) {
    throw new Error("useCurrentUser must be used within CurrentUserProvider");
  }
  return ctx;
}
