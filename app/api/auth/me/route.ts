import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("tech-apoio-session");
    const studentSessionCookie = cookieStore.get("tech-apoio-student-session");

    // Verificar sessão de professor/admin
    if (sessionCookie) {
      const sessionData = JSON.parse(sessionCookie.value);

      // Verificar se o usuário ainda existe no banco
      const user = await prisma.user.findUnique({
        where: { id: sessionData.id },
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
        // Usuário não existe mais, limpar sessão
        cookieStore.delete("tech-apoio-session");
        return NextResponse.json(
          {
            success: false,
            authenticated: false,
            message: "Usuário não encontrado",
          },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        authenticated: true,
        type: "user",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          studentsCount: user.students.length,
          classesCount: user.classes.length,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    }

    // Verificar sessão de estudante
    if (studentSessionCookie) {
      const sessionData = JSON.parse(studentSessionCookie.value);

      // Verificar se o estudante ainda existe no banco
      const student = await prisma.student.findUnique({
        where: { id: sessionData.id },
        include: {
          teacher: true,
          class: true,
        },
      });

      if (!student) {
        // Estudante não existe mais, limpar sessão
        cookieStore.delete("tech-apoio-student-session");
        return NextResponse.json(
          {
            success: false,
            authenticated: false,
            message: "Estudante não encontrado",
          },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        authenticated: true,
        type: "student",
        student: {
          id: student.id,
          name: student.name,
          age: student.age,
          grade: student.grade,
          teacherId: student.teacherId,
          teacherName: student.teacher.name,
          createdAt: student.createdAt,
          updatedAt: student.updatedAt,
        },
      });
    }

    // Nenhuma sessão encontrada
    return NextResponse.json(
      { success: false, authenticated: false, message: "Não autenticado" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
