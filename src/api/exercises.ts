import { authClient } from "@/lib/auth-client";

export const getExercises = async ({
  muscle,
  equipment,
}: {
  muscle?: string;
  equipment?: string;
}) => {
  const params = new URLSearchParams();
  const cookies = authClient.getCookie();
  const headers = {
    Cookie: cookies,
  };

  if (muscle) {
    params.append("muscle", muscle);
  }
  if (equipment) {
    params.append("equipment", equipment);
  }

  //console.log("Final query parameters:", params.toString());

  const url = `http://workoutracker.martonruzsik.sk/api/exercises?${params.toString()}`;
  const options = {
    method: "GET",
    headers,
    credentials: "omit" as RequestCredentials,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch exercises: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  //console.log("Response data:", JSON.stringify(data.data, null, 2));
  return data.data;
};

export const getExerciseById = async (id: string) => {
  const cookies = authClient.getCookie();
  const headers = {
    Cookie: cookies,
  };

  const url = `http://workoutracker.martonruzsik.sk/api/exercises/${id}`;
  const options = {
    method: "GET",
    headers,
    credentials: "omit" as RequestCredentials,
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch exercise by id: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data;
};
