import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        if (!product || product.stock === 0) {
            toast.error('Producto sin stock');
            return;
        }
    
        setCart((prevCart) => { // prevCart es el carrito actual antes de la actualización
            let showAlert = null; // Inicializar el mensaje como null
            let updatedCart = prevCart;
    
            const exists = prevCart.find((item) => item.id === product.id);
            if (exists) {
                // Validar si se excede el stock
                if (exists.cantidad + 1 > product.stock) {
                    toast.error('Stock insuficiente');
                    return prevCart; // Salir sin actualizar el carrito
                }
                // Verificar si es la última unidad
                if (exists.cantidad + 1 === product.stock) {
                    showAlert = 'Última unidad en stock';
                } else {
                    showAlert = 'Producto agregado al carrito';
                }
                // Actualizar la cantidad del producto existente
                updatedCart = prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                // Agregar un nuevo producto al carrito
                if (product.stock === 1) {
                    showAlert = 'Última unidad en stock';
                } else {
                    showAlert = 'Producto agregado al carrito';
                }
                updatedCart = [...prevCart, { ...product, cantidad: 1 }];
            }
    
            // Mostrar el mensaje al final, asegurándose de que solo se ejecuta una vez
            if (showAlert) {
                toast.success(showAlert);
            }
    
            return updatedCart; // Retornar el carrito actualizado
        });
    };
    
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));

        toast.success('Producto removido del carrito');
    };

    const increment = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === id) {
                    // Validar si no se excede el stock
                    if (item.cantidad + 1 > item.stock) {
                        console.log('No puedes agregar más de la cantidad en stock');
                        toast.error('No puedes agregar más de la cantidad en stock');
                        return item;
                    }
                    return { ...item, cantidad: item.cantidad + 1 };
                }
                return item;
            })
        );
    
    };

    const decrement = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id && item.cantidad > 1
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            )
        );
    };

    const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

    const amountCart = cart.reduce((acc,item) => acc + item.cantidad * item.precio,0);

  
    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, increment, decrement,cartCount,amountCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
