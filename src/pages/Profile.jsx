import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trophy, Flame, Star, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { generatePDF } from '../components/generatePDF';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem('profileImage') || '/profile.jpg'
  );

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Lê o arquivo e converte para base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      localStorage.setItem('profileImage', base64data); // salva no navegador
      setProfileImage(base64data); // atualiza a exibição
    };
    reader.readAsDataURL(file);
  };

  const user = {
    name: 'Bruno Mocellin',
    email: 'brun0_lp@hotmail.com',
    github: 'https://www.github.com/stormizinhu',
    linkedin: 'https://www.linkedin.com/in/bruno-stormizinhu-mocellin/',
    instagram: 'https://www.instagram.com/stormizinhu',
    other: 'https://www.twitch.tv/stormizinhu',
    points: 410,
    streak: 10,
    title: 'QA Engineer',
    description:
      'Apaixonado por qualidade e automação, sempre buscando aprimorar a experiência e a entrega de software.',
  };

  const badges = [
    { id: '1', name: '🎯 Primeiro Quiz', earned: true, next: '3 quizzes respondidos' },
    { id: '2', name: '🔥 Streak 10 dias', earned: true, next: '15 dias de streak' },
    { id: '3', name: '🎓 Primeiro Curso Concluído', earned: true, next: '5 cursos concluídos' },
    { id: '4', name: '👨‍🏫 Mentor Ativo', earned: false, next: 'Responder 5 perguntas no fórum' },
  ];

  const hardSkills = [
    { name: 'Testes Manuais', level: 4 },
    { name: 'Testes Automatizados', level: 3 },
    { name: 'Testes de API', level: 4 },
    { name: 'Testes Mobile', level: 2 },
  ];

  const softSkills = [
    { name: 'Comunicação', level: 2 },
    { name: 'Resolução de Problemas', level: 3 },
    { name: 'Trabalho em Equipe', level: 4 },
  ];

  const courses = [
    'Introdução ao QA',
    'Fundamentos de QA: A Base para a Qualidade',
  ];

  const totalAnswers = 100;
  const totalRatedAnswers = 34;
  const totalStars = 150;
  const kdRatio = ((totalStars / totalRatedAnswers) * (totalRatedAnswers / totalAnswers) * 5).toFixed(2);

  return (
    <>
      <Helmet>
        <title>Perfil - Testing Courses</title>
      </Helmet>

      <div className="space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-destructive rounded-2xl p-8 text-white relative"
        >
          <div className="flex items-center space-x-6 relative">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={profileImage} alt="Foto de perfil" />
                <AvatarFallback className="bg-white text-primary text-3xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-0 bg-black/70 rounded-full p-1 cursor-pointer hover:bg-black/90 transition"
                title="Alterar foto de perfil"
              >
                <Camera className="h-5 w-5 text-white" />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-white/80 mb-2">{user.email}</p>

              {/* STAR KD */}
              <div
                className="absolute bottom-4 right-6 flex items-center space-x-2 bg-black/20 px-3 py-2 rounded-lg cursor-help"
                title={`${totalStars} estrelas em ${totalRatedAnswers} respostas avaliadas de ${totalAnswers} totais`}
              >
                <Star className="text-yellow-400 h-5 w-5" />
                <span className="font-semibold">{kdRatio}</span>
              </div>

              {/* Links */}
              <div className="flex items-center space-x-3 mb-3">
                <a href={user.github} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">GitHub</Button>
                </a>
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">LinkedIn</Button>
                </a>
                <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">Instagram</Button>
                </a>
                <a href={user.other} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">Outros</Button>
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span className="font-semibold">{user.points} pontos</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Flame className="h-5 w-5" />
                  <span className="font-semibold">{user.streak} dias</span>
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <Button onClick={() => generatePDF(user, courses, hardSkills, softSkills, badges, kdRatio)} variant="secondary" size="sm">
              Exportar PDF
            </Button>
          </div>
        </motion.div>

        {/* Cargo e descrição */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h2 className="text-xl font-bold mb-1">{user.title}</h2>
          <p className="text-muted-foreground">{user.description}</p>
        </motion.div>

        {/* Cursos concluídos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h2 className="text-xl font-bold mb-4">🎓 Cursos Concluídos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {courses.map((c, i) => (
              <Link
                to={`/dashboard/tracks/basico/1`}
                key={i}
                className="p-4 bg-muted hover:bg-primary/10 rounded-xl shadow cursor-pointer transition text-center"
                title={`Ver detalhes de ${c}`}
              >
                <p className="font-semibold">{c}</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Skills lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ title: '⚙️ Hard Skills', data: hardSkills }, { title: '💬 Soft Skills', data: softSkills }].map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl shadow-lg p-6 border"
            >
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              {section.data.map((s) => (
                <div key={s.name} className="flex justify-between mb-2 cursor-help" title={`Nível atual: ${s.level}`}>
                  <span>{s.name}</span>
                  <span><strong>LVL. {s.level}</strong></span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h2 className="text-xl font-bold mb-4">📝 Notas</h2>

          <div className="space-y-3">
            {[
              {
                course: 'Introdução ao QA',
                timestamp: '03:42',
                desc: 'Explicação sobre os diferentes tipos de testes e quando aplicá-los em um ciclo de desenvolvimento.',
                link: 'http://localhost:3000/dashboard/lesson/basico-1-0-0#notes',
              },
              {
                course: 'Fundamentos de QA: A Base para a Qualidade',
                timestamp: '12:10',
                desc: 'Momento em que o instrutor mostra na prática como criar casos de teste eficientes.',
                link: '/dashboard/tracks/basico/2#t=12m10s',
              },
              {
                course: 'Automação de Testes - Primeiros Passos',
                timestamp: '07:55',
                desc: 'Demonstração inicial do uso do Playwright para automatizar testes de interface web.',
                link: '/dashboard/tracks/basico/3#t=7m55s',
              },
            ].map((note, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg hover:bg-muted/50 transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold">{note.course}</p>
                  <Link
                    to={note.link}
                    className="text-primary font-mono text-sm hover:underline"
                    title="Ir para o ponto no curso"
                  >
                    {note.timestamp}
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground truncate">{note.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h2 className="text-xl font-bold mb-4">🏅 Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-xl text-center transition cursor-help ${b.earned
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30'
                  : 'bg-muted opacity-50'
                  }`}
                title={`Próxima variação: ${b.next}`}
              >
                <div className="text-4xl mb-2">{b.name.split(' ')[0]}</div>
                <p className="text-sm font-semibold">{b.name.replace(/^[^\s]+\s/, '')}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
