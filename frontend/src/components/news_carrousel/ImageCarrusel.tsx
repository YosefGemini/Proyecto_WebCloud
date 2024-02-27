import { useEffect, useState } from "react";

import leftArrow from "../../assets/leftArrow.png";
// import { Files } from "../../services/files";

// import not_found_file from "../../assets/no_found_file.jpg";
import loading_logo from "../../assets/cargando.gif";



interface ImageCarruselProps {
  files: Blob[];
}

export default function ImageCarrusel({ files }: ImageCarruselProps) {
  const defaultIndex = 0;

  const [indexImg, setIndexImg] = useState(defaultIndex);

  function handleNext() {
    if (indexImg < files.length - 1) {
      setIndexImg(indexImg + 1);
    } else {
      setIndexImg(0);
    }
  }
  function handlePrev() {
    if (indexImg > 0) {
      setIndexImg(indexImg - 1);
    } else {
      setIndexImg(files.length - 1);
    }
  }

  useEffect(() => {
    console.log("el indice actual es: ", indexImg);
  }, [indexImg]);

  return (
    <>
      <div className="w-full aspect-square bg-primary_blue text-secondary_blue font-livvic_extraLight">
        <div className="relative flex flex-col h-full">
          {files.map((file, index) => (
            <div
              key={index}
              className={`${
                index == indexImg ? "" : "hidden"
              }  w-full h-full flex flex-col justify-center items-center`}
            >
              <div
                className={`w-full h-full flex flex-col justify-center items-center relative`}
              >
                <img
                  className="w-[100%] object-cover aspect-square bg-primary_blue pointer-events-none"
                  src={file ? URL.createObjectURL(file): loading_logo}
                  alt=""
                />

                <div className="flex flex-col w-full backdrop-blur-sm bottom-0 absolute justify-end items-center">
                  
                  {/* indicadir de img en pantalla */}

                  <div className="flex flex-row">
                    {files.map((_, index) => (
                      <div
                        key={index}
                        className={`${
                          index == indexImg
                            ? "bg-third_blue scale-110"
                            : "bg-primary_blue"
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
