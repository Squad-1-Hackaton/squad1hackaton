-- CreateEnum
CREATE TYPE "content_type" AS ENUM ('Artigo', 'Video', 'Podcast', 'Curso');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contents" (
    "id" SERIAL NOT NULL,
    "type" "content_type" NOT NULL,
    "title" TEXT NOT NULL,
    "topic" TEXT DEFAULT ' ',
    "provider" TEXT,
    "duration" TEXT,
    "reference" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trailId" INTEGER NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersontrails" (
    "userId" INTEGER NOT NULL,
    "trailId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usersontrails_pkey" PRIMARY KEY ("userId","trailId")
);

-- CreateTable
CREATE TABLE "usersoncontents" (
    "id_user" INTEGER NOT NULL,
    "id_content" INTEGER NOT NULL,
    "concluded" BOOLEAN NOT NULL,

    CONSTRAINT "usersoncontents_pkey" PRIMARY KEY ("id_user","id_content")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "trails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersontrails" ADD CONSTRAINT "usersontrails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersontrails" ADD CONSTRAINT "usersontrails_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "trails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersoncontents" ADD CONSTRAINT "usersoncontents_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersoncontents" ADD CONSTRAINT "usersoncontents_id_content_fkey" FOREIGN KEY ("id_content") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
