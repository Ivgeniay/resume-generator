import { Injectable } from "@nestjs/common";
import { AIService } from "../ai/ai.service";
import { TemplateService } from "../template/template.service";
import { PdfService } from "../pdf/pdf.service";
import {
	GenerateResumeRequestDto,
	GenerateResumeResponseDto,
	GeneratePdfRequestDto,
} from "commonLib";

@Injectable()
export class ResumeService {
	constructor(
		private readonly aiService: AIService,
		private readonly templateService: TemplateService,
		private readonly pdfService: PdfService
	) {}

	async generateResumeData(
		request: GenerateResumeRequestDto
	): Promise<GenerateResumeResponseDto> {
		const aiRequest = {
			prompt: request.prompt,
			temperature:
				request.temperature === null ? 0.7 : request.temperature,
			model: request.model,
			context: {
				personalInfo: request.personalInfo,
				education: request.education,
				experience: request.experience,
				skills: request.skills,
			},
			lockedFields: request.lockedFields,
		};

		const result = await this.aiService.processResumeData(aiRequest);

		return {
			personalInfo: result.personalInfo,
			education: result.education,
			experience: result.experience,
			skills: result.skills,
		};
	}

	async generatePdf(request: GeneratePdfRequestDto): Promise<Uint8Array> {
		const template = await this.templateService.getTemplateContent(
			request.templateName
		);

		let html = template.html;

		html = html.replace("{{CSS}}", template.css || "");

		const filledHtml = this.fillTemplate(html, request.resumeData);

		return await this.pdfService.generatePdfFromHtml(filledHtml);
	}

	private fillTemplate(html: string, data: any): string {
		const replaceTokens = (
			htmlContent: string,
			obj: any,
			prefix: string = ""
		): string => {
			for (const [key, value] of Object.entries(obj)) {
				const token = `{{${prefix}${key}}}`;
				if (
					typeof value === "object" &&
					value !== null &&
					!Array.isArray(value)
				) {
					htmlContent = replaceTokens(
						htmlContent,
						value,
						`${prefix}${key}.`
					);
				} else if (Array.isArray(value)) {
					htmlContent = htmlContent.replace(
						new RegExp(token, "g"),
						JSON.stringify(value)
					);
				} else {
					htmlContent = htmlContent.replace(
						new RegExp(token, "g"),
						String(value || "")
					);
				}
			}
			return htmlContent;
		};

		let filledHtml = replaceTokens(html, data);

		filledHtml = filledHtml.replace(
			"{{RESUME_DATA}}",
			JSON.stringify(data)
		);

		return filledHtml;
	}
}
