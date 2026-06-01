import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "https://workoutracker.martonruzsik.sk", // Base URL of Better Auth.
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    expoClient({
      scheme: "workouttrackermobileapp", // Custom URL scheme for deep linking.
      storagePrefix: "workouttrackermobileapp-auth", // Prefix for keys in secure storage.
      storage: SecureStore,
    }),
  ],
});
