import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import {
  useCommentsState,
  useCommentsDispatch,
} from "../../context/comment/context";
import { updateTask } from "../../context/task/actions";
import { useMembersState } from "../../context/members/context";
import { useProjectsState } from "../../context/projects/context";
import { TaskDetailsPayload } from "../../context/task/types";
import { fetchComment, addComment } from "../../context/comment/actions";

type TaskFormUpdatePayload = TaskDetailsPayload & {
  selectedPerson: string;
};
type Inputs = {
  description: string;
};

const formatDateForPicker = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const TaskDetails = () => {
  let [isOpen, setIsOpen] = useState(true);
  let [inputComment, setInputComment] = useState("");

  const { projectID = "", taskID = "" } = useParams<{
    projectID?: string;
    taskID?: string;
  }>();
  let navigate = useNavigate();

  const projectState = useProjectsState();
  const memberState = useMembersState();
  const taskListState = useTasksState();
  const taskDispatch = useTasksDispatch();

  const selectedProject = projectState?.projects.filter(
    (project) => `${project.id}` === projectID
  )[0];

  const selectedTask = taskListState.projectData.tasks[taskID ?? ""];
  const dispatch = useCommentsDispatch();
  const commentsState = useCommentsState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (projectID && taskID) {
          console.log("Fetching comments...");
          await fetchComment(dispatch, projectID, taskID);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [projectID, taskID]);

  const [selectedPerson, setSelectedPerson] = useState(
    selectedTask.assignedUserName ?? ""
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormUpdatePayload>({
    defaultValues: {
      title: selectedTask.title,
      description: selectedTask.description,
      selectedPerson: selectedTask.assignedUserName,
      dueDate: formatDateForPicker(selectedTask.dueDate),
    },
  });

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
    const assignee = memberState?.members?.filter(
      (member) => member.name === selectedPerson
    )?.[0];
    updateTask(taskDispatch, projectID ?? "", {
      ...selectedTask,
      ...data,
      assignee: assignee?.id,
    });
    closeModal();
  };
  const onSubmitComment: SubmitHandler<Inputs> = async () => {
    const comment = {
      description: inputComment,
    };
    addComment(dispatch, projectID ?? "", taskID ?? "", comment);
    setInputComment("");
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
                    Task Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {errors && <span>This field is required</span>}

                      <input
                        type="text"
                        required
                        placeholder="Enter title"
                        id="title"
                        {...register("title", { required: true })}
                        className="w-full px-3 py-2 my-4 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Enter description"
                        id="description"
                        {...register("description", { required: true })}
                        className="w-full px-3 py-2 my-4 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="date"
                        required
                        placeholder="Enter due date"
                        id="dueDate"
                        {...register("dueDate", { required: true })}
                        className="w-full px-3 py-2 my-4 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <h3>
                        <strong>Assignee</strong>
                      </h3>
                      <Listbox
                        value={selectedPerson}
                        onChange={setSelectedPerson}
                      >
                        <Listbox.Button className="w-full px-3 py-2 my-2 text-base text-left text-gray-700 border rounded-md">
                          {selectedPerson}
                        </Listbox.Button>
                        <Listbox.Options className="absolute py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {memberState?.members.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-blue-100 text-blue-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={person.name}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <CheckIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Update
                      </button>
                      <button
                        type="submit"
                        onClick={closeModal}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </form>

                    <form
                      onSubmit={handleSubmit(onSubmitComment)}
                      className="mt-5"
                    >
                      <h3 className="mb-3 font-serif text-xl font-semibold ">
                        Comment Details
                      </h3>

                      <input
                        type="text"
                        placeholder="Enter comment here"
                        id="commentBox"
                        required
                        onChange={(e) => setInputComment(e.target.value)}
                        value={inputComment}
                        className="w-full px-3 py-2 my-4 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <button
                        type="submit"
                        id="addCommentBtn"
                        className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Add comment
                      </button>
                    </form>

                    <div className="mt-2 space-y-4">
                      {commentsState.isLoading ? (
                        <p>Loading comments...</p>
                      ) : commentsState.isError ? (
                        <p>Error: {commentsState.errorMessage}</p>
                      ) : (
                        <div className="mt-2 space-y-4">
                          {commentsState.data.map((comment) => (
                            <div
                              key={comment.id}
                              className="p-3 bg-gray-100 rounded-lg shadow-md comment"
                            >
                              <div className="text-gray-600">
                                {comment.User && (
                                  <>
                                    <p className="m-2">
                                      <strong>Name:</strong>{" "}
                                      {comment.User.name}
                                    </p>
                                    <p className="m-2">
                                      <strong>Timestamp:</strong>{" "}
                                      {comment.createdAt &&
                                        new Date(
                                          comment.createdAt
                                        ).toLocaleString()}
                                    </p>
                                  </>
                                )}
                                <p className="m-2">
                                  <strong>Comment:</strong>{" "}
                                  {comment.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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

export default TaskDetails;
