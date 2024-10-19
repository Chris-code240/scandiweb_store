
import './App.css';
import ProductsPage from './screens/ProductsPage';
import AddPage from './screens/AddPage';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

  let [products, setProducts] = useState([])
  let [selectedProducts, setSelectedProducts] = useState([])



  const checkboxCallBack = (event)=>{
      if(event.target.checked){
          setSelectedProducts([...selectedProducts, event.target.parentElement.lastElementChild.firstElementChild.textContent])
      }else{
        setSelectedProducts(selectedProducts.filter(id => id !== event.target.parentElement.lastElementChild.firstElementChild.textContent));
      }
      console.log(selectedProducts)
  }
  const deleteCallBack = (e)=>{

 
    axios.delete('http://localhost:80/store_backend/api.php',{data:selectedProducts}).then(res =>{
      if(res.data.success){
        for (let p of selectedProducts){
          setProducts(products.filter(product => product.sku !== p));
      }
          setSelectedProducts([])
      }
  }).catch(e=>alert(JSON.stringify(e)))
  }
  return (
    <Router>

      <div>
        <Header deleteCallBack={deleteCallBack} />
      <Routes>
          <Route element={<ProductsPage products={products} setProducts={setProducts} bunchOfProducts={products} selectedProducts={selectedProducts} checkboxCallback={checkboxCallBack}  />} path={'/'} />
          <Route element={<AddPage products={products} />} path={'/add'} />
      </Routes>
      </div>

    </Router>
  );
}

export default App;
