import React from "react";
import "./index.css";

import { WifiConnections } from "./types/wifiConnections";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import Rooms from "./components/pages/Rooms";
import AddRoom from "./components/pages/AddRoom";

export const App = () => {
  // const [networks, setNetworks] = useState<WifiConnections>([]);

  // const func = async () => {
  //   const response = await (window as any).si.wifiConnections()
  //   console.log(response);
  //   setNetworks(response)
  // }

  // useEffect(() => {
  //   func()
  //   setInterval(() => {
  //     func()
  //   }, 3000)
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/room-add" element={<AddRoom />} />
    </Routes>
  );
};
