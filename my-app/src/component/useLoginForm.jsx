import { useState } from "react";

export default function useLoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // function to test later when i have api better to let it function file later
  // async function checkData(username, password) {
  //   const res = await fetch();
  //   const data = await res.json();
  //   return data;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { username, password } = formData;
    //check and return message
    //   if (checkData(username, password)) {
    //     return <div>Log in successful</div>;
    //   } else {
    //     return <div>Error</div>;
    //   }

    if (!username || !password) {
      setIsError(true);
      setErrorMessage("Check username and password again");
    } else {
      setIsError(false);
      // storage in session if they can log in to
      sessionStorage.setItem("isAuthenticated", "true");
      setErrorMessage("Login successfully!!");
    }
    setIsLoading(false);
  };
  //handle update formData when user enter
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    errorMessage,
    isError,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
}
