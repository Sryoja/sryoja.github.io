
const input = document.getElementById('input');

const todoList = [];

input.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.keyCode === 13){
        todoList.push(input.value);
        input.value = '';
    }
})

