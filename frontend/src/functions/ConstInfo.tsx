import { News } from "../components/news_carrousel/NewsCarrusel";
// import { Product } from "../services/products";

// interface que guarda la informacion de una pagina para el layout
export interface pageInfo{


    key: string;
    name: string;
    path: string
}

// Paginas que existen en la pagina web  

export const pages: pageInfo[]  = [


    {
        key: "home",
        name: "Inicio",
        path: "/home"
    },
    {
        key: "products",
        name: "Productos",
        path: "/products"
    },
    {
        key: "about_us",
        name: "Sobre Nosotros",
        path: "/about_us"
    },    

]

// Informacion de las noticias que se muestran en el carrusel de noticias

export const news: News[] = [
    {
        title: "Noticia 1",
        description: "Descripcion de la noticia 1",
        imageURL: "https://img.freepik.com/vector-premium/plantilla-banner-juego-simple-unica_92741-92.jpg",
        link: "https://www.google.com"
    },
    {
        title: "Noticia 2",
        description: "Descripcion de la noticia 2",
        imageURL: "https://img.freepik.com/vector-gratis/portada-facebook-entretenimiento-juegos-degradados_23-2149834703.jpg?w=1480&t=st=1703820613~exp=1703821213~hmac=808230d1e8bd2cc8c8de8690075c5ac9ed616663f4f313b3a39efb2da5b0fbba",
        link: "https://www.google.com"
    },
    {
        title: "Noticia 3",
        description: "Descripcion de la noticia 3",
        imageURL: "https://http2.mlstatic.com/D_NQ_847143-MLA73312879911_122023-OO.webp",
        link: "https://www.google.com"
    },
    {
        title: "Noticia 4",
        description: "Descripcion de la noticia 4",
        imageURL: "https://img.freepik.com/vector-gratis/portada-facebook-configuracion-juegos-neon-diseno-plano_23-2149833533.jpg",
        link: "https://www.google.com"
    },
    {
        title: "Noticia 5",
        description: "Descripcion de la noticia 5",
        imageURL: "https://content.wepik.com/statics/24188408/preview-page0.jpg",
        link: "https://www.google.com"
    },
    {
        title: "Noticia 6",
        description: "Descripcion de la noticia 6",
        imageURL: "https://img.freepik.com/vector-gratis/encabezado-twitter-competencia-juegos-degradados_23-2149853092.jpg",
        link: "https://www.google.com"
    },
    {
        title: "Noticia 7",
        description: "Descripcion de la noticia 7",
        imageURL: "https://img.freepik.com/vector-premium/plantilla-banner-juego-simple-unica_92741-92.jpg",
        link: "https://www.google.com"
    },
    {
        title: "Noticia 8",
        description: "Descripcion de la noticia 8",
        imageURL: "https://img.freepik.com/vector-premium/plantilla-banner-juego-simple-unica_92741-92.jpg",
        link: "https://www.google.com"
    },
]

// Informacion de los productos que se muestran en la pagina de productos

// export const products: Product[] = [
    



//     {
//         id: 'master',
//         name: "Producto 1",
//         description: "Descripcion del producto 1",
//         price: 100,
//         files: [
//             "https://img.freepik.com/vector-premium/plantilla-banner-juego-simple-unica_92741-92.jpg"
//         ]
//     },
//     {
//         id: 'master2',
//         name: "Producto 2",
//         description: "Descripcion del producto 2",
//         price: 100,
//         images: [
//             "https://img.freepik.com/vector-premium/plantilla-banner-juego-simple-unica_92741-92.jpg"
//         ]
//     },
//     {
//         id: 'master3',
//         name: "Producto 3",
//         description: "Descripcion del producto 3",
//         price: 100,
//         images: [
//             "https://img.freepik.com/vector-premium/plantilla-banner-juego-simple-unica_92741-92.jpg"
//         ]
//     },
//     {
//         id: 'master4',
//         name: "Producto 4",
//         description: "Descripcion del producto 4",
//         price: 100,
//         images: [
//             "https://img.freepik.com/vector-premium/plantilla-banner-juego-simple-unica_92741-92.jpg"
//         ]
//     },
    
// ]

// export const categories: string[] = [

//     "Categoria 1",
//     "Categoria 2",
//     "Categoria 3",
//     "Categoria 4",
//     "Categoria 5",
//     "Categoria 6",
//     "Categoria 7",
//     "Categoria 8",
//     "Categoria 9",
//     "Categoria 10",
    
    
    
// ]