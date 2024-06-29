/*
@title: Slap-a-Fish
@author: Ben Park
@tags: []
@addedOn: 2024-6-28
*/

//My High Score: --
let worldRecord = 5
//Above score set by: @--
//message me in the sprig slack channel if you beat a high score @Ben Park
//the world record will probably not be updated in GitHub unless it is really big

//define constants and variables
const water1 = "w"
const water2 = "W"
const hole = "h"
const fish = "f"
const rareFish = "F"
const heart1 = "1"
const heart2 = "2"
const heart3 = "3"
const diagram1 = "d"
const diagram2 = "i"
const diagram3 = "a"
const diagram4 = "g"
let highScore = 0
let currentScore = 0
let lives = 4
let livesSprite = "heart3"
let GAME_STATE = "menu"
setLegend(
  [ water1, bitmap`
5555555555555555
5555555555555555
5555557555555555
5577775755555555
5575555577555555
5775555557755555
7555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555577555
5555555577777775
5555555775555577
5555555555555555
5555555555555555
5555555555555555`],
  [ water2, bitmap`
5555555555555555
5555555557777755
5555555577555755
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5557775555555555
5577577755555555
5775555755555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ hole, bitmap`
5555555555555555
5555777557555555
5577555555575555
5555777777755555
5577755577777755
5777555555557755
5555000000005575
7750000000000575
5750000000000575
5555000000005555
5575555555555555
5557775557777555
5575577755555555
5557555557777755
5555777777555555
5555555555555555`],
  [ fish, bitmap`
5555555555555555
5555555755555555
5555557557111555
5557757571101155
557577221L111155
5577722111L11155
5577721111177555
5571111121757555
5752177277775555
5755771777575555
5757771755777555
5557757755777555
5555555557775555
5555555555555555
5555555555555555
5555555555555555`],
  [ rareFish, bitmap`
5555555555555555
5555555755555555
5555557557666555
5557757576606655
557577226F666655
5577722666F66655
5577726666677555
5526666626757555
5752667277775555
5755266777575555
5757776755777555
5557757755777555
5555555557775555
5555555555555555
5555555555555555
5555555555555555`],
  [ heart1, bitmap`
5555555555555555
5555555555777777
5555555557555555
5535355555555555
5333335555555555
5533355555555555
5553555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5777775555555555
5755557555555555
5555555555555555
5555555555555555`],
  [ heart2, bitmap`
5555555555555555
5555555555777777
5555555557555555
5535355555555555
5333335555555555
5533355555555555
5553555555555555
5555553535555555
5555533333555555
5555553335555555
5555555355555555
5555555555555555
5777775555555555
5755557555555555
5555555555555555
5555555555555555`],
  [ heart3, bitmap`
5555555555555555
5555555555777777
5555555557555555
5535355555535355
5333335555333335
5533355555533355
5553555555553555
5555553535555555
5555533333555555
5555553335555555
5555555355555555
5555555555555555
5777775555555555
5755557555555555
5555555555555555
5555555555555555`],
  [ diagram1, bitmap`
................
..LLLLLLLLLLLLLL
.LL.............
.L..............
.L.........00000
.L...33....00000
.L...33....00000
.L.77..44..00000
.L.77..44..00000
.L...66....00000
.L...66....00000
.L.........00000
.L..............
.LL.............
..LLLLLLLLLLLLLL
................`],
  [ diagram2, bitmap`
................
LLLLLLLLLLLLLL..
.............LL.
..............L.
00000.........L.
00000....55...L.
00000....55...L.
00000..99..88.L.
00000..99..88.L.
00000....DD...L.
00000....DD...L.
00000.........L.
..............L.
.............LL.
LLLLLLLLLLLLLL..
................`],
  [ diagram3, bitmap`
................
................
............3333
............3333
............3333
............3333
........77779999
........77779999
........77779999
........77779999
............6666
............6666
............6666
............6666
................
................`],
  [diagram4, bitmap`
................
................
5555............
5555............
5555............
5555............
44448888........
44448888........
44448888........
44448888........
DDDD............
DDDD............
DDDD............
DDDD............
................
................`],
)

//define levels

let level = 0
const levels = [
  map`
......
..di..
..ag..
......`,
  map`
wWwWwW
WwhhWw
whhhhW
WwhhWw
3WwWwW`,
  map`
FFFFF
.....
.....
FFFFF`,
]

//function to set up start menu

let fishInterval

function goToMenu(){
  clearInterval(fishInterval)
  clearText()
  GAME_STATE = "menu"
  if(highScore >= worldRecord){
    setMap(levels[2])
    addText("New World Record!!", {
      x: 1,
      y: 4,
      color: color`3`
    })
    addText("Message Me in #Sprig", {
      x: 0,
      y: 6,
      color: color`3`
    })
    addText("Have pic evidence", {
      x: 2,
      y: 10,
      color: color`3`
    })
    addText("@Ben Park", {
      x: 5,
      y: 8,
      color: color`6`
    })
    addText("'l' to restart", {
      x: 3,
      y: 11,
      color: color`0`
    })
  } else{
setMap(levels[0])
addText("Slap-a-Fish", {
  x: 5,
  y: 2,
  color: color`5`
})
addText("Controls:", {
  x: 1,
  y: 3,
  color: color`0`
})
addText("Press 'l' to start", {
  x: 1,
  y: 13,
  color: color`1`
})
addText("High Score: " + highScore, {
  x: 1,
  y: 12,
  color: color`0`
})
}
}
goToMenu()

//replace tile function
function replaceTile(x,y,type){
  clearTile(x,y)
  addSprite(x,y,type)
}

//setting up game logic for each key
function updateScore(){
  clearText()
  if(currentScore >> highScore){
    highScore =  currentScore
  }
    addText("Score: " + currentScore, {
    x: 1,
    y: 1,
    color: color`2`
  })
    addText("High Score: " + highScore, {
    x: 4,
    y: 14,
    color: color`6`
  })
}
function logic(key, x, y){
  onInput(key, () =>{
    if(GAME_STATE == "playing"){
      if(getAll(fish).x == x && getAll(fish).y == y){
        currentScore += 1
        updateScore()
      } else if(getAll(rareFish).x == x && getAlll(fish).y == y){
        currentScore += 5
        updateScore()
      } else {
        lives -= 1
        if(lives == 2){
          livesSprite = "2"
        }else if (lives == 1){
          livesSprite = "1"
        }
        replaceTile(0,4,livesSprite)
        if(lives == 0){
          goToMenu()
        }
      }
    }
  })
}

//starting the game (yay)

function placeFish() {
  let holes = getAll(hole)
  let randomIndex = Math.floor(Math.random() * holes.length);
  let randomTile = holes[randomIndex];
  let rareFishChance = Math.random() < 0.1
  replaceTile(randomTile.x, randomTile.y, rareFishChance ? rareFish : fish)
  setTimeout(() => {
      replaceTile(randomTile.x, randomTile.y, hole);
    }, 1500);
}

//starting game on l input


onInput("l", () => {
  if(GAME_STATE == "menu"){
    GAME_STATE = "playing"
    clearText()
    updateScore()
    level = 1
    currentScore = 0
    lives = 3
    setMap(levels[level])
    fishInterval = setInterval(placeFish, 2000)
  }
})

//using game logic function

logic("a",1,2)
logic("w",2,1)
logic("s",2,3)
logic("d",3,2)
logic("j",2,2)
logic("i",3,1)
logic("k",3,3)
logic("l",4,2)
