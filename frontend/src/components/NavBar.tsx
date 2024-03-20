import { pageInfo } from "../functions/ConstInfo";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import icon_page from "../assets/react.svg";
import { JWTContext } from "./layout/JWT";
import buyCart_logo from "../assets/carrito.png";

interface NavBarProps {
  // ...
  options: pageInfo[];
  activeIndex: number;
  //SetOption: (index: number) => void;
}

export default function NavBar({ options, activeIndex }: NavBarProps) {
  // const history = useNavigate();
  const [Index, setIndex] = useState(activeIndex);
  const { buyCart } = useContext(JWTContext);

  // useEffect(() => {
  //   console.log("El index es: ", Index);

  //   history(options[Index].path);
  // }, [Index]);

  return (
    <div className="w-full h-[70px] bg-slate-200 max-sm:flex-col text-blue-950 flex-row justify-evenly items-center flex backdrop-blur-sm">
      <Link to="/">
        <div className="flex h-full flex-row items-center justify-center">
          <div className="p-2">
            <img
              src={icon_page}
              alt=""
              className="max-w-[50px] aspect-square"
            />
          </div>
          <div className="">
            <p className="px-2 justify-center  font-semibold text-2xl">
              Store Tech
            </p>
          </div>
        </div>
      </Link>

      <div className="flex flex-row border-yellow-800 justify-end">
        {options.map((option, index) => (
          <Link to={option.path}>
            <div
              key={index}
              className={`flex flex-row border-black p-3  items-center ${
                Index === index ? "underline" : ""
              }`}
              onClick={() => setIndex(index)}
            >
              <div className="px-2 max-md:hidden">
                <p>{option.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>


      <Link to="/buyCart" className="hover:bg-primary_blue rounded-md duration-300">
        <div className="flex ">
          <p className="m-2">Carrito </p>
          <img
            src={buyCart_logo}
            alt=""
            className="h-[20px] m-2 pointer-events-none invert"
          />
          <p className="text-fourth_blue m-2">{buyCart.length}</p>

          
        </div>
      </Link>
    </div>
  );
}
