import React from "react";
import ApiUrl from "../../services/Api";
import axios from "axios";

function GetData(endPoint, id) {
  var data = axios.get(`${ApiUrl}/${endPoint}/${id}`).then((response) => {
    return response;
  });
  return data;
}
export default GetData;
