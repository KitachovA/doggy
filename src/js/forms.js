import postData from "./services/post";
import { modalState } from "..";

function clearInputs(input, textarea) {
    input.forEach(item => item.value = '')
    textarea.forEach(item => item.value = '')
}

const message = {
    loading: 'Loading...',
    success: 'Thank you! We will contact you soon.',
    subscribe: 'You have successfully subscribed to the newsletter.',
    failure: 'Something went wrong...',
    spinner: "/src/img/spinner.gif",
    ok: '/src/img/success.png',
    fail: '/src/img/delete.png'
};

export default function forms() {
    const forms = document.querySelectorAll("form:not(.footer__item-form)"),
        inputs = document.querySelectorAll("input"),
        textarea = document.querySelectorAll("textarea"),
        footerForm = document.querySelector(".footer__form form");

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.closest('.footer__item-form')) return

            modalState.canClose = false

            let statusMessage = document.createElement('div');
            form.closest('.modal') ? statusMessage.classList.add("status-modal") : statusMessage.classList.add('status');
            form.parentElement.append(statusMessage)

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            form.classList.add('contact__form-out');
            setTimeout(() => {
                form.classList.add('offset');
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated');
            requestAnimationFrame(() => {
                statusImg.classList.add('fadeInUp')
            })
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.classList.add("animated")
            requestAnimationFrame(() => {
                textMessage.classList.add('fadeInUp', 'text-message')
            })
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);


            postData('https://jsonplaceholder.typicode.com/posts', json)
                .then(res => {
                    console.log(res)
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(error => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                    console.error("POST request failed:", error);
                })
                .finally(() => {
                    clearInputs(inputs, textarea)

                    setTimeout(() => {
                        statusMessage.remove();
                        form.classList.remove('contact__form-out');
                        requestAnimationFrame(() => {
                            form.classList.remove('offset');
                        });
                        modalState.canClose = true
                    }, 5000);
                })
        })
    })

    footerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let statusMessage = document.createElement('div');
        statusMessage.classList.add("footer__status")
        footerForm.parentElement.append(statusMessage);


        const formData = new FormData(footerForm);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        let textMessage = document.createElement('div');
        textMessage.textContent = message.loading;
        statusMessage.appendChild(textMessage);

        postData('https://jsonplaceholder.typicode.com/posts', json)
            .then(res => {
                console.log(res)
                textMessage.textContent = message.subscribe;
            })
            .catch(error => {
                textMessage.textContent = message.failure;
                console.error("POST request failed:", error);
            })
            .finally(() => {
                clearInputs(inputs, textarea)
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            })
    })

}