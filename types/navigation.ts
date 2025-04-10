import { NavigationItem } from "../components/StaticNavigation.tsx";

export interface PageDropdownItem extends NavigationItem {
  type: "page";
  pageId: string;
  showInNavigation: boolean;
  navigationOrder: number;
  parentPath: string;
}

export interface CustomDropdownItem extends NavigationItem {
  type: "custom";
  customPath: string;
  parentPath: string;
}

export type DropdownItemType = PageDropdownItem | CustomDropdownItem; 