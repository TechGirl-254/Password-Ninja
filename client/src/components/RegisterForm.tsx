import {
  Box,
  Button,
  Flex,
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

export function RegisterForm({
  setVaultKey,
  setStep,
}: {
  setVaultKey: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<
    SetStateAction<"register" | "login" | "vault" | "decryption">
  >;
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
  function handlePageSwitching() {
    setStep("login");
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form
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
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 4,
                    message: "Email must be 4 characters long",
                  },
                })}
              />

              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired mt={6}>
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

            <Button
              type="submit"
              bgColor="purple"
              variant="outline"
              width="full"
              mt={4}
            >
              Register
            </Button>
            <Link
              onClick={() => handlePageSwitching()}
              className="mt-60 p-2 items-center bg-white"
            >
              Already registered? Click here to login.
            </Link>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default RegisterForm;
