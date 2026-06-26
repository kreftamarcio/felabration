import artist1 from "@assets/artist-1_1776867420642.png";
import artist2 from "@assets/artist-2_1776867420642.png";
import artist3 from "@assets/artist-3_1776867420642.png";
import artist4 from "@assets/artist-4_1776867420642.png";

export interface Artist {
  id: string;
  name: string;
  genre: string;
  img: string;
  bio: string;
  time: string;
  stage: string;
  day: string;
}

export const ARTISTS: Artist[] = [
  {
    id: "kolade",
    name: "Kolade Shrine",
    genre: "Afrobeat · Lagos",
    img: artist1,
    bio: "Lenda do afrobeat nigeriano, trazendo o fogo direto de Lagos para a Ilha da Magia. Com uma big band de 14 músicos e décadas de groove na veia, o show de Kolade Shrine é histórico, um momento para toda uma geração.",
    time: "21h",
    stage: "Palco Fela",
    day: "23",
  },
  {
    id: "aisha",
    name: "Aisha Luz",
    genre: "Afropop · Salvador",
    img: artist2,
    bio: "Voz poderosa que mistura afropop com MPB, representando a nova geração da diáspora africana no Brasil. Suas performances são explosivas, dança, poesia e resistência numa só presença.",
    time: "19h",
    stage: "Palco Shrine",
    day: "23",
  },
  {
    id: "batuke",
    name: "Batuke Coletivo",
    genre: "Percussão Eletrônica · Floripa",
    img: artist3,
    bio: "Percussão ancestral encontra beats eletrônicos. Uma viagem rítmica que conecta África e Brasil pelo ritmo. O Batuke Coletivo é a nossa voz local, raízes de Floripa, alma do continente.",
    time: "17h",
    stage: "Palco Raízes",
    day: "23",
  },
  {
    id: "nina",
    name: "Nina Samba-Rock",
    genre: "Samba-Rock · São Paulo",
    img: artist4,
    bio: "A rainha do samba-rock paulistano. Groove na veia, swing no corpo, alegria na alma. Nina transforma o palco numa pista de dança impossível de resistir.",
    time: "20h",
    stage: "Palco Fela",
    day: "24",
  },
  {
    id: "djshrine",
    name: "DJ Shrine",
    genre: "Afrobeat DJ Set · Rio",
    img: artist1,
    bio: "Saxofonista virtuoso que canaliza o espírito de Fela em cada nota antes de pegar os decks. O seu set é uma viagem de 3 horas pelo afrobeat clássico até o mais contemporâneo. Imperdível.",
    time: "23h",
    stage: "Palco Fela",
    day: "24",
  },
  {
    id: "ama",
    name: "Ama Highlife",
    genre: "Highlife · Accra / Floripa",
    img: artist2,
    bio: "Fusão de highlife ganês com brasilidade tropical. Uma explosão de cores sonoras que celebra a diáspora africana com elegância e alegria. Ama é a voz do encontro entre continentes.",
    time: "18h",
    stage: "Palco Shrine",
    day: "24",
  },
  {
    id: "felalives",
    name: "Fela Lives Band",
    genre: "Afrobeat · Lagos / SP",
    img: artist3,
    bio: "Fechamento épico. Afrobeat puro com 12 músicos no palco, saxofones, trompetes, percussão e fogo. A noite que ninguém vai esquecer. Em honra e memória eterna de Fela Anikulapo Kuti.",
    time: "21h",
    stage: "Palco Fela",
    day: "25",
  },
  {
    id: "maeprta",
    name: "Mãe Preta MC",
    genre: "Rap Afrobeat · Floripa",
    img: artist4,
    bio: "O rap encontra o afrobeat. Letras afiadas sobre batidas irresistíveis. Mãe Preta MC é a voz mais contundente da periferia catarinense, urgente, poética e devastadora.",
    time: "19h",
    stage: "Palco Shrine",
    day: "25",
  },
];
