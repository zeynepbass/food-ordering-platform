import { useState } from "react";
import { toast } from "react-toastify";
import Title from "@/components/common/Title";
import Input from "@/components/form/Input";
import useFetch from "@/hooks/useFetch";
import categoryService from "@/services/categoryService";

const CategoryManager = () => {
  const { data: categories, setData } = useFetch(categoryService.getAll, []);
  const [title, setTitle] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      const created = await categoryService.create(title.trim());
      setData((current) => [...current, created]);
      setTitle("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await categoryService.remove(id);
      setData((current) => current.filter((category) => category._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Categories</Title>
      <div className="mt-5">
        <form className="flex gap-4 flex-1 items-center" onSubmit={handleCreate}>
          <Input
            placeholder="Add a new Category..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button className="btn-primary" type="submit">
            Add
          </button>
        </form>
        <div className="mt-10 max-h-[250px] overflow-auto pb-4">
          {categories.map((category) => (
            <div className="flex justify-between mt-4" key={category._id}>
              <b className="text-xl">{category.title}</b>
              <button
                type="button"
                className="btn-primary !bg-danger"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
