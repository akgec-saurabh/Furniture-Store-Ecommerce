import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useField } from "formik";
import React, { useState } from "react";

function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  const [showPasword, setShowPassword] = useState(false);
  const onTogglePasswordHandler = () => {
    setShowPassword((prv) => !prv);
  };

  if (props.type === "password") {
    if (showPasword) {
      props.type = "text";
    }
  }
  return (
    <div className="input-box">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="text-input-wrapper">
        <input className="text-input" {...field} {...props} />

        {props.name === "password" && (
          <div onClick={onTogglePasswordHandler} className="icon-wrapper">
            {!showPasword && (
              <EyeOutlined className="show-password-icon icon" />
            )}
            {showPasword && (
              <EyeInvisibleOutlined className="hide-password-icon icon" />
            )}
          </div>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default Input;
