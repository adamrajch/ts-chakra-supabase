import { Dashboard } from "@components/dashboard/App";
import News from "@components/news";
import React, { ReactElement } from "react";

export default function cryptocurrencies({}): ReactElement {
  return (
    <Dashboard>
      <News simplified={false} />
    </Dashboard>
  );
}
