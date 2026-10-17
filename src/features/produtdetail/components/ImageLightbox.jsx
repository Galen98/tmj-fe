// import { useState } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//     faChevronLeft,
//     faChevronRight,
//     faXmark,
// } from "@fortawesome/free-solid-svg-icons";

// export default function ImageLightbox({
//     images,
//     initialIndex = 0,
//     onClose,
// }) {
//     const [index, setIndex] =
//         useState(initialIndex);

//     const previous = () => {
//         setIndex((prev) =>
//             prev === 0
//                 ? images.length - 1
//                 : prev - 1
//         );
//     };

//     const next = () => {
//         setIndex((prev) =>
//             prev === images.length - 1
//                 ? 0
//                 : prev + 1
//         );
//     };

//     return (
//         <div className="image-lightbox">

//             <button
//                 className="image-lightbox__close"
//                 onClick={onClose}
//             >
//                 <FontAwesomeIcon icon={faXmark} />
//             </button>

//             <div className="image-lightbox__counter">
//                 {index + 1} / {images.length}
//             </div>

//             <button
//                 className="image-lightbox__arrow image-lightbox__arrow--left"
//                 onClick={previous}
//             >
//                 <FontAwesomeIcon
//                     icon={faChevronLeft}
//                 />
//             </button>

//             <img
//                 src={images[index]}
//                 alt=""
//             />

//             <button
//                 className="image-lightbox__arrow image-lightbox__arrow--right"
//                 onClick={next}
//             >
//                 <FontAwesomeIcon
//                     icon={faChevronRight}
//                 />
//             </button>

//         </div>
//     );
// }