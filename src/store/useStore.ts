import { AppCache } from "@/constants";
import { Todo } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SetFunction = (
    partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
) => void;

const InitiateStore = (set: SetFunction, get: () => Store): Store => ({
    todos: [],
    getAllTodos() {
        return get().todos;
    },
    addOne(todo) {
        set({
            todos: [todo, ...get().todos],
        });
    },
    removeOne(todo) {
        set({
            todos: get().todos.filter((td) => td.id !== todo.id),
        });
    },
    resetStore() {
        set({ todos: [] });
    },
    modifyTodo(todo) {
        set({
            todos: get().todos.filter((td) => {
                if (td.id === todo.id) {
                    return {
                        ...td,
                        ...todo,
                    };
                } else return td;
            }),
        });
    },
});

const useStore = create<Store, [["zustand/persist", Store]]>(
    persist((set, get) => InitiateStore(set, get), {
        name: AppCache,
        storage: createJSONStorage(() => localStorage),
    })
);

export default useStore;

interface Store {
    // @values
    todos: Todo[];

    // @functions
    addOne: (todo: Todo) => void;
    removeOne: (todo: Todo) => void;
    getAllTodos: () => Todo[];
    resetStore: () => void;
    modifyTodo: (todo: Partial<Todo>) => void;
}
