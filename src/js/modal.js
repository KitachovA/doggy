import { modalState } from "..";

export default function modal() {
    const modal = document.querySelector('.modal'),
        pricingBtn = document.querySelectorAll(".pricing__button")

    pricingBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'
            modalState.canClose = true
        })
    })

    modal.addEventListener("click", (e) => {
        if ((e.target.classList.contains('modal__close') || e.target.classList.contains('modal')) && modalState.canClose) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    })
}

