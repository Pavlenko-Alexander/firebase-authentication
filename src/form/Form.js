import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { CloseCrossSign } from '../icons'

function Form({title, body, closeForm, onSubmit, postsLength}) {
  const [newTitle, setNewTitle] = useState(title || "");
  const [newBody, setNewBody] = useState(body || "");

  const userId = postsLength + 2;
  const id = postsLength + 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    title ? onSubmit(newTitle, newBody) : onSubmit(userId, id, newTitle, newBody);
    closeForm();
  }

  return (
    <Transition appear show={true} as={Fragment}>
          <Dialog as="div" className="relative z-40" onClose={closeForm}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[#051C21E5]" />
            </TransitionChild>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="max-h-[80vh] w-[485px] rounded-2xl pt-9">
                    <div className="relative flex flex-col items-center justify-between text-base font-semibold text-[#DDFBF6] ">
                      <CloseCrossSign
                        className="absolute right-6 top-6 cursor-pointer text-[#6F8B98] transition duration-300 ease-in-out hover:text-[#4A6A75]"
                        onClick={closeForm}
                      />
                      <div className="flex w-full flex-col items-center rounded-2xl bg-[#0D424D] px-9 py-12">
                        <form
                          onSubmit={(e) => handleSubmit(e)}
                          className="flex w-full flex-col items-center"
                        >
                            <input
                              className="w-full rounded-xl bg-[#0B3742] px-5 py-[18px] outline-none placeholder:opacity-40"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              placeholder='Title'
                            />

                            <input
                              className="w-full mt-4 rounded-xl bg-[#0B3742] px-5 py-[18px] outline-none placeholder:opacity-40"
                              value={newBody}
                              onChange={(e) => setNewBody(e.target.value)}
                              placeholder='Body'
                            />

                          <button className="mt-4 flex w-full justify-center rounded-full bg-[#30CEAF] py-[14px] font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]">
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
  )
}

export default Form