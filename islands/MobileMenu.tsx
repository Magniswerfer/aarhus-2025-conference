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

export default function MobileMenu({ navigationItems, currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  
  const toggleSubmenu = (path: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        class="md:hidden z-10 p-2"
        aria-label="Toggle menu"
      >
        <img src="/images/menu-icon.png" alt="Menu" class="w-6 h-6" />
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div class="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
          {navigationItems.map((link) => (
            <div key={link.path}>
              <div class="flex items-center">
                <a
                  href={link.path}
                  class={`block px-4 py-2 flex-grow text-black hover:bg-gray-100 ${
                    currentPath === link.path ? "font-bold" : "opacity-60"
                  }`}
                  onClick={() => !link.hasDropdown && setIsOpen(false)}
                >
                  {link.label}
                </a>
                
                {link.hasDropdown && (
                  <button
                    onClick={() => toggleSubmenu(link.path)}
                    class="px-4 py-2"
                    aria-label={`Toggle ${link.label} submenu`}
                  >
                    <svg
                      class={`w-4 h-4 transition-transform ${openSubmenus[link.path] ? 'rotate-180' : ''}`}
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
              
              {link.hasDropdown && openSubmenus[link.path] && (
                <div class="bg-gray-50">
                  {link.dropdownItems?.map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      class={`block px-8 py-2 text-sm text-black hover:bg-gray-100 ${
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