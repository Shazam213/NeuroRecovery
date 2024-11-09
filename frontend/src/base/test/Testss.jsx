
// import React, { useEffect, useState } from 'react';

// const getScoresFromLocalStorage = () => {
//   const mentalMathLevels = parseInt(localStorage.getItem('playerScore')) || 0;
//   const oneToFiftyTime = parseInt(localStorage.getItem('oneToFifty')) || 0;
//   const memoryLevels = parseInt(localStorage.getItem('sequence')) || 0;
//   const reactionTime = parseInt(localStorage.getItem('reactionTime')) || 0;
//   const sevenTilesMemoryLevels = parseInt(localStorage.getItem('playerScores')) || 0;

//   return {
//     mentalMathLevels,
//     oneToFiftyTime,
//     memoryLevels,
//     reactionTime,
//     sevenTilesMemoryLevels,
//   };
// };

// const calculateCognitiveScores = (scores) => {
//   const visuospatialExecutive = scores.mentalMathLevels >= 10 ? 6 : scores.mentalMathLevels >= 8 ? 5 : scores.mentalMathLevels >= 6 ? 4 : scores.mentalMathLevels >= 4 ? 3 : scores.mentalMathLevels >= 2 ? 2 : 1;
//   const attention = scores.oneToFiftyTime <= 30 ? 7 : scores.oneToFiftyTime <= 45 ? 6 : scores.oneToFiftyTime <= 60 ? 5 : scores.oneToFiftyTime <= 75 ? 4 : scores.oneToFiftyTime <= 90 ? 3 : scores.oneToFiftyTime <= 105 ? 2 : 1;
//   const processingSpeed = scores.reactionTime < 300 ? 5 : scores.reactionTime <= 400 ? 4 : scores.reactionTime <= 500 ? 3 : scores.reactionTime <= 600 ? 2 : 1;
//   const memory = scores.memoryLevels >= 10 ? 6 : scores.memoryLevels >= 8 ? 5 : scores.memoryLevels >= 6 ? 4 : scores.memoryLevels >= 4 ? 3 : scores.memoryLevels >= 2 ? 2 : 1;
//   const shortTermRecall = scores.sevenTilesMemoryLevels >= 7 ? 6 : scores.sevenTilesMemoryLevels >= 6 ? 5 : scores.sevenTilesMemoryLevels >= 5 ? 4 : scores.sevenTilesMemoryLevels >= 4 ? 3 : scores.sevenTilesMemoryLevels >= 3 ? 2 : 1;

//   const totalScore = visuospatialExecutive + attention + processingSpeed + memory + shortTermRecall;

//   return {
//     visuospatialExecutive: `${visuospatialExecutive}/6`,
//     attention: `${attention}/7`,
//     processingSpeed: `${processingSpeed}/5`,
//     memory: `${memory}/6`,
//     shortTermRecall: `${shortTermRecall}/6`,
//     total: `${totalScore}/30`,
//   };
// };

// const CognitiveReport = () => {
//   const [report, setReport] = useState(null);

//   useEffect(() => {
//     const storedScores = getScoresFromLocalStorage();
//     const calculatedReport = calculateCognitiveScores(storedScores);
//     setReport(calculatedReport);
//   }, []);

//   if (!report) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Cognitive Report</h2>
//         <div className="space-y-4">
//           <div className="flex justify-between">
//             <span className="text-gray-700">Visuospatial Executive</span>
//             <span className="font-semibold text-gray-800">{report.visuospatialExecutive}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-700">Attention</span>
//             <span className="font-semibold text-gray-800">{report.attention}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-700">Processing Speed</span>
//             <span className="font-semibold text-gray-800">{report.processingSpeed}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-700">Memory</span>
//             <span className="font-semibold text-gray-800">{report.memory}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-700">Short-term Recall</span>
//             <span className="font-semibold text-gray-800">{report.shortTermRecall}</span>
//           </div>
//           <hr className="my-4" />
//           <div className="flex justify-between font-bold text-gray-800">
//             <span>Total Score</span>
//             <span>{report.total}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CognitiveReport;


import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTheme } from '../../contexts/ThemeContext';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const getScoresFromLocalStorage = () => {
  const mentalMathLevels = parseInt(localStorage.getItem('playerScore')) || 0;
  const oneToFiftyTime = parseInt(localStorage.getItem('oneToFifty')) || 0;
  const memoryLevels = parseInt(localStorage.getItem('sequence')) || 0;
  const reactionTime = parseInt(localStorage.getItem('reactionTime')) || 0;
  const sevenTilesMemoryLevels = parseInt(localStorage.getItem('playerScores')) || 0;

  return {
    mentalMathLevels,
    oneToFiftyTime,
    memoryLevels,
    reactionTime,
    sevenTilesMemoryLevels,
  };
};

const calculateCognitiveScores = (scores) => {
  const visuospatialExecutive = scores.mentalMathLevels >= 10 ? 6 : scores.mentalMathLevels >= 8 ? 5 : scores.mentalMathLevels >= 6 ? 4 : scores.mentalMathLevels >= 4 ? 3 : scores.mentalMathLevels >= 2 ? 2 : 1;
  const attention = scores.oneToFiftyTime <= 30 ? 7 : scores.oneToFiftyTime <= 45 ? 6 : scores.oneToFiftyTime <= 60 ? 5 : scores.oneToFiftyTime <= 75 ? 4 : scores.oneToFiftyTime <= 90 ? 3 : scores.oneToFiftyTime <= 105 ? 2 : 1;
  const processingSpeed = scores.reactionTime < 300 ? 5 : scores.reactionTime <= 400 ? 4 : scores.reactionTime <= 500 ? 3 : scores.reactionTime <= 600 ? 2 : 1;
  const memory = scores.memoryLevels >= 10 ? 6 : scores.memoryLevels >= 8 ? 5 : scores.memoryLevels >= 6 ? 4 : scores.memoryLevels >= 4 ? 3 : scores.memoryLevels >= 2 ? 2 : 1;
  const shortTermRecall = scores.sevenTilesMemoryLevels >= 7 ? 6 : scores.sevenTilesMemoryLevels >= 6 ? 5 : scores.sevenTilesMemoryLevels >= 5 ? 4 : scores.sevenTilesMemoryLevels >= 4 ? 3 : scores.sevenTilesMemoryLevels >= 3 ? 2 : 1;

  const totalScore = visuospatialExecutive + attention + processingSpeed + memory + shortTermRecall;

  return {
    visuospatialExecutive: `${visuospatialExecutive}/6`,
    attention: `${attention}/7`,
    processingSpeed: `${processingSpeed}/5`,
    memory: `${memory}/6`,
    shortTermRecall: `${shortTermRecall}/6`,
    total: `${totalScore}/30`,
  };
};
const generatePdfReport = (report) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true
  });

  // Add a title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(33, 37, 41); // Dark gray
  doc.text('Cognitive Report', 20, 20);

  // Add a table
  doc.autoTable({
    startY: 30,
    margin: { top: 20, left: 20, right: 20, bottom: 20 },
    body: Object.entries(report).map(([key, value]) => [key, value]),
    styles: {
      fillColor: [236, 239, 241], // Light gray background
      textColor: [33, 37, 41], // Dark gray text
      fontSize: 14,
      cellPadding: 5
    },
    headStyles: {
      fillColor: [108, 117, 125], // Gray background
      textColor: [255, 255, 255], // White text
      fontSize: 14,
      cellPadding: 5
    },
    columnStyles: {
      0: { cellWidth: 60, halign: 'left' }, // Key column
      1: { cellWidth: 'auto', halign: 'right' } // Value column
    }
  });

  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  return pdfUrl;
};



const CognitiveReport = () => {
  const [report, setReport] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const storedScores = getScoresFromLocalStorage();
    const calculatedReport = calculateCognitiveScores(storedScores);
    setReport(calculatedReport);
    setPdfUrl(generatePdfReport(calculatedReport));
  }, []);

  if (!report) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          <h2 className="text-2xl font-bold mb-6">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      <Card className="w-full max-w-md">
        <CardHeader className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 p-6">
          <CardTitle className="text-gray-800 dark:text-gray-200 text-2xl font-bold">Cognitive Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-6 px-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-lg">Visuospatial Executive</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{report.visuospatialExecutive}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-lg">Attention</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{report.attention}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-lg">Processing Speed</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{report.processingSpeed}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-lg">Memory</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{report.memory}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-lg">Short-term Recall</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{report.shortTermRecall}</span>
          </div>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />
          <div className="flex justify-between items-center font-bold text-gray-800 dark:text-gray-200 text-xl">
            <span>Total Score</span>
            <span>{report.total}</span>
          </div>
        </CardContent>
        <div className="flex justify-end p-4 space-x-2">
          <Button
            variant="outline"
            onClick={() => window.open(pdfUrl, '_blank')}
          >
            <Download className="mr-2" />
            Download PDF
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CognitiveReport;