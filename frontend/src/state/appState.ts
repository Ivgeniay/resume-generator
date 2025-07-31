import { create } from "zustand";
import type {
	ResumeFormData,
	FormFieldLock,
	AISettings,
	GenerateResumeResponseDto,
} from "../types";

interface AppState {
	formData: ResumeFormData;
	lockedFields: FormFieldLock;
	aiSettings: AISettings;

	generatedData: GenerateResumeResponseDto | null;

	selectedTemplate: string | null;

	isGenerating: boolean;
	error: string | null;

	setFormData: (data: Partial<ResumeFormData>) => void;
	setLockedFields: (fields: Partial<FormFieldLock>) => void;
	setAISettings: (settings: Partial<AISettings>) => void;
	setGeneratedData: (data: GenerateResumeResponseDto | null) => void;
	setSelectedTemplate: (template: string | null) => void;
	setIsGenerating: (loading: boolean) => void;
	setError: (error: string | null) => void;
	resetData: () => void;
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
	model: "gpt-4",
	temperature: 0.7,
	prompt: "",
};

export const useAppStore = create<AppState>((set, get) => ({
	formData: defaultFormData,
	lockedFields: defaultLockedFields,
	aiSettings: defaultAISettings,
	generatedData: null,
	selectedTemplate: null,
	isGenerating: false,
	error: null,

	setFormData: (data) =>
		set((state) => ({
			formData: { ...state.formData, ...data },
		})),

	setLockedFields: (fields) =>
		set((state) => ({
			lockedFields: { ...state.lockedFields, ...fields },
		})),

	setAISettings: (settings) =>
		set((state) => ({
			aiSettings: { ...state.aiSettings, ...settings },
		})),

	setGeneratedData: (data) => set({ generatedData: data }),

	setSelectedTemplate: (template) => set({ selectedTemplate: template }),

	setIsGenerating: (loading) => set({ isGenerating: loading }),

	setError: (error) => set({ error }),

	resetData: () =>
		set({
			formData: defaultFormData,
			lockedFields: defaultLockedFields,
			aiSettings: defaultAISettings,
			generatedData: null,
			selectedTemplate: null,
			error: null,
		}),
}));
