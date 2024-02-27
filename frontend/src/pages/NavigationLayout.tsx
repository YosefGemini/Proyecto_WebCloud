import { ReactNode } from "react";
import { pages } from "../functions/ConstInfo";
import NavBar from "../components/NavBar";
// import { Product } from "../services/products";
// import useCart from "../hooks/useCart";

interface NavigationProps {
  children: ReactNode;
  selectedPage: number;
}


export default function NavigationLayout({
  children,
  selectedPage,
}: NavigationProps) {
 

  return (
      <>
      {/* Cuerpo de la pagina de inicio */}
      <div className="w-full h-full flex-col flex bg-primary_blue">
        {/* NavBar */}
        <div className="fixed w-full z-[1000]">
          <NavBar options={pages} activeIndex={selectedPage} />
        </div>

        {/* Fin Navbar */}
        {/* Contenido */}

        <div className="w-full ">{children}</div>
      </div>
    </>


    
  );
}
