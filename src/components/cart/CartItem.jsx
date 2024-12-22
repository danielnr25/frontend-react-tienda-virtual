import { ToastContainer } from "react-toastify"

const CartItem = ({ cartProduct, removeItemProductCart,incrementar,decrementar }) => {

    return (
        <>
            {cartProduct.map((product) => (
                <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img className="h-40 w-40 " src={product.imagen} alt={product.nombre} />
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                                <button 
                                    onClick={() => decrementar(product.id)}
                                    type="button" 
                                    id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input type="text" id="counter-input"
                                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" readOnly placeholder="" value={product.cantidad} />
                                <button 
                                    onClick={() => incrementar(product.id)}
                                    type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                    <svg className="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 ">${product.precio}</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <h4 className="text-base font-medium text-blue-900 capitalize">
                                {product.nombre}
                            </h4>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => removeItemProductCart(product.id)}
                                    type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline ">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <ToastContainer />
        </>
    )
}

export default CartItem