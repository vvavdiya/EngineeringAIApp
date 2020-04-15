
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
export function APIClientService(
  _methodType,
  _endPoint,
  _inputParam,
  _onSuccessCallback,
  _onErrorCallback,
  isFullURLPass
) {

  // var URL = config.BASE_URL + _endPoint;
  const BASE_URL = "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=";
  const URL = BASE_URL + _endPoint
  if (isFullURLPass) {
    console.log("isFullURLPass--" + isFullURLPass);
    URL = _endPoint;
  }
  console.log(
    "MethodType-" +
    _methodType +
    "\nAPI URL-->" +
    URL +
    "\nAPI Input-->" +
    JSON.stringify(_inputParam)
  );
  var apiConfig = {
    method: _methodType,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (_inputParam) {
    apiConfig["body"] = JSON.stringify(_inputParam);
  }

  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);

    if (state.isConnected) {
      fetch(URL, apiConfig)
        .then(response => response.json())
        .then(responseJson => {
          console.log(
            "MethodType-" +
            _methodType +
            "\nAPI URL-->" +
            URL +
            "\nAPI Input-->" +
            JSON.stringify(_inputParam) +
            "\nService Response-->" +
            JSON.stringify(responseJson)
          );
          if (_onSuccessCallback) {
            _onSuccessCallback(responseJson);
          }
        })
        .catch(error => {
          console.log(
            "ERROR - MethodType-" +
            _methodType +
            "\nAPI URL-->" +
            URL +
            "\nAPI Input-->" +
            JSON.stringify(_inputParam) +
            +"\nService status-->" +
            error.status +
            "\nService error-->" +
            JSON.stringify(error)
          );

          if (_onErrorCallback) {
            try {
              _onErrorCallback(error);
            } catch (error) {
              console.log("_onErrorCallback-->" + JSON.stringify(error));
            }
          }
        });
    } else {
      console.log("No Internet Connection.");
      _onErrorCallback("No Internet Connection");
      Alert.alert("No Internet Connection\nPlease check your data connection.");
    }
  });
}
