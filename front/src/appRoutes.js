import React, { useContext } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';


import { Context } from './Context/AuthContext';

import Login from './pages/login';
import Private from './pages/private';
import Signin from './pages/signin';
import LoggedInLayout from './layout';
import Empresas from './pages/empresas';
import Empresa from './components/empresa';
import Locacoes from './pages/locacoes';
import { Alugar } from './pages/alugar';


function LogedRoutes() {
  const { loading, authenticated } = useContext(Context);

  if(loading){
    return <h1>Loading...</h1>
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>;
}

function AdminRoutes(){
  const { user } = useContext(Context);

  if(user.perfil !== 'admin'){
    return <Navigate to="/privado" />;
  }

  return <Outlet/>;
}

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route element={<LogedRoutes/>}>
        <Route element={<LoggedInLayout/>}>
          <Route path="/privado" element={<Private/>} />
          <Route path="/empresas/:id" element={<Empresa/>} />
          <Route path="/empresas" element={<Empresas/>} />
          <Route path="/locacoes" element={<Locacoes/>} />
          <Route path="/alugar/:id" element={<Alugar/>} />
          <Route path="/admin" element={<AdminRoutes/>}>
            <Route path="*" element={<h1>Not Found 404</h1>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
