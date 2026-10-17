import { Link } from "react-router-dom";

export default function GlobalBreadscrumb({ items = [] }) {
    return (
        <nav className="global-breadcrumb" aria-label="Breadcrumb">
            <div className="global-breadcrumb__container">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <div
                            className="global-breadcrumb__item"
                            key={`${item.label}-${index}`}
                        >
                            {isLast ? (
                                <span className="global-breadcrumb__current">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    to={item.to || "#"}
                                    className="global-breadcrumb__link"
                                >
                                    {item.label}
                                </Link>
                            )}

                            {!isLast && (
                                <span className="global-breadcrumb__separator">
                                    /
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}