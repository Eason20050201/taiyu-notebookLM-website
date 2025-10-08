
import "./ItemTemplate.css";
import CustomSelect from "./CustomSelect";
import templates from "./templates";

function ItemTemplate({ selectedItem, itemDetails, setItemDetails, subjectName = '' }) {

  if (!selectedItem || !templates[selectedItem]) return null;

  // 處理勾選與輸入
  const handleCheck = (label, checked) => {
    setItemDetails(prev => ({
      ...prev,
      [label]: {
        ...prev[label],
        checked,
        value: checked ? (prev[label]?.value || '') : '' // 取消勾選時清空內容
      }
    }));
  };
  const handleInput = (label, value) => {
    setItemDetails(prev => ({
      ...prev,
      [label]: {
        ...prev[label],
        value
      }
    }));
  };

  // 取得已替換 subjectName 的 placeholder
  const getPlaceholder = (ph) => {
    if (!ph) return '';
    if (!subjectName) return ph;
    return ph.replace(/\{地理科\}|\{地理\}|\{科目\}/g, subjectName);
  };

  return (
    <div className="item-template">
      <div className="item-template-title">可以勾選與輸入您想要的細項</div>
      {templates[selectedItem].map((field, idx) => (
        <div className="item-template-content" key={field.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            style={{ marginRight: 4 }}
            checked={!!itemDetails?.[field.label]?.checked}
            onChange={e => handleCheck(field.label, e.target.checked)}
          />
          <h3>{field.label}</h3>
          {field.options ? (
            <CustomSelect
              options={field.options.map(opt => ({ label: opt, value: opt }))}
              placeholder={getPlaceholder(field.placeholder)}
              onChange={option => handleInput(field.label, option ? option.value : '')}
              value={itemDetails?.[field.label]?.value || ''}
              disabled={!itemDetails?.[field.label]?.checked}
            />
          ) : (
            <textarea
              type="text"
              className="input-box"
              placeholder={getPlaceholder(field.placeholder)}
              value={itemDetails?.[field.label]?.value || ''}
              onChange={e => handleInput(field.label, e.target.value)}
              disabled={!itemDetails?.[field.label]?.checked}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ItemTemplate;
