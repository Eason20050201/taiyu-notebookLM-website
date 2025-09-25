import './Subject.css';
import { useNavigate } from 'react-router-dom';

function Subject({ subjects = [] }) {
  const navigate = useNavigate();
  return (
    <div className="subject">
      {subjects.map((name, idx) => (
        <div
          className="subject-card"
          key={name + idx}
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/subject/${encodeURIComponent(name)}`)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/subject/${encodeURIComponent(name)}`); }}
        >
          {/* 這裡可根據需要放圖片或其他內容 */}
          <h3>{name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Subject;