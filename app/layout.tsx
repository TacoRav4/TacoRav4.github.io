import "./globals.css";
import { SiteFooter, SiteHeader, SkipLink } from "./site-chrome";

export const metadata = {
  title: "Zihao (Jason) Zhang — Research Engineer",
  description:
    "Research engineer building machine-learning, data, and scientific software systems—and testing whether their improvements survive harder settings.",
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
