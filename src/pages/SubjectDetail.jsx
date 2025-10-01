import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Prompt from '../components/Prompt';
import { parseAllMappingFromXlsx } from '../utils/xlsxMappingParser';
import Notebook from '../components/Notebook';
import DocumentDownload from '../components/DocumentDownload';

function SubjectDetail() {
    const { name } = useParams();
    const [volumes, setVolumes] = useState([]);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        parseAllMappingFromXlsx().then(mapping => {
            // 找到對應科目
            let found = null;
            for (const sys of mapping.academicSystems) {
                found = sys.subjects.find(sub => sub.name === decodeURIComponent(name));
                if (found) break;
            }
            setVolumes(found ? found.volumes : []);
        });
    }, [name]);
    return (
        <div className='subject-detail fade-in'>
            <div className='subject-detail-header'>
                <h1>{decodeURIComponent(name)}</h1>
            </div>
            <div className='subject-detail-functions'>
                <div className='subject-detail-left'>
                    <Notebook />
                    <DocumentDownload />
                </div>
                <div className='subject-detail-right'>
                    <Prompt volumes={volumes} />
                </div>
            </div>
        </div>
    );
}

export default SubjectDetail;
