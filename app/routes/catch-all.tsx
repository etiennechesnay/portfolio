import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function CatchAll() {
  const navigate = useNavigate();

  // Pour les routes non prévues - redirige vers /
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}
