import { React, useEffect, useState } from "react";
import ApiUrl from "../../services/Api";
import axios from "axios";

export default function ApiIndex({
  endPoint,
  page,
  pageSize,
  sortDate,
  setData,
}) {
  //   useEffect(() => {
  //     getData();
  //   }, []);
  //   const getData = () => {
  //     axios
  //       .get(`${ApiUrl}/${endPoint}?page=${0}&page_size=${100}&sort=created_Date`)
  //       .then((Response) => {
  //         // console.log(Response.data.data.Paginated_data.content);
  //         setData(Response.data.data.Paginated_data.content);
  //       });
  //   };
  return setData("yes");
}
