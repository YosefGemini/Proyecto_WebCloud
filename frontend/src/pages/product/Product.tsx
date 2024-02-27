import { useEffect, useState } from "react";
import { Product, get_product_by_id } from "../../services/products";
import NavigationLayout from "../NavigationLayout";


import { useParams } from "react-router-dom";
import { download_file } from "../../services/files";
import { Files } from "../../services/files";
export default function ProductPage() {

    const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro id de la URL

    const [product, setProduct] = useState<Product>({
        name: "--",
        description: "--",
        characteristics: "--",
        price: 0,
        discount: 0,
        quantity: 0,
        id: "--",
        categories: [],
        files: [],
    });
    const [Files, setFiles] = useState<Blob[]>([]); // [file1, file2, file3, ...
   
    async function getProductInfo(){
        if (!id) return;

        const res = await get_product_by_id(id);
        if (!res) return;
        const data = await res.json();
        setProduct(data);
    }
    
    async function downloadImages(files: Files[]){
        let aux: Blob[] = [];
        //si no hay archivos no se hace nada
        if (files.length == 0) return;
        //se descargan los archivos
        for (let i = 0; i < files.length; i++) {
          const resFile = await download_file(files[i].id);
          if (!resFile) continue;
          const fileres = resFile as Blob;
          aux.push(fileres);
        }
        setFiles(aux);
    }    
     useEffect(() => {
        console.log("El id es: ");

        // getProductInfo();
        // downloadImages(product.files);
      }, []);
  return (
    <NavigationLayout selectedPage={1}>
      <div className="w-[250px] h-[250px] bg-white rounded-lg shadow-lg m-2 flex flex-col justify-center items-center">
        {/* <img src={prod} alt="" className="w-[150px] h-[150px] rounded-full"/> */}
        <h1 className="text-center text-primary_blue font-bold">
          {product.name}
        </h1>
        <p className="text-center text-primary_blue font-bold">
          {product.description}
        </p>
        <p className="text-center text-primary_blue font-bold">
          {product.price}
        </p>
      </div>
    </NavigationLayout>
  );
}
