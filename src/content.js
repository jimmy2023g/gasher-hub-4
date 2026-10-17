// Loads the JSON files in src/content/ and fills in defaults.
// You normally never need to edit this file. Edit the JSON files instead.
import site from "./content/site.json";
import menu from "./content/menu.json";
import pages from "./content/pages.json";

const DEFAULT_ICON = "fa-link";
const DEFAULT_COLOR = "#00f7ff";

// Turns one JSON entry into a card. "page" becomes an in-app route.
function toCard(entry, where) {
  if (!entry.title) console.warn(`[content] ${where}: an item is missing "title".`, entry);
  if (!entry.page && !entry.url) console.warn(`[content] ${where}: "${entry.title}" needs a "url" or a "page".`);
  if (entry.page && !pages[entry.page]) console.warn(`[content] ${where}: "${entry.title}" points to page "${entry.page}", which is not in pages.json.`);

  return {
    ...entry,
    icon: entry.icon || DEFAULT_ICON,
    color: entry.color || DEFAULT_COLOR,
    route: entry.page ? `/${entry.page}` : undefined
  };
}

export const SITE_PASSWORD = site.password;
export const NOTICE = site.notice;
export const FEATURED_BANNER = site.banner;
export const CATEGORIES = site.categories;
export const MENU_ITEMS = menu.map((e) => toCard(e, "menu.json"));

// Every page ends up with a list of tabs. A page with plain "items" gets one hidden tab.
export const PAGES = Object.fromEntries(
  Object.entries(pages).map(([id, p]) => {
    const rawTabs = p.tabs || [{ id: "main", label: p.title, items: p.items || [] }];
    const tabs = rawTabs.map((t) => ({
      ...t,
      items: (t.items || []).map((e) => toCard(e, `pages.json > ${id} > ${t.label || t.id}`))
    }));
    return [id, { ...p, tabs }];
  })
);
