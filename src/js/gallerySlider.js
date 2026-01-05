export default function gallerySlider() {
    const galleryItems = document.querySelectorAll('.gallery__item'),
        galleryOverlay = document.querySelector('.gallery__overlay'),
        galleryOverlayContent = galleryOverlay.querySelector('.gallery__overlay-content'),
        closeBtn = document.querySelector('.gallery__overlay-close'),
        slidesSrcImg = Array.from(document.querySelectorAll('.gallery__img')).map(img => img.src);

    let floatingImage = null,
        currentIndex = 0,
        prevBtn = null,
        nextBtn = null,
        overlaySliderTrack = null;

    function buildFloatingImage() {
        if (!floatingImage) {
            floatingImage = document.createElement('img');
            floatingImage.classList.add('gallery__overlay-image');
            galleryOverlay.append(floatingImage);
        }
    }

    function buildGallerySlider() {
        if (overlaySliderTrack) return; //already built

        const overlaySlider = document.createElement('div');
        overlaySlider.classList.add('gallery__overlay-slider');

        overlaySliderTrack = document.createElement('div');
        overlaySliderTrack.classList.add('gallery__overlay-slider-track');

        overlaySliderTrack.style.transition = 'none';

        slidesSrcImg.forEach(imgSrc => {
            const overlaySlideBox = document.createElement('div');
            overlaySlideBox.classList.add('gallery__overlay-slide');

            const overlaySlideImg = document.createElement('img');
            overlaySlideImg.classList.add('gallery__overlay-slide-img');
            overlaySlideImg.src = imgSrc;

            overlaySlideBox.append(overlaySlideImg);
            overlaySliderTrack.append(overlaySlideBox);
        })

        overlaySlider.append(overlaySliderTrack);


        prevBtn = document.createElement('button');
        prevBtn.classList.add('gallery__overlay-prev');
        prevBtn.innerHTML = '&#10094;';

        nextBtn = document.createElement('button');
        nextBtn.classList.add('gallery__overlay-next');
        nextBtn.innerHTML = '&#10095;';

        galleryOverlayContent.innerHTML = '';
        galleryOverlayContent.append(prevBtn, overlaySlider, nextBtn);


        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateGallerySliderTrackPosition();
            }
        })
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slidesSrcImg.length - 1) {
                currentIndex++;
                updateGallerySliderTrackPosition();
            }
        })
    }

    function openGalleryOverlay(imgElement, imgSrc, index) {
        buildFloatingImage();
        buildGallerySlider();

        currentIndex = index;

        const imgRect = imgElement.getBoundingClientRect();

        floatingImage.style.top = `${imgRect.top}px`;
        floatingImage.style.left = `${imgRect.left}px`;
        floatingImage.style.width = `${imgRect.width}px`;
        floatingImage.style.height = `${imgRect.height}px`;
        floatingImage.style.display = 'block';
        floatingImage.style.objectFit = 'cover';

        floatingImage.src = imgSrc;
        floatingImage.alt = `Gallery Image ${index + 1}`;

        galleryOverlay.classList.remove('hide');
        galleryOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';


        galleryOverlayContent.style.opacity = '0';

        requestAnimationFrame(() => {
            floatingImage.classList.add('animate-to-center');
        });


        setTimeout(() => {
            floatingImage.style.display = 'none';

            const prevGalleryOverlayContentTransition = galleryOverlayContent.style.transition;
            galleryOverlayContent.style.transition = 'none';
            galleryOverlayContent.style.opacity = '1';


            updateGallerySliderTrackPosition(true);
            controlGalleryArrows()

            requestAnimationFrame(() => {
                galleryOverlayContent.style.transition = prevGalleryOverlayContentTransition || '';

                if (overlaySliderTrack) overlaySliderTrack.style.transition = '';
            })
        }, 500)
    }

    function updateGallerySliderTrackPosition(boolean = false) {
        if (!overlaySliderTrack) return;

        if (boolean) {
            overlaySliderTrack.style.transition = 'none';
            overlaySliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            overlaySliderTrack.getBoundingClientRect();
            overlaySliderTrack.style.transition = '';
        } else {
            overlaySliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        controlGalleryArrows()
    }

    function controlGalleryArrows() {
        if (!prevBtn || !nextBtn) return;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === slidesSrcImg.length - 1;
        prevBtn.classList.toggle('disabled', prevBtn.disabled);
        nextBtn.classList.toggle('disabled', nextBtn.disabled);
    }

    function closeGalleryOverlay() {

        buildFloatingImage();
        const imgSrc = slidesSrcImg[currentIndex];
        floatingImage.src = imgSrc;
        floatingImage.style.display = 'block';

        floatingImage.classList.add('animate-to-center');
        galleryOverlayContent.style.opacity = '0';


        const originalItem = galleryItems[currentIndex];
        const originalItemRect = originalItem.querySelector('img').getBoundingClientRect();

        requestAnimationFrame(() => {
            floatingImage.classList.remove('animate-to-center');
            floatingImage.style.top = `${originalItemRect.top}px`;
            floatingImage.style.left = `${originalItemRect.left}px`;
            floatingImage.style.width = `${originalItemRect.width}px`;
            floatingImage.style.height = `${originalItemRect.height}px`;
        });

        setTimeout(() => {
            galleryOverlay.classList.remove('show');
            galleryOverlay.classList.add('hide');
            document.body.style.overflow = '';

            if (galleryOverlayContent) galleryOverlayContent.innerHTML = '';
            overlaySliderTrack = null;
            prevBtn = null;
            nextBtn = null;
        }, 500);
    }


    galleryItems.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const img = item.querySelector('img');
            const imgSrc = img.src;
            openGalleryOverlay(img, imgSrc, i);
        });
    });


    closeBtn.addEventListener('click', closeGalleryOverlay);


    galleryOverlay.addEventListener('click', (e) => {
        if (e.target === galleryOverlay) {
            closeGalleryOverlay();
        }
    });
}