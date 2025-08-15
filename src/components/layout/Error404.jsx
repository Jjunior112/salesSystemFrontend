import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <>
           <nav className='navSecondary' >
                <li> <Link to="/produtos"><img src="loja.png" alt="marca da loja" /></Link> </li>
            </nav>
            <div className='error400'>
                <h1>Error 404</h1>
                <p>Página não encontrada!</p>
            </div>
        </>
    )
}

export default Error404