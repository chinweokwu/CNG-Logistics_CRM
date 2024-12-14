import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/lib/store";
import { Loader2 } from "lucide-react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        try {
          const parsedUser = JSON.parse(user); // Parse user data only if it exists
          dispatch(
            setCredentials({
              user: parsedUser,
              token,
            })
          );
        } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem("user"); // Clear corrupt data if parsing fails
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
