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
    <div class="py-4 dropdown-container">
      <div class="flex items-center">
        <a
          href={link.path}
          class={`text-black uppercase text-base hover:opacity-90 ${
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
            class="w-4 h-4"
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
        class={`absolute top-full left-0 right-0 w-full md:left-auto md:right-0 md:w-auto bg-white shadow-lg rounded-b-md py-2 z-50 transition-opacity duration-200 ${
          !isTouchDevice
            ? "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
            : activeDropdown
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        {link.dropdownItems?.map((item) => (
          <a
            key={item.path}
            href={item.path}
            class={`block px-4 py-2 text-sm text-black hover:bg-gray-100 whitespace-nowrap ${
              currentPath === item.path ? "font-bold" : "opacity-60"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
