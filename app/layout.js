import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./globals.scss";
import "./components.scss";
import AppWrapper from "@/components/App";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ULES DINNER 2024 | A Night in Avaloria",
  description: "Vote for your favorite contestants in the various categories",
  icons: {
    icon: "ules.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AppWrapper>
            {children}
          </AppWrapper>
        </StoreProvider>
        </body>
    </html>
  );
}
