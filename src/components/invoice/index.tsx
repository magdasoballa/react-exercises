import React from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../../data";

export const Invoice = () => {
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId as any, 10));

  console.log(params, "params");
  return <h2>Invoice: {invoice?.amount}</h2>;
};
