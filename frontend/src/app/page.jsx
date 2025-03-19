"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/navbar";

const TasksPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [actionType, setActionType] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3); // Number of tasks per page

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("http://localhost:5001/api/users/check", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        fetchTasks();
      } else {
        router.push("/login");
      }
    };

    fetchUserData();
  }, [router]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/tasks/gettasks", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        setError(data.message || "Failed to load tasks");
      }
    } catch (err) {
      setError("Something went wrong while fetching tasks");
    }
  };

  const handleCreateTask = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/tasks/CreateTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, status }),
      });
      const data = await res.json();
      if (res.ok) {
        setTitle("");
        setDescription("");
        setStatus("");
        fetchTasks();
        setShowModal(false);
      } else {
        setError(data.message || "Failed to create task");
      }
    } catch (err) {
      setError("Something went wrong while creating the task");
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;
    try {
      const res = await fetch(
        `http://localhost:5001/api/tasks/UpdateTask/${editingTask.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, description, status }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setEditingTask(null);
        fetchTasks();
        setTitle("");
        setDescription("");
        setStatus("");
        setShowModal(false);
      } else {
        setError(data.message || "Failed to update task");
      }
    } catch (err) {
      setError("Something went wrong while updating the task");
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      const res = await fetch(
        `http://localhost:5001/api/tasks/DeleteTask/${taskToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        fetchTasks();
      } else {
        setError(data.message || "Failed to delete task");
      }
    } catch (err) {
      setError("Something went wrong while deleting the task");
    } finally {
      setTaskToDelete(null);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setShowModal(false);
    setTitle("");
    setDescription("");
    setStatus("");
  };

  const confirmAction = () => {
    if (actionType === "create") {
      handleCreateTask();
    } else if (actionType === "edit") {
      handleUpdateTask();
    } else if (actionType === "delete") {
      handleDeleteTask();
    }
    setActionType(null);
  };


  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {user && <Navbar user={user} />}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Your Tasks</h2>

        {error && <p className="text-red-600">{error}</p>}
        <div className="space-y-4">
          {currentTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-200 p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
              </div>
              <div className="space-x-2">
                <Button
                  onClick={() => handleEditClick(task)}
                  className=" text-white hover:text-gray-500 cursor-pointer"
                >
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className=" text-white cursor-pointer"
                      onClick={() => {
                        setTaskToDelete(task.id);
                        setActionType("delete");
                      }}
                    >
                      -
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the task.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={confirmAction}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4  flex items-center justify-center ml-6 mx-auto">
          <Button
            onClick={() => setShowModal(true)}
            className="cursor-pointer text-2xl pt-1 rounded-full"
          >
            +
          </Button>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            Previous
          </Button>
          <span>Page {currentPage}</span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastTask >= tasks.length}
            className="cursor-pointer"
          >
            Next
          </Button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-2xl mb-4">
                {editingTask ? "Edit Task" : "Create Task"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActionType(editingTask ? "edit" : "create");
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="submit" className="cursor-pointer">
                      {editingTask ? "Update Task" : "Create Task"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                      <AlertDialogDescription>
                        {editingTask
                          ? "Are you sure you want to update this task?"
                          : "Are you sure you want to create this task?"}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={confirmAction}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </form>
              <Button
                onClick={closeModal}
                className="mt-4 w-full cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
