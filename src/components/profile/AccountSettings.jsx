import { useFormik } from "formik";
import { toast } from "react-toastify";
import FormFields from "@/components/form/FormFields";
import { profileFields } from "@/constants/formFields";
import { profileSchema } from "@/schemas/profileSchema";
import userService from "@/services/userService";

const AccountSettings = ({ user }) => {
  const formik = useFormik({
    initialValues: {
      fullName: user.fullName ?? "",
      phoneNumber: user.phoneNumber ?? "",
      email: user.email ?? "",
      address: user.address ?? "",
      job: user.job ?? "",
      bio: user.bio ?? "",
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        await userService.update(user._id, values);
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <h1 className="section-title">Account settings</h1>
      <p className="mt-1 text-sm text-muted">Your delivery address is used for new orders.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FormFields fields={profileFields} formik={formik} />
      </div>
      <button className="btn btn-primary mt-6" type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
};

export default AccountSettings;
