import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./app/components/NavBar";
import AnimatedRoutes from "./app/components/AnimatedRoutes";
import { AnimatePresence } from "framer-motion";

const App = () => {

  return (
    <>
      <NavBar />
      <AnimatedRoutes />
    </>
  );
};

export default App;
