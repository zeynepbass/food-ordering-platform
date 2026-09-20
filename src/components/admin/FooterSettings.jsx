import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Title from "@/components/common/Title";
import FormFields from "@/components/form/FormFields";
import Input from "@/components/form/Input";
import { footerFields } from "@/constants/formFields";
import useFetch from "@/hooks/useFetch";
import { footerSchema } from "@/schemas/footerSchema";
import footerService from "@/services/footerService";

const FooterSettings = () => {
  const { data, setData } = useFetch(footerService.getAll, []);
  const footer = data[0];
  const [socialLinks, setSocialLinks] = useState([]);
  const [icon, setIcon] = useState("fa fa-");
  const [link, setLink] = useState("https://");

  useEffect(() => {
    setSocialLinks(footer?.socialMedia ?? []);
  }, [footer]);

  const initialValues = useMemo(
    () => ({
      location: footer?.location ?? "",
      email: footer?.email ?? "",
      phoneNumber: footer?.phoneNumber ?? "",
      desc: footer?.desc ?? "",
      day: footer?.openingHours?.day ?? "",
      time: footer?.openingHours?.hour ?? "",
    }),
    [footer]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: footerSchema,
    onSubmit: async (values) => {
      const { day, time, ...rest } = values;
      try {
        const saved = await footerService.save(footer?._id, {
          ...rest,
          openingHours: { day, hour: time },
          socialMedia: socialLinks,
        });
        setData([saved]);
        toast.success("Footer updated successfully");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  const handleAddLink = () => {
    setSocialLinks((current) => [...current, { icon, link }]);
    setIcon("fa fa-");
    setLink("https://");
  };

  const handleRemoveLink = (index) => {
    setSocialLinks((current) => current.filter((_, i) => i !== index));
  };

  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={formik.handleSubmit}>
      <Title addClass="text-[40px]">Footer Settings</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        <FormFields fields={footerFields} formik={formik} />
      </div>
      <div className="mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Link Address"
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
          <Input
            placeholder="Icon Name"
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
          />
          <button className="btn-primary" type="button" onClick={handleAddLink}>
            Add
          </button>
        </div>
        <ul className="flex items-center gap-6">
          {socialLinks.map((item, index) => (
            <li key={`${item.icon}-${index}`} className="flex items-center">
              <i className={`${item.icon} text-2xl`}></i>
              <button
                type="button"
                aria-label="Remove link"
                className="text-danger"
                onClick={() => handleRemoveLink(index)}
              >
                <i className="fa fa-trash text-xl ml-2"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn-primary mt-4" type="submit" disabled={formik.isSubmitting}>
        Update
      </button>
    </form>
  );
};

export default FooterSettings;
