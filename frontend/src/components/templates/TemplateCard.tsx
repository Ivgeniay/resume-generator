import React from "react";
import type { TemplateInfo } from "../../types";

interface TemplateCardProps {
	template: TemplateInfo;
	isSelected: boolean;
	onSelect: () => void;
	previewHtml?: string;
	isLoadingPreview?: boolean;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
	template,
	isSelected,
	onSelect,
	previewHtml,
	isLoadingPreview = false,
}) => {
	const renderPreview = () => {
		if (isLoadingPreview) {
			return (
				<div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
					<div className="flex flex-col items-center space-y-2">
						<div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
						<span className="text-xs text-gray-500">
							Loading...
						</span>
					</div>
				</div>
			);
		}

		if (previewHtml) {
			return (
				<div className="w-full h-48 bg-white rounded-md border overflow-hidden">
					<iframe
						srcDoc={previewHtml}
						className="w-full h-full transform scale-[0.25] origin-top-left"
						style={{
							width: "400%",
							height: "400%",
							pointerEvents: "none",
						}}
						title={`${template.displayName} Preview`}
					/>
				</div>
			);
		}

		return (
			<div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
				<div className="text-center">
					<svg
						className="w-12 h-12 text-gray-400 mx-auto mb-2"
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
					<span className="text-xs text-gray-500">
						Preview not available
					</span>
				</div>
			</div>
		);
	};

	return (
		<div
			onClick={onSelect}
			className={`
        relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-lg
        ${
			isSelected
				? "border-blue-500 shadow-lg ring-2 ring-blue-200"
				: "border-gray-200 hover:border-gray-300"
		}
      `}
		>
			<div className="p-4">
				{renderPreview()}

				<div className="mt-3">
					<h3 className="font-medium text-gray-900 text-center">
						{template.displayName}
					</h3>
				</div>
			</div>

			{isSelected && (
				<div className="absolute top-2 right-2">
					<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
						<svg
							className="w-4 h-4 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			)}
		</div>
	);
};
