import "./ItemTemplate.css";

function ItemTemplate({ selectedItem }) {
  if (selectedItem === 1) {
    // 教案
    return (
      <div className="item-template">
        {/* <h4>教案模板</h4> */}
    <div className="item-template-content">
            <h3>課程目標</h3>
            <select>
                <option>國小自然科</option>
                <option>國小社會科</option>
            </select>
    </div>
    <div className="item-template-content">
            <h3>活動流程</h3>
            <select>
                <option>活動 1</option>
                <option>活動 2</option>
            </select>
    </div>
    <div className="item-template-content">
            <h3>教具/媒材需求</h3>
            <select>
                <option>是</option>
                <option>否</option>
            </select>
    </div>
      </div>
    );
  } else if (selectedItem === 2) {
    // 素養題
    return (
      <div className="item-template">
        {/* <h4>素養題模板</h4> */}
    <div className="item-template-content">
            <h3>題型選擇</h3>
            <select>
                <option>單選題</option>
                <option>多選題</option>
                <option>問答題</option>
            </select>
    </div>
    <div className="item-template-content">
            <h3>難度設定</h3>
            <select>
                <option>易</option>
                <option>中</option>
                <option>難</option>
            </select>
    </div>
    <div className="item-template-content">
            <h3>對應課綱能力指標</h3>
            <select>
                <option>?</option>
                <option>???</option>
            </select>
    </div>
    <div className="item-template-content">
            <h3>自動解析</h3>
            <select>
                <option>?</option>
                <option>???</option>
            </select>
    </div>
      </div>
    );
  } else if (selectedItem === 3) {
    // 快速背課
    return (
      <div className="item-template">
        {/* <h4>快速背課模板</h4> */}
    <div className="item-template-content">
            <h3>產出18週完整備課表</h3>
            <input placeholder="請輸入你想要的週數.."></input>
    </div>
    <div className="item-template-content">
            <h3>單元反思點</h3>
            <select>
                <option>?</option>
                <option>?</option>
                <option>?</option>
            </select>
    </div>
      </div>
    );
  } else if (selectedItem === 4) {
    // Ai 小助教
    return (
      <div className="item-template">
        {/* <h4>Ai 小助教模板</h4> */}
    <div className="item-template-content">
            <h3>連結 NotebookLM</h3>
            <select>
                <option>?</option>
                <option>???</option>
            </select>
    </div>
    <div className="item-template-content">
            <h3>封閉式對話</h3>
            <select>
                <option>?</option>
                <option>???</option>
            </select>
    </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ItemTemplate;
