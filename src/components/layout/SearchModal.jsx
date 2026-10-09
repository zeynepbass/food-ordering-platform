import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import DataState from "@/components/common/DataState";
import Modal from "@/components/common/Modal";
import Input from "@/components/form/Input";
import useFetch from "@/hooks/useFetch";
import productService from "@/services/productService";
import { formatPrice } from "@/utils/format";

const MAX_RESULTS = 5;

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const { data: products, loading, error, refetch } = useFetch(productService.getAll, []);

  const term = query.trim().toLowerCase();
  const results = products
    .filter((product) => product.title.toLowerCase().includes(term))
    .slice(0, MAX_RESULTS);

  return (
    <Modal title="Search the menu" onClose={onClose}>
      <Input
        type="search"
        aria-label="Search products"
        placeholder="Pizza, burger, drinks..."
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="mt-4 min-h-[12rem]" aria-live="polite">
        <DataState
          loading={loading}
          error={error}
          onRetry={refetch}
          isEmpty={results.length === 0}
          empty={{
            icon: FiSearch,
            title: "No results found",
            text: term ? `Nothing on the menu matches "${query.trim()}".` : "The menu is empty.",
          }}
        >
          <ul className="divide-y divide-line">
            {results.map((product) => (
              <li key={product._id}>
                <Link
                  href={`/product/${product._id}`}
                  className="flex items-center gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-primary-50"
                  onClick={onClose}
                >
                  <Image
                    src={product.img}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                  <span className="flex-1 font-semibold text-secondary">{product.title}</span>
                  <span className="text-sm font-semibold text-secondary">
                    {formatPrice(product.prices[0])}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </DataState>
      </div>
    </Modal>
  );
};

export default SearchModal;
