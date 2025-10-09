import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

import basicoTrack from '@/data/tracks/basico.json';
import intermediarioTrack from '@/data/tracks/intermediario.json';
import avancadoTrack from '@/data/tracks/avancado.json';

const trackMap = {
  basico: basicoTrack.tracks,
  intermediario: intermediarioTrack.tracks,
  avancado: avancadoTrack.tracks,
};

const bannerColors = {
  basico: 'from-emerald-400 to-white',
  intermediario: 'from-orange-400 to-white',
  avancado: 'from-purple-400 to-white',
};

export default function TrackDetail() {
  const { level, trackId } = useParams();
  const [track, setTrack] = useState(null);
  const { completedLessons, getTrackProgress } = useProgress();

  useEffect(() => {
    if (level && trackId && trackMap[level]) {
      const foundTrack = trackMap[level].find((t) => t.id === Number(trackId));
      setTrack(foundTrack || null);
    }
  }, [level, trackId]);

  if (!track) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalLessons = track.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  const progress = getTrackProgress(`${level}-${trackId}`);
  const bannerColor = bannerColors[level] || 'from-gray-200 to-gray-400';

  return (
    <>
      <Helmet>
        <title>{track.title} - Testing Courses</title>
      </Helmet>

      <div className="space-y-6">
        <Link
          to="/dashboard/tracks"
          className="flex items-center text-sm text-primary font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Trilhas
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-8 text-black bg-gradient-to-br ${bannerColor}`}
        >
          <h1 className="text-3xl font-bold mb-2">{track.title}</h1>
          <p className="text-white/90 mb-4">{track.audience}</p>
          <div className="flex items-center space-x-4 text-sm">
            <span>{track.modules.length} módulos</span>
            <span>•</span>
            <span>{totalLessons} aulas</span>
            <span>•</span>
            <span>{track.hours_total} horas</span>
          </div>
          {progress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-white/30 rounded-full h-2.5">
                <div
                  className="bg-white h-2.5 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-right text-xs mt-1">{progress}% concluído</p>
            </div>
          )}
        </motion.div>

        {/* Módulos */}
        <div className="space-y-4">
          {track.modules.map((module, moduleIndex) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (moduleIndex + 1) * 0.1 }}
              className="bg-card rounded-xl shadow-lg overflow-hidden border"
            >
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold">
                  Módulo {moduleIndex + 1}: {module.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {module.lessons?.length || 0} aulas • Aprox. {module.hours} horas
                </p>
              </div>

              <div className="divide-y divide-border">
                {module.lessons?.map((lesson, lessonIndex) => {
                  const lessonId = `${level}-${trackId}-${moduleIndex}-${lessonIndex}`;
                  const isCompleted = completedLessons.has(lessonId);

                  return (
                    <Link
                      key={`${lesson.title}-${lessonIndex}`}
                      to={`/dashboard/lesson/${lessonId}`}
                      className="block p-4 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <PlayCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="font-medium truncate">{lesson.title}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                              <Clock className="h-4 w-4" />
                              <span>{lesson.duration_min} min</span>
                            </div>
                          </div>
                        </div>
                        {isCompleted && (
                          <span className="text-xs text-green-600 font-semibold ml-2 whitespace-nowrap">
                            Concluído
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
