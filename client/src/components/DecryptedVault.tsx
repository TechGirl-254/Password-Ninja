import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { saveVault } from "../api";
import { encryptVault } from "../crypto";
import { VaultItem } from "../pages";
import FormWrapper from "./FormWrapper";
import { Dispatch, SetStateAction } from "react";

function Vault({
  vault = [],
  vaultKey = "",
  setStep,
}: {
  vault: VaultItem[];
  vaultKey: string;
  setStep: Dispatch<
    SetStateAction<"register" | "login" | "vault" | "decryption">
  >;
}) {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      vault,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vault",
  });

  const mutation = useMutation(saveVault);

  function handlePageSwitching() {
    setStep("vault");
  }

  return (
    <>
      <FormWrapper
        onSubmit={handleSubmit(({ vault }) => {
          console.log({ vault });

          const encryptedVault = encryptVault({
            vault: JSON.stringify({ vault }),
            vaultKey,
          });

          window.sessionStorage.setItem("vault", JSON.stringify(vault));

          mutation.mutate({
            encryptedVault,
          });
        })}
      >
        {fields.map((field, index) => {
          return (
            <Box
              mt="4"
              mb="4"
              display="flex"
              key={field.id}
              alignItems="flex-end"
            >
              <FormControl>
                <FormLabel htmlFor="website">Website</FormLabel>
                <Input
                  type="url"
                  id="website"
                  placeholder="Website"
                  {...register(`vault.${index}.website`, {
                    required: "Website is required",
                  })}
                />
              </FormControl>
              <FormControl ml="2">
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  placeholder="Username"
                  {...register(`vault.${index}.username`, {
                    required: "Username is required",
                  })}
                />
              </FormControl>
              <FormControl ml="2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="text"
                  id="password"
                  placeholder="Password"
                  {...register(`vault.${index}.password`, {
                    required: "Password is required",
                  })}
                />
              </FormControl>
            </Box>
          );
        })}
      </FormWrapper>
      <Link
        onClick={() => handlePageSwitching()}
        className="mt-60 p-2 items-center bg-white"
      >
        Click here to create a new vault.
      </Link>
    </>
  );
}

export default Vault;
