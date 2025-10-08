import './Notebook.css'

function Notebook({ volumes = [] }) {
  const allowedDomains = ['notebooklm.google.com']; // 白名單域名

  const validateUrl = (raw) => {
    if (!raw || typeof raw !== 'string') return { valid: false };
    let trimmed = raw.trim();

    // 沒有協議就自動補 https
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${trimmed}`;
    }

    try {
      const u = new URL(trimmed);

      // 協議檢查
      if (u.protocol !== 'http:' && u.protocol !== 'https:') {
        return { valid: false };
      }

      // 白名單檢查
      const allowed = allowedDomains.some(d => u.hostname === d || u.hostname.endsWith(`.${d}`));
      if (!allowed) {
        return { valid: false };
      }

      return { valid: true, url: u.href };
    } catch (e) {
      return { valid: false };
    }
  };

  const openSafeUrl = (safeUrl) => {
    window.open(safeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="notebook">
      <div className='notebook-title'>
        <h2>想開啟你的 NotebookLM 筆記本？</h2>
        <h2>這裡幫你快速連結！</h2>
      </div>
      <div className='notebook-urls'>
        {volumes.filter(v => v.notebookUrl).map((v, idx) => {
          const result = validateUrl(v.notebookUrl);
          return (
            <button
              className={`notebook-url ${!result.valid ? 'disabled' : ''}`}
              key={idx}
              disabled={!result.valid}
              onClick={() => result.valid && openSafeUrl(result.url)}
            >
              {result.valid ? v.name : `${v.name}（連結無效）`}
            </button>
          );
        })}
        {volumes.filter(v => v.notebookUrl).length === 0 && (
          <span>尚無此科目對應的 NotebookLM 連結</span>
        )}
      </div>
    </div>
  );
}

export default Notebook;
