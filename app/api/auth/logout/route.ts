import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Remover ambos os cookies de sessão
    cookieStore.delete("tech-apoio-session");
    cookieStore.delete("tech-apoio-student-session");

    return NextResponse.json({
      success: true,
      message: "Logout realizado com sucesso! Até logo! 👋✨",
    });
  } catch (error) {
    console.error("Erro no logout:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
