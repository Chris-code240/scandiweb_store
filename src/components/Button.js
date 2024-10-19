
function Button({text, callback = function(){}, id, name, form}){

    return (
        <button onClick={callback} type={'submit'} form={form} name={name} id={id}>
            {text}
        </button>
    )
}

export default Button