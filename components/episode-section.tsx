"use client";

import { useEffect, useMemo, useState } from "react";
import { Pagination } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Episode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EpisodeCard } from "./episode-card";

interface EpisodeSectionProps {
	title: string;
	episodes: Episode[];
	loading: boolean;
	emptyMessage?: string;
	variant?: "character1" | "shared" | "character2";
}

export function EpisodeSection({
	title,
	episodes,
	loading,
	emptyMessage,
	variant = "shared",
}: EpisodeSectionProps) {
	const [page, setPage] = useState(1);
	const pageSize = 10;

	useEffect(() => {
		setPage(1);
	}, []);

	const totalPages = Math.max(1, Math.ceil((episodes?.length ?? 0) / pageSize));
	const pagedEpisodes = useMemo(() => {
		if (!episodes?.length) return [];
		const start = (page - 1) * pageSize;
		return episodes.slice(start, start + pageSize);
	}, [episodes, page]);

	const getVariantStyles = () => {
		switch (variant) {
			case "character1":
				return "border-l-4 border-l-blue-500";
			case "character2":
				return "border-l-4 border-l-purple-500";
			case "shared":
				return "border-l-4 border-l-primary portal-glow";
			default:
				return "";
		}
	};

	if (loading) {
		return (
			<Card
				data-testid="loading-skeleton"
				className={cn("transition-all duration-300", getVariantStyles())}
			>
				<CardHeader>
					<CardTitle className="text-base">{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-3">
						{Array.from({ length: 1 }).map((_, i) => (
							<div key={i} className="p-4 border rounded-lg animate-pulse">
								<div className="space-y-2">
									<div className="flex justify-between items-start gap-2">
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-5 w-12" />
									</div>
									<Skeleton className="h-3 w-1/2" />
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card
			data-testid="episode-section"
			className={cn(
				"transition-all duration-300 hover:shadow-md",
				getVariantStyles(),
			)}
		>
			<CardHeader>
				<CardTitle className="text-base flex items-center gap-2 text-balance">
					{title}
					<Badge
						variant={variant === "shared" ? "default" : "secondary"}
						className={cn(
							"text-xs transition-all duration-300",
							variant === "shared" &&
								"rick-morty-gradient text-primary-foreground",
						)}
					>
						{episodes.length}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{episodes.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<p className="text-sm text-pretty">
							{emptyMessage || "No episodes in this category"}
						</p>
					</div>
				) : (
					<div
						data-testid="episodes-grid"
						className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-3"
					>
						{(totalPages > 1 ? pagedEpisodes : episodes).map((episode) => (
							<EpisodeCard key={episode.id} episode={episode} />
						))}

						{/* Pagination */}
						{totalPages > 1 && (
							<Pagination
								page={page}
								totalPages={totalPages}
								onChange={(p) => setPage(Math.min(Math.max(1, p), totalPages))}
							/>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
