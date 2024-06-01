import { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data", data);
        setMessage(JSON.stringify(data));
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  return <div>{message}</div>;
};

export default Home;
