import { useFormik } from "formik";
import { toast } from "react-toastify";
import Title from "@/components/common/Title";
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
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={formik.handleSubmit}>
      <Title addClass="text-[40px]">Account Settings</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        <FormFields fields={profileFields} formik={formik} />
      </div>
      <button className="btn-primary mt-4" type="submit" disabled={formik.isSubmitting}>
        Update
      </button>
    </form>
  );
};

export default AccountSettings;
