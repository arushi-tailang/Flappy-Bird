import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';

import Bird from './components/Bird'
import Obstacles from './components/Obstacles'



export default function App() {

  //getting the screen width and screen height no matter what mobile phone you are on
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom , setBirdBottom ] = useState(screenHeight/2)  
  const [obstaclesLeft, setObstaclesLeft] = useState (screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState (screenWidth + screenWidth/2 + 30)
  const [ObstaclesNegHeight, setObstaclesNegHeight] = useState (0)
  const [ObstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState (0)
const [score, setScore] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const gravity = 3
  let gameTimerID 
  let obstaclesLeftTimerID
  let obstaclesLeftTimerIDTwo
  // let isGameOver = false
  const [isGameOver, setIsGameOver] = useState (false)


  //EFFECT -start bird falling
  useEffect (() => { 
    if (birdBottom>0) {
      gameTimerID = setInterval (() => { // we have to provide setInterval with an Id
        setBirdBottom(birdBottom => birdBottom-gravity)
      },30)
    
      return () => {  
        clearInterval (gameTimerID)
      }
    } 
  }, [birdBottom])
  console.log(birdBottom)

  const jump = () => {
    if (!isGameOver && (birdBottom <screenHeight)){
      setBirdBottom(birdBottom => birdBottom+ 50)
      console.log('jumped')
    }
  }




// start first pair of obstacle
useEffect(() => {
  if (obstaclesLeft > -obstacleWidth){
    obstaclesLeftTimerID = setInterval(() =>{
      setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
    },30)

      return () => {
      clearInterval(obstaclesLeftTimerID)
    } 

  }  else  {
    setObstaclesLeft(screenWidth)
    setObstaclesNegHeight( - Math.random() * 100) //getting random number from 0 to 100
    setScore(score=> score +2)
  }
}, [obstaclesLeft])

useEffect(() => {
  if (obstaclesLeftTwo > -obstacleWidth){
    obstaclesLeftTimerIDTwo = setInterval(() =>{
      setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
    },30)

    return () => {
      clearInterval(obstaclesLeftTimerIDTwo)
    } 

  }  else  {
    setObstaclesLeftTwo(screenWidth)
    setObstaclesNegHeightTwo( - Math.random() * 100) //getting random number from 0 to 100
    setScore(score=> score +2)
  }
}, [obstaclesLeftTwo])




//collisions
useEffect(()=>{
if(
((birdBottom < (ObstaclesNegHeight + obstacleHeight + 30) ||
birdBottom > (ObstaclesNegHeight + obstacleHeight + gap -30 )) &&
(obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 ) 
)
||
((birdBottom < (ObstaclesNegHeightTwo + obstacleHeight + 30) ||
birdBottom > (ObstaclesNegHeightTwo + obstacleHeight +gap -30 )) &&
(obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 ) 
)
)
{
  console.log('game over')
  gameOver()
}

})

const gameOver = () =>{
  clearInterval (gameTimerID)
  clearInterval(obstaclesLeftTimerID)
  clearInterval(obstaclesLeftTimerIDTwo)
  setIsGameOver(true)
}






  return (
    <TouchableWithoutFeedback onPress ={jump} >
        <View style={styles.container}>
          {isGameOver &&<Text>{score}</Text>}
     <Bird
     birdBottom={birdBottom}
     birdLeft={birdLeft}
     />
    
    <Obstacles
    color= {'green'}
      obstacleWidth={obstacleWidth}
      obstacleHeight ={obstacleHeight}
      randomBottom={ObstaclesNegHeight}
      gap={gap}
      obstaclesLeft={obstaclesLeft} 
     />
    <Obstacles
    color={'yellow'}
      obstacleWidth={obstacleWidth}
      obstacleHeight ={obstacleHeight}
      randomBottom= {ObstaclesNegHeightTwo}
      gap={gap}
      obstaclesLeft={obstaclesLeftTwo} 
     />
    </View>

    </TouchableWithoutFeedback>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
