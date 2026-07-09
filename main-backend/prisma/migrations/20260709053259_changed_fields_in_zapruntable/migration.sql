/*
  Warnings:

  - You are about to drop the column `sucess` on the `Zaprun` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Zaprun" DROP COLUMN "sucess",
ADD COLUMN     "status" "ExecutionStatus" NOT NULL DEFAULT 'SUCCESS';
