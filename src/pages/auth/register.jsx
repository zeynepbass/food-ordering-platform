import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Seo from "@/components/common/Seo";
import Title from "@/components/common/Title";
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
        toast.success("User created successfully");
        router.push("/auth/login");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <div className="container mx-auto">
      <Seo title="Register" />
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Register</Title>
        <div className="flex flex-col gap-y-3 w-full">
          <FormFields fields={registerFields} formik={formik} />
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button className="btn-primary" type="submit" disabled={formik.isSubmitting}>
            REGISTER
          </button>
          <Link href="/auth/login" className="text-sm underline text-secondary">
            Do you have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
