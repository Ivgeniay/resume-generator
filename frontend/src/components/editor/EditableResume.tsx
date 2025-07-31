import React, { useRef, useEffect, useState } from "react";
import { InlineEditor } from "./InlineEditor";
import { useAppStore } from "../../state/appState";

interface EditableResumeProps {
	resumeHtml: string;
	onDataChange: (newData: any) => void;
}

export const EditableResume: React.FC<EditableResumeProps> = ({
	resumeHtml,
	onDataChange,
}) => {
	const { generatedData } = useAppStore();
	const [isInlineEditing, setIsInlineEditing] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [editingElement, setEditingElement] = useState<{
		element: HTMLElement;
		path: string;
		value: string;
	} | null>(null);

	useEffect(() => {
		if (iframeRef.current && resumeHtml && !isInlineEditing) {
			const iframe = iframeRef.current;
			const doc =
				iframe.contentDocument || iframe.contentWindow?.document;

			if (doc) {
				doc.open();
				doc.write(resumeHtml);
				doc.close();

				setupEditableElements(doc);
			}
		}

		if (isInlineEditing) {
			setIsInlineEditing(false);
		}
	}, [resumeHtml]);

	const setupEditableElements = (doc: Document) => {
		const editableElements = doc.querySelectorAll("[data-editable]");

		editableElements.forEach((element) => {
			const htmlElement = element as HTMLElement;

			htmlElement.style.cursor = "pointer";
			htmlElement.style.transition = "all 0.2s ease";

			htmlElement.addEventListener("mouseenter", () => {
				htmlElement.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
				htmlElement.style.outline = "2px solid rgba(59, 130, 246, 0.3)";
			});

			htmlElement.addEventListener("mouseleave", () => {
				if (!editingElement || editingElement.element !== htmlElement) {
					htmlElement.style.backgroundColor = "";
					htmlElement.style.outline = "";
				}
			});

			htmlElement.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();

				const path = htmlElement.getAttribute("data-editable") || "";
				const currentValue = htmlElement.textContent || "";

				setEditingElement({
					element: htmlElement,
					path,
					value: currentValue,
				});
			});
		});
	};

	const updateNestedValue = (obj: any, path: string, value: string): any => {
		const keys = path.split(".");
		const result = JSON.parse(JSON.stringify(obj));
		let current = result;

		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			const nextKey = keys[i + 1];

			if (!isNaN(Number(nextKey))) {
				if (!current[key]) current[key] = [];
			} else {
				if (!current[key]) current[key] = {};
			}
			current = current[key];
		}

		const lastKey = keys[keys.length - 1];
		current[lastKey] = value;

		return result;
	};

	const handleSave = (newValue: string) => {
		if (!editingElement) return;

		setIsInlineEditing(true);

		editingElement.element.textContent = newValue;
		editingElement.element.style.backgroundColor = "";
		editingElement.element.style.outline = "";

		const updatedData = updateNestedValue(
			generatedData,
			editingElement.path,
			newValue
		);
		onDataChange(updatedData);

		setEditingElement(null);
	};

	const handleCancel = () => {
		if (editingElement) {
			editingElement.element.style.backgroundColor = "";
			editingElement.element.style.outline = "";
		}
		setEditingElement(null);
	};

	return (
		<div className="relative">
			<div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
				<div className="flex items-start">
					<svg
						className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clipRule="evenodd"
						/>
					</svg>
					<div>
						<h3 className="text-sm font-medium text-blue-800">
							How to Edit
						</h3>
						<p className="text-sm text-blue-700 mt-1">
							Click on any text in the resume to edit it. Hover
							over elements to see what can be edited.
						</p>
					</div>
				</div>
			</div>

			<div className="border border-gray-300 rounded-lg overflow-hidden">
				<iframe
					ref={iframeRef}
					className="w-full h-screen"
					style={{ minHeight: "800px" }}
					title="Resume Preview"
				/>
			</div>

			{editingElement && (
				<InlineEditor
					value={editingElement.value}
					onSave={handleSave}
					onCancel={handleCancel}
					isMultiline={editingElement.path.includes("description")}
				/>
			)}
		</div>
	);
};
