import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AuthCard from "@/components/auth/AuthCard";
import Seo from "@/components/common/Seo";
import FormFields from "@/components/form/FormFields";
import { registerFields } from "@/constants/formFields";
import { registerSchema } from "@/schemas/registerSchema";
import userService from "@/services/userService";

const RegisterPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { fullName: "", email: "", password: "", confirmPassword: "" },
    validationSchema: registerSchema,
    onSubmit: async ({ fullName, email, password }) => {
      try {
        await userService.register({ fullName, email, password });
        toast.success("Account created. You can sign in now.");
        await router.push("/auth/login");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <>
      <Seo title="Register" noindex />
      <AuthCard
        title="Create an account"
        subtitle="Save your address and keep track of every order."
        onSubmit={formik.handleSubmit}
        footer={
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-secondary underline">
              Sign in
            </Link>
          </>
        }
      >
        <FormFields fields={registerFields} formik={formik} />
        <button className="btn btn-lg btn-primary mt-2" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </AuthCard>
    </>
  );
};

export default RegisterPage;
