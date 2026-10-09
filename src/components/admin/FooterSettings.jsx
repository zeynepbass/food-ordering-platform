import { useState } from "react";
import { useFormik } from "formik";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import DataState from "@/components/common/DataState";
import SocialIcon, { SOCIAL_PLATFORMS, findSocialPlatform } from "@/components/common/SocialIcon";
import FormFields from "@/components/form/FormFields";
import Input from "@/components/form/Input";
import { footerFields } from "@/constants/formFields";
import useFetch from "@/hooks/useFetch";
import { footerSchema, socialLinkSchema } from "@/schemas/footerSchema";
import footerService from "@/services/footerService";

const emptyLink = { icon: SOCIAL_PLATFORMS[0].key, link: "" };

const FooterForm = ({ footer, onSaved }) => {
  const [socialLinks, setSocialLinks] = useState(
    () => footer?.socialMedia?.map(({ icon, link }) => ({ icon, link })) ?? []
  );
  const [newLink, setNewLink] = useState(emptyLink);

  const formik = useFormik({
    initialValues: {
      location: footer?.location ?? "",
      email: footer?.email ?? "",
      phoneNumber: footer?.phoneNumber ?? "",
      desc: footer?.desc ?? "",
      day: footer?.openingHours?.day ?? "",
      time: footer?.openingHours?.hour ?? "",
    },
    validationSchema: footerSchema,
    onSubmit: async ({ day, time, ...details }) => {
      try {
        const saved = await footerService.save(footer?._id, {
          ...details,
          openingHours: { day, hour: time },
          socialMedia: socialLinks,
        });
        onSaved(saved);
        toast.success("Footer updated");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  const handleAddLink = async () => {
    try {
      const link = await socialLinkSchema.validate(newLink);
      setSocialLinks((current) => [...current, link]);
      setNewLink(emptyLink);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRemoveLink = (index) => {
    setSocialLinks((current) => current.filter((_, i) => i !== index));
  };

  return (
    <form className="card max-w-3xl p-6 sm:p-8" onSubmit={formik.handleSubmit} noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <FormFields fields={footerFields} formik={formik} />
        </div>
        <fieldset className="mt-8 border-t border-line pt-6">
          <legend className="field-label">Social links</legend>
          <div className="flex flex-wrap items-start gap-3 sm:flex-nowrap">
            <select
              aria-label="Platform"
              className="field-input sm:max-w-[10rem]"
              value={newLink.icon}
              onChange={(event) => setNewLink({ ...newLink, icon: event.target.value })}
            >
              {SOCIAL_PLATFORMS.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <Input
              type="url"
              aria-label="Link address"
              placeholder="https://"
              value={newLink.link}
              onChange={(event) => setNewLink({ ...newLink, link: event.target.value })}
            />
            <button className="btn btn-outline" type="button" onClick={handleAddLink}>
              Add
            </button>
          </div>
          {socialLinks.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {socialLinks.map((item, index) => (
                <li
                  key={`${item.link}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-2 text-sm"
                >
                  <SocialIcon icon={item.icon} className="shrink-0 text-secondary" />
                  <span className="font-medium text-secondary">
                    {findSocialPlatform(item.icon)?.label ?? "Link"}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-muted">{item.link}</span>
                  <button
                    type="button"
                    aria-label="Remove link"
                    className="grid h-8 w-8 place-content-center rounded-full text-muted hover:bg-red-50 hover:text-danger"
                    onClick={() => handleRemoveLink(index)}
                  >
                    <FiX aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>
        <button className="btn btn-primary mt-8" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Saving..." : "Save changes"}
        </button>
    </form>
  );
};

// Keyed by the saved document so the form state is rebuilt from fresh data instead of synced in an effect.
const FooterSettings = () => {
  const { data, setData, loading, error, refetch } = useFetch(footerService.getAll, []);
  const footer = data[0];

  return (
    <DataState loading={loading} error={error} onRetry={refetch}>
      <FooterForm
        key={footer?.updatedAt ?? "new"}
        footer={footer}
        onSaved={(saved) => setData([saved])}
      />
    </DataState>
  );
};

export default FooterSettings;
