import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trophy, Flame, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const Profile = () => {
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
    'Testes de API: Automação com Postman e Newman',
    'Fundamentos de QA: A Base para a Qualidade',
  ];

  const totalAnswers = 100;
  const totalRatedAnswers = 34;
  const totalStars = 150;
  const kdRatio = ((totalStars / totalRatedAnswers) * (totalRatedAnswers / totalAnswers) * 5).toFixed(2);

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(16);
    doc.text(user.name, 10, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(`Cargo: ${user.title}`, 10, y);
    y += 6;
    doc.text(user.description, 10, y);
    y += 10;
    
    doc.text('Links:', 10, y);
    y += 6;
    doc.textWithLink('GitHub', 12, y, { url: user.github }); y += 6;
    doc.textWithLink('LinkedIn', 12, y, { url: user.linkedin }); y += 6;
    doc.textWithLink('Instagram', 12, y, { url: user.instagram }); y += 6;
    doc.textWithLink('Outros', 12, y, { url: user.other });
    y += 6;
    y += 6;
    doc.text('Cursos Concluídos:', 10, y);
    y += 6;
    courses.forEach((c) => {
      doc.text(`• ${c}`, 12, y);
      y += 6;
    });

    y += 6;
    doc.text('Hard Skills:', 10, y);
    y += 6;
    hardSkills.forEach((s) => {
      doc.text(`${s.name}: LVL. ${s.level}`, 12, y);
      y += 6;
    });

    y += 6;
    doc.text('Soft Skills:', 10, y);
    y += 6;
    softSkills.forEach((s) => {
      doc.text(`${s.name}: LVL. ${s.level}`, 12, y);
      y += 6;
    });

    y += 6;
    doc.text('Badges:', 10, y);
    badges.slice(0, 2).forEach((b) => {
      doc.text(`${b.name}`, 12, y);
      y += 6;
    });


    doc.save(`${user.name}.pdf`);
  };

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
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarFallback className="bg-white text-primary text-3xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

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
            <Button onClick={exportPDF} variant="secondary" size="sm">Exportar PDF</Button>
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
                to={`/dashboard/tracks/${encodeURIComponent(c)}`}
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
                  <span>LVL. {s.level}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

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
                className={`p-4 rounded-xl text-center transition cursor-help ${
                  b.earned
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
