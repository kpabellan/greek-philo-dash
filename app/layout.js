import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastProvider } from '../context/Toast';

export const metadata = {
  title: "UCM ΣX Derby Days 2024",
  description: "UCM ΣX Derby Days 2024 Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <link rel="icon" href="/icons/favicon.ico" sizes="any"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <ToastProvider>
          <Header />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
