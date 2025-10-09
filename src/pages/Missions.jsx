import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const QAMissionLogin = () => {
  const [answers, setAnswers] = useState({
    'lacuna-1': '',
    'lacuna-2': '',
    'lacuna-3': '',
  });
  const [result, setResult] = useState(null);

  const correctAnswers = {
    'lacuna-1': 'id',
    'lacuna-2': 'css',
    'lacuna-3': 'css-data',
  };

  const handleOptionChange = (lacunaId, value) => {
    setAnswers(prev => ({ ...prev, [lacunaId]: value }));
  };

  const checkAnswers = () => {
    const allCorrect = Object.keys(correctAnswers).every(
      key => answers[key] === correctAnswers[key]
    );

    if (allCorrect) {
      setResult('success');
      toast({
        title: "Parabéns!",
        description: "Você completou a missão com sucesso!",
      });
    } else {
      setResult('error');
      toast({
        title: "Ops!",
        description: "Algumas respostas estão incorretas. Tente novamente!",
        variant: "destructive",
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
      <h2 className="text-2xl font-bold mb-4">
        QA Mission - Complete o código com base na página de login
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Página de Login de exemplo:</h3>
        <div className="rounded-lg overflow-hidden border">
          <iframe
            srcDoc={`<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #f4f4f4;
      }
      .login-box {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        width: 280px;
      }
      input, button {
        width: 100%;
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
      }
      button {
        background: #007bff;
        color: white;
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="login-box">
      <input type="text" id="username" placeholder="Usuário" />
      <input type="password" name="password" placeholder="Senha" />
      <button type="submit" data-action="login">Entrar</button>
    </div>
  </body>
</html>`}
            title="Página de Login"
            className="w-full h-96 bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Analise o código da página acima — inspecione os elementos no navegador para identificar os seletores corretos.
        </p>
      </div>

      <div className="font-mono bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6 text-sm">
        <pre>
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TesteLogin {"\n"}
    public static void main(String[] args) {"\n"}
        WebDriver driver = new ChromeDriver();{"\n"}
        driver.get("URL_DA_PAGINA");{"\n\n"}
        WebElement campoUsuario = driver.findElement(<span className="text-yellow-400">?</span>);{"\n"}
        campoUsuario.sendKeys("usuario_teste");{"\n\n"}
        WebElement campoSenha = driver.findElement(<span className="text-yellow-400">?</span>);{"\n"}
        campoSenha.sendKeys("senha_teste");{"\n\n"}
        WebElement botaoLogin = driver.findElement(<span className="text-yellow-400">?</span>);{"\n"}
        botaoLogin.click();{"\n\n"}
        driver.quit();{"\n"}
    {"}"}{"\n"}
{"}"}
        </pre>
      </div>

      <div className="space-y-6 mb-6">
        {/* Lacuna 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Lacuna 1 - campoUsuario</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-1"
                value="id"
                checked={answers['lacuna-1'] === 'id'}
                onChange={() => handleOptionChange('lacuna-1', 'id')}
              />
              <span>By.id("username")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-1"
                value="xpath"
                checked={answers['lacuna-1'] === 'xpath'}
                onChange={() => handleOptionChange('lacuna-1', 'xpath')}
              />
              <span>By.xpath("//input[@name='username']")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-1"
                value="css"
                checked={answers['lacuna-1'] === 'css'}
                onChange={() => handleOptionChange('lacuna-1', 'css')}
              />
              <span>By.cssSelector("input[name='username']")</span>
            </label>
          </div>
        </div>

        {/* Lacuna 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Lacuna 2 - campoSenha</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-2"
                value="id"
                checked={answers['lacuna-2'] === 'id'}
                onChange={() => handleOptionChange('lacuna-2', 'id')}
              />
              <span>By.id("password")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-2"
                value="xpath"
                checked={answers['lacuna-2'] === 'xpath'}
                onChange={() => handleOptionChange('lacuna-2', 'xpath')}
              />
              <span>By.xpath("//input[@name='password']")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-2"
                value="css"
                checked={answers['lacuna-2'] === 'css'}
                onChange={() => handleOptionChange('lacuna-2', 'css')}
              />
              <span>By.cssSelector("input[name='password']")</span>
            </label>
          </div>
        </div>

        {/* Lacuna 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Lacuna 3 - botaoLogin</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-3"
                value="id"
                checked={answers['lacuna-3'] === 'id'}
                onChange={() => handleOptionChange('lacuna-3', 'id')}
              />
              <span>By.id("loginBtn")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-3"
                value="xpath"
                checked={answers['lacuna-3'] === 'xpath'}
                onChange={() => handleOptionChange('lacuna-3', 'xpath')}
              />
              <span>By.xpath("//button[@id='loginBtn']")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-3"
                value="css-data"
                checked={answers['lacuna-3'] === 'css-data'}
                onChange={() => handleOptionChange('lacuna-3', 'css-data')}
              />
              <span>By.cssSelector("button[data-action='login']")</span>
            </label>
          </div>
        </div>
      </div>

      <Button onClick={checkAnswers} className="w-full">Conferir</Button>

      {result === 'success' && (
        <motion.div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>Todas as respostas estão corretas! Excelente trabalho!</span>
        </motion.div>
      )}

      {result === 'error' && (
        <motion.div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-center space-x-2">
          <XCircle className="h-5 w-5" />
          <span>Algumas respostas estão incorretas. Revise e tente novamente!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

const Missions = () => (
  <>
    <Helmet>
      <title>Missões - Testing Courses</title>
      <meta
        name="description"
        content="Participe de missões práticas e desafios para aprimorar suas habilidades em testes de software."
      />
    </Helmet>

    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Missões Práticas</h1>
        <p className="text-muted-foreground">
          Coloque seus conhecimentos à prova com desafios reais de QA.
        </p>
      </div>

      <QAMissionLogin />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-xl shadow-lg p-6 border text-center text-muted-foreground"
      >
        🚧 Novas missões em breve! Fique ligado para mais desafios emocionantes! 🚀
      </motion.div>
    </div>
  </>
);

export default Missions;
