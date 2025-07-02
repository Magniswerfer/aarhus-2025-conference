// utils/sanityParser.tsx
import { h, JSX } from "preact";

export interface BlockContent {
  _type: string;
  _key: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: {
    _type: string;
    text: string;
    marks?: string[];
    _key: string;
  }[];
  markDefs?: {
    _key: string;
    _type: string;
    href: string;
    targetBlank?: boolean;
  }[];
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
}

const renderTextContent = (
  child: { text: string; marks?: string[]; _key: string },
  idx: number,
  markDefs?: {
    _key: string;
    _type: string;
    href: string;
    targetBlank?: boolean;
  }[],
): JSX.Element => {
  if (!child.text) {
    return <span key={idx}></span>;
  }

  let content = child.text;

  if (child.marks?.length) {
    // Handle links
    if (markDefs?.length) {
      const linkMark = markDefs.find((def) => child.marks?.includes(def._key));
      if (linkMark) {
        return (
          <a
            href={linkMark.href}
            key={idx}
            {...(linkMark.targetBlank
              ? {
                target: "_blank",
                rel: "noopener noreferrer",
              }
              : {})}
            class="text-aarhus-red hover:underline"
          >
            {content}
          </a>
        );
      }
    }

    // Handle strong text
    if (child.marks.includes("strong")) {
      return <strong key={idx} class="font-semibold">{content}</strong>;
    }
  }

  return <span key={idx}>{content}</span>;
};

export function parseContent(content: BlockContent[]): JSX.Element[] {
  if (!content) return [];

  const result: JSX.Element[] = [];
  let currentListItems: BlockContent[] = [];
  
  // Process all blocks
  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    
    if (block._type === "block" && block.listItem) {
      // Collect list items
      currentListItems.push(block);
    } else {
      // If we have list items and now we've hit a non-list item,
      // process the list
      if (currentListItems.length > 0) {
        result.push(renderList(currentListItems));
        currentListItems = [];
      }
      
      // Process regular blocks
      if (block._type === "block") {
        switch (block.style) {
          case "h2":
            result.push(
              <h2
                key={block._key}
                class="text-3xl font-bold text-aarhus-red mb-4"
              >
                {block.children?.map((child, idx) =>
                  renderTextContent(child, idx, block.markDefs)
                )}
              </h2>
            );
            break;
          case "h3":
            result.push(
              <h3
                key={block._key}
                class="text-2xl font-semibold mb-4"
              >
                {block.children?.map((child, idx) =>
                  renderTextContent(child, idx, block.markDefs)
                )}
              </h3>
            );
            break;
          default:
            result.push(
              <p key={block._key} class="mb-4">
                {block.children?.map((child, idx) =>
                  renderTextContent(child, idx, block.markDefs)
                )}
              </p>
            );
        }
      }
    }
  }
  
  // Process any remaining list items
  if (currentListItems.length > 0) {
    result.push(renderList(currentListItems));
  }
  
  return result;
}

// Structure for a list item node in our DOM tree
interface ListNode {
  key: string;
  content: JSX.Element;
  level: number;
  children: ListNode[];
}

function renderList(listItems: BlockContent[]): JSX.Element {
  // Create a root node for our list tree
  const root: ListNode = { key: 'root', content: <></>, level: -1, children: [] };
  
  // Track the stack of parent nodes as we build the tree
  const nodeStack: ListNode[] = [root];
  
  // Process each list item and build the tree
  listItems.forEach((item) => {
    const level = item.level || 0;
    const content = (
      <>
        {item.children?.map((child, idx) =>
          renderTextContent(child, idx, item.markDefs)
        )}
      </>
    );
    
    const node: ListNode = {
      key: item._key,
      content,
      level,
      children: []
    };
    
    // Find the appropriate parent for this node
    while (nodeStack.length > 1 && nodeStack[nodeStack.length - 1].level >= level) {
      nodeStack.pop();
    }
    
    // Add this node as a child of the appropriate parent
    nodeStack[nodeStack.length - 1].children.push(node);
    
    // This node becomes a potential parent for deeper nested items
    nodeStack.push(node);
  });
  
  // Render the tree as JSX
  return renderTree(root);
}

function renderTree(node: ListNode): JSX.Element {
  // Root node is just a container, render its children
  if (node.key === 'root') {
    return <ul key="list-root" class="list-disc ml-6 mb-4">{node.children.map(renderNode)}</ul>;
  }
  
  // For non-root nodes, we won't directly call this function
  // Instead, we'll always use renderNode for child nodes
  return <>{node.children.map(renderNode)}</>;
}

function renderNode(node: ListNode): JSX.Element {
  // If this node has children, render them as a nested list
  const nestedList = node.children.length > 0 
    ? <ul class="list-disc ml-6 mt-2">{node.children.map(renderNode)}</ul> 
    : null;
  
  return (
    <li key={node.key} class="mb-2">
      {node.content}
      {nestedList}
    </li>
  );
}

// GROQ query for fetching page content
export const submissionPageQuery = (type: string) =>
  `*[_type == "submissionPage" && type == "${type}"][0] {
  title,
  description,
  content[] {
    ...,
    markDefs[] {
      ...,
      _type == "link" => {
        "href": href,
        "targetBlank": targetBlank
      }
    }
  },
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  submissionDates,
  conferenceDates {
    startDate,
    endDate,
    location
  }
}`;
