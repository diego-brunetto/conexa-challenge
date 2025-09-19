import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Rick & Morty Character Explorer",
	description: "Compare the episodes characters appear in",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<SpeedInsights />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				{/* Footer */}
				<footer className="border-t border-border bg-card/30 mt-16">
					<div className="container mx-auto px-4 py-6">
						<div className="text-center text-sm text-muted-foreground">
							<p>
								Data provided by{" "}
								<a
									href="https://rickandmortyapi.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline transition-colors duration-200"
								>
									The Rick and Morty API
								</a>
							</p>
							<p className="mt-1">
								Created with Next.js, TypeScript and Tailwind CSS
							</p>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
