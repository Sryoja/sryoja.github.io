var link = document.querySelector(".map__phone-btn");
var overlay = document.querySelector("body");
var popup = document.querySelector(".index-form");
var close = popup.querySelector(".index-form__header-btn");
var form = popup.querySelector("form");
var userName = popup.querySelector("[name=name]");
var mail = popup.querySelector("[name=mail]");
var comment = popup.querySelector("[name=comment]");
var isStorageSupport = true;
var storage = "";

try {
    storage = localStorage.getItem("userName");
} catch (err) {
    isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    overlay.classList.add("overlay");

    if (storage) {
        userName.value = storage;
        mail.focus();
    } else {
        userName.focus();
    }
});

close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
    overlay.classList.remove("overlay");
});

form.addEventListener("submit", function (evt) {
    if (!userName.value || !mail.value || !comment.value) {
        evt.preventDefault();
        popup.classList.remove("modal-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("modal-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("userName", userName.value);
        }
    }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popup.classList.contains("modal-show")) {
            popup.classList.remove("modal-show");
            popup.classList.remove("modal-error");
            overlay.classList.remove("overlay");
        }
    }
});