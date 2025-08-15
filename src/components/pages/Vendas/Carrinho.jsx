import React, { useContext } from 'react';
import NavBar from '../../layout/NavBar';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';

const Carrinho = () => {
    const { cart, removeFromCart, increaseToCart, decreaseToCart, clearCart } = useContext(CartContext);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <NavBar />
            <main className='cart'>
                {cart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Subtotal</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.productName}</td>
                                        <td>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td> <button onClick={() => decreaseToCart(item)}> - </button> {item.quantity} <button onClick={() => increaseToCart(item)} > + </button> </td>
                                        <td>{(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>
                                            <button onClick={() => removeFromCart(item.id)}>Remover</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot>
                                <tr className="cartTotal">
                                    <td>Total</td>
                                    <td>-</td>
                                    <td>{totalItems}</td>
                                    <td>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>
                                        <button onClick={clearCart} >
                                            Limpar Carrinho
                                        </button>
                                        <button>
                                            <Link to="/novaVenda">Finalizar compra</Link>
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </>
                )}
            </main>
        </>
    );
};

export default Carrinho;
