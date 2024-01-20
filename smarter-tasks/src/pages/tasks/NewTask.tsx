import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useProjectsState } from "../../context/projects/context";
import { useTasksDispatch } from "../../context/task/context";
import { addTask } from "../../context/task/actions";
import { TaskDetailsPayload } from "../../context/task/types";

const NewTask = () => {
  let [isOpen, setIsOpen] = useState(true);

  let { projectID } = useParams();
  let navigate = useNavigate();

  // Use react-hook-form to create form submission handler and state.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskDetailsPayload>();
  const projectState = useProjectsState();
  const taskDispatch = useTasksDispatch();

  // We do some sanity checks to make sure the `projectID` passed is a valid one
  const selectedProject = projectState?.projects.filter(
    (project) => `${project.id}` === projectID
  )?.[0];
  if (!selectedProject) {
    return <>No such Project!</>;
  }
  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }
  const onSubmit: SubmitHandler<TaskDetailsPayload> = async (data) => {
    try {
      // Invoke the actual API and create a task.
      addTask(taskDispatch, projectID ?? "", data);
      closeModal();
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new Task
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    {errors && <span>This field is required</span>}
                      <input
                        type="text"
                        required
                        placeholder="Enter title"
                        autoFocus
                        id="title"
                        // Register the title field
                        {...register("title", { required: true })}
                        className="w-full px-3 py-2 my-4 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Enter description"
                        autoFocus
                        id="description"
                        // register the description field
                        {...register("description", { required: true })}
                        className="w-full px-3 py-2 my-4 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="date"
                        required
                        placeholder="Enter due date"
                        autoFocus
                        id="dueDate"
                        // register due date field
                        {...register("dueDate", { required: true })}
                        className="w-full px-3 py-2 my-4 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <button
                        type="submit"
                        // Set an id for the submit button
                        id="newTaskSubmitBtn"
                        className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                      <button
                        onClick={closeModal}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </form>
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
export default NewTask;
