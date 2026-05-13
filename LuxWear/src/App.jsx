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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      loadProducts()
      loadTransactions()
    }
  }, [user])

  async function loadProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Erro ao carregar produtos:', error)
      return
    }

    setProducts(data || [])
  }

  async function loadTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Erro ao carregar transações:', error)
      return
    }

    setTransactions(data || [])
  }

  async function login() {
    if (!email || !password) {
      alert('Preencha email e senha.')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert('Erro ao entrar: ' + error.message)
    }
  }

  async function signup() {
    if (!email || !password) {
      alert('Preencha email e senha.')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert('Erro ao cadastrar: ' + error.message)
    } else {
      alert('Cadastro realizado! Verifique seu email se o Supabase pedir confirmação.')
    }
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  async function addProduct() {
    const { error } = await supabase.from('products').insert({
      name: 'Novo Produto',
      qty: 1,
      price: 10
    })

    if (error) {
      alert('Erro ao adicionar produto: ' + error.message)
      return
    }

    loadProducts()
  }

  async function deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Erro ao excluir produto: ' + error.message)
      return
    }

    loadProducts()
  }

  async function addTransaction() {
    const { error } = await supabase.from('transactions').insert({
      type: 'entrada',
      description: 'Venda',
      amount: 100
    })

    if (error) {
      alert('Erro ao adicionar entrada: ' + error.message)
      return
    }

    loadTransactions()
  }

  const saldo = transactions.reduce((acc, t) => {
    return acc + (t.type === 'entrada' ? Number(t.amount) : -Number(t.amount))
  }, 0)

  if (!user) {
    return (
      <div className="auth">
        <div className="auth-card">
          <h1>👑 LuxWear Control Center</h1>
          <p>Luxury Redefined</p>

          <input
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />

          <div className="row">
            <button onClick={login}>Entrar</button>
            <button onClick={signup}>Cadastrar</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={theme === 'dark' ? 'app dark' : 'app light'}>
      <aside className="sidebar">
        <h2>LuxWear</h2>

        <button onClick={() => setTab('dashboard')}>Dashboard</button>
        <button onClick={() => setTab('estoque')}>Estoque</button>
        <button onClick={() => setTab('financeiro')}>Financeiro</button>

        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Alternar Tema
        </button>

        <button className="logout" onClick={logout}>Sair</button>
      </aside>

      <main className="content">
        {tab === 'dashboard' && (
          <>
            <h1>Dashboard</h1>

            <div className="grid">
              <Card title="Produtos" value={products.length} />
              <Card title="Movimentações" value={transactions.length} />
              <Card title="Saldo" value={'R$ ' + saldo.toFixed(2)} />
            </div>
          </>
        )}

        {tab === 'estoque' && (
          <div className="panel">
            <div className="panel-header">
              <h2>Estoque</h2>
              <button onClick={addProduct}>+ Produto</button>
            </div>

            {products.length === 0 && (
              <p>Nenhum produto cadastrado.</p>
            )}

            {products.map(product => (
              <div key={product.id} className="item">
                <span>
                  {product.name} — Quantidade: {product.qty} — R$ {Number(product.price).toFixed(2)}
                </span>

                <button onClick={() => deleteProduct(product.id)}>
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'financeiro' && (
          <div className="panel">
            <div className="panel-header">
              <h2>Financeiro</h2>
              <button onClick={addTransaction}>+ Entrada</button>
            </div>

            {transactions.length === 0 && (
              <p>Nenhuma movimentação cadastrada.</p>
            )}

            {transactions.map(transaction => (
              <div key={transaction.id} className="item">
                <span>
                  {transaction.description} — {transaction.type} — R$ {Number(transaction.amount).toFixed(2)}
                </span>
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
