import React from 'react';
import { Helmet } from 'react-helmet';
import ExtraMaterial from '@/pages/ExtraMaterial';

const Store = () => {
  return (
    <>
      <Helmet>
        <title>Loja - Testing Courses</title>
        <meta name="description" content="Explore nossa loja de produtos exclusivos para entusiastas de QA." />
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nossa Loja</h1>
          <p className="text-muted-foreground">
            Encontre produtos incríveis para turbinar sua jornada em QA.
          </p>
        </div>
        <ExtraMaterial />
      </div>
    </>
  );
};

export default Store;