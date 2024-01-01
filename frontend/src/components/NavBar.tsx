import { pageInfo } from "../functions/ConstInfo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface NavBarProps {
    // ...
    options: pageInfo[];
    activeIndex: number;
    //SetOption: (index: number) => void;
}

export default function NavBar({options, activeIndex}:NavBarProps){

    const history = useNavigate();
    const [Index, setIndex] = useState(activeIndex);


    useEffect(()=>{

        history(options[Index].path);
    },[Index])
        

    return(

        <div className="w-full bg-[#172554a0] max-sm:flex-col text-secondary_blue flex-row justify-evenly items-center flex backdrop-blur-sm">
      <div className="flex flex-row items-center justify-center">
        <div className="p-2">
            {/* <img src={icon_page} alt="" className="max-w-[50px] aspect-square" /> */}
        </div>
        <div className="">
            <p className="px-2 justify-center  font-semibold text-2xl">
            Web Cloud 
            </p>
        </div>
        
      </div>

      <div className="flex flex-row border-yellow-800 justify-end">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex flex-row border-black p-3  items-center ${
              Index === index ? "underline" : ""
            }`}
            onClick={() => setIndex(index)}
          >
            <div className="w-[100px] px-2 max-md:hidden">
              <p>{option.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}