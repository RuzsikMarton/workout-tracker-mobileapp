import { authClient } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response.error) {
        setError("root", {
          type: "manual",
          message: response.error.message || "Failed to create account",
        });
        return;
      } else {
        router.replace("/");
      }
    } catch (error) {
      setError("root", {
        message: "Failed to create account. Please try again.",
      });
    }
  };

  return (
    <View className="bg-black flex-1-center">
      <View className="bg-surface w-100 p-4 border border-dark-100 rounded-2xl col-center">
        <Text className="text-2xl font-bold text-white my-6 uppercase">
          Registration
        </Text>
        <Controller
          {...register("name")}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="p-2.5 m-2.5 self-center bg-input text-white w-full rounded"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholderTextColor="#888"
              placeholder="Name"
            />
          )}
        />
        {errors.name && (
          <Text className="text-red-500 mb-2">{errors.name.message}</Text>
        )}
        <Controller
          {...register("email")}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="p-2.5 rounded m-2.5 self-center bg-input text-white w-full"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Email"
              placeholderTextColor="#888"
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
        <Controller
          {...register("confirmPassword")}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="p-2.5 rounded m-2.5 self-center bg-input text-white w-full"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry
            />
          )}
        />
        {errors.confirmPassword && (
          <Text className="text-red-500 mb-2">
            {errors.confirmPassword.message}
          </Text>
        )}
        {errors.root && (
          <Text className="text-red-500 mb-2">{errors.root.message}</Text>
        )}
        <Pressable
          className="w-full"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {({ pressed }) => (
            <View
              className={`bg-white w-full p-3 rounded mt-4 ${pressed ? "opacity-70" : "opacity-100"} ${isSubmitting ? "opacity-50 bg-gray-400" : ""}`}
            >
              <Text className="text-black text-center">
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </Text>
            </View>
          )}
        </Pressable>
        <View className="flex-row items-center mt-6 mb-2">
          <Text className="text-primary/70">You already have an account? </Text>
          <Pressable onPress={() => router.push("/sign-in")}>
            {({ pressed }) => (
              <Text
                className={`text-primary/70 underline ${pressed ? "opacity-70" : "opacity-100"}`}
              >
                Sign in here
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
