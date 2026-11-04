import { ArrowLeft } from "lucide-react";

export default function page() {
    return <main className="bg-white w-full">
            <a className="fixed top-10 left-10 px-10 py-2 bg-amber-200 text-white rounded-2xl flex items-center" href="/"><ArrowLeft/> Back</a>
        <img src="/bg.png" alt="" className="w-full" />
    </main>
}