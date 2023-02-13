import axios from "axios";

export const Branches = () => {
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_BASEURL}/branches`,
    headers: {
      Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
    },
  };
  axios(config)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
