interface Icone {
  d?: string | null;
  size?: number | null;
}

interface Contato {
  icone: Icone;
  info: string;
  listIndex?: number;
}

interface Experiencia {
  empresa?: string | null;
  anoInicio?: number | null;
  anoFim?: number | null;
  posicao?: string | null;
  info: (string | null | undefined)[];
  listIndex?: number;
}

interface Formacao {
  curso?: string | null;
  anoInicio?: number | null;
  anoFim?: number | null;
  universidade?: string | null;
  listIndex?: number;
}

type Nivel = "Básico" | "Médio" | "Avançado";

interface Idioma {
  lingua?: string | null;
  nivel?: Nivel | null;
  listIndex?: number;
}

export interface Curriculum {
  id?: number;
  imagem?: string | null;
  nome: string;
  sobrenome: string;
  contato: Contato[];
  sobre: (string | null | undefined)[];
  experiencia: Experiencia[];
  formacao: Formacao[];
  habilidades?: string[] | null;
  idiomas?: Idioma[] | null;
}
