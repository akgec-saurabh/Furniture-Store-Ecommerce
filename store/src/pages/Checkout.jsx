import React, { useEffect, useState } from "react";
import {
  useGetAllCitiesQuery,
  useGetAllCountryQuery,
  useGetStatesQuery,
} from "../store/country-slice";
import { useDispatch, useSelector } from "react-redux";
import SideCartItem from "../components/SideCartItem";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";
import { checkoutFormSliceActions } from "../store/ checkoutform-slice";

function Checkout() {
  const {
    firstname,
    lastname,
    housenumber,
    apartment,
    zipcode,
    phone,
    email,
    country: countryname,
    state: statename,
    city: cityname,
    error,
  } = useSelector((state) => state.checkoutForm);
  const { cart, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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

  const onCountryChangeHandler = (e) => {
    console.log(e.target.value);
    setCountry((prv) => ({ stateCode: "", code: e.target.value }));
    dispatch(
      checkoutFormSliceActions.updateForm({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const onStateChangeHandler = (e) => {
    setCountry((prv) => ({ ...prv, stateCode: e.target.value }));
    dispatch(
      checkoutFormSliceActions.updateForm({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const onChangeHandler = (e) => {
    dispatch(
      checkoutFormSliceActions.updateForm({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const onSubmitHandler = () => {
    console.log();
  };

  return (
    <div className="checkout">
      <div className="billing">
        <h2>Billing details</h2>
        <div className="nameInputBox box">
          <div className="firstname">
            <label className="label_checkout" htmlFor="firstname">
              First Name
            </label>
            <input
              onChange={onChangeHandler}
              value={firstname}
              name="firstname"
              type="text"
              id="firstname"
            />
            <span className="error">{error.firstname}</span>
          </div>
          <div className="lastname">
            <label className="label_checkout" htmlFor="lastname">
              LastName
            </label>
            <input
              onChange={onChangeHandler}
              value={lastname}
              name="lastname"
              type="text"
              id="lastname"
            />
          </div>
        </div>
        <div className="countryInputBox box">
          <label className="label_checkout" htmlFor="country">
            Country
          </label>
          <select
            defaultValue={0}
            onChange={onCountryChangeHandler}
            name="country"
            id="country"
          >
            <option disabled value="0">
              Select Country
            </option>
            {countryName &&
              countryName.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
          </select>
        </div>
        <div className="addressInputBox box">
          <label className="label_checkout" htmlFor="address">
            Street adress
          </label>
          <input
            onChange={onChangeHandler}
            value={housenumber}
            placeholder="House number and street name"
            type="text"
            id="address"
            name="housenumber"
          />
          <input
            onChange={onChangeHandler}
            value={apartment}
            placeholder="Apartment, suite, unit, etc."
            type="text"
            name="apartment"
          />
        </div>
        <div className="stateInputBox box">
          <label className="label_checkout" htmlFor="state">
            State
          </label>
          <select
            defaultValue={0}
            onChange={onStateChangeHandler}
            name="state"
            id="state"
          >
            <option disabled value="0">
              Select State
            </option>
            {stateName &&
              stateName.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
          </select>
        </div>
        <div className="cityInputBox box">
          <label className="label_checkout" htmlFor="city">
            Town/City
          </label>
          <select
            defaultValue={0}
            onChange={onChangeHandler}
            name="city"
            id="city"
          >
            <option disabled value="0">
              Select City
            </option>
            {cityName &&
              cityName.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
        <div className="zipcodeInputBox box">
          <label className="label_checkout" htmlFor="zipcode">
            ZIP Code
          </label>
          <input
            onChange={onChangeHandler}
            value={zipcode}
            type="text"
            id="zipcode"
            name="zipcode"
          />
        </div>
        <div className="phoneInputBox box">
          <label className="label_checkout" htmlFor="phone">
            Phone
          </label>
          <input
            onChange={onChangeHandler}
            value={phone}
            type="text"
            name="phone"
            id="phone"
          />
        </div>
        <div className="emailInputBox box">Email address</div>
        <input
          onChange={onChangeHandler}
          value={email}
          type="text"
          name="email"
          id="email"
        />
      </div>
      <div className="order">
        <h2>Your Order</h2>
        {cart.map((p) => (
          <SideCartItem key={p.id} edit={false} product={p} />
        ))}
        <CartTotal btnText="Place Order" total={total} />

        <Link>
          <button onClick={onSubmitHandler} className="btn">
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
