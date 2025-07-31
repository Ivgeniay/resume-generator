import { useState, useEffect, useCallback } from "react";
import type { TemplateInfo, TemplateContentResponseDto } from "../types";
import { TemplateService } from "../services/templateService";

interface UseTemplatesReturn {
	templates: TemplateInfo[];
	selectedTemplate: string | null;
	templateContent: TemplateContentResponseDto | null;
	templatePreviews: Record<string, string>;
	isLoading: boolean;
	isLoadingPreviews: boolean;
	error: string | null;

	selectTemplate: (templateName: string) => void;
	loadTemplateContent: (templateName: string) => Promise<void>;
	previewTemplate: (templateName: string, resumeData: any) => Promise<string>;
	loadAllPreviews: () => Promise<void>;
	clearError: () => void;
}

const mockResumeData = {
	personalInfo: {
		fullName: "John Doe",
		position: "Software Engineer",
		email: "john.doe@example.com",
		phone: "+1 (555) 123-4567",
		location: "New York, NY",
	},
	education: [
		{
			institution: "Harvard University",
			degree: "Bachelor of Science",
			fieldOfStudy: "Computer Science",
			startDate: "2018",
			endDate: "2022",
			description:
				"Relevant coursework in algorithms, data structures, and software engineering.",
		},
	],
	experience: [
		{
			company: "Google Inc.",
			position: "Software Engineer",
			startDate: "Jan 2022",
			endDate: "Present",
			description:
				"• Developed scalable web applications using React and Node.js\n• Improved system performance by 40% through optimization\n• Led a team of 5 developers on key projects",
		},
	],
	skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS"],
};

export const useTemplates = (): UseTemplatesReturn => {
	const [templates, setTemplates] = useState<TemplateInfo[]>([]);
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
		null
	);
	const [templateContent, setTemplateContent] =
		useState<TemplateContentResponseDto | null>(null);
	const [templatePreviews, setTemplatePreviews] = useState<
		Record<string, string>
	>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingPreviews, setIsLoadingPreviews] = useState(false);
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

	const loadAllPreviews = useCallback(async () => {
		if (templates.length === 0) return;

		setIsLoadingPreviews(true);
		setError(null);

		try {
			const previews: Record<string, string> = {};

			for (const template of templates) {
				try {
					const previewHtml = await TemplateService.previewTemplate(
						template.name,
						mockResumeData
					);
					previews[template.name] = previewHtml;
				} catch (err) {
					console.error(
						`Failed to load preview for ${template.name}:`,
						err
					);
					previews[template.name] = "";
				}
			}

			setTemplatePreviews(previews);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to load template previews"
			);
		} finally {
			setIsLoadingPreviews(false);
		}
	}, [templates]);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	useEffect(() => {
		loadTemplates();
	}, [loadTemplates]);

	useEffect(() => {
		if (templates.length > 0) {
			loadAllPreviews();
		}
	}, [templates, loadAllPreviews]);

	return {
		templates,
		selectedTemplate,
		templateContent,
		templatePreviews,
		isLoading,
		isLoadingPreviews,
		error,
		selectTemplate,
		loadTemplateContent,
		previewTemplate,
		loadAllPreviews,
		clearError,
	};
};
