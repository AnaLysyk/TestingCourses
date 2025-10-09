import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ButtonBackToExtra from '../components/ui/ButtonBackToExtra';


const ExtraMaterialVideo = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    setMaterials([
      {
        id: 1,
        title: 'Enchendo o Cache #26 - iPhone 17: modelos, preços no Brasil e primeiros problemas.',
        image: 'https://img.youtube.com/vi/XBoZCSfkN3U/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=XBoZCSfkN3U&t',
      },
      {
        id: 2,
        title: 'Sala de Decisão #3 | Quem realmente protege a reputação da sua empresa?',
        image: 'https://img.youtube.com/vi/CmVr1fU742s/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=CmVr1fU742s',
      },
      {
        id: 3,
        title: 'Bugs em Produção? Descubra o Que Isso Revela Sobre Seu Processo de QA!',
        image: 'https://img.youtube.com/vi/WUSKDcuOLYg/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=WUSKDcuOLYg',
      },
      {
        id: 4,
        title: 'Sala de Decisão #2 | Quantos QAs sua equipe realmente precisa?',
        image: 'https://img.youtube.com/vi/b0aoIsUNHC8/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=b0aoIsUNHC8',
      },
      {
        id: 5,
        title: 'Enchendo o Cache #25: Airbnb vira mineradora, Silksong explode e Google bate US$ 3 tri',
        image: 'https://img.youtube.com/vi/SSMzVxksRKU/hqdefault.jpg',
        url: 'https://www.youtube.com/watch?v=SSMzVxksRKU',
      },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <ButtonBackToExtra />
      <h1 className="text-2xl font-bold text-foreground">🎥 Vídeos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {materials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={item.url} target="_blank" rel="noopener noreferrer">
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
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExtraMaterialVideo;
