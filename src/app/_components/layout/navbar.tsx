import { Button, Container, Heading, Text } from "@radix-ui/themes";
import { getServerAuthSession } from "~/server/auth";
import { UserPanel } from "./user-panel";
import Link from "next/link";
import { EnterIcon } from "@radix-ui/react-icons";
import { type FC } from "react";

export const Navbar: FC = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="mb-3 bg-neutral-900">
      <Container>
        <div className="flex flex-row items-center justify-between py-5">
          <Link href="/">
            <Heading size={"7"}>Feature Requests</Heading>
          </Link>
          <div>
            <Link href="/projects?type=all">
              <Text weight={"bold"}>Projects</Text>
            </Link>
          </div>
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
        </div>
      </Container>
    </nav>
  );
};
