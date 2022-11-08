-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_user" TEXT NOT NULL,
    "name_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
