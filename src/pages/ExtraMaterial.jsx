import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Mic, Video, File } from 'lucide-react'; // ícones grandes para categorias

const categoryIcons = {
  PDF: <FileText className="h-16 w-16 text-primary mx-auto mb-4" />,
  Artigo: <File className="h-16 w-16 text-primary mx-auto mb-4" />,
  Podcast: <Mic className="h-16 w-16 text-primary mx-auto mb-4" />,
  Vídeo: <Video className="h-16 w-16 text-primary mx-auto mb-4" />,
  Post: <File className="h-16 w-16 text-primary mx-auto mb-4" />
};

const CategoryCard = ({ category, index }) => {
  const routePath = `/dashboard/extra-material/${category.type}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={routePath}>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-6 text-center cursor-pointer">
          {categoryIcons[category.type] || categoryIcons['Post']}
          <h3 className="text-lg font-bold mt-2">{category.type}</h3>
        </div>
      </Link>
    </motion.div>
  );
};

const ExtraMaterial = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Exemplo de categorias
    setCategories([
      { id: 1, type: 'PDF' },
      { id: 2, type: 'Artigo' },
      { id: 3, type: 'Podcast' },
      { id: 4, type: 'Vídeo' },
      { id: 5, type: 'Post' },
      { id: 6, type: 'Docs' } 
    ]);
  }, []);

  if (categories.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-8 bg-muted rounded-lg">
        Nenhuma categoria disponível no momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <CategoryCard key={category.id} category={category} index={index} />
      ))}
    </div>
  );
};

export default ExtraMaterial;
