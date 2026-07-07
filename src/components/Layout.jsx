import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    
    return (
    <div>
        <header style={{ display: "flex", gap: 12, padding: 16 }}>
            <Link to="/products">Produtos</Link>
            <Link to="/metrics">Métricas</Link>
            <Link to="/logs">Logs</Link>
            <button onClick={logout}>Sair</button>
        </header>
        
        <main style={{ padding: 16 }}>
            <Outlet />
        </main>
    </div>
    );
};