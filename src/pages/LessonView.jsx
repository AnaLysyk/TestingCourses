import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // ⬅️ adicionado useLocation
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ArrowRight, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useProgress } from '@/hooks/useProgress';

import gratuitoTrack from '@/data/tracks/gratuito.json';
import basicoTrack from '@/data/tracks/basico.json';
import intermediarioTrack from '@/data/tracks/intermediario.json';
import avancadoTrack from '@/data/tracks/avancado.json';

const trackMap = {
  gratuito: gratuitoTrack.tracks,
  basico: basicoTrack.tracks,
  intermediario: intermediarioTrack.tracks,
  avancado: avancadoTrack.tracks,
};

const LessonView = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ adicionado
  const { completeLesson, getNextLessonId } = useProgress();
  const [lesson, setLesson] = useState(null);
  const [nextLessonId, setNextLessonId] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  const [activeTab, setActiveTab] = useState('descricao');
  const [noteInput, setNoteInput] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  const videoRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [originalTime, setOriginalTime] = useState(0);
  const [choiceMade, setChoiceMade] = useState(false);

  useEffect(() => {
    if (!lessonId) return;

    const [level, trackIdStr, moduleIndexStr, lessonIndexStr] = lessonId.split('-');
    const trackId = Number(trackIdStr);
    const moduleIndex = Number(moduleIndexStr);
    const lessonIndex = Number(lessonIndexStr);

    const trackArray = trackMap[level];
    if (!trackArray) {
      setLesson(null);
      return;
    }

    const track = trackArray.find(t => t.id === trackId);
    if (!track || !track.modules[moduleIndex]) {
      setLesson(null);
      return;
    }

    const currentLesson = track.modules[moduleIndex].lessons[lessonIndex];
    if (!currentLesson) {
      setLesson(null);
      return;
    }

    setLesson({
      ...currentLesson,
      id: lessonId,
      level,
      trackId
    });

    setNextLessonId(getNextLessonId(lessonId));
    setQuizAnswers({});
    setShowResults(false);
    setIsPassed(false);
    setSavedNotes([]);
    setNoteInput('');
    setShowOptions(false);
    setOriginalTime(0);
    setChoiceMade(false);
  }, [lessonId, getNextLessonId]);

  // ⬇️ NOVO: ao detectar #notes, abre a aba "Notas" automaticamente
  useEffect(() => {
    if (location.hash === '#notes') {
      setActiveTab('notas');
    }
  }, [location.hash]);

  // Vídeo interativo
  useEffect(() => {
    if (!videoRef.current) return;

    const handleTimeUpdate = () => {
      if (!choiceMade && videoRef.current.src.includes('bunny.mp4') && videoRef.current.currentTime >= 5) {
        videoRef.current.pause();
        setOriginalTime(videoRef.current.currentTime);
        setShowOptions(true);
      }
    };

    const vid = videoRef.current;
    vid.addEventListener('timeupdate', handleTimeUpdate);

    return () => vid.removeEventListener('timeupdate', handleTimeUpdate);
  }, [choiceMade]);

  const handleOptionClick = (option) => {
    if (!videoRef.current) return;

    setChoiceMade(true);
    setShowOptions(false);

    if (option === 'continuar') {
      videoRef.current.currentTime = originalTime;
      videoRef.current.play();
    } else {
      const tempVideo = option;
      videoRef.current.src = `/${tempVideo}.mp4`;
      videoRef.current.play();

      const handleEnded = () => {
        videoRef.current.src = '/bunny.mp4';
        videoRef.current.currentTime = originalTime;
        videoRef.current.play();
        videoRef.current.removeEventListener('ended', handleEnded);
      };
      videoRef.current.addEventListener('ended', handleEnded);
    }
  };

  const handleQuizSubmit = () => {
    if (!lesson?.quiz) return;

    const correctAnswers = lesson.quiz.filter(q => quizAnswers[q.q] === q.answer).length;
    const percentage = (correctAnswers / lesson.quiz.length) * 100;

    setShowResults(true);

    if (percentage >= 70) {
      setIsPassed(true);
      completeLesson(lesson.id);
      toast({
        title: "Parabéns! 🎉",
        description: `Você acertou ${correctAnswers} de ${lesson.quiz.length} questões (${percentage.toFixed(0)}%)`,
      });
    } else {
      setIsPassed(false);
      toast({
        title: "Tente novamente",
        description: `Você precisa de pelo menos 70% para passar. Você obteve ${percentage.toFixed(0)}%`,
        variant: "destructive",
      });
    }
  };

  const handleNextLesson = () => {
    if (nextLessonId) {
      navigate(`/dashboard/lesson/${nextLessonId}`);
    } else {
      toast({
        title: "Trilha Concluída!",
        description: "Você finalizou todas as aulas desta trilha. Parabéns!",
      });
      navigate(`/dashboard/tracks/${lesson.level}`);
    }
  };

  const handleSaveNote = () => {
    if (!noteInput.trim()) return;
    setSavedNotes([...savedNotes, { time: '00:27', text: noteInput }]);
    setNoteInput('');
  };

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <XCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold">Aula não encontrada</h2>
        <p className="text-muted-foreground">A aula que você está procurando não existe ou foi movida.</p>
        <Button onClick={() => navigate('/dashboard/tracks')} className="mt-4">
          Voltar para as Trilhas
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{lesson.title} - Testing Courses</title>
        <meta name="description" content={lesson.summary} />
      </Helmet>

      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/tracks/${lesson.level}`)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para a Trilha
        </Button>

        <div className="grid grid-cols-3 gap-6">
          {/* Coluna lateral */}
          <div className="col-span-1 bg-card rounded-xl shadow-lg p-4 border">
            <div className="flex space-x-2 mb-4">
              {['descricao', 'material', 'duvidas', 'notas'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-t-lg font-medium ${activeTab === tab ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  {tab === 'descricao' ? 'Descrição' : tab === 'material' ? 'Material' : tab === 'duvidas' ? 'Dúvidas' : 'Notas'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {activeTab === 'descricao' && <p>{lesson.summary}</p>}

              {activeTab === 'material' && (
                <div className="flex flex-col space-y-2">
                  <a href="#fakeRepo" className="text-blue-600 underline">Acessar Repositório</a>
                  <a href="#fakeDownload" className="text-blue-600 underline">Baixar Arquivo do Projeto</a>
                </div>
              )}

              {activeTab === 'duvidas' && (
                <div className="space-y-4">
                  <div className="p-2 border rounded">
                    <p className="font-bold">Bruno Mocellin - 09/10/2025</p>
                    <p>Não consigo abrir o projeto, está dando erro ao iniciar.</p>
                  </div>
                  <div className="p-2 border rounded">
                    <p className="font-bold">Maria Silva - 09/10/2025</p>
                    <p>Verifique se instalou as dependências com npm install. Isso resolveu para mim.</p>
                  </div>
                </div>
              )}

              {activeTab === 'notas' && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      className="border rounded px-2 py-1 flex-1"
                      placeholder="Escreva uma nota..."
                    />
                    <Button onClick={handleSaveNote} className="px-3">Salvar</Button>
                  </div>
                  {savedNotes.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {savedNotes.map((note, idx) => (
                        <div key={idx} className="text-sm border rounded p-1">
                          <span className="font-mono">{note.time}</span>: {note.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Coluna vídeo */}
          <div className="col-span-2 relative bg-black rounded-xl overflow-hidden aspect-video">
            <video
              ref={videoRef}
              src="/bunny.mp4"
              className="w-full h-full object-cover"
              controls
              onLoadedMetadata={() => {
                setChoiceMade(false);
                setShowOptions(false);
                setOriginalTime(0);
              }}
              onTimeUpdate={() => {
                if (!choiceMade && videoRef.current.currentTime >= 5) {
                  videoRef.current.pause();
                  setOriginalTime(videoRef.current.currentTime);
                  setShowOptions(true);
                }
              }}
            />

            {showOptions && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 space-y-3">
                <Button onClick={() => handleOptionClick('jelly')}>Opção 1 - Jelly</Button>
                <Button onClick={() => handleOptionClick('sintel')}>Opção 2 - Sintel</Button>
                <Button onClick={() => handleOptionClick('continuar')}>Continuar</Button>
              </div>
            )}
          </div>
        </div>

        {/* Quiz */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl shadow-lg p-6 border"
          >
            <h2 className="text-xl font-bold mb-6">Quiz de Verificação</h2>

            <div className="space-y-6">
              {lesson.quiz.map((question, qIndex) => (
                <div key={question.q} className="space-y-3">
                  <p className="font-medium">{qIndex + 1}. {question.q}</p>
                  <div className="space-y-2">
                    {question.choices.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className={`
                          flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors
                          ${quizAnswers[question.q] === oIndex ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                          ${showResults && oIndex === question.answer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                          ${showResults && quizAnswers[question.q] === oIndex && oIndex !== question.answer ? 'border-destructive bg-red-50 dark:bg-red-900/20' : ''}
                        `}
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          checked={quizAnswers[question.q] === oIndex}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [question.q]: oIndex })}
                          disabled={showResults}
                          className="form-radio text-primary focus:ring-primary"
                        />
                        <span>{option}</span>
                        {showResults && oIndex === question.answer && (
                          <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>
                  {showResults && <p className="text-sm text-muted-foreground pl-4 pt-1">{question.explanation}</p>}
                </div>
              ))}
            </div>

            {!showResults && (
              <Button
                onClick={handleQuizSubmit}
                className="w-full mt-6"
                variant="destructive"
                disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}
              >
                Enviar Respostas
              </Button>
            )}

            {showResults && (
              <div className="flex space-x-4 mt-6">
                <Button
                  onClick={() => {
                    setQuizAnswers({});
                    setShowResults(false);
                    setIsPassed(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Tentar Novamente
                </Button>
                <Button
                  onClick={handleNextLesson}
                  className="flex-1"
                  variant="destructive"
                  disabled={!isPassed}
                >
                  {nextLessonId ? 'Próxima Aula' : 'Finalizar Trilha'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default LessonView;
