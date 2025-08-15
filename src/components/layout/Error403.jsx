import React from 'react'
import { Link } from 'react-router-dom'

const Error403 = () => {
    return (
        <>
            <nav className='navSecondary' >
                <li> <Link to="/produtos"><img src="loja.png" alt="marca da loja" /></Link> </li>
            </nav>
            <div className='error400'>
                <h1>Error 403</h1>
                <p>Usuário inválido ou não autorizado!</p>
                <Link to="/">Login</Link>
            </div>
        </>
    )
}

export default Error403