import { onClick, getById } from "./modules/Shortcuts";

const cookieBanner = "cookie-banner";
const cookieBannerClose = "cookie-banner-close";
const cookieBannerAccept = "cookie-banner-accept";
const cookieBannerDecline = "cookie-banner-decline";

const banner = `
    <div tabindex="0" id="${cookieBanner}" class="cookie-banner">
        <h2>Cookies verwalten</h2>
        <button id="${cookieBannerClose}" class="cookie-banner__close" aria-label="Schliessen">x</button>
        <p>Wir verwenden Cookies, um die Nutzerfreundlichkeit unserer Seite zu analysieren und zu optimieren.
        Weitere Informationen erhalten Sie in unserer <a href="/datenschutz.html">Datenschutzerklärung</a>.</p>
        <div class="cookie-banner__button-wrapper">
            <button id="${cookieBannerAccept}" class="cookie-banner__accept">Einverstanden</button>
            <button id="${cookieBannerDecline}" class="cookie-banner__decline">Ablehnen</button>
        </div>
    </div>
`;

// https://developers.google.com/tag-platform/security/guides/privacy#disable-analytics
const googleAnalyticsDisbleString = "ga-disable-G-H6JLVDXXHW";

function googleAnalyticsOptIn() {
  window[googleAnalyticsDisbleString] = false;
  try {
    localStorage.setItem(googleAnalyticsDisbleString, "false");
  } catch (error) {
    console.error("Can not access local storage", error);
  }
}
function googleAnalyticsOptOut() {
  window[googleAnalyticsDisbleString] = true;
  try {
    localStorage.setItem(googleAnalyticsDisbleString, "true");
  } catch (error) {
    console.error("Can not access local storage", error);
  }
}

function initGoogleAnalyticsTracking() {
  try {
    const disableTracking =
      localStorage.getItem(googleAnalyticsDisbleString) === "true";
    window[googleAnalyticsDisbleString] = disableTracking;
  } catch (error) {
    console.error("Can not access local storage", error);
  }
}

function setupCookieBanner(posthog) {
  if (posthog.has_opted_in_capturing() || posthog.has_opted_out_capturing()) {
    return;
  }

  try {
    const bannerHtml = new DOMParser().parseFromString(banner, "text/html").body
      .children[0];
    const closeCookieBanner = () => getById(cookieBanner).remove();

    document.addEventListener("DOMContentLoaded", () => {
      document.body.prepend(bannerHtml);

      onClick(getById(cookieBannerClose), () => {
        posthog.opt_out_capturing();
        googleAnalyticsOptOut();
        closeCookieBanner();
      });
      onClick(getById(cookieBannerAccept), () => {
        posthog.opt_in_capturing();
        googleAnalyticsOptIn();
        closeCookieBanner();
      });
      onClick(getById(cookieBannerDecline), () => {
        posthog.opt_out_capturing();
        googleAnalyticsOptOut();
        closeCookieBanner();
      });
    });
  } catch (error) {
    console.error("Could not append cookie banner", error);
  }
}

window.initGoogleAnalyticsTracking = initGoogleAnalyticsTracking;
window.setupCookieBanner = setupCookieBanner;