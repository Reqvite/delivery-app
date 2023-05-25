import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../config/config";
import { PersistGate } from "redux-persist/integration/react";

interface StoreProviderProps {
  children?: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
