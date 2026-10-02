import { renderToString } from "react-dom/server";
import { Router, createPath, type Navigator } from "react-router-dom";
import { AppShell } from "./App";

export { jsonLd, llmsTxt, sitemapXml } from "./seo";

// A one-shot render never navigates, so the router only needs to resolve hrefs.
const noop = () => {};
const staticNavigator: Navigator = {
  createHref: (to) => (typeof to === "string" ? to : createPath(to)),
  push: noop,
  replace: noop,
  go: noop,
};

/** Renders the app to static HTML at build time (see scripts/prerender.mjs). */
export function render(url = "/") {
  return renderToString(
    <Router location={url} navigator={staticNavigator} static>
      <AppShell />
    </Router>
  );
}
