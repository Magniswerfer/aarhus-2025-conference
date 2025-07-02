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

// Static fallback navigation in case Sanity data fetch fails
export const fallbackNavigation: NavigationItem[] = [
  { path: "/", label: "HOME", hasDropdown: false, order: 1 },
  { path: "/programme", label: "PROGRAMME", hasDropdown: false, order: 2 },
  {
    path: "/call-for-contributions",
    label: "CALL FOR CONTRIBUTIONS",
    hasDropdown: true,
    order: 3,
    dropdownItems: [
      { path: "/call-for-contributions/papers", label: "PAPERS" },
      { path: "/call-for-contributions/critiques", label: "CRITIQUES" },
      { path: "/call-for-contributions/workshops", label: "WORKSHOPS" },
      {
        path: "/call-for-contributions/work-in-progress",
        label: "WORK IN PROGRESS",
      },
      { path: "/call-for-contributions/demos", label: "DEMOS & EXPERIENCES" },
      {
        path: "/call-for-contributions/doctoral-consortium",
        label: "DOCTORAL CONSORTIUM",
      },
    ],
  },
  {
    path: "/past-conferences",
    label: "PAST CONFERENCES",
    hasDropdown: false,
    order: 4,
  },
  { path: "/organisers", label: "ORGANISERS", hasDropdown: false, order: 5 },
];

// Interfaces for Sanity response
interface SanityGroupItem {
  title: string;
  path: string;
}

interface SanityGroupLink {
  linkType: string;
  path: string;
}

interface SanityNavigationItem {
  type: 'single' | 'group';
  title?: string;
  path?: string;
  order?: number;
  groupTitle?: string;
  groupItems?: SanityGroupItem[];
  groupLink?: SanityGroupLink;
}

// GROQ query for fetching navigation data
const navigationQuery = `*[_type == "navigation"][0] {
  items[] {
    type,
    "title": item->title,
    "path": coalesce(
      item->internalPage->slug.current,
      item->customRoute
    ),
    "order": item->order,
    groupTitle,
    groupItems[] {
      "title": @->title,
      "path": coalesce(
        @->internalPage->slug.current,
        @->customRoute
      )
    },
    groupLink {
      linkType,
      "path": coalesce(
        internalPage->slug.current,
        customRoute
      )
    }
  }
}`;

// Function to transform navigation data from Sanity
function transformNavigationData(data: any): NavigationItem[] {
  if (!data || !data.items || !Array.isArray(data.items)) {
    return fallbackNavigation;
  }

  const transformedItems = data.items.map((item: SanityNavigationItem, index: number) => {
    if (item.type === 'single') {
      return {
        path: item.path || '/',
        label: item.title || 'Untitled',
        hasDropdown: false,
        order: item.order || index + 1
      };
    } else if (item.type === 'group') {
      const groupPath = item.groupLink?.path || '#';
      return {
        path: groupPath,
        label: item.groupTitle || 'Untitled Group',
        hasDropdown: true,
        order: item.order || index + 1,
        dropdownItems: item.groupItems?.map((groupItem: SanityGroupItem) => ({
          path: groupItem.path || '#',
          label: groupItem.title || 'Untitled Item'
        })) || []
      };
    }
    return null;
  }).filter(Boolean) as NavigationItem[];

  return transformedItems.length > 0 ? transformedItems : fallbackNavigation;
}

// Main function to fetch navigation items
export async function getNavigationItems(): Promise<NavigationItem[]> {
  try {
    // Try to fetch from new navigation structure first
    const data = await client.fetch(navigationQuery);
    const navItems = transformNavigationData(data);
    
    // If we got items from the new structure, use those
    if (navItems.length > 0 && navItems !== fallbackNavigation) {
      return navItems;
    }
    
    // Fallback to the old method - fetching pages with showInNavigation flag
    const pagesData = await client.fetch(`
      *[_type == "page" && showInNavigation == true] | order(navigationOrder asc) {
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
    
    // Format the dynamic links
    const dynamicLinks = pagesData.map((page: any) => ({
      path: `/${page.slug}`,
      label: page.title.toUpperCase(),
      hasDropdown: false,
      order: page.navigationOrder || 30 + Math.random() * 10
    }));
    
    // Combine fallback and dynamic links
    const allLinks = [...fallbackNavigation];
    
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
    return fallbackNavigation;
  }
}