import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ButtonBackToExtra from '../components/ui/ButtonBackToExtra';

const ExtraMaterialArtigo = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    setMaterials([
      {
        id: 1,
        title: '15 Critérios de Qualidade que fazem a diferença: o que nossos Clientes mais valorizam na prática',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_post_310.jpg',
        url: 'https://testingcompany.com.br/blog/15-criterios-de-qualidade-que-fazem-a-diferenca-o-que-nossos-clientes-mais-valorizam-na-pratica'
      },
      {
        id: 2,
        title: 'A importância de contar com Equipes Capacitadas na Automação de Testes',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_post_309.jpg',
        url: 'https://testingcompany.com.br/blog/a-importancia-de-contar-com-equipes-capacitadas-na-automacao-de-testes'
      },
      {
        id: 3,
        title: 'Documentação de Testes de Software: O Alicerce da Qualidade e Confiabilidade',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_post_308.jpg',
        url: 'https://testingcompany.com.br/blog/documentacao-de-testes-de-software-o-alicerce-da-qualidade-e-confiabilidade'
      },
      {
        id: 4,
        title: '30 frentes de atuação da Testing Company: Conheça a estrutura por trás da Qualidade',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_post_307.jpg',
        url: 'https://testingcompany.com.br/blog/30-frentes-de-atuacao-da-testing-company-conheca-a-estrutura-por-tras-da-qualidade'
      },
      {
        id: 5,
        title: 'Por que falar de cultura de design em empresas tech?',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_post_306.jpg',
        url: 'https://testingcompany.com.br/blog/por-que-falar-de-cultura-de-design-em-empresas-tech'
      },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <ButtonBackToExtra />
      <h1 className="text-2xl font-bold text-foreground">📰 Artigos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {materials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-card border rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExtraMaterialArtigo;
