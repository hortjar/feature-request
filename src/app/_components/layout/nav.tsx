import { Button, Heading } from "@radix-ui/themes";
import { getServerAuthSession } from "~/server/auth";
import UserPanel from "./user-panel";
import Link from "next/link";
import { CaretDownIcon, EnterIcon, PersonIcon } from "@radix-ui/react-icons";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="flex flex-row items-center justify-between">
      <Link href="/">
        <Heading>Feature Requests</Heading>
      </Link>
      {session?.user.name != null ? (
        <UserPanel userName={session.user.name} />
      ) : (
        <Link href={"/api/auth/signin"}>
          {" "}
          <Button
            variant="ghost"
            highContrast
            color="gray"
            className="text-md flex cursor-pointer flex-row items-center justify-center gap-3 p-3"
          >
            <EnterIcon width={20} height={20} />
            <span className="text-[1.1em]">Sign In</span>
          </Button>
        </Link>
      )}
    </nav>
  );
}
