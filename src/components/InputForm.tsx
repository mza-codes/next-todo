import useDialog from "@/hooks/useDialog";
import useTodoStore from "@/store/useTodoStore";
import { Todo } from "@/types";
import { FormEvent } from "react";
import TodoForm from "./TodoForm";

type Props = {
    editItem?: Todo;
    update?: boolean;
};

export default function InputFormV2(props: Props) {
    return <TodoForm {...props} />;
}

export function InputForm({ editItem, update }: Props) {
    const addTodo = useTodoStore((s) => s.addOne);
    const updateTodo = useTodoStore((s) => s.updateTodo);
    const dialog = useDialog();

    const createTodo = (title: string, todo: string) => {
        const data: Todo = {
            title,
            completed: false,
            id: `${Date.now()}_T${title.slice(0, 4)}`,
            todo,
            userId: `${Date.now()}`,
            deleted: false,
        };

        addTodo(data);
        console.log("add todo => ", data);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const [title, todo] = [
            form.get("title")?.toString() ?? "Good Lord!",
            form.get("todo")?.toString() ?? "This is a sample description",
        ];

        if (!editItem) createTodo(title, todo);
        else {
            updateTodo({ ...editItem, title, todo });
        }
        dialog.onClose();
        e.currentTarget.reset();
    };

    return (
        <section className="col center px-2">
            <h2 className="text-2xl font-semibold py-2 my-2 underline underline-offset-4">
                Add a Todo
            </h2>
            <form
                onSubmit={handleSubmit}
                className="col text-start gap-2 overflow-hidden"
            >
                <input
                    defaultValue={editItem?.title ?? ""}
                    type="text"
                    className="input-todo text-lg min-w-[230px] sm:min-w-[340px] max-w-full"
                    name="title"
                    placeholder="Enter Title"
                />
                <span className={`text-xs font-medium ml-1`}>
                    {105}/{240}
                </span>

                <textarea
                    defaultValue={editItem?.todo ?? ""}
                    placeholder="Enter a Description"
                    name="todo"
                    className="input-todo min-h-[180px] min-w-[230px] sm:min-w-[360px]"
                />
                <span className={`text-xs font-medium ml-1`}>
                    {105}/{240}
                </span>
                <button className="submit">Submit</button>
            </form>
        </section>
    );
}
