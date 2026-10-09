import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import FormFields from "@/components/form/FormFields";
import { currentPasswordField, passwordFields } from "@/constants/formFields";
import { changePasswordSchema, newPasswordSchema } from "@/schemas/newPasswordSchema";
import userService from "@/services/userService";

const PasswordSettings = ({ user }) => {
  const [hasPassword, setHasPassword] = useState(user.hasPassword);

  const formik = useFormik({
    initialValues: { currentPassword: "", password: "", confirmPassword: "" },
    validationSchema: hasPassword ? changePasswordSchema : newPasswordSchema,
    onSubmit: async ({ currentPassword, password }, actions) => {
      try {
        await userService.update(user._id, { currentPassword, password });
        toast.success("Password updated successfully");
        setHasPassword(true);
        actions.resetForm();
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <h1 className="section-title">Password</h1>
      <p className="mt-1 text-sm text-muted">
        Use at least 8 characters with an uppercase letter, a number and a special character.
      </p>
      <div className="mt-6 grid max-w-md gap-4">
        <FormFields
          fields={hasPassword ? [currentPasswordField, ...passwordFields] : passwordFields}
          formik={formik}
        />
      </div>
      <button className="btn btn-primary mt-6" type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Saving..." : "Update password"}
      </button>
    </form>
  );
};

export default PasswordSettings;
