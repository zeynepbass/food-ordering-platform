import { useFormik } from "formik";
import { toast } from "react-toastify";
import Title from "@/components/common/Title";
import FormFields from "@/components/form/FormFields";
import { passwordFields } from "@/constants/formFields";
import { newPasswordSchema } from "@/schemas/newPasswordSchema";
import userService from "@/services/userService";

const PasswordSettings = ({ user }) => {
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: newPasswordSchema,
    onSubmit: async (values, actions) => {
      try {
        await userService.update(user._id, { password: values.password });
        toast.success("Password updated successfully");
        actions.resetForm();
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={formik.handleSubmit}>
      <Title addClass="text-[40px]">Password</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        <FormFields fields={passwordFields} formik={formik} />
      </div>
      <button className="btn-primary mt-4" type="submit" disabled={formik.isSubmitting}>
        Update
      </button>
    </form>
  );
};

export default PasswordSettings;
