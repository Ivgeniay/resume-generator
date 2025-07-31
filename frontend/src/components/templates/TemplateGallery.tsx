import React from "react";
import type { TemplateInfo } from "../../types";
import { TemplateCard } from "./TemplateCard";

interface TemplateGalleryProps {
	templates: TemplateInfo[];
	selectedTemplate: string | null;
	onSelectTemplate: (templateName: string) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
	templates,
	selectedTemplate,
	onSelectTemplate,
}) => {
	if (templates.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
					<svg
						className="w-8 h-8 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					No Templates Available
				</h3>
				<p className="text-gray-500">
					Please check your connection and try again.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{templates.map((template) => (
					<TemplateCard
						key={template.name}
						template={template}
						isSelected={selectedTemplate === template.name}
						onSelect={() => onSelectTemplate(template.name)}
					/>
				))}
			</div>

			{selectedTemplate && (
				<div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
					<div className="flex items-center">
						<svg
							className="w-5 h-5 text-blue-500 mr-2"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-sm font-medium text-blue-800">
							Selected:{" "}
							{
								templates.find(
									(t) => t.name === selectedTemplate
								)?.displayName
							}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};
