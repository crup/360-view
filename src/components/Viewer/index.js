import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import TinyGesture from "tinygesture";

const velocityThreshold = 10;

const options = {
  // Used to calculate the threshold to consider a movement a swipe. it is
  // passed type of 'x' or 'y'.
  threshold: (type, self) =>
    Math.max(
      25,
      Math.floor(
        0.05 *
          (type === "x"
            ? window.innerWidth || document.body.clientWidth
            : window.innerHeight || document.body.clientHeight)
      )
    ),
  // Minimum velocity the gesture must be moving when the gesture ends to be
  // considered a swipe.
  velocityThreshold,
  // Used to calculate the distance threshold to ignore the gestures velocity
  // and always consider it a swipe.
  disregardVelocityThreshold: (type, self) =>
    Math.floor(
      0.5 *
        (type === "x" ? self.element.clientWidth : self.element.clientHeight)
    ),
  // Point at which the pointer moved too much to consider it a tap or longpress
  // gesture.
  pressThreshold: 8,
  // If true, swiping in a diagonal direction will fire both a horizontal and a
  // vertical swipe.
  // If false, whichever direction the pointer moved more will be the only swipe
  // fired.
  diagonalSwipes: false,
  // The degree limit to consider a swipe when diagonalSwipes is true.
  diagonalLimit: Math.tan(((45 * 1.5) / 180) * Math.PI),
  // Listen to mouse events in addition to touch events. (For desktop support.)
  mouseSupport: true,
};

const Viewer = ({ images }) => {
  const viewerRef = useRef();
  const gestureRef = useRef();
  const lastPositionRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    gestureRef.current = new TinyGesture(viewerRef.current, options);
    gestureRef.current.on("panmove", (event) => {
      if (gestureRef.current.swipingDirection === "horizontal") {
        if (lastPositionRef.current > gestureRef.current.touchMoveX) {
          setCurrentIndex((index) =>
            index + 1 === images.length ? 0 : index + 1
          );
        }
        if (lastPositionRef.current < gestureRef.current.touchMoveX) {
          setCurrentIndex((index) =>
            index - 1 < 0 ? images.length : index - 1
          );
        }
        lastPositionRef.current = gestureRef.current.touchMoveX;
      }
    });
  }, []);

  // console.log({currentIndex})

  // const timerRef = useRef();
  // const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect(() => {
  //     timerRef.current = setInterval(() => {
  //         setCurrentIndex(index => index + 1 === images.length ? 0 : index + 1);
  //     }, 25)
  //     return () => {
  //         clearInterval(timerRef.current);
  //     }
  // }, [])

  return (
    <div className={styles.wrapper}>
      {JSON.stringify({ velocityThreshold })}
      <div ref={viewerRef} className={styles.imageWrapper}>
        <img className={styles.image} src={images[currentIndex]} alt="car" />
      </div>
    </div>
  );
};

export default Viewer;
