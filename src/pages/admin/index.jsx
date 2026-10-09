import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AuthCard from "@/components/auth/AuthCard";
import Logo from "@/components/common/Logo";
import Seo from "@/components/common/Seo";
import FormFields from "@/components/form/FormFields";
import { adminLoginFields } from "@/constants/formFields";
import { adminSchema } from "@/schemas/adminSchema";
import { isAdminRequest } from "@/server/guards";
import adminService from "@/services/adminService";

const AdminLoginPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: adminSchema,
    onSubmit: async (values) => {
      try {
        await adminService.login(values);
        await router.push("/admin/profile");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <main className="min-h-screen bg-secondary-900">
      <Seo title="Admin Login" noindex />
      <div className="container pt-10 text-center text-white">
        <Logo />
      </div>
      <AuthCard
        title="Admin sign in"
        subtitle="Manage products, orders and reservations."
        onSubmit={formik.handleSubmit}
        footer={
          <Link href="/" className="font-semibold text-secondary underline">
            Back to the site
          </Link>
        }
      >
        <FormFields fields={adminLoginFields} formik={formik} />
        <button className="btn btn-lg btn-primary mt-2" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </AuthCard>
    </main>
  );
};

AdminLoginPage.getLayout = (page) => page;

export const getServerSideProps = async ({ req }) => {
  if (isAdminRequest(req)) {
    return { redirect: { destination: "/admin/profile", permanent: false } };
  }
  return { props: {} };
};

export default AdminLoginPage;
