import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./CustomerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  // dispatch funtcion
  const dispatch = useDispatch();

  function handleClick() {
    if(!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create New Customer</h2>
      <div className="inputs">
        <div>
          <label>Customer Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create New Customer</button>
      </div>
    </div>
  );
}

export default Customer;
