import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";


const EmptyCart = () => {
    return (
        <div className="emptyCart">

            <TiShoppingCart />

            Carrinho vazio!

            <p>Adicione <Link to="/produtos">itens</Link></p>

        </div>
    )
}

export default EmptyCart