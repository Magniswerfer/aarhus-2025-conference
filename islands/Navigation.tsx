// components/Navigation.tsx
export default function Navigation() {
  // Get the current path directly from globalThis (client-side)
  const currentPath = globalThis.location ? globalThis.location.pathname : "";

  const links = [
    { path: "/", label: "HOME" },
    { path: "/call-for-contributions", label: "CALL FOR CONTRIBUTIONS" },
    { path: "/author-guidelines", label: "AUTHOR GUIDELINES" },
    { path: "/organizers", label: "ORGANIZERS" },
  ];

  return (
    <nav class="relative bg-transparent px-12 py-2">
      <div class="flex items-center justify-between">
        <a href="/" class="z-10">
          <img src="/images/Bandaid-Icon-1.png" class="w-10" alt="Logo" />
        </a>
        <div class="absolute inset-0 flex justify-center">
          <div class="flex items-center space-x-8 font-roboto-condensed">
            {links.map((link) => (
              <a
                key={link.path}
                href={link.path}
                class={`text-black uppercase text-base hover:opacity-90 ${
                  currentPath === link.path ? "opacity-100 font-bold" : "opacity-60"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

