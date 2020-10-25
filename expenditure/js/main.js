const textInput = document.getElementById('text')
const valueInput = document.getElementById('value')
const btnAdd = document.getElementById('btn-add')
const btnDeduct = document.getElementById('btn-deduct')
const currentBalance = document.getElementById('cur-balance')
const outroList = document.getElementById('outro-list')

let list = []
let balance = 0

if (localStorage.getItem('list')) {
    list = JSON.parse(localStorage.getItem('list'))
    balance = JSON.parse(localStorage.getItem('balance'))
    drow(balance)
}

function getValues(e) {
    if (textInput.value.trim() !== '' && valueInput.value.trim() !== '') {
        if (e.target.id === 'btn-add') {
            balance += +valueInput.value
            list.push({
                text: textInput.value,
                value: valueInput.value,
                date: new Date().toLocaleDateString(),
                flag: 'add'
            })
            textInput.value = ''
            valueInput.value = ''
            localStorage.setItem('list', JSON.stringify(list))
            localStorage.setItem('balance', JSON.stringify(balance))
            drow(balance, 'add')
        } else if (e.target.id === 'btn-deduct') {
            balance -= +valueInput.value
            list.push({
                text: textInput.value,
                value: valueInput.value,
                date: new Date().toLocaleDateString(),
                flag: 'deduct'
            })
            textInput.value = ''
            valueInput.value = ''
            localStorage.setItem('list', JSON.stringify(list))
            localStorage.setItem('balance', JSON.stringify(balance))
            drow(balance)
        } return

    }
}

function drow(balance) {

    outroList.innerHTML = ''

    for (const item of list) {

        const li = document.createElement('li')
        li.classList.add('list-item')

        const firstSpan = document.createElement('span')
        firstSpan.innerText = item.date
        li.append(firstSpan)

        const p = document.createElement('p')
        p.innerText = item.text
        li.append(p)

        const secondSpan = document.createElement('span')
        if (item.flag === 'deduct') {
            secondSpan.innerText = `- ${item.value}`
            secondSpan.style = 'color: red'
        } else {
            secondSpan.innerText = item.value
        }
        li.append(secondSpan)

        outroList.append(li)

        currentBalance.innerText = balance
        balance < 0 ? currentBalance.style = 'color: red' : currentBalance.style.removeProperty('color')
    }

}


btnAdd.addEventListener('click', getValues)
btnDeduct.addEventListener('click', getValues)