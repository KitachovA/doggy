import './scss/main.scss'

import animate from './js/animate'
import interactive from './js/interactive'
import videoplayer from './js/videoplayer'
import collapse from './js/collapse'
import slider from './js/slider'
import gallerySlider from './js/gallerySlider'
// import gallery from './js/gallery'

window.addEventListener('DOMContentLoaded', () => {
    animate()
    interactive()
    videoplayer()
    collapse()
    slider()
    gallerySlider()
    // gallery()
})

