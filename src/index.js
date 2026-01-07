import './scss/main.scss'

import animate from './js/animate'
import interactive from './js/interactive'
import videoplayer from './js/videoplayer'
import collapse from './js/collapse'
import slider from './js/slider'
import gallerySlider from './js/gallerySlider'
import forms from './js/forms'
import modal from './js/modal'

export const modalState = {
    canClose: false
};

window.addEventListener('DOMContentLoaded', () => {
    animate()
    interactive()
    videoplayer()
    collapse()
    slider()
    gallerySlider()
    forms()
    modal()
})

