import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const StudyPlan = () => {
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [hoursPerWeek, setHoursPerWeek] = useState(2);
  const [maxSessionHours, setMaxSessionHours] = useState(2);
  const [selectedDays, setSelectedDays] = useState({
    dom: false,
    seg: true,
    ter: true,
    qua: false,
    qui: false,
    sex: false,
    sab: true,
  });
  const [calendar, setCalendar] = useState(null);
  const [courseSelected, setCourseSelected] = useState(false);

  const totalCourseHours = 15;
  const courseName = 'Testes de API com Postman';

  const days = [
    { key: 'dom', label: 'Dom' },
    { key: 'seg', label: 'Seg' },
    { key: 'ter', label: 'Ter' },
    { key: 'qua', label: 'Qua' },
    { key: 'qui', label: 'Qui' },
    { key: 'sex', label: 'Sex' },
    { key: 'sab', label: 'Sáb' },
  ];

  const generateCalendar = () => {
    const daysInMonth = 30;
    const studyDays = Object.keys(selectedDays).filter(day => selectedDays[day]);
    const calendarDays = [];

    let remainingHours = courseSelected ? totalCourseHours : 0;

    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = days[(i - 1) % 7].key;
      const canStudy = studyDays.includes(dayOfWeek);
      let hours = 0;
      let showCourse = false;

      if (canStudy) {
        if (courseSelected && remainingHours > 0) {
          // Distribui horas até zerar o total do curso
          hours = Math.min(hoursPerDay, maxSessionHours, remainingHours);
          remainingHours -= hours;
          showCourse = true;
        } else {
          // Após zerar as horas, volta ao comportamento normal
          hours = Math.min(hoursPerDay, maxSessionHours);
        }
      }

      calendarDays.push({
        day: i,
        dayOfWeek,
        hours,
        canStudy,
        showCourse,
      });
    }

    setCalendar(calendarDays);

    toast({
      title: 'Calendário gerado!',
      description: courseSelected
        ? `O curso "${courseName}" foi distribuído em ${totalCourseHours}h totais.`
        : 'Seu plano de estudos foi criado com sucesso.',
    });
  };

  const exportCalendar = () => {
    toast({
      title: 'Exportando...',
      description:
        '🚧 Este recurso ainda não está implementado — mas você pode solicitá-lo no próximo prompt! 🚀',
    });
  };

  return (
    <>
      <Helmet>
        <title>Plano de Estudos - Testing Courses</title>
        <meta
          name="description"
          content="Crie seu plano de estudos personalizado e organize sua rotina de aprendizado"
        />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Plano de Estudos</h1>
          <p className="text-muted-foreground">
            Configure sua rotina de estudos personalizada.
          </p>
        </div>

        {/* Configuração */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h2 className="text-xl font-bold mb-6">Configurações</h2>

          {/* Curso selecionável */}
          <div className="flex items-center space-x-3 mb-6">
            <Checkbox
              id="course"
              checked={courseSelected}
              onCheckedChange={(checked) => setCourseSelected(!!checked)}
            />
            <Label htmlFor="course" className="cursor-pointer">
              Marcar curso em andamento: <strong>{courseName} (15h)</strong>
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="hoursPerDay">Horas livres por dia útil</Label>
              <Input
                id="hoursPerDay"
                type="number"
                min="1"
                max="8"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">Horas livres por fim de semana</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                min="1"
                max="8"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxSession">Horas máximo por sessão</Label>
              <Input
                id="maxSession"
                type="number"
                min="1"
                max="4"
                value={maxSessionHours}
                onChange={(e) => setMaxSessionHours(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <Label>Marque os dias da semana que PODE estudar:</Label>
            <div className="flex flex-wrap gap-4">
              {days.map((day) => (
                <label key={day.key} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={selectedDays[day.key]}
                    onCheckedChange={(checked) =>
                      setSelectedDays({ ...selectedDays, [day.key]: checked })
                    }
                  />
                  <span>{day.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Button onClick={generateCalendar} className="w-full" variant="destructive">
            <Calendar className="h-4 w-4 mr-2" />
            Gerar Cronograma
          </Button>
        </motion.div>

        {/* Calendário */}
        {calendar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-lg p-6 border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Calendário Visual</h2>
              <Button onClick={exportCalendar} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Salvar como PNG
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => (
                <div key={day.key} className="text-center font-semibold p-2 text-muted-foreground">
                  {day.label}
                </div>
              ))}

              {calendar.map((day) => (
                <div
                  key={day.day}
                  className={`
                    relative aspect-square rounded-lg p-2 flex flex-col items-center justify-center text-sm text-center
                    ${day.canStudy
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                      : 'bg-red-100 dark:bg-red-900/30 border-2 border-red-300'
                    }
                  `}
                >
                  {/* Dia fixo no canto superior esquerdo */}
                  <span className="absolute top-1 left-2 text-xs font-semibold opacity-70">
                    {day.day}
                  </span>

                  {day.hours > 0 && (
                    <>
                      <span className="text-sm font-bold mt-3">{day.hours}h</span>
                      {day.showCourse && (
                        <span className="text-[11px] font-bold mt-1 opacity-80">
                          {courseName}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default StudyPlan;
