// 項目選單，支援 default 與科目細分
export const itemOptionsMap = {
  default: [
    { id: 1, title: '教案' },
    { id: 2, title: '素養題' },
    { id: 3, title: '快速備課' },
    { id: 4, title: 'Ai 小助教' },
  ],
  '高中生涯規劃': [
    {
      id: 1,
      title: '課程設計',
      children: [
        { id: '1-1', title: '課程目標' },
        { id: '1-2', title: '設計活動' },
        { id: '1-3', title: '生成題目' },
      ]
    },
    {
      id: 2,
      title: '升學資訊',
      children: [
        { id: '2-1', title: '面試題目' },
        { id: '2-2', title: '學群指南' },
        { id: '2-3', title: '落點分析' },
      ]
    },
    {
      id: 3,
      title: '學習歷程',
      children: [
        { id: '3-1', title: '修正建議' },
        { id: '3-2', title: '教授視角' },
      ]
    },  
  ],

  // 其他科目...
};
// 欄位資料結構 templates
// 支援科目細分，供 ItemTemplate 和 PromptGenerator 共用
export const templates = {
  // 預設
  default: {
    1: [
      { label: '角色', placeholder: 'ex: 你是一名{地理}教育專家' },
      { label: '教學對象', placeholder: 'ex: 高中一年級學生' },
      { label: '教學時長', placeholder: 'ex: 2 節課(共 100 分鐘)' },
      { label: '教學法', placeholder: 'ex: PBL(project-based learning)' },
      { label: '任務', placeholder: 'ex: 以{地理科}為例，設計一個能培養學生核心素養的學習活動或專案' },
      { label: '具體內容與限制', placeholder: 'ex: 教案請列出主題、課綱學習表現、實質內涵、核心問題、教學步驟與時間(包含教師需給予的引導語)、需要使用的數位工具、軟硬體設備、注意事項、參考文獻(請使用APA第7版格式撰寫，若無作者與年代資訊，請以來源名稱標示，請不要顯示數字)' },
      { label: '呈現格式', placeholder: 'ex: 教案內容請使用表格呈現' },
    ],
    2: [
      { label: '題型選擇', placeholder: '單選題', options: ['單選題', '多選題', '填充題', '問答題'] },
      { label: '難度設定', placeholder: '易', options: ['易', '中', '難'] },
      { label: '對應課綱能力指標', placeholder: '請輸入能力指標...' },
      { label: '題數', placeholder: 'ex: 3 題' },
      { label: '解析', placeholder: '要', options: ['要', '不要'] },
    ],
    3: [
      { label: '產出18週完整備課表', placeholder: '請輸入你想要的週數..' },
      { label: '單元反思點', placeholder: '請輸入單元反思點...' },
    ],
    4: [
      { label: '連結 NotebookLM', placeholder: '請輸入 NotebookLM 連結...' },
      { label: '封閉式對話', placeholder: '請輸入封閉式對話內容...' },
    ],
  },
  
  '高中生涯規劃': {
    '1-1': [
      { label: '角色', placeholder: 'ex: 你是一名{地理}教育專家' },
      { label: '教學對象', placeholder: 'ex: 高中一年級學生' },
      { label: '教學時長', placeholder: 'ex: 2 節課(共 100 分鐘)' },
      { label: '教學法', placeholder: 'ex: PBL(project-based learning)' },
      { label: '任務', placeholder: 'ex: 以{地理科}為例，設計一個能培養學生核心素養的學習活動或專案' },
      { label: '具體內容與限制', placeholder: 'ex: 教案請列出主題、課綱學習表現、實質內涵、核心問題、教學步驟與時間(包含教師需給予的引導語)、需要使用的數位工具、軟硬體設備、注意事項、參考文獻(請使用APA第7版格式撰寫，若無作者與年代資訊，請以來源名稱標示，請不要顯示數字)' },
      { label: '呈現格式', placeholder: 'ex: 教案內容請使用表格呈現' },
    ],
    '1-2': [
      { label: '角色', placeholder: 'ex: 你是一名{地理}教育專家' },
      { label: '教學對象', placeholder: 'ex: 高中一年級學生' },
      { label: '教學時長', placeholder: 'ex: 2 節課(共 100 分鐘)' },
      { label: '分組方式', placeholder: '單人', options: ['單人', '多人'] },
      { label: '活動時間', placeholder: 'ex: 30分鐘' },
      { label: '具體內容與限制', placeholder: 'ex: 教案請列出主題、課綱學習表現、實質內涵、核心問題、教學步驟與時間(包含教師需給予的引導語)、需要使用的數位工具、軟硬體設備、注意事項、參考文獻(請使用APA第7版格式撰寫，若無作者與年代資訊，請以來源名稱標示，請不要顯示數字)' },
      { label: '呈現格式', placeholder: 'ex: 教案內容請使用表格呈現' },
    ],
    '1-3': [
      { label: '角色', placeholder: 'ex: 你是一名{地理}教育專家' },
      { label: '教學對象', placeholder: 'ex: 高中一年級學生' },
      { label: '考試時長', placeholder: 'ex: 100 分鐘' },
      { label: '題型選擇', placeholder: '單選題', options: ['單選題', '是非題', '簡答題'] },
      { label: '題數', placeholder: 'ex: 3 題目' },
      { label: '解析', placeholder: '要', options: ['要', '不要'] },
      { label: '題目生成方式', placeholder: '文字檔(列印輸出)', options: ['文字檔(列印輸出)', 'Kahoot', 'Quizizz']},
    ],
    '2-1': [
      { label: '角色', placeholder: 'ex: 你是一名專業的{地理}科大學教授。' },
      { label: '背景', placeholder: 'ex: 現在有一名普通高中的學生與你進行面試。' },
      { label: '參考資料', placeholder: 'ex: 面試考古題題目、學習歷程自述、多元綜整心得等。' },
      { label: '具體內容與限制', placeholder: 'ex: 請根據我上傳的資料，為學生設計一份**題的面試題目，題型的設計可以參考考古題，題目內容可以針對檔案「學習歷程自述」與「多元綜整心得」的內容做設計。且需要請你也提供參考回答的建議。' },
    ],
    '2-2': [
      { label: '角色', placeholder: 'ex: 你是一名專業的生涯指引的教學專家。' },
      { label: '背景', placeholder: 'ex: 你的學生是高中一年級，目前對於未來的學群的選擇毫無頭緒。' },
      { label: '參考資料', placeholder: 'ex: 興趣測驗、性向測驗、霍蘭德測驗、大考中心簡章等等' },
      { label: '具體內容與限制', placeholder: 'ex: 請根據我上傳的資料，針對學生的各項測驗進行分析，分析的目的主要是需要提供給學生選擇學群的建議。\n 分析的結果需要包含 \n 1.最符合測驗結果的學群 6 個 \n 2. 符合結果的學群原因列表呈 \n 3.符合結果的學群未來有哪些熱門職業' },
    ],
    '2-3': [
      { label: '角色', placeholder: 'ex: 你是一名專業的生涯指引的教學專家。' },
      { label: '背景', placeholder: 'ex: 你的學生是高中三年級，目前學測成績已經出爐，正在煩惱要挑選什麼學校與科系。' },
      { label: '參考資料', placeholder: 'ex: 近3年來各校系錄取成績、學生學測成績、高一興趣量表測驗結果（學群建議）' },
      { label: '具體內容與限制', placeholder: 'ex: 請根據我上傳的資料，透過學生學測的成績來核對近3年來各校系公告的錄取成績進行落點比對，其中還需要結合學生興趣量表的結果進行篩選，列出最優先適合的 6 個志願排序\n 1.分析的結果需要包含 \n 2.最符合測驗結果的學群 \n 3. 個符合結果的學群原因列表呈現符合結果的學群未來有哪些熱門職業' },
    ],
    '3-1': [
      { label: '角色', placeholder: 'ex: 你是一名專業的{地理}科大學教授。' },
      { label: '背景', placeholder: 'ex: 現在有一名學生的學習歷程檔案需要檢核內容。' },
      { label: '參考資料', placeholder: 'ex: 學生的學習歷程檔案、教育部規範的學習歷程規定、學習歷程的重點摘要' },
      { label: '具體內容與限制', placeholder: 'ex: 請根據我上傳的資料，針對學生的「****」學習歷程檔案進行分析與建議，其中分析的過程中需要參考教育部的規範與學習歷程製作的重點摘要。\n 分析的結果需要包含 \n 1.學習歷程檔案是否有缺漏的資訊 \n 2. 內容的表達有無不通順的地方 \n 3. 綜合可以調整的方向請幫我列點呈現' },
    ],
    '3-2': [
      { label: '角色', placeholder: 'ex: 你是一名專業的{地理}科大學教授。' },
      { label: '背景', placeholder: 'ex: 現在有一名學生的學習歷程檔案上傳給你閱覽。' },
      { label: '參考資料', placeholder: 'ex: 學生的學習歷程檔案、教授會在意的觀點。' },
      { label: '具體內容與限制', placeholder: 'ex: 請根據我上傳的資料，依照你教授的視角與參考評量的重點去分析這位學生的「****」學習歷程檔案，其中分析的內容包含 \n 1.具有吸引力的地方 \n 2. 不具有吸引力的 \n 3. 建議修改的方向地方' },
    ],
  }
  // 其他科目...
};
