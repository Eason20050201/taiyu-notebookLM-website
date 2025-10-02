import React, { useRef, useEffect, useState } from "react";
import "./ItemSelector.css";

function ItemSelector({ items, selectedItem, setSelectedItem }) {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, top: 0, height: 0 });

  // 判斷是否為 RWD (max-width: 900px)
  const isMobile = () => window.innerWidth <= 900;

  // 預設選第一個
  useEffect(() => {
    if ((selectedItem === undefined || selectedItem === null) && items.length > 0) {
      setSelectedItem(items[0].id);
    }
    // eslint-disable-next-line
  }, [selectedItem, items, setSelectedItem]);

  useEffect(() => {
    const updateHighlight = () => {
      const idx = items.findIndex((item) => item.id === selectedItem);
      if (idx !== -1 && cardsRef.current[idx]) {
        const card = cardsRef.current[idx];
        const container = containerRef.current;
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (isMobile()) {
          setHighlightStyle({
            top: cardRect.top - containerRect.top,
            height: cardRect.height
            // width/left 由 CSS 控制
          });
        } else {
          setHighlightStyle({
            left: cardRect.left - containerRect.left,
            width: cardRect.width,
            top: 0,
            height: containerRect.height,
          });
        }
      }
    };
    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [selectedItem, items]);

  return (
    <div className="item-selector">
      <div className="item-selector-cards" ref={containerRef}>
        <div
          className="item-selector-highlight"
          style={isMobile()
            ? { top: highlightStyle.top, height: highlightStyle.height }
            : { left: highlightStyle.left, width: highlightStyle.width, top: 0, height: '100%' }
          }
        />
        {items.map((item, idx) => (
          <div
            key={item.id}
            ref={el => (cardsRef.current[idx] = el)}
            className={
              selectedItem === item.id
                ? "item-selector-card active"
                : "item-selector-card"
            }
            onClick={() => setSelectedItem(item.id)}
          >
            <div className="item-selector-card-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemSelector;
