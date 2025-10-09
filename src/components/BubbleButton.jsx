import React, { useEffect, useRef } from "react";
import "./BubbleButton.css";
import { gsap } from "gsap";

const BubbleButton = ({
  label = "Hover me",
  buttonColor = "#90feb5",
  textColor = "#fff",
  width = "160px",
  height = "60px",
  onClick,
}) => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--button-color", buttonColor);
      containerRef.current.style.setProperty("--text-color", textColor);
    }

    const button = buttonRef.current;
    const circlesTopLeft = button.parentElement.querySelectorAll(".circle.top-left");
    const circlesBottomRight = button.parentElement.querySelectorAll(".circle.bottom-right");
    const effectButton = button.parentElement.querySelector(".effect-button");

    const tl1 = gsap.timeline();
    const tl2 = gsap.timeline();
    const master = gsap.timeline({ paused: true });

    // 左上泡泡動畫
    tl1.to(circlesTopLeft, {
      duration: 1.2,
      x: -25,
      y: -25,
      scaleY: 2,
      ease: "slow(0.1, 0.7, false)",
    })
      .to(circlesTopLeft[0], { duration: 0.1, scale: 0.2, x: "+=6", y: "-=2" })
      .to(circlesTopLeft[1], { duration: 0.1, scaleX: 1, scaleY: 0.8, x: "-=10", y: "-=7" }, "<")
      .to(circlesTopLeft[2], { duration: 0.1, scale: 0.2, x: "-=15", y: "+=6" }, "<")
      .to(circlesTopLeft[0], { duration: 1, scale: 0, x: "-=5", y: "-=15", opacity: 0 })
      .to(circlesTopLeft[1], { duration: 1, scale: 0.4, x: "-=10", y: "-=10", opacity: 0 }, "<")
      .to(circlesTopLeft[2], { duration: 1, scale: 0, x: "-=15", y: "+=5", opacity: 0 }, "<");

    // 右下泡泡動畫
    tl2.to(circlesBottomRight, {
      duration: 1.1,
      x: 30,
      y: 30,
      ease: "slow(0.1, 0.7, false)",
    })
      .to(circlesBottomRight[0], { duration: 0.1, scale: 0.2, x: "-=6", y: "+=3" })
      .to(circlesBottomRight[1], { duration: 0.1, scale: 0.8, x: "+=7", y: "+=3" }, "<")
      .to(circlesBottomRight[2], { duration: 0.1, scale: 0.2, x: "+=15", y: "-=6" }, "<")
      .to(circlesBottomRight[0], { duration: 1, scale: 0, x: "+=5", y: "+=15", opacity: 0 })
      .to(circlesBottomRight[1], { duration: 1, scale: 0.4, x: "+=7", y: "+=7", opacity: 0 }, "<")
      .to(circlesBottomRight[2], { duration: 1, scale: 0, x: "+=15", y: "-=5", opacity: 0 }, "<");

    master
      .add(tl1)
      .to(effectButton, { duration: 0.8, scaleY: 1.1 }, 0.1)
      .add(tl2, 0.2)
      .to(effectButton, { duration: 1.8, scale: 1, ease: "elastic.out(1.2, 0.4)" }, 1.2)
      .timeScale(2.6);

    const handleClickEffect = () => master.restart();
    button.addEventListener("click", handleClickEffect);

    return () => {
      button.removeEventListener("click", handleClickEffect);
    };
  }, [buttonColor]);

  return (
    <div
      className="bubble-button-container"
      ref={containerRef}
      style={{ width, height }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="goo">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <span className="button--bubble__container">
        <button ref={buttonRef} className="button button--bubble" onClick={onClick}>
          {label}
        </button>
        <span className="button--bubble__effect-container">
          <span className="circle top-left"></span>
          <span className="circle top-left"></span>
          <span className="circle top-left"></span>

          <span className="button effect-button"></span>

          <span className="circle bottom-right"></span>
          <span className="circle bottom-right"></span>
          <span className="circle bottom-right"></span>
        </span>
      </span>
    </div>
  );
};

export default BubbleButton;
