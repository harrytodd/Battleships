const playerGrid = document.querySelector('.player-grid')
const compGrid = document.querySelector('.comp-grid')
const width = 10
const playerCells = []
const compCells = []

//* GRID GENERATOR
function playerGridGen() {
  let currNum = 1
  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    playerGrid.appendChild(div)

    if (
      (i < width) ||
      (i % width === 0) ||
      (i > (width ** 2) - width - 1) ||
      (i % width === width - 1)) {
      div.classList.add('void')
    } else {
      div.id = currNum.toString()
      currNum++
      playerCells.push(div)
    }
    div.innerHTML = (div.id).toString()
  }
}
playerGridGen()

function compGridGen() {
  let currNum = 1
  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    compGrid.appendChild(div)

    if (
      (i < width) ||
      (i % width === 0) ||
      (i > (width ** 2) - width - 1) ||
      (i % width === width - 1)) {
      div.classList.add('void')
    } else {
      div.id = currNum.toString()
      currNum++
      compCells.push(div)
    }
    div.innerHTML = (div.id).toString()
  }
}
compGridGen()





