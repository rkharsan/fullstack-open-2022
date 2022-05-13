import { useEffect, useState } from "react";
import axios from "axios";

import Viewer from "./components/Viewer";

const App = () => {
  const [data, setData] = useState({
    state: "loading",
    payload: null,
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData({ state: "success", payload: res.data }))
      .catch((error) => setData({ state: "error", payload: error.message }));
  }, []);

  if (data.state === "loading") {
    return <div>loading...</div>;
  }

  if (data.state === "error") {
    return <div>ERROR: {data.payload}</div>;
  }

  return <Viewer countries={data.payload} />;
};

export default App;
