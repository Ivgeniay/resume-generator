import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useResumeData } from "../hooks/useResumeData";
import { useTemplates } from "../hooks/useTemplates";
import { ResumeService } from "../services/resumeService";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { EditableResume } from "../components/editor/EditableResume";

interface LocationState {
	selectedTemplate: string;
}

export const EditPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const state = location.state as LocationState;

	const { generatedData } = useResumeData();
	const { previewTemplate } = useTemplates();

	const [resumeHtml, setResumeHtml] = useState<string>("");
	const [editedData, setEditedData] = useState(generatedData);
	const [isLoadingPreview, setIsLoadingPreview] = useState(true);
	const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const selectedTemplate = state?.selectedTemplate;

	useEffect(() => {
		// if (!generatedData || !selectedTemplate) {
		// 	navigate("/");
		// 	return;
		// }

		loadPreview();
	}, [generatedData, selectedTemplate]);

	const loadPreview = async () => {
		if (!selectedTemplate || !editedData) return;

		setIsLoadingPreview(true);
		setError(null);

		try {
			const html = await previewTemplate(selectedTemplate, editedData);
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
		setEditedData(newData);
		loadPreview();
	};

	const handleSaveAsPdf = async () => {
		if (!selectedTemplate || !editedData) return;

		setIsGeneratingPdf(true);
		setError(null);

		try {
			const pdfBlob = await ResumeService.generatePdf({
				templateName: selectedTemplate,
				resumeData: editedData,
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
					<Button onClick={handleBack}>Go Back</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<header className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Edit Your Resume
						</h1>
						<p className="text-gray-600">
							Make any final adjustments and download your resume
							as PDF
						</p>
					</div>

					<div className="flex space-x-4">
						<Button variant="outline" onClick={handleBack}>
							<svg
								className="w-4 h-4 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							Back
						</Button>

						<Button
							onClick={handleSaveAsPdf}
							disabled={isGeneratingPdf || isLoadingPreview}
							isLoading={isGeneratingPdf}
						>
							<svg
								className="w-4 h-4 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
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
							resumeData={editedData}
							onDataChange={handleDataChange}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
