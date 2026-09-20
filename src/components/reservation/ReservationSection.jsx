import { useFormik } from "formik";
import { toast } from "react-toastify";
import Title from "@/components/common/Title";
import FormFields from "@/components/form/FormFields";
import { MAP_EMBED_URL } from "@/constants/content";
import { reservationFields } from "@/constants/formFields";
import { reservationSchema } from "@/schemas/reservationSchema";
import reservationService from "@/services/reservationService";

const initialValues = {
  fullName: "",
  phoneNumber: "",
  email: "",
  persons: "",
  date: "",
};

const ReservationSection = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: reservationSchema,
    onSubmit: async (values, actions) => {
      try {
        await reservationService.create(values);
        toast.success("Your table has been booked!");
        actions.resetForm();
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <section className="container mx-auto py-12">
      <Title addClass="text-[40px] mb-10">Book A Table</Title>
      <div className="flex justify-between flex-wrap-reverse gap-10">
        <form className="lg:flex-1 w-full" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-y-3">
            <FormFields fields={reservationFields} formik={formik} />
          </div>
          <button className="btn-primary mt-4" type="submit" disabled={formik.isSubmitting}>
            BOOK NOW
          </button>
        </form>
        <div className="lg:flex-1 w-full min-h-[300px]">
          <iframe
            title="Restaurant location"
            src={MAP_EMBED_URL}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
