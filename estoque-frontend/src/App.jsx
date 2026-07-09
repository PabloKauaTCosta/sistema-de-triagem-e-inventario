import React, { useState } from 'react';
import Metrics from './components/metrics';
import Products from './components/products';
import Categories from './components/categories';
import StockMovement from './components/stockmovement';
import Logs from './components/logs';

export default function App() {
  const [activeTab, setActiveTab] = useState('metrics');

  const [categories, setCategories] = useState([
    { id: 1, name: 'Eletrônicos', description: 'Dispositivos eletrônicos em geral' },
    { id: 2, name: 'Escritório', description: 'Materiais para escritório' }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Notebook', description: 'Core i7 16GB', price: 4500.00, quantity: 12, min_stock: 5, category_id: 1 },
    { id: 2, name: 'Cadeira Ergonômica', description: 'Preta com regulagem', price: 850.00, quantity: 3, min_stock: 5, category_id: 2 }
  ]);

  const [logs, setLogs] = useState([
    { id: 1, action: 'CREATE', entity: 'Product', entity_id: 1, user_id: 1, created_at: new Date().toLocaleString() }
  ]);

  const addLog = (action, entity, entityId) => {
    setLogs(prev => [
      { id: Date.now(), action, entity, entity_id: entityId, user_id: 1, created_at: new Date().toLocaleString() },
      ...prev
    ]);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-title">StockManager</div>
        <nav className="sidebar-nav">
          {[
            { id: 'metrics', label: 'Dashboard' },
            { id: 'products', label: 'Produtos' },
            { id: 'categories', label: 'Categorias' },
            { id: 'movements', label: 'Movimentar Estoque' },
            { id: 'logs', label: 'Logs do Sistema' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h2 className="header-title">
            {activeTab === 'metrics' ? 'Painel Geral' : activeTab}
          </h2>
          <div className="user-info">Usuário: <strong>Admin</strong></div>
        </header>

        <main className="content-body">
          {activeTab === 'metrics' && <Metrics products={products} />}
          {activeTab === 'products' && <Products products={products} setProducts={setProducts} categories={categories} addLog={addLog} />}
          {activeTab === 'categories' && <Categories categories={categories} setCategories={setCategories} addLog={addLog} />}
          {activeTab === 'movements' && <StockMovement products={products} setProducts={setProducts} addLog={addLog} />}
          {activeTab === 'logs' && <Logs logs={logs} />}
        </main>
      </div>
    </div>
  );
}