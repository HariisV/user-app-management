-- AddForeignKey
ALTER TABLE "program_kids_logs" ADD CONSTRAINT "program_kids_logs_programKidId_fkey" FOREIGN KEY ("programKidId") REFERENCES "program_kids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
