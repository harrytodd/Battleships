//* Grid Generator
const playerGrid = document.querySelector('.player-grid')
const compGrid = document.querySelector('.comp-grid')
const width = 10
const playerWidth = width - 2
const playerCells = []
const playablePlayerCells = []
const compCells = []
const playableCompCells = []
//* Button Logic
const lengthButtonsArr = Array.from(document.querySelectorAll('.length-butt'))
const colorButtonsArr = Array.from(document.querySelectorAll('.color-butt'))
const confirmPlaceButt = document.querySelector('.confirm')
const startGameButt = document.querySelector('.start-butt')
const lengthDiv = document.querySelector('.length')
const colorDiv = document.querySelector('.color')
const placeShipDiv = document.querySelector('.place-ship')
const startGameDiv = document.querySelector('.start-game')
//* Ship Placement 
const horizontalButt = document.querySelector('.horizontal')
const verticalButt = document.querySelector('.vertical')

function init() {
  playerGridGen()
  compGridGen()
  playerGrid.classList.add('show')
  lengthDiv.classList.add('show')
  colorDiv.classList.remove('show')
  placeShipDiv.classList.remove('show')
  startGameDiv.classList.remove('show')
  compGrid.classList.remove('show')
}
init()

//* ********** GRID GENERATOR **********
function playerGridGen() {
  let currNum = 0
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
      playablePlayerCells.push(div)
    }
    playerCells.push(div)
    div.innerHTML = (div.id).toString()
  }
}

function compGridGen() {
  let currNum = 0
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
      playableCompCells.push(div)
    }
    compCells.push(div)
    div.innerHTML = (div.id).toString()
  }
}

//* ********** CLASSES **********

class playerShips {
  constructor(length, color, position, orientation) {
    this.length = length,
      this.color = color,
      this.position = position
    this.orientation = orientation
  }
}
const ship1 = new playerShips()
const ship2 = new playerShips()
const ship3 = new playerShips()
const ship4 = new playerShips()

class compShips {
  constructor(length, color, position) {
    this.length = length,
      this.color = color,
      this.position = position
  }
}



//* ********** BUTTON LOGIC **********
let currShip

lengthButtonsArr.forEach((el) => {
  el.addEventListener('click', lengthButts)
  function lengthButts() {
    el.classList.add('selected')
    lengthDiv.classList.remove('show')
    colorDiv.classList.add('show')

    if (el.innerHTML === '1') {
      ship1.length = Number(el.innerHTML)
      currShip = ship1
    } else if (el.innerHTML === '2') {
      ship2.length = Number(el.innerHTML)
      currShip = ship2
    } else if (el.innerHTML === '3') {
      ship3.length = Number(el.innerHTML)
      currShip = ship3
    } else {
      ship4.length = Number(el.innerHTML)
      currShip = ship4
    }
    el.removeEventListener('click', lengthButts)
    console.log(currShip)
  }
})

colorButtonsArr.forEach((el) => {
  el.addEventListener('click', colorButts)
  function colorButts() {
    colorDiv.classList.remove('show')
    placeShipDiv.classList.add('show')
    currShip.color = el.id
    el.removeEventListener('click', colorButts)
    el.id = 'color-hide'
    console.log(currShip)
  }
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
  console.log(currShip)
  playablePlayerCells.forEach(el => console.log(el.id))
})

startGameButt.addEventListener('click', () => {
  createCompShips()
  startGame()
})


//* ********** SHIP PLACEMENT **********
horizontalButt.addEventListener('click', () => {
  currShip.orientation = 'horizontal'
  console.log(currShip)
})

verticalButt.addEventListener('click', () => {
  currShip.orientation = 'vertical'
  console.log(currShip)
})


playablePlayerCells.forEach((el) => {
  el.addEventListener('click', addShip)
  function addShip() {
    currShip.position = Number(el.id)
    const elId = Number(el.id)
    if (currShip.orientation === 'horizontal') {
      let num = Number(el.id) + currShip.length
      if ((elId % playerWidth <= playerWidth - currShip.length)) {
        let clearSpace = 0
        for (let i = Number(el.id); i < num; i++) {
          if (playablePlayerCells[i].classList.contains('occupied')) {
            return
          } else {
            clearSpace++
          }
        }

        if (clearSpace !== currShip.length) {
          return
        } else {
          for (let i = Number(el.id); i < num; i++) {
            playablePlayerCells[i].id = currShip.color
            playablePlayerCells[i].classList.add('occupied')
            el.removeEventListener('click', addShip)
          }
        }

      } else {
        return
      }
    } else if (currShip.orientation === 'vertical') {
      let num = Number(el.id) + ((playerWidth * (currShip.length - 1)))
      if (elId < (playerWidth ** 2) - (playerWidth * (currShip.length - 1))) {
        let clearSpace = 0
        for (let i = Number(el.id); i <= num; i += playerWidth) {
          if (playablePlayerCells[i].classList.contains('occupied')) {
            return
          } else {
            clearSpace++
          }
        }

        if (clearSpace !== currShip.length) {
          return
        } else {
          for (let i = Number(el.id); i <= num; i += playerWidth) {
            playablePlayerCells[i].id = currShip.color
            playablePlayerCells[i].classList.add('occupied')
            el.removeEventListener('click', addShip)
          }
        }
      } else {
        return
      }
    }
  }
})

