import {Squirrel} from "lucide-react";

export default function ErrorPage() {
    return (
        <section className="flex items-center h-full sm:p-16">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                <Squirrel className="size-44" />
                <p className="text-3xl">Looks like our services are currently offline</p>
                <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded">Volver a la pagina principal</a>
            </div>
        </section>
    );
}