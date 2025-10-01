import "./ItemSelector.css";

function ItemSelector({ items, selectedItem, setSelectedItem }) {
  return (
    <div className="item-selector">
      <div className="item-selector-cards">
        {items.map((item) => (
          <div
            key={item.id}
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
