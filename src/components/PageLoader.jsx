import { ClipLoader } from "react-spinners";

export default function PageLoader({ size = 80, color = "#4d6399" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#fff",
      }}
    >
      <ClipLoader color={color} loading={true} size={size} />
    </div>
  );
}
