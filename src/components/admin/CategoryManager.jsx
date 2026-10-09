import { useState } from "react";
import { FiGrid, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import DataState from "@/components/common/DataState";
import Input from "@/components/form/Input";
import useFetch from "@/hooks/useFetch";
import categoryService from "@/services/categoryService";

const CategoryManager = () => {
  const { data: categories, setData, loading, error, refetch } = useFetch(
    categoryService.getAll,
    []
  );
  const [title, setTitle] = useState("");
  const [isCreating, setCreating] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setDeleting] = useState(false);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    setCreating(true);
    try {
      const created = await categoryService.create(title.trim());
      setData((current) => [...current, created]);
      setTitle("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await categoryService.remove(pendingDelete._id);
      setData((current) => current.filter((category) => category._id !== pendingDelete._id));
      toast.success("Category deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  };

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <form className="card flex items-end gap-3 p-5" onSubmit={handleCreate}>
        <Input
          label="New category"
          placeholder="e.g. Pizza"
          maxLength={60}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={isCreating || !title.trim()}>
          <FiPlus aria-hidden="true" /> Add
        </button>
      </form>
      <div className="card overflow-hidden">
        <DataState
          loading={loading}
          error={error}
          onRetry={refetch}
          isEmpty={categories.length === 0}
          empty={{
            icon: FiGrid,
            title: "No categories yet",
            text: "Categories group the products shown on the menu.",
          }}
        >
          <ul className="divide-y divide-line">
            {categories.map((category) => (
              <li key={category._id} className="flex items-center justify-between gap-4 px-5 py-3">
                <span className="font-semibold text-secondary">{category.title}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => setPendingDelete(category)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </DataState>
      </div>
      {pendingDelete && (
        <ConfirmDialog
          danger
          title="Delete category?"
          message={`"${pendingDelete.title}" will be removed. Categories that still contain products cannot be deleted.`}
          confirmLabel="Delete"
          loading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
};

export default CategoryManager;
