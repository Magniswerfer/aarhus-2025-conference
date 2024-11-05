import { walk } from "$std/fs/walk.ts";

// islands/Navigation.tsx
export default function Navigation() {
  const currentPath = globalThis.location ? globalThis.location.pathname : "";

  const contributionTypes = [
    { path: "/call-for-contributions/papers", label: "PAPERS" },
    { path: "/call-for-contributions/critiques", label: "CRITIQUES" },
    { path: "/call-for-contributions/workshops", label: "WORKSHOPS" },
    {
      path: "/call-for-contributions/work-in-progress",
      label: "WORK IN PROGRESS",
    },
    { path: "/call-for-contributions/demos", label: "DEMOS" },
    {
      path: "/call-for-contributions/doctoral-consortium",
      label: "DOCTORAL CONSORTIUM",
    },
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

  return (
    <nav class="relative bg-transparent px-12 py-2">
      <div class="flex items-center justify-between">
        <a href="/" class="z-10">
          <img src="/images/Bandaid-Icon-1.png" class="w-10" alt="Logo" />
        </a>
        <div class="absolute inset-0 flex justify-center">
          <div class="flex items-center space-x-8 font-roboto-condensed">
            {links.map((link) => (
              <div key={link.path} class="relative group h-full py-4">
                <a
                  href={link.path}
                  class={`text-black uppercase text-base hover:opacity-90 ${
                    currentPath === link.path
                      ? "opacity-100 font-bold"
                      : "opacity-60"
                  }`}
                >
                  {link.label}
                </a>
                {link.hasDropdown && (
                  <div class="absolute hidden group-hover:block left-0 top-full w-64 bg-white shadow-lg rounded-b-md py-2 z-50">
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
