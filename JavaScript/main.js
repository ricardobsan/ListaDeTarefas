let tarefas = [];

window.onload = function () {
  const tarefasSalvas = localStorage.getItem('tarefas');
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
    atualizarLista();
  }
}

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function atualizarLista() {
  const lista = document.getElementById('listaTarefas');
  lista.innerHTML = '';

  const filtroStatus = document.getElementById('filtroStatus').value;
  const filtroTitulo = document.getElementById('filtroTitulo').value.toLowerCase();

  let pendentes = 0, concluidas = 0;

  tarefas.forEach((tarefa, index) => {
    if (
      (filtroStatus === 'pendente' && tarefa.status !== 'Pendente') ||
      (filtroStatus === 'concluida' && tarefa.status !== 'Concluída') ||
      !tarefa.titulo.toLowerCase().includes(filtroTitulo)
    ) return;

    const div = document.createElement('div');
    div.className = 'tarefa';
    if (tarefa.status === 'Concluída') div.classList.add('concluida');
    if (tarefa.dataEntrega && new Date(tarefa.dataEntrega) < new Date() && tarefa.status !== 'Concluída') {
      div.classList.add('atrasada');
    }

    const subtarefasHTML = tarefa.subtarefas.map((s, si) => `
      <div class="subtarefa">
        <span class="${s.concluida ? 'concluida' : ''}">
          <input type="checkbox" ${s.concluida ? 'checked' : ''} onclick="alternarSubtarefa(${index}, ${si})"> ${s.titulo}
        </span>
        <button onclick="alternarSubtarefa(${index}, ${si})">${s.concluida ? 'Desfazer' : 'Concluir'}</button>
        <button onclick="removerSubtarefa(${index}, ${si})">Remover</button>
      </div>
    `).join('');

    div.innerHTML = `
      <strong>${tarefa.titulo}</strong><br>
      <small>${tarefa.descricao}</small><br>
      <small>Status: ${tarefa.status}</small><br>
      <small>Entrega: ${tarefa.dataEntrega || 'Sem data'}</small><br>
      <button onclick="alternarTarefa(${index})">${tarefa.status === 'Concluída' ? 'Desfazer' : 'Concluir'}</button>
      <button onclick="removerTarefa(${index})">Remover</button>
      <button onclick="adicionarSubtarefa(${index})">Subtarefa</button>
      <div>${subtarefasHTML}</div>
    `;
    lista.appendChild(div);

    if (tarefa.status === 'Pendente') pendentes++;
    else concluidas++;
  });

  document.getElementById('contadorPendentes').textContent = `Pendentes: ${pendentes}`;
  document.getElementById('contadorConcluidas').textContent = `Concluídas: ${concluidas}`;
}

function adicionarTarefa() {
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const dataEntrega = document.getElementById('dataEntrega').value;
  if (!titulo) return alert("Título é obrigatório");

  tarefas.push({ titulo, descricao, dataEntrega, status: 'Pendente', subtarefas: [] });
  document.getElementById('titulo').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('dataEntrega').value = '';

  salvarTarefas();
  atualizarLista();
}

function alternarTarefa(index) {
  tarefas[index].status = tarefas[index].status === 'Concluída' ? 'Pendente' : 'Concluída';
  salvarTarefas();
  atualizarLista();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefas();
  atualizarLista();
}

function adicionarSubtarefa(index) {
  const titulo = prompt("Nome da subtarefa:");
  if (titulo) {
    tarefas[index].subtarefas.push({ titulo, concluida: false });
    salvarTarefas();
    atualizarLista();
  }
}

function alternarSubtarefa(index, si) {
  tarefas[index].subtarefas[si].concluida = !tarefas[index].subtarefas[si].concluida;
  salvarTarefas();
  atualizarLista();
}

function removerSubtarefa(index, si) {
  tarefas[index].subtarefas.splice(si, 1);
  salvarTarefas();
  atualizarLista();
}

document.getElementById('filtroTitulo').addEventListener('input', atualizarLista);
document.getElementById('filtroStatus').addEventListener('change', atualizarLista);
