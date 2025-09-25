import "./AcademicSystem.css";

function AcademicSystem({ selectedCard, setSelectedCard }) {
  const cards = [
    { id: 1, title: "高中學科" },
    { id: 2, title: "技高學科" },
    { id: 3, title: "藝能科" },
    { id: 4, title: "閩南語" },
  ];

  return (
    <div className="academic-system">
      <div className="academic-system-cards">
        {cards.map((card) => (
          <div
            key={card.id}
            className={
              selectedCard === card.id
                ? "academic-system-card active"
                : "academic-system-card"
            }
            onClick={() => setSelectedCard(card.id)}
          >
            <div className="card-title">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AcademicSystem;
