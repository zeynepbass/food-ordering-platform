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

const ReservationSection = ({ headingAs = "h2" }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: reservationSchema,
    onSubmit: async (values, actions) => {
      try {
        // datetime-local has no timezone; send an absolute instant so the server stores the right time.
        await reservationService.create({
          ...values,
          date: new Date(values.date).toISOString(),
        });
        toast.success("Your table has been booked!");
        actions.resetForm();
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <section className="container py-16">
      <p className="eyebrow">Reservation</p>
      <Title as={headingAs} className="section-title mt-3">
        Book a table
      </Title>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form className="card flex flex-col gap-4 p-6 sm:p-8" onSubmit={formik.handleSubmit} noValidate>
          <FormFields fields={reservationFields} formik={formik} />
          <button
            className="btn btn-primary mt-2 self-start"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Booking..." : "Book now"}
          </button>
        </form>
        <div className="card min-h-[320px] overflow-hidden">
          <iframe
            title="Restaurant location"
            src={MAP_EMBED_URL}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[320px] w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
