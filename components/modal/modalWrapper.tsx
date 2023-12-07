import React from "react";
import { Dialog } from "@headlessui/react";
import CloseIcon from "@/components/icons/closeIcon";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  style?:string;
}

export default function ModalWrapper({
  isOpen,
  setIsOpen,
  children,
  style
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
        >
          <div className="flex flex-col justify-center items-center py-8 px-4 text-center w-[40%]">
            <Dialog.Overlay />
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-300 opacity-60"></div>
            </div>

            <motion.div
              className="flex items-center justify-center pt-4 px-4 pb-20 text-center w-full sm:block sm:p-0"
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.15,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                  ease: "easeIn",
                  duration: 0.15,
                },
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
                className="w-full flex items-center"
              >
                <div className="relative w-full max-h-full">
                  <div className="relative bg-white rounded-lg shadow-lg">
                    <CloseIcon
                      setOnClick={() => setIsOpen(!isOpen)}
                      style="text-black absolute top-3 right-2.5 w-7 h-7 cursor-pointer"
                      type={"circle"}
                    />
                    <div className={`p-6 text-center ${style}`}>
                      { children }
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
