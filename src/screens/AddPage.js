import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
function AddPage({products = []}){
    let [isEmpty, setIsEmpty] = useState(false)
    let [exist, setExist] = useState(false)
    let navigate = useNavigate()
    let [formData, setFormdata] = useState({
        sku:'', name:'', price:'',type:'book', params:{weight:''}
    })

    const handleTypeChange = (e)=>{
        const {name, value} = e.target
        setFormdata({...formData,type:value, params:value === 'furniture'? {height:'', width:'', length:''} : value === 'disc' ? {size: ''} : {weight: ''} })
    }
    const handleDataChange = (e)=>{

        const { name, value } = e.target

        setFormdata((prevData) =>({...prevData, [name]:value}))
    }

    const handleParamsChange = (e)=>{

        const { name, value } = e.target; 
        setFormdata((prevData) => ({
          ...prevData,
          params: {
            ...prevData.params,
            [name]: value,
          },
        }));
    }
    const handleChangeAndCheckSKU = (e)=>{
        const { name, value } = e.target

        products.forEach(prod =>{
            if(prod.sku == value){
                setExist(true)
            }
        })
        if(!exist){
        setFormdata((prevData) =>({...prevData, [name]:value})) 
        }
    }
    const saveProductCallback = (event) =>{
        event.preventDefault()
        console.log(formData)

        if(!Object.keys(formData).every((key) =>( formData[key] !== undefined && formData[key] !== '' && formData[key] !== null))){
            setIsEmpty(true)
        }
        if(!Object.keys(formData['params']).every((key) => (formData['params'][key] !== undefined && formData['params'][key] !== '' && formData['params'][key] !== null))){
            setIsEmpty(true)
        }

        if(!isEmpty && !exist){

            axios.post('https://scandiweb-store.great-site.net/api.php',formData).then(res=>{
                if(res.data.success){
                    navigate('/')
                }else{
                    alert(res.data.message)
                }
            }).catch(e=>alert(JSON.stringify(e)))
        }
    }
    return (
        <main>
            <form name="product-form" id="product-form" onSubmit={saveProductCallback}>
                <div className="input-wrapper">
                    <label htmlFor="sku">SKU</label>
                    <input type="text" name="sku" id="sku" onChange={handleChangeAndCheckSKU} style={{borderBottom: exist ? '2px solid red' : 'auto'
      }} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={handleDataChange}  />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="price">Price $</label>
                    <input type="number" step={"0.01"} value={formData.params.price} name="price" id="price" onChange={handleDataChange}  />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="type">Type Switcher</label>
                    <select name="type" id="type-switcher"  onChange={handleTypeChange} >
                        <option value="book">Book</option>
                        <option value="disc">Disc</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>

                {formData.type === 'book' && (
                    <div className="input-wrapper">
                        <label htmlFor="weight">Weight{' (KG)'}</label>
                        <input type="number" name="weight" id="weight" step={"0.01"} value={formData.params.weight}  onChange={handleParamsChange}  />
                    </div>
                )}
                {formData.type === 'disc' && (
                    <div className="input-wrapper">
                        <label htmlFor="size">Size{' (MB)'}</label>
                        <input type="number" name="size" id="size" step={"0.01"} value={formData.params.size} onChange={handleParamsChange}  />
                    </div>
                )}
                {formData.type === 'furniture' && (
                    <div>
                        <div className="input-wrapper">
                            <label htmlFor="height">Height{' (CM)'}</label>
                            <input type="number" name="height" id="height" step={"0.01"} value={formData.params.height} onChange={handleParamsChange}  />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="width">Width{' (CM)'}</label>
                            <input type="number" name="width" id="width" step={"0.01"} value={formData.params.width} onChange={handleParamsChange}  />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="length">Length{' (CM)'}</label>
                            <input type="number" name="length" id="length" step={"0.01"} value={formData.params.length} onChange={handleParamsChange}  />
                        </div>
                    </div>
                )}
                {isEmpty && (<h3>Please fill all fields</h3>)}
            </form>
        </main>
    )
}

export default AddPage