import Cryptocurrencies from "@components/cryptos";
import { Dashboard } from "@components/dashboard/App";
import React, { ReactElement } from "react";

export default function CryptocurrenciesPage({}): ReactElement {
  return (
    <Dashboard>
      <Cryptocurrencies simplified={false} />
    </Dashboard>
  );
}
