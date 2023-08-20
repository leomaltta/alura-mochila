const form = document.querySelector('#novoItem')
const list = document.querySelector('#list')
const items = JSON.parse(localStorage.getItem("items")) || []

items.forEach((element) => {
    createElements(element)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = e.target.elements['nome']
    const amount = e.target.elements['quantidade']

    const exist = items.find( element => element.name === name.value)

    const currentItem = {
        "name": name.value,
        "amount": amount.value
    }

    if (exist) {
        currentItem.id = exist.id
        
        updateElements(currentItem)
        items[items.findIndex(element => element.id === exist.id)] = currentItem
    } else {
        currentItem.id = items[items.length -1] ? (items[items.length -1]).id +1 : 0 
        createElements(currentItem)
        items.push(currentItem)    
    }
    
    
    localStorage.setItem("items", JSON.stringify(items))

    name.value = ""
    amount.value = ""
})

function createElements(item) {
    const newItem = document.createElement('li')
    newItem.classList.add("item")

    const numItem = document.createElement('strong')
    numItem.innerHTML = item.amount
    numItem.dataset.id = item.id

    newItem.appendChild(numItem)
    newItem.innerHTML += item.name

    newItem.appendChild(buttonDelete(item.id))

    list.appendChild(newItem)
}

function updateElements(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.amount
}

function buttonDelete(id) {
    const buttonElement = document.createElement("button")
    buttonElement.innerHTML = "X"

    buttonElement.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return buttonElement
}

function deleteElement(tag,id) {
    tag.remove()

    items.splice(items.findIndex(element => element.id === id), id)
    localStorage.setItem("items", JSON.stringify(items))
}