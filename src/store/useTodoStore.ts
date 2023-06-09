import { AppCache } from "@/constants";
import { Todo } from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SetFunction = (
    partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
) => void;

const InitiateStore = (set: SetFunction, get: () => Store): Store => ({
    todos: [],
    loading: false,
    addOne(todo) {
        set({
            todos: [todo, ...get().todos],
        });
        toast.success("One Item Added Successfully!");
    },
    removeOne(todo) {
        set({
            todos: get().todos.filter((td) => td.id !== todo.id),
        });
        toast.success("One Item Deleted successfully!");
    },
    resetStore() {
        set({ todos: [] });
        toast.success("All Todos Deleted!");
    },
    modifyTodo(id, todo) {
        set({
            todos: get().todos.map((td): Todo => {
                if (td.id === id) {
                    return {
                        ...td,
                        ...todo,
                    };
                } else return td;
            }),
        });
        // toast.success("Todo Modified Successfully!");
    },
    updateTodo(todo) {
        set({
            todos: get().todos.map((td): Todo => {
                if (td.id === todo?.id) return todo;
                else return td;
            }),
        });
        // toast.success("Todo Updated Successfully!");
    },
    addMany(data, end) {
        if (end) set({ todos: [...get().todos, ...data] });
        else set({ todos: [...data, ...get().todos] });
    },
    removeMany() {
        const before = get().todos.length;
        set({
            todos: get().todos.filter((todo) => todo.created),
        });
        const after = get().todos.length;
        toast.success(`${before - after} Todos Deleted!`);
    },
    startLoading: () => set({ loading: true }),
    stopLoading: () => set({ loading: false }),
    setLoading: (bool) => set({ loading: bool }),
});

const useTodoStore = create<Store, [["zustand/persist", Store]]>(
    persist((set, get) => InitiateStore(set, get), {
        name: AppCache,
        storage: createJSONStorage(() => localStorage),
    })
);

export default useTodoStore;
export const { removeMany, removeOne, modifyTodo, addOne, updateTodo } =
    useTodoStore.getState();

interface Store {
    // @values
    todos: Todo[];
    loading: boolean;

    // @functions
    addOne: (todo: Todo) => void;
    removeOne: (todo: Todo) => void;
    resetStore: () => void;
    modifyTodo: (id: string, todo: Partial<Todo>) => void;
    updateTodo: (todo: Todo) => void;
    addMany: (data: Todo[], start?: boolean) => void;
    removeMany: () => void;
    startLoading: () => void;
    stopLoading: () => void;
    setLoading: (loader: boolean) => void;
}
