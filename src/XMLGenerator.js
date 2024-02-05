import React from 'react';

function XMLGenerator({ rows }) {
  const generateXML = () => {
    // Aquí generas el XML utilizando los datos de las filas
    let xmlString = '<?xml version="1.0" encoding="ISO-8859-1"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\n<rows>\n';
    xmlString += `<personajes>\n`;
    rows.forEach(row => {
      xmlString += `<row>\n`;
      console.table(Object.keys(row))
      Object.keys(row).forEach(key => {
        xmlString += `<${key}>${row[key]}</${key}>\n`;
      });
      xmlString += `</row>\n`;
    });

    
    xmlString += `</personajes>\n`;
    xmlString += `</rows>\n`;
    xmlString += `</xs:schema>\n`;
    return xmlString;
  };

  const handleDownloadXML = () => {
    const xml = generateXML();
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownloadXML}>Descargar XML</button>
    </div>
  );
}

export default XMLGenerator;
