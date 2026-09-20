import Image from "next/image";
import { SIZES } from "@/constants/product";

const SizeSelector = ({ sizeCount, selectedIndex, onSelect }) => (
  <div>
    <h4 className="text-xl font-bold">Choose the size</h4>
    <div className="flex items-center gap-x-20 md:justify-start justify-center">
      {SIZES.slice(0, sizeCount).map((size, index) => (
        <button
          key={size.label}
          type="button"
          aria-pressed={selectedIndex === index}
          className={`relative cursor-pointer ${size.boxClass}`}
          onClick={() => onSelect(index)}
        >
          <Image src="/images/size.png" alt={size.label} fill />
          <span
            className={`absolute top-0 -right-6 text-xs rounded-full px-[5px] font-medium ${
              selectedIndex === index ? "bg-primary" : "bg-gray-200"
            }`}
          >
            {size.label}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default SizeSelector;
