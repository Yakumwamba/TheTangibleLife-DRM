import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { isTestChain, DAppProvider, useSendTransaction, useEthers, Config, } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'


ReactDOM.render(

    <DAppProvider config={{}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DAppProvider>,
  document.getElementById("root")
);
