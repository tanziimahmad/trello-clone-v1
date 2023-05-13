"use client"
import React, { useState } from "react";


export default function Page() {
  const [organName, setOrganName] = useState("");

  const handleOnChange = (e) => {
    const value = e.target.value;
    setOrganName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const response = await createOrganization(organName);
    //   console.log("Organization created:", response.data);

    //   // Handle success or perform any further actions
    // } catch (error) {
    //   console.error("Error creating organization:", error.message);

    //   // Handle error or display error message
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="displayName"
          value={organName}
          onChange={handleOnChange}
          className=" text-black rounded-md px-4 py-2 border borde0.r-black mx-4"
          placeholder="Organization Name"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Create Organization
        </button>
      </form>
    </div>
  );
}
