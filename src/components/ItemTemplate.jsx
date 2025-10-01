import "./ItemTemplate.css";

function ItemTemplate({ selectedItem }) {
  if (selectedItem === 1) {
    // 教案
    return (
      <div className="item-template">
        {/* <h4>教案模板</h4> */}
        <ul>
          <li>課程目標</li>
          <li>活動流程</li>
          <li>教具/媒材需求</li>
        </ul>
      </div>
    );
  } else if (selectedItem === 2) {
    // 素養題
    return (
      <div className="item-template">
        {/* <h4>素養題模板</h4> */}
        <ul>
          <li>題型選擇</li>
          <li>難度設定</li>
          <li>對應課綱能力指標</li>
          <li>自動解析</li>
        </ul>
      </div>
    );
  } else if (selectedItem === 3) {
    // 快速背課
    return (
      <div className="item-template">
        {/* <h4>快速背課模板</h4> */}
        <ul>
          <li>產出18週完整備課表</li>
          <li>單元反思貼</li>
        </ul>
      </div>
    );
  } else if (selectedItem === 4) {
    // Ai 小助教
    return (
      <div className="item-template">
        {/* <h4>Ai 小助教模板</h4> */}
        <ul>
          <li>連結NotebookLM</li>
          <li>封閉式對話</li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

export default ItemTemplate;
