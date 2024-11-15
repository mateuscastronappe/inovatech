import Menu from "@/components/Menu/Menu";
import Image from "next/image";
import imgLogo from "@/img/logo-energia.jpg"

export default function Cabecalho() {
    return (
        <header className="cabecalho">
            <Image src={imgLogo} alt="logo" width={40} height={40} className="mr-2 mt-2 inline-flex" />
            <h1>Verdis</h1>
            <Menu />
        </header>
    );
}