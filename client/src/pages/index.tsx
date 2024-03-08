import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";
import styles from "../styles/Home.module.css";
import DecryptedVault from "@/components/DecryptedVault";

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

const Home: NextPage = () => {
  const [step, setStep] = useState<
    "register" | "login" | "vault" | "decryption"
  >("login");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");

  useEffect(() => {
    const vault = window.sessionStorage.getItem("vault");
    const vaultKey = window.sessionStorage.getItem("vk");

    if (vault) {
      setVault(JSON.parse(vault));
    }

    if (vaultKey) {
      setVaultKey(vaultKey);
      setStep("register");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to PassWord-Ninja</title>
        <meta name="description" content="Created by Wamata Muriu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {step === "register" && (
          <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === "login" && (
          <LoginForm
            setVault={setVault}
            setStep={setStep}
            setVaultKey={setVaultKey}
          />
        )}
        {step === "vault" && (
          <Vault vault={vault} vaultKey={vaultKey} setStep={setStep} />
        )}
        {step === "decryption" && (
          <DecryptedVault vault={vault} vaultKey={vaultKey} setStep={setStep} />
        )}
      </main>
    </div>
  );
};

export default Home;
