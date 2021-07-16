import React from "react"
import background from './mountain2.jpeg'
import {useState} from 'react' 


const styles = {
  image: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 55,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: '-100'
  },
  title: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 80,
      fontFamily: 'Akzidenz',
  },
  slider: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    color: '#ffffff'
  }
};




function Home() {


  return (
    <>
      <div style={styles.image}>
        <h1 style={styles.title}>
          ADVENTURE AWAITS
      </h1>
      </div>
      {/* <div style={styles.slider}>
        YEEEEEE
    </div> */}

    </>
  )
}

export default Home;