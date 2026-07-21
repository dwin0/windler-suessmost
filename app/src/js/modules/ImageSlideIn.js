import { addClass } from "./Shortcuts";

export default function slideIn(images) {
  const observer = new IntersectionObserver(onIntersection, {
    rootMargin: "0px 0px -50px 0px",
    threshold: 1.0,
  });

  images.forEach((image, index) => {
    observer.observe(image);
    image.index = index;
    addClass(image, "reveal-on-scroll");
  });

  function onIntersection(entries) {
    // Loop through the entries
    entries.forEach((entry) => {
      // Are we in viewport?
      if (entry.intersectionRatio <= 0) {
        // not in viewport
        return;
      }

      // Stop watching and load the image
      observer.unobserve(entry.target);

      addFadeInDirection(entry);
    });
  }

  function addFadeInDirection(entry) {
    if (entry.target.index % 2 == 0) {
      addClass(entry.target, "reveal-on-scroll--fade-in-right");
    } else {
      addClass(entry.target, "reveal-on-scroll--fade-in-left");
    }
  }
}
