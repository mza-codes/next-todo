import { useState } from "react";
import TodoItemWInput, { LoadingSkeleton } from "./TodoItemWInput";
import { Todo } from "@/types";
import useRunOnce from "@/hooks/useRunOnce";

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useRunOnce(async () => {
        try {
            const data: any = await fetch(`https://dummyjson.com/todos`).then((res) =>
                res.json()
            );
            await new Promise((res) => setTimeout(res, 4000));
            console.log("RES => ", data);
            setTodos(data?.todos ?? []);
        } catch (e: any) {
            console.log("fetching todos -> err =>", e);
            setTodos([]);
        } finally {
            setLoading(false);
        }
    });

    if (loading)
        return (
            <section className="row gap-2 ml-4 center">
                {[...Array(24)].map((_, i) => (
                    <LoadingSkeleton key={i} />
                ))}
            </section>
        );
    if (!loading && todos?.length <= 0) return <h2>An Error Occurred!</h2>;

    return (
        <section className="row gap-2 ml-4 center">
            {todos.map((td, i) => (
                <TodoItemWInput {...td} key={i} />
            ))}
        </section>
    );
}
