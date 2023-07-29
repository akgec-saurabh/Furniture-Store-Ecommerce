import { authSliceActions } from "./auth-slice";

export const register = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API}/auth/register`,
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) throw new Error("Could not fetch Cart data");

      const responseData = await response.json();
      return responseData;
    };

    try {
      const token = await sendRequest();
      dispatch(authSliceActions.updateToken(token));
      dispatch(authSliceActions.toggleAuthModal());
    } catch (error) {
      console.log(error);
      // TODO Display Error Modal
    }
  };
};

export const startLogin = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${process.env.REACT_APP_API}/auth/login`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Could not fetch Cart data");

      const responseData = await response.json();
      return responseData;
    };

    try {
      const token = await sendRequest();
      dispatch(authSliceActions.updateToken(token));
      dispatch(authSliceActions.toggleAuthModal());
    } catch (error) {
      console.log(error);
      // TODO Display Error Modal
    }
  };
};
