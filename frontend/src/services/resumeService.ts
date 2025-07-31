import { api, handleApiError, isApiResponse } from "./api";
import type {
	GenerateResumeRequestDto,
	GenerateResumeResponseDto,
	GeneratePdfRequestDto,
	ApiResponse,
} from "../types";

export class ResumeService {
	static async generateResume(
		requestData: GenerateResumeRequestDto
	): Promise<GenerateResumeResponseDto> {
		try {
			const response = await api.post<
				ApiResponse<GenerateResumeResponseDto>
			>("/api/generate", requestData);

			if (isApiResponse<GenerateResumeResponseDto>(response.data)) {
				if (response.data.success && response.data.data) {
					return response.data.data;
				} else {
					throw new Error(
						response.data.error || "Failed to generate resume"
					);
				}
			}

			throw new Error("Invalid response format");
		} catch (error) {
			throw new Error(handleApiError(error));
		}
	}

	static async generatePdf(
		requestData: GeneratePdfRequestDto
	): Promise<Blob> {
		try {
			const response = await api.post("/api/pdf", requestData, {
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.data instanceof Blob) {
				return response.data;
			}

			throw new Error("Invalid PDF response format");
		} catch (error) {
			throw new Error(handleApiError(error));
		}
	}

	static downloadPdf(blob: Blob, filename: string = "resume.pdf"): void {
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}
}
