import { useState } from "react";
import TodoItemWInput from "./TodoItemWInput";
import { Todo } from "@/types";
import useRunOnce from "@/hooks/useRunOnce";

export const AppCache = `app-todo`;

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useRunOnce(async () => {
        try {
            const existing = localStorage.getItem(AppCache);
            const data: any = await fetch(`https://dummyjson.com/todos`).then((res) =>
                res.json()
            );
            console.log("RES => ", data);
            if (existing) {
                const arr = JSON.parse(existing);
                setTodos([...arr, ...data?.todos] ?? []);
            } else setTodos(data?.todos ?? []);
        } catch (e: any) {
            console.log("fetching todos -> err =>", e);
            setTodos([]);
        }
    });

    return (
        <section className="row gap-2 ml-4 center">
            {todos.map((td, i) => (
                <TodoItemWInput {...td} key={i} />
            ))}
        </section>
    );
}
