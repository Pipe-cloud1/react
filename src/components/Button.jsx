import React from "react"

//boton reutilizable
function Button({ children, onClick, className }) { 
    return (
        <button onClick={onClick} type="button" className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${className}`} >
            {children}
        </button>
    )
}

export default Button

