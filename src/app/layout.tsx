import "@/app/globals.css";
import { montserrat } from "@/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased text-gray-800`}>
        {children}
      </body>
    </html>
  );
}
