import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./Routes/Routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </PersistGate>
      <Toaster position="top-center" />
    </Provider>
  </React.StrictMode>
);
