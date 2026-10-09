import { SIZES } from "@/constants/product";
import { formatPrice } from "@/utils/format";

const SizeSelector = ({ prices, selectedIndex, onSelect }) => (
  <fieldset>
    <legend className="field-label">Choose a size</legend>
    <div className="flex flex-wrap gap-2">
      {prices.map((price, index) => (
        <label
          key={SIZES[index]}
          className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
            selectedIndex === index
              ? "border-primary bg-primary-50 text-secondary"
              : "border-line bg-white text-muted hover:border-primary/60"
          }`}
        >
          <input
            type="radio"
            name="size"
            className="sr-only"
            checked={selectedIndex === index}
            onChange={() => onSelect(index)}
          />
          <span className="block font-semibold text-secondary">{SIZES[index]}</span>
          <span className="block text-xs">{formatPrice(price)}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

export default SizeSelector;
