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
//* Sections
const buttonSection = document.querySelector('.player')

function init() {
  playerGridGen()
  compGridGen()
  buttonSection.classList.add('show')
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
  constructor(length, color, orientation) {
    this.length = length,
      this.color = color,
      this.orientation = orientation,
      this.position,
      this.hitPositions = []
  }
  shipDestroyed() {
    if (this.hitPositions.length === this.length) {
      destroyedPlayerArr.push(this.length)
      return this.position.forEach((el) => playablePlayerCells[el].id = 'destroyed')
    } else {
      return false
    }
  }
}
const ship1 = new playerShips()
const ship2 = new playerShips()
const ship3 = new playerShips()
const ship4 = new playerShips()
const destroyedPlayerArr = []

let colorArr = ['red', 'pink', 'black', 'brown', 'blue', 'orange', 'cyan', 'green']
class compShips {
  constructor(length) {
    this.length = length,
      this.color = this.randomColor(),
      this.orientation = this.randomOrientation(),
      this.position = this.randomPosition()
    this.hitPositions = []
  }
  randomColor() {
    let randomNum = Math.floor(Math.random() * colorArr.length)
    let color = colorArr[randomNum]
    colorArr.splice(randomNum, 1)
    return color
  }
  randomOrientation() {
    let orientationArr = ['horizontal', 'vertical']
    let randomNum = Math.floor(Math.random() * orientationArr.length)
    let orientation = orientationArr[randomNum]
    return orientation
  }
  randomCell() {
    return Math.floor(Math.random() * playableCompCells.length)
  }
  randomPosition() {
    if (this.orientation === 'horizontal') {
      let notPlacedHor = true
      let positionArr = []
      while (notPlacedHor) {
        let randomCellHor = this.randomCell()
        let num = randomCellHor + this.length
        // console.log(`${this.length} is trying cell ${randomCellHor}`)
        if ((randomCellHor % playerWidth <= playerWidth - this.length)) {
          let clearSpace = 0
          for (let i = randomCellHor; i < num; i++) {
            if (playableCompCells[i].classList.contains('occupied')) {
              clearSpace--
            } else {
              clearSpace++
            }
          }

          if (clearSpace !== this.length) {
            return
          } else {
            for (let i = randomCellHor; i < num; i++) {
              // playableCompCells[i].id = this.color //! USE THIS FOR DEBUGGING COMPUTER GRID
              playableCompCells[i].classList.add('occupied')
              playableCompCells[i].classList.add(`ship${this.length}`)
            }
            notPlacedHor = false

            for (let i = randomCellHor; i < (randomCellHor + this.length); i++) {
              positionArr.push(i)
            }
          }
        } else {
          // console.log(`${this.length} is rolling again, failed cell: ${randomCellHor}`)
          randomCellHor = this.randomCell()
        }
      }

      return this.position = positionArr
      // console.log(this.position)

    } else if (this.orientation === 'vertical') {
      let notPlacedVirt = true
      let positionArr = []
      while (notPlacedVirt) {
        let randomCellVirt = this.randomCell()
        let num = randomCellVirt + ((playerWidth * (this.length - 1)))
        // console.log(`${this.length} is trying cell ${randomCellVirt}`)

        if (randomCellVirt < (playerWidth ** 2) - (playerWidth * (this.length - 1))) {
          let clearSpace = 0
          for (let i = randomCellVirt; i <= num; i += playerWidth) {
            if (playableCompCells[i].classList.contains('occupied')) {
              clearSpace--
            } else {
              clearSpace++
            }
          }

          if (clearSpace !== this.length) {
            return
          } else {
            for (let i = randomCellVirt; i <= num; i += playerWidth) {
              // playableCompCells[i].id = this.color //! USE THIS FOR DEBUGGING COMPUTER GRID
              playableCompCells[i].classList.add('occupied')
              playableCompCells[i].classList.add(`ship${this.length}`)
            }
            notPlacedVirt = false
            this.position = []

            for (let i = randomCellVirt; i < (randomCellVirt + (this.length * playerWidth)); i += playerWidth) {
              positionArr.push(i)
            }
            // console.log(this.position)
          }
        } else {
          // console.log(`${this.length} is rolling again, failed cell: ${randomCellVirt}`)
          randomCellVirt = this.randomCell()
        }
      }
      return this.position = positionArr
      // console.log(this.position)
    }
  }
  shipDestroyed() {
    if (this.hitPositions.length === this.length) {
      destroyedCompArr.push(this.length)
      return this.position.forEach((el) => playableCompCells[el].id = 'destroyed')
    } else {
      return false
    }
  }
}

const destroyedCompArr = []

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
})

startGameButt.addEventListener('click', () => {
  startGame()
  buttonSection.classList.remove('show')
})


//* ********** PLAYER SHIP PLACEMENT **********
horizontalButt.addEventListener('click', () => {
  currShip.orientation = 'horizontal'
})

verticalButt.addEventListener('click', () => {
  currShip.orientation = 'vertical'
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
            playablePlayerCells[i].classList.add(`ship${currShip.length}`)
            el.removeEventListener('click', addShip)
          }

          currShip.position = []
          for (let i = elId; i < (elId + currShip.length); i++) {
            currShip.position.push(i)
          }
          // console.log(currShip.position)
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
            playablePlayerCells[i].classList.add(`ship${currShip.length}`)
            el.removeEventListener('click', addShip)
          }

          currShip.position = []

          for (let i = elId; i < (elId + (currShip.length * playerWidth)); i += playerWidth) {
            currShip.position.push(i)
          }
          // console.log(currShip.position)
        }
      } else {
        return
      }
    }
  }
})


//* ********** COMPUTER SHIP GENERATION **********


const compShip1 = new compShips(1)
const compShip2 = new compShips(2)
const compShip3 = new compShips(3)
const compShip4 = new compShips(4)
// console.log(compShip1)
// console.log(compShip2)
// console.log(compShip3)
// console.log(compShip4) //! COMPUTER GRID DEBUGGING



//* ********** START GAME **********

function startGame() {
  const players = ['player', 'computer']
  const whoStarts = players[Math.floor(Math.random() * players.length)]
  if (whoStarts === 'player') {
    playerTurn()
  } else {
    compTurn()
  }

}

function playerTurn() {
  playerGrid.classList.remove('show')
  compGrid.classList.add('show')
}

playableCompCells.forEach((el) => {
  el.addEventListener('click', checkIfCompHit)
  function checkIfCompHit() {
    if (el.classList.contains('occupied')) {
      if (el.classList.contains('ship1')) {
        compShip1.hitPositions.push(el.innerHTML)
        if (compShip1.shipDestroyed() === false) {
          el.id = 'hit'
        }
      } else if (el.classList.contains('ship2')) {
        compShip2.hitPositions.push(el.innerHTML)
        if (compShip2.shipDestroyed() === false) {
          el.id = 'hit'
        }
      } else if (el.classList.contains('ship3')) {
        compShip3.hitPositions.push(el.innerHTML)
        if (compShip3.shipDestroyed() === false) {
          el.id = 'hit'
        }
      } else if (el.classList.contains('ship4')) {
        compShip4.hitPositions.push(el.innerHTML)
        if (compShip4.shipDestroyed() === false) {
          el.id = 'hit'
        }
      }
    } else {
      el.id = 'miss'
    }
    console.log(destroyedCompArr)
    if (destroyedCompArr.length === 4) {
      console.log('YOU WIN')
    } else {
      setTimeout(() => {
        compTurn()
      }, 1000)
    }
    el.removeEventListener('click', checkIfCompHit)
  }
})

function compTurn() {
  compGrid.classList.remove('show')
  playerGrid.classList.add('show')

  setTimeout(() => {
    const randomNum = Math.floor(Math.random() * playablePlayerCells.length)
    const randomCell = playablePlayerCells[randomNum]
    console.log('hi')
    

    if (randomCell.classList.contains('occupied')) {
      if (randomCell.classList.contains('ship1')) {
        ship1.hitPositions.push(randomCell.innerHTML)
        if (ship1.shipDestroyed() === false) {
          randomCell.id = 'hit'
        }
      } else if (randomCell.classList.contains('ship2')) {
        ship2.hitPositions.push(randomCell.innerHTML)
        if (ship2.shipDestroyed() === false) {
          randomCell.id = 'hit'
        }
      } else if (randomCell.classList.contains('ship3')) {
        ship3.hitPositions.push(randomCell.innerHTML)
        if (ship3.shipDestroyed() === false) {
          randomCell.id = 'hit'
        }
      } else if (randomCell.classList.contains('ship4')) {
        ship4.hitPositions.push(randomCell.innerHTML)
        if (ship4.shipDestroyed() === false) {
          randomCell.id = 'hit'
        }
      }
    } else {
      randomCell.id = 'miss'
    }
    console.log(destroyedPlayerArr)

    if (destroyedPlayerArr.length === 4) {
      console.log('YOU LOSE')
    } else {
      nextTurn()
    }
    playablePlayerCells.splice(randomNum, 1)
  }, 1000)

}
function nextTurn() {
  setTimeout(() => {
    playerTurn()
  }, 2000)
}