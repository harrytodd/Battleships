//* Grid Generator
const gridSection = document.querySelector('.grids')
const playerGrid = document.querySelector('.player-grid')
const compGrid = document.querySelector('.comp-grid')
const width = 10
const playerWidth = width - 2
const playerCells = []
const playablePlayerCells = []
const playablePlayerCellsIDs = []
const allPlayerCells = []
const compCells = []
const playableCompCells = []
//* Button Logic
const lengthButtonsArr = Array.from(document.querySelectorAll('.length-butt'))
const colorButtonsArr = Array.from(document.querySelectorAll('.color-butt'))
const confirmPlaceButt = document.querySelector('.confirm')
const startGameButt = document.querySelector('.start-butt')
const lengthDiv = document.querySelector('.length')
const colorDiv = document.querySelector('.color')
const orientationDiv = document.querySelector('.orientation')
const placeShipDiv = document.querySelector('.place-ship')
const startGameDiv = document.querySelector('.start-game')
const body = document.body
//* Ship Placement 
const horizontalButt = document.querySelector('.horizontal')
const verticalButt = document.querySelector('.vertical')
//* Sections
const buttonSection = document.querySelector('.player')

function init() {
  playerGridGen()
  compGridGen()
  buttonSection.classList.add('show')
  lengthDiv.classList.add('show')
  playerGrid.classList.add('show')
  gridSection.classList.remove('show')
  colorDiv.classList.remove('show')
  orientationDiv.classList.remove('show')
  placeShipDiv.classList.remove('show')
  startGameDiv.classList.remove('show')
  compGrid.classList.remove('show')
  console.log(horizontalButt)
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
      allPlayerCells.push(div)
      playablePlayerCellsIDs.push(Number(div.id))
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
      this.position
    this.hitPositions = []
  }
  shipDestroyed() {
    if (this.hitPositions.length === this.length) {
      lastTurn = null
      lastTurnCell = null
      lastHit = null
      lastHitCell = null
      firstHitCell = null
      firstHitCellID = null
      randomFirstHitTurn
      firstHitTurns = []
      firstHitTurnsFilt = []
      nextTurns = null
      nextTurnCell = 0 // HTML cell
      nextTurnInd = null
      destroyedPlayerArr.push(this.length)
      return this.position.forEach((el) => allPlayerCells[el].id = 'destroyed')
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
    orientationDiv.classList.add('show')
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
  orientationDiv.classList.remove('show')
  placeShipDiv.classList.add('show')
  gridSection.classList.add('show')
  body.classList.add('column')
})

verticalButt.addEventListener('click', () => {
  currShip.orientation = 'vertical'
  orientationDiv.classList.remove('show')
  placeShipDiv.classList.add('show')
  gridSection.classList.add('show')
  body.classList.add('column')
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
    setTimeout(() => {
      let allTrue = 0
      lengthButtonsArr.forEach((el) => el.classList.contains('selected') ? allTrue++ : true)
      if (allTrue === 4) {
        startGameDiv.classList.add('show')
        placeShipDiv.classList.remove('show')
        gridSection.classList.remove('show')
        body.classList.remove('column')
      } else {
        lengthDiv.classList.add('show')
        placeShipDiv.classList.remove('show')
        gridSection.classList.remove('show')
        body.classList.remove('column')
      }
    }, 1000)

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

let lastTurn = null
let lastTurnCell = null
let lastHit = null
let lastHitCell = null
let firstHitCell = null
let firstHitCellID = null
let randomFirstHitTurn
let firstHitTurns = []
let firstHitTurnsFilt = []
let nextTurns = null
let nextTurnCell = 0 // HTML cell
let nextTurnInd = null

function compTurn() {
  compGrid.classList.remove('show')
  playerGrid.classList.add('show')

  setTimeout(() => {

    console.log(nextTurns)
    if (lastTurnCell === null || (lastTurn === 'miss' && firstHitCell === null)) {
      const randomNum = Math.floor(Math.random() * playablePlayerCells.length)
      nextTurnInd = randomNum
      const randomCell = playablePlayerCells[randomNum]
      nextTurnCell = randomCell
      checkNextCell()
    } else if (lastTurn === 'hit' && firstHitCell === null) {
      firstHitCell = lastTurnCell
      firstHitCellID = Number(firstHitCell.innerHTML)
      nextToFirstHitCell()
    } else if (lastTurn === 'miss' && firstHitCell !== null) {
      if (lastHitCell === firstHitCell) {
        console.log('last cell is first cell ' + firstHitTurnsFilt)
        firstHitTurnsFilt.splice(randomFirstHitTurn, 1)
        console.log('after splice ' + firstHitTurnsFilt)
        randomFirstHitTurn = Math.floor(Math.random() * firstHitTurnsFilt.length)
        console.log(firstHitTurnsFilt[randomFirstHitTurn])

        if (firstHitTurnsFilt[randomFirstHitTurn] === 'up') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - playerWidth)
          nextTurns = 'up'
          console.log('up')
        } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'right') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + 1)
          nextTurns = 'right'
          console.log('right')
        } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'down') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + playerWidth)
          nextTurns = 'down'
          console.log('down')
        } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'left') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - 1)
          nextTurns = 'left'
          console.log('left')
        }

        nextTurnCell = playablePlayerCells[nextTurnInd]
        console.log(nextTurnCell.innerHTML)
        checkNextCell()
      } else {
        keepGoingThatDirection()
      }
    } else if (lastTurn === 'hit' && lastTurnCell !== firstHitCell) {
      keepGoingThatDirection()
    }

    if (destroyedPlayerArr.length === 4) {
      console.log('YOU LOSE')
    } else {
      nextPlayer()
    }
  }, 1000)
}
function nextPlayer() {
  setTimeout(() => {
    playerTurn()
  }, 2000)
}

function checkNextCell() {
  lastTurnCell = nextTurnCell
  playablePlayerCells.splice(nextTurnInd, 1)
  playablePlayerCellsIDs.splice(nextTurnInd, 1)
  // console.log('lastTurnCell: ' + lastTurnCell.innerHTML + ' ===== nextTurnCell: ' + nextTurnCell.innerHTML)
  if (nextTurnCell.classList.contains('ship1')) {
    ship1.hitPositions.push(nextTurnCell.innerHTML)
    if (ship1.shipDestroyed() === false) {
      nextTurnCell.id = 'hit'
      lastTurn = 'hit'
      lastHit = Number(nextTurnCell.innerHTML)
      lastHitCell = nextTurnCell
    }
  } else if (nextTurnCell.classList.contains('ship2')) {
    ship2.hitPositions.push(nextTurnCell.innerHTML)
    if (ship2.shipDestroyed() === false) {
      nextTurnCell.id = 'hit'
      lastTurn = 'hit'
      lastHit = Number(nextTurnCell.innerHTML)
      lastHitCell = nextTurnCell
    }
  } else if (nextTurnCell.classList.contains('ship3')) {
    ship3.hitPositions.push(nextTurnCell.innerHTML)
    if (ship3.shipDestroyed() === false) {
      nextTurnCell.id = 'hit'
      lastTurn = 'hit'
      lastHit = Number(nextTurnCell.innerHTML)
      lastHitCell = nextTurnCell
    }
  } else if (nextTurnCell.classList.contains('ship4')) {
    ship4.hitPositions.push(nextTurnCell.innerHTML)
    if (ship4.shipDestroyed() === false) {
      nextTurnCell.id = 'hit'
      lastTurn = 'hit'
      lastHit = Number(nextTurnCell.innerHTML)
      lastHitCell = nextTurnCell
    }
  } else {
    nextTurnCell.id = 'miss'
    lastTurn = 'miss'
  }
}

function nextToFirstHitCell() {

  if (firstHitCellID === 0) { // 0
    firstHitTurns.push('right', 'down')
    console.log('0')
  } else if (firstHitCellID % playerWidth === 0 && firstHitCellID !== 0 && firstHitCellID !== (playerWidth ** 2) - playerWidth) { // down left side
    firstHitTurns.push('up', 'right', 'down')
    console.log('down left side')
  } else if (firstHitCellID === (playerWidth ** 2) - playerWidth) { // 56
    firstHitTurns.push('up', 'right')
    console.log('56')
  } else if (firstHitCellID > (playerWidth ** 2) - playerWidth && firstHitCellID < playerWidth ** 2) { // bottom row
    firstHitTurns.push('up', 'right', 'left')
    console.log('bottom row')
  } else if (firstHitCellID === (playerWidth ** 2) - 1) { // 63
    firstHitTurns.push('up', 'left')
    console.log('63')
  } else if (firstHitCellID % playerWidth === playerWidth - 1 && firstHitCellID !== (playerWidth ** 2) - 1 && firstHitCellID !== playerWidth - 1) { // down right side
    firstHitTurns.push('up', 'down', 'left')
    console.log('down right side')
  } else if (firstHitCellID === playerWidth - 1) { // 7
    firstHitTurns.push('down', 'left')
    console.log('7')
  } else if (firstHitCellID > 0 && firstHitCellID < playerWidth - 1) { // top row
    firstHitTurns.push('right', 'down', 'left')
    console.log('top row')
  } else { // everything else
    firstHitTurns.push('up', 'right', 'down', 'left')
    console.log('middle')
  }

  console.log(firstHitTurns)
  firstHitTurns.forEach((el, ind, arr) => {
    if (el === 'up') {
      if (playablePlayerCellsIDs.includes(firstHitCellID - playerWidth)) {
        return
      } else {
        console.log(el + ' is not available')
        arr[ind] = 'occupied'
      }
    } else if (el === 'right') {
      if (playablePlayerCellsIDs.includes(firstHitCellID + 1)) {
        return
      } else {
        console.log(el + ' is not available')
        arr[ind] = 'occupied'
      }
    } else if (el === 'down') {
      if (playablePlayerCellsIDs.includes(firstHitCellID + playerWidth)) {
        return
      } else {
        console.log(el + ' is not available')
        arr[ind] = 'occupied'
      }
    } else if (el === 'left') {
      if (playablePlayerCellsIDs.includes(firstHitCellID - 1)) {
        return
      } else {
        console.log(el + ' is not available')
        arr[ind] = 'occupied'
      }
    }
  })
  console.log(firstHitTurns)

  firstHitTurnsFilt = firstHitTurns.filter(el => el.length < 7)

  console.log(firstHitTurnsFilt)

  randomFirstHitTurn = Math.floor(Math.random() * firstHitTurnsFilt.length)
  if (firstHitTurnsFilt[randomFirstHitTurn] === 'up') {
    nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - playerWidth)
  } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'right') {
    nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + 1)
  } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'down') {
    nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + playerWidth)
  } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'left') {
    nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - 1)
  }
  nextTurns = firstHitTurnsFilt[randomFirstHitTurn]
  nextTurnCell = playablePlayerCells[nextTurnInd]
  checkNextCell()
}

function keepGoingThatDirection() {
  console.log('keep going')
  let lastTurnCellID = Number(lastTurnCell.innerHTML)
  if (nextTurns === 'up') {
    if (lastTurn === 'hit') {
      nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID - playerWidth)
      console.log('keep going up')
    } else {
      nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + playerWidth)
      nextTurns = 'down'
      console.log('cant go up so go down from first')
    }
  } else if (nextTurns === 'right') {
    if (lastTurn === 'hit') {
      nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID + 1)
      console.log('keep going right')
    } else {
      nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - 1)
      nextTurns = 'left'
      console.log('cant go right so go left from first')
    }
  } else if (nextTurns === 'down') {
    if (lastTurn === 'hit') {
      nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID + playerWidth)
      console.log('keep going down')
    } else {
      nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - playerWidth)
      nextTurns = 'up'
      console.log('cant go down so go up from first')
    }
  } else if (nextTurns === 'left') {
    if (lastTurn === 'hit') {
      nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID - 1)
      console.log('keep going left')
    } else {
      nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + 1)
      nextTurns = 'right'
      console.log('cant go left so go right from first')
    }
  }

  nextTurnCell = playablePlayerCells[nextTurnInd]

  checkNextCell()
}