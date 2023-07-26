import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  id: "",
  name: "",
  price: "",
  variant: "",
  discount: "",
  mainImage: "",
  hoverImage: "",
  shortDescription: "",
  longDescription: "",
  additionalInformation: {
    weightInKg: "",
    dimensions: "",
    materials: "",
    otherInfo: "",
    size: "",
  },
  colorVariant: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    addProduct(state, action) {
      return action.payload;
    },
    addVariant(state, action) {
      state.colorVariant.push(action.payload);
    },

    productChange(state, action) {
      state[action.payload.name] = action.payload.value;
    },

    setDefault(state, action) {
      const temp = {
        ...state,
        variant: 0,
        discount: 0,
        shortDescription:
          "Designed for simplicity and made from high quality materials. Its sleek geometry and material combinations creates a modern personalized look.",
        longDescription:
          "Authentic keffiyeh master cleanse. Fingerstache semiotics PBR quinoa. Pop-up Godard kale chips, trust fund Neutra fingerstache paleo Wes Anderson. Deep v single-origin coffee cred Thundercats beard. Mumblecore before they sold out roof party biodiesel. Banksy swag Portland readymade synth messenger bag cliche.",
        additionalInformation: {
          ...state.additionalInformation,
          weightInKg: 1.72,
          dimensions: "100 x 37 x 100 cm",
          materials: "80% cotton, 20% linen",
          otherInfo: "American heirloom jean shorts pug seitan letterpress.",
          size: "One Size, XL, L, M, S",
        },
      };
      console.log(temp);
      return temp;
    },
  },
});

export const productSliceActions = productSlice.actions;

export default productSlice;
