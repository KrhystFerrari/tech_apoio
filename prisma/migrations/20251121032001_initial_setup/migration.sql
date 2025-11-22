-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'TEACHER',
    "school" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classId" TEXT,
    CONSTRAINT "students_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'EASY',
    "minAge" INTEGER NOT NULL DEFAULT 6,
    "maxAge" INTEGER NOT NULL DEFAULT 10,
    "instructions" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subjectId" TEXT NOT NULL,
    CONSTRAINT "activities_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "bestScore" INTEGER NOT NULL DEFAULT 0,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "lastPlayed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "studentId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    CONSTRAINT "progress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "progress_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "game_scores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" INTEGER NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "mistakes" INTEGER NOT NULL DEFAULT 0,
    "hints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    CONSTRAINT "game_scores_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_scores_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 10,
    "rarity" TEXT NOT NULL DEFAULT 'COMMON',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "student_badges" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "earnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    CONSTRAINT "student_badges_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_badges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "rankings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "period" TEXT NOT NULL,
    "subjectId" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rankings_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "student_rankings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "rankingId" TEXT NOT NULL,
    CONSTRAINT "student_rankings_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_rankings_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "rankings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "media_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "period" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT,
    "subjectId" TEXT,
    CONSTRAINT "reports_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reports_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "reports_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "words" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'EASY',
    "category" TEXT NOT NULL,
    "syllables" INTEGER NOT NULL,
    "audioUrl" TEXT,
    "imageUrl" TEXT,
    "meaning" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "audioFileId" TEXT,
    "imageFileId" TEXT,
    CONSTRAINT "words_audioFileId_fkey" FOREIGN KEY ("audioFileId") REFERENCES "media_files" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "words_imageFileId_fkey" FOREIGN KEY ("imageFileId") REFERENCES "media_files" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "numbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "written" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'EASY',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "progress_studentId_activityId_key" ON "progress"("studentId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "badges_name_key" ON "badges"("name");

-- CreateIndex
CREATE UNIQUE INDEX "student_badges_studentId_badgeId_key" ON "student_badges"("studentId", "badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "student_rankings_studentId_rankingId_key" ON "student_rankings"("studentId", "rankingId");

-- CreateIndex
CREATE UNIQUE INDEX "words_word_key" ON "words"("word");

-- CreateIndex
CREATE UNIQUE INDEX "numbers_number_key" ON "numbers"("number");
