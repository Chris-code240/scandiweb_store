import Products from "../components/Products"
import { useEffect } from "react"
import axios from "axios"
function ProductsPage({checkboxCallback = ()=>{}, selectedProducts, products, setProducts}){
    useEffect(()=>{
        axios.get('http://christian-marf0.onlinewebshop.net/api.php').then(res=>{
          setProducts(res.data)
        }).catch((e)=>alert(JSON.stringify(e)))
      },[])
    return (
        <main>
            <Products bunchofProducts={products} checkBoxCallBack={checkboxCallback} /> 
        </main>
    )

}

export default ProductsPage