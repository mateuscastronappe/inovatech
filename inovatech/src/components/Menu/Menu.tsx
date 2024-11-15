import Link from "next/link";

export default function Menu() {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="">Tecnologias</Link></li>
                <li><Link href="">Armazenamento</Link></li>
                <li><Link href="">Integração</Link></li>
                <li><Link href="">API</Link></li>
                <li><Link href="">Integrantes</Link></li>
            </ul>
        </nav>
    )
}