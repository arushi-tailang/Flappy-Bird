import React from 'react'
import { View } from 'react-native';



const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 50  
    const birdHeight = 60
    
    return (
        
        <View style={{

            position:'absolute',
            backgroundImage :'url(images/bird20.png)' ,
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),  //making the bird placed in center from left
            bottom: birdBottom,              //making the bird placed in center from bottom
          
        }}/>

       
    )
}

export default Bird
 