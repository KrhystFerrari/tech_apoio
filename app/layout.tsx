import type { Metadata } from "next";
import { Nunito, Fredoka, Comic_Neue } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { HydrationSafeWrapper } from "../lib/components/NoSSR";
import { HydrationFix } from "../lib/components/HydrationFix";
import { AuthProvider } from "../lib/contexts/AuthContext";
import ConditionalBackToTop from "./components/ConditionalBackToTop";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const fredokaOne = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400"],
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "TechApoio - Aprender é Divertido!",
  description:
    "Plataforma educativa para iniciação tecnológica de crianças do ensino fundamental (6 a 10 anos). Alfabetização digital através de conteúdos educativos, interface lúdica e recursos que desenvolvem raciocínio lógico e criatividade.",
  keywords:
    "educação infantil, tecnologia, crianças, ensino fundamental, alfabetização digital, jogos educativos",
  authors: [{ name: "TechApoio" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f56565",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${fredokaOne.variable} ${comicNeue.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-kid antialiased" suppressHydrationWarning={true}>
        <HydrationFix>
          <div ref={undefined} suppressHydrationWarning={true}>
            <HydrationSafeWrapper>
              <div suppressHydrationWarning={true}>
                <AuthProvider>
                  <div
                    className="min-h-screen flex flex-col"
                    suppressHydrationWarning={true}
                  >
                    <main className="flex-1">{children}</main>
                    <ConditionalBackToTop />
                  </div>
                  <Toaster
                    position="top-center"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        background: "#fff",
                        color: "#333",
                        fontSize: "18px",
                        fontFamily: "Nunito, sans-serif",
                        borderRadius: "16px",
                        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
                        border: "2px solid #f3f4f6",
                      },
                      success: {
                        iconTheme: {
                          primary: "#22c55e",
                          secondary: "#fff",
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: "#ef4444",
                          secondary: "#fff",
                        },
                      },
                    }}
                  />
                </AuthProvider>
              </div>
            </HydrationSafeWrapper>
          </div>
        </HydrationFix>
      </body>
    </html>
  );
}
