import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/analysis");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loadingPage">
      <div className="stars"></div>

      <div className="scanCircle"></div>

      <div className="scanText">
        SCANNING...
      </div>
    </div>
  );
}