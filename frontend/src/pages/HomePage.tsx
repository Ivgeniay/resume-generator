import React from "react";
import { useNavigate } from "react-router-dom";
import { useResumeData } from "../hooks/useResumeData";
import { useTemplates } from "../hooks/useTemplates";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ResumeForm } from "../components/forms/ResumeForm";
import { TemplateGallery } from "../components/templates/TemplateGallery";

export const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const {
		formData,
		lockedFields,
		aiSettings,
		isLoading: isGenerating,
		error,
		updateFormData,
		updateLockedFields,
		updateAISettings,
		generateResume,
		clearError,
	} = useResumeData();

	const {
		templates,
		selectedTemplate,
		isLoading: isLoadingTemplates,
		error: templateError,
		selectTemplate,
		clearError: clearTemplateError,
	} = useTemplates();

	const handleGenerate = async () => {
		if (!selectedTemplate) {
			alert("Please select a template first");
			return;
		}

		await generateResume();

		if (!error) {
			navigate("/edit", {
				state: {
					selectedTemplate,
				},
			});
		}
	};

	const canGenerate = selectedTemplate && aiSettings.prompt.trim().length > 0;

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<header className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						AI Resume Generator
					</h1>
					<p className="text-xl text-gray-600">
						Create professional resumes with AI assistance
					</p>
				</header>

				{isLoadingTemplates && (
					<div className="flex justify-center mb-8">
						<LoadingSpinner size="lg" text="Loading templates..." />
					</div>
				)}

				{templateError && (
					<div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg
									className="h-5 w-5 text-red-400"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div className="ml-3">
								<h3 className="text-sm font-medium text-red-800">
									Template Error
								</h3>
								<p className="text-sm text-red-700 mt-1">
									{templateError}
								</p>
								<button
									onClick={clearTemplateError}
									className="text-sm text-red-600 underline mt-2"
								>
									Dismiss
								</button>
							</div>
						</div>
					</div>
				)}

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div className="space-y-8">
						<section>
							<h2 className="text-2xl font-semibold text-gray-900 mb-6">
								Choose Template
							</h2>
							<TemplateGallery
								templates={templates}
								selectedTemplate={selectedTemplate}
								onSelectTemplate={selectTemplate}
							/>
						</section>
					</div>

					<div className="space-y-8">
						<section>
							<h2 className="text-2xl font-semibold text-gray-900 mb-6">
								Fill Your Information
							</h2>
							<ResumeForm
								formData={formData}
								lockedFields={lockedFields}
								aiSettings={aiSettings}
								onUpdateFormData={updateFormData}
								onUpdateLockedFields={updateLockedFields}
								onUpdateAISettings={updateAISettings}
							/>
						</section>

						{error && (
							<div className="bg-red-50 border border-red-200 rounded-md p-4">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg
											className="h-5 w-5 text-red-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<h3 className="text-sm font-medium text-red-800">
											Generation Error
										</h3>
										<p className="text-sm text-red-700 mt-1">
											{error}
										</p>
										<button
											onClick={clearError}
											className="text-sm text-red-600 underline mt-2"
										>
											Dismiss
										</button>
									</div>
								</div>
							</div>
						)}

						<div className="flex justify-center">
							<Button
								size="lg"
								onClick={handleGenerate}
								disabled={!canGenerate || isGenerating}
								isLoading={isGenerating}
								className="w-full max-w-md"
							>
								{isGenerating
									? "Generating Resume..."
									: "Create Resume"}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
