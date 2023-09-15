import * as cs from './languages/cs.json';
import * as de from './languages/de.json';
import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as fr from './languages/fr.json';
import * as hu from './languages/hu.json';
import * as it from './languages/it.json';
import * as nl from './languages/nl.json';
import * as pl from './languages/pl.json';
import * as pt from './languages/pt.json';
import * as pt_BR from './languages/pt-BR.json';
import * as ro from './languages/ro.json';
import * as ru from './languages/ru.json';
import * as zh_Hans from './languages/zh-Hans.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = {
  cs: cs,
  de: de,
  en: en,
  es: es,
  fr: fr,
  hu: hu,
  it: it,
  nl: nl,
  pl: pl,
  pt: pt,
  pt_BR: pt_BR,
  ro: ro,
  ru: ru,
  zh_Hans: zh_Hans,
};

/**
 * Translating Strings to different languages.
 * @param string The Section-Key Pair
 * @param search String which should be replaced
 * @param replace String to replace with
 */
 export function localize(string: string, search = '', replace = ''): string {
  const section = string.split('.')[0];
  const key = string.split('.')[1];

  const lang = (localStorage.getItem('selectedLanguage') || navigator.language.split('-')[0] || 'en')
    .replace(/['"]+/g, '')
    .replace('-', '_');
  let translated: string;

  try {
    translated = languages[lang][section][key];
  } catch (e) {
    translated = languages['en'][section][key];
  }

  if (translated === undefined) translated = languages['en'][section][key];

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}