// const URL = 'https://mycite-426b2.firebaseio.com/dodzeek.json'


const name = document.getElementById('name')
const age = document.getElementById('age')
const saveBtn = document.getElementById('btn')
const outputList = document.getElementById('output')

saveBtn.addEventListener('click', getInputVal)
window.addEventListener('load', getData)

function getInputVal(e) {
    e.preventDefault()
    const data = {name: name.value, age: age.value}

    setData(data).then(() => {
        name.value = ''
        age.value = ''
    })


}

function setData(data) {
    return fetch('https://mycite-426b2.firebaseio.com/dodzeek.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()
    ).then(response => {
        data.id = response.name
        return data
    }).then(data => addItem(data))
}

function addItem(data) {
    const li = document.createElement('li')
    li.id = `
    ${data.id}`
    li.innerHTML = `
    ${data.name}, ${data.age} 
`
    outputList.append(li)
}

async function getData() {
    try {
        const response = await fetch('https://mycite-426b2.firebaseio.com/dodzeek.json')
        const data = await response.json()
        const data2 = Object.keys(data).map(item => ({...data[item], id: item}))
        drow(data2)
    }
    catch (e) {console.log(e);}
}

function drow(obj) {

    outputList.innerHTML = ''
    obj.forEach(elem => {
        const li = document.createElement('li')
        li.id = `
        ${elem.id}`
        li.innerHTML = `
        ${elem.name}, ${elem.age}
    `
        outputList.append(li)
    })

}

// ------------------ временное -----------------

// const newData = [
//     {
//         name: 'Petr',
//         age: 13,
//         id: 1111
//     },
//     {
//         name: 'Oleg',
//         age: 16,
//         id: 22222
//     }
// ]

// let abc = Object.keys(newData).map(item => ({...newData[item], id: item}))

// ----------------------------------------------------


