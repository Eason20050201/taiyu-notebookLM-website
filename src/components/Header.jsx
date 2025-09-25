import logo from '../assets/Logo.png';

function Header() {
    return (
        <div className="header">
            <img src={logo} alt='Taiyu Logo' className='logo' />
            <h1>NotebookLM 資源</h1>
        </div>
    );
}

export default Header;