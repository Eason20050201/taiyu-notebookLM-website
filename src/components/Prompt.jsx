import './Prompt.css'
import CustomSelect from './CustomSelect'

function Prompt() {
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
            options={[
              { value: '1', label: '冊次 1' },
              { value: '2', label: '冊次 2' },
            ]}
            onChange={(val) => console.log("冊次選擇:", val)}
          />
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
