import useDialog from "@/hooks/useDialog";
import { addOne, updateTodo } from "@/store/useTodoStore";
import { Todo } from "@/types";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type TodoFormProps = {
    editItem?: Todo;
    update?: boolean;
};

type FormValues = {
    title: string;
    todo: string;
};

const length = {
    title: [2, 80],
    todo: [5, 260],
} as const;

const formSchema = z.object({
    title: z.string().min(length.title[0]).max(length.title[1]),
    todo: z.string().min(length.todo[0]).max(length.todo[1]),
});

export default function TodoForm({ editItem, update }: TodoFormProps) {
    const dialog = useDialog();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const values = {
        title: watch("title"),
        todo: watch("todo"),
    };

    const createTodo = ({ title, todo }: FormValues) => {
        const data: Todo = {
            title,
            completed: false,
            id: `${Date.now()}_T${title.slice(0, 4)}`,
            todo,
            userId: `${Date.now()}`,
            deleted: false,
            created: true,
        };

        addOne(data);
        console.log("add todo => ", data);
    };

    const onSubmit = (data: FormValues) => {
        if (editItem && update) {
            updateTodo({ ...editItem, ...data, created: true });
            dialog.onClose();
        } else createTodo(data);
        reset();
    };

    return (
        <section className="col center px-2">
            <h2 className="text-2xl font-semibold py-2 my-2 underline underline-offset-4">
                Add a Todo
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="col text-start gap-2 overflow-hidden"
            >
                <input
                    {...register("title")}
                    defaultValue={editItem?.title ?? ""}
                    type="text"
                    className="input-todo text-lg min-w-[230px] sm:min-w-[340px] max-w-full"
                    placeholder="Enter Title"
                />
                <ErrBox str={values.title} range={length.title} msg={errors.title} />

                <textarea
                    {...register("todo")}
                    defaultValue={editItem?.todo ?? ""}
                    placeholder="Enter a Description"
                    className="input-todo min-h-[180px] min-w-[230px] sm:min-w-[360px]"
                />
                <ErrBox str={values.todo} range={length.todo} msg={errors.todo} />

                <button className="submit">Submit</button>
            </form>
        </section>
    );
}

type ErrBoxProps = {
    str: string;
    msg: FieldError | undefined;
    range: readonly [number, number];
};

function ErrBox({ str = "", range, msg }: ErrBoxProps) {
    const [min, max] = range;
    return (
        <div className="text-xs font-medium ml-1 text-[red] inline-flex gap-2 justify-between">
            {msg?.message}
            <span
                className={`text-xs font-medium ml-1 ${
                    str?.length > max || str?.length < min
                        ? "text-[red]"
                        : "text-green-700/80"
                }`}
            >
                {str?.length}/{max}
            </span>
        </div>
    );
}
