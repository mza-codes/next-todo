import { Todo } from "@/types";

export default function TodoItemWInput(todo: Todo) {
    return (
        <div className="col bg-white rounded-md p-2 shadow-md hover:shadow-lg">
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
                className="todo-item min-h-[60px]"
            ></textarea>
        </div>
    );
}
