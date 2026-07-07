-- DropForeignKey
ALTER TABLE "Zaprun" DROP CONSTRAINT "Zaprun_zapId_fkey";

-- AddForeignKey
ALTER TABLE "Zaprun" ADD CONSTRAINT "Zaprun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE CASCADE ON UPDATE CASCADE;
