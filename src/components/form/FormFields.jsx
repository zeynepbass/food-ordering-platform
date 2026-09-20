import Input from "@/components/form/Input";

const FormFields = ({ fields, formik }) =>
  fields.map(({ name, ...fieldProps }) => (
    <Input
      key={name}
      name={name}
      value={formik.values[name] ?? ""}
      errorMessage={formik.errors[name]}
      touched={formik.touched[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      {...fieldProps}
    />
  ));

export default FormFields;
