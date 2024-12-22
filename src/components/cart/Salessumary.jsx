import { toast } from "react-toastify";
const Salessumary = ({amountCart}) => {


    const procederPago = () => {
        //reiniciar el carrito
        localStorage.removeItem('cart');
        toast.success('Gracias por su compra');
        window.location.href = '/';
    }
    return (
        <>
            <p className="text-xl font-bold text-blue-900">
                Resumen de la orden
            </p>

            <div className="space-y-4">
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                            Subtotal
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">${amountCart}
                        </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                            Descuento
                        </dt>
                        <dd className="text-base font-medium text-green-600">0</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                            Shipping
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">0</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                            Impuestos
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">0</dd>
                    </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900 ">Total</dt>
                    <dd className="text-base font-bold text-gray-900 ">$
                        {amountCart}
                    </dd>
                </dl>
            </div>

            <button 
                onClick={procederPago}
                type="button" 
                className="flex mt-5 w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                Proceder al pago
            </button>
        </>
    )
}

export default Salessumary