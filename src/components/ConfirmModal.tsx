import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you really want to delete this message? This action cannot be undone.",
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl transform transition-all">
              {/* Title */}
              <Dialog.Title className="text-lg font-bold text-white">
                {title}
              </Dialog.Title>

              {/* Message */}
              <p className="mt-2 text-gray-300">{message}</p>

              {/* Buttons */}
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={onConfirm}
                  className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
                >
                  No
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
