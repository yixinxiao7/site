import "./globals.css";
import { Oswald } from 'next/font/google'
const oswald = Oswald({
    weight: '400',
    subsets: ['latin'],
  })
 

export const metadata = {
  title: "Yixin Xiao",
  description: "About me!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={oswald.className}>{children}</body>
    </html>
  );
}
