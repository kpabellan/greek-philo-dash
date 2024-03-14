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
        <ToastProvider>
          <Header />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
