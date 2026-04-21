import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Paulcodes — Full-Stack Developer",
    template: "%s — Paulcodes",
  },
  description:
    "I build the web apps your business actually needs — fast, clean, and built to last.",
  keywords: [
    "full-stack developer",
    "React developer",
    "Node.js",
    "freelance developer",
    "web development",
    "Paulcodes",
    "Paul",
    "Laravel",
    "Python",
    "PHP",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "React Developer",
    "Node Developer",
    "Laravel Developer",
    "Python Developer",
    "Programmer",
    "Mobile Developer",
    "web",
    "developer",
    "Nigeria Developer",
    "Anambra Developer",
    "Ebonyi Developer",
    "web developer in nigeria",
    "software engineer",
    "programmer in nigeria",
    "lagos developer",
    "web solution",
  ],
  authors: [{ name: "Paulcodes" }],
  creator: "Paulcodes",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Paulcodes",
    title: "Paulcodes — Full-Stack Developer",
    description:
      "I build fast, scalable web applications that solve real problems.",
    url: "https://paulcodes.pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paulcodes — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulcodes — Full-Stack Developer",
    description:
      "I build fast, scalable web applications that solve real problems.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://paulcodes.pro" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t==='system'||!t)&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
