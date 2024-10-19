import Button from "./Button"
import { useLocation, Link } from "react-router-dom"

function Header({deleteCallBack}){
    let location = useLocation()


    
    return (
        <header>
            <div className="header-wrapper">
                {location.pathname == '/' && (<h2>Products Page</h2>)}
                {location.pathname == '/add' && (<h2>Add Page</h2>)}
                    {location.pathname == '/'&& (
                        <nav>
                            <Link to='/add' >
                            <Button text={'ADD'} id={'add-product'} name={'add-product'} />
                            </Link>

                            <Button text={'MASS DELETE'} id={'mass-delete'} name={'mass-delete'} callback = {deleteCallBack} />
                        </nav>
                    )}

                    {location.pathname == '/add'&& (
                        <nav>
                            <Button text={'Save'} id={'add-product'} name={'add-product'} form={'product-form'}  />
                            <Link to='/' >
                                <Button text={'Cancel'} id={'cancel'} name={'cancel'}  />
                            </Link>
                        </nav>
                    )}
            </div>
            <hr />
        </header>
    ) 

}

export default Header