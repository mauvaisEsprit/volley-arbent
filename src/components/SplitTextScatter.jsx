import { animate, hover } from "motion";
import { splitText } from "motion-plus";
import { useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

export default function ScatterText({ text }) {
  const containerRef = useRef(null);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevEvent = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const h1 = containerRef.current.querySelector(".h1Scatter");
    if (!h1) return;

    const { chars } = splitText(h1);

    const handlePointerMove = (event) => {
      const now = performance.now();
      const timeSinceLastEvent = (now - prevEvent.current) / 1000;
      prevEvent.current = now;
      velocityX.set(event.movementX / timeSinceLastEvent);
      velocityY.set(event.movementY / timeSinceLastEvent);
    };

    document.addEventListener("pointermove", handlePointerMove);

    hover(chars, (element) => {
      const speed = Math.sqrt(
        velocityX.get() * velocityX.get() + velocityY.get() * velocityY.get()
      );
      const angle = Math.atan2(velocityY.get(), velocityX.get());
      const distance = speed * 0.1;

      animate(
        element,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        },
        {
          type: "spring",
          stiffness: 100,
          damping: 50,
        }
      );

      clearTimeout(element._resetTimer);
      element._resetTimer = setTimeout(() => {
        animate(
          element,
          { x: 0, y: 0 },
          { type: "spring", stiffness: 150, damping: 20 }
        );
      }, 5000);
    });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="containerScatter" ref={containerRef}>
      <h1 className="h1Scatter">{text}</h1>
      <style>{`
                .containerScatter {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-width: 420px;
                    text-align: left;
                    color:rgb(255, 255, 255);
                }

                .h1Scatter {
                    position: absolute;
                    top: calc(20% + 120px); /* 120px — высота шапки на десктопе */
                    left: 50%;
                    transform: translateX(-50%);
                    color: white;
                    font-family: "Space Grotesk", sans-serif;
                    font-size: clamp(20px, 8vw, 38px);
                    text-align: center;
                    z-index: 2;
                    width: 90%;
                    max-width: 1000px;
                    box-sizing: border-box;
                    padding: 0 20px; /* немного отступа слева и справа */
                }
 
}


                .split-char {
                    will-change: transform, opacity;
                }
            `}</style>
    </div>
  );
}
