// 欄位資料結構 templates
// 供 ItemTemplate 和 PromptGenerator 共用

const templates = {
  1: [
    { label: '角色', placeholder: 'ex: {地理}教育專家' },
    { label: '教學對象', placeholder: 'ex: 高中一年級學生' },
    { label: '節數', placeholder: 'ex: 2 節課(共 100 分鐘)' },
    { label: '教學法', placeholder: 'ex: PBL(project-based learning)' },
    { label: '任務', placeholder: 'ex: 以{地理科}為例，設計一個教案' },
    { label: '具體內容與限制', placeholder: 'ex: 教案請列出主題、課綱學習表現、實質內涵、核心問題、教學步驟與時間(包含教師需給予的引導語)、需要使用的數位工具、軟硬體設備、注意事項、參考文獻(請使用APA第7版格式撰寫，若無作者與年代資訊，請以來源名稱標示，請不要顯示數字)' },
    { label: '呈現格式', placeholder: 'ex: 教案內容請使用表格呈現' },
  ],
  2: [
    { label: '題型選擇', placeholder: '單選題', options: ['單選題', '多選題', '填充題', '問答題'] },
    { label: '難度設定', placeholder: '易', options: ['易', '中', '難'] },
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

export default templates;
