const firebaseConfig = {
  apiKey: "AIzaSyDjP5gKJTKM6p6lfs45Rs9FR3jzlqHF884",
  authDomain: "projeto-univel.firebaseapp.com",
  projectId: "projeto-univel",
  storageBucket: "projeto-univel.firebasestorage.app",
  messagingSenderId: "292026206244",
  appId: "1:292026206244:web:3c3ba1b622c1263fd470b1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function salvarAgendamentoFirebase(agendamento) {
  db.collection("agendamentos").add({
    cliente: agendamento.cliente,
    telefone: agendamento.telefone,
    procedimento: agendamento.procedimento,
    valor: agendamento.valor,
    data: agendamento.data,
    horario: agendamento.horario,
    status: agendamento.status,
    criadoEm: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log("Agendamento salvo no Firebase!");
  })
  .catch((erro) => {
    console.error("Erro ao salvar no Firebase:", erro);
    alert("Erro ao salvar no Firebase.");
  });
}
function salvarClienteFirebase(cliente) {
  db.collection("clientes").add({
    nome: cliente.nome,
    telefone: cliente.telefone,
    nascimento: cliente.nascimento,
    tipo: "Cliente",
    criadoEm: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log("Cliente salvo no Firebase!");
  })
  .catch((erro) => {
    console.error("Erro ao salvar cliente:", erro);
    alert("Erro ao salvar cliente no Firebase.");
  });
}