

function Product({name, sku, price, type,params,selectedProducts, checkboxCallBack = ()=>{}}){

    return (
        <li key={sku} className="product">
            <input type={'checkbox'} onChange={checkboxCallBack} />
            <div className="details">
                <p>{sku}</p>
                <p>{name}</p>
                <p>{type}</p>
                <p>{'$ '}{price}</p>
                {params.size !== undefined && (<p><b>Size: </b>{params.size}{' MB'}</p>)}
                {params.weight !== undefined && (<p><b>Weight: </b>{params.weight}{' KG'}</p>)}
                {params.height !== undefined && params.width !== undefined && params.length !== undefined && (<p><b>Dimensions: </b>{`${params.height} x ${params.width} x ${params.length}`}</p>)}
            </div>
        </li>
    )
}

export default Product