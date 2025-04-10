// layouts/layout.tsx
import { ComponentChildren } from "preact";
import StaticNavigation from "../components/StaticNavigation.tsx";
import Footer from "../islands/Footer.tsx";
import type { NavigationItem } from "../components/StaticNavigation.tsx";

interface LayoutProps {
  children: ComponentChildren;
  navigationItems?: NavigationItem[];
  currentPath: string;
}

export default function Layout({
  children,
  navigationItems = [],
  currentPath,
}: LayoutProps) {
  return (
    <div class="min-h-screen flex flex-col">
      <StaticNavigation items={navigationItems} currentPath={currentPath} />
      <main class="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
