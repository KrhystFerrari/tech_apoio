import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age } = body;

    // Validação básica
    if (!name || !age) {
      return NextResponse.json(
        { success: false, error: "Nome e idade são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar estudante no banco
    const student = await prisma.student.findFirst({
      where: {
        name: { contains: name },
        age: Number.parseInt(age),
      },
      include: {
        teacher: true,
        class: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          error: "Estudante não encontrado. Verifique o nome e idade.",
        },
        { status: 404 }
      );
    }

    // Criar sessão de estudante
    const sessionData = {
      id: student.id,
      name: student.name,
      age: student.age,
      grade: student.grade,
      type: "student",
      teacherId: student.teacherId,
      loginTime: new Date().toISOString(),
    };

    const cookieStore = await cookies();
    cookieStore.set("tech-apoio-student-session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return NextResponse.json({
      success: true,
      message: `Bem-vindo(a), ${student.name}! Vamos aprender juntos! 🎉`,
      student: {
        id: student.id,
        name: student.name,
        age: student.age,
        grade: student.grade,
      },
    });
  } catch (error) {
    console.error("Erro no login do estudante:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
