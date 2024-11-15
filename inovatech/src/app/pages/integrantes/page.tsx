import Image from "next/image";
import gabrielaImage from '@/img/integrante-gabriela.jpg';
import mateusImage from '@/img/integrante-mateus.jpg';
import anaImage from '@/img/integrante-ana.jpg';
import githubLogo from '@/img/logo-github.jpg';
import linkedinLogo from "@/img/linkedin.jpg";

export default function Integrantes() {
  return (
    <section className="text-center">
      <div className="bg-gradient-to-l from-[#67f86b] via-[#3cd36b] to-[#67f86b] text-transparent bg-clip-text text-[40px]">
        <h2>Integrantes</h2>
        <hr/>
      </div>
      <div className="contanier integrante grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 p-5 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-1">

        <div className="integrante text-center p-5 border border-gray-300 shadow-md rounded-md transition-transform duration-200 transform hover:translate-y-[-10px] mx-5">
          <p className="mt-4 text-lg text-gray-800">Ana Carolina de Castro Gonçalves</p>
          <Image src={anaImage} alt="Ana Carolina de Castro Gonçalves" className=" w-full h-auto mb-2 rounded-full" />
          <p className="text-lg text-gray-600">RM: 554669</p>
          <div className="flex justify-center mt-2">
            <a href="https://github.com/anacarolcg0" target="_blank" rel="noopener noreferrer">
              <Image src={githubLogo} alt="GitHub Logo" className="w-8 h-8 mx-2" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Image src={linkedinLogo} alt="LinkedIn Logo" className="w-8 h-8 mx-2" />
            </a>
          </div>
        </div>

        <div className="integrante text-center p-5 border border-gray-300 shadow-md rounded-md transition-transform duration-200 transform hover:translate-y-[-10px] mx-5">
          <p className="mt-4 text-lg text-gray-800">Gabriela Gomes Cezar</p>
          <Image src={gabrielaImage} alt="Gabriela Gomes Cezar" className=" w-full h-auto mb-2 rounded-full" />
          <p className="text-lg text-gray-600">RM: 556941</p>
          <div className="flex justify-center mt-2">
            <a href="https://github.com/gabimezze" target="_blank" rel="noopener noreferrer">
              <Image src={githubLogo} alt="GitHub Logo" className="w-8 h-8 mx-2" />
            </a>
            <a href="https://www.linkedin.com/in/gabimezze" target="_blank" rel="noopener noreferrer">
              <Image src={linkedinLogo} alt="LinkedIn Logo" className="w-8 h-8 mx-2" />
            </a>
          </div>
        </div>

        <div className="integrante text-center p-5 border border-gray-300 shadow-md rounded-md transition-transform duration-200 transform hover:translate-y-[-10px] mx-5">
          <p className="mt-4 text-lg text-gray-800">Mateus De Castro Nappe</p>
          <Image src={mateusImage} alt="Mateus De Castro Nappe" className=" w-full h-auto mb-2 rounded-full" />
          <p className="text-lg text-gray-600">RM: 556474</p>
          <div className="flex justify-center mt-2">
            <a href="https://github.com/mateuscastronappe" target="_blank" rel="noopener noreferrer">
              <Image src={githubLogo} alt="GitHub Logo" className="w-8 h-8 mx-2" />
            </a>
            <a href="https://www.linkedin.com/in/mateus-castro-0a43b82b3/" target="_blank" rel="noopener noreferrer">
              <Image src={linkedinLogo} alt="LinkedIn Logo" className="w-8 h-8 mx-2" />
            </a>
          </div>
        </div>

        <div className="repositorio text-center p-5 border border-gray-300 shadow-md rounded-md transition-transform duration-200 transform hover:translate-y-[-10px] mx-5">
          <p className="mt -4 text-lg text-gray-800">Touch the cat!</p>
          <a href="https://github.com/mateuscastronappe/inovatech" target="_blank" rel="noopener noreferrer">
            <Image src={githubLogo} alt="GitHub Logo" className=" w-full h-auto mb-2 rounded-full" />
          </a>
          <p className="text-lg text-gray-600">Veja nosso repositório</p>
        </div>
      </div>
    </section>
  );
}