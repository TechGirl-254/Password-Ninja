import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { registerUser } from "../api";
import { generateVaultKey, hashPassword } from "../crypto";
import { VaultItem } from "../pages";
import FormWrapper from "./FormWrapper";
import { Link as RouterLink } from "react-router-dom";

function RegisterForm({
  setVaultKey,
  setStep,
}: {
  setVaultKey: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<"register" | "login" | "vault">>;
}) {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();

  const mutation = useMutation(registerUser, {
    onSuccess: ({ salt, vault }) => {
      const hashedPassword = getValues("hashedPassword");

      const email = getValues("email");

      const vaultKey = generateVaultKey({
        hashedPassword,
        email,
        salt,
      });

      window.sessionStorage.setItem("vk", vaultKey);

      setVaultKey(vaultKey);

      window.sessionStorage.setItem("vault", "");

      setStep("login");
    },
  });

  return (
    <FormWrapper
      onSubmit={handleSubmit(() => {
        const password = getValues("password");
        const email = getValues("email");

        const hashedPassword = hashPassword(password);

        setValue("hashedPassword", hashedPassword);

        mutation.mutate({
          email,
          hashedPassword,
        });
      })}
    >
      <Heading>Register</Heading>

      <FormControl mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            minLength: { value: 4, message: "Email must be 4 characters long" },
          })}
        />

        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be 6 characters long",
            },
          })}
        />

        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <div className="mt-60 mb-40 p-2">
        <Button type="submit">Register</Button>
      </div>

      <div className="mt-60 p-2 items-center">
        <a href="/login">Already registered? Click here to login</a>
      </div>
    </FormWrapper>
  );
}

export default RegisterForm;
