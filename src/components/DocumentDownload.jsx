import './DocumentDownload.css'

function DocumentDownload({ volumes = [] }) {
  const allowedDomains = ['drive.google.com']; // 可根據實際需求擴充

  const validateUrl = (raw) => {
    if (!raw || typeof raw !== 'string') return { valid: false };
    let trimmed = raw.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${trimmed}`;
    }
    try {
      const u = new URL(trimmed);
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return { valid: false };
      const allowed = allowedDomains.some(d => u.hostname === d || u.hostname.endsWith(`.${d}`));
      if (!allowed) return { valid: false };
      return { valid: true, url: u.href };
    } catch (e) {
      return { valid: false };
    }
  };

  const openSafeUrl = (safeUrl) => {
    window.open(safeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="document-download">
      <div className='document-download-title'>
        <h2>~~想自建泰宇翔宇授權的資料庫嗎?~~</h2>
        <h2>點這裡下載 NBLM 資料庫!!</h2>
      </div>
      <div className='document-download-urls'>
        {volumes.filter(v => v.downloadUrl).map((v, idx) => {
          const result = validateUrl(v.downloadUrl);
          return (
            <button
              className={`document-download-url ${!result.valid ? 'disabled' : ''}`}
              key={idx}
              disabled={!result.valid}
              onClick={() => result.valid && openSafeUrl(result.url)}
            >
              {result.valid ? v.name : `${v.name}（連結無效）`}
            </button>
          );
        })}
        {volumes.filter(v => v.downloadUrl).length === 0 && (
          <span>尚無此科目對應的下載連結</span>
        )}
      </div>
    </div>
  );
}

export default DocumentDownload;