import { onClick, toggleClass, removeClass, getById } from "./Shortcuts";

export default class Menu {
  constructor({ menuButton, menuList }) {
    this.menuButton = menuButton;
    this.menuIcon = menuButton.querySelector(".navigation__mobile-icon");
    this.menuList = menuList;
    this.events();
  }

  events = () => {
    onClick(this.menuButton, this.toggleMenu);
    Array.prototype.forEach.call(this.menuList.children, (menuPoint) => {
      onClick(menuPoint, () => this.closeMenu());
    });
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

  getMenuHeight = () => {
    return parseFloat(window.getComputedStyle(this.menuButton).height);
  };

  getNavigationHeight = () => {
    const navigation = getById("navigation");
    return navigation.offsetHeight;
  };
}
