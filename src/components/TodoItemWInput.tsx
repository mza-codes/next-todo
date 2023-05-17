"use client";

import useDialog from "@/hooks/useDialog";
import { Todo } from "@/types";
import { BiListCheck, BiUndo } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { IoArrowUndoCircleSharp } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import DeleteDialog from "./Dialog/DeleteDialog";
import useTodoStore from "@/store/useTodoStore";
import InputForm from "./InputForm";
import { useCallback } from "react";

const opacity = `icon-button p-1 opacity-20 hover:opacity-100 transition-opacity duration-200`;

const scaleTextArea = (el: HTMLTextAreaElement) => {
    el.style.height = `${el.scrollHeight + 1}px`;
};

export default function TodoItemWInput({ todo }: { todo: Todo }) {
    const dialog = useDialog();
    const deleteOne = useTodoStore((s) => s.removeOne);
    const modifyTodo = useTodoStore((s) => s.modifyTodo);

    const deleteTodo = useCallback(() => {
        dialog.openWithContent(<DeleteDialog />, "#fff", () => {
            console.log("Delete todo => ", todo);
            deleteOne(todo);
        });
    }, [todo]);

    const editTodo = useCallback(() => {
        dialog.openWithContent(<InputForm update editItem={todo} />, `rgb(195 195 195)`);
    }, [todo]);

    return (
        <div
            className={`col relative rounded-md pt-4 py-12 px-2 shadow-md hover:shadow-lg overflow-hidden min-w-[200px] max-w-[220px] sm:max-w-[360px] capitalize flex-grow todo-card ${
                todo.completed && !todo.deleted
                    ? "todo-success"
                    : todo.deleted
                    ? "todo-deleted"
                    : "todo-pending"
            }`}
        >
            {/* <input
                value={value}
                type="text"
                className="todo-item text-xl"
                placeholder="Enter Title"
                onChange={(e) => setValue(e.target.value)}
            />
            <textarea
                defaultValue={todo.todo}
                placeholder="Enter a Description"
                name="desc"
                className="todo-item min-h-[80px]"
                onChange={(e) => {
                    scaleTextArea(e.currentTarget);
                }}
            /> */}

            <div className="todo-item text-xl">{todo.title}</div>
            <div className="todo-item min-h-[80px]">{todo.todo}</div>

            <div className="absolute bottom-1 right-1 row gap-1">
                {!todo.completed && !todo.deleted && (
                    <button
                        title={`Mark as Complete`}
                        onClick={() => {
                            modifyTodo(todo.id, { completed: true });
                        }}
                        className={`${opacity}`}
                    >
                        <BiListCheck size={24} color="green" />
                    </button>
                )}
                {todo.completed && (
                    <button
                        title={`Mark as Incomplete`}
                        onClick={() => {
                            modifyTodo(todo.id, { completed: false });
                        }}
                        className={`${opacity}`}
                    >
                        <BiUndo size={24} color="#222" />
                    </button>
                )}
                {todo.deleted && (
                    <button
                        title={`Undo Delete`}
                        onClick={() => {
                            modifyTodo(todo.id, { deleted: false });
                        }}
                        className={`${opacity}`}
                    >
                        <IoArrowUndoCircleSharp size={22} color="#444" />
                    </button>
                )}
                <button
                    title={todo.deleted ? "Confirm Delete" : "Delete Item"}
                    onClick={() => {
                        if (todo.deleted) deleteTodo();
                        else modifyTodo(todo.id, { deleted: true });
                    }}
                    className={`${opacity}`}
                >
                    <RiDeleteBack2Fill size={20} color="red" />
                </button>
            </div>
            <div className="absolute left-1 bottom-1">
                {!todo.completed && !todo.deleted && (
                    <button onClick={editTodo} className={`${opacity}`}>
                        <TbEdit size={22} color="#555" />
                    </button>
                )}
            </div>
        </div>
    );
}

export const LoadingSkeleton = () => (
    <main className="col relative bg-white rounded-md px-2 py-4 gap-2 shadow-md hover:shadow-lg min-w-[200px] animate-pulse">
        <div className="w-full bg-gray-400 h-2 rounded-md" />
        <div className="w-11/12 bg-gray-500 h-2 rounded-md" />
        <div className="h-[40px] w-3/4 bg-gray-300 rounded-md" />
        <div className="w-11/12 bg-gray-600 h-2 rounded-md" />
        <div className="w-10/12 bg-gray-700 h-2 rounded-md" />
        <div className="w-full bg-slate-800 h-2 rounded-md" />
    </main>
);
