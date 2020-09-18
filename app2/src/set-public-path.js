import { setPublicPath } from "systemjs-webpack-interop";

if(window.singleSpaNavigate) {
    setPublicPath("single-spa-example-app2", 1);
}
