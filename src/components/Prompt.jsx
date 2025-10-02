import './Prompt.css'
import CustomSelect from './CustomSelect'

import { useState } from 'react';
import ItemSelector from './ItemSelector';
import ItemTemplate from './ItemTemplate';

function Prompt({ volumes }) {
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [expandedChapters, setExpandedChapters] = useState([]); // 控制章展開
  const [expandedSections, setExpandedSections] = useState([]); // 控制節展開
  const [selectedItem, setSelectedItem] = useState(null);

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

  const itemOptions = [
    { id: 1, title: '教案' },
    { id: 2, title: '素養題' },
    { id: 3, title: '快速背課' },
    { id: 4, title: 'Ai 小助教' },
  ];

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
              setExpandedChapters([]);
              setExpandedSections([]);
            }}
            value={volumeOptions.find(opt => opt.value === selectedVolume) || null}
            isMulti={false}
          />
        </div>

        <div className='prompt-function'>
          <h3>章/節/重點</h3>
          <div style={{ width: '100%' }}>
            {currentVolume && currentVolume.chapters.map((ch, chIdx) => (
              <div key={chIdx} style={{ marginBottom: 6, marginLeft: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {ch.sections && ch.sections.length > 0 && (
                    <button
                      type="button"
                      style={{
                        width: 22, height: 22, marginRight: 4, border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: 16, color: '#8B00FF',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}
                      onClick={() => setExpandedChapters(exp => exp.includes(chIdx) ? exp.filter(i => i !== chIdx) : [...exp, chIdx])}
                    >
                      {expandedChapters.includes(chIdx) ? '−' : '+'}
                    </button>
                  )}
                  <label style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                    <input
                      type="checkbox"
                      checked={selectedChapters.includes(chIdx)}
                      onChange={e => {
                        let vals = selectedChapters.slice();
                        if (e.target.checked) {
                          vals.push(chIdx);
                          setSelectedChapters(vals);
                          // 勾選時不清除下層
                        } else {
                          vals = vals.filter(v => v !== chIdx);
                          setSelectedChapters(vals);
                          // 只在取消勾選時，清除該章下所有節與重點
                          setSelectedSections(prevSections => prevSections.filter(secVal => {
                            const [cIdx] = secVal.split('-').map(Number);
                            return vals.includes(cIdx);
                          }));
                          setSelectedPoints(prevPoints => prevPoints.filter(ptVal => {
                            const [cIdx] = ptVal.split('-').map(Number);
                            return vals.includes(cIdx);
                          }));
                        }
                      }}
                    />
                    <span style={{ marginLeft: 4, fontWeight: 'bold', color: '#8B00FF' }}>{ch.name}</span>
                  </label>
                </div>
                {expandedChapters.includes(chIdx) && (
                  <div style={{ marginLeft: 32 }}>
                    {ch.sections.map((sec, secIdx) => {
                      const secValue = `${chIdx}-${secIdx}`;
                      return (
                        <div key={secValue} style={{ marginBottom: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {sec.points && sec.points.length > 0 && (
                              <button
                                type="button"
                                style={{
                                  width: 20, height: 20, marginRight: 4, border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: 14, color: '#01B0B0',
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                }}
                                onClick={() => setExpandedSections(exp => exp.includes(secValue) ? exp.filter(i => i !== secValue) : [...exp, secValue])}
                              >
                                {expandedSections.includes(secValue) ? '−' : '+'}
                              </button>
                            )}
                            <label style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                              <input
                                type="checkbox"
                                checked={selectedSections.includes(secValue)}
                                onChange={e => {
                                  let vals = selectedSections.slice();
                                  if (e.target.checked) {
                                    vals.push(secValue);
                                    setSelectedSections(vals);
                                    // 勾選時不清除下層
                                  } else {
                                    vals = vals.filter(v => v !== secValue);
                                    setSelectedSections(vals);
                                    // 只在取消勾選時，清除該節下所有重點
                                    setSelectedPoints(prevPoints => prevPoints.filter(ptVal => {
                                      const [cIdx, sIdx] = ptVal.split('-').map(Number);
                                      return vals.includes(`${cIdx}-${sIdx}`);
                                    }));
                                  }
                                }}
                              />
                              <span style={{ marginLeft: 4, color: '#01B0B0', fontWeight: 500 }}>{sec.name}</span>
                            </label>
                          </div>
                          {expandedSections.includes(secValue) && (
                            <div style={{ marginLeft: 32, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                              {sec.points.map((pt, ptIdx) => {
                                const ptValue = `${chIdx}-${secIdx}-${ptIdx}`;
                                return (
                                  <label key={ptValue} style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                                    <input
                                      type="checkbox"
                                      checked={selectedPoints.includes(ptValue)}
                                      onChange={e => {
                                        let vals = selectedPoints.slice();
                                        if (e.target.checked) vals.push(ptValue);
                                        else vals = vals.filter(v => v !== ptValue);
                                        setSelectedPoints(vals);
                                      }}
                                    />
                                    <span style={{ marginLeft: 4 }}>{pt.name}</span>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


        <div className='prompt-function'>
          <h3>項目</h3>
          <div className='prompt-item'>
            <ItemSelector
              items={itemOptions}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <ItemTemplate key={selectedItem} selectedItem={selectedItem} />
          </div>
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
