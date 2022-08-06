/*
  Warnings:

  - Added the required column `photoPath` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "photoPath" TEXT NOT NULL;
