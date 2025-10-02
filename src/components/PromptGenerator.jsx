import './Prompt.css';

import React, { useState } from 'react';

function PromptGenerator({
  selectedVolume,
  selectedChapters,
  selectedSections,
  selectedPoints,
  selectedItem,
  volumes,
  itemOptions,
  itemDetails = {},
  promptResultRef
}) {
  const [note, setNote] = useState('');
  const [result, setResult] = useState('');

  // 組裝 prompt 字串
  const generatePrompt = () => {
    if (selectedVolume === null || !volumes[selectedVolume]) {
      setResult('請先選擇「冊次」後再生成 prompt。');
      return;
    }
    let prompt = '';
    if (selectedVolume !== null && volumes[selectedVolume]) {
      prompt += `冊次: ${volumes[selectedVolume].name}\n`;
    }
    if (selectedChapters.length > 0) {
      const chapters = selectedChapters.map(idx => volumes[selectedVolume].chapters[idx].name).join(', ');
      prompt += `章: ${chapters}\n`;
    }
    if (selectedSections.length > 0) {
      const sections = selectedSections.map(val => {
        const [chIdx, secIdx] = val.split('-').map(Number);
        return volumes[selectedVolume].chapters[chIdx].sections[secIdx].name;
      }).join(', ');
      prompt += `節: ${sections}\n`;
    }
    if (selectedPoints.length > 0) {
      const points = selectedPoints.map(val => {
        const [chIdx, secIdx, ptIdx] = val.split('-').map(Number);
        return volumes[selectedVolume].chapters[chIdx].sections[secIdx].points[ptIdx].name;
      }).join(', ');
      prompt += `重點: ${points}\n`;
    }
    if (selectedItem) {
      const item = itemOptions.find(i => i.id === selectedItem)?.title;
      if (item) prompt += `項目: ${item}\n`;
      // 細項內容
      const detailLines = Object.entries(itemDetails)
        .filter(([label, obj]) => obj && obj.checked && obj.value && obj.value.trim() !== '')
        .map(([label, obj]) => `${label}: ${obj.value}`);
      if (detailLines.length > 0) {
        prompt += detailLines.join('\n') + '\n';
      }
    }
    if (note.trim()) {
      prompt += `備註: ${note.trim()}\n`;
    }
    // 新增前後固定說明
    const rule = `規則：\n1. 引用內容時，請標註檔案名稱與章節。\n   - 格式：[《檔案名稱》, 第X章, 第X節]  \n2. 為每個引用的檔案加上可信度標示：高 / 中 / 低  \n   - 高：教材原文、官方課本  \n   - 中：補充教材、教學文件  \n   - 低：網路文章、未經審查資料  \n3. 輸出結構：  \n   - (H1)主要成果:（依據「製作項目」生成）  \n   - (H1)來源:（列出引用章節 + 可信度）  \n   - (H1)備註:（如有矛盾資訊或補充說明）`;
    const header = '你作為一位專業教師，現在的任務是針對以下教材內容，生成指定的教學產出。\n';
    setResult(`${header}\n${prompt.trim()}\n\n${rule}`.trim());
  };

  return (
    <>
      <div className='prompt-function'>
        <h3>備註</h3>
        <textarea
          className='textarea-note'
          placeholder='輸入備註...'
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </div>
      <button className='generate-button' onClick={generatePrompt}>生成 Prompt</button>
      <div className='prompt-function'>
        <h3>結果</h3>
        <textarea
          className='textarea-result'
          placeholder='prompt 輸出結果在這裡...'
          value={result}
          readOnly
          ref={promptResultRef}
        />
      </div>
    </>
  );
}

export default PromptGenerator;
