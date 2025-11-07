// Referências aos elementos do player
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.querySelector('.progress');
const currentTitleEl = document.getElementById('current-title');
const currentArtistEl = document.getElementById('current-artist');
const timeCurrentEl = document.querySelector('.time-current');
const timeTotalEl = document.querySelector('.time-total');

// Função para formatar o tempo (segundos para MM:SS)
function formatarTempo(segundos) {
    if (isNaN(segundos) || segundos === Infinity) {
        return "--:--";
    }
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);
    const segundosFormatados = String(segundosRestantes).padStart(2, '0');
    return `${minutos}:${segundosFormatados}`;
}

// Array de músicas com URLs de áudio
const musicas = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        capaUrl: "https://place-hold.it/300x300/e91e63/ffffff&text=Queen",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duracao: "5:55"
    },
    {
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        capaUrl: "https://place-hold.it/300x300/03a9f4/ffffff&text=Ed+Sheeran",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duracao: "3:53"
    },
    {
        titulo: "Blinding Lights",
        artista: "The Weeknd",
        capaUrl: "https://place-hold.it/300x300/ff9800/ffffff&text=The+Weeknd",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duracao: "3:20"
    },
    {
        titulo: "Dance Monkey",
        artista: "Tones and I",
        capaUrl: "https://place-hold.it/300x300/4caf50/ffffff&text=Tones",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duracao: "3:29"
    },
    {
        titulo: "Bad Guy",
        artista: "Billie Eilish",
        capaUrl: "https://place-hold.it/300x300/9c27b0/ffffff&text=Billie",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duracao: "3:14"
    }
];

// Função para criar o HTML de cada música
function criarCardMusica(musica, index) {
    return `
        <div class="musica-card" data-id="${index}">
            <img src="${musica.capaUrl}" alt="Capa do álbum ${musica.titulo}" onerror="this.src='https://place-hold.it/300x300/1db954/ffffff&text=Music'">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
            <p class="duracao">${musica.duracao}</p>
        </div>
    `;
}

// Estado global do player
let musicaAtualId = null;
let estaTocando = false;

// Função para atualizar informações do player
function atualizarInfoPlayer(musicaId) {
    if (musicaId !== null && musicas[musicaId]) {
        const musica = musicas[musicaId];
        currentTitleEl.textContent = musica.titulo;
        currentArtistEl.textContent = musica.artista;
    } else {
        currentTitleEl.textContent = 'Nenhuma Música Selecionada';
        currentArtistEl.textContent = 'Artista';
    }
}

// Função para ir para a próxima música
function proximaMusica() {
    if (musicaAtualId !== null) {
        const proximoId = (musicaAtualId + 1) % musicas.length;
        alternarReproducao(proximoId);
    }
}

// Função para ir para a música anterior
function musicaAnterior() {
    if (musicaAtualId !== null) {
        const anteriorId = musicaAtualId - 1 < 0 ? musicas.length - 1 : musicaAtualId - 1;
        alternarReproducao(anteriorId);
    }
}

// Função para alternar reprodução
function alternarReproducao(idParaTocar) {
    const playBtn = document.querySelector('.play-btn');
    const musicaNova = (idParaTocar !== undefined && idParaTocar !== musicaAtualId);

    if (musicaNova) {
        // Nova música: Carrega e inicia do zero
        musicaAtualId = idParaTocar;
        const url = musicas[musicaAtualId].audioUrl;
        
        audioPlayer.src = url;
        audioPlayer.load(); // Garante o carregamento do novo áudio
        estaTocando = true; // Sempre inicia tocando ao selecionar nova
        atualizarInfoPlayer(musicaAtualId);
    } else {
        // Alternar Play/Pause da música atual
        estaTocando = !estaTocando;
    }

    // Controle do Áudio
    if (estaTocando) {
        audioPlayer.play();
        playBtn.textContent = '⏸';
        playBtn.setAttribute('aria-label', 'Pausar Música');
    } else {
        audioPlayer.pause();
        playBtn.textContent = '▶';
        playBtn.setAttribute('aria-label', 'Tocar Música');
    }
    
    // Atualiza Destaque Visual
    atualizarCardAtivo(document.querySelector('.musica-card[data-id="' + musicaAtualId + '"]'));
}

// Função para adicionar funcionalidade ao player
function adicionarFuncionalidadePlayer() {
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBarContainer = document.querySelector('.progress-bar');

    // Listener para o botão Play/Pause
    playBtn.addEventListener('click', () => {
        const idParaAlternar = (musicaAtualId !== null) ? musicaAtualId : 0;
        alternarReproducao(idParaAlternar);
    });

    // Listeners para navegação
    prevBtn.addEventListener('click', musicaAnterior);
    nextBtn.addEventListener('click', proximaMusica);

    // Listener para atualização do progresso
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            // Atualiza a barra de progresso
            const progressoPercentual = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = progressoPercentual + '%';
            
            // Atualiza os indicadores de tempo
            timeCurrentEl.textContent = formatarTempo(audioPlayer.currentTime);
            timeTotalEl.textContent = formatarTempo(audioPlayer.duration);
        }
    });

    // Listener para quando os metadados do áudio são carregados
    audioPlayer.addEventListener('loadedmetadata', () => {
        timeTotalEl.textContent = formatarTempo(audioPlayer.duration);
    });

    // Listener para clique na barra de progresso
    progressBarContainer.addEventListener('click', (e) => {
        if (musicaAtualId !== null) {
            const larguraBarra = e.currentTarget.clientWidth;
            const posicaoClique = e.offsetX;
            const tempoParaIr = (posicaoClique / larguraBarra) * audioPlayer.duration;
            audioPlayer.currentTime = tempoParaIr;
        }
    });

    // Listener para quando a música terminar
    audioPlayer.addEventListener('ended', proximaMusica);
}

// Função para atualizar o visual dos cards
function atualizarCardAtivo(cardClicado) {
    // Remove a classe .tocando de todos os cards
    document.querySelectorAll('.musica-card').forEach(card => {
        card.classList.remove('tocando');
    });
    
    // Adiciona a classe .tocando ao card clicado
    if (cardClicado) {
        cardClicado.classList.add('tocando');
    }
}

// Função para renderizar todas as músicas
function renderizarMusicas() {
    const container = document.getElementById('lista-de-musicas');
    const musicasHTML = musicas.map((musica, index) => criarCardMusica(musica, index)).join('');
    container.innerHTML = musicasHTML;

    // Adiciona os event listeners aos cards
    document.querySelectorAll('.musica-card').forEach(card => {
        card.addEventListener('click', () => {
            const musicaId = parseInt(card.dataset.id);
            atualizarCardAtivo(card);
            alternarReproducao(musicaId);
        });
    });
}

// Função para atualizar a barra de progresso
function atualizarProgresso() {
    const progressBar = document.querySelector('.progress');
    if (audioPlayer.duration) {
        const porcentagem = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${porcentagem}%`;
    }
}

// Event listener para quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    renderizarMusicas();
    adicionarFuncionalidadePlayer();

    // Adiciona listener para atualização do progresso
    audioPlayer.addEventListener('timeupdate', atualizarProgresso);

    // Adiciona listener para clique na barra de progresso
    const progressBarContainer = document.querySelector('.progress-bar');
    progressBarContainer.addEventListener('click', (e) => {
        const clickPosition = e.offsetX / progressBarContainer.offsetWidth;
        if (audioPlayer.duration) {
            audioPlayer.currentTime = clickPosition * audioPlayer.duration;
            atualizarProgresso();
        }
    });
});