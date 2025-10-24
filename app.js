// Copilot, crie um array de objetos chamado 'musicas'
const musicas = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        capaUrl: "https://example.com/covers/bohemian.jpg",
        duracao: "5:55"
    },
    {
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        capaUrl: "https://example.com/covers/shape.jpg",
        duracao: "3:53"
    },
    {
        titulo: "Blinding Lights",
        artista: "The Weeknd",
        capaUrl: "https://example.com/covers/blinding.jpg",
        duracao: "3:20"
    },
    {
        titulo: "Dance Monkey",
        artista: "Tones and I",
        capaUrl: "https://example.com/covers/dance.jpg",
        duracao: "3:29"
    },
    {
        titulo: "Bad Guy",
        artista: "Billie Eilish",
        capaUrl: "https://example.com/covers/badguy.jpg",
        duracao: "3:14"
    }
];

// Função para criar o HTML de cada música
function criarCardMusica(musica) {
    return `
        <div class="musica-card">
            <img src="${musica.capaUrl}" alt="Capa do álbum ${musica.titulo}" onerror="this.src='https://place-hold.it/300x300/1db954/ffffff&text=Music'">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
            <p class="duracao">${musica.duracao}</p>
        </div>
    `;
}

// Função para renderizar todas as músicas
function renderizarMusicas() {
    const container = document.getElementById('lista-de-musicas');
    const musicasHTML = musicas.map(criarCardMusica).join('');
    container.innerHTML = musicasHTML;
}

// Event listener para quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    renderizarMusicas();
});