import { useContext, useEffect, useState } from "react";
import { Product, get_product_by_id } from "../../services/products";
import NavigationLayout from "../NavigationLayout";

import { useParams } from "react-router-dom";
import { download_file } from "../../services/files";
import { Files } from "../../services/files";
import ImageCarrusel from "../../components/news_carrousel/ImageCarrusel";
import carritoCompras from "../../assets/carrito.png";
import Loading from "../../components/loading/Loading";
import { JWTContext } from "../../components/layout/JWT";
export default function ProductPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [characteristics, setCharacteristics] = useState<string[]>([]); // Aquí obtenemos el parámetro id de la URL
  const { add_product } = useContext(JWTContext);

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

  async function getProductInfo() {
    if (!id) return;

    console.log("El id es: ", id);

    const res = await get_product_by_id(id);
    if (!res) return;
    const data = res as Product;
    console.log("El producto es: ", data);
    setCharacteristics(data.characteristics.split(","));
    setProduct(data);
  }

  async function downloadImages(files: Files[]) {
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
  function handleAddProduct() {
    add_product(product);
  }
  useEffect(() => {
    setLoading(true);
    // console.log("El id es: ", id);

    getProductInfo();


    console.log("El producto es: ", product);
  }, []);

  useEffect(() => {

    console.log("los files son: ", product.files);
    downloadImages(product.files);
    setLoading(false);
  }, [product]);

  return (
    <NavigationLayout selectedPage={1}>
      {loading ? <Loading /> : null}
      <div className="my-[70px]  w-full flex flex-col justify-center items-center min-h-screen">
        <div className="w-[70%] bg-white rounded-lg shadow-lg m-2 flex flex-col">
          <div className="flex flex-row">
            <div className="w-[40%] m-4 border-[2px] aspect-square border-primary_blue rounded-md overflow-hidden">
              <ImageCarrusel files={Files} />
            </div>
            <div className="w-[50%] flex flex-col items-start justify-center p-4">
              <h1 className="text-center text-primary_blue font-bold text-[30px]">
                Nombre del Producto:{" "}
              </h1>
              <h1 className="text-center text-primary_blue font-normal text-[30px]">
                {product.name}
              </h1>
              <h1 className="text-center text-primary_blue font-bold text-[30px]">
                Cantidad:
              </h1>

              <p className="text-center text-primary_blue font-normal text-[30px]">
                {product.quantity} Unidades Disponibles
              </p>

              <h1 className="text-center text-primary_blue font-bold text-[30px]">
                Precio:
              </h1>

              <p className="text-center text-primary_blue font-normal text-[30px]">
                $ {product.price} USD
              </p>

              <button className="m-4 w-full bg-primary_blue flex text-white rounded-md p-4 items-center justify-center hover:bg-third_blue duration-300" onClick={(e)=>{e.preventDefault; handleAddProduct();}}>
                <p>Añadir al carrito</p>
                <img src={carritoCompras} alt="" className="h-[30px]" />
              </button>
            </div>
          </div>
          {/* descripcion del producto */}
          <div className="p-8 flex flex-col justify-start items-start">
            <h1 className="text-center text-primary_blue font-bold text-[30px] my-4">
              Descripcion del Producto:
            </h1>
            <p className="text-center text-primary_blue font-normal">
              {product.description}
            </p>
            <h1 className="text-center text-primary_blue font-bold text-[30px] my-4">
              Caracteristicas del Producto:{" "}
            </h1>
            <ul className="list-inside list-disc">
              {characteristics.map((char, index) => (
                <li key={index} className="text-primary_blue font-bold">
                  {char}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
