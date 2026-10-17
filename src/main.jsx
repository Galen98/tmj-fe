import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles/base.css";
import "./assets/styles/grid.css";
import "./assets/styles/main.css";
import "./assets/styles/normalize.min.css";
import "./assets/styles/responsive.css";

import { 
    initializeUserToken, 
} from "../src/services/tokenUserService"; 
 
initializeUserToken()
    .catch((error) => {

        console.error(
            "Gagal initialize user token:",
            error
        );

});

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);