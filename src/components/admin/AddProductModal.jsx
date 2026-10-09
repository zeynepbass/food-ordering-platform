import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "@/components/common/Modal";
import Input from "@/components/form/Input";
import { MULTI_SIZE_CATEGORY, SIZES } from "@/constants/product";
import useFetch from "@/hooks/useFetch";
import categoryService from "@/services/categoryService";
import imageService from "@/services/imageService";
import productService from "@/services/productService";
import { formatPrice } from "@/utils/format";

const initialForm = { title: "", desc: "", category: "", prices: [] };
const emptyExtra = { text: "", price: "" };

const AddProductModal = ({ onClose, onCreated }) => {
  const { data: categories, loading } = useFetch(categoryService.getAll, []);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const previewUrl = useRef("");
  const [extra, setExtra] = useState(emptyExtra);
  const [extraOptions, setExtraOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const category = form.category || categories[0]?.title.toLowerCase() || "";
  const sizeCount = category === MULTI_SIZE_CATEGORY ? SIZES.length : 1;
  const hasCategories = categories.length > 0;

  const releasePreview = () => {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
  };

  useEffect(() => releasePreview, []);

  const handleFile = (event) => {
    const selected = event.target.files[0] ?? null;

    releasePreview();
    previewUrl.current = selected ? URL.createObjectURL(selected) : "";
    setFile(selected);
    setPreview(previewUrl.current);
  };

  const handleField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePrice = (index, value) => {
    setForm((current) => {
      const prices = [...current.prices];
      prices[index] = value;
      return { ...current, prices };
    });
  };

  const handleAddExtra = () => {
    const text = extra.text.trim();
    if (!text || extra.price === "" || Number(extra.price) < 0) {
      toast.error("Enter a name and a price for the extra.");
      return;
    }
    setExtraOptions((current) => [...current, { text, price: Number(extra.price) }]);
    setExtra(emptyExtra);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prices = Array.from({ length: sizeCount }, (_, index) => Number(form.prices[index]));
    const hasAllPrices = prices.every((price) => price > 0);

    if (!file || !form.title.trim() || !form.desc.trim() || !category || !hasAllPrices) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const img = await imageService.upload(file);
      const product = await productService.create({
        img,
        title: form.title,
        desc: form.desc,
        category,
        prices,
        extraOptions,
      });
      toast.success("Product created");
      onCreated(product);
    } catch (err) {
      toast.error(err.message);
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Add a product" onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="product-image" className="field-label">
            Image
          </label>
          <div className="flex items-center gap-4">
            {preview && (
              <Image
                src={preview}
                alt="Selected image preview"
                width={56}
                height={56}
                unoptimized
                className="h-14 w-14 rounded-xl bg-primary-50 object-contain"
              />
            )}
            <input
              id="product-image"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-secondary-600"
              onChange={handleFile}
            />
          </div>
        </div>
        <Input
          label="Title"
          name="title"
          maxLength={60}
          value={form.title}
          onChange={handleField}
        />
        <div>
          <label htmlFor="product-desc" className="field-label">
            Description
          </label>
          <textarea
            id="product-desc"
            name="desc"
            rows={3}
            maxLength={300}
            className="field-input"
            value={form.desc}
            onChange={handleField}
          />
        </div>
        <div>
          <label htmlFor="product-category" className="field-label">
            Category
          </label>
          <select
            id="product-category"
            name="category"
            className="field-input"
            value={category}
            onChange={handleField}
            disabled={!hasCategories}
          >
            {categories.map((item) => (
              <option key={item._id} value={item.title.toLowerCase()}>
                {item.title}
              </option>
            ))}
          </select>
          {!loading && !hasCategories && (
            <p className="field-error">Create a category first in the Categories section.</p>
          )}
        </div>
        <fieldset>
          <legend className="field-label">{sizeCount > 1 ? "Prices by size" : "Price"}</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {SIZES.slice(0, sizeCount).map((size, index) => (
              <Input
                key={size}
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                aria-label={sizeCount > 1 ? `${size} price` : "Price"}
                placeholder={sizeCount > 1 ? size : "0.00"}
                value={form.prices[index] ?? ""}
                onChange={(event) => handlePrice(index, event.target.value)}
              />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="field-label">Extras (optional)</legend>
          <div className="flex flex-wrap items-start gap-3 sm:flex-nowrap">
            <Input
              aria-label="Extra name"
              placeholder="e.g. Extra cheese"
              maxLength={40}
              value={extra.text}
              onChange={(event) => setExtra({ ...extra, text: event.target.value })}
            />
            <Input
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              aria-label="Extra price"
              placeholder="0.00"
              className="sm:max-w-[8rem]"
              value={extra.price}
              onChange={(event) => setExtra({ ...extra, price: event.target.value })}
            />
            <button type="button" className="btn btn-outline" onClick={handleAddExtra}>
              Add
            </button>
          </div>
          {extraOptions.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {extraOptions.map((item, index) => (
                <li key={`${item.text}-${index}`} className="badge badge-neutral">
                  {item.text} · {formatPrice(item.price)}
                  <button
                    type="button"
                    aria-label={`Remove ${item.text}`}
                    className="rounded-full hover:text-danger"
                    onClick={() =>
                      setExtraOptions((current) => current.filter((_, i) => i !== index))
                    }
                  >
                    <FiX aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>
        <div className="mt-2 flex justify-end gap-3">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting || !hasCategories}>
            {submitting ? "Creating..." : "Create product"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
