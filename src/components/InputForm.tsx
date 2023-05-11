import { Todo } from "@/types";
import { FormEvent, useMemo } from "react";

export default function InputForm() {
    const arr: Todo[] = useMemo(() => [], []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const data: Todo = {
            title: form.get("title")?.toString() ?? "Good Lord!",
            completed: false,
            id: `${Date.now()}`,
            todo: form.get("desc")?.toString() ?? "This is a sample description",
            userId: Date.now(),
        };

        arr.push(data);
        localStorage.setItem("app-todo", JSON.stringify(arr));
    };

    return (
        <form onSubmit={handleSubmit} className="col items-start gap-2 ml-4">
            <input
                type="text"
                className="input-todo text-xl min-w-[230px] sm:min-w-[340px]"
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
    );
}
