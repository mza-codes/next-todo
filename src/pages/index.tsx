import AddBulkTodos from "@/components/AddBulkTodos";
import InputForm from "@/components/InputForm";
import SettingsModal from "@/components/SettingsModal";
import Todos from "@/components/Todos";
import useDialog from "@/hooks/useDialog";
import Head from "next/head";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { RiFolderSettingsFill } from "react-icons/ri";

export default function HomePage() {
    const dialog = useDialog();

    const addTodoModal = () => {
        dialog.openWithContent(<InputForm />, `rgb(195 195 195)`);
    };

    const openSettings = () => {
        dialog.openWithContent(<SettingsModal />, `#fff`);
    };

    return (
        <>
            <Head>
                <title>Todo - App | Home</title>
            </Head>
            <header className="col gap-2 center text-center my-4 py-6 ">
                <center className="font-semibold text-3xl">
                    <span className="text-emerald-600 underline underline-offset-4">
                        App -{" "}
                    </span>
                    <b className="text-green-500 underline underline-offset-4">Todo</b>
                </center>
                <div className="ml-auto row gap-1">
                    <button onClick={addTodoModal} className="icon-button p-2">
                        <MdFormatListBulletedAdd size={24} color="green" />
                    </button>
                    <button onClick={openSettings} className="icon-button p-2">
                        <RiFolderSettingsFill size={24} color="gray" />
                    </button>
                    <AddBulkTodos />
                </div>
            </header>
            <Todos />
        </>
    );
}
