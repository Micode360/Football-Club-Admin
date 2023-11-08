import React from "react";
import { Dialog } from "@headlessui/react";
import XIcon from "@/components/icons/xIcon";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Icon?: React.ReactNode;
  text: string;
  button1?: () => void;
  button1Text?: string;
  button1Color?: string;
  button2?: () => void;
  button2Text?: string;
  button2Color?: string;
  status?: "" | "pending" | "response";
}

export default function Modal({
  isOpen,
  text,
  Icon,
  setIsOpen,
  button1,
  button1Text,
  button1Color,
  button2,
  button2Text,
  button2Color,
  status,
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
          <div className="flex flex-col py-8 px-4 text-center">
            <Dialog.Overlay />
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-300 opacity-60"></div>
            </div>

            <motion.div
              className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0"
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
              >
                <div className="relative w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow-lg">
                    <XIcon
                      setOnClick={() => setIsOpen(!isOpen)}
                      style="text-black absolute top-3 right-2.5 w-7 h-7 cursor-pointer"
                      type={"circle"}
                    />
                    <div className="p-6 text-center">
                      {Icon}
                      <Dialog.Title
												as="h3"
												className="mb-5 text-base"
												id="modal-headline"
											>
												{text}
											</Dialog.Title>
                      {button1 && (
                        <button
                          onClick={button1}
                          className={`${
                            !button1Color ? "bg-custom_blue" : button1Color
                          } outline-none text-white mr-4 md:mr-4 shadow-md py-2 px-6 rounded`}
                        >
                          {button1Text}
                        </button>
                      )}
                      {button2 && (
                        <button
                          onClick={button2}
                          className={`${
                            !button2Color ? "bg-custom_red" : button1Color
                          } outline-none text-white mr-4 md:mr-4 shadow-md py-2 px-6 rounded`}
                        >
                          {button2Text}
                        </button>
                      )}
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
