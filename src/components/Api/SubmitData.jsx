import React from "react";
import ApiUrl from "../../services/Api";
import axios from "axios";

function SubmitData(endPoint, Data) {
  var data = axios.post(`${ApiUrl}/${endPoint}`, Data).then((response) => {
    return response.data.status;
  });
  return data;
}
export default SubmitData;
