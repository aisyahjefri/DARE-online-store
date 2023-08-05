import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Items from "./pages/Items";
import Add from "./pages/Add";
import Update from "./pages/Update";

// Authentication services
import useAuth from "./services/useAuth";
import authService from "./services/auth.service";

import "./style.css"

function RequireAuth({ children }) {
  const { auth } = useAuth();
  const location = useLocation();
  const isLoggedIn = auth || (authService.getToken() !== null)

  return isLoggedIn === true ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* THIS ROUTE NEED AUTHENTICATION  */}
          {/* <Route path="/" element={<RequireAuth> <Items /> </RequireAuth>} ></Route> */}
          <Route path="/" element={<Items />} ></Route>
          <Route path="/add" element={<Add />} ></Route>
          <Route path="/update/:id" element={<Update />} ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
