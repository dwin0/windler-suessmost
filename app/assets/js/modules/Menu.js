import { onClick, toggleClass, removeClass, getById } from "./Shortcuts";
import smoothScroll from "./Scrolling";

export default class Menu {
  constructor({ menuButton, menuList, headerArrowDown, isMobile }) {
    this.menuButton = menuButton;
    this.menuIcon = menuButton.querySelector(".navigation__mobile-icon");
    this.menuList = menuList;
    this.headerArrowDown = headerArrowDown;
    this.isMobile = isMobile;
    this.events();
  }

  events = () => {
    onClick(this.menuButton, this.toggleMenu);
    Array.prototype.forEach.call(this.menuList.children, (menuPoint) => {
      onClick(menuPoint, this.scrollToElement);
    });
    onClick(this.headerArrowDown, this.scrollToElement);
    onClick(window, (event) => {
      if (!getById("navigation").contains(event.target)) {
        this.closeMenu();
      }
    });
  };

  toggleMenu = () => {
    toggleClass(this.menuList, "navigation__list--visible");
    toggleClass(this.menuIcon, "navigation__mobile-icon--close");
  };

  closeMenu = () => {
    removeClass(this.menuList, "navigation__list--visible");
    removeClass(this.menuIcon, "navigation__mobile-icon--close");
  };

  getMenuItemTargetPosition = (targetHash) => {
    const target = targetHash.substring(1, targetHash.length);
    const targetPosition = getById(target).getBoundingClientRect();
    return targetPosition.top;
  };

  getMenuHeight = () => {
    return parseFloat(window.getComputedStyle(this.menuButton).height);
  };

  getNavigationHeight = () => {
    const navigation = getById("navigation");
    return navigation.offsetHeight;
  };

  scrollToElement = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const targetPosition = this.getMenuItemTargetPosition(event.target.hash);

    if (this.isMobile) {
      // open mobile menu
      smoothScroll(targetPosition - this.getMenuHeight(), 1000, () =>
        this.closeMenu()
      );
    } else {
      // desktop menu or closed mobile menu (header-arrow-down)
      smoothScroll(targetPosition - this.getNavigationHeight(), 1000);
    }
  };
}
