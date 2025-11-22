"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogoLoader } from "../components/common";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a página de início
    router.push("/inicio");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LogoLoader size="lg" loadingText="" />
    </div>
  );
}
