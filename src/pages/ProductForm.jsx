import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        min_stock: "",
        category_id: "",
    });
    
    useEffect(() => {
        if (isEdit) {
            api.get(`/products/${id}`).then(({ data }) => {
                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || "",
                    quantity: data.quantity || "",
                    min_stock: data.min_stock || "",
                    category_id: data.category_id || "",
                });
            });
        }
    }, [id, isEdit]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) await api.put(`/product/${id}`, form);
        else await api.post("/product", form);
        navigate("/products");
    };
    
    return (
    <form onSubmit={handleSubmit}>
        <h1>{isEdit ? "Editar produto" : "Novo produto"}</h1>
        <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input placeholder="Preço" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input placeholder="Quantidade" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <input placeholder="Estoque mínimo" value={form.min_stock} onChange={(e) => setForm({ ...form, min_stock: e.target.value })} />
            <input placeholder="ID da categoria" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} />
            <button type="submit">Salvar</button>
    </form>
    );
};