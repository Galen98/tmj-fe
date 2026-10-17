// export default function ProductGallery({
//     product,
//     onOpen,
// }) {
//     const images = [
//         product.image1,
//         product.image2,
//         product.image3,
//         product.image4,
//         product.image5,
//     ].filter(Boolean);

//     if (!images.length) {
//         return null;
//     }

//     return (
//         <div className="product-gallery">

//             <button
//                 type="button"
//                 className="product-gallery__main"
//                 onClick={() =>
//                     onOpen(images, 0)
//                 }
//             >
//                 <img
//                     src={images[0]}
//                     alt={product.travel_name}
//                 />
//             </button>

//             <div className="product-gallery__side">

//                 {images
//                     .slice(1, 5)
//                     .map((image, index) => (
//                         <button
//                             type="button"
//                             key={image}
//                             onClick={() =>
//                                 onOpen(
//                                     images,
//                                     index + 1
//                                 )
//                             }
//                         >
//                             <img
//                                 src={image}
//                                 alt=""
//                             />
//                         </button>
//                     ))}

//             </div>

//         </div>
//     );
// }