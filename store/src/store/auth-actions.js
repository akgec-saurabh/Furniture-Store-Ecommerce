import { authSliceActions } from "./auth-slice";
import { errorSliceActions } from "./error-slice";

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
      dispatch(authSliceActions.updateToken(token.token));
      dispatch(authSliceActions.updateUserId(token.userId));
      dispatch(authSliceActions.toggleAuthModal());
      dispatch(saveToken({ userId: token.userId, token: token.token }));
    } catch (error) {
      console.log(error);
      // TODO Display Error Modal

      dispatch(errorSliceActions.setError("Some Error Occured While Register"));
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
      dispatch(authSliceActions.updateToken(token.token));
      dispatch(authSliceActions.updateUserId(token.userId));

      dispatch(authSliceActions.toggleAuthModal());
      dispatch(saveToken({ userId: token.userId, token: token.token }));
    } catch (error) {
      console.log(error);
      // TODO Display Error Modal
      dispatch(errorSliceActions.setError("Some Error Occured While Login"));
    }
  };
};

//Saving token to local Storage
export const saveToken = (data) => {
  return (dispatch) => {
    try {
      localStorage.setItem("data", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getToken = () => {
  return (dispatch) => {
    let data;
    try {
      data = localStorage.getItem("data");
    } catch (error) {
      console.log(error);
    }
    if (data) {
      console.log("token found");
      dispatch(authSliceActions.updateToken(JSON.parse(data).token));
      dispatch(authSliceActions.updateUserId(JSON.parse(data).userId));
    }
  };
};

export const clearToken = () => {
  return (dispatch) => {
    try {
      localStorage.removeItem("data");
    } catch (error) {
      console.log(error);
    }
    dispatch(authSliceActions.updateToken(null));
    dispatch(authSliceActions.updateUserId(null));
  };
};
