import Image from "next/image";
import backgroundImage from "@/img/background2.jpg";

const Tecnologias= () => {
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
          <h1 className="text-4xl font-bold mb-4 text-white">Tecnologias Avançadas: Detalhes sobre Energias Renováveis</h1> 
          <p className="text-xl mb-6 text-white"> 
            As energias renováveis têm se destacado como uma solução crucial para o futuro energético do planeta, especialmente no combate às mudanças climáticas e na busca por fontes de energia mais sustentáveis. Dentro deste contexto, três das principais tecnologias que estão moldando esse futuro são a energia solar, energia eólica e energia geotérmica.
          </p>

          <h2 className="text-3xl font-semibold mb-3 text-white">Energia Solar</h2>
          <p className="text-xl mb-6 text-white"> 
            A energia solar utiliza a radiação do sol para gerar eletricidade, por meio de painéis fotovoltaicos ou sistemas de aquecimento solar. Com o avanço das tecnologias de células solares, tornou-se possível aumentar a eficiência desses sistemas e reduzir os custos de produção. A energia solar é uma das fontes renováveis mais promissoras, especialmente em regiões com alta incidência solar, e pode ser integrada em larga escala nas redes elétricas para abastecer tanto áreas urbanas quanto rurais.
          </p>

          <h2 className="text-3xl font-semibold mb-3 text-white">Energia Eólica</h2>
          <p className="text-xl mb-6 text-white"> 
            A energia eólica é gerada a partir do movimento do vento, que aciona turbinas eólicas para produzir eletricidade. Os avanços nesta tecnologia incluem turbinas maiores e mais eficientes, que conseguem gerar mais energia com ventos de baixa intensidade. A energia eólica é uma das fontes renováveis que mais cresce em termos de capacidade instalada, sendo utilizada em parques eólicos tanto em terra quanto no mar. Ela é altamente eficaz em regiões costeiras ou com ventos constantes.
          </p>

          <h2 className="text-3xl font-semibold mb-3 text-white">Energia Geotérmica</h2>
          <p className="text-xl mb-6 text-white"> 
            A energia geotérmica aproveita o calor proveniente do interior da Terra para gerar eletricidade ou aquecer ambientes. Esse tipo de energia é particularmente eficiente em regiões com atividade tectônica significativa, como áreas próximas a vulcões ou fontes termais. Com os avanços tecnológicos, a energia geotérmica está se tornando uma fonte confiável e constante de energia, com menor impacto ambiental em comparação com fontes não-renováveis.
          </p>

          <p className="text-xl mb-6 text-white"> 
            Essas tecnologias, além de contribuírem para a redução da emissão de gases de efeito estufa, oferecem uma fonte de energia segura, eficiente e sustentável. O contínuo avanço na pesquisa e desenvolvimento dessas áreas é essencial para atender à crescente demanda por energia limpa e para acelerar a transição energética global.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tecnologias;