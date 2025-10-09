import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  Calendar,
  MessageSquare,
  Trophy,
  Flame,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Mic,
  Video,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Pontos', value: user?.points || 410, icon: Trophy, color: 'text-yellow-500' },
    { label: 'Streak', value: `${user?.streak || 7} dias`, icon: Flame, color: 'text-orange-500' },
    { label: 'Badges', value: user?.badges?.length || 2, icon: Award, color: 'text-purple-500' },
    {
      label: 'Progresso',
      value: '45%',
      icon: TrendingUp,
      color: 'text-green-500',
      course: 'Testes de API: Automação com Postman e Newman'
    },
  ];

  const quickActions = [
    { title: 'Continuar Trilha', description: 'Testes de API com Postman', href: '/dashboard/tracks/intermediario', icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Próxima Missão', description: 'Falha Controlada - Módulo 3', href: '/missions', icon: Target, color: 'bg-red-500' },
    { title: 'Plano de Estudos', description: 'Ver calendário semanal', href: '/study-plan', icon: Calendar, color: 'bg-green-500' },
    { title: 'Fórum QA', description: '3 novas discussões', href: '/forum', icon: MessageSquare, color: 'bg-purple-500' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Testing Courses</title>
        <meta
          name="description"
          content="Acompanhe seu progresso, pontos e conquistas na plataforma Testing Courses"
        />
      </Helmet>

      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground">
            Olá, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo de volta! Continue sua jornada de aprendizado.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card rounded-xl p-6 shadow-lg border border-border"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>

                {stat.course && (
                  <p className="text-sm text-muted-foreground mt-1">{stat.course}</p>
                )}

                <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>

                {stat.label === 'Progresso' && (
                  <div className="w-full bg-border rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: stat.value }}
                    ></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
          >
            <h2 className="text-xl font-bold mb-4 text-foreground">Continue de onde parou</h2>
            <Link to="/dashboard/tracks/intermediario" className="block group">
              <div className="bg-muted/50 p-4 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">Testes de API: Automação com Postman e Newman</p>
                    <p className="text-sm text-muted-foreground">Módulo 2: Test Scripts</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="w-full bg-border rounded-full h-2.5 mt-3">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
          >
            <h2 className="text-xl font-bold mb-4 text-foreground">Próxima Missão</h2>
            <Link to="/dashboard/mission-controlled" className="block group">
              <div className="bg-muted/50 p-4 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-destructive">Falha Controlada: Status Code</p>
                    <p className="text-sm text-muted-foreground">Trilha de Testes de API</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-yellow-500 font-semibold">
                  <Trophy className="h-4 w-4" />
                  <span>+40 pontos</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-card rounded-xl p-6 shadow-lg border border-border"
        >
          <h2 className="text-xl font-bold mb-4 text-foreground">Atividade Recente</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground flex-grow">
                Completou a aula <span className="font-semibold text-foreground">"Introdução ao Postman"</span>
              </p>
              <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">2h atrás</span>
            </div>

            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground flex-grow">
                Ganhou badge <span className="font-semibold text-foreground">"Primeiro Quiz"</span>
              </p>
              <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">1 dia atrás</span>
            </div>

            <div className="flex items-center">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground flex-grow">
                Respondeu no fórum <span className="font-semibold text-foreground">"Como criar testes de API"</span>
              </p>
              <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">2 dias atrás</span>
            </div>
          </div>
        </motion.div>

        {/* New Materials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-card rounded-xl p-6 shadow-lg border border-border"
        >
          <h2 className="text-xl font-bold mb-4 text-foreground">Novos Materiais Extras</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mr-4">
                <Mic className="h-5 w-5 text-pink-600" />
              </div>
              <p className="text-sm text-muted-foreground flex-grow">
                Novo podcast disponível: <span className="font-semibold text-foreground">"Boas práticas em QA Ágil"</span>
              </p>
              <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">Hoje</span>
            </div>

            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                <Video className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground flex-grow">
                Novo vídeo adicionado: <span className="font-semibold text-foreground">"Como depurar testes com Postman"</span>
              </p>
              <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">Ontem</span>
            </div>

            <div className="flex items-center">
              <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground flex-grow">
                Novo PDF publicado: <span className="font-semibold text-foreground">"Checklist de Testes Automatizados"</span>
              </p>
              <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">3 dias atrás</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
