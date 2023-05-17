import useTodoStore from "@/store/useTodoStore";

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
                onClick={resetStore}
                className="btn-1 bg-red-600 hover:bg-red-700 text-white"
            >
                Clear Data
            </button>
        </section>
    );
}
