import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import LoginForm from "./LoginForm";
const ModalAuth = ({ isOpen, setIsOpen, createUserCookies }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-red-900/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-panel shadow-3xl w-full max-w-md transform overflow-hidden rounded-2xl bg-[54px] px-6 py-10 text-left align-middle transition-all md:bg-[160px]">
                  <Dialog.Title
                    as="h3"
                    className="mt-4 text-lg font-medium leading-8 text-white"
                  >
                    Please login if you want to go further and enjoy more{" "}
                    <span className="red font-bold">Marvelous</span> Contents
                  </Dialog.Title>

                  <LoginForm
                    action="login"
                    apiURL="user/login"
                    createUserCookies={createUserCookies}
                    closeModal={closeModal}
                    error={error}
                    setError={setError}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                  />

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center  rounded-md border border-transparent bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ModalAuth;
