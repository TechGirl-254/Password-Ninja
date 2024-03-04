import axios from "axios";

const userBase = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users`;
const vaultBase = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/vault`;

export async function registerUser(payload: {
  hashedPassword: string;
  email: string;
}) {
  const res = await axios.post<{ salt: string; vault: string }>(
    userBase,
    payload,
    {
      withCredentials: true,
    }
  );
  return res.data;
}

export async function loginUser(payload: {
  hashedPassword: string;
  email: string;
}) {
  const res = await axios.post<{ salt: string; vault: string }>(
    `${userBase}/login`,
    payload,
    {
      withCredentials: true,
    }
  );
  return res.data;
}

export async function saveVault({
  encryptedVault,
}: {
  encryptedVault: string;
}) {
  const res = await axios.put(
    vaultBase,
    { encryptedVault },
    { withCredentials: true }
  );
  return res.data;
}
