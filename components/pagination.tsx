"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
	page: number;
	totalPages: number;
	disabled?: boolean;
	onChange: (page: number) => void;
}

export function Pagination({
	page,
	totalPages,
	disabled,
	onChange,
}: PaginationProps) {
	return (
		<div className="flex items-center justify-between pt-4 border-t border-border">
			<Button
				variant="outline"
				size="sm"
				onClick={() => onChange(page - 1)}
				disabled={page === 1 || disabled}
				className="hover:rick-morty-gradient hover:text-primary-foreground transition-all duration-300"
			>
				<ChevronLeft className="w-4 h-4 mr-1" />
				Previous
			</Button>

			<span className="text-sm text-muted-foreground font-medium">
				{page} of {totalPages}
			</span>

			<Button
				variant="outline"
				size="sm"
				onClick={() => onChange(page + 1)}
				disabled={page === totalPages || disabled}
				className="hover:rick-morty-gradient hover:text-primary-foreground transition-all duration-300"
			>
				Next
				<ChevronRight className="w-4 h-4 ml-1" />
			</Button>
		</div>
	);
}
