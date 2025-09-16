import { useNavigate } from "react-router";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className={
        "h-[50px] flex text-center content-center justify-center items-center bg-primary-700 aspect-square rounded-md"
      }
      onClick={() => navigate("/")}
    >
      <div className="font-bold text-lg text-white">qS</div>
    </div>
  );
};
