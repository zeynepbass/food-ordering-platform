import { useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Modal from "@/components/common/Modal";
import { MULTI_SIZE_CATEGORY, SIZES } from "@/constants/product";
import useFetch from "@/hooks/useFetch";
import categoryService from "@/services/categoryService";
import imageService from "@/services/imageService";
import productService from "@/services/productService";

const fieldClass = "border-2 p-1 text-sm px-1 outline-none";
const priceClass = "border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36";

const initialForm = { title: "", desc: "", category: "", prices: [] };
const emptyExtra = { text: "", price: "" };

const AddProductModal = ({ onClose, onCreated }) => {
  const { data: categories } = useFetch(categoryService.getAll, []);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [extra, setExtra] = useState(emptyExtra);
  const [extraOptions, setExtraOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const category = form.category || categories[0]?.title.toLowerCase() || "";
  const sizeCount = category === MULTI_SIZE_CATEGORY ? SIZES.length : 1;

  const priceInputs = useMemo(() => SIZES.slice(0, sizeCount), [sizeCount]);

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

  const handleFile = (event) => {
    const selected = event.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleAddExtra = () => {
    if (!extra.text || !extra.price) return;
    setExtraOptions((current) => [...current, { text: extra.text, price: Number(extra.price) }]);
    setExtra(emptyExtra);
  };

  const handleCreate = async () => {
    const prices = form.prices.slice(0, sizeCount).map(Number);
    const hasAllPrices = prices.length === sizeCount && prices.every((price) => price > 0);

    if (!file || !form.title || !form.desc || !category || !hasAllPrices) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const img = await imageService.upload(file);
      await productService.create({
        img,
        title: form.title,
        desc: form.desc,
        category,
        prices,
        extraOptions,
      });
      toast.success("Product created successfully!");
      onCreated();
    } catch (err) {
      toast.error(err.message);
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Add a New Product" onClose={onClose}>
      <div className="flex flex-col text-sm mt-6">
        <label className="flex gap-2 items-center cursor-pointer">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <span className="btn-primary !rounded-none !bg-blue-600">Choose an Image</span>
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={48}
              height={48}
              unoptimized
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
        </label>
      </div>
      <div className="flex flex-col text-sm mt-4">
        <span className="font-semibold mb-[2px]">Title</span>
        <input
          type="text"
          name="title"
          className={fieldClass}
          placeholder="Write a title..."
          value={form.title}
          onChange={handleField}
        />
      </div>
      <div className="flex flex-col text-sm mt-4">
        <span className="font-semibold mb-[2px]">Description</span>
        <textarea
          name="desc"
          className={fieldClass}
          placeholder="Write a description..."
          value={form.desc}
          onChange={handleField}
        />
      </div>
      <div className="flex flex-col text-sm mt-4">
        <span className="font-semibold mb-[2px]">Select Category</span>
        <select name="category" className={fieldClass} value={category} onChange={handleField}>
          {categories.map((item) => (
            <option key={item._id} value={item.title.toLowerCase()}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col text-sm mt-4 w-full">
        <span className="font-semibold mb-[2px]">Prices</span>
        <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
          {priceInputs.map((size, index) => (
            <input
              key={size.label}
              type="number"
              min="0"
              className={priceClass}
              placeholder={sizeCount > 1 ? size.label.toLowerCase() : "price"}
              value={form.prices[index] ?? ""}
              onChange={(event) => handlePrice(index, event.target.value)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col text-sm mt-4 w-full">
        <span className="font-semibold mb-[2px]">Extra</span>
        <div className="flex gap-6 w-full md:flex-nowrap flex-wrap">
          <input
            type="text"
            className={priceClass}
            placeholder="item"
            value={extra.text}
            onChange={(event) => setExtra({ ...extra, text: event.target.value })}
          />
          <input
            type="number"
            min="0"
            className={priceClass}
            placeholder="price"
            value={extra.price}
            onChange={(event) => setExtra({ ...extra, price: event.target.value })}
          />
          <button type="button" className="btn-primary ml-auto" onClick={handleAddExtra}>
            Add
          </button>
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {extraOptions.map((item, index) => (
            <button
              key={`${item.text}-${index}`}
              type="button"
              title="Remove"
              className="inline-block border border-orange-500 text-orange-500 p-1 rounded-xl text-xs"
              onClick={() =>
                setExtraOptions((current) => current.filter((_, i) => i !== index))
              }
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="btn-primary !bg-success"
          onClick={handleCreate}
          disabled={submitting}
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
