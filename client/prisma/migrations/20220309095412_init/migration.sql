/*
  Warnings:

  - You are about to drop the `Current_bug` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Current_bug";

-- CreateTable
CREATE TABLE "current_bug" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(650),
    "location" VARCHAR(255) NOT NULL,
    "processToReplicate" VARCHAR(650) NOT NULL,
    "priorityStatus" VARCHAR(50) NOT NULL,
    "author" VARCHAR(150) NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedBy" VARCHAR(150),
    "url" VARCHAR(255),

    CONSTRAINT "current_bug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "authBy" VARCHAR(50),
    "numbOfRaisedBugAllowed" INTEGER NOT NULL DEFAULT 3,
    "allowedToModifyBugReport" BOOLEAN NOT NULL DEFAULT false,
    "allowedToDeleteBugReport" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- AddForeignKey
ALTER TABLE "current_bug" ADD CONSTRAINT "current_bug_author_fkey" FOREIGN KEY ("author") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
