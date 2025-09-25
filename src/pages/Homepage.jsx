import { useState } from 'react';

import AcademicSystem from '../components/AcademicSystem';
import Introduce from '../components/Introduce';
import Subject from '../components/Subject';

import mapping from '../assets/all_mapping.json';

const highSchool = mapping.academicSystems.find(sys => sys.name === '高中');
const highSchoolSubjects = highSchool.subjects.map(sub => sub.name);
const vocational = mapping.academicSystems.find(sys => sys.name === '高職');
const vocationalSubjects = vocational.subjects.map(sub => sub.name);
const art = mapping.academicSystems.find(sys => sys.name === '藝能科');
const artSubjects = art.subjects.map(sub => sub.name);
const taiwanese = mapping.academicSystems.find(sys => sys.name === '閩南語');
const taiwaneseSubjects = taiwanese.subjects.map(sub => sub.name);

function Homepage() {
    const [selectedCard, setSelectedCard] = useState(1); // 1:高中, 2:技高, 3:藝能, 4:閩南

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