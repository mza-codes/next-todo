import useTodoStore from "@/store/useTodoStore";
import { Todo } from "@/types";
import { FormEvent } from "react";
import { toast } from "react-hot-toast";

export default function InputForm() {
    const addTodo = useTodoStore((s) => s.addOne);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const data: Todo = {
            title: form.get("title")?.toString() ?? "Good Lord!",
            completed: false,
            id: `${Date.now()}`,
            todo: form.get("todo")?.toString() ?? "This is a sample description",
            userId: Date.now(),
        };

        addTodo(data);
        console.log("add tod => ", data);
        toast.success("One Item Added Successfully!");
    };

    return (
        <section className="col center px-2">
            <h2 className="text-2xl font-semibold py-2 my-2 underline underline-offset-4">
                Add a Todo
            </h2>
            <form onSubmit={handleSubmit} className="col gap-4 overflow-hidden">
                <input
                    type="text"
                    className="input-todo text-lg min-w-[230px] sm:min-w-[340px]"
                    name="title"
                    placeholder="Enter Title"
                />
                <textarea
                    placeholder="Enter a Description"
                    name="todo"
                    className="input-todo min-h-[180px] min-w-[230px] sm:min-w-[360px]"
                ></textarea>
                <button className="submit">Submit</button>
            </form>
        </section>
    );
}
