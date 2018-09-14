// Creating and Using Axios Instances
// Storing the Link to Global to Create shortcuts call in your apps like /posts/
// - this will help you create the link for request just like the one we use in index js the only difference is you can use more than one URL with this way

import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export default instance;
