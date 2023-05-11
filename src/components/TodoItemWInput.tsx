import { Todo } from "@/types";
import { BiListCheck } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";

const opacity = `opacity-20 hover:opacity-100 transition-opacity duration-200`;

const scaleTextArea = (el: HTMLTextAreaElement) => {
    el.style.height = `${el.scrollHeight + 1}px`;
};

export default function TodoItemWInput(todo: Todo) {
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
                <button className={`icon-button p-1 opacity-20 ${opacity}`}>
                    <RiDeleteBack2Fill size={20} color="red" />
                </button>
            </div>
        </div>
    );
}
