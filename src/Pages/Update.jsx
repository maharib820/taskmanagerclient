import { useForm } from "react-hook-form"
import { TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Update = () => {

    const params = useParams();

    const axiosPublic = useAxiosPublic();

    const [taskdata, setTaskdata] = useState();
    useEffect(() => {
        axiosPublic(`/task/${params.id}`)
            .then(res => {
                setTaskdata(res.data);
            })
    }, [axiosPublic, params.id])

    // const { data: taskdata } = useQuery({
    //     queryKey: ["taskdata"],
    //     queryFn: async () => {
    //         const res = await axiosPublic(`/task/${params.id}`);
    //         return res.data;
    //     }
    // });

    const notify = (data) => toast(data, {
        position: toast.POSITION.TOP_CENTER,
    });

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        // if (data.priority === "Select") {
        //     return toast("Need to select priority");
        // }
        // data.status = "todo";
        axiosPublic.post(`/task/${taskdata._id}`, data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    notify("Task updated successfully");
                }
            })
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="max-w-5xl m-auto">
            <ToastContainer></ToastContainer>
            {
                taskdata ?
                    <form className="flex flex-col my-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col mt-5 space-y-2">
                            <span className="label-text">Title Name</span>
                            <TextField defaultValue={taskdata?.title} {...register("title")} id="outlined-basic" label="Title" variant="outlined" required />
                            <span className="label-text">Description</span>
                            <TextField defaultValue={taskdata?.description} {...register("description")} id="outlined-basic" label="Description" variant="outlined" required />
                            <span className="label-text">Expired Date</span>
                            <TextField defaultValue={taskdata?.deadline} {...register("deadline")} type="date" id="outlined-basic" variant="outlined" required InputProps={{ inputProps: { min: today, } }} />
                            <span className="label-text">Priority</span>
                            <select defaultValue={taskdata?.priority} {...register("priority")} className="select select-bordered w-full rounded">
                                <option>Low</option>
                                <option>Moderate</option>
                                <option>High</option>
                            </select>
                        </div>
                        <input className="btn bg-green-500 text-white" type="submit" value="Update Task" />
                    </form> : ""
            }
        </div>
    );
};

export default Update;