import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Container, Theme } from "@radix-ui/themes";
import Navbar from "./_components/layout/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Feature Requests",
  description: "Request features for projects",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <Theme appearance="dark">
          <TRPCReactProvider headers={headers()}>
            <Container>
              <Navbar />
              {children}
            </Container>
          </TRPCReactProvider>
        </Theme>
      </body>
    </html>
  );
}
