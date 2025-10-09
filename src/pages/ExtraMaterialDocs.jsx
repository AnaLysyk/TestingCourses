import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ButtonBackToExtra from '../components/ui/ButtonBackToExtra';

const Docs = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    setDocs([
      {
        id: 1,
        name: 'Postman',
        url: 'https://learning.postman.com/docs/',
        description: 'Documentação oficial do Postman, com guias de automação e API testing.'
      },
      {
        id: 2,
        name: 'Selenium',
        url: 'https://www.selenium.dev/documentation/',
        description: 'Documentação oficial do Selenium WebDriver e Grid.'
      },
      {
        id: 3,
        name: 'Cypress',
        url: 'https://docs.cypress.io/',
        description: 'Documentação oficial do Cypress, com exemplos e API reference.'
      },
      {
        id: 4,
        name: 'Cucumber',
        url: 'https://cucumber.io/docs/',
        description: 'Guia e documentação oficial do Cucumber BDD.'
      },
      {
        id: 5,
        name: 'Playwright',
        url: 'https://playwright.dev/docs/intro',
        description: 'Documentação oficial do Playwright para automação de testes modernos.'
      }
    ]);
  }, []);

  if (docs.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-8 bg-muted rounded-lg">
        Nenhuma documentação disponível no momento.
      </div>
    );
  }

  return (
    <div className="p-6">
      <ButtonBackToExtra />
      <h2 className="text-2xl font-bold mb-6">📘 Documentações Oficiais</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc, index) => (
          <motion.a
            key={doc.id}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden 
                       group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-6 cursor-pointer"
          >
            <div className="text-center">
              <ExternalLink className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">{doc.name}</h3>
              <p className="text-sm text-muted-foreground">{doc.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Docs;
