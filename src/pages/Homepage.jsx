import { useState, useEffect } from 'react';

import AcademicSystem from '../components/AcademicSystem';
import Introduce from '../components/Introduce';
import Subject from '../components/Subject';

import { parseAllMappingFromXlsx } from '../utils/xlsxMappingParser';

function Homepage() {
  const [selectedCard, setSelectedCard] = useState(1);
  const [mapping, setMapping] = useState(null);

  useEffect(() => {
    parseAllMappingFromXlsx().then(setMapping);
  }, []);

  if (!mapping) return <div>載入中...</div>;

  const highSchool = mapping.academicSystems.find(sys => sys.name === '高中') || { subjects: [] };
  const highSchoolSubjects = highSchool.subjects.map(sub => sub.name);
  const vocational = mapping.academicSystems.find(sys => sys.name === '高職') || { subjects: [] };
  const vocationalSubjects = vocational.subjects.map(sub => sub.name);
  const art = mapping.academicSystems.find(sys => sys.name === '藝能科') || { subjects: [] };
  const artSubjects = art.subjects.map(sub => sub.name);
  const taiwanese = mapping.academicSystems.find(sys => sys.name === '閩南語') || { subjects: [] };
  const taiwaneseSubjects = taiwanese.subjects.map(sub => sub.name);

  let subjects = highSchoolSubjects;
  if (selectedCard === 2) subjects = vocationalSubjects;
  else if (selectedCard === 3) subjects = artSubjects;
  else if (selectedCard === 4) subjects = taiwaneseSubjects;

  return (
    <div className="homepage">
      <Introduce />
      <AcademicSystem selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
      <Subject subjects={subjects} />
    </div>
  );
}

export default Homepage;