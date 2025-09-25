import './DocumentDownload.css'

const downloads = [
  { name: 'NotebookLM 筆記本 1', url: 'https://notebooklm.google.com/u/0/notebooks/1' },
  { name: 'NotebookLM 筆記本 2', url: 'https://notebooklm.google.com/u/0/notebooks/2' },
  { name: 'NotebookLM 筆記本 3', url: 'https://notebooklm.google.com/u/0/notebooks/3' },
  { name: 'NotebookLM 筆記本 1', url: 'https://notebooklm.google.com/u/0/notebooks/1' },
  { name: 'NotebookLM 筆記本 2', url: 'https://notebooklm.google.com/u/0/notebooks/2' },
  { name: 'NotebookLM 筆記本 3', url: 'https://notebooklm.google.com/u/0/notebooks/3' },
  
];

function DocumentDownload() {
  return (
    <div className="document-download">
      <div className='document-download-title'>
        <h2>泰宇翔宇 notebookLM 文件下載連結</h2>
      </div>
      <div className='document-download-urls'>
        {downloads.map((item, idx) => (
          <button
            className='document-download-url'
            key={idx}
            onClick={() => window.open(item.url, '_blank')}
          >
            {item.name}
          </button>

        ))}
      </div>
    </div>
  );
}

export default DocumentDownload;