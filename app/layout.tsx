import MainHeader from "@/components/main-header";
import Footer from "@/components/footer";
import "./global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <MainHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
