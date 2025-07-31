import React, { type JSX } from "react";
import type { TemplateInfo } from "../../types";

interface TemplateCardProps {
	template: TemplateInfo;
	isSelected: boolean;
	onSelect: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
	template,
	isSelected,
	onSelect,
}) => {
	const getTemplatePreview = (templateName: string) => {
		const previews: Record<string, string> = {
			professional: "bg-gradient-to-br from-gray-700 to-gray-900",
			modern: "bg-gradient-to-br from-blue-500 to-purple-600",
			creative: "bg-gradient-to-br from-pink-500 to-orange-500",
			classic: "bg-gradient-to-br from-green-600 to-blue-600",
			geometric: "bg-gradient-to-br from-yellow-500 to-red-500",
		};

		return (
			previews[templateName] ||
			"bg-gradient-to-br from-gray-400 to-gray-600"
		);
	};

	const getTemplateIcon = (templateName: string) => {
		const icons: Record<string, JSX.Element> = {
			professional: (
				<svg
					className="w-8 h-8 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
					/>
				</svg>
			),
			modern: (
				<svg
					className="w-8 h-8 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
			),
			creative: (
				<svg
					className="w-8 h-8 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
					/>
				</svg>
			),
			classic: (
				<svg
					className="w-8 h-8 text-white"
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
			),
			geometric: (
				<svg
					className="w-8 h-8 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
					/>
				</svg>
			),
		};

		return icons[templateName] || icons.professional;
	};

	const getTemplateDescription = (templateName: string) => {
		const descriptions: Record<string, string> = {
			professional:
				"Clean and corporate design perfect for traditional industries",
			modern: "Contemporary layout with bold colors and modern typography",
			creative: "Artistic and unique design for creative professionals",
			classic: "Timeless and elegant design suitable for any profession",
			geometric: "Bold geometric patterns with contemporary styling",
		};

		return descriptions[templateName] || "A professional resume template";
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
				<div
					className={`
          w-full h-32 rounded-md mb-3 flex items-center justify-center
          ${getTemplatePreview(template.name)}
        `}
				>
					{getTemplateIcon(template.name)}
				</div>

				<div className="space-y-2">
					<h3 className="font-medium text-gray-900 text-center">
						{template.displayName}
					</h3>
					<p className="text-sm text-gray-500 text-center">
						{getTemplateDescription(template.name)}
					</p>
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
