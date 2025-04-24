// islands/NavDropdown.tsx
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

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

interface NavDropdownProps {
  link: NavigationItem;
  currentPath: string;
}

export default function NavDropdown({ link, currentPath }: NavDropdownProps) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Touch device detection
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          (navigator && navigator.maxTouchPoints > 0),
      );
    };

    checkTouch();

    const touchHandler = () => setIsTouchDevice(true);
    window.addEventListener("touchstart", touchHandler, { once: true });

    // Click outside handler
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setActiveDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("touchstart", touchHandler);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (e: MouseEvent) => {
    if (isTouchDevice) {
      e.stopPropagation();
      setActiveDropdown(!activeDropdown);
    }
  };

  return (
    <div class="py-4 dropdown-container relative">
      <div class="flex items-center">
        <a
          href={link.path}
          class={`text-black uppercase text-lg hover:opacity-90 ${
            currentPath === link.path ? "opacity-100 font-bold" : "opacity-60"
          }`}
        >
          {link.label}
        </a>
        <button
          onClick={handleDropdownClick}
          class="ml-1 p-1"
          aria-label="Toggle dropdown"
        >
          <svg
            class="w-5 h-5"
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
      </div>
      <div
        class={`absolute top-full left-0 mt-1 min-w-[200px] w-max md:w-auto bg-white shadow-xl rounded-md py-3 z-50 transition-all duration-200 ${
          !isTouchDevice
            ? "opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0"
            : activeDropdown
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform translate-y-2"
        }`}
      >
        <div class="px-2">
          {link.dropdownItems?.map((item) => (
            <a
              key={item.path}
              href={item.path}
              class={`block px-4 py-3 text-md hover:bg-gray-50 rounded-md transition-colors duration-150 whitespace-nowrap ${
                currentPath === item.path 
                  ? "font-bold text-aarhus-red" 
                  : "text-gray-800 hover:text-aarhus-red"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
