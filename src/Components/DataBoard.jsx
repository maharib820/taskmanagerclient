import { Draggable, Droppable } from "react-beautiful-dnd";
import { CiMenuKebab } from "react-icons/ci";
import { FaFontAwesomeFlag } from "react-icons/fa";
import PropTypes from 'prop-types';
import { MdDelete } from "react-icons/md";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";

const DataBoard = ({ datas, id, title, refetch }) => {

    const notify = (data) => toast(data, {
        position: toast.POSITION.TOP_CENTER,
    });

    const axiosPublic = useAxiosPublic();

    const handleDelete = (id) => {
        axiosPublic.delete(`/task/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    notify("Task deleted");
                    refetch();
                }
            })
    }

    return (
        <Droppable droppableId={`${id}`}>
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1 bg-white p-4 rounded">
                        <ToastContainer></ToastContainer>
                        <h2>{title}</h2>
                        <div className="mt-5 space-y-4" >
                            {
                                datas?.map((data, index) => (
                                    <Draggable key={data._id} draggableId={data._id} index={index}>
                                        {
                                            (provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-[#f3f4f6] shadow p-5" key={data._id}>
                                                    <div className="flex justify-between items-center">
                                                        <div className="badge badge-primary">{data.title}</div>
                                                        <div className="dropdown dropdown-end">
                                                            <button tabIndex={0} role="button" className="btn m-1"><CiMenuKebab></CiMenuKebab></button>
                                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                                <li><button onClick={() => handleDelete(data._id)}><MdDelete className="text-red-600 text-xl" /> Delete</button></li>
                                                                <div>
                                                                    <Link to={`/update/${data._id}`}><li><button><FiEdit3 className="text-red-600 text-xl" /> Edit</button></li></Link>
                                                                </div>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <p>{data.description}</p>
                                                    </div>
                                                    <div className="mt-8 flex justify-between items-center">
                                                        <div className="flex items-center gap-2"><FaFontAwesomeFlag></FaFontAwesomeFlag> <p>{data.deadline}</p></div>
                                                        <p>Prirory: {data.priority}</p>
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                )
                                )
                            }
                        </div>
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    );
};

export default DataBoard;

DataBoard.propTypes = {
    datas: PropTypes.array,
    id: PropTypes.string,
    title: PropTypes.string,
    refetch: PropTypes.func
}