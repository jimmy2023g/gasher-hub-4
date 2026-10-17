# Gasher Hub

React + Vite + React Router. **All content lives in plain JSON files in `src/content/`.** You never have to touch React code to change the site.

## Run it

```bash
npm install
npm run dev       # live preview; saves in src/content/ reload instantly
npm run build     # production build in /dist
```

## The three files you edit

| File | What it controls |
|---|---|
| `src/content/site.json` | Password, pop-up notice, top banner, category tabs |
| `src/content/menu.json` | The cards on the home page |
| `src/content/pages.json` | Sub-pages (like the Games Portal) and the cards on them |

## Recipes

**Add a card that opens an outside link** (in `menu.json`, copy a line and edit it):

```json
{ "title": "My Link", "desc": "What it is", "url": "https://example.com", "icon": "fa-star", "color": "#ffd700", "category": "tools" }
```

**Add a game to the Games page** (in `pages.json`, inside `games` > `items`):

```json
{ "title": "Snake", "desc": "Classic snake", "url": "https://example.com/snake", "icon": "fa-worm", "color": "#69f0ae" }
```

**Make a brand-new sub-page**

1. In `pages.json`, add a new entry:
   ```json
   "movies": { "title": "Movies", "subtitle": "Watch together.", "items": [ ... ] }
   ```
2. In `menu.json`, add a card with `"page": "movies"` instead of `"url"`. It opens at `/#/movies`.

**Tile pages with tabs, search, a locked tab and a promo pop-up** (the Games page uses this). In `pages.json`:

- `"layout": "tiles"` shows picture tiles. Without it you get the normal icon cards.
- `"tabs"` replaces `"items"`. Each tab has an `id`, a `label` and its own `items`. Add `"password": "..."` to lock a tab.
- `"promo"` is the full-screen pop-up. It shows once per browser session. Delete the `promo` block to turn it off.
- Each tile item uses `"image"` for the picture. If the picture fails to load, the tile shows its icon instead.

```json
{ "title": "Snake", "url": "https://example.com/snake", "image": "https://example.com/snake.jpg" }
```

Tab passwords are checked in the browser, so they keep casual visitors out but are not real security.

**Change the banner, notice, or password:** edit `site.json`.

## Field reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Card name |
| `desc` | no | Small text under the name |
| `url` *or* `page` | yes (one) | `url` = outside link, `page` = sub-page id from `pages.json` |
| `icon` | no | Any free Font Awesome name, e.g. `fa-rocket`. Browse: https://fontawesome.com/icons (filter: Free, Solid). Default `fa-link` |
| `color` | no | Hex color like `#ff5252`. Default cyan |
| `category` | menu only | One of the ids in `site.json` > `categories`: `games`, `media`, `tools`, `social` |
| `image` | no | Picture URL, used by tile pages |
| `badge` | no | Small label in the card corner, e.g. `New` |

## JSON tips

- Every line in a list ends with a comma **except the last one**.
- Text must use straight double quotes `"like this"`.
- If something looks wrong, open the browser console (F12). The site prints a plain-English warning when a card is missing a title, link, or points to a page that doesn't exist.

## Code layout (only if you want to change the design)

```
src/
  content/   <- JSON content (edit this)
  content.js <- loads the JSON and fills in defaults
  App.jsx    <- routes and lock state
  pages/     <- Home.jsx, Page.jsx (template for every sub-page)
  components/<- Dock, Card, Tile, SearchBar, LockScreen, NoticeModal, PasswordGate, PromoOverlay
  styles.css <- all styling
```
