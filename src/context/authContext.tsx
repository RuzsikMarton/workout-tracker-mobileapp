import { authClient } from "@/lib/auth-client";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

type Session = typeof authClient.$Infer.Session;

type AuthContextType = {
  session: Session | null;
  isPending: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isPending) return;

    const isAuthScreen = segments[0] === "sign-in" || segments[0] === "sign-up";
    const inTabs = segments[0] === "(tabs)";

    if (!session && !isAuthScreen) {
      // Not signed in, redirect to sign-in
      router.replace("/sign-in");
    } else if (session && (isAuthScreen || !inTabs)) {
      // Signed in but not in tabs, redirect to tabs
      router.replace("/(tabs)/home");
    }
  }, [session, isPending, segments]);

  const signOut = async () => {
    await authClient.signOut();
    router.replace("/sign-in");
  };

  // Show loading screen during initial auth check
  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Wait for error state to settle before rendering children
  if (error) {
    console.error("Auth error:", error);
  }

  return (
    <AuthContext.Provider value={{ session, isPending, error, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
