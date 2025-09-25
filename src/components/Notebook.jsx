import './Notebook.css'

const notebooks = [
  { name: 'NotebookLM 筆記本 1', url: 'https://notebooklm.google.com/u/0/notebooks/1' },
  { name: 'NotebookLM 筆記本 2', url: 'https://notebooklm.google.com/u/0/notebooks/2' },
  { name: 'NotebookLM 筆記本 3', url: 'https://notebooklm.google.com/u/0/notebooks/3' },
  { name: 'NotebookLM 筆記本 1', url: 'https://notebooklm.google.com/u/0/notebooks/1' },
  { name: 'NotebookLM 筆記本 2', url: 'https://notebooklm.google.com/u/0/notebooks/2' },
  { name: 'NotebookLM 筆記本 3', url: 'https://notebooklm.google.com/u/0/notebooks/3' },
];

function Notebook() {
  return (
    <div className="notebook">
      <div className='notebook-title'>
        <h2>NotebookLM 筆記本連結</h2>
      </div>
      <div className='notebook-urls'>
        {notebooks.map((item, idx) => (
          <button
            className='notebook-url'
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

export default Notebook;