/* @flow */
import { APIClientService } from "../services/APIClientService";
export default {
  getPosts(page) {
    return new Promise((resolve, reject) => {
      getPostOnSuccessCallback = responseJson => {
        console.log("Post Response-->" + JSON.stringify(responseJson));
        const pagination = { page }
        const records = responseJson.hits;
        resolve({ pagination, records })
      };
      getPostOnErrorCallback = error => {
        console.log("Post - Error" + error);
        reject('Error')
      };
      APIClientService(
        "GET",
        page,
        null,
        getPostOnSuccessCallback,
        getPostOnErrorCallback
      );
    })
  }
}
