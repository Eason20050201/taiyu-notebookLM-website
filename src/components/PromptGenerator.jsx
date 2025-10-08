import './Prompt.css';


import React, { useState } from 'react';
import templates from './templates';

function PromptGenerator({
  selectedVolume,
  selectedChapters,
  selectedSections,
  selectedPoints,
  selectedItem,
  volumes,
  itemOptions,
  itemDetails = {},
  promptResultRef,
  subjectName = ''
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


    // 取得 placeholder 並自動替換 {地理} 相關為 subjectName
    const getPlaceholder = (label) => {
      if (!selectedItem || !templates[selectedItem]) return '';
      const field = templates[selectedItem].find(f => f.label === label);
      let ph = field?.placeholder || '';
      if (subjectName) {
        ph = ph.replace(/\{地理科\}|\{地理\}|\{科目\}/g, subjectName);
      }
      // 去除開頭的 'ex:' 或 'ex：' 或 '.ex:'
      ph = ph.replace(/^\s*(ex:|ex：|\.ex:|\.ex：)\s*/i, '');
      return ph;
    };

    // 先補齊預設值
    const filledDetails = { ...itemDetails };
    Object.entries(filledDetails).forEach(([label, obj]) => {
      if (obj && obj.checked && (!obj.value || obj.value.trim() === '')) {
        filledDetails[label] = {
          ...obj,
          value: getPlaceholder(label)
        };
      }
    });

    if (selectedItem) {
      const item = itemOptions.find(i => i.id === selectedItem)?.title;
      if (item) prompt += `項目: ${item}\n\n`;
      // 細項內容
      const detailLines = Object.entries(filledDetails)
        .filter(([label, obj]) => obj && obj.checked && obj.value && obj.value.trim() !== '')
        .map(([label, obj]) => `${label}: ${obj.value}`);
      if (detailLines.length > 0) {
        prompt += detailLines.join('\n\n') + '\n\n';
      }
    }
    if (selectedVolume !== null && volumes[selectedVolume]) {
      prompt += `冊次: ${volumes[selectedVolume].name}\n\n`;
    }
    if (selectedChapters.length > 0) {
      const chapters = selectedChapters.map(idx => volumes[selectedVolume].chapters[idx].name).join(', ');
      prompt += `章: ${chapters}\n\n`;
    }
    if (selectedSections.length > 0) {
      const sections = selectedSections.map(val => {
        const [chIdx, secIdx] = val.split('-').map(Number);
        return volumes[selectedVolume].chapters[chIdx].sections[secIdx].name;
      }).join(', ');
      prompt += `節: ${sections}\n\n`;
    }
    if (selectedPoints.length > 0) {
      const points = selectedPoints.map(val => {
        const [chIdx, secIdx, ptIdx] = val.split('-').map(Number);
        return volumes[selectedVolume].chapters[chIdx].sections[secIdx].points[ptIdx].name;
      }).join(', ');
      prompt += `重點: ${points}\n\n`;
    }
    if (note.trim()) {
      prompt += `備註: ${note.trim()}\n\n`;
    }
    // 新增前後固定說明
    const rule = `規則：\n1. 引用內容時，請標註檔案名稱與章節。\n   - 格式：[《檔案名稱》, 第X章, 第X節]  \n2. 為每個引用的檔案加上可信度標示：高 / 中 / 低  \n   - 高：教材原文、官方課本  \n   - 中：補充教材、教學文件  \n   - 低：網路文章、未經審查資料  \n3. 輸出結構：  \n   - (H1)主要成果:（依據「製作項目」生成）  \n   - (H1)來源:（列出引用章節 + 可信度）  \n   - (H1)備註:（如有矛盾資訊或補充說明）`;
    setResult(`${prompt.trim()}\n\n${rule}`.trim());
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
          onChange={e => setResult(e.target.value)}
          ref={promptResultRef}
        />
      </div>
    </>
  );
}

export default PromptGenerator;
