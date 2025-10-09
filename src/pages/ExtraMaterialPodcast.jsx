import React from 'react';
import { motion } from 'framer-motion';
import ButtonBackToExtra from '../components/ui/ButtonBackToExtra';


const ExtraMaterialPodcast = () => {
  const episodes = [
    {
      id: 1,
      title: 'Enchendo o Cache #26 - iPhone 17: modelos, preços no Brasil e primeiros problemas.',
      image: 'https://i.scdn.co/image/ab67656300005f1f82d713bd083cc04a65204d60',
      url: 'https://open.spotify.com/episode/4ctd8dkGS6YssZzRz1QZ0c?si=188eef37e5c343b7',
      embed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/4ctd8dkGS6YssZzRz1QZ0c?utm_source=generator" width="100%" height="200" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    },
    {
      id: 2,
      title: 'Enchendo o Cache #25: Airbnb vira mineradora, Silksong explode e Google bate US$ 3 tri',
      image: 'https://i.scdn.co/image/ab67656300005f1fab109b4d5fdc7bdeb037a92b',
      url: 'https://open.spotify.com/episode/3CNZxddiBDkrzgL8kWLQ9K?si=85192b7519134c8c',
      embed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/3CNZxddiBDkrzgL8kWLQ9K?utm_source=generator" width="100%" height="200" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    },
    {
      id: 3,
      title: 'Enchendo o Cache #24: IA no mercado de trabalho, golpe milionário no Pix e WhatsApp em teste',
      image: 'https://i.scdn.co/image/ab67656300005f1f34c0b58e5f5406a26460329a',
      url: 'https://open.spotify.com/episode/3QNU4WdLdjkaipulWZNOHj?si=51bca40fb14442b5',
      embed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/3QNU4WdLdjkaipulWZNOHj?utm_source=generator" width="100%" height="200" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    },
    {
      id: 4,
      title: 'EPISÓDIO #18 — TESTING COMPANY: 15 ANOS DE QUALIDADE',
      image: 'https://i.scdn.co/image/ab67656300005f1f93225439c149b6c0003674b8',
      url: 'https://open.spotify.com/episode/78qoO8RhYbvNhC6K9A4X74?si=53c4150c80df4781',
      embed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/78qoO8RhYbvNhC6K9A4X74?utm_source=generator" width="100%" height="200" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    },
    {
      id: 5,
      title: 'Enchendo o Cache #23: GPT-5, empregos em risco e o futuro da IA',
      image: 'https://i.scdn.co/image/ab67656300005f1fa70c317f6a25f8723f56a1f9',
      url: 'https://open.spotify.com/episode/1VKkvoFtxG3hBZ6FKltOSi?si=23cbe302f46a45c9',
      embed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/1VKkvoFtxG3hBZ6FKltOSi?utm_source=generator" width="100%" height="200" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    },
  ];

  return (
    <div className="space-y-8">
      <ButtonBackToExtra />
      <h1 className="text-2xl font-bold text-foreground">🎙️ Podcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {episodes.map((ep, index) => (
          <motion.a
            key={ep.id}
            href={ep.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="block bg-card border rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {ep.image && (
              <img
                src={ep.image}
                alt={ep.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold mb-3">{ep.title}</h3>
              {/* <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: ep.embed }}
              /> */}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default ExtraMaterialPodcast;