import { useState, useEffect } from "preact/hooks";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const currentPath = globalThis.location ? globalThis.location.pathname : "";
  
  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouch();
    window.addEventListener('touchstart', () => setIsTouchDevice(true), { once: true });
    
    return () => {
      window.removeEventListener('touchstart', () => setIsTouchDevice(true));
    };
  }, []);

  const contributionTypes = [
    { path: "/call-for-contributions/papers", label: "PAPERS" },
    { path: "/call-for-contributions/critiques", label: "CRITIQUES" },
    { path: "/call-for-contributions/workshops", label: "WORKSHOPS" },
    { path: "/call-for-contributions/work-in-progress", label: "WORK IN PROGRESS" },
    { path: "/call-for-contributions/demos", label: "DEMOS" },
    { path: "/call-for-contributions/doctoral-consortium", label: "DOCTORAL CONSORTIUM" },
  ];

  const links = [
    { path: "/", label: "HOME" },
    {
      path: "/call-for-contributions",
      label: "CALL FOR CONTRIBUTIONS", 
      hasDropdown: true,
      dropdownItems: contributionTypes,
    },
    { path: "/author-guidelines", label: "AUTHOR GUIDELINES" },
    { path: "/organizers", label: "ORGANIZERS" },
  ];

  const handleDropdownClick = (e, linkPath) => {
    if (isTouchDevice) {
      e.preventDefault();
      if (activeDropdown === linkPath) {
        setActiveDropdown(null);
      } else {
        setActiveDropdown(linkPath);
      }
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setActiveDropdown(null);
    }
  };

  return (
    <nav 
      class="relative bg-transparent px-4 md:px-12 py-2"
      onClick={handleClickOutside}
    >
      <div class="flex items-center justify-between">
        <a href="/" class="z-10">
          <img src="/images/Bandaid-Icon-1.png" class="w-10" alt="Logo" />
        </a>

        {/* Desktop/Tablet Navigation */}
        <div class="hidden md:flex absolute inset-0 justify-center">
          <div class="flex items-center space-x-8 font-roboto-condensed">
            {links.map((link) => (
              <div 
                key={link.path} 
                class={`relative dropdown-container ${!isTouchDevice ? 'group' : ''}`}
              >
                {link.hasDropdown ? (
                  <div class="py-4">
                    <button
                      onClick={(e) => handleDropdownClick(e, link.path)}
                      class={`text-black uppercase text-base hover:opacity-90 ${
                        currentPath === link.path ? "opacity-100 font-bold" : "opacity-60"
                      }`}
                    >
                      {link.label}
                    </button>
                    <div 
                      class={`absolute left-0 top-full w-64 bg-white shadow-lg rounded-b-md py-2 z-50 transition-opacity duration-200 ${
                        !isTouchDevice ? 'opacity-0 invisible group-hover:opacity-100 group-hover:visible' :
                        activeDropdown === link.path ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                    >
                      {link.dropdownItems.map((item) => (
                        <a
                          key={item.path}
                          href={item.path}
                          class={`block px-4 py-2 text-sm text-black hover:bg-gray-100 ${
                            currentPath === item.path ? "font-bold" : "opacity-60"
                          }`}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={link.path}
                    class={`text-black uppercase text-base hover:opacity-90 py-4 block ${
                      currentPath === link.path ? "opacity-100 font-bold" : "opacity-60"
                    }`}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          class="md:hidden z-10 p-2"
          aria-label="Toggle menu"
        >
          <img src="/images/menu-icon.png" alt="Menu" class="w-6 h-6" />
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div class="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
            {links.map((link) => (
              <div key={link.path}>
                <a
                  href={link.path}
                  class={`block px-4 py-2 text-black hover:bg-gray-100 ${
                    currentPath === link.path ? "font-bold" : "opacity-60"
                  }`}
                  onClick={() => !link.hasDropdown && setIsOpen(false)}
                >
                  {link.label}
                </a>
                {link.hasDropdown && (
                  <div class="bg-gray-50">
                    {link.dropdownItems.map((item) => (
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
      </div>
    </nav>
  );
}
