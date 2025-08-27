
// Import Google fonts via Next.js
import { JetBrains_Mono, Bebas_Neue } from "next/font/google";  
import "./globals.css";  // Global CSS for the app
import Head from "next/head";  // Allows modifying <head> tags dynamically

// Configure JetBrains Mono font
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",  // CSS variable to use in classes
  subsets: ["latin"],                 // Subset of characters to load
});

// Configure Bebas Neue font
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",  // Set font weight
});

// Metadata for SEO and social sharing
export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE || "blog.audreyautomates.com",       // fallback if env not set
  description: process.env.NEXT_PUBLIC_SITE_TITLE || "blog.audreyautomates.com",
};

// Root layout component that wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href={process.env.NEXT_PUBLIC_FAVICON || "/favicon.png"} />
        {/* Meta description for SEO */}
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "blog.audreyautomates.com"}
        />
      </Head>
      <body
        className={`${jetBrainsMono.variable} ${bebasNeue.variable} antialiased`}
      >
        {/* Render all child pages/components */}
        {children}
      </body>
    </html>
  );
}


