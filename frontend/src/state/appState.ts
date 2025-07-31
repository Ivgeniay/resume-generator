import { create } from "zustand";
import type { GenerateResumeResponseDto } from "../types";

interface AppState {
	generatedData: GenerateResumeResponseDto | null;
	selectedTemplate: string | null;
	isGenerating: boolean;
	error: string | null;

	setGeneratedData: (data: GenerateResumeResponseDto | null) => void;
	setSelectedTemplate: (template: string | null) => void;
	setIsGenerating: (loading: boolean) => void;
	setError: (error: string | null) => void;
	resetData: () => void;
}

export const useAppStore = create<AppState>((set) => ({
	generatedData: null,
	selectedTemplate: null,
	isGenerating: false,
	error: null,

	setGeneratedData: (data) => set({ generatedData: data }),
	setSelectedTemplate: (template) => set({ selectedTemplate: template }),
	setIsGenerating: (loading) => set({ isGenerating: loading }),
	setError: (error) => set({ error }),

	resetData: () =>
		set({
			generatedData: null,
			selectedTemplate: null,
			isGenerating: false,
			error: null,
		}),
}));
