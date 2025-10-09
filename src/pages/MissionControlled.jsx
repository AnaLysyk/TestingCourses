import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';    
import { toast } from '@/components/ui/use-toast';

const QASelectorMission = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState(null);
    const [currentMinute, setCurrentMinute] = useState(0);

    // Calcula minuto atual e define o seletor correto
    const correctSelector = currentMinute % 2 === 0 ? 'id' : 'className';

    useEffect(() => {
        const now = new Date();
        setCurrentMinute(now.getMinutes());
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const checkAnswer = () => {
        if (!selectedOption) {
            toast({
                title: '❗ Selecione uma opção',
                description: 'Você precisa selecionar um tipo de seletor antes de conferir.',
                variant: 'destructive',
            });
            return;
        }

        if (selectedOption === correctSelector) {
            setResult('success');
            toast({
                title: '✅ Correto!',
                description: 'Você escolheu o seletor certo!',
                variant: 'default',
            });
        } else {
            setResult('error');
            toast({
                title: '❌ Incorreto',
                description: 'O seletor escolhido não está correto. Tente novamente.',
                variant: 'destructive',
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl shadow-lg p-6 border"
        >
            <h2 className="text-2xl font-bold mb-4">Falha Controlada - Trilha QA</h2>
            <p className="mb-2 font-semibold">
                Controle dinâmico de respostas baseado em parâmetros externos, podendo ser tempo,
                virada de módulo, % de conclusão, aleatório, etc
            </p>

            <p className="mb-4">
                Se o minuto atual for <strong>par</strong>, o seletor correto é <code>id</code>.
                Se for <strong>ímpar</strong>, o correto é <code>className</code>.
            </p>

            <p className="mb-4">
                Minuto Atual:{' '}
                <span className="font-mono">
                    {currentMinute} ({currentMinute % 2 === 0 ? 'Par' : 'Ímpar'})
                </span>
            </p>

            <pre className="bg-gray-900 text-white p-4 rounded-lg mb-6 overflow-x-auto text-sm font-mono">
                {`public class TesteLogin {
  WebDriver driver;
  int timeout = 20;

  public void abrirPagina() {
    driver.get("http://qa.com");
  }

  public void clicarBotaoLogin() {
    driver.findElement(By.${selectedOption || '...'}("loginBtn")).click();
  }
}`}
            </pre>

            <div className="mb-6">
                <p className="font-semibold mb-2">Selecione o tipo de seletor:</p>
                <div className="flex gap-3">
                    {['id', 'className', 'xpath'].map((option) => (
                        <Button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            variant={selectedOption === option ? 'default' : 'outline'}
                        >
                            {option}
                        </Button>
                    ))}
                </div>
            </div>

            <Button onClick={checkAnswer} className="w-full mb-4">
                Conferir
            </Button>

            {result === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg flex items-center gap-2"
                >
                    <CheckCircle className="h-5 w-5" />
                    <span>✅ Você selecionou o seletor correto!</span>
                </motion.div>
            )}

            {result === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg flex items-center gap-2"
                >
                    <XCircle className="h-5 w-5" />
                    <span>❌ Seleção incorreta. Tente novamente!</span>
                </motion.div>
            )}
        </motion.div>
    );
};

const MissionControlled = () => {
    return (
        <>
            <Helmet>
                <title>Missões QA - Testing Courses</title>
                <meta
                    name="description"
                    content="Missões práticas de QA para testar seus conhecimentos em seletores e automação."
                />
            </Helmet>

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Missões Práticas</h1>
                    <p className="text-muted-foreground">
                        Teste seus conhecimentos com desafios dinâmicos de QA.
                    </p>
                </div>

                <QASelectorMission />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-card rounded-xl shadow-lg p-6 border text-center text-muted-foreground"
                >
                    <p>🚧 Novas missões em breve! Fique ligado para mais desafios! 🚀</p>
                </motion.div>
            </div>
        </>
    );
};

export default MissionControlled;
