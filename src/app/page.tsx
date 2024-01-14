import Image from "next/image";
import { cookies } from "next/headers";

export default function Home() {
  const cookie = cookies();
  const userId = cookie.get("user_id")?.value || "No cookie found";
  console.log({ userId });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {userId}
    </main>
  );
}
