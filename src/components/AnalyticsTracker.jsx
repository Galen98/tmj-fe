import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";

import { trackPageView } from "../api/analyticsApi";
import { initializeUserToken } from "../services/tokenUserService";

export default function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        const track = async () => {
            try {
                // Travel detail ditangani ProductDetail
                const isTravelDetail = matchPath(
                    {
                        path: "/travel/:slug",
                        end: true,
                    },
                    location.pathname
                );

                if (isTravelDetail) return;

                const userToken = await initializeUserToken();

                const path =
                    location.pathname + location.search;

                await trackPageView({
                    path,
                    userToken,
                });
            } catch (error) {
                console.error(
                    "Gagal track page view:",
                    error
                );
            }
        };

        track();
    }, [location.pathname, location.search]);

    return null;
}