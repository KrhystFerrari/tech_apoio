import { PrismaClient } from "../lib/generated/prisma";
import { numberToWords } from "../src/helpers/numbers.helpers";

type DifficultyLevel = "EASY" | "MEDIUM" | "HARD";
type ActivityType =
  | "WORD_FORMATION"
  | "LETTER_RECOGNITION"
  | "INTERACTIVE_STORY"
  | "DIGITAL_DICTATION"
  | "WORD_SEARCH"
  | "COUNTING"
  | "MATH_OPERATIONS"
  | "NUMBER_PUZZLES"
  | "SHAPE_RECOGNITION"
  | "LOGICAL_SEQUENCE"
  | "VISUAL_PROGRAMMING"
  | "ALGORITHM_BASICS"
  | "SIMPLE_COMMANDS"
  | "BASIC_ANIMATIONS"
  | "DRAG_DROP";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do TechApoio...");

  // Criar usuários de teste
  const testUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: "professor@techapoio.com" },
      update: {},
      create: {
        email: "professor@techapoio.com",
        name: "Maria Silva",
        password: "professor123",
        role: "TEACHER",
        school: "Escola Municipal Dom Pedro II",
      },
    }),
    prisma.user.upsert({
      where: { email: "admin@techapoio.com" },
      update: {},
      create: {
        email: "admin@techapoio.com",
        name: "Carlos Santos",
        password: "admin123",
        role: "ADMIN",
        school: "TechApoio - Administração",
      },
    }),
  ]);

  console.log(
    "👥 Usuários de teste criados:",
    testUsers.map((u) => u.email)
  );

  // Criar estudantes de teste
  const testStudents = await Promise.all([
    prisma.student.upsert({
      where: { id: "student-joao" },
      update: {},
      create: {
        id: "student-joao",
        name: "João Pedro",
        age: 8,
        grade: 3,
        teacherId: testUsers[0].id, // Maria Silva (professor)
      },
    }),
    prisma.student.upsert({
      where: { id: "student-ana" },
      update: {},
      create: {
        id: "student-ana",
        name: "Ana Clara",
        age: 7,
        grade: 2,
        teacherId: testUsers[0].id, // Maria Silva (professor)
      },
    }),
    prisma.student.upsert({
      where: { id: "student-miguel" },
      update: {},
      create: {
        id: "student-miguel",
        name: "Miguel Santos",
        age: 9,
        grade: 4,
        teacherId: testUsers[0].id, // Maria Silva (professor)
      },
    }),
  ]);

  console.log(
    "👦👧 Estudantes de teste criados:",
    testStudents.map((s) => s.name)
  );

  // Criar áreas de conhecimento
  const subjects = await Promise.all([
    prisma.subject.upsert({
      where: { name: "Português" },
      update: {},
      create: {
        name: "Português",
        description: "Aprenda letras, palavras e histórias de forma divertida!",
        color: "#f56565",
        icon: "BookOpen",
      },
    }),
    prisma.subject.upsert({
      where: { name: "Matemática" },
      update: {},
      create: {
        name: "Matemática",
        description: "Números, contas e formas nunca foram tão interessantes!",
        color: "#0ea5e9",
        icon: "Calculator",
      },
    }),
    prisma.subject.upsert({
      where: { name: "Tecnologia" },
      update: {},
      create: {
        name: "Tecnologia",
        description: "Seus primeiros passos no mundo da programação!",
        color: "#a855f7",
        icon: "Computer",
      },
    }),
    prisma.subject.upsert({
      where: { name: "Ciências" },
      update: {},
      create: {
        name: "Ciências",
        description: "Explore o mundo ao seu redor de forma científica!",
        color: "#22c55e",
        icon: "Microscope",
      },
    }),
    prisma.subject.upsert({
      where: { name: "Geografia" },
      update: {},
      create: {
        name: "Geografia",
        description: "Descubra países, culturas e lugares incríveis!",
        color: "#14b8a6",
        icon: "Globe",
      },
    }),
    prisma.subject.upsert({
      where: { name: "Inglês" },
      update: {},
      create: {
        name: "Inglês",
        description: "Aprenda inglês de forma lúdica e divertida!",
        color: "#f97316",
        icon: "Languages",
      },
    }),
  ]);

  console.log("✅ Áreas de conhecimento criadas!");

  // Criar algumas palavras para os jogos de português
  const words = [
    // Palavras fáceis (3-4 letras)
    { word: "GATO", difficulty: "EASY", category: "animais", syllables: 2 },
    { word: "CASA", difficulty: "EASY", category: "objetos", syllables: 2 },
    { word: "BOLA", difficulty: "EASY", category: "brinquedos", syllables: 2 },
    { word: "PATO", difficulty: "EASY", category: "animais", syllables: 2 },
    { word: "FLOR", difficulty: "EASY", category: "natureza", syllables: 1 },

    // Palavras médias (5-6 letras)
    { word: "CAVALO", difficulty: "MEDIUM", category: "animais", syllables: 3 },
    { word: "ESCOLA", difficulty: "MEDIUM", category: "lugares", syllables: 3 },
    {
      word: "BONECA",
      difficulty: "MEDIUM",
      category: "brinquedos",
      syllables: 3,
    },
    {
      word: "ÁRVORE",
      difficulty: "MEDIUM",
      category: "natureza",
      syllables: 3,
    },
    {
      word: "FAMÍLIA",
      difficulty: "MEDIUM",
      category: "pessoas",
      syllables: 3,
    },

    // Palavras difíceis (7+ letras)
    {
      word: "BORBOLETA",
      difficulty: "HARD",
      category: "animais",
      syllables: 4,
    },
    {
      word: "BIBLIOTECA",
      difficulty: "HARD",
      category: "lugares",
      syllables: 5,
    },
    {
      word: "COMPUTADOR",
      difficulty: "HARD",
      category: "tecnologia",
      syllables: 4,
    },
  ];

  await Promise.all(
    words.map((wordData) =>
      prisma.word.upsert({
        where: { word: wordData.word },
        update: {},
        create: {
          word: wordData.word,
          difficulty: wordData.difficulty as DifficultyLevel,
          category: wordData.category,
          syllables: wordData.syllables,
          meaning: `Significado da palavra ${wordData.word.toLowerCase()}`,
        },
      })
    )
  );

  console.log("✅ Palavras criadas!");

  // Criar números para jogos de matemática
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
    let difficulty: DifficultyLevel;
    if (num <= 10) {
      difficulty = "EASY";
    } else if (num <= 20) {
      difficulty = "MEDIUM";
    } else {
      difficulty = "HARD";
    }

    return {
      number: num,
      written: numberToWords(num),
      difficulty,
    };
  });

  await Promise.all(
    numbers.map((numberData) =>
      prisma.number.upsert({
        where: { number: numberData.number },
        update: {},
        create: {
          number: numberData.number,
          written: numberData.written,
          difficulty: numberData.difficulty,
        },
      })
    )
  );

  console.log("✅ Números criados!");

  // Criar atividades de exemplo
  const portuguesSubject = subjects.find((s) => s.name === "Português")!;
  const matematicaSubject = subjects.find((s) => s.name === "Matemática")!;
  const tecnologiaSubject = subjects.find((s) => s.name === "Tecnologia")!;

  const activities = [
    {
      title: "Forme Palavras",
      description: "Arraste as letras para formar palavras!",
      type: "WORD_FORMATION",
      difficulty: "EASY",
      instructions:
        "Arraste as letras na ordem correta para formar a palavra mostrada na imagem.",
      content: {
        words: ["GATO", "CASA", "BOLA", "PATO"],
        type: "word_formation",
      },
      subjectId: portuguesSubject.id,
    },
    {
      title: "Contando com Bichinhos",
      description: "Conte os animais e escolha o número correto!",
      type: "COUNTING",
      difficulty: "EASY",
      instructions:
        "Conte quantos animais aparecem na tela e clique no número correto.",
      content: {
        maxNumber: 10,
        animals: ["🐱", "🐶", "🐰", "🐸", "🐧"],
        type: "counting",
      },
      subjectId: matematicaSubject.id,
    },
    {
      title: "Sequência Mágica",
      description: "Coloque os passos na ordem correta!",
      type: "LOGICAL_SEQUENCE",
      difficulty: "EASY",
      instructions:
        "Arraste os cards para colocar a história na ordem correta.",
      content: {
        sequences: [
          {
            title: "Escovando os dentes",
            steps: [
              "Pegar a escova",
              "Colocar pasta de dente",
              "Escovar os dentes",
              "Enxaguar a boca",
            ],
          },
        ],
        type: "logical_sequence",
      },
      subjectId: tecnologiaSubject.id,
    },
  ];

  await Promise.all(
    activities.map((activity) =>
      prisma.activity.create({
        data: {
          title: activity.title,
          description: activity.description,
          type: activity.type as ActivityType,
          difficulty: activity.difficulty as DifficultyLevel,
          instructions: activity.instructions,
          content: activity.content,
          subjectId: activity.subjectId,
        },
      })
    )
  );

  console.log("✅ Atividades criadas!");

  // Criar usuário professor de exemplo
  const teacher = await prisma.user.upsert({
    where: { email: "professor@techapoio.com" },
    update: {},
    create: {
      email: "professor@techapoio.com",
      name: "Professor(a) Demo",
      role: "TEACHER",
      password: "professor123",
      school: "Escola Municipal Dom Pedro II",
    },
  });

  // Criar turma de exemplo
  const turma = await prisma.class.create({
    data: {
      name: "3º Ano A",
      description: "Turma de demonstração do TechApoio",
      year: 3,
      teacherId: teacher.id,
    },
  });

  // Criar alguns estudantes de exemplo
  const students = [
    { name: "Ana Clara", age: 8, grade: 3 },
    { name: "Pedro Santos", age: 9, grade: 3 },
    { name: "Sofia Lima", age: 8, grade: 3 },
    { name: "João Paulo", age: 9, grade: 3 },
  ];

  await Promise.all(
    students.map((student) =>
      prisma.student.create({
        data: {
          name: student.name,
          age: student.age,
          grade: student.grade,
          teacherId: teacher.id,
          classId: turma.id,
        },
      })
    )
  );

  console.log("✅ Usuários e estudantes criados!");
  console.log("🎉 Seed concluído com sucesso!");
}

try {
  await main();
  await prisma.$disconnect();
} catch (e) {
  console.error("❌ Erro no seed:", e);
  await prisma.$disconnect();
  process.exit(1);
}
