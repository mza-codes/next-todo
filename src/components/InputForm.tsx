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

        console.log("add tod => ", data);
    };

    return (
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
    );
}
