import "../styles/main.sass";
import slideIn from "./modules/ImageSlideIn";
import { getById } from "./modules/Shortcuts";
import Menu from "./modules/Menu";
import {
  createStickyNavigation,
  highlightCurrentSection,
} from "./modules/Navigation";

// START Load header video if desktop

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion && window.innerWidth >= 768) {
  const iframe = document.getElementById("header-video-player");
  const videoWrapper = document.getElementById("header-video-wrapper");
  const embedUrl = new URL(iframe.dataset.src);
  embedUrl.searchParams.set("origin", window.location.origin);
  iframe.src = embedUrl.href;

  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  script.async = true;

  window.onYouTubeIframeAPIReady = () => {
    new window.YT.Player(iframe, {
      events: {
        onReady: ({ target }) => {
          target.mute();
          target.playVideo();
        },
        onStateChange: ({ data }) => {
          if (data === window.YT.PlayerState.PLAYING) {
            window.setTimeout(() => {
              videoWrapper.classList.remove("header__video-wrapper--loading");
            }, 1500);
          } else if (data === window.YT.PlayerState.ENDED) {
            videoWrapper.remove();
          }
        },
        onError: () => {
          videoWrapper.remove();
        },
      },
    });
  };

  document.body.appendChild(script);
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
  navigator.serviceWorker.register("/sw.js?v=1");
}
