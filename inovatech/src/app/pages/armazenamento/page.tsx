import Image from "next/image";
import backgroundImage from "@/img/background3.jpg";

const Armazenamento = () => {
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
          <h1 className="text-4xl font-bold mb-4 text-white">Armazenamento Eficiente: Inovações em Baterias e Supercapacitores</h1> 
          <p className="text-xl mb-6 text-white"> 
            O armazenamento eficiente de energia é um dos maiores desafios na área de energias renováveis, uma vez que a produção de energia solar e eólica depende das condições climáticas e não pode ser constante o tempo todo. Para resolver essa intermitência e garantir que a energia gerada seja disponível quando necessário, as inovações em baterias e supercapacitores desempenham um papel fundamental.
          </p>

          <h2 className="text-3xl font-semibold mb-3 text-white">Baterias</h2>
          <p className="text-xl mb-6 text-white"> 
            As baterias são uma das soluções mais comuns para o armazenamento de energia renovável. Elas armazenam eletricidade e liberam-na quando necessário. As inovações recentes em baterias buscam aumentar a capacidade de armazenamento, a vida útil e a eficiência, além de reduzir os custos e os impactos ambientais.
          </p>

          <h3 className="text-2xl font-semibold mb-3 text-white">Baterias de Lítio-Ion</h3>
          <p className="text-xl mb-6 text-white"> 
            As baterias de lítio-ion são as mais utilizadas hoje em dia devido à sua alta eficiência, durabilidade e capacidade de armazenar grandes quantidades de energia. Contudo, os pesquisadores estão em busca de alternativas que possam reduzir a dependência de lítio e melhorar a sustentabilidade da produção dessas baterias.
          </p>

          <h3 className="text-2xl font-semibold mb-3 text-white">Baterias de Sódio-Ion</h3>
          <p className="text-xl mb-6 text-white"> 
            Uma das alternativas promissoras são as baterias de sódio-ion, que têm o potencial de serem mais baratas e ecológicas do que as de lítio, embora atualmente ainda enfrentem desafios de desempenho. O sódio é mais abundante e menos impactante ambientalmente, o que torna essa tecnologia uma opção interessante para o futuro.
          </p>

          <h3 className="text-2xl font-semibold mb-3 text-white">Baterias de Fluoreto</h3>
          <p className="text-xl mb-6 text-white"> 
            As baterias de fluoreto oferecem uma maior densidade energética e maior durabilidade, mas ainda estão em fase de desenvolvimento. Elas poderiam ser uma opção viável para armazenamento de grande escala, especialmente para sistemas de energia renovável integrados às redes elétricas.
          </p>

          <h2 className="text-3xl font-semibold mb-3 text-white">Supercapacitores</h2>
          <p className="text-xl mb-6 text-white"> 
            Enquanto as baterias armazenam grandes quantidades de energia para liberação gradual, os supercapacitores são dispositivos que armazenam e liberam energia muito rapidamente. Eles são particularmente eficazes em aplicações que exigem alta potência em curtos períodos de tempo, como no arranque de veículos elétricos ou em sistemas de backup de energia.
          </p>

          <h3 className="text-2xl font-semibold mb-3 text-white">Supercapacitores de Carbono</h3>
          <p className="text-xl mb-6 text-white"> 
            Um dos principais tipos de supercapacitores são os de carbono, que utilizam materiais como grafeno e nanotubos de carbono para aumentar a capacidade de armazenamento de energia. Esses materiais têm a capacidade de armazenar uma grande quantidade de energia de forma eficiente, além de oferecerem alta durabilidade e uma taxa de carga e descarga muito rápida.
          </p>

          <h3 className="text-2xl font-semibold mb-3 text-white">Supercapacitores Híbridos</h3>
          <p className="text-xl mb-6 text-white"> 
            Os supercapacitores híbridos combinam características de baterias e supercapacitores tradicionais, oferecendo uma solução intermediária que pode fornecer maior densidade de energia e maior eficiência em comparação com os supercapacitores convencionais. Eles têm se mostrado promissores para aplicações em veículos elétricos e sistemas de energia renovável.
          </p>

          <p className="text-xl mb-6 text-white"> 
            As inovações em baterias e supercapacitores não apenas visam melhorar a capacidade de armazenamento de energia renovável, mas também aumentar a segurança e a sustentabilidade desses sistemas. À medida que essas tecnologias avançam, o armazenamento eficiente de energia se tornará cada vez mais crucial para a integração de fontes renováveis em larga escala, contribuindo para um futuro energético mais limpo, sustentável e acessível.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Armazenamento;