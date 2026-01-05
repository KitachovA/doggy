export default function animate() {
    const welcomeElements = document.querySelectorAll('.welcome__intro'),
        fadeLeftElement = document.querySelectorAll(".left-fade"),
        fadeRightElement = document.querySelectorAll(".right-fade"),
        aboutSection = document.querySelectorAll(".about"),
        trainersBox = document.querySelectorAll(".trainers__item"),
        pricingFade = document.querySelectorAll(".pricing__fade"),
        pricingBox = document.querySelectorAll(".pricing__box"),
        faqPaw = document.querySelectorAll('.faq__fade'),
        faqContainer = document.querySelectorAll(".faq__container"),
        wrapper = document.querySelector('.sticky-wrapper'),
        header = document.querySelector('.header');

    const groups = [
        welcomeElements,
        fadeLeftElement,
        fadeRightElement,
        aboutSection,
        trainersBox,
        pricingFade,
        pricingBox,
        faqPaw,
        faqContainer
    ];

    let scrolling = false;
    let lastScrollY;
    let isInitialLoad = true;
    const scrollThreshold = 2;


    function checkElement(elements, directionDown) {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
            const isAboveViewport = rect.bottom < 0;

            if ((isInitialLoad || directionDown) && (inView || isAboveViewport) && element.dataset.animated !== 'true') {
                element.classList.add('animate');
                element.dataset.animated = 'true';
            }

            if (rect.top >= window.innerHeight) {
                element.classList.remove('animate');
                element.dataset.animated = 'false';
            }
        });
    }


    function animationOnScroll() {
        const currentY = window.scrollY || 0;
        const delta = currentY - lastScrollY;
        const directionDown = delta > scrollThreshold;

        groups.forEach(group => checkElement(group, directionDown));

        lastScrollY = currentY;
        isInitialLoad = false;

    }

    function headerScroll() {
        const scrolled = window.scrollY > 50;

        wrapper.style.position = scrolled ? 'fixed' : 'absolute';
        header.style.backgroundColor = scrolled ? 'white' : '#f8f9fa';
        header.style.boxShadow = scrolled ? '4px 0 20px -5px rgba(0, 0, 0, 0.1)' : 'none';
    }

    groups.forEach(group => checkElement(group, false));

    isInitialLoad = false;

    window.addEventListener('scroll', () => {
        if (!scrolling) {
            scrolling = true;

            requestAnimationFrame(() => {
                headerScroll()
                animationOnScroll();
                scrolling = false;
            });
        }
    });

    lastScrollY = window.scrollY || 0;

}