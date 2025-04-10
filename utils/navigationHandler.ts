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
  {
    path: "/attendance",
    label: "ATTENDANCE",
    hasDropdown: true,
    order: 15,
    dropdownItems: [
      { path: "/programme", label: "PROGRAMME" },
      { path: "/registration", label: "REGISTRATION" },
    ],
  },
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
    // Fetch only top-level navigation items from Sanity
    const data = await client.fetch(`
      *[_type == "navigationItem" && isTopLevel == true] | order(order asc) {
        _id,
        title,
        type,
        linkType,
        order,
        pageReference->{
          _type,
          "slug": slug.current
        },
        customPath,
        dropdownItems[]->{
          _id,
          title,
          linkType,
          pageReference->{
            _type,
            "slug": slug.current
          },
          customPath
        }
      }
    `);
    
    console.log('Raw navigation data from Sanity:', data);
    
    // Format navigation items
    const navigationItems = data.map((item: any) => {
      const baseItem = {
        label: item.title.toUpperCase(),
        order: item.order,
        hasDropdown: ['dropdown', 'dropdownWithLink'].includes(item.type)
      };

      // Get the path based on linkType and type
      const getPath = (item: any) => {
        if (item.linkType === 'page' && item.pageReference?.slug) {
          return `/${item.pageReference.slug}`;
        }
        if (item.linkType === 'custom' && item.customPath) {
          return item.customPath;
        }
        return '#';
      };

      // Handle different types of navigation items
      switch (item.type) {
        case 'link':
          return {
            ...baseItem,
            path: getPath(item)
          };
        case 'dropdown':
          return {
            ...baseItem,
            path: '#',
            dropdownItems: item.dropdownItems?.map((dropdownItem: any) => ({
              path: getPath(dropdownItem),
              label: dropdownItem.title.toUpperCase()
            })) || []
          };
        case 'dropdownWithLink':
          return {
            ...baseItem,
            path: getPath(item),
            dropdownItems: item.dropdownItems?.map((dropdownItem: any) => ({
              path: getPath(dropdownItem),
              label: dropdownItem.title.toUpperCase()
            })) || []
          };
        default:
          return null;
      }
    }).filter(Boolean); // Remove any null items

    console.log('Processed navigation items:', navigationItems);
    return navigationItems;
  } catch (error) {
    console.error("Error fetching navigation items:", error);
    // Return empty array if there's an error
    return [];
  }
}