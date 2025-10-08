import "./AcademicSystem.css";


import { useRef, useEffect, useState } from "react";

function AcademicSystem({ selectedCard, setSelectedCard }) {
  const cards = [
    { id: 1, title: "高中學科" },
    { id: 2, title: "技高學科" },
    { id: 3, title: "藝能科" },
    { id: 4, title: "閩南語" },
  ];

  const cardsRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0, top: 0, height: 0 });
  const [isVertical, setIsVertical] = useState(false);

  // 檢查是否為直向排列
  useEffect(() => {
    function checkVertical() {
      const container = document.querySelector('.academic-system-cards');
      if (!container) return;
      const style = window.getComputedStyle(container);
      setIsVertical(style.flexDirection === 'column');
    }
    checkVertical();
    window.addEventListener('resize', checkVertical);
    return () => window.removeEventListener('resize', checkVertical);
  }, []);

  useEffect(() => {
    const idx = cards.findIndex((c) => c.id === selectedCard);
    if (cardsRef.current[idx]) {
      const el = cardsRef.current[idx];
      if (isVertical) {
        // 直向時，寬度為 80%，left: 10%（與卡片一致）
        setIndicatorStyle({
          width: '80%',
          left: '10%',
          top: el.offsetTop,
          height: el.offsetHeight,
        });
      } else {
        setIndicatorStyle({
          width: el.offsetWidth,
          left: el.offsetLeft,
          top: 20, // 對齊卡片的 margin-top
          height: el.offsetHeight,
        });
      }
    }
  }, [selectedCard, isVertical]);

  return (
    <div className="academic-system">
      <div className="academic-system-cards" style={{position: 'relative'}}>
        <div
          className="tab-indicator"
          style={
            isVertical
              ? {
                  width: indicatorStyle.width,
                  left: indicatorStyle.left,
                  height: indicatorStyle.height,
                  transform: `translateY(${indicatorStyle.top}px)`,
                  pointerEvents: 'none',
                }
              : {
                  width: indicatorStyle.width,
                  height: indicatorStyle.height,
                  transform: `translateX(${indicatorStyle.left}px)`,
                  pointerEvents: 'none',
                  top: 20,
                }
          }
        />
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={
              selectedCard === card.id
                ? "academic-system-card active"
                : "academic-system-card"
            }
            onClick={() => setSelectedCard(card.id)}
            ref={el => (cardsRef.current[idx] = el)}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="card-title">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AcademicSystem;