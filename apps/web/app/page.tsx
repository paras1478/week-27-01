import prismaClient from "db/client";

export default async function Home() {
  const users = await prismaClient.user.findMany();

  return (
    <>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}


export const dynamic = 'force-dynamic'