import "./globals.css";
import "./loader.css";
import Providers from "@/lib/Providers";

export const metadata = {
  title: "Exploring World",
  description: "Exploring World",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
