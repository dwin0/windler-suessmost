import slideIn from "./modules/ImageSlideIn";
import { getById } from "./modules/Shortcuts";
import Menu from "./modules/Menu";
import {
  createStickyNavigation,
  highlightCurrentSection,
} from "./modules/Navigation";

// START Load header video if desktop

function removeVideoBanner() {
  document.getElementById("header-video-wrapper").remove();
}

const prefersReducedMotion =
  window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

if (prefersReducedMotion) {
  removeVideoBanner();
} else if (window.innerWidth >= 768) {
  const script = document.createElement("script");
  script.setAttribute("src", "https://play.vidyard.com/embed/v4.js");
  script.setAttribute("type", "text/javascript");
  document.body.appendChild(script);

  window.onVidyardAPI = (vidyardEmbed) => {
    vidyardEmbed.api.addReadyListener((_, player) => {
      player.on("ready", () => {
        // hide from screenreader, as it's purely decorative
        document
          .querySelectorAll("#header-video-wrapper [aria-label]")
          .forEach((element) => {
            element.removeAttribute("aria-label");
            element.setAttribute("aria-hidden", "true");
            element.setAttribute("tabindex", "-1");
          });
      });

      player.on("playerComplete", removeVideoBanner);
    });
  };
}

// END Load header video

const isMobile =
  window.getComputedStyle(getById("menu-button")).display !== "none";

const productImages = document.querySelectorAll(".products img");
slideIn(productImages);

new Menu({
  menuButton: getById("menu-button"),
  menuList: getById("menu-list"),
});

const navigation = getById("navigation");
createStickyNavigation(navigation, getById("header"), isMobile);
highlightCurrentSection(document.querySelectorAll("section[id]"), navigation);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
