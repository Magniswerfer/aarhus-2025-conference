// islands/MobileMenu.tsx
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface DropdownItem {
  path: string;
  label: string;
}

interface NavigationItem {
  path: string;
  label: string;
  hasDropdown: boolean;
  order: number;
  dropdownItems?: DropdownItem[];
}

interface MobileMenuProps {
  navigationItems: NavigationItem[];
  currentPath: string;
}

export default function MobileMenu(
  { navigationItems, currentPath }: MobileMenuProps,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState<
    { [key: string]: boolean }
  >({});
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (path: string, event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setExpandedDropdowns((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  // Check if a dropdown should be shown based on the current path
  const isDropdownActive = (link: NavigationItem) => {
    if (expandedDropdowns[link.path]) return true;
    if (link.dropdownItems?.some((item) => item.path === currentPath)) {
      return true;
    }
    return false;
  };

  // Ensure the path is absolute
  const ensureAbsolutePath = (path: string) => {
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        class="xl1:hidden z-10 p-2 relative"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div class="w-6 h-6 flex flex-col items-center justify-center">
          {/* Hamburger to X animation */}
          <span
            class={`bg-black block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
            }`}
          >
          </span>
          <span
            class={`bg-black block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          >
          </span>
          <span
            class={`bg-black block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
            }`}
          >
          </span>
        </div>
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          class="absolute top-full left-0 right-0 w-full bg-white shadow-lg xl1:hidden z-50 rounded-b-md"
        >
          <div class="py-3">
            {navigationItems.map((link) => (
              <div key={link.path} class="mb-1">
                {/* Main navigation item */}
                <div class="flex items-center">
                  <a
                    href={ensureAbsolutePath(link.path)}
                    class={`flex-grow block px-4 py-2 text-black uppercase text-lg hover:bg-gray-50 ${
                      currentPath === link.path ? "font-bold" : "opacity-70"
                    }`}
                    onClick={() => {
                      if (!link.hasDropdown) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {link.label}
                  </a>

                  {link.hasDropdown && (
                    <button
                      onClick={(e) => toggleDropdown(link.path, e)}
                      class="px-4 py-2"
                      aria-label={expandedDropdowns[link.path]
                        ? "Collapse"
                        : "Expand"}
                    >
                      <svg
                        class={`w-5 h-5 transition-transform duration-200 ${
                          expandedDropdowns[link.path] ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Dropdown items with collapsible behavior */}
                {link.hasDropdown && link.dropdownItems && (
                  <div
                    class={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
                      isDropdownActive(link)
                        ? "max-h-96 py-2 mb-2 opacity-100"
                        : "max-h-0 py-0 mb-0 opacity-0"
                    }`}
                  >
                    {link.dropdownItems.map((item) => (
                      <a
                        key={item.path}
                        href={ensureAbsolutePath(item.path)}
                        class={`block px-8 py-2 text-md hover:bg-gray-100 whitespace-nowrap ${
                          currentPath === item.path
                            ? "font-bold text-aarhus-red"
                            : "text-gray-800"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
