// components/StaticNavigation.tsx
import { h } from "preact";
import NavDropdown from "../islands/NavDropdown.tsx";
import MobileMenu from "../islands/MobileMenu.tsx";

export interface DropdownItem {
  path: string;
  label: string;
}

export interface NavigationItem {
  id: string; // Add unique ID for React keys
  path: string;
  label: string;
  hasDropdown: boolean;
  order: number;
  dropdownItems?: DropdownItem[];
}

interface StaticNavigationProps {
  items?: NavigationItem[];
  currentPath: string; // now required
}

export default function StaticNavigation(
  { items, currentPath }: StaticNavigationProps,
) {
  // Fallback to empty array if no items provided
  const navigationItems = items || [];

  // Sort the navigation items by the 'order' property
  const sortedNavigationItems = [...navigationItems].sort(
    (a, b) => a.order - b.order,
  );

  // Ensure the path is absolute
  const ensureAbsolutePath = (path: string) => {
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <nav class="relative bg-transparent px-4 md:px-12 py-2">
      <div class="flex items-center justify-between">
        <a href="/" class="z-10">
          <img src="/images/Bandaid-Icon-1.png" class="w-10" alt="Logo" />
        </a>

        {/* Desktop/Tablet Navigation */}
        <div class="hidden xl1:flex absolute inset-0 justify-center">
          <div class="flex items-center space-x-8 font-roboto-condensed">
            {sortedNavigationItems.map((link) => (
              <div key={link.id} class="relative dropdown-container group">
                {link.hasDropdown
                  ? <NavDropdown link={link} currentPath={currentPath} />
                  : (
                    <a
                      href={ensureAbsolutePath(link.path)}
                      class={`text-black uppercase text-lg hover:opacity-90 py-4 block ${
                        currentPath === link.path
                          ? "opacity-100 font-bold"
                          : "opacity-60"
                      }`}
                    >
                      {link.label}
                    </a>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu as an Island */}
        <MobileMenu
          navigationItems={sortedNavigationItems}
          currentPath={currentPath}
        />
      </div>
    </nav>
  );
}
