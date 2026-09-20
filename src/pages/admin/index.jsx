import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Seo from "@/components/common/Seo";
import Title from "@/components/common/Title";
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
    onSubmit: async (values, actions) => {
      try {
        await adminService.login(values);
        actions.resetForm();
        toast.success("Admin login success!");
        router.push("/admin/profile");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <div className="container mx-auto py-3">
      <Seo title="Admin Login" />
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Admin Login</Title>
        <div className="flex flex-col gap-y-3 w-full">
          <FormFields fields={adminLoginFields} formik={formik} />
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button className="btn-primary" type="submit" disabled={formik.isSubmitting}>
            LOGIN
          </button>
          <Link href="/" className="text-sm underline text-secondary">
            Home Page
          </Link>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  if (isAdminRequest(req)) {
    return { redirect: { destination: "/admin/profile", permanent: false } };
  }
  return { props: {} };
};

export default AdminLoginPage;
