import Link from 'next/link';

export default function Consultoria() {
  const cards = [
    { id: 1, title: 'Armazenamento', route: '/pages/armazenamento-energia' },
    { id: 2, title: 'Energia', route: '/pages/energia-gerada' },
    { id: 3, title: 'Feedback', route: '/pages/feedback' },
    { id: 4, title: 'Fonte', route: '/pages/fonte' },
    { id: 5, title: 'Monitoramento', route: '/pages/monitoramento' },
    { id: 6, title: 'Projeto', route: '/pages/projeto-sustentavel' },
    { id: 7, title: 'Rede', route: '/pages/rede-inteligente' },
    { id: 8, title: 'Região', route: '/pages/regiao-sustentavel' },
    { id: 9, title: 'Tecnologia', route: '/pages/tecnologia-renovavel' },
    { id: 10, title: 'Usuário', route: '/pages/usuario' },
  ];
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="bg-gradient-to-l from-green-500 via-green-500 to-green-500 text-transparent bg-clip-text text-[40px] text-center mb-8">Consultoria</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
            <Link href={card.route} className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg text-center hover:bg-green-600 transition">Consultar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}