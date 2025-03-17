// utils/navigationHandler.ts
import { client } from "./sanity.ts";

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

// Default static links that should always be present
const staticLinks: NavigationItem[] = [
  { path: "/", label: "HOME", hasDropdown: false, order: 10 },
  { path: "/programme", label: "PROGRAMME", hasDropdown: false, order: 15 },
  {
    path: "/call-for-contributions",
    label: "CALL FOR CONTRIBUTIONS",
    hasDropdown: true,
    order: 20,
    dropdownItems: [
      { path: "/call-for-contributions/papers", label: "PAPERS" },
      { path: "/call-for-contributions/critiques", label: "CRITIQUES" },
      { path: "/call-for-contributions/workshops", label: "WORKSHOPS" },
      { path: "/call-for-contributions/work-in-progress", label: "WORK IN PROGRESS" },
      { path: "/call-for-contributions/demos", label: "DEMOS & EXPERIENCES" },
      { path: "/call-for-contributions/doctoral-consortium", label: "DOCTORAL CONSORTIUM" },
    ],
  },
  { path: "/organisers", label: "ORGANISERS", hasDropdown: false, order: 50 },
  { path: "/past-conferences", label: "PAST CONFERENCES", hasDropdown: false, order: 60 },
];

export async function getNavigationItems(): Promise<NavigationItem[]> {
  try {
    // Fetch dynamic navigation items from Sanity
    const data = await client.fetch(`
      *[_type == "page" && showInNavigation == true] | order(navigationOrder asc) {
        title,
        "slug": slug.current,
        navigationOrder
      }
    `);
    
    // Format the dynamic links
    const dynamicLinks = data.map((page: any) => ({
      path: `/${page.slug}`,
      label: page.title.toUpperCase(),
      hasDropdown: false,
      order: page.navigationOrder || 30 + Math.random() * 10
    }));
    
    // Combine static and dynamic links
    const allLinks = [...staticLinks];
    
    // Add dynamic links (avoiding duplicates)
    dynamicLinks.forEach((link: NavigationItem) => {
      if (!allLinks.some(existingLink => existingLink.path === link.path)) {
        allLinks.push(link);
      } else {
        // If the link exists, update its order from the dynamic version if needed
        const existingLink = allLinks.find(el => el.path === link.path);
        if (existingLink && link.order) {
          existingLink.order = link.order;
        }
      }
    });
    
    // Sort all links by order
    return allLinks.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching navigation items:", error);
    // Fall back to static links if there's an error
    return staticLinks;
  }
}