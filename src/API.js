const baseUrl = "https://meals-app-backend.vercel.app";
// const baseUrl = "http://localhost:8000";

export const API = {
  getUserData: async (id) => {
    const url = baseUrl + "/api/get/" + id;
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

    const url = baseUrl + "/api/login";

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

    const url = baseUrl + "/api/newuser/post";

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

    const url = baseUrl + "/api/newrecipe/post";

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

    const url = baseUrl + "/api/newlinkrecipe/post";

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
  favoriteRecipe: async (recipe, source, userId) => {
    const url = baseUrl + "/api/favoriterecipe/post";

    return await await API.postMethod({ recipe, source, userId }, url);
  },
  postMethod: async (postObj, url) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postObj),
      headers: myHeaders,
      redirect: "follow",
    };

    return await (await fetch(url, requestOptions))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  putMethod: async (putObj, url) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(putObj),
      headers: myHeaders,
      redirect: "follow",
    };

    return await (await fetch(url, requestOptions))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  getMethod: async (url) => {
    const options = {
      method: "GET",
    };

    return await (await fetch(url, options))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  deleteMethod: async (url) => {
    const options = {
      method: "DELETE",
    };

    return await (await fetch(url, options))
      .json()
      .catch((error) => console.log("error: ", error));
  },
  newMealPlan: async (mealPlan, userId) => {
    const url = baseUrl + "/api/newmealplan/post";

    return await await API.postMethod({ mealPlan, userId }, url);
  },
  updateMealPlan: async (recipe, index, mealPlanId) => {
    const url = baseUrl + "/api/updatemealplan/put";

    console.log(recipe, index, mealPlanId);

    return await await API.putMethod({ recipe, index, mealPlanId }, url);
  },
  getMealPlan: async (id) => {
    const url = baseUrl + "/api/getmealplan/get/" + id;

    return await await API.getMethod(url);
  },
  deleteMealPlan: async (id, userId) => {
    const url = baseUrl + `/api/deletemealplan/delete/${id}&${userId}`;

    return await await API.deleteMethod(url);
  },
  newList: async (list, userId, mealPlanId) => {
    const url = baseUrl + "/api/newlist/post";

    return await await API.postMethod({ list, userId, mealPlanId }, url);
  },
  getList: async (id) => {
    const url = baseUrl + "/api/getlist/get/" + id;

    return await await API.getMethod(url);
  },
  updateList: async (acquiredList, listList, listId) => {
    const url = baseUrl + "/api/updatelist/put";

    console.log(acquiredList, listList, listId);

    return await await API.putMethod({ acquiredList, listList, listId }, url);
  },
};
