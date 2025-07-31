import React, { useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
	showCloseButton?: boolean;
	closeOnOverlayClick?: boolean;
	closeOnEscape?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
	showCloseButton = true,
	closeOnOverlayClick = true,
	closeOnEscape = true,
}) => {
	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
	};

	useEffect(() => {
		if (!closeOnEscape) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose, closeOnEscape]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex min-h-screen items-center justify-center p-4">
				<div
					className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
					onClick={closeOnOverlayClick ? onClose : undefined}
				/>

				<div
					className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all`}
				>
					{(title || showCloseButton) && (
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							{title && (
								<h3 className="text-lg font-medium text-gray-900">
									{title}
								</h3>
							)}

							{showCloseButton && (
								<button
									onClick={onClose}
									className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
								>
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							)}
						</div>
					)}

					<div className="p-6">{children}</div>
				</div>
			</div>
		</div>
	);
};
