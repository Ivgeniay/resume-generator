import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ResumeModule } from "./modules/resume/resume.module";
import { AIModule } from "./modules/ai/ai.module";
import { TemplateModule } from "./modules/template/template.module";
import { PdfModule } from "./modules/pdf/pdf.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
		}),
		ResumeModule,
		AIModule,
		TemplateModule,
		PdfModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
