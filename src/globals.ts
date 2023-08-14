export interface Surahs {
  name?: Name;
  number?: number;
  numberOfVerses?: number;
  revelation?: Revelation;
  sequence?: number;
  tafsir?: object;
  verses: Array<Verses>;
}

export interface Bookmark {
  data: Surahs;
  number: number;
  index?: string;
}

interface Name {
  short?: string;
  translation: Translation;
  transliteration: Transliteration;
}

interface Transliteration {
  en: string;
  id: string;
}

interface Translation extends Transliteration {}

interface Revelation extends Transliteration {
  arab: string;
}

interface Verses {
  audio: {
    primary: string;
    secondary: Array<string>;
  };
  text: {
    arab: string;
    transliteration: {
      en: String;
    };
  };
  translation: Translation;
}
