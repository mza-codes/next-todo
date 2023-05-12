import InputForm from "@/components/InputForm";
import Todos from "@/components/Todos";
import useDialog from "@/hooks/useDialog";
import useTodoStore from "@/store/useTodoStore";
import Head from "next/head";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { RiFolderSettingsFill } from "react-icons/ri";

export default function HomePage() {
    const dialog = useDialog();
    // const len = useTodoStore.getState().todos.length

    const addTodoModal = () => {
        dialog.openWithContent(<InputForm />, `rgb(195 195 195)`);
    };

    const openSettings = () => {
        dialog.openWithContent(
            <section className="col center px-2 gap-4">
                <h2 className="text-2xl font-semibold py-2 my-2 underline underline-offset-4">
                    Settings
                </h2>
                <span className="font-medium">
                    Total Todos: <b>{useTodoStore.getState().todos.length}</b>
                </span>
                <button
                    onClick={useTodoStore.getState().resetStore}
                    className="btn-1 bg-red-600 hover:bg-red-700 text-white"
                >
                    Clear Data
                </button>
            </section>,
            `#fff`
        );
    };

    return (
        <>
            <Head>
                <title>Todo - App | Home</title>
            </Head>
            <center className="my-4 py-6 text-center w-full font-semibold text-3xl relative">
                <span className="text-emerald-600 underline underline-offset-4">
                    App -{" "}
                </span>
                <b className="text-green-500 underline underline-offset-4">Todo</b>

                <div className="absolute right-2 bottom-2 row gap-1">
                    <button onClick={addTodoModal} className="icon-button p-2">
                        <MdFormatListBulletedAdd size={24} color="green" />
                    </button>
                    <button onClick={openSettings} className="icon-button p-2">
                        <RiFolderSettingsFill size={24} color="gray" />
                    </button>
                </div>
            </center>
            <Todos />
        </>
    );
}
