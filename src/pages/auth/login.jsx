import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Seo from "@/components/common/Seo";
import Title from "@/components/common/Title";
import FormFields from "@/components/form/FormFields";
import { loginFields } from "@/constants/formFields";
import { loginSchema } from "@/schemas/loginSchema";
import { authOptions } from "@/server/auth";
import { getUserByEmail } from "@/server/queries";
import userService from "@/services/userService";

const LoginPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result = await signIn("credentials", { redirect: false, ...values });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      try {
        const user = await userService.getByEmail(values.email);
        router.push(`/profile/${user._id}`);
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <div className="container mx-auto">
      <Seo title="Login" />
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Login</Title>
        <div className="flex flex-col gap-y-3 w-full">
          <FormFields fields={loginFields} formik={formik} />
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button className="btn-primary" type="submit" disabled={formik.isSubmitting}>
            LOGIN
          </button>
          <button
            className="btn-primary !bg-secondary"
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/auth/login" })}
          >
            <i className="fa fa-github mr-2 text-lg"></i>
            GITHUB
          </button>
          <Link href="/auth/register" className="text-sm underline text-secondary">
            Do you not have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user?.email ? await getUserByEmail(session.user.email) : null;

  if (user) {
    return { redirect: { destination: `/profile/${user._id}`, permanent: false } };
  }
  return { props: {} };
};

export default LoginPage;
