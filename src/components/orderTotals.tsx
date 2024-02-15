
interface OrderTotalsProps {
    subtotal:number
    discount:number
    tax:number
    total:number
}

export function OrderTotals({ subtotal, discount, tax, total }: OrderTotalsProps) {
  return (
    <div className="bg-neutral-100 rounded-md p-5 m-2">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-700">Subtotal:</span>
        <span className="text-gray-600">R${subtotal}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-700">Desconto:</span>
        <span className="text-red-500">- R${discount}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-700">
          Imposto sobre vendas:
        </span>
        <span className="text-gray-600">R${tax}</span>
      </div>
      <div className="flex justify-between mt-4 pt-4 border-t border-gray-300">
        <span className="font-bold text-gray-800">Total da Venda:</span>
        <span className="font-bold text-gray-800">R${total}</span>
      </div>
    </div>
  );
}
