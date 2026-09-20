import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";
import Modal from "@/components/common/Modal";
import Input from "@/components/form/Input";
import useFetch from "@/hooks/useFetch";
import productService from "@/services/productService";

const MAX_RESULTS = 5;

const SearchModal = ({ onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data: products, loading } = useFetch(productService.getAll, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products
      .filter((product) => product.title.toLowerCase().includes(term))
      .slice(0, MAX_RESULTS);
  }, [products, query]);

  const openProduct = (id) => {
    router.push(`/product/${id}`);
    onClose();
  };

  return (
    <Modal title="Search" onClose={onClose}>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {loading ? (
        <div className="flex justify-center items-center mt-3">
          <PacmanLoader color="#fca311" />
        </div>
      ) : (
        <ul className="mt-4 text-black">
          {results.length > 0 ? (
            results.map((product) => (
              <li key={product._id}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-1 px-2 hover:bg-primary transition-all"
                  onClick={() => openProduct(product._id)}
                >
                  <Image src={product.img} alt={product.title} width={48} height={48} />
                  <span className="font-bold">{product.title}</span>
                  <span className="font-bold">${product.prices[0]}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="text-center font-semibold">No results found!</li>
          )}
        </ul>
      )}
    </Modal>
  );
};

export default SearchModal;
