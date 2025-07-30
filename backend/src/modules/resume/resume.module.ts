import { Module } from "@nestjs/common";
import { ResumeController } from "./resume.controller";
import { ResumeService } from "./resume.service";
import { AIModule } from "../ai/ai.module";
import { TemplateModule } from "../template/template.module";
import { PdfModule } from "../pdf/pdf.module";

@Module({
	imports: [AIModule, TemplateModule, PdfModule],
	controllers: [ResumeController],
	providers: [ResumeService],
	exports: [ResumeService],
})
export class ResumeModule {}
