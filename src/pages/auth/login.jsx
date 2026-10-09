import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FiGithub } from "react-icons/fi";
import { toast } from "react-toastify";
import AuthCard from "@/components/auth/AuthCard";
import Seo from "@/components/common/Seo";
import FormFields from "@/components/form/FormFields";
import { loginFields } from "@/constants/formFields";
import { loginSchema } from "@/schemas/loginSchema";
import { isGithubEnabled } from "@/server/auth";
import { getSessionEmail } from "@/server/guards";
import { getUserByEmail } from "@/server/queries";
import userService from "@/services/userService";

const LoginPage = ({ githubEnabled }) => {
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
        await router.push(`/profile/${user._id}`);
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <>
      <Seo title="Login" noindex />
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to order and track your deliveries."
        onSubmit={formik.handleSubmit}
        footer={
          <>
            New here?{" "}
            <Link href="/auth/register" className="font-semibold text-secondary underline">
              Create an account
            </Link>
          </>
        }
      >
        <FormFields fields={loginFields} formik={formik} />
        <button className="btn btn-lg btn-primary mt-2" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        {githubEnabled && (
          <button
            className="btn btn-lg btn-secondary"
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/auth/login" })}
          >
            <FiGithub aria-hidden="true" /> Continue with GitHub
          </button>
        )}
      </AuthCard>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const email = await getSessionEmail(req, res);
  const user = email ? await getUserByEmail(email) : null;

  if (user) {
    return { redirect: { destination: `/profile/${user._id}`, permanent: false } };
  }
  return { props: { githubEnabled: isGithubEnabled } };
};

export default LoginPage;
