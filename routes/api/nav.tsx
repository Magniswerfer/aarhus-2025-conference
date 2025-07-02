// routes/api/nav.ts
import { HandlerContext } from "$fresh/server.ts";
import { client } from "../../utils/sanity.ts";

export const handler = {
  async GET(_req: Request, _ctx: HandlerContext): Promise<Response> {
    try {
      // Fetch navigation items from Sanity
      const data = await client.fetch(`
        *[_type == "navigationItem"] | order(order asc) {
          _id,
          title,
          type,
          order,
          pageReference->{
            "slug": slug.current
          },
          customPath,
          dropdownItems[]->{
            _id,
            title,
            type,
            pageReference->{
              "slug": slug.current
            },
            customPath
          }
        }
      `);

      // Format navigation items
      const navigationItems = data.map((item: any) => {
        const baseItem = {
          id: item._id, // Add unique ID for React keys
          label: item.title,
          order: item.order,
          hasDropdown: item.type === "dropdown",
        };

        // Handle different types of navigation items
        switch (item.type) {
          case "page":
            return {
              ...baseItem,
              path: `/${item.pageReference.slug}`,
            };
          case "custom":
            return {
              ...baseItem,
              path: item.customPath,
            };
          case "dropdown":
            return {
              ...baseItem,
              path: "#",
              dropdownItems: item.dropdownItems.map((dropdownItem: any) => {
                const path = dropdownItem.type === "page"
                  ? `/${dropdownItem.pageReference.slug}`
                  : dropdownItem.customPath;

                return {
                  path,
                  label: dropdownItem.title,
                };
              }),
            };
          default:
            return null;
        }
      }).filter(Boolean);

      // Return the navigation data as JSON
      return new Response(JSON.stringify(navigationItems), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Failed to fetch navigation data",
          details: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
