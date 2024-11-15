import Image from "next/image";
import backgroundImage from "@/img/background.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-5 relative"> 
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40"
        />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-5"> 
        <div className="max-w-3xl bg-black shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Introdução</h1> 
          <p className="text-xl mb-6 text-white"> 
            Com o avanço das mudanças climáticas e a crescente demanda por soluções sustentáveis, as energias renováveis emergem como uma resposta essencial para garantir um futuro energético limpo e eficiente. A transição energética requer a integração de tecnologias avançadas, sistemas de armazenamento eficientes e redes inteligentes que otimizem a produção, distribuição e uso da energia. Este projeto explora três pilares fundamentais dessa transformação, destacando inovações em tecnologias renováveis, armazenamento de energia e integração na rede elétrica.
          </p>

          <h2 className="text-3xl font-semibold mb-3 text-white">Resumo das Áreas Principais</h2> 

          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-white">1. Tecnologias Avançadas</h3> 
            <p className="text-xl text-white"> 
              As tecnologias renováveis desempenham um papel crucial na transição energética. Inovações em sistemas de geração solar, eólica e geotérmica possibilitam maior eficiência e escalabilidade, reduzindo os custos e o impacto ambiental associados à produção de energia.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-white">2. Armazenamento Eficiente</h3> 
            <p className="text-xl text-white"> 
              A eficiência no armazenamento de energia é essencial para superar os desafios de intermitência das fontes renováveis. Novas abordagens em baterias e supercapacitores aumentam a capacidade de armazenamento, assegurando que a energia gerada possa ser utilizada em períodos de baixa produção.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-white">3. Integração na Rede</h3> 
            <p className="text-xl text-white"> 
              Para maximizar os benefícios das energias renováveis, é indispensável a modernização das redes elétricas. Soluções como smart grids e sistemas integrados de gestão promovem uma distribuição mais eficiente, reduzindo perdas e otimizando o uso da energia em larga escala.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
