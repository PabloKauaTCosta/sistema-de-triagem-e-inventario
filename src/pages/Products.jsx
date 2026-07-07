import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Products() {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({ name: "", category: "", stock: "", page: 1 });
    const [meta, setMeta] = useState({ totalPages: 1 });
    
    useEffect(() => {
        const load = async () => {
            const { data } = await api.get("/products", { params: filters });
            setItems(data.items || data.products || []);
            setMeta(data.meta || { totalPages: 1 });
        };
        
        load();
    }, [filters]);
    
    return (
    <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input placeholder="Nome" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value, page: 1 })}/>
        <input placeholder="Categoria" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}/>
        <select value={filters.stock} onChange={(e) => setFilters({ ...filters, stock: e.target.value, page: 1 })}>
            <option value="">Status de estoque</option>
            <option value="ok">Normal</option>
            <option value="low">Baixo</option>
            <option value="critical">Crítico</option>
        </select>
        <Link to="/products/new">Novo</Link>
        </div>
        
        <table border="1" cellPadding="8">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Qtd</th>
                    <th>Ações</th>
                </tr>
            </thead>
            
            <tbody>
                {items.map((p) => (
                    <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.category?.name || "-"}</td>
                        <td>{p.price}</td>
                        <td>{p.quantity}</td>
                        <td><Link to={`/products/${p.id}/edit`}>Editar</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        <div style={{ marginTop: 16 }}>
            <button disabled={filters.page === 1} onClick={() => setFilters({ ...filters, page: filters.page - 1 })}>
                Anterior
            </button>
            <span style={{ margin: "0 8px" }}>Página {filters.page}</span>
            <button disabled={filters.page >= meta.totalPages} onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>
                Próxima
            </button>
        </div>
    </div>
    );
};