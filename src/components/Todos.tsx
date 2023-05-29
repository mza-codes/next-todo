import { useState } from "react";
import TodoItemWInput, { LoadingSkeleton } from "./TodoItemWInput";
import useRunOnce from "@/hooks/useRunOnce";
import useTodoStore from "@/store/useTodoStore";
import { shallow } from "zustand/shallow";

export default function Todos() {
    const todos = useTodoStore((s) => s.todos);
    const [loading, setLoading] = useTodoStore((s) => [s.loading, s.setLoading], shallow);

    useRunOnce(() => setLoading(false));

    if (loading)
        return (
            <section className="row gap-2 ml-4 center">
                {[...Array(24)].map((_, i) => (
                    <LoadingSkeleton key={i} />
                ))}
            </section>
        );

    if (!loading && todos?.length <= 0)
        return (
            <section className="col center gap-2">
                <h2 className="font-medium">
                    You haven't Added any Todos, <br /> There's Nothing to Show Here
                </h2>
            </section>
        );

    return (
        <section className="row gap-2 ml-4 items-center justify-center">
            {todos.map((td, i) => (
                <TodoItemWInput todo={td} key={i} />
            ))}
        </section>
    );
}
