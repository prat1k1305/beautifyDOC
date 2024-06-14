import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './CustomSwagger.css'; 

const SwaggerDoc = ({ spec }) => {
  const [specUrl, setSpecUrl] = useState(null);

  useEffect(() => {
    if (spec) {
      const blob = new Blob([JSON.stringify(spec)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      setSpecUrl(url);
    }
  }, [spec]);

  return specUrl ? <SwaggerUI url={specUrl} /> : null;
};

export default SwaggerDoc;
