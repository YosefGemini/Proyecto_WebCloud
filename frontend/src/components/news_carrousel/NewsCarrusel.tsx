import { useEffect, useState } from "react";

import leftArrow from "../../assets/leftArrow.png";

export interface News {
  title: string;
  description: string;
  imageURL: string;
  link: string;
}

interface NewsCarruselProps {
  news: News[];
}

export default function NewsCarrusel({ news }: NewsCarruselProps) {
  const defaultIndex = 0;

  const [indexNews, setIndexNews] = useState(defaultIndex);

  function handleNext() {
    if (indexNews < news.length - 1) {
      setIndexNews(indexNews + 1);
    } else {
      setIndexNews(0);
    }
  }
  function handlePrev() {
    if (indexNews > 0) {
      setIndexNews(indexNews - 1);
    } else {
      setIndexNews(news.length - 1);
    }
  }

  useEffect(() => {
    console.log("el indice actual es: ", indexNews);
  }, [indexNews]);

  return (
    <>
      <div className="w-full bg-primary_blue text-secondary_blue font-livvic_extraLight">
        <div className="relative flex flex-col h-full">
          {news.map((notice, index) => (
            <div
              key={index}
              className={`${
                index == indexNews ? "" : "hidden"
              }  w-full h-full flex flex-col justify-center items-center`}
            >
              <div
                className={`w-full h-full flex flex-col justify-center items-center relative`}
              >
                <img
                  className="w-[100%] object-cover h-[600px] bg-primary_blue"
                  src={notice.imageURL}
                  alt={notice.title}
                />

                <div className="flex flex-col w-full backdrop-blur-sm h-[200px] bottom-0 absolute justify-end items-center">
                  <h1 className="text-3xl font-bold text-center text-red-500">
                    {notice.title}
                  </h1>

                  <p className="text-lg text-center text-white">{notice.description}</p>
                  <a
                    className="text-lg text-center underline text-white"
                    href={notice.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mas informacion
                  </a>
                  {/* indicadir de dertificado en pantalla */}

                  <div className="flex flex-row">
                    {news.map((_, index) => (
                      <div
                        key={index}
                        className={`${
                          index == indexNews
                            ? "bg-white scale-110"
                            : "bg-gray-300"
                        } w-3 h-3 m-1 rounded-full my-2 duration-300`}
                      ></div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ))}
          {/* panle izquierdo  */}
          <div
            className="flex justify-center w-[10%] absolute left-[90%] h-full duration-300 hover:bg-gradient-to-l from-primary_blue to-transparent"
            onClick={handleNext}
          >
            <div className="flex w-full items-center justify-center opacity-50 hover:opacity-100">
              <img
                src={leftArrow}
                alt=""
                className=" w-[25%] transform scale-x-[-1]"
              />
            </div>
          </div>
          {/* panel derecho */}
          <div
            className="flex justify-center w-[10%] absolute h-full hover:bg-gradient-to-r from-primary_blue to-transparen"
            onClick={handlePrev}
          >
            <div className="flex w-full items-center justify-center opacity-50 hover:opacity-100">
              <img src={leftArrow} alt="" className=" w-[25%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
