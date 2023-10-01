import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Component {...props.pageProps} />
      </LocalizationProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
