import './Introduce.css';

import HandWaving from '../assets/icons/HandWaving.svg';
import BookOpen from '../assets/icons/BookOpen.svg';
import AiTechnologySpark from '../assets/icons/AiTechnologySpark.svg';
import BusinessHandshake from '../assets/icons/BusinessHandshake.svg';

function Introduce() {
    return (
        <div className="introduce">
            <div className="introduce-header">
                <img src={HandWaving} alt="icon" className="introduce-icon" />                
                <div>
                    <div className="introduce-title">歡迎使用 NotebookLM 教育資源平台</div>
                    <div className="introduce-desc">整合所有學科資源，讓教學變得更簡單、更有效率</div>
                </div>
            </div>
            <div className="introduce-cards">
                <div className="introduce-card">
                    <img src={BookOpen} alt="icon" className="introduce-icon" />
                    <div>
                        <div className="card-title">豐富資源</div>
                        <div className="card-desc">涵蓋所有學科教材</div>
                    </div>
                </div>
                <div className="introduce-card">
                    <img src={AiTechnologySpark} alt="icon" className="introduce-icon" />
                    <div>
                        <div className="card-title">AI 輔助</div>
                        <div className="card-desc">涵蓋所有學科教材</div>
                    </div>
                </div>
                <div className="introduce-card">
                    <img src={BusinessHandshake} alt="icon" className="introduce-icon" />
                    <div>
                        <div className="card-title">協作平台</div>
                        <div className="card-desc">涵蓋所有學科教材</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduce;