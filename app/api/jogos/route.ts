import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Difficulty, ActivityType } from "@/lib/generated/prisma";

// GET /api/jogos - Listar todas as atividades/jogos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");

    const activities = await prisma.activity.findMany({
      where: {
        isActive: true,
        ...(subject && { subject: { name: subject } }),
        ...(difficulty && { difficulty: difficulty as Difficulty }),
        ...(type && { type: type as ActivityType }),
      },
      include: {
        subject: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST /api/jogos - Criar nova atividade/jogo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      type,
      difficulty = "EASY",
      minAge = 6,
      maxAge = 10,
      instructions,
      content,
      subjectId,
    } = body;

    // Validações básicas
    if (!title || !description || !type || !instructions || !subjectId) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        type,
        difficulty,
        minAge,
        maxAge,
        instructions,
        content,
        subjectId,
      },
      include: {
        subject: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: activity,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar jogo:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
