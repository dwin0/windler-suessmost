import { addClass, removeClass } from './Shortcuts'

export function createStickyNavigation(navigation, header, isMobile) {
    if(isMobile) {
        return;
    }

    const navigationOffsetTop = navigation.offsetTop;
    var sticky = false;

    window.addEventListener('scroll', () => {
        const belowNavigation = window.pageYOffset >= navigationOffsetTop;

        if (belowNavigation && !sticky) {
            addClass(navigation, 'navigation--sticky');
            header.style.marginBottom = `${navigation.offsetHeight}px`;
            sticky = true;
        } else if(!belowNavigation && sticky) {
            removeClass(navigation, 'navigation--sticky');
            header.style.marginBottom = '0';
            sticky = false;
        }
    });
}

export function highlightCurrentSection(sections, navigation) {
    const sectionArray = [ ...sections ];
    const menuItems = sectionArray.map(section => 
        document.querySelector(`.navigation__entry > [href="#${section.id}"]`));
    const windowCenter = window.outerHeight / 2;
    
    window.addEventListener('scroll', () => {
        sectionArray.forEach((section, index) => {
            const menuItem = menuItems[index];
            const rect = section.getBoundingClientRect();
            
            if (rect.top < windowCenter && rect.bottom > windowCenter) {
                addClass(menuItem, 'navigation__link--current-section');
            } else {
                removeClass(menuItem, 'navigation__link--current-section');
            }
        });
    });
}
