import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ButtonBackToExtra = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/extra-material');
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-semibold transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar
    </button>
  );
};

export default ButtonBackToExtra;
