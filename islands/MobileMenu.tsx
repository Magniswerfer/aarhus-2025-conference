// islands/MobileMenu.tsx
import { h } from "preact";
import { useState } from "preact/hooks";

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

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        class="xl1:hidden z-10 p-2"
        aria-label="Toggle menu"
      >
        <img src="/images/menu-icon.png" alt="Menu" class="w-6 h-6" />
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div class="absolute top-full left-0 right-0 w-full md:left-auto md:right-0 md:w-auto bg-white shadow-lg xl1:hidden z-50">
          {navigationItems.map((link) => (
            <div key={link.path}>
              {/* Main navigation item */}
              <a
                href={link.path}
                class={`block px-4 py-2 text-black hover:bg-gray-100 whitespace-nowrap ${
                  currentPath === link.path ? "font-bold" : "opacity-60"
                }`}
                onClick={() => !link.hasDropdown && setIsOpen(false)}
              >
                {link.label}
              </a>

              {/* Always show dropdown items if they exist */}
              {link.hasDropdown && link.dropdownItems && (
                <div class="bg-gray-50">
                  {link.dropdownItems.map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      class={`block px-8 py-2 text-sm text-black hover:bg-gray-100 ml-4 whitespace-nowrap ${
                        currentPath === item.path ? "font-bold" : "opacity-60"
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
      )}
    </>
  );
}
