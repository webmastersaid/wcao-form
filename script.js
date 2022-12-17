const form = document.getElementById('form'),
    form_page_title = document.getElementById('form_page_title'),
    form_page_main = document.getElementById('form_page_main'),
    form_page_education = document.getElementById('form_page_education'),
    form_page_work = document.getElementById('form_page_work'),
    form_page_legal = document.getElementById('form_page_legal'),
    form_page_psycholog = document.getElementById('form_page_psycholog'),
    form_page_docs = document.getElementById('form_page_docs'),
    field = document.querySelectorAll('.field'),
    empty_message = document.querySelectorAll('.empty-message'),
    date_field = document.getElementById('date_input'),
    floating_parent = document.getElementById('floating_parent'),
    help_select = document.getElementById('help_select'),
    suspension_sport_select = document.getElementById('suspension_sport_select'),
    privacy_policy = document.getElementById('privacy_policy'),
    privacy_checkbox = document.getElementById('privacy_policy_checkbox'),
    btn_page_next = document.getElementById('btn_page_next'),
    btn_page_back = document.getElementById('btn_page_back'),
    btn_page_send = document.getElementById('btn_page_send'),
    form_page_current = document.getElementById('form_page_current'),
    form_page_total = document.getElementById('form_page_total'),
    alert_dialog = document.getElementById('alert_dialog'),
    alert_dialog_ok = document.getElementById('alert_dialog_ok'),
    modal_dialog = document.getElementById('modal_dialog'),
    modal_close = document.getElementById('modal_close'),
    modal_ok = document.getElementById('modal_ok'),
    modal_cancel = document.getElementById('modal_cancel'),
    modal_main = document.getElementById('modal_main'),
    modal_scroll_btn = document.getElementById('modal_scroll_btn'),
    modal_btn_goup = document.getElementById('modal_btn_goup');

let pages = [], pageCount = 1, currentPage = form_page_main;

const optionsDictionary = {
    'main': form_page_main,
    'edu': form_page_education,
    'work': form_page_work,
    'legal': form_page_legal,
    'psycholog': form_page_psycholog,
    'docs': form_page_docs,
};

const fieldEvent = (element, index) => {
    const nextField = field[index + 1];
    const nextFirstElement = nextField.nextElementSibling.children[0];
    // check field valid or invalid
    if (element.value != '') {
        element.classList.add('valid');
        element.classList.remove('invalid');
    };
    try {
        // set or remove field required
        if (nextField.classList.contains('input')) {
            if (element.value == '1') {
                nextField.setAttribute('required', '');
                nextFirstElement.textContent = '*';
            } else if (element.value == '0') {
                nextField.removeAttribute('required');
                nextFirstElement.textContent = '';
            };
        };
        // show or hide field other
        if (nextField.id == 'trainig_continue_input') {
            if (element.value == 'other') {
                nextField.parentElement.style.display = 'block';
                nextField.setAttribute('required', '');
                nextFirstElement.textContent = '*';
            } else {
                nextField.parentElement.style.display = 'none';
                nextField.removeAttribute('required');
                nextField.value = '';
                nextFirstElement.textContent = '';
            };
        };
    } catch { };
    // show or hide clear field button
    const btn_clear = field[index].nextElementSibling.nextElementSibling;
    if (field[index].classList.contains('valid') && btn_clear.classList.contains('btn-clear')) {
        if (element.value != '') {
            btn_clear.style.visibility = 'visible';
        } else {
            btn_clear.style.visibility = 'hidden';
        };
    };
    // clear field
    btn_clear.addEventListener('click', () => {
        for (let i = 0; i < field[index].children.length; i++) {
            field[index].children[i].selected = field[index].children[i].defaultSelected;
        };
        element.classList.remove('valid');
        btn_clear.style.visibility = 'hidden';
        if (nextField.classList.contains('valid') && element.value !== "") {
            nextField.classList.remove('valid');
        };
        if (nextField.classList.contains('invalid')) {
            nextField.classList.remove('invalid');
        };
        if (nextField.classList.contains('input') && element.value == "") {
            nextField.removeAttribute('required');
            nextFirstElement.textContent = '';
        };
        if (nextField.id == 'trainig_continue_input') {
            nextField.parentElement.style.display = 'none';
            nextField.removeAttribute('required');
            nextField.value = '';
            nextFirstElement.textContent = '';
        };
        if (field[index].parentElement.id == 'help_multiple_select') {
            Object.keys(optionsDictionary).forEach((key) => {
                optionsDictionary[key].querySelectorAll('.required').forEach((element) => {
                    element.children[0].removeAttribute('required');
                });
            });
            pages = [];
        };
    });
}, closeDialog = () => {
    alert_dialog.style.display = 'none';
    document.body.style.overflow = 'auto';
}, selectOption = () => {
    // select options wich to show page
    pages = [];
    Object.keys(optionsDictionary).forEach((key) => {
        optionsDictionary[key].querySelectorAll('.required').forEach((element) => {
            element.children[0].removeAttribute('required');
        });
    });
    pages.push('main');
    for (let option of help_select.options) {
        if (option.selected) {
            pages.push(option.value);
            optionsDictionary[option.value].querySelectorAll('.required').forEach((element) => {
                element.children[0].setAttribute('required', '')
            })
        };
    }
    pages.push('docs');
    form_page_total.textContent = pages.length;
}, nextPage = (current, next, title) => {
    // show next page and hide last recent page
    let valid = true;
    for (let i = 0; current.childElementCount > i; i++) {
        const currentClildren = current.children[i].children[0];
        const nextNextSibling = field[i].nextElementSibling.nextElementSibling;
        if (currentClildren.checkValidity()) {
            valid = true;
        } else {
            valid = false;
            location.href = '#' + currentClildren.id;
            currentClildren.classList.add('invalid');
            currentClildren.nextElementSibling.nextElementSibling.classList.add('empty');
            setTimeout(() => {
                nextNextSibling.classList.remove('empty');
            }, 3000);
            return;
        }
    }
    if (valid) {
        current.style.display = 'none';
        next.style.display = 'block';
        btn_page_back.style.display = 'block';
        form_page_title.innerText = title;
        location.href = '#' + next.children[0].children[0].id;
        pageCount += 1;
        form_page_current.textContent = pageCount;
        currentPage = next;
        if (next.id == 'form_page_docs') {
            btn_page_next.style.display = 'none';
            btn_page_send.style.display = 'block';
        };
    }
}, backPage = (current, back, title) => {
    current.style.display = 'none';
    back.style.display = 'block';
    btn_page_send.style.display = 'none';
    btn_page_back.style.display = 'block';
    btn_page_next.style.display = 'block';
    form_page_title.innerText = title;
    location.href = '#' + back.children[0].children[0].id;
    pageCount -= 1;
    form_page_current.textContent = pageCount;
    if (back.id == 'form_page_main') {
        btn_page_back.style.display = 'none';
    };
    currentPage = back;
};
// events of fields
field.forEach((element, index) => {
    element.addEventListener('focusout', () => {
        // check field valid or invalid
        if (element.value == '' && element.getAttribute('required') != null) {
            element.classList.remove('valid');
            element.classList.add('invalid');
            empty_message[index].classList.add('empty');
            setTimeout(() => {
                empty_message[index].classList.remove('empty');
            }, 2000);
        };
        fieldEvent(element, index);
    });
    element.addEventListener('click', () => {
        fieldEvent(element, index);
    });
    element.addEventListener('change', () => {
        fieldEvent(element, index);
    });
})
// date field event
date_field.addEventListener('change', () => {
    const birthday = new Date(date_field.value);
    const month_difference = Date.now() - birthday.getTime();
    const age_date = new Date(month_difference);
    const year = age_date.getUTCFullYear();
    const age = Math.abs(year - 1970);
    const firstChildren = floating_parent.children[0];
    // show fields if age < 18
    if (age < 18) {
        floating_parent.style.display = 'block';
        firstChildren.setAttribute('required', '');
    } else {
        floating_parent.style.display = 'none';
        firstChildren.removeAttribute('required');
        firstChildren.classList.remove('invalid');
        firstChildren.classList.remove('valid');
        firstChildren.value = '';
    };
});
// set select options if focusout from field
help_select.addEventListener('focusout', () => {
    selectOption();
});
// set select options if clicked 
help_select.addEventListener('click', () => {
    selectOption();
});
// set select options if changed
help_select.addEventListener('change', () => {
    selectOption();
});
// show alert dialog
suspension_sport_select.addEventListener('change', () => {
    if (suspension_sport_select.value == "0") {
        alert_dialog.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
});
// close alert dialog
alert_dialog_ok.addEventListener('click', () => {
    closeDialog();
});
// privacy police show event
privacy_policy.addEventListener('click', () => {
    modal_dialog.style.display = 'block';
    document.body.style.overflow = 'hidden';
});
// page form navigation next
btn_page_next.addEventListener('click', () => {
    if (pages.length < 1) {
        location.href = '#' + help_select.id;
        help_select.classList.add('invalid');
        const selectNextElementSibling = help_select.nextElementSibling.nextElementSibling.nextElementSibling;
        selectNextElementSibling.classList.add('empty');
        setTimeout(() => {
            selectNextElementSibling.classList.remove('empty');
        }, 3000);
    } else {
        switch (pages[pageCount]) {
            case 'edu':
                nextPage(currentPage, optionsDictionary[pages[pageCount]], 'Новое образование');
                break;
            case 'work':
                nextPage(currentPage, optionsDictionary[pages[pageCount]], 'Новое рабочее место');
                break;
            case 'legal':
                nextPage(currentPage, optionsDictionary[pages[pageCount]], 'Получение юридической консультации');
                break;
            case 'psycholog':
                nextPage(currentPage, optionsDictionary[pages[pageCount]], 'Получение психологической поддержки');
                break;
            case 'docs':
                nextPage(currentPage, optionsDictionary[pages[pageCount]], 'Документы');
                break;
        };
    };
});
// page form navigation back
btn_page_back.addEventListener('click', () => {
    switch (pages[pageCount - 2]) {
        case 'main':
            backPage(currentPage, optionsDictionary[pages[pageCount - 2]], 'Личная информация');
            break;
        case 'edu':
            backPage(currentPage, optionsDictionary[pages[pageCount - 2]], 'Новое образование');
            break;
        case 'work':
            backPage(currentPage, optionsDictionary[pages[pageCount - 2]], 'Новое рабочее место');
            break;
        case 'legal':
            backPage(currentPage, optionsDictionary[pages[pageCount - 2]], 'Получение юридической консультации');
            break;
        case 'psycholog':
            backPage(currentPage, optionsDictionary[pages[pageCount - 2]], 'Получение психологической поддержки');
            break;
    };
});
// close privacy policy modal window
modal_close.addEventListener('click', () => {
    modal_dialog.style.display = 'none';
    document.body.style.overflow = 'auto';
});
// confirm privacy policy and close modal window
modal_ok.addEventListener('click', () => {
    privacy_checkbox.checked = 1;
    modal_dialog.style.display = 'none';
    document.body.style.overflow = 'auto';
});
// reject privacy policy and close modal window
modal_cancel.addEventListener('click', () => {
    privacy_checkbox.checked = 0;
    modal_dialog.style.display = 'none';
    document.body.style.overflow = 'auto';
});
// scroll privacy policy to bottom on modal window
modal_scroll_btn.addEventListener('click', () => {
    modal_main.style.scrollBehavior = 'smooth';
    modal_main.scroll(0, modal_main.scrollHeight);
});
// modal window scroll event show buttons if scrolled to bottom
modal_main.addEventListener('scroll', () => {
    if (modal_main.offsetHeight + modal_main.scrollTop >= modal_main.scrollHeight - 60) {
        modal_scroll_btn.style.display = 'none';
        modal_btn_goup.style.display = 'flex';
    } else {
        modal_scroll_btn.style.display = 'flex';
        modal_btn_goup.style.display = 'none';
    };
});
// handler submit form
async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("form_message");
    const formData = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Ваша заявка отправлена на рассмотрение. Спасибо!";
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Ошибка! Ваша заявка не отправлена. Попробуйте еще раз..."
                }
            })
        }
    }).catch(() => {
        status.innerHTML = "Ошибка! Ваша заявка не отправлена. Попробуйте еще раз..."
    });
}
// form submit
form.addEventListener('submit', handleSubmit)