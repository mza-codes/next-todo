import InputForm from "@/components/InputForm";
import Todos from "@/components/Todos";

export default function HomePage() {
    return (
        <>
            <center className="my-4 text-center w-full font-semibold text-3xl">
                <span className="text-emerald-600 underline underline-offset-4">
                    App -{" "}
                </span>
                <b className="text-green-500 underline underline-offset-4">Todo</b>
            </center>
            <InputForm />
            <hr className="w-full h-1 bg-slate-700 my-4 border-slate-700 rounded-lg" />
            <Todos />
        </>
    );
}
