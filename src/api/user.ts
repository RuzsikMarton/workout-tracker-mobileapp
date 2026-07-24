import { authClient } from "@/lib/auth-client";

export const getUserData = async () => {
  const cookies = authClient.getCookie();
  const headers = {
    Cookie: cookies,
  };
  const url = `http://workoutracker.martonruzsik.sk/api/user`;
  const options = {
    method: "GET",
    headers,
    credentials: "omit" as RequestCredentials,
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch user data: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  console.log("Response data:", JSON.stringify(data, null, 2));
  return data;
};
