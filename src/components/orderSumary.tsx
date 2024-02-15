import { useCart } from '../context/cartContext';
import { OrderItem } from './orderItem';
import { OrderTotals } from './orderTotals';

export function OrderSumary() {
  const { cartProducts, clearCart } = useCart();
  const subtotal = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal - discount + tax;

  return (
    <div className="flex flex-col space-y-10 w-full h-full md:w-3/12 md:h-[80vh] bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Resumo do Pedido</h2>
      <div className="overflow-auto h-[80%]">
        {cartProducts.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </div>
      <OrderTotals
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        total={total}
      />
      <button onClick={clearCart} className="mt-auto bg-orange-500 rounded-md w-full py-3 text-white font-semibold hover:bg-orange-600 transition duration-150 ease-in-out">
        Finalizar Pedido
      </button>
    </div>
  );
}
