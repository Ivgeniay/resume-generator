import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../state/appState";
import { useTemplates } from "../hooks/useTemplates";
import { ResumeService } from "../services/resumeService";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { EditableResume } from "../components/editor/EditableResume";

export const EditPage: React.FC = () => {
	const navigate = useNavigate();

	const { generatedData, selectedTemplate, setGeneratedData } = useAppStore();
	const { previewTemplate } = useTemplates();

	const [resumeHtml, setResumeHtml] = useState<string>("");
	const [isLoadingPreview, setIsLoadingPreview] = useState(true);
	const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!generatedData || !selectedTemplate) {
			navigate("/");
			return;
		}

		loadPreview();
	}, [generatedData, selectedTemplate, navigate]);

	const loadPreview = async () => {
		if (!selectedTemplate || !generatedData) return;

		// console.log("EditPage loadPreview:", { selectedTemplate, editedData });

		setIsLoadingPreview(true);
		setError(null);

		try {
			const html = await previewTemplate(selectedTemplate, generatedData);
			setResumeHtml(html);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to load preview"
			);
		} finally {
			setIsLoadingPreview(false);
		}
	};

	const handleDataChange = (newData: any) => {
		setGeneratedData(newData);
		// loadPreview();
	};

	const handleSaveAsPdf = async () => {
		if (!selectedTemplate || !generatedData) return;

		setIsGeneratingPdf(true);
		setError(null);

		try {
			const pdfBlob = await ResumeService.generatePdf({
				templateName: selectedTemplate,
				resumeData: generatedData,
			});

			ResumeService.downloadPdf(pdfBlob, "resume.pdf");
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to generate PDF"
			);
		} finally {
			setIsGeneratingPdf(false);
		}
	};

	const handleBack = () => {
		navigate("/");
	};

	if (!generatedData || !selectedTemplate) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						No Resume Data
					</h2>
					<p className="text-gray-600 mb-4">
						Please generate a resume first.
					</p>
					<Button onClick={handleBack}>Go Back to Home</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<header className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Edit Resume
						</h1>
						<p className="text-gray-600 mt-2">
							Template: {selectedTemplate}
						</p>
					</div>
					<div className="flex items-center space-x-4">
						<Button variant="outline" onClick={handleBack}>
							Back to Home
						</Button>
						<Button
							onClick={handleSaveAsPdf}
							disabled={isGeneratingPdf || isLoadingPreview}
							isLoading={isGeneratingPdf}
						>
							{isGeneratingPdf
								? "Generating PDF..."
								: "Save as PDF"}
						</Button>
					</div>
				</header>

				{error && (
					<div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
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
									Error
								</h3>
								<p className="text-sm text-red-700 mt-1">
									{error}
								</p>
								<button
									onClick={() => setError(null)}
									className="text-sm text-red-600 underline mt-2"
								>
									Dismiss
								</button>
							</div>
						</div>
					</div>
				)}

				{isLoadingPreview ? (
					<div className="flex justify-center items-center h-96">
						<LoadingSpinner
							size="lg"
							text="Loading resume preview..."
						/>
					</div>
				) : (
					<div className="bg-white rounded-lg shadow-lg">
						<EditableResume
							resumeHtml={resumeHtml}
							onDataChange={handleDataChange}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
