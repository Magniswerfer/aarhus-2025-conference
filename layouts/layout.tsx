// layouts/layout.tsx
import { Head } from "$fresh/runtime.ts";
import Navigation from "../islands/Navigation.tsx";
import Footer from "../components/Footer.tsx";

interface LayoutProps {
  children: preact.ComponentChildren;
  title?: string;
}

export default function Layout({ children, title = "Aarhus 2025 Conference" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div class="min-h-screen flex flex-col">
        <Navigation />
        <main class="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

