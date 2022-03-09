-- CreateTable
CREATE TABLE "Current_bug" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(650),
    "location" VARCHAR(255) NOT NULL,
    "processToReplicate" VARCHAR(650) NOT NULL,
    "priorityStatus" VARCHAR(50) NOT NULL,
    "author" VARCHAR(150),
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedBy" VARCHAR(150),
    "url" VARCHAR(255),

    CONSTRAINT "Current_bug_pkey" PRIMARY KEY ("id")
);
