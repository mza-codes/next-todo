import useDialog from "@/hooks/useDialog";
import { Todo } from "@/types";
import { BiListCheck } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import DeleteDialog from "./Dialog/DeleteDialog";
import { toast } from "react-hot-toast";

const opacity = `opacity-20 hover:opacity-100 transition-opacity duration-200`;

const scaleTextArea = (el: HTMLTextAreaElement) => {
    el.style.height = `${el.scrollHeight + 1}px`;
};

export default function TodoItemWInput(todo: Todo) {
    const dialog = useDialog();

    const deleteTodo = () => {
        dialog.openWithContent(<DeleteDialog />, "#fff", () => {
            console.log("Delete todo => ", todo);
            toast.success("One Item Deleted successfully!");
        });
    };

    return (
        <div className="col relative bg-white rounded-md pt-4 py-12 px-2 shadow-md hover:shadow-lg overflow-hidden">
            <input
                defaultValue={todo?.title ?? `${todo.id} => ${todo.userId}`}
                type="text"
                className="todo-item text-xl"
                placeholder="Enter Title"
            />
            <textarea
                defaultValue={todo.todo}
                placeholder="Enter a Description"
                name="desc"
                className="todo-item min-h-[80px]"
                onChange={(e) => {
                    scaleTextArea(e.currentTarget);
                }}
            ></textarea>
            <div className="absolute bottom-1 right-1 row gap-1">
                {!todo.completed && (
                    <button className={`icon-button p-1 opacity-20 ${opacity}`}>
                        <BiListCheck size={24} color="green" />
                    </button>
                )}
                <button
                    onClick={deleteTodo}
                    className={`icon-button p-1 opacity-20 ${opacity}`}
                >
                    <RiDeleteBack2Fill size={20} color="red" />
                </button>
            </div>
        </div>
    );
}

export const LoadingSkeleton = () => (
    <main className="col relative bg-white rounded-md px-2 py-4 gap-2 shadow-md hover:shadow-lg min-w-[200px] animate-pulse">
        <div className="w-full bg-gray-400 h-2 rounded-md" />
        <div className="w-11/12 bg-gray-500 h-2 rounded-md" />
        <div className="h-[40px] w-3/4 bg-gray-300 rounded-md" />
        <div className="w-11/12 bg-gray-600 h-2 rounded-md" />
        <div className="w-10/12 bg-gray-700 h-2 rounded-md" />
        <div className="w-full bg-slate-800 h-2 rounded-md" />
    </main>
);
