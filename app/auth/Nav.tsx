import Link from "next/link";

export default function Nav(){
    return (
        <nav className="flex justify-between p-5 bg-indigo-900 text-teal-100 font-montserrat">
            <h1>My App</h1>
            <ul className="flex gap-3">
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}