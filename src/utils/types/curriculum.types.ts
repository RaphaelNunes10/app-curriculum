interface Icone {
  d?: string | null;
  size?: number | null;
}

interface SVGText {
  text: string | string[] | null;
  fontSize: number;
}

interface Contato {
  icone: Icone;
  info: SVGText;
  listIndex?: number;
}

interface Experiencia {
  empresa?: SVGText;
  anoInicio?: number | null;
  anoFim?: number | null;
  posicao?: SVGText;
  info: SVGText | undefined;
  listIndex?: number;
}

interface Formacao {
  curso?: SVGText;
  anoInicio?: number | null;
  anoFim?: number | null;
  universidade?: SVGText;
  listIndex?: number;
}

type Nivel = "Básico" | "Médio" | "Avançado";

interface Idioma {
  lingua?: SVGText;
  nivel?: Nivel | null;
  listIndex?: number;
}

export interface Curriculum {
  id?: string;
  imagem?: string | null;
  nome: SVGText;
  sobrenome: SVGText;
  contato: Contato[];
  sobre: SVGText;
  experiencia: Experiencia[];
  formacao: Formacao[];
  habilidades?: SVGText[] | null;
  idiomas?: Idioma[] | null;
}
