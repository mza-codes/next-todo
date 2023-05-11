import InputForm from "@/components/InputForm";
import Todos from "@/components/Todos";
import useDialog from "@/hooks/useDialog";
import { MdFormatListBulletedAdd } from "react-icons/md";

export default function HomePage() {
    const dialog = useDialog();

    const addTodoModal = () => {
        dialog.openWithContent(
            <section className="col center px-2">
                <h2 className="text-2xl font-semibold py-2 my-2 underline underline-offset-4">
                    Add a Todo
                </h2>
                <InputForm />
            </section>,
            `#ddd`
        );
    };

    return (
        <>
            <center className="my-4 py-6 text-center w-full font-semibold text-3xl relative">
                <span className="text-emerald-600 underline underline-offset-4">
                    App -{" "}
                </span>
                <b className="text-green-500 underline underline-offset-4">Todo</b>

                <div className="absolute right-2 bottom-2 row gap-1">
                    <button onClick={addTodoModal} className="icon-button p-2">
                        <MdFormatListBulletedAdd size={24} color="green" />
                    </button>
                </div>
            </center>
            {/* <InputForm />
            <hr className="w-full h-1 bg-slate-700 my-4 border-slate-700 rounded-lg" /> */}

            <Todos />
        </>
    );
}
