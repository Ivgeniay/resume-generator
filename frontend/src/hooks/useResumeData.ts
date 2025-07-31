import { useState, useCallback } from "react";
import type {
	ResumeFormData,
	FormFieldLock,
	AISettings,
	GenerateResumeResponseDto,
	GenerateResumeRequestDto,
} from "../types";
import { ResumeService } from "../services/resumeService";

interface UseResumeDataReturn {
	formData: ResumeFormData;
	generatedData: GenerateResumeResponseDto | null;
	lockedFields: FormFieldLock;
	aiSettings: AISettings;
	isLoading: boolean;
	error: string | null;

	updateFormData: (data: Partial<ResumeFormData>) => void;
	updateLockedFields: (fields: Partial<FormFieldLock>) => void;
	updateAISettings: (settings: Partial<AISettings>) => void;
	generateResume: () => Promise<void>;
	resetData: () => void;
	clearError: () => void;
}

const defaultFormData: ResumeFormData = {
	personalInfo: {
		fullName: "",
		position: "",
		email: "",
		phone: "",
		location: "",
	},
	education: [],
	experience: [],
	skills: [],
};

const defaultLockedFields: FormFieldLock = {
	personalInfo: false,
	education: false,
	experience: false,
	skills: false,
};

const defaultAISettings: AISettings = {
	model: "gpt-4o-mini",
	temperature: 0.7,
	prompt: "",
};

export const useResumeData = (): UseResumeDataReturn => {
	const [formData, setFormData] = useState<ResumeFormData>(defaultFormData);
	const [generatedData, setGeneratedData] =
		useState<GenerateResumeResponseDto | null>(null);
	const [lockedFields, setLockedFields] =
		useState<FormFieldLock>(defaultLockedFields);
	const [aiSettings, setAISettings] = useState<AISettings>(defaultAISettings);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateFormData = useCallback((data: Partial<ResumeFormData>) => {
		setFormData((prev) => ({ ...prev, ...data }));
	}, []);

	const updateLockedFields = useCallback((fields: Partial<FormFieldLock>) => {
		setLockedFields((prev) => ({ ...prev, ...fields }));
	}, []);

	const updateAISettings = useCallback((settings: Partial<AISettings>) => {
		setAISettings((prev) => ({ ...prev, ...settings }));
	}, []);

	const generateResume = useCallback(async () => {
		if (!aiSettings.prompt.trim()) {
			setError("Please provide a prompt for AI generation");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const requestData: GenerateResumeRequestDto = {
				prompt: aiSettings.prompt,
				model: aiSettings.model,
				temperature: aiSettings.temperature,
				personalInfo: formData.personalInfo,
				education: formData.education,
				experience: formData.experience,
				skills: formData.skills,
				lockedFields: lockedFields,
			};

			const result = await ResumeService.generateResume(requestData);
			console.log(result);
			setGeneratedData(result);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to generate resume"
			);
		} finally {
			setIsLoading(false);
		}
	}, [formData, lockedFields, aiSettings]);

	const resetData = useCallback(() => {
		setFormData(defaultFormData);
		setGeneratedData(null);
		setLockedFields(defaultLockedFields);
		setAISettings(defaultAISettings);
		setError(null);
	}, []);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	return {
		formData,
		generatedData,
		lockedFields,
		aiSettings,
		isLoading,
		error,
		updateFormData,
		updateLockedFields,
		updateAISettings,
		generateResume,
		resetData,
		clearError,
	};
};
