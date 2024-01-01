import { useState } from "react";
import styles from "./FlipCard.module.css";

interface FlipCardProps {
  title: string;
  description: string;
  imageURL: string;
  link: string;
  style: string;
}

export default function FlipCard({
  title,
  description,
  imageURL,
  link,
  style,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };
  return (
    <>
      {/* contenedor general */}
      <div className="w-full max-w-[370px] h-[400px] content-center ">
        <div className={`${styles.scene} ${styles.scene}--${styles.card}`}>
          {/* Contenedor Tarjetas */}
          <div
            className={`${styles.card} ${isFlipped ? styles.is_flipped : ""}`}
          >
            {/*Inicio tarjeta Frente */}
            <div className={`${styles.card__face}`} onClick={handleClick}>
              <div
                className={`w-[300px] h-[400px] flex flex-col justify-start items-center rounded-lg overflow-hidden ${style}`}
              >
                <img
                  src={imageURL}
                  alt=""
                  className="h-[70%] object-cover w-full"
                />
                <div>
                  <h1 className="font-extrabold text-xl mt-8">{title}</h1>
                </div>
              </div>
            </div>

            {/* Tarjeta parte Trasera */}
            <div
              className={`${styles.card__face} ${styles.card__face__back}`}
              onClick={handleClick}
            >
              <div
                className={`w-[300px] h-[400px] flex flex-col justify-center items-center rounded-lg ${style}`}
              >
                <div className="p-4 h-[70%]">
                  <h2 className="font-bold text-lg">Descripcion</h2>
                  <p className="font-medium text-base ">{description}</p>
                </div>
                <div>
                  <button className="bg-black text-white p-4">
                    <a href={link}>Ir a la pagina</a>
                  </button>
                </div>
              </div>
            </div>
            {/* Fin tarjeta Trasera */}
          </div>
        </div>
      </div>
    </>
  );
}
