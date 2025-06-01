export default function Input({ type = "text", placeholder, value, onChange, required = false }) {
  return (
    <label className="w-full mb-4 block">
      <span className="sr-only">{placeholder}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </label>
  );
}
