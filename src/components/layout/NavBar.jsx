import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { CartContext } from "../context/CartContext";



const NavBar = () => {

  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  const logout = () => {
    localStorage.clear("token")
    navigate("/")
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav>

      <ul>

        <li><Link to="/produtos"><img src="loja.png" alt="marca da loja" /></Link></li>

        {/* <li><Link to="/carrinho"> <TiShoppingCart /> </Link></li> */}

        {/* <li><button onClick={logout}>Logout</button></li> */}

        <li ref={menuRef} className="menu">
          <Link to="/carrinho"> <TiShoppingCart /> { } </Link>

          <button onClick={() => setMenuOpen((prev) => !prev)}><IoMdArrowDropdown />
          </button>

          {menuOpen && (
            <div
              className="dropdownButton"
            >
              <Link to="/usuarios" >
                Usuarios
              </Link>
              <Link to="/clientes">
                Clientes
              </Link>
              <Link to="/novoProduto">
                Cadastrar novo produto
              </Link>
              <Link to="/vendedores" >
                Vendedores
              </Link>
              <Link to="/vendas" >
                Vendas
              </Link>
              <button onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>

    </nav>
  )
}

export default NavBar