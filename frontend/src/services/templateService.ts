import { api, handleApiError } from "./api";
import type {
	TemplateListResponseDto,
	TemplateContentResponseDto,
	TemplateContentRequestDto,
} from "../types";

export class TemplateService {
	static async getTemplatesList(): Promise<string[]> {
		try {
			const response = await api.get<TemplateListResponseDto>(
				"/api/templates"
			);
			return response.data.templates;
		} catch (error) {
			throw new Error(handleApiError(error));
		}
	}

	static async getTemplateContent(
		templateName: string
	): Promise<TemplateContentResponseDto> {
		try {
			const response = await api.get<TemplateContentResponseDto>(
				`/api/templates/${templateName}`
			);
			return response.data;
		} catch (error) {
			throw new Error(handleApiError(error));
		}
	}

	static async previewTemplate(
		templateName: string,
		resumeData: any
	): Promise<string> {
		try {
			const template = await this.getTemplateContent(templateName);
			return this.fillTemplate(template, resumeData);
		} catch (error) {
			throw new Error(handleApiError(error));
		}
	}

	private static fillTemplate(
		template: TemplateContentResponseDto,
		data: any
	): string {
		let html = template.html;

		html = html.replace("{{CSS}}", template.css || "");

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

		html = replaceTokens(html, data);
		html = html.replace("{{RESUME_DATA}}", JSON.stringify(data));

		return html;
	}
}
