// Copilot, o que é um "array de objetos" e por que é útil para armazenar dados estruturados?
// Resposta: Um array de objetos é uma estrutura de dados que combina:
// 1. Array: lista ordenada de itens acessíveis por índice
// 2. Objetos: conjuntos de pares chave-valor que representam entidades
// É útil porque:
// - Permite armazenar dados complexos de forma organizada
// - Facilita a iteração e manipulação dos dados
// - Mantém dados relacionados agrupados
// - Simula registros de banco de dados

const musicas = [
    {
        id: 1,
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        album: "A Night at the Opera",
        capaUrl: "https://picsum.photos/300/300?random=1",
        duracao: "5:55",
        anoLancamento: 1975
    },
    {
        id: 2,
        titulo: "Billie Jean",
        artista: "Michael Jackson",
        album: "Thriller",
        capaUrl: "https://picsum.photos/300/300?random=2",
        duracao: "4:54",
        anoLancamento: 1983
    },
    {
        id: 3,
        titulo: "Sweet Child O' Mine",
        artista: "Guns N' Roses",
        album: "Appetite for Destruction",
        capaUrl: "https://picsum.photos/300/300?random=3",
        duracao: "5:56",
        anoLancamento: 1987
    },
    {
        id: 4,
        titulo: "Smells Like Teen Spirit",
        artista: "Nirvana",
        album: "Nevermind",
        capaUrl: "https://picsum.photos/300/300?random=4",
        duracao: "5:01",
        anoLancamento: 1991
    },
    {
        id: 5,
        titulo: "Stairway to Heaven",
        artista: "Led Zeppelin",
        album: "Led Zeppelin IV",
        capaUrl: "https://picsum.photos/300/300?random=5",
        duracao: "8:02",
        anoLancamento: 1971
    },
    {
        id: 6,
        titulo: "Hotel California",
        artista: "Eagles",
        album: "Hotel California",
        capaUrl: "https://picsum.photos/300/300?random=6",
        duracao: "6:30",
        anoLancamento: 1977
    },
    {
        id: 7,
        titulo: "Like a Rolling Stone",
        artista: "Bob Dylan",
        album: "Highway 61 Revisited",
        capaUrl: "https://picsum.photos/300/300?random=7",
        duracao: "6:13",
        anoLancamento: 1965
    },
    {
        id: 8,
        titulo: "Purple Rain",
        artista: "Prince",
        album: "Purple Rain",
        capaUrl: "https://picsum.photos/300/300?random=8",
        duracao: "8:41",
        anoLancamento: 1984
    }
];

// Copilot, qual a diferença entre innerHTML, textContent e appendChild? Quando usar cada um?
// Resposta: 
// - innerHTML: Manipula conteúdo HTML como string. Bom para inserir muito conteúdo HTML de uma vez, 
//   mas pode ter riscos de segurança se não sanitizado
// - textContent: Manipula apenas texto puro, mais seguro e performático para textos simples
// - appendChild: Adiciona um elemento DOM como filho. Melhor para adicionar elementos um por um
//   e manter eventos existentes

// Copilot, o que é o DOM (Document Object Model) e como o JavaScript interage com ele?
// Resposta: 
// O DOM é uma representação em árvore do documento HTML onde:
// - Cada elemento HTML vira um objeto (nó)
// - Podemos acessar e modificar elementos usando JavaScript
// - Mudanças no DOM atualizam a página dinamicamente
// JavaScript interage através de métodos como:
// - querySelector() para encontrar elementos
// - addEventListener() para responder a eventos
// - createElement() para criar novos elementos

// Copilot, por que precisamos esperar o DOMContentLoaded antes de manipular elementos?
// Resposta:
// DOMContentLoaded garante que:
// - O HTML foi completamente carregado e parseado
// - A estrutura DOM está pronta para manipulação
// - Evita erros de elementos não encontrados
// - Não espera por imagens e outros recursos externos
// Sem ele, poderíamos tentar acessar elementos que ainda não existem

let musicaAtual = null;

function criarCardMusica(musica) {
    return `
        <div class="musica-card" data-id="${musica.id}">
            <img src="${musica.capaUrl}" alt="Capa do álbum ${musica.album}" 
                onerror="this.src='https://place-hold.it/300x300/1db954/ffffff&text=Music'">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
            <p class="album">${musica.album} (${musica.anoLancamento})</p>
            <p class="duracao">${musica.duracao}</p>
        </div>
    `;
}

function atualizarContador() {
    const contador = document.getElementById('contador-musicas');
    contador.textContent = `${musicas.length} músicas na biblioteca`;
}

function atualizarPlayerInfo(musica) {
    const currentTrack = document.querySelector('.current-track');
    const currentArtist = document.querySelector('.current-artist');
    const miniCapa = document.querySelector('.mini-capa');
    
    currentTrack.textContent = musica.titulo;
    currentArtist.textContent = `${musica.artista} • ${musica.album}`;
    miniCapa.src = musica.capaUrl;
    
    musicaAtual = musica;
}

function renderizarMusicas() {
    const container = document.getElementById('lista-de-musicas');
    const musicasHTML = musicas.map(criarCardMusica).join('');
    container.innerHTML = musicasHTML;
    
    // Adiciona event listeners para os cards
    container.querySelectorAll('.musica-card').forEach(card => {
        card.addEventListener('click', () => {
            const musicaId = parseInt(card.dataset.id);
            const musica = musicas.find(m => m.id === musicaId);
            atualizarPlayerInfo(musica);
        });
    });
    
    atualizarContador();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderizarMusicas();
    
    // Play/Pause
    document.querySelector('.play-btn').addEventListener('click', function() {
        this.textContent = this.textContent === '▶' ? '⏸' : '▶';
    });
    
    // Volume
    const volumeBar = document.querySelector('.volume-bar');
    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        document.querySelector('.volume-progress').style.width = `${percent}%`;
    });
    
    // Progress bar
    const progressBar = document.querySelector('.progress-bar');
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        document.querySelector('.progress').style.width = `${percent}%`;
    });
});