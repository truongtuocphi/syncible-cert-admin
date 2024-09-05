import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="relative w-11/12 rounded-lg bg-white p-6 md:w-1/2">
        <h2 className="text-center text-xl font-bold">Tạo chứng chỉ</h2>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <div className="rounded-lg border p-4 text-center shadow-lg">
            <div className="mx-auto text-4xl text-gray-500">📄</div>
            <h3 className="mt-4 text-lg font-bold">Tạo chứng chỉ đơn lẻ</h3>
            <p className="mt-2 line-clamp-3 text-sm">
              Mục này được thiết kế cho việc cung cấp bằng cấp đơn lẻ dành cho một người.
            </p>
            <button className="mt-4 rounded-lg bg-teal-500 px-4 py-2 text-white">
              Tạo chứng chỉ
            </button>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg border p-4 text-center shadow-lg">
            <div className="mx-auto text-4xl text-gray-500">📑</div>
            <h3 className="mt-4 text-lg font-bold">Tạo chứng chỉ hàng loạt</h3>
            <p className="mt-2 line-clamp-3 text-sm">
              Mục này được thiết kế cho việc cung cấp bằng cấp hàng loạt cho khoá học trên một học
              viên.
            </p>
            <button className="mt-4 rounded-lg bg-teal-500 px-4 py-2 text-white">
              Tạo chứng chỉ
            </button>
          </div>
        </div>

        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Modal;
