import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ThumbsUp, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

const ForumTopic = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [reply, setReply] = useState('');

  const topic = {
    id: topicId,
    title: 'Como criar testes de API com Postman?',
    author: {
      name: 'Ana Silva',
      role: 'Estudante de Testes de Software',
      stars: 3,
    },
    content:
      'Olá! Estou começando a criar testes de API e gostaria de entender como estruturar os testes no Postman. Alguém pode compartilhar boas práticas?',
    createdAt: '06/06/2025 14:32',
    views: 120,
    replies: [
      {
        id: '1',
        author: {
          name: 'Carlos Lima',
          role: 'QA Sênior',
          stars: 5,
        },
        content:
          'Oi Ana! No Postman você pode usar a aba "Tests" para escrever scripts em JavaScript. Uma boa prática é criar coleções organizadas e usar variáveis de ambiente.',
        createdAt: '06/06/2025 16:20',
        likes: 4,
        isSolution: false,
      },
      {
        id: '2',
        author: {
          name: 'Fernanda Alves',
          role: 'Engenheira de Qualidade',
          stars: 4,
        },
        content:
          'Também recomendo usar o Postman CLI (Newman) para integrar com CI/CD. Você pode exportar suas coleções e rodar os testes automaticamente!',
        createdAt: '06/06/2025 18:45',
        likes: 7,
        isSolution: true,
      },
    ],
  };

  const handleSubmitReply = () => {
    if (!reply.trim()) return;

    toast({
      title: 'Resposta enviada!',
      description: 'Sua resposta foi publicada com sucesso',
    });
    setReply('');
  };

  const handleLike = (replyId) => {
    toast({
      title: 'Curtido!',
      description:
        '🚧 Este recurso ainda não está implementado — mas você pode solicitá-lo no próximo prompt! 🚀',
    });
  };

  return (
    <>
      <Helmet>
        <title>{topic.title} - Fórum QA</title>
        <meta name="description" content={topic.content} />
      </Helmet>

      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/forum')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Fórum
        </Button>

        {/* Topic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>

          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {topic.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold flex items-center gap-2">
                {topic.author.name}
                <span className="text-sm text-muted-foreground">
                  • {topic.author.role}
                </span>
                <span className="flex items-center text-yellow-500 text-sm ml-2">
                  <Star className="h-4 w-4 mr-1 fill-yellow-500" />
                  {topic.author.stars}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Postado em {topic.createdAt}
              </p>
            </div>
          </div>

          <p className="text-foreground/90 mb-4">{topic.content}</p>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{topic.replies.length} respostas</span>
            </span>
            <span>{topic.views} visualizações</span>
          </div>
        </motion.div>

        {/* Replies */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Respostas</h2>
          {topic.replies.map((reply, index) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-card rounded-xl shadow-lg p-6 border relative ${reply.isSolution
                  ? 'border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                  : ''
                }`}
            >
              {reply.isSolution && (
                <div className="absolute -top-3 right-4 flex items-center space-x-2 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  <Star className="h-4 w-4" />
                  <span>MELHOR RESPOSTA</span>
                </div>
              )}

              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {reply.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    {reply.author.name}
                    <span className="text-sm text-muted-foreground">
                      • {reply.author.role}
                    </span>
                    <span className="flex items-center text-yellow-500 text-sm ml-2">
                      <Star className="h-4 w-4 mr-1 fill-yellow-500" />
                      {reply.author.stars}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reply.createdAt}
                  </p>
                </div>
              </div>

              <p className="text-foreground/90 mb-4">{reply.content}</p>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(reply.id)}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {reply.likes} Útil
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Marcar como melhor resposta
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reply Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h3 className="text-lg font-bold mb-4">Sua Resposta</h3>
          <Textarea
            placeholder="Escreva sua resposta..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={5}
            className="mb-4"
          />
          <Button onClick={handleSubmitReply} variant="destructive">
            Enviar Resposta
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default ForumTopic;
