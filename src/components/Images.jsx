import "../styles/componentStyles/Image.css";
import { Parallax } from "react-parallax";
import { useRef } from "react";

export default function Images({ images, text, buttonText }) {
  const bookingRef = useRef(null);

  const isMobile = window.innerWidth <= 768;


  const scrollToBooking = () => {
    const headerHeight = window.innerWidth <= 768 ? 75 : 120;
    const offset = -headerHeight;
    const elementPosition = bookingRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Parallax 
        bgImage={images} 
        strength={450}
        bgImageStyle={{ 
          objectFit: "cover" ,
          objectPosition: isMobile ? "right bottom" : "center center"
        }}>
        <div className="section parallax-window">
          <h1>{text}</h1>
          <button className="buttonRes" onClick={scrollToBooking}>
            {buttonText}
          </button>
        </div>
      </Parallax>

      <div ref={bookingRef}></div>
    </>
  );
}
