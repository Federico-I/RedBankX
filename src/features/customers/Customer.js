import React from 'react';
import { useSelector } from 'react-redux';

function Customer() {
  const customer = useSelector((store) => store.customer.fullName);

  return (<h2>Hi! Welcome, %Name%</h2>)
}

export default Customer;