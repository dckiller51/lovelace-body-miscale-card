import * as cs from './translations/cs.json';
import * as da from './translations/da.json';
import * as de from './translations/de.json';
import * as en from './translations/en.json';
import * as es from './translations/es.json';
import * as ca from './translations/ca.json';
import * as fr from './translations/fr.json';
import * as hu from './translations/hu.json';
import * as it from './translations/it.json';
import * as ja from './translations/ja.json';
import * as nl from './translations/nl.json';
import * as pl from './translations/pl.json';
import * as pt from './translations/pt.json';
import * as pt_BR from './translations/pt-BR.json';
import * as ro from './translations/ro.json';
import * as ru from './translations/ru.json';
import * as uk from './translations/uk.json';
import * as vi from './translations/vi.json';
import * as zh_Hans from './translations/zh-Hans.json';
import * as zh_Hant from './translations/zh-Hant.json';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const languages: Record<string, Translations> = {
  cs: cs,
  da: da,
  de: de,
  en: en,
  es: es,
  ca: ca,
  fr: fr,
  hu: hu,
  it: it,
  ja: ja,
  nl: nl,
  pl: pl,
  pt: pt,
  pt_BR: pt_BR,
  ro: ro,
  ru: ru,
  uk: uk,
  vi: vi,
  zh_Hans: zh_Hans,
  zh_Hant: zh_Hant,
};

const DEFAULT_LANG = 'en';

export default function localize(
  str: string,
  search?: string,
  replace?: string,
): string | undefined {
  const [section, key] = str.toLowerCase().split('.');

  let langStored: string | null = null;

  try {
    langStored = JSON.parse(localStorage.getItem('selectedLanguage') ?? '""');
  } catch (e) {
    console.warn(e);
    langStored = localStorage.getItem('selectedLanguage');
  }

  const lang = (langStored || navigator.language.split('-')[0] || DEFAULT_LANG)
    .replace(/['"]+/g, '')
    .replace('-', '_');

  let translated: string | undefined;

  try {
    translated = languages[lang][section][key];
  } catch (e) {
    console.warn(e);
    translated = languages[DEFAULT_LANG][section][key];
  }

  if (translated === undefined) {
    translated = languages[DEFAULT_LANG][section][key];
  }

  if (translated === undefined) {
    return;
  }

  if (search && replace) {
    translated = translated?.replace(search, replace);
  }

  return translated;
}
