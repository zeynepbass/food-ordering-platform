import Image from "next/image";
import { useDispatch } from "react-redux";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import { removeProduct } from "@/redux/cartSlice";

const CartTable = ({ products }) => {
  const dispatch = useDispatch();

  if (products.length === 0) {
    return <p className="text-center font-semibold">Your cart is empty.</p>;
  }

  return (
    <DataTable headers={["PRODUCT", "EXTRAS", "PRICE", "QUANTITY", "ACTION"]}>
      {products.map((product, index) => (
        <DataRow key={`${product.productId}-${index}`}>
          <DataCell className="flex items-center gap-x-1 justify-center">
            <Image src={product.img} alt={product.title} width={50} height={50} />
            <span>{product.title}</span>
          </DataCell>
          <DataCell>
            {product.extras.length > 0
              ? product.extras.map((extra) => extra.text).join(", ")
              : "empty"}
          </DataCell>
          <DataCell>${product.price}</DataCell>
          <DataCell>{product.quantity}</DataCell>
          <DataCell>
            <button
              type="button"
              className="btn-primary !bg-danger"
              onClick={() => dispatch(removeProduct(index))}
            >
              Remove
            </button>
          </DataCell>
        </DataRow>
      ))}
    </DataTable>
  );
};

export default CartTable;
