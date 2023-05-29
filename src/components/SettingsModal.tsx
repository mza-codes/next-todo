import useTodoStore, { removeMany } from "@/store/useTodoStore";

export default function SettingsModal() {
    const { resetStore, todos } = useTodoStore();
    return (
        <section className="col center px-2 gap-4">
            <h2 className="text-2xl font-semibold py-2 my-2 underline underline-offset-4">
                Settings
            </h2>
            <span className="font-medium">
                Total Todos: <b>{todos.length}</b>
            </span>
            <button
                title="Remove Todos that's not added by you"
                onClick={removeMany}
                className="btn-1 bg-rose-600 hover:bg-rose-700 text-white"
            >
                CleanUp Todos
            </button>
            <button
                title="Clear all data"
                onClick={resetStore}
                className="btn-1 bg-red-600 hover:bg-red-700 text-white"
            >
                Clear Data
            </button>
        </section>
    );
}
