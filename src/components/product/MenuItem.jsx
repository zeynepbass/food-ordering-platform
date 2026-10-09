import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { formatPrice } from "@/utils/format";

const MenuItem = ({ product }) => (
  <article className="card group relative flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
    <div className="relative h-48 bg-primary-50">
      <Image
        src={product.img}
        alt={product.title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="font-semibold text-secondary">
        <Link href={`/product/${product._id}`} className="after:absolute after:inset-0">
          {product.title}
        </Link>
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{product.desc}</p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <p className="font-semibold text-secondary">
          {product.prices.length > 1 && (
            <span className="mr-1 text-xs font-normal text-muted">from</span>
          )}
          {formatPrice(product.prices[0])}
        </p>
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-content-center rounded-full bg-primary text-secondary transition-colors group-hover:bg-primary-600"
        >
          <FiArrowUpRight size={18} />
        </span>
      </div>
    </div>
  </article>
);

export default memo(MenuItem);
