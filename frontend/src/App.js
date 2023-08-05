import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Items from "./pages/Items";
import Add from "./pages/Add";
import Update from "./pages/Update";

import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Items />} ></Route>
          <Route path="/add" element={<Add />} ></Route>
          <Route path="/update/:id" element={<Update />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
