import Link from "next/link";

export default function Menu() {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/pages/tecnologias">Tecnologias</Link></li>
                <li><Link href="/pages/armazenamento">Armazenamento</Link></li>
                <li><Link href="/pages/integracao">Integração</Link></li>
                <li><Link href="/pages/consultar">API</Link></li>
                <li><Link href="/pages/integrantes">Integrantes</Link></li>
            </ul>
        </nav>
    )
}