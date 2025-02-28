// components/StaticNavigation.tsx
import { h } from "preact";
import NavDropdown from "../islands/NavDropdown.tsx";
import MobileMenu from "../islands/MobileMenu.tsx";

export interface DropdownItem {
  path: string;
  label: string;
}

export interface NavigationItem {
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
  const staticLinks: NavigationItem[] = [
    { path: "/", label: "HOME", hasDropdown: false, order: 1 },
    {
      path: "/call-for-contributions",
      label: "CALL FOR CONTRIBUTIONS",
      hasDropdown: true,
      order: 2,
      dropdownItems: [
        { path: "/call-for-contributions/papers", label: "PAPERS" },
        { path: "/call-for-contributions/critiques", label: "CRITIQUES" },
        { path: "/call-for-contributions/workshops", label: "WORKSHOPS" },
        {
          path: "/call-for-contributions/work-in-progress",
          label: "WORK IN PROGRESS",
        },
        { path: "/call-for-contributions/demos", label: "DEMOS & EXPERIENCES" },
        {
          path: "/call-for-contributions/doctoral-consortium",
          label: "DOCTORAL CONSORTIUM",
        },
      ],
    },
    {
      path: "/past-conferences",
      label: "PAST CONFERENCES",
      hasDropdown: false,
      order: 5,
    },
    { path: "/organisers", label: "ORGANISERS", hasDropdown: false, order: 9 },
  ];

  // Use provided items if the array has items; otherwise, fall back to static links.
  const navigationItems = items && items.length > 0 ? items : staticLinks;

  // Sort the navigation items by the 'order' property
  const sortedNavigationItems = [...navigationItems].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <nav class="relative bg-transparent px-4 md:px-12 py-2">
      <div class="flex items-center justify-between">
        <a href="/" class="z-10">
          <img src="/images/Bandaid-Icon-1.png" class="w-10" alt="Logo" />
        </a>

        {/* Desktop/Tablet Navigation */}
        <div class="hidden md:flex absolute inset-0 justify-center">
          <div class="flex items-center space-x-8 font-roboto-condensed">
            {sortedNavigationItems.map((link) => (
              <div key={link.path} class="relative dropdown-container group">
                {link.hasDropdown
                  ? <NavDropdown link={link} currentPath={currentPath} />
                  : (
                    <a
                      href={link.path}
                      class={`text-black uppercase text-base hover:opacity-90 py-4 block ${
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
