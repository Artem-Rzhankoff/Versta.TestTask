import React, { Component } from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import OrderDetails from "./components/Orders/OrderDetails";
import CreateOrder from "./components/Orders/CreateOrder";
import Header from "./components/Header";
import OrderList from "./components/Orders/Orderlist";


interface AppState {
  loggedIn: boolean;
}

function App() {

  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<OrderList/>}/>
          <Route path="/orders/:orderId" element={<OrderDetails/>}/>
          <Route path="/orders/create" element={<CreateOrder/>}/>
        </Routes>
      </div>
  )
}

export default App;
