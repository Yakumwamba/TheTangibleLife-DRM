import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { isTestChain, DAppProvider, useSendTransaction, useEthers, Config, } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'


ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
