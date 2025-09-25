import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Prompt from '../components/Prompt';
import Notebook from '../components/Notebook';
import DocumentDownload from '../components/DocumentDownload';

function SubjectDetail() {
    const { name } = useParams();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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
                    <Prompt />
                </div>
            </div>
        </div>
    );
}

export default SubjectDetail;
