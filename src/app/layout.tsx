import "@/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { ToastProvider } from "@/components/context/ToastProvider";

export const metadata: Metadata = {
  title: "zenboard",
  description: "colaborate ideas in a team",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <ToastProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
