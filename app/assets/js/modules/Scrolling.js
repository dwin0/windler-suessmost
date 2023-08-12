// https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page

export default function smoothScroll(diff, duration, callback) {
  const startingY = window.scrollY;
  var start;

  const easing = (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  window.requestAnimationFrame(function step(timestamp) {
    start = start || timestamp;

    // Elapsed milliseconds since start of scrolling.
    const time = timestamp - start;

    // Get percent of completion in range [0, 1].
    const percent = easing(Math.min(time / duration, 1));

    // scrollTo(x, y)
    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });

  callback && callback();
}
