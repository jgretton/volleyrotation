import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Volley rotation",
	description:
		"An application that allows players, coaches or referees to track player position on court during a match. It also allows them to view their serve receive rotation from that rotation.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-zinc-50">
				<header className="max-w-7xl mx-auto p-4 w-full">
					<Link
						href="/"
						className="hover:underline underline-offset-2 tracking-tighter font-bold text-xl"
					>
						VR
					</Link>
				</header>
				{children}
			</body>
		</html>
	);
}
