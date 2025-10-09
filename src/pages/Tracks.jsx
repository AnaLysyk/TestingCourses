import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Bug, Bot, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

import basicoTrack from '@/data/tracks/basico.json';
import intermediarioTrack from '@/data/tracks/intermediario.json';
import avancadoTrack from '@/data/tracks/avancado.json';

const levels = {
  basico: { name: 'Básico', icon: Bug, color: 'from-white to-emerald-400' },
  intermediario: { name: 'Intermediário', icon: Bot, color: 'from-white to-orange-400' },
  avancado: { name: 'Avançado', icon: GitBranch, color: 'from-white to-purple-400' },
};

const tracksData = {
  basico: basicoTrack.tracks,
  intermediario: intermediarioTrack.tracks,
  avancado: avancadoTrack.tracks,
};

export default function Tracks() {
  const [search, setSearch] = useState('');
  const [selectedTracks, setSelectedTracks] = useState({
    basico: true,
    intermediario: true,
    avancado: true,
  });

  const handleCheckboxChange = (level) => {
    setSelectedTracks((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  const filteredTracks = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    const result = {};

    Object.entries(tracksData).forEach(([level, tracks]) => {
      if (selectedTracks[level]) {
        result[level] = tracks.filter((t) =>
          t.title.toLowerCase().includes(lowerSearch)
        );
      } else {
        result[level] = [];
      }
    });

    return result;
  }, [search, selectedTracks]);

  return (
    <>
      <Helmet>
        <title>Trilhas de Aprendizado - Testing Courses</title>
      </Helmet>

      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Trilhas de Aprendizado</h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar trilha..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {Object.entries(levels).map(([key, info]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTracks[key]}
                  onChange={() => handleCheckboxChange(key)}
                  className="accent-primary"
                />
                <span>{info.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cards */}
        {Object.entries(filteredTracks).map(([level, tracks]) => {
          if (!tracks.length) return null;

          const Icon = levels[level].icon;
          const color = levels[level].color;

          return (
            <div key={level}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
                  <Icon className="h-6 w-6 text-gray-800" />
                </div>
                <h2 className="text-2xl font-semibold capitalize">{levels[level].name}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/dashboard/tracks/${level}/${track.id}`}
                      className={`block cursor-pointer rounded-xl shadow border bg-gradient-to-br ${color} p-6 hover:shadow-lg transition-all duration-300`}
                    >
                      <h3 className="font-semibold text-lg text-gray-900 text-center">{track.title}</h3>
                      <div className="text-sm text-gray-700 mt-3 text-center">
                        <p>
                          <strong>{track.modules.length}</strong> módulos
                        </p>
                        <p>
                          <strong>{track.hours_total}</strong> horas
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
