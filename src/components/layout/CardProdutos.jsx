
const CardProdutos = ({ productName, productDescription, productCategory, brand, balance, price, addToCart }) => {
    return (
        <div className='cardProduto'>

            <img src="roupas-sapatos.png" alt="" />

            <h2>{productName}</h2>

            <p>{brand}</p>

            <p>{productDescription}</p>

            <h2>{price}</h2>

            <h4>Estoque disponível: {balance}</h4>

            <button onClick={addToCart}>Adicionar ao carrinho</button>

        </div>
    )
}

export default CardProdutos

