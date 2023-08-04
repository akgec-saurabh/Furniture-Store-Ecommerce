import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Input from "./Input";
import Button from "./Button";
import { easeInOut, motion } from "framer-motion";
import { basicVariants } from "../helpers/framer-variants";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/auth-slice";

const initialRegisterValue = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const yupValidationSchema = Yup.object({
  firstname: Yup.string()
    .max(20, "Must be 20 character or less")
    .required("Required"),

  lastname: Yup.string()
    .max(20, "Must be 20 character or less")
    .required("Required"),

  email: Yup.string().email("Invalid Email Address").required("Required"),

  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .required("Required"),
});

function RegisterForm() {
  return (
    <div className="registerForm">
      <h2>Create account</h2>
      <Formik
        initialValues={initialRegisterValue}
        validationSchema={yupValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          regUser({ ...values });
          console.log("Registering User with ", values);

          setSubmitting(false);
        }}
      >
        <Form>
          <Input label="First Name" name="firstname" />
          <Input label="Last Name" name="lastname" />
          <Input label="Email" name="email" />
          <Input label="Password" type="password" name="password" />

          <Button type="submit" text="Create Account" />
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterForm;
