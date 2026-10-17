import {
    useEffect,
    useState,
} from "react";

import {
    getFootTags,
} from "../../api/footTagApi";


export default function FootTags({
    title = "Jelajahi Aktivitas Lainnya",
}) {

    /*
     * =========================================
     * STATE
     * =========================================
     */

    const [tags, setTags] =
        useState([]);

    const [isLoading, setIsLoading] =
        useState(true);


    /*
     * =========================================
     * GET FOOT TAGS
     * =========================================
     */

    useEffect(() => {

        const fetchFootTags =
            async () => {

                try {

                    setIsLoading(true);


                    const data =
                        await getFootTags();


                    setTags(data);

                } catch (error) {

                    console.error(
                        "Gagal mengambil foot tags:",
                        error
                    );


                    setTags([]);

                } finally {

                    setIsLoading(false);

                }

            };


        fetchFootTags();

    }, []);


    /*
     * =========================================
     * LOADING
     * =========================================
     */

    if (isLoading) {

        return (
            <section className="tags-footer">

                <h2 className="tags-footer__title">
                    {title}
                </h2>

                <div className="tags-footer__loading">
                    Memuat aktivitas...
                </div>

            </section>
        );

    }


    /*
     * =========================================
     * EMPTY
     * =========================================
     */

    if (tags.length === 0) {

        return null;

    }


    /*
     * =========================================
     * VIEW
     * =========================================
     */

    return (

        <section className="tags-footer">

            <h2 className="tags-footer__title">
                {title}
            </h2>


            <div className="tags-footer__list">

                {tags.map(
                    (tag, index) => (

                        <a
                            key={`${tag.type}-${tag.id}`}
                            href={tag.link}
                            className="tags-footer__item"
                        >

                            <span className="tags-footer__number">
                                {index + 1}
                            </span>


                            <span className="tags-footer__name">
                                {tag.name}
                            </span>

                        </a>

                    )
                )}

            </div>

        </section>

    );
}