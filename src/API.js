export const API = {
  getUserData: async (id) => {
    const url = "http://localhost:8000/api/get/" + id;
    const options = {
      method: "GET",
    };

    return await (await fetch(url, options)).json();
  },
};
