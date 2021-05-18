import { StoreProvider } from "easy-peasy";
import "../styles/globals.css";
import store from "../src/store";
import axios from "axios";
import setUpAxios from "../src/setUpAxios";

setUpAxios(axios);

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
