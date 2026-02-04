export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>

        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <div className="text-sm text-gray-700 font-medium">
        {label}
      </div>
    </div>
  );
}
