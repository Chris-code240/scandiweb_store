
import Product from "./Product"

function Products ({bunchofProducts = [], checkBoxCallBack, selectedProducts}){

    return (
        <ul className="products">
            {bunchofProducts.map((product)=> <Product name={product.name} sku={product.sku} price={product.price} params={product.weight ?{weight:product.weight} : product.size ? {size:product.size}: {height: product.height, width: product.width, length:product.length} } checkboxCallBack={checkBoxCallBack} />)}
        </ul>
    )
}

export default Products