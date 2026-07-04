-- DropIndex
DROP INDEX "Action_zapId_key";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';
