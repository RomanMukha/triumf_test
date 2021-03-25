const addButton = document.querySelector(".add-button")
const nameInput = document.getElementById("nameInput")
const typeInput = document.getElementById("typeInput")
const colorInput = document.getElementById("colorInput")
const tableBody = document.getElementById("tableBody")

const refreshTable = function() {
    tableBody.innerHTML = ''
    data.forEach((item, index) => {
        const tableRow = document.createElement("tr")
        tableRow.id = index
        tableRow.innerHTML = `
        <td class="cell">
            <div class="color-circle" style="background-color: ${item.color}"></div>
        </td>
        <td class="cell">${item.name}</td>
        <td class="cell">${item.type}</td>
        <td class="cell control-cell">
            <button id="upBtn_${index}" class="cell-btn">↑</button>
            <button id="downBtn_${index}" class="cell-btn">↓</button>
            <button id="deleteBtn_${index}" data-id="${index}" class="cell-btn">❌</button>
        </td>
    `
        tableBody.append(tableRow)

        const deleteBtn = document.getElementById("deleteBtn_" + index)
        deleteBtn.addEventListener("click", () => {
            data.splice(deleteBtn.dataset.id, 1)
            refreshTable()
        })
        const upBtn = document.getElementById("upBtn_" + index)
        upBtn.addEventListener("click", () => {
            const currentEl = data[index]
            const upperEl = data[index - 1]
            if (upperEl) {
                data[index] = upperEl
                data[index - 1] = currentEl
            }
            refreshTable()
        })
        const downBtn = document.getElementById("downBtn_" + index)
        downBtn.addEventListener("click", () => {
            const currentEl = data[index]
            const downEl = data[index + 1]
            if (downEl) {
                data[index] = downEl
                data[index + 1] = currentEl
            }
            refreshTable()
        })
    })
    localStorage.setItem('tableData', JSON.stringify(data))
}

if (localStorage.getItem('tableData')) {
    data = JSON.parse(localStorage.getItem('tableData'))
    refreshTable()
} else {
    data = []
}

addButton.addEventListener("click", () => {
    if (nameInput.value.length === 0) {
        alert('Введите имя!')
    } else if (typeInput.value.length === 0) {
        alert('Введите тип!')
    } else {
        const newObj = {
            name: nameInput.value,
            type: typeInput.value,
            color: colorInput.value,
        }  
        data.push(newObj)
        refreshTable()
    }
})  

