
const input = document.getElementById('input')
const addBtn = document.getElementById('addBtn')
const list = document.querySelector('.list')

let todoList = []

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    drowList()
}

input.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        pushInput()
    }
})

addBtn.addEventListener('click', pushInput)

function pushInput() {
    if (input.value.trim() !== '') {
        todoList.unshift({
            text: input.value,
            done: false
        })
        input.value = ''
        input.focus()
        localStorage.setItem('todo', JSON.stringify(todoList))
        drowList()
    } else {
        alert('Напиши нормальный таск!')
        throw new Error('ти шо ебобо?')
    }
}



function drowList() {

    list.innerHTML = ''

    for (const todoItem of todoList) {

        const liItem = document.createElement('li')
        liItem.classList = 'list-item'
        list.append(liItem)

        const pItem = document.createElement('p')
        pItem.classList.add('list-content')
        pItem.innerText = todoItem.text
        if (todoItem.done) {pItem.classList.add('taskDone')}

        const buttonDone = document.createElement('button')
        buttonDone.classList.add('list-btn', 'done', 'btn')
        buttonDone.innerText = 'done'
        buttonDone.addEventListener('click', () => {
            todoItem.done = !todoItem.done
            drowList()
        })

        const buttonRem = document.createElement('button')
        buttonRem.classList.add('list-btn', 'remove', 'btn')
        buttonRem.innerText = 'remove'
        buttonRem.addEventListener('click', () => {
            const curInd = todoList.indexOf(todoItem)
            todoList.splice(curInd, 1)
            if (todoList.length) {
                localStorage.setItem('todo', JSON.stringify(todoList))
                drowList()
            } else {
                localStorage.clear()
                drowList()
            }

        })

        liItem.append(pItem, buttonDone, buttonRem)
    }
}