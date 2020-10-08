//* Grid Generator
const playerGrid = document.querySelector('.player-grid')
const compGrid = document.querySelector('.comp-grid')
const width = 10
const playerCells = []
const compCells = []
//* Button Logic
const lengthButtonsArr = Array.from(document.querySelectorAll('.length-butt'))
const colorButtonsArr = Array.from(document.querySelectorAll('.color-butt'))
const confirmPlaceButt = document.querySelector('.confirm')
const lengthDiv = document.querySelector('.length')
const colorDiv = document.querySelector('.color')
const placeShipDiv = document.querySelector('.place-ship')
const startGameDiv = document.querySelector('.start-game')

function init() {
  playerGridGen()
  compGridGen()
  playerGrid.classList.add('show')
  lengthDiv.classList.add('show')
}
init()

//* ********** GRID GENERATOR **********
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

//* ********** CLASSES **********

const playerShips = new class {
  constructor(length, color, position) {
    this.length = length,
    this.color = color,
    this.position = position
  }
}


const compShips = new class {
  constructor(length, color, position) {
    this.length = length,
    this.color = color,
    this.position = position
  }
}


//* ********** BUTTON LOGIC **********
const shipAttributes = [[1], [2], [3], [4]]
let currShipLength = 0

lengthButtonsArr.forEach((el) => {
  el.addEventListener('click', () => {
    el.classList.add('selected')
    lengthDiv.classList.remove('show')
    colorDiv.classList.add('show')
    currShipLength = Number(el.innerHTML)
    console.log(currShipLength)
  })
})

colorButtonsArr.forEach((el) => {
  el.addEventListener('click', () => {
    colorDiv.classList.remove('show')
    placeShipDiv.classList.add('show')
    shipAttributes[currShipLength - 1].push(el.id)
    console.log(shipAttributes)
  })
})

confirmPlaceButt.addEventListener('click', () => {
  placeShipDiv.classList.remove('show')
  let allTrue = 0
  lengthButtonsArr.forEach((el) => el.classList.contains('selected') ? allTrue++ : true)
  if (allTrue === 4) {
    startGameDiv.classList.add('show')
  } else {
    lengthDiv.classList.add('show')
  }
})

