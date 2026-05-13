// LUXWEAR CONTROL CENTER - VITE + REACT + SUPABASE (FULL PROJECT SCAFFOLD)
// ------------------------------------------------------------
// Estrutura (GitHub / Vercel):
/*
LuxWear/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── lib/supabase.js
│   ├── styles.css
├── index.html
├── package.json
├── vite.config.js
├── .env.example
*/

// =========================
// src/lib/supabase.js
// =========================
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// =========================
// src/main.jsx
// =========================
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// =========================
// src/App.jsx
// =========================
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [tab, setTab] = useState('dashboard')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [products, setProducts] = useState([])
  const [transactions, setTransactions] = useState([])

  // AUTH
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // LOAD DATA
  useEffect(() => {
    if (user) {
      loadProducts()
      loadTransactions()
    }
  }, [user])

  async function loadProducts() {
    const { data } = await supabase.from('products').select('*')
    setProducts(data || [])
  }

  async function loadTransactions() {
    const { data } = await supabase.from('transactions').select('*')
    setTransactions(data || [])
  }

  // AUTH ACTIONS
  async function login() {
    await supabase.auth.signInWithPassword({ email, password })
  }

  async function signup() {
    await supabase.auth.signUp({ email, password })
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  // CRUD PRODUCTS
  async function addProduct() {
    await supabase.from('products').insert({
      name: 'Novo Produto',
      qty: 1,
      price: 10
    })
    loadProducts()
  }

  async function deleteProduct(id) {
    await supabase.from('products').delete().eq('id', id)
    loadProducts()
  }

  // TRANSACTIONS
  async function addTransaction() {
    await supabase.from('transactions').insert({
      type: 'entrada',
      description: 'Venda',
      amount: 100
    })
    loadTransactions()
  }

  if (!user) {
    return (
      <div className="auth">
        <h1>👑 LuxWear Control Center</h1>
        <p>Luxury Redefined</p>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />

        <div className="row">
          <button onClick={login}>Entrar</button>
          <button onClick={signup}>Cadastrar</button>
        </div>
      </div>
    )
  }

  const saldo = transactions.reduce((acc, t) => {
    return acc + (t.type === 'entrada' ? Number(t.amount) : -Number(t.amount))
  }, 0)

  return (
    <div className={theme === 'dark' ? 'app dark' : 'app light'}>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>LuxWear</h2>

        <button onClick={() => setTab('dashboard')}>Dashboard</button>
        <button onClick={() => setTab('estoque')}>Estoque</button>
        <button onClick={() => setTab('financeiro')}>Financeiro</button>

        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Alternar Tema
        </button>

        <button onClick={logout}>Sair</button>
      </aside>

      {/* CONTENT */}
      <main className="content">

        {tab === 'dashboard' && (
          <div className="grid">
            <Card title="Produtos" value={products.length} />
            <Card title="Movimentações" value={transactions.length} />
            <Card title="Saldo" value={'R$ ' + saldo} />
          </div>
        )}

        {tab === 'estoque' && (
          <div className="panel">
            <h2>Estoque</h2>
            <button onClick={addProduct}>+ Produto</button>

            {products.map(p => (
              <div key={p.id} className="item">
                <span>{p.name} ({p.qty})</span>
                <button onClick={() => deleteProduct(p.id)}>Excluir</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'financeiro' && (
          <div className="panel">
            <h2>Financeiro</h2>
            <button onClick={addTransaction}>+ Entrada</button>

            {transactions.map(t => (
              <div key={t.id} className="item">
                {t.description} - R$ {t.amount}
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}

// =========================
// src/styles.css (dark/light minimal)
// =========================
/*
body { margin:0; font-family: sans-serif; }
.app { display:flex; min-height:100vh; }
.dark { background:#0a0a0a; color:#fff; }
.light { background:#f5f5f5; color:#000; }
.sidebar { width:220px; padding:20px; background:#111; }
.content { flex:1; padding:20px; }
.card { background:#1a1a1a; padding:20px; border-radius:12px; }
.panel { background:#111; padding:20px; border-radius:12px; }
.item { display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #333; }
.auth { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; }
input { margin:5px; padding:10px; }
button { margin:5px; padding:10px; cursor:pointer; }
*/
