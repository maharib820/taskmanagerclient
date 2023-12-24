import { LuPlus } from "react-icons/lu";
import { useForm } from "react-hook-form"
import { TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { DragDropContext } from 'react-beautiful-dnd';
import DataBoard from "../Components/DataBoard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';

const TaskManager = () => {

    const axiosPublic = useAxiosPublic();

    const [todo, setTodo] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([]);

    const notify = (data) => toast(data, {
        position: toast.POSITION.TOP_CENTER,
    });

    // useEffect(() => {
    //     axiosPublic("/tasks")
    //         .then(res => {
    //             const datas = res.data;
    //             setTodo(datas.filter(data => data.status === 'todo'))
    //             setOngoing(datas.filter(data => data.status === 'ongoing'))
    //             setCompleted(datas.filter(data => data.status === 'completed'))
    //         })
    // }, [axiosPublic]);

    const { data: tasksData, refetch } = useQuery({
        queryKey: ["tasksData"],
        queryFn: async () => {
            const res = await axiosPublic("/tasks");
            return res.data;
        }
    });

    useEffect(() => {
        setTodo(tasksData?.filter(data => data.status === 'todo') || [])
        setOngoing(tasksData?.filter(data => data.status === 'ongoing') || [])
        setCompleted(tasksData?.filter(data => data.status === 'completed') || [])
    }, [tasksData])

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = (data) => {
        if (data.priority === "Select") {
            return toast("Need to select priority");
        }
        data.status = "todo";
        axiosPublic.post("/addtask", data)
            .then(res => {
                if (res.data.insertedId) {
                    notify("Task added successfully");
                    reset();
                    refetch();
                }
            })
    }

    const today = new Date().toISOString().split('T')[0];

    function findItemById(id, array) {
        return array.find((item) => item._id === id);
    }
    function removeItemById(id, array) {
        return array.filter((item) => item._id !== id);
    }

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        console.log(result);
        if (source.droppableId === '1' && destination.droppableId === '2') {
            const d = findItemById(draggableId, todo);
            setTodo(removeItemById(draggableId, todo));
            setOngoing([...ongoing, d]);
            console.log(d);
            axiosPublic.patch(`/task/${draggableId}?status=${"ongoing"}`)
                .then(res => {
                    console.log(res.data);
                })
        }
        else if (source.droppableId === '1' && destination.droppableId === '3') {
            const d = findItemById(draggableId, todo);
            setTodo(removeItemById(draggableId, todo));
            setCompleted([...completed, d]);
            console.log(d);
            axiosPublic.patch(`/task/${draggableId}?status=${"completed"}`)
                .then(res => {
                    console.log(res.data);
                })
        }
        else if (source.droppableId === '2' && destination.droppableId === '1') {
            const d = findItemById(draggableId, ongoing);
            setOngoing(removeItemById(draggableId, ongoing));
            setTodo([...todo, d]);
            console.log(d);
            axiosPublic.patch(`/task/${draggableId}?status=${"todo"}`)
                .then(res => {
                    console.log(res.data);
                })
        }
        else if (source.droppableId === '2' && destination.droppableId === '3') {
            const d = findItemById(draggableId, ongoing);
            setOngoing(removeItemById(draggableId, ongoing));
            setCompleted([...completed, d]);
            console.log(d);
            axiosPublic.patch(`/task/${draggableId}?status=${"completed"}`)
                .then(res => {
                    console.log(res.data);
                })
        }
        else if (source.droppableId === '3' && destination.droppableId === '1') {
            const d = findItemById(draggableId, completed);
            setCompleted(removeItemById(draggableId, completed));
            setTodo([...todo, d]);
            console.log(d);
            axiosPublic.patch(`/task/${draggableId}?status=${"todo"}`)
                .then(res => {
                    console.log(res.data);
                })
        }
        else if (source.droppableId === '3' && destination.droppableId === '2') {
            const d = findItemById(draggableId, completed);
            setCompleted(removeItemById(draggableId, completed));
            setOngoing([...ongoing, d]);
            console.log(d);
            axiosPublic.patch(`/task/${draggableId}?status=${"ongoing"}`)
                .then(res => {
                    console.log(res.data);
                })
        }
        else return;
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="max-w-7xl h-fit mx-auto mt-10 bg-gray-100 p-2">
                <ToastContainer></ToastContainer>
                <div className="flex justify-between items-center shadow px-4 bg-white h-20 rounded-xl">
                    <h2 className="text-xl">Manage Task</h2>
                    <button onClick={() => document.getElementById('add-task').showModal()} className="btn rounded-full bg-green-500 text-white">
                        <LuPlus></LuPlus>
                        Create Task
                    </button>
                    <dialog id="add-task" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <form className="flex flex-col my-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col mt-5 space-y-2">
                                    <span className="label-text">Title Name</span>
                                    <TextField {...register("title")} id="outlined-basic" label="Title" variant="outlined" required />
                                    <span className="label-text">Description</span>
                                    <TextField {...register("description")} id="outlined-basic" label="Description" variant="outlined" required />
                                    <span className="label-text">Expired Date</span>
                                    <TextField {...register("deadline")} type="date" id="outlined-basic" variant="outlined" required InputProps={{ inputProps: { min: today, } }} />
                                    <span className="label-text">Priority</span>
                                    <select defaultValue={"Select"} {...register("priority")} className="select select-bordered w-full rounded">
                                        <option disabled>Select</option>
                                        <option>Low</option>
                                        <option>Moderate</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <input className="btn bg-green-500 text-white" type="submit" value="Add Task" />
                            </form>
                        </div>
                    </dialog>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 mt-5 min-h-32">
                    <DataBoard datas={todo} id={"1"} title={"To Do List"} refetch={refetch}></DataBoard>
                    <DataBoard datas={ongoing} id={"2"} title={"Ongoing List"} refetch={refetch}></DataBoard>
                    <DataBoard datas={completed} id={"3"} title={"Completed List"} refetch={refetch}></DataBoard>
                </div>
            </div>
        </DragDropContext>
    );
};

export default TaskManager;