"use client";

import { Calendar, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Episode } from "@/lib/types";

interface EpisodeCardProps {
	episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
	return (
		<Card className="hover:shadow-md hover:scale-105 transition-all duration-200 group cursor-pointer">
			<CardContent className="p-4">
				<div className="space-y-3">
					<div className="flex items-start justify-between gap-2">
						<h4 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
							{episode.name}
						</h4>
						<Badge
							variant="outline"
							className="text-xs shrink-0 group-hover:border-primary transition-colors duration-200"
						>
							{episode.episode}
						</Badge>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<Calendar className="w-3 h-3" />
							<span>{episode.air_date}</span>
						</div>
						<Play className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
