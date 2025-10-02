import "./ItemTemplate.css";

function ItemTemplate({ selectedItem, itemDetails, setItemDetails }) {
  // 欄位資料結構
  const templates = {
    1: [
      { label: '課程目標', placeholder: '請輸入課程目標...' },
      { label: '活動流程', placeholder: '請輸入活動流程...' },
      { label: '教具/媒材需求', placeholder: '請輸入教具/媒材需求...' },
    ],
    2: [
      { label: '題型選擇', placeholder: '請輸入題型...' },
      { label: '難度設定', placeholder: '請輸入難度...' },
      { label: '對應課綱能力指標', placeholder: '請輸入能力指標...' },
      { label: '自動解析', placeholder: '請輸入自動解析...' },
    ],
    3: [
      { label: '產出18週完整備課表', placeholder: '請輸入你想要的週數..' },
      { label: '單元反思點', placeholder: '請輸入單元反思點...' },
    ],
    4: [
      { label: '連結 NotebookLM', placeholder: '請輸入 NotebookLM 連結...' },
      { label: '封閉式對話', placeholder: '請輸入封閉式對話內容...' },
    ],
  };

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
          <input
            type="text"
            className="input-box"
            placeholder={field.placeholder}
            value={itemDetails?.[field.label]?.value || ''}
            onChange={e => handleInput(field.label, e.target.value)}
            disabled={!itemDetails?.[field.label]?.checked}
          />
        </div>
      ))}
    </div>
  );
}

export default ItemTemplate;
