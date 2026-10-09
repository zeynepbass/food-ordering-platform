import { useState } from "react";
import Image from "next/image";
import { FiPackage, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import AddProductModal from "@/components/admin/AddProductModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import DataState from "@/components/common/DataState";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import Input from "@/components/form/Input";
import useFetch from "@/hooks/useFetch";
import useToggle from "@/hooks/useToggle";
import productService from "@/services/productService";
import { formatPrice } from "@/utils/format";

const ProductManager = () => {
  const { data: products, setData, loading, error, refetch } = useFetch(productService.getAll, []);
  const [isModalOpen, modal] = useToggle(false);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setDeleting] = useState(false);

  const term = query.trim().toLowerCase();
  const visibleProducts = products.filter((product) => product.title.toLowerCase().includes(term));

  const handleCreated = (product) => {
    setData((current) => [...current, product]);
    modal.close();
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await productService.remove(pendingDelete._id);
      setData((current) => current.filter((product) => product._id !== pendingDelete._id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Input
          type="search"
          aria-label="Search products"
          placeholder="Search products..."
          className="max-w-xs"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={modal.open}>
          <FiPlus aria-hidden="true" /> Add product
        </button>
      </div>
      <div className="card overflow-hidden">
        <DataState
          loading={loading}
          error={error}
          onRetry={refetch}
          isEmpty={visibleProducts.length === 0}
          empty={{
            icon: FiPackage,
            title: term ? "No products match your search" : "No products yet",
            text: term ? undefined : "Add your first product to start building the menu.",
          }}
        >
          <DataTable
            caption="Products"
            headers={["Product", "Category", "Price", "Extras", "Actions"]}
          >
            {visibleProducts.map((product) => (
              <DataRow key={product._id}>
                <DataCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.img}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-lg bg-primary-50 object-contain p-1"
                    />
                    <span className="font-semibold text-secondary">{product.title}</span>
                  </div>
                </DataCell>
                <DataCell className="capitalize">{product.category}</DataCell>
                <DataCell>{product.prices.map(formatPrice).join(" / ")}</DataCell>
                <DataCell>{product.extraOptions.length}</DataCell>
                <DataCell>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => setPendingDelete(product)}
                  >
                    Delete
                  </button>
                </DataCell>
              </DataRow>
            ))}
          </DataTable>
        </DataState>
      </div>
      {isModalOpen && <AddProductModal onClose={modal.close} onCreated={handleCreated} />}
      {pendingDelete && (
        <ConfirmDialog
          danger
          title="Delete product?"
          message={`"${pendingDelete.title}" will be removed from the menu. This cannot be undone.`}
          confirmLabel="Delete"
          loading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
};

export default ProductManager;
