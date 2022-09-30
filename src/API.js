export const API = {
  getUserData: async (id) => {
    const url = "http://localhost:8000/api/get/" + id;
    const options = {
      method: "GET",
    };

    return await (await fetch(url, options))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  signInUser: async (user) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = "http://localhost:8000/api/login";

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(user),
      headers: myHeaders,
      redirect: "follow",
    };

    return await (await fetch(url, requestOptions))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  signUpUser: async (newUser) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = "http://localhost:8000/api/newuser/post";

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: myHeaders,
      redirect: "follow",
    };

    return await (await fetch(url, requestOptions))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  postRecipe: async (newRecipe, userId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = "http://localhost:8000/api/newrecipe/post";

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ newRecipe, userId }),
      headers: myHeaders,
      redirect: "follow",
    };

    return await (await fetch(url, requestOptions))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  postLinkRecipe: async (newRecipe, userId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = "http://localhost:8000/api/newlinkrecipe/post";

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ newRecipe, userId }),
      headers: myHeaders,
      redirect: "follow",
    };

    return await (await fetch(url, requestOptions))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  favoriteRecipe: async (recipeId, source, userId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = "http://localhost:8000/api/favoriterecipe/post";

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ recipeId, source, userId }),
      headers: myHeaders,
      redirect: "follow",
    };

    return await (await fetch(url, requestOptions))
      .json()
      .catch((error) => console.log("error: ", error));
  },
};
