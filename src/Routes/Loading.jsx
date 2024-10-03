import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Loading() {
  const [counter, setCounter] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((currentCounter) => --currentCounter);
    }, 1000);

    counter === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div
      style={{
        height: "100vh",
        border: "1px solid red",
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img src="/loader02.gif" alt="Loader" width="200px"/>
      {/* Wait {counter} */}
    </div>
  );
}
