import "./globals.css";
import { SiteFooter, SiteHeader, SkipLink } from "./site-chrome";

export const metadata = {
  title: "Zihao (Jason) Zhang — Research Engineer",
  description:
    "Research engineer who builds machine-learning systems, then tests whether the improvements survive harder settings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
