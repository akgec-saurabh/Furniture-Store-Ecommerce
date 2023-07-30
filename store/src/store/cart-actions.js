export const saveCart = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`http://localhost:5000/cart`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(cart),
      });
      if (!response.ok) throw new Error("Could not fetch Cart data");

      console.log("saved");
      const responseData = await response.json();
      return responseData;
    };

    try {
      await sendRequest();
      console.log("cart saved");
    } catch (error) {
      console.log(error);
    }
  };
};
