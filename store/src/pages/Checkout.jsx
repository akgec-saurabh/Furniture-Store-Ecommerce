import React, { useEffect, useState } from "react";
import {
  useGetAllCitiesQuery,
  useGetAllCountryQuery,
  useGetStatesQuery,
} from "../store/country-slice";
import { useSelector } from "react-redux";
import SideCartItem from "../components/SideCartItem";

function Checkout() {
  const cart = useSelector((state) => state.cart.cart);
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
  };

  const onStateChangeHandler = (e) => {
    setCountry((prv) => ({ ...prv, stateCode: e.target.value }));
  };

  return (
    <div className="checkout">
      <div className="billing">
        <h2>Billing details</h2>
        <div className="nameInputBox">
          <div className="firstname">
            <label htmlFor="firstname">First Name</label>
            <input name="firstname" type="text" id="firstname" />
          </div>
          <div className="lastname">
            <label htmlFor="lastname"></label>
            <input name="lastname" type="text" id="lastname" />
          </div>
        </div>
        <div className="countryInputBox">
          <label htmlFor="country">Country</label>
          <select onChange={onCountryChangeHandler} name="country" id="country">
            <option selected disabled value="0">
              Select Country
            </option>
            {countryName &&
              countryName.map((country) => (
                <option value={country.code}>{country.name}</option>
              ))}
          </select>
        </div>
        <div className="addressInputBox">
          <label htmlFor="address">Street adress</label>
          <input type="text" id="address" name="housenumber" />
          <input type="text" name="apartment" />
        </div>
        <div className="stateInputBox">
          <label htmlFor="state">State</label>
          <select onChange={onStateChangeHandler} name="state" id="state">
            <option selected disabled value="0">
              Select State
            </option>
            {stateName &&
              stateName.map((state) => (
                <option value={state.code}>{state.name}</option>
              ))}
          </select>
        </div>
        <div className="cityInputBox">
          <label htmlFor="city">Town/City</label>
          <select name="city" id="city">
            <option selected disabled value="0">
              Select City
            </option>
            {cityName &&
              cityName.map((city) => (
                <option value={city.name}>{city.name}</option>
              ))}
          </select>
        </div>
        <div className="zipcodeInputBox">
          <label htmlFor="zipcode">ZIP Code</label>
          <input type="text" id="zipcode" name="zipcode" />
        </div>
        <div className="phoneInputBox">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" id="phone" />
        </div>
        <div className="emailInputBox">Email address</div>
        <input type="text" name="email" id="email" />
      </div>
      <div className="order">
        {cart.map((p) => (
          <SideCartItem product={p} />
        ))}
      </div>
    </div>
  );
}

export default Checkout;
