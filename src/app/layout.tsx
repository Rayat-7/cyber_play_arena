import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from 'react';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import  Loading  from "@/components/loading";

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
const zentry = localFont({
  src: "./fonts/zentry-regular.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cyber Play Arena",
  description: "A simple slot viewing site for Cyber play arena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zentry.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <main>{children}</main>
          <script defer src="https://cloud.umami.is/script.js" data-website-id="0104f887-9997-4bb3-a9cc-5ee180fc5d20"></script>
        </Suspense>
        <Toaster/>
      </body>
    </html>
  );
}



// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { Toaster } from "@/components/ui/sonner";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
// const zentry = localFont({
//   src: "./fonts/zentry-regular.woff2",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Cyber Play Arena",
//   description: "A simple slot viewing site for Cyber play arena",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <main>{children}</main>
//         <Toaster/>
//       </body>
//     </html>
//   );
// }
