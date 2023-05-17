import useTodoStore from "@/store/useTodoStore";
import { Todo } from "@/types";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiServerStack } from "react-icons/hi2";
import { shallow } from "zustand/shallow";

export default function AddBulkTodos() {
    const [loading, setLoading] = useTodoStore((s) => [s.loading, s.setLoading], shallow);
    const addMany = useTodoStore((s) => s.addMany);
    const total = useTodoStore((s) => s.todos.length);

    const addBulkTodos = async () => {
        setLoading(true);
        try {
            const data: Todo[] = await fetch(
                `https://jsonplaceholder.typicode.com/todos`
            ).then((res) => res.json());

            await new Promise<Todo[]>((resolve) => {
                const newArray = data?.map((todo) => {
                    return {
                        ...todo,
                        deleted: false,
                        todo: todo?.title,
                    };
                });
                resolve(newArray.slice(0, 80));
            }).then((arr) => {
                addMany(arr);
                toast.success(`${arr.length ?? 0} Items Added Successfully!`);
            });
        } catch (err) {
            console.log("Error fetching data from server!", err);
        } finally {
            setLoading(false);
        }
    };

    if (total >= 126) return null;
    else
        return (
            <button disabled={loading} onClick={addBulkTodos} className="icon-button p-2">
                <HiServerStack size={24} color="#123" />
            </button>
        );
}
