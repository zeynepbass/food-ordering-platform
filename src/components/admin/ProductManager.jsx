import Image from "next/image";
import { toast } from "react-toastify";
import Title from "@/components/common/Title";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import AddProductModal from "@/components/admin/AddProductModal";
import useFetch from "@/hooks/useFetch";
import useToggle from "@/hooks/useToggle";
import productService from "@/services/productService";

const ProductManager = () => {
  const { data: products, refetch } = useFetch(productService.getAll, []);
  const [isModalOpen, modal] = useToggle(false);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await productService.remove(id);
      toast.success("Product deleted!");
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreated = () => {
    modal.close();
    refetch();
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <div className="flex justify-between items-center">
        <Title addClass="text-[40px]">Products</Title>
        <button type="button" className="btn-primary" onClick={modal.open}>
          + Add Product
        </button>
      </div>
      <div className="overflow-auto max-h-[400px] w-full mt-5">
        <DataTable headers={["IMAGE", "ID", "TITLE", "PRICE", "ACTION"]}>
          {products.map((product) => (
            <DataRow key={product._id}>
              <DataCell className="flex justify-center">
                <Image src={product.img} alt={product.title} width={50} height={50} />
              </DataCell>
              <DataCell>{product._id.substring(0, 5)}...</DataCell>
              <DataCell>{product.title}</DataCell>
              <DataCell>$ {product.prices[0]}</DataCell>
              <DataCell>
                <button
                  type="button"
                  className="btn-primary !bg-danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      </div>
      {isModalOpen && <AddProductModal onClose={modal.close} onCreated={handleCreated} />}
    </div>
  );
};

export default ProductManager;
