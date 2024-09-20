import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { CloseCrossSign } from "../../icons";
import Form from "../../form/Form";
import { useGetComments } from "../hooks/useComments";

function Post({ id, title, body, userId, handleDeletePost, handleEditPost }) {
  const [openModal, setOpenModal] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { data: comments } = useGetComments(id);

  const submitDeletePost = async () => {
    handleDeletePost(id);
    setOpenConfirmModal(false);
  };

  const submitEditPost = async (newTitle, newBody) => {
    handleEditPost({ userId: userId, id: id, title: newTitle, body: newBody });
  };

  return (
    <>
      <div className="flex w-full flex-col md:flex-row items-center mb-4 rounded-2xl bg-[#0E505C] px-4 py-6">
        <div
          className="relative w-full bg-[#0B3B45] px-4 py-2 mr-4 rounded-xl min-h-10 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <div>{title}</div>
        </div>
        <div className="flex flex-row w-full items-center md:w-2/5 mt-4 md:mt-0">
          <button
            className="flex w-full mr-4 justify-center rounded-full bg-[#30CEAF] py-2 font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]"
            onClick={() => setOpenEditForm(true)}
          >
            Edit
          </button>
          <button
            className="flex w-full justify-center rounded-full bg-[#30CEAF] py-2 font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]"
            onClick={() => setOpenConfirmModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {openEditForm && (
        <Form
          title={title}
          body={body}
          closeForm={() => setOpenEditForm(false)}
          onSubmit={submitEditPost}
        />
      )}

      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => setOpenModal(false)}
        >
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
                <DialogPanel className="max-h-[641px] min-w-[350px] max-w-[485px] rounded-2xl pt-9">
                  <div className="relative flex flex-col items-center justify-between text-base font-semibold text-[#DDFBF6] ">
                    <CloseCrossSign
                      className="absolute right-6 top-6 cursor-pointer text-[#6F8B98] transition duration-300 ease-in-out hover:text-[#4A6A75]"
                      onClick={() => setOpenModal(false)}
                    />
                    <div className="flex w-full flex-col rounded-2xl bg-[#0D424D] px-9 py-10">
                      <div className="text-[22px] font-semibold">{title}</div>
                      <div className="mb-6 mt-[18px] text-[#6F8B98]">
                        {body}
                      </div>
                      Comments:
                      {comments?.map((comment) => (
                        <div key={comment.id} className="text-[#6F8B98]">
                          {comment.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={openConfirmModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => setOpenConfirmModal(false)}
        >
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
                <DialogPanel className="max-h-[641px] min-w-[350px] max-w-[485px] rounded-2xl pt-9">
                  <div className="relative flex flex-col items-center justify-between text-base font-semibold text-[#DDFBF6] ">
                    <CloseCrossSign
                      className="absolute right-6 top-6 cursor-pointer text-[#6F8B98] transition duration-300 ease-in-out hover:text-[#4A6A75]"
                      onClick={() => setOpenConfirmModal(false)}
                    />
                    <div className="flex w-full flex-col items-center rounded-2xl bg-[#0D424D] px-9 py-10">
                      <div className="text-[22px] font-semibold">
                        Do you really want to delete this post?
                      </div>
                      <button
                        onClick={() => setOpenConfirmModal(false)}
                        className="mt-4 flex w-full justify-center rounded-full bg-[#30CEAF] py-[14px] font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={submitDeletePost}
                        className="mt-4 flex w-full justify-center rounded-full bg-[#30CEAF] py-[14px] font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Post;
