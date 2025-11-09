import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, school } = body;

    // Validação básica
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos os campos obrigatórios devem ser preenchidos",
        },
        { status: 400 }
      );
    }

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Este email já está sendo usado" },
        { status: 400 }
      );
    }

    // TODO: Implementar hash da senha (por agora usando senha simples)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Em produção, fazer hash da senha
        role: role as "TEACHER" | "ADMIN",
        school: school || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Usuário criado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
