"use client";
import { getMe } from "@/api/apiService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  console.log(router);
  const [credential, setCredential] = useState({
    apiKey: "",
    apiToken: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    setCredential((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { apiKey, apiToken } = credential;
    console.log(credential);

    try {
      const response = await getMe(apiKey, apiToken);
      console.log("Organization created:", response.data.idOrganizations[0]);

      const organizationId = response.data.idOrganizations[0];

      sessionStorage.setItem("organizationId", organizationId);
      sessionStorage.setItem("apiKey", apiKey);
      sessionStorage.setItem("apiToken", apiToken);
      router.push("/");

      // Handle success or perform any further actions
    } catch (error) {
      console.error("Error creating organization:", error.message);

      // Handle error or display error message
    }
  };

  return (
    <div className="flex items-center justify-center w-2/5 h-screen m-auto ">
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 border border-black rounded-2xl"
      >
        <div>
          <p> Welcome to Trello Clone</p>
        </div>
        <div>
          <input
            type="text"
            name="apiKey"
            value={credential.apiKey}
            onChange={handleOnChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-md"
            placeholder="API Key"
          />
        </div>
        <div>
          <input
            type="text"
            name="apiToken"
            value={credential.apiToken}
            onChange={handleOnChange}
            className="w-full px-4 py-2 mb-4 text-black border rounded-md"
            placeholder="API Token"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Create Organization
          </button>
        </div>
      </form>
    </div>
  );
}
