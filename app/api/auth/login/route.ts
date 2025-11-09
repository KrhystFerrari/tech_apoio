import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar usuário no banco (por enquanto sem hash de senha - implementar depois)
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        students: true,
        classes: {
          include: {
            students: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // TODO: Implementar verificação de senha com hash
    // Por enquanto, aceitar qualquer senha para desenvolvimento

    // Criar sessão simples (em produção usar JWT ou session mais segura)
    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      loginTime: new Date().toISOString(),
    };

    const cookieStore = await cookies();
    cookieStore.set("tech-apoio-session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso! 🎉",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        studentsCount: user.students.length,
        classesCount: user.classes.length,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
