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
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { useGetUserCartQuery } from "../store/product-api";

const Selected = ({ onCountrySelect, onStateSelect }) => {
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
  const token = useSelector((state) => state.auth.token);
  const { data, isFetching, isSuccess, isLoading } = useGetUserCartQuery(
    token,
    {
      skip: !token,
    }
  );
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
              <Input label="First Name" name="firstname" />
              <Input label="Last Name" name="lastname" />
            </div>
            <Input label="Email" name="email" />
            <Input label="Phone" name="phone" />
            <Select label="Country" name="country">
              {countryName &&
                countryName.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
            </Select>
            <Select label="State" name="state">
              {stateName &&
                stateName.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
            </Select>
            <Select label="City" name="city">
              {cityName &&
                cityName.map((city, i) => (
                  <option key={city + i} value={city}>
                    {city}
                  </option>
                ))}
            </Select>

            <div className="addressInputBox box">
              <Input label="Street Address" name="housenumber" />
            </div>

            <Input label="Zip Code" name="zipcode" />

            {/* <Select
              onCountrySelect={onCountryChangeHandler}
              onStateSelect={onStateChangeHandler}
            /> */}
          </Form>
        </Formik>
      </div>

      <div className="order">
        <h2>Your Order</h2>
        {data?.cart.products.map((p, i) => (
          <SideCartItem
            key={i}
            edit={false}
            product={p.productId}
            quantity={p.quantity}
          />
        ))}
        <CartTotal
          btnText="Place Order"
          shipping={data?.cart.shipping}
          total={data?.total}
        />

        <Button onClick={onPlaceOrderHandler} text="Place Order" />
      </div>
    </div>
  );
}

export default Checkout;
