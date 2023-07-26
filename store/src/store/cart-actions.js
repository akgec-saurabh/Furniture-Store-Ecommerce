export const updateCart = (cart) => {
  return (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/cart", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(cart),
      });
      if (!response.ok) throw new Error("Could not fetch Cart data");

      const responseData = await response.json();
      return responseData;
    };
  };
};
