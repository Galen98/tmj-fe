import {
    Link,
} from "react-router-dom";


const City = ({
    name,
    image,
    slug,
}) => {

    return (

        <Link
            to={`/city/${slug}`}
            className="city-card mb-4 d-block text-decoration-none"
        >

            <img
                src={image}
                alt={name}
                className="city-img"
                loading="lazy"
            />

            <div className="city-overlay"></div>

            <div className="city-text">

                <h3 className="fw-bold mb-1 fs-4">
                    {name}
                </h3>

            </div>

        </Link>

    );
};


export default City;