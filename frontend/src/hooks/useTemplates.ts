import { useState, useEffect, useCallback } from "react";
import type { TemplateInfo, TemplateContentResponseDto } from "../types";
import { TemplateService } from "../services/templateService";

interface UseTemplatesReturn {
	templates: TemplateInfo[];
	selectedTemplate: string | null;
	templateContent: TemplateContentResponseDto | null;
	isLoading: boolean;
	error: string | null;

	selectTemplate: (templateName: string) => void;
	loadTemplateContent: (templateName: string) => Promise<void>;
	previewTemplate: (templateName: string, resumeData: any) => Promise<string>;
	clearError: () => void;
}

export const useTemplates = (): UseTemplatesReturn => {
	const [templates, setTemplates] = useState<TemplateInfo[]>([]);
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
		null
	);
	const [templateContent, setTemplateContent] =
		useState<TemplateContentResponseDto | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const formatTemplateInfo = (templateNames: string[]): TemplateInfo[] => {
		return templateNames.map((name) => ({
			name,
			displayName:
				name.charAt(0).toUpperCase() +
				name.slice(1).replace(/[-_]/g, " "),
		}));
	};

	const loadTemplates = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const templateNames = await TemplateService.getTemplatesList();
			const templateInfos = formatTemplateInfo(templateNames);
			setTemplates(templateInfos);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to load templates"
			);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const selectTemplate = useCallback((templateName: string) => {
		setSelectedTemplate(templateName);
	}, []);

	const loadTemplateContent = useCallback(async (templateName: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const content = await TemplateService.getTemplateContent(
				templateName
			);
			setTemplateContent(content);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to load template content"
			);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const previewTemplate = useCallback(
		async (templateName: string, resumeData: any): Promise<string> => {
			try {
				return await TemplateService.previewTemplate(
					templateName,
					resumeData
				);
			} catch (err) {
				const errorMessage =
					err instanceof Error
						? err.message
						: "Failed to preview template";
				setError(errorMessage);
				throw new Error(errorMessage);
			}
		},
		[]
	);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	useEffect(() => {
		loadTemplates();
	}, [loadTemplates]);

	return {
		templates,
		selectedTemplate,
		templateContent,
		isLoading,
		error,
		selectTemplate,
		loadTemplateContent,
		previewTemplate,
		clearError,
	};
};
