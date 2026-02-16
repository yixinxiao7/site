import "./globals.css";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-ibm-plex",
});

export const metadata = {
  title: "Yixin Xiao",
  description: "Software engineer & creative portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${ibmPlexMono.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
