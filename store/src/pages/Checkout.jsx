import React, { useEffect, useState } from "react";
import {
  useGetAllCitiesQuery,
  useGetAllCountryQuery,
  useGetStatesQuery,
} from "../store/country-slice";
import { useDispatch, useSelector } from "react-redux";
import SideCartItem from "../components/SideCartItem";
import CartTotal from "../components/CartTotal";
import { Link, redirect, useNavigate } from "react-router-dom";

import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";

const Select = ({ onCountrySelect, onStateSelect }) => {
  const { values, handleSubmit, isSubmitting, handleReset, setSubmitting } =
    useFormikContext();

  useEffect(() => {
    onCountrySelect(values.country);
  }, [values.country]);

  useEffect(() => {
    onStateSelect(values.state);
  }, [values.state]);

  return (
    <div className="form-control">
      <button className="btn btnReset" onClick={handleReset}>
        Reset
      </button>
      <button
        type="submit"
        className="btn btnSave"
        disabled={isSubmitting}
        onClick={() => {
          setSubmitting(false);
          handleSubmit();
        }}
      >
        Save
      </button>
    </div>
  );
};

function Checkout() {
  const userId = useSelector((state) => state.auth.userId);
  const { cart, total, shipping } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [country, setCountry] = useState({
    code: "",
    stateCode: "",
  });
  const { data: countryName } = useGetAllCountryQuery();
  const { data: stateName } = useGetStatesQuery(country.code, {
    skip: country.code === "",
  });
  const { data: cityName } = useGetAllCitiesQuery(country, {
    skip: country.stateCode === "",
  });

  const onCountryChangeHandler = (code) => {
    console.log("country:" + code);
    setCountry((prv) => ({ stateCode: "", code }));
  };

  const onStateChangeHandler = (stateCode) => {
    console.log("state selected" + stateCode);
    setCountry((prv) => ({ ...prv, stateCode: stateCode }));
  };

  const onSubmitHandler = (values) => {
    console.log(values);
  };

  const onPlaceOrderHandler = () => {
    console.log(cart);

    //TODO Replace with redux query mutataion

    const sendReq = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API}/payment/checkout-session`,
        {
          method: "POST",
          body: JSON.stringify({ userId, cart, shipping }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Could not go to checkout page");
      }

      const responseData = await response.json();
      if (responseData.url) {
        // navigate(`/${responseData.url}`);
        // redirect(responseData.url);
        window.open(responseData.url);
      }
    };

    try {
      sendReq();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="checkout">
      <div className="billing">
        <h2>Billing details</h2>

        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            country: "",
            state: "",
            city: "",
            housenumber: "",
            apartment: "",
            zipcode: "",
          }}
          validationSchema={Yup.object({
            firstname: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastname: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phone: Yup.string()
              .max(10, "Must be 10 character")
              .min(10, "Must be 10 character")
              .required("Required"),
            country: Yup.string().required("Required"),
            state: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            housenumber: Yup.string()
              .max(20, "Must be 20 character or less")
              .required("Required"),
            apartment: Yup.string()
              .max(20, "Must be 20 character or less")
              .required("Required"),

            zipcode: Yup.string()
              .min(5, "Must be 5 character or more")
              .max(10, "Must be 10 character or less")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // onSaveHandler(values);
            console.log("inside", values);
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="nameInputBox box">
              <div className="firstnameInputBox box">
                <label htmlFor="firstname">First Name</label>
                <Field name="firstname" type="text" />
                <ErrorMessage name="firstname" />
              </div>

              <div className="lastnameInputBox box">
                <label htmlFor="lastname">Last Name</label>
                <Field name="lastname" type="text" />
                <ErrorMessage name="lastname" />
              </div>
            </div>

            <div className="emailInputBox box">
              <label htmlFor="email">Email</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email" />
            </div>

            <div className="phoneInputBox box">
              <label htmlFor="phone">Phone</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" />
            </div>

            <div className="countryInputBox box">
              <label htmlFor="country">Country</label>
              <Field name="country" as="select">
                {countryName &&
                  countryName.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="country" />
            </div>

            <div className="stateInputBox box">
              <label htmlFor="state">State</label>
              <Field as="select" name="state">
                <option disabled value="">
                  Select State
                </option>
                {stateName &&
                  stateName.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="state" />
            </div>

            <div className="cityInputBox box">
              <label htmlFor="city">City</label>
              <Field as="select" name="city">
                <option disabled value="">
                  Select City
                </option>
                {cityName &&
                  cityName.map((city, i) => (
                    <option key={city + i} value={city}>
                      {city}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="city" />
            </div>

            <div className="addressInputBox box">
              <label htmlFor="address">Street Address</label>
              <Field name="housenumber" type="text" />
              <ErrorMessage name="housenumber" />
              <Field name="apartment" type="text" />
              <ErrorMessage name="apartment" />
            </div>

            <div className="zipcodeInputBox box">
              <label htmlFor="zipcode">Zip Code</label>
              <Field name="zipcode" type="text" />
              <ErrorMessage name="zipcode" />
            </div>

            <Select
              onCountrySelect={onCountryChangeHandler}
              onStateSelect={onStateChangeHandler}
            />
          </Form>
        </Formik>
      </div>

      <div className="order">
        <h2>Your Order</h2>
        {cart.map((p) => (
          <SideCartItem key={p.id} edit={false} product={p} />
        ))}
        <CartTotal btnText="Place Order" total={total} />

        <button onClick={onPlaceOrderHandler} className="btn">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
