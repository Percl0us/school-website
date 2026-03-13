export default function ImagePreview({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative max-w-4xl w-full p-4" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Full Preview" className="w-full max-h-[85vh] object-contain rounded-xl shadow-lg" />
        <button onClick={onClose} className="absolute top-3 right-3 bg-white text-black rounded-full px-3 py-1 text-sm shadow">✕</button>
      </div>
    </div>
  );
}