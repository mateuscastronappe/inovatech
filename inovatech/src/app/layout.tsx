import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Energia Consciente",
  description: "Conscientização sobre o uso responsável da energia",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
