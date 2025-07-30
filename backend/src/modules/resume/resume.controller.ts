import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ResumeService } from "./resume.service";
import {
	GenerateResumeRequestDto,
	GenerateResumeResponseDto,
	GeneratePdfRequestDto,
	ApiResponse,
} from "commonLib";

@Controller("api")
export class ResumeController {
	constructor(private readonly resumeService: ResumeService) {}

	@Post("generate")
	async generateResume(
		@Body() request: GenerateResumeRequestDto
	): Promise<ApiResponse<GenerateResumeResponseDto>> {
		try {
			const result = await this.resumeService.generateResumeData(request);

			return {
				success: true,
				data: result,
				message: "Resume generated successfully",
			};
		} catch (error) {
			return {
				success: false,
				error: error.message || "Failed to generate resume",
			};
		}
	}

	@Post("pdf")
	async generatePdf(
		@Body() request: GeneratePdfRequestDto,
		@Res() res: Response
	): Promise<void> {
		try {
			const pdfBuffer = await this.resumeService.generatePdf(request);

			res.set({
				"Content-Type": "application/pdf",
				"Content-Disposition": 'attachment; filename="resume.pdf"',
				"Content-Length": pdfBuffer.length.toString(),
			});

			res.status(HttpStatus.OK).send(Buffer.from(pdfBuffer));
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				success: false,
				error: error.message || "Failed to generate PDF",
			});
		}
	}
}
