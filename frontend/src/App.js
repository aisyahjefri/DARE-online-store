import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Items from "./pages/Items";
import Add from "./pages/Add";
import Update from "./pages/Update";

// TOKEN SERVICE
import authService from "./services/auth.service"

import "./style.css"
import Login from './pages/Login';
import View from './pages/View';

const PrivateRoutes = () => {
  let auth = { 'token': authService.getToken }
  return (
    auth.token ? <Outlet /> : <Navigate to='/' />
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Items />} ></Route>
          <Route path="/add" element={<Add />} ></Route>
          <Route path="/update/:id" element={<Update />} ></Route>
          <Route path="/admin-login" element={<Login />} ></Route>
          <Route path="/user-view" element={<View />} ></Route>



          {/* Protected routes below here -- Require authentication [ADMIN] */}
          <Route element={<PrivateRoutes />} >
            <Route path='/products' element={<Add />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
