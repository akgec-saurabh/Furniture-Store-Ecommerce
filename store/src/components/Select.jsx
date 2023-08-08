import { useField } from "formik";
import React from "react";

function Select({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="select-box">
      <label className="selectLabel" htmlFor={props.id || props.name}>
        {label}
      </label>
      <select className="selectInput" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}
export default Select;
