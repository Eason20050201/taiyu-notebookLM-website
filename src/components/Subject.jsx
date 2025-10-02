import './Subject.css';
import { useNavigate } from 'react-router-dom';
import toPinyin from '../utils/toPinyin';

function Subject({ subjects = [] }) {
  const navigate = useNavigate();
  return (
    <div className="subject">
      {subjects.map((name, idx) => {
        const pinyinName = toPinyin(name);
        return (
          <div
            className="subject-card"
            key={name + idx}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/subject/${pinyinName}`, { state: { subjectName: name } })}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/subject/${pinyinName}`, { state: { subjectName: name } }); }}
          >
            {/* 這裡可根據需要放圖片或其他內容 */}
            <h3>{name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Subject;