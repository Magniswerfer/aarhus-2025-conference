// routes/_app.tsx
import { type PageProps } from "$fresh/server.ts";
import Layout from "../layouts/layout.tsx";
import type { NavigationItem } from "../components/StaticNavigation.tsx";

export default function App({ Component, url, state }: PageProps) {
  let navigationItems: NavigationItem[] | undefined = undefined;

  if (Array.isArray(state.navigationItems)) {
    //console.log("Raw navigation items from Sanity:", state.navigationItems);

    const sanityItems = state.navigationItems as any[];
    const mappedItems = sanityItems.map((item) => ({
      path: item.slug?.current ? `/${item.slug.current}` : item.path || "/",
      label: item.title || item.label,
      hasDropdown: item.hasDropdown ?? false,
      order: item.navigationOrder ?? item.order ?? 999,
      dropdownItems: item.dropdownItems,
    }));

    //console.log("Mapped navigation items:", mappedItems);

    if (mappedItems.length > 0) {
      navigationItems = mappedItems.sort((a, b) => a.order - b.order);
    }
  }

  const shouldUseLayout = !url.pathname.startsWith("/api/");

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Aarhus 2025 Conference</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/panel.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {shouldUseLayout ? (
          <Layout
            navigationItems={navigationItems}
            currentPath={url.pathname}  // pass currentPath here
          >
            <Component />
          </Layout>
        ) : (
          <Component />
        )}
      </body>
    </html>
  );
}
