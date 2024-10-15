import Lottie, { useLottie } from "lottie-react";
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

  const options = {
    animationData: "../assets/loader.json",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


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
      <Lottie
        options={options}
        height={300}
        width={300}
      />
    </div>
  );
}
