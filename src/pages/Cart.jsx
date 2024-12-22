import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Salessumary from "../components/cart/Salessumary";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
    const { cart, removeFromCart, increment, decrement,amountCart } = useContext(CartContext);

    return (
        <div>
            <section className="bg-white py-8 mt-10 antialiased md:py-20">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Carrito de Compras</h2>
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                <CartItem
                                    cartProduct={cart}
                                    removeItemProductCart={removeFromCart}
                                    incrementar={increment}
                                    decrementar={decrement}
                                />
                            </div>
                        </div>
                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                <Salessumary 
                                    amountCart={amountCart}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart;
