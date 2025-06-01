export default function Button({ children, type = "submit", color = "blue", disabled = false }) {
  const base = "w-full text-white py-2 rounded transition font-semibold";
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${colors[color]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
