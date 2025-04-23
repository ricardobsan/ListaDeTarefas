# ListaDeTarefas 

# Estrutura HTML
    Criei uma estrutura simples e semântica para facilitar a leitura e a manipulação via JavaScript.
    Cada tarefa é representada como um "card" individual, contendo título, descrição, status, data de entrega  e botões de ação.
    Subtarefas são adicionadas dinamicamente dentro de cada tarefa, com um estilo indentado.

# Estilo com CSS
    Usei border-left colorido para indicar visualmente o status da tarefa:
    Vermelho: atrasada
    Verde: concluída
    Laranja (padrão): pendente

# Lógica JavaScript
    Centralizei todos os dados em um array de objetos (tarefas).
    Utilizei o LocalStorage para guardar as informações adicionados nas listas.
    
    Criei funções para:
    Adicionar/remover tarefas e subtarefas
    Marcar como concluída ou pendente
    Detectar atraso comparando a data da entrega com a data atual
    Também incluí filtros dinâmicos por status e título, atualizando a lista em tempo real conforme o usuário digita.