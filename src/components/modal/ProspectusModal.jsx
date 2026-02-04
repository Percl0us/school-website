import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function ProspectusModal({ image, onClose }) {
  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-medium"
        >
          ✕
        </button>

        {/* Image */}
        <div className="overflow-auto max-h-[85vh]">
          <img
            src={image}
            alt="School Prospectus"
            className="w-full h-auto rounded"
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
