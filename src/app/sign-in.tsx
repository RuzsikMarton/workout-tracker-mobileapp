import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (response.error) {
        setError("root", {
          type: "manual",
          message: response.error.message || "Invalid email or password",
        });
      } else {
        // Wait a bit for the session to be stored
        setTimeout(() => {
          router.replace("/");
        }, 100);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("root", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <View className="bg-black flex-1-center">
      <View className="bg-surface w-100 p-4 border border-dark-100 rounded-2xl col-center">
        <Image
          source={require("@/assets/images/logo.webp")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
        <Text className="text-primary/70 my-4 text-center">
          You must log in to access the exercises and your workouts.
        </Text>
        <Controller
          {...register("email")}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="p-2.5 m-2.5 self-center bg-input text-white w-full rounded"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholderTextColor="#888"
              placeholder="Email"
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 mb-2">{errors.email.message}</Text>
        )}

        <Controller
          {...register("password")}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="p-2.5 rounded m-2.5 self-center bg-input text-white w-full"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500 mb-2">{errors.password.message}</Text>
        )}
        {errors.root && (
          <Text className="text-red-500 mb-2">{errors.root.message}</Text>
        )}

        <Pressable className="w-full" onPress={handleSubmit(onSubmit)}>
          {({ pressed }) => (
            <View
              className={`bg-white w-full p-3 rounded mt-4 ${pressed ? "opacity-70" : "opacity-100"}`}
            >
              <Text className="text-black text-center">
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Text>
            </View>
          )}
        </Pressable>
        <View className="flex-row items-center mt-6 mb-2">
          <Text className="text-primary/70">Don't have an account? </Text>
          <Pressable onPress={() => router.push("/sign-up")}>
            {({ pressed }) => (
              <Text
                className={`text-primary/70 underline ${pressed ? "opacity-70" : "opacity-100"}`}
              >
                Sign up now
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
