import lazyLoad from "./modules/LazyLoader";
import { getById } from "./modules/Shortcuts";
import Menu from "./modules/Menu";
import {
  createStickyNavigation,
  highlightCurrentSection,
} from "./modules/Navigation";

// STARTLoad header video if desktop

if (window.innerWidth >= 768) {
  const script = document.createElement("script");
  script.setAttribute("src", "https://play.vidyard.com/embed/v4.js");
  script.setAttribute("type", "text/javascript");
  document.body.appendChild(script);

  window.onVidyardAPI = (vidyardEmbed) => {
    vidyardEmbed.api.addReadyListener((_, player) => {
      player.on("playerComplete", () => {
        document.getElementById("header-video-wrapper").style.display = "none";
      });
    });
  };
}

// END Load header video

const isMobile =
  window.getComputedStyle(getById("menu-button")).display !== "none";

const productImages = document.querySelectorAll(".products [data-src]");
lazyLoad(productImages, true);

const otherImages = document.querySelectorAll(
  "[data-src]:not(.reveal-on-scroll)"
);
lazyLoad(otherImages, false);

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
