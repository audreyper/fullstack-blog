import { JetBrains_Mono, Bebas_Neue } from "next/font/google"; 
import "./globals.css"; 

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",  
  subsets: ["latin"],  
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",  
  subsets: ["latin"],
  weight: "400",  
});

export const metadata = {
  title: "audreyautomates.com",
  description: "audreyautomates.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.variable} ${bebasNeue.variable} antialiased`}  
      >
        {children}
      </body>
    </html>
  );
}