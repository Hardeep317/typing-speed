import { useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import './App.css'
import AllRoutes from "./AllRoutes";
import Navbar from "./Component/Navbar";

const NUM_OF_WORDS = 500;
const SECONDS = 60;

function App() {
  

  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
