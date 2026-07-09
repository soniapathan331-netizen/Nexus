import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
  documentName: string;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  documentName
}) => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  if (!isOpen) return null;

  const handleClear = () => {
    sigCanvasRef.current?.clear();
  };

  const handleSave = () => {
    if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
      const signatureData = sigCanvasRef.current.toDataURL();
      onSave(signatureData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sign Document</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 mb-3">Signing: {documentName}</p>

          <div className="border border-gray-300 rounded-md">
            <SignatureCanvas
              ref={sigCanvasRef}
              canvasProps={{
                className: 'w-full h-40 rounded-md'
              }}
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Signature
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};