
const menuBtn = document.getElementById('menuBtn')
const headerWrap = document.querySelector('.headerWrap')


menuBtn.addEventListener('click', function(){
    headerWrap.classList.toggle('_mobile')
})