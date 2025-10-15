import './Prompt.css';


import React, { useState } from 'react';
import { templates, promptRule } from './templates';
import BubbleButton from './BubbleButton';

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

  // 解析目前所選項目的欄位定義（先找科目模板，找不到用 default）
  const resolveTemplateFields = () => {
    if (!selectedItem) return [];
    const subjectTemplates = (subjectName && templates[subjectName]) ? templates[subjectName] : {};
    return subjectTemplates[selectedItem] || (templates.default ? templates.default[selectedItem] : [] ) || [];
  };

  // 組裝 prompt 字串
  const generatePrompt = () => {
    if (selectedVolume === null || !volumes[selectedVolume]) {
      setResult('請先選擇「冊次」後再生成 prompt。');
      return;
    }
    let prompt = '';


    // 取得 placeholder 並自動替換 {地理} 相關為 subjectName
    const getPlaceholder = (label) => {
      if (!selectedItem) return '';
      const fields = resolveTemplateFields();
      const field = fields.find(f => f.label === label);
      // 若模板有 options 但未提供 placeholder，預設取第一個選項
      let ph = field?.placeholder ?? (Array.isArray(field?.options) ? field.options[0] : '');
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
      if (obj && obj.checked && (obj.value === undefined || obj.value === null || (typeof obj.value === 'string' && obj.value.trim() === ''))) {
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
        .filter(([label, obj]) => obj && obj.checked && obj.value && (typeof obj.value === 'object' || (typeof obj.value === 'string' && obj.value.trim() !== '')))
        .map(([label, obj]) => {
          if (typeof obj.value === 'object') {
            // subjectScores: print as 國:xx, 英:yy ...
            const pairs = Object.entries(obj.value)
              .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
              .map(([k, v]) => `${k}:${v}`)
              .join(', ');
            return `${label}: ${pairs}`;
          }
          return `${label}: ${obj.value}`;
        });
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
  // 新增前後固定說明（從 templates 管理的共用文字）
  setResult(`${prompt.trim()}\n\n${promptRule}`.trim());
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
      {/* <button className='generate-button' onClick={generatePrompt}>生成 Prompt</button> */}
      <BubbleButton label='生成 prompt' buttonColor='#00DDF6' textColor='#0809FFF' onClick={generatePrompt}/>

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
