import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ButtonBackToExtra from '../components/ui/ButtonBackToExtra';


const ExtraMaterialPDF = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    setMaterials([
      {
        id: 1,
        title: 'Automação de Testes: Como Medir o Retorno Sobre Investimento',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_materiaisgratuitos150.png',
        url: 'https://testingcompany.com.br/materiais-gratuitos/pdfs/automacao-de-testes-como-medir-o-retorno-sobre-investimento.pdf',
      },
      {
        id: 2,
        title: 'CI/CD: Como implementar um processo de qualidade em 2024',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_materiaisgratuitos149.png',
        url: 'https://testingcompany.com.br/materiais-gratuitos/pdfs/ci-cd-como-implementar-um-processo-de-qualidade-em-2024.pdf',
      },
      {
        id: 3,
        title: 'Automação de Testes em Sistemas Desktop',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_materiaisgratuitos148.png',
        url: 'https://testingcompany.com.br/materiais-gratuitos/pdfs/automacao-de-testes-em-sistemas-desktop.pdf',
      },
      {
        id: 4,
        title: 'Desenvolvimento com Qualidade',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_materiaisgratuitos_146.png',
        url: 'https://testingcompany.com.br/materiais-gratuitos/pdfs/desenvolvimento-com-qualidade.pdf',
      },
      {
        id: 5,
        title: 'Passo a passo para implantar uma boa gestão da qualidade',
        image: 'https://testingcompany.com.br/admin/plugins/images/imagem_materiaisgratuitos144.png',
        url: 'https://testingcompany.com.br/materiais-gratuitos/pdfs/passo-a-passo-para-implantar-uma-boa-gestao-da-qualidade-em-empresas-desenvolvedoras-de-software.pdf',
      },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <ButtonBackToExtra />
      <h1 className="text-2xl font-bold text-foreground">📘 Materiais em PDF</h1>
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
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExtraMaterialPDF;
