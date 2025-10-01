import './Prompt.css'
import CustomSelect from './CustomSelect'

import { useState } from 'react';

function Prompt({ volumes }) {
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);

  // 冊次選項
  const volumeOptions = volumes.map((v, idx) => ({ value: idx, label: v.name }));
  // 取得目前選到的冊次物件
  const currentVolume = selectedVolume !== null && volumes[selectedVolume] ? volumes[selectedVolume] : null;
  // 章選項
  const chapterOptions = currentVolume ? currentVolume.chapters.map((ch, idx) => ({ value: idx, label: ch.name })) : [];
  // 目前選到的章物件陣列（依章原本順序排序）
  const currentChapters = currentVolume && selectedChapters.length > 0
    ? [...selectedChapters].sort((a, b) => a - b).map(idx => currentVolume.chapters[idx])
    : [];
  // 節選項
  const sectionOptions = selectedChapters.length > 0 && currentVolume
    ? selectedChapters.flatMap(chIdx =>
        currentVolume.chapters[chIdx].sections.map((sec, secIdx) => ({
          value: `${chIdx}-${secIdx}`,
          label: sec.name
        }))
      )
    : [];
  // 目前選到的節物件陣列
  const currentSections = (currentChapters.length > 0 && selectedSections.length > 0)
    ? selectedSections.map(val => {
        const [chIdx, secIdx] = val.split('-').map(Number);
        return volumes[selectedVolume].chapters[chIdx].sections[secIdx];
      })
    : [];
  // 重點選項
  const pointOptions = currentSections.length > 0
    ? currentSections.flatMap((sec, secIdx) => sec.points.map((pt, ptIdx) => ({ value: `${selectedSections[secIdx]}-${ptIdx}`, label: pt.name })))
    : [];

  return (
    <div className="prompt">
      <div className="prompt-title">
        <h2>💡 老師想做甚麼? Prompt 生成器協助你!</h2>
      </div>
      <div className="prompt-functions">
        <div className='prompt-function'>
          <h3>冊次</h3>
          <CustomSelect
            placeholder="選擇冊次"
            options={volumeOptions}
            onChange={option => {
              setSelectedVolume(option ? option.value : null);
              setSelectedChapters([]);
              setSelectedSections([]);
              setSelectedPoints([]);
            }}
            value={volumeOptions.find(opt => opt.value === selectedVolume) || null}
            isMulti={false}
          />
        </div>

        <div className='prompt-function'>
          <h3>章 (可複選)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {chapterOptions.map(opt => (
              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                <input
                  type="checkbox"
                  checked={selectedChapters.includes(opt.value)}
                  onChange={e => {
                    let vals = selectedChapters.slice();
                    if (e.target.checked) vals.push(opt.value);
                    else vals = vals.filter(v => v !== opt.value);
                    setSelectedChapters(vals);
                    // 保留屬於已選章的節
                    setSelectedSections(prevSections => prevSections.filter(secVal => {
                      const [chIdx] = secVal.split('-').map(Number);
                      return vals.includes(chIdx);
                    }));
                    // 保留屬於已選章的重點
                    setSelectedPoints(prevPoints => prevPoints.filter(ptVal => {
                      const [chIdx] = ptVal.split('-').map(Number);
                      return vals.includes(chIdx);
                    }));
                  }}
                />
                <span style={{ marginLeft: 4 }}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className='prompt-function'>
          <h3>節 (可複選)</h3>
          <div style={{ width: '100%' }}>
            {currentChapters.length > 0 && currentChapters.map((ch, i) => {
              const chIdx = currentVolume.chapters.findIndex(c => c === ch);
              return (
                <div key={chIdx} style={{ marginBottom: 8 }}>
                  <div className="prompt-section-chapter-title">{ch.name}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {ch.sections.map((sec, secIdx) => {
                      const value = `${chIdx}-${secIdx}`;
                      return (
                        <label key={value} style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                          <input
                            type="checkbox"
                            checked={selectedSections.includes(value)}
                            onChange={e => {
                              let vals = selectedSections.slice();
                              if (e.target.checked) vals.push(value);
                              else vals = vals.filter(v => v !== value);
                              setSelectedSections(vals);
                              setSelectedPoints([]);
                            }}
                          />
                          <span style={{ marginLeft: 4 }}>{sec.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='prompt-function'>
          <h3>重點 (可複選)</h3>
          <div style={{ width: '100%' }}>
            {currentSections.length > 0 && (() => {
              // 依章、節原順序分組顯示
              // 先找出所有被選章的 index
              const chIdxSet = new Set(selectedSections.map(val => Number(val.split('-')[0])));
              // 依章順序顯示
              return [...chIdxSet].sort((a, b) => a - b).map(chIdx => {
                // 找出這個章下所有被選的節，依節原順序
                const secIdxs = currentVolume.chapters[chIdx].sections
                  .map((_, secIdx) => secIdx)
                  .filter(secIdx => selectedSections.includes(`${chIdx}-${secIdx}`));
                if (secIdxs.length === 0) return null;
                return secIdxs.map(secIdx => {
                  const sec = currentVolume.chapters[chIdx].sections[secIdx];
                  const secKey = `${chIdx}-${secIdx}`;
                  return (
                    <div key={secKey} style={{ marginBottom: 8 }}>
                      <div className="prompt-section-chapter-title">{sec.name}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {sec.points.map((pt, ptIdx) => {
                          const value = `${secKey}-${ptIdx}`;
                          return (
                            <label key={value} style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                              <input
                                type="checkbox"
                                checked={selectedPoints.includes(value)}
                                onChange={e => {
                                  let vals = selectedPoints.slice();
                                  if (e.target.checked) vals.push(value);
                                  else vals = vals.filter(v => v !== value);
                                  setSelectedPoints(vals);
                                }}
                              />
                              <span style={{ marginLeft: 4 }}>{pt.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              });
            })()}
          </div>
        </div>

        <div className='prompt-function'>
          <h3>項目</h3>
          <CustomSelect
            placeholder="選擇項目"
            options={[
              { value: '1', label: '項目 1' },
              { value: '2', label: '項目 2' },
            ]}
            onChange={(val) => console.log("項目選擇:", val)}
          />
        </div>

        <div className='prompt-function'>
          <h3>備註</h3>
          <textarea className='textarea-note' placeholder='輸入備註...'></textarea>
        </div>

        <button className='generate-button'>生成 Prompt</button>

        <div className='prompt-function'>
          <h3>結果</h3>
          <textarea className='textarea-result' placeholder='prompt 輸出結果在這裡...'></textarea>
        </div>

        <button className='copy-button'>複製到剪貼版</button>
      </div>
    </div>
  );
}

export default Prompt;
