import Cabecalho from "@/components/Cabecalho/Cabecalho";
import Rodape from "@/components/Rodape/Rodape";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Energia Renovável",
  description: "",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
      <Cabecalho />
        {children}
      <Rodape />
      </body>
    </html>
  );
}
