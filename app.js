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
const allPlayerCellsIDs = []
const compCells = []
const playableCompCells = []
//* Button Logic
const lengthButtonsArr = Array.from(document.querySelectorAll('.length-butt'))
const colorButtonsArr = Array.from(document.querySelectorAll('.color-butt'))
const startGameButt = document.querySelector('.start-butt')
const lengthDiv = document.querySelector('.length')
const colorDiv = document.querySelector('.color')
const orientationDiv = document.querySelector('.orientation')
const startGameDiv = document.querySelector('.start-game')
const body = document.body
const playersTurn = document.querySelector('.p-turn')
const computersTurn = document.querySelector('.c-turn')
const choosePosition = document.querySelector('.choose-position')
const playAgain = Array.from(document.querySelectorAll('.play-again'))
//* Ship Placement 
const horizontalButt = document.querySelector('.horizontal')
const verticalButt = document.querySelector('.vertical')
const clickBlock = document.querySelector('.click-block')
//* Sections
const buttonSection = document.querySelector('.player')
const winnerSection = document.querySelector('.winner')
const loserSection = document.querySelector('.loser')
//* Audio
const startAudio = document.querySelector('#start-game')
const destroyedAudio = document.querySelector('#destroyed-ship')
const hitAudio = document.querySelector('#hit-ship')
const loseAudio = document.querySelector('#lose-game')
const missAudio = document.querySelector('#miss-ship')
const winAudio = document.querySelector('#win-game')

function init() {
  playerGridGen()
  compGridGen()
  buttonSection.classList.add('show')
  lengthDiv.classList.add('show')
  playerGrid.classList.add('show')
  gridSection.classList.remove('show')
  colorDiv.classList.remove('show')
  orientationDiv.classList.remove('show')
  startGameDiv.classList.remove('show')
  compGrid.classList.remove('show')
  winnerSection.classList.remove('show')
  loserSection.classList.remove('show')
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
      allPlayerCellsIDs.push(Number(div.id))
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
  constructor(name, length, color, orientation) {
    this.name = name,
      this.length = length,
      this.color = color,
      this.orientation = orientation,
      this.position
    this.hitPositions = []
  }
  shipDestroyed() {
    if (this.hitPositions.length === this.length) {
      destroyedAudio.play()
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
      return this.position.forEach((el) => allPlayerCells[el].id = 'destroyed-' + this.color)
    } else {
      return false
    }
  }
}
const ship1 = new playerShips('ship1')
const ship2 = new playerShips('ship2')
const ship3 = new playerShips('ship3')
const ship4 = new playerShips('ship4')
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
            randomCellHor = this.randomCell()
          } else {
            for (let i = randomCellHor; i < num; i++) {
              // playableCompCells[i].id = this.color //! USE THIS FOR DEBUGGING COMPUTER GRID
              playableCompCells[i].classList.add('occupied')
              playableCompCells[i].classList.add(`ship${this.length}`)
            }

            for (let i = randomCellHor; i < (randomCellHor + this.length); i++) {
              positionArr.push(i)
            }
            notPlacedHor = false
          }
        } else {
          randomCellHor = this.randomCell()
        }
      }

      return this.position = positionArr


    } else if (this.orientation === 'vertical') {
      let notPlacedVirt = true
      let positionArr = []
      while (notPlacedVirt) {
        let randomCellVirt = this.randomCell()
        let num = randomCellVirt + ((playerWidth * (this.length - 1)))

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
            randomCellVirt = this.randomCell()
          } else {
            for (let i = randomCellVirt; i <= num; i += playerWidth) {
              // playableCompCells[i].id = this.color //! USE THIS FOR DEBUGGING COMPUTER GRID
              playableCompCells[i].classList.add('occupied')
              playableCompCells[i].classList.add(`ship${this.length}`)
            }

            for (let i = randomCellVirt; i < (randomCellVirt + (this.length * playerWidth)); i += playerWidth) {
              positionArr.push(i)
            }
            notPlacedVirt = false
          }
        } else {
          randomCellVirt = this.randomCell()
        }
      }
      return this.position = positionArr
    }
  }
  shipDestroyed() {
    if (this.hitPositions.length === this.length) {
      destroyedAudio.play()
      destroyedCompArr.push(this.length)
      return this.position.forEach((el) => playableCompCells[el].id = 'destroyed-' + this.color)
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

startGameButt.addEventListener('click', () => {
  startGame()
  buttonSection.classList.remove('show')
})

playAgain.forEach((el) => {
  el.addEventListener('click', () => {
    window.location.reload()
  })
})



//* ********** PLAYER SHIP PLACEMENT **********
horizontalButt.addEventListener('click', () => {
  currShip.orientation = 'horizontal'
  orientationDiv.classList.remove('show')
  clickBlock.classList.remove('show-block')
  gridSection.classList.add('show')
  body.classList.add('column')
  choosePosition.classList.add('show')
})

verticalButt.addEventListener('click', () => {
  currShip.orientation = 'vertical'
  orientationDiv.classList.remove('show')
  clickBlock.classList.remove('show-block')
  gridSection.classList.add('show')
  body.classList.add('column')
  choosePosition.classList.add('show')
})


playablePlayerCells.forEach((el) => {
  el.addEventListener('click', addShip)
  function addShip() {
    // currShip.position = Number(el.id)
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
          clickBlock.classList.add('show-block')

          for (let i = Number(el.id); i < num; i++) {
            playablePlayerCells[i].id = currShip.color
            playablePlayerCells[i].classList.add('occupied')
            playablePlayerCells[i].classList.add(`ship${currShip.length}`)
          }

          currShip.position = []
          for (let i = elId; i < (elId + currShip.length); i++) {
            currShip.position.push(i)
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
          clickBlock.classList.add('show-block')
          for (let i = Number(el.id); i <= num; i += playerWidth) {
            playablePlayerCells[i].id = currShip.color
            playablePlayerCells[i].classList.add('occupied')
            playablePlayerCells[i].classList.add(`ship${currShip.length}`)
          }
          currShip.position = []

          for (let i = elId; i < (elId + (currShip.length * playerWidth)); i += playerWidth) {
            currShip.position.push(i)
          }
        }
      } else {
        return
      }
    }

    setTimeout(() => {
      choosePosition.classList.remove('show')
      let allTrue = 0
      lengthButtonsArr.forEach((el) => el.classList.contains('selected') ? allTrue++ : true)
      if (allTrue === 4) {
        startGameDiv.classList.add('show')
        gridSection.classList.remove('show')
        body.classList.remove('column')
      } else {
        lengthDiv.classList.add('show')
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

//* ********** START GAME **********

function startGame() {
  gridSection.classList.add('show')
  const players = ['player', 'computer']
  const whoStarts = players[Math.floor(Math.random() * players.length)]
  startAudio.play()
  if (whoStarts === 'player') {
    playerTurn()
  } else {
    computersTurn.classList.add('show')
    setTimeout(() => {
      compTurn()
    }, 3000)
  }
}

function playerTurn() {
  clickBlock.classList.remove('show-block')
  playerGrid.classList.remove('show')
  compGrid.classList.add('show')
  playersTurn.classList.add('show')
  computersTurn.classList.remove('show')
}

playableCompCells.forEach((el) => {
  el.addEventListener('click', checkIfCompHit)
  function checkIfCompHit() {
    if (el.classList.contains('occupied')) {
      if (el.classList.contains('ship1')) {
        compShip1.hitPositions.push(el.innerHTML)
        if (compShip1.shipDestroyed() === false) {
          el.id = 'hit-' + compShip1.color
          hitAudio.play()
        }
      } else if (el.classList.contains('ship2')) {
        compShip2.hitPositions.push(el.innerHTML)
        if (compShip2.shipDestroyed() === false) {
          el.id = 'hit-' + compShip2.color
          hitAudio.play()
        }
      } else if (el.classList.contains('ship3')) {
        compShip3.hitPositions.push(el.innerHTML)
        if (compShip3.shipDestroyed() === false) {
          el.id = 'hit-' + compShip3.color
          hitAudio.play()
        }
      } else if (el.classList.contains('ship4')) {
        compShip4.hitPositions.push(el.innerHTML)
        if (compShip4.shipDestroyed() === false) {
          el.id = 'hit-' + compShip4.color
          hitAudio.play()
        }
      }
    } else {
      el.id = 'miss'
      missAudio.play()
    }
    if (destroyedCompArr.length === 4) {
      setTimeout(() => {
        winAudio.play()
        gridSection.classList.remove('show')
        winnerSection.classList.add('show')
        body.classList.add('no-image')
      }, 2000)

    } else {
      setTimeout(() => {
        compTurn()

      }, 2000)
    }
    el.removeEventListener('click', checkIfCompHit)
    clickBlock.classList.add('show-block')
  }
})

let lastTurn = null
let lastTurnCell = null
let lastTurnCellID = null
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
let lastHitShip = null

function compTurn() {
  computersTurn.classList.add('show')
  compGrid.classList.remove('show')
  playerGrid.classList.add('show')
  computersTurn.classList.add('show')
  playersTurn.classList.remove('show')

  setTimeout(() => {
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
        firstHitTurnsFilt.splice(randomFirstHitTurn, 1)
        randomFirstHitTurn = Math.floor(Math.random() * firstHitTurnsFilt.length)

        if (firstHitTurnsFilt[randomFirstHitTurn] === 'up') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - playerWidth)
          nextTurns = 'up'
        } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'right') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + 1)
          nextTurns = 'right'
        } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'down') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + playerWidth)
          nextTurns = 'down'
        } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'left') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - 1)
          nextTurns = 'left'
        }

        nextTurnCell = playablePlayerCells[nextTurnInd]
        checkNextCell()
      } else {
        keepGoingThatDirection()
      }
    } else if (lastTurn === 'hit' && lastTurnCell !== firstHitCell &&
      ((lastTurnCellID === 0) || // 0
        (lastTurnCellID === playerWidth - 1) || // 7
        (lastTurnCellID === (playerWidth ** 2) - 1) || // 63
        (lastTurnCellID === (playerWidth ** 2) - playerWidth) || // 56
        (lastTurnCellID % playerWidth === 0 && lastTurnCellID !== 0 && lastTurnCellID !== (playerWidth ** 2) - playerWidth) || // down left side
        (lastTurnCellID > (playerWidth ** 2) - playerWidth && lastTurnCellID < playerWidth ** 2) || // bottom row
        (lastTurnCellID % playerWidth === playerWidth - 1 && lastTurnCellID !== (playerWidth ** 2) - 1 && lastTurnCellID !== playerWidth - 1) || // down right side
        (lastTurnCellID > 0 && lastTurnCellID < playerWidth - 1))) { // top row

      if ((firstHitCellID === 0) || // 0
        (firstHitCellID === playerWidth - 1) || // 7
        (firstHitCellID === (playerWidth ** 2) - 1) || // 63
        (firstHitCellID === (playerWidth ** 2) - playerWidth) || // 56
        (firstHitCellID % playerWidth === 0 && firstHitCellID !== 0 && firstHitCellID !== (playerWidth ** 2) - playerWidth) || // down left side
        (firstHitCellID > (playerWidth ** 2) - playerWidth && firstHitCellID < playerWidth ** 2) || // bottom row
        (firstHitCellID % playerWidth === playerWidth - 1 && firstHitCellID !== (playerWidth ** 2) - 1 && firstHitCellID !== playerWidth - 1) || // down right side
        (firstHitCellID > 0 && firstHitCellID < playerWidth - 1)) {
        keepGoingThatDirection()
      } else {
        if (nextTurns === 'up') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + playerWidth)
          nextTurns = 'down'
        } else if (nextTurns === 'right') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - 1)
          nextTurns = 'left'
        } else if (nextTurns === 'down') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - playerWidth)
          nextTurns = 'up'
        } else if (nextTurns === 'left') {
          nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + 1)
          nextTurns = 'right'
        }

        nextTurnCell = playablePlayerCells[nextTurnInd]
        checkNextCell()
      }

    } else if (lastTurn === 'hit' && lastTurnCell !== firstHitCell) {
      keepGoingThatDirection()
    }

    if (destroyedPlayerArr.length === 4) {
      setTimeout(() => {
        loseAudio.play()
        gridSection.classList.remove('show')
        loserSection.classList.add('show')
        body.classList.add('no-image')
      }, 2000)
    } else {
      nextPlayer()
    }
  }, 1500)
}
function nextPlayer() {
  setTimeout(() => {
    playerTurn()
  }, 2000)
}

function checkNextCell() {
  lastTurnCell = nextTurnCell
  lastTurnCellID = Number(nextTurnCell.innerHTML)
  playablePlayerCells.splice(nextTurnInd, 1)
  playablePlayerCellsIDs.splice(nextTurnInd, 1)
  if (nextTurnCell.classList.contains('ship1')) {
    lastHitShip = ship1
    ship1.hitPositions.push(nextTurnCell.innerHTML)
    if (ship1.shipDestroyed() === false) {
      hitAudio.play()
      nextTurnCell.id = 'hit-' + ship1.color
      lastTurn = 'hit'
      lastHit = Number(nextTurnCell.innerHTML)
      lastHitCell = nextTurnCell
    }
  } else if (nextTurnCell.classList.contains('ship2')) {
    lastHitShip = ship2
    ship2.hitPositions.push(nextTurnCell.innerHTML)
    if (ship2.shipDestroyed() === false) {
      hitAudio.play()
      nextTurnCell.id = 'hit-' + ship2.color
      lastTurn = 'hit'
      lastHit = Number(nextTurnCell.innerHTML)
      lastHitCell = nextTurnCell
    }
  } else if (nextTurnCell.classList.contains('ship3')) {
    lastHitShip = ship3
    ship3.hitPositions.push(nextTurnCell.innerHTML)
    if (ship3.shipDestroyed() === false) {
      hitAudio.play()
      nextTurnCell.id = 'hit-' + ship3.color
      lastTurn = 'hit'
      lastHit = Number(nextTurnCell.innerHTML)
      lastHitCell = nextTurnCell
    }
  } else if (nextTurnCell.classList.contains('ship4')) {
    lastHitShip = ship4
    ship4.hitPositions.push(nextTurnCell.innerHTML)
    if (ship4.shipDestroyed() === false) {
      hitAudio.play()
      nextTurnCell.id = 'hit-' + ship4.color
      lastTurn = 'hit'
      lastHit = Number(nextTurnCell.innerHTML)
      lastHitCell = nextTurnCell
    }
  } else {
    missAudio.play()
    nextTurnCell.id = 'miss'
    lastTurn = 'miss'
  }
}

function nextToFirstHitCell() {

  if (firstHitCellID === 0) { // 0
    firstHitTurns.push('right', 'down')
  } else if (firstHitCellID % playerWidth === 0 && firstHitCellID !== 0 && firstHitCellID !== (playerWidth ** 2) - playerWidth) { // down left side
    firstHitTurns.push('up', 'right', 'down')
  } else if (firstHitCellID === (playerWidth ** 2) - playerWidth) { // 56
    firstHitTurns.push('up', 'right')
  } else if (firstHitCellID > (playerWidth ** 2) - playerWidth && firstHitCellID < playerWidth ** 2) { // bottom row
    firstHitTurns.push('up', 'right', 'left')
  } else if (firstHitCellID === (playerWidth ** 2) - 1) { // 63
    firstHitTurns.push('up', 'left')
  } else if (firstHitCellID % playerWidth === playerWidth - 1 && firstHitCellID !== (playerWidth ** 2) - 1 && firstHitCellID !== playerWidth - 1) { // down right side
    firstHitTurns.push('up', 'down', 'left')
  } else if (firstHitCellID === playerWidth - 1) { // 7
    firstHitTurns.push('down', 'left')
  } else if (firstHitCellID > 0 && firstHitCellID < playerWidth - 1) { // top row
    firstHitTurns.push('right', 'down', 'left')
  } else { // everything else
    firstHitTurns.push('up', 'right', 'down', 'left')
  }

  firstHitTurns.forEach((el, ind, arr) => {
    if (el === 'up') {
      if (playablePlayerCellsIDs.includes(firstHitCellID - playerWidth)) {
        return
      } else {
        let upCellInd = playablePlayerCellsIDs.indexOf(firstHitCellID - playerWidth)
        let upCell = playablePlayerCells[upCellInd]
        if (upCell.id === 'hit-' + lastHitShip.color) {
          arr[ind] = 'upCellHit'
        } else {
          arr[ind] = 'thisCellHasBeenTaken'
        }
      }
    } else if (el === 'right') {
      if (playablePlayerCellsIDs.includes(firstHitCellID + 1)) {
        return
      } else {
        let rightCellInd = allPlayerCellsIDs.indexOf(firstHitCellID + 1)
        let rightCell = allPlayerCells[rightCellInd]
        if (rightCell.id === 'hit-' + lastHitShip.color) {
          arr[ind] = 'rightCellHit'
        } else {
          arr[ind] = 'thisCellHasBeenTaken'
        }
      }
    } else if (el === 'down') {
      if (playablePlayerCellsIDs.includes(firstHitCellID + playerWidth)) {
        return
      } else {
        let downCellInd = allPlayerCellsIDs.indexOf(firstHitCellID + playerWidth)
        let downCell = allPlayerCells[downCellInd]
        if (downCell.id === 'hit-' + lastHitShip.color) {
          arr[ind] = 'downCellHit'
        } else {
          arr[ind] = 'thisCellHasBeenTaken'
        }
      }
    } else if (el === 'left') {
      if (playablePlayerCellsIDs.includes(firstHitCellID - 1)) {
        return
      } else {
        let leftCellInd = playablePlayerCellsIDs.indexOf(firstHitCellID - 1)
        let leftCell = playablePlayerCells[leftCellInd]
        if (leftCell.id === 'hit-' + lastHitShip.color) {
          arr[ind] = 'leftCellHit'
        } else {
          arr[ind] = 'thisCellHasBeenTaken'
        }
      }
    }
  })

  firstHitTurnsFilt = firstHitTurns.filter(el => el.length < 13)
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
  } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'upCellHit') {
    nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - (playerWidth * 2))
  } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'rightCellHit') {
    nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + 2)
  } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'downCellHit') {
    nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + (playerWidth * 2))
  } else if (firstHitTurnsFilt[randomFirstHitTurn] === 'leftCellHit') {
    nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - 2)
  }

  nextTurns = firstHitTurnsFilt[randomFirstHitTurn]
  nextTurnCell = playablePlayerCells[nextTurnInd]

  checkNextCell()
}

function keepGoingThatDirection() {
  lastTurnCellID = Number(lastTurnCell.innerHTML)

  if (lastTurnCell.classList.contains(lastHitShip.name)) {
    if (nextTurns === 'up') {
      if (lastTurn === 'hit') {
        nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID - playerWidth)
      } else {
        nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + playerWidth)
        nextTurns = 'down'
      }
    } else if (nextTurns === 'right') {
      if (lastTurn === 'hit') {
        nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID + 1)
      } else {
        nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - 1)
        nextTurns = 'left'
      }
    } else if (nextTurns === 'down') {
      if (lastTurn === 'hit') {
        nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID + playerWidth)
      } else {
        nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID - playerWidth)
        nextTurns = 'up'
      }
    } else if (nextTurns === 'left') {
      if (lastTurn === 'hit') {
        nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID - 1)
      } else {
        nextTurnInd = playablePlayerCellsIDs.indexOf(firstHitCellID + 1)
        nextTurns = 'right'
      }
    }
    nextTurnCell = playablePlayerCells[nextTurnInd]

    if (nextTurnCell.id === 'hit-' + lastHitShip.color) {
      if (nextTurns === 'up') {
        nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID - (playerWidth * 2))
      } else if (nextTurns === 'right') {
        nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID + 2)
      } else if (nextTurns === 'down') {
        nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID + (playerWidth * 2))
      } else if (nextTurns === 'left') {
        nextTurnInd = playablePlayerCellsIDs.indexOf(lastTurnCellID - 2)
      }
      nextTurnCell = playablePlayerCells[nextTurnInd]
    } else {
      checkNextCell()
    }
  } else {
    nextToFirstHitCell()
  }
}