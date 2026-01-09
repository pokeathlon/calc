import * as I from './interface';
import {toID, extend, DeepPartial, assignWithout} from '../util';

export interface SpeciesData {
  readonly types: [I.TypeName] | [I.TypeName, I.TypeName];
  // TODO: replace with baseStats
  readonly bs: {
    hp: number;
    at: number;
    df: number;
    sa?: number;
    sd?: number;
    sp: number;
    sl?: number;
  };
  readonly weightkg: number; // weight
  readonly nfe?: boolean;
  readonly gender?: I.GenderName;
  readonly otherFormes?: string[];
  readonly baseSpecies?: string;
  readonly abilities?: {0: string}; // ability
  readonly origin?: string;
}

const RBY: {[name: string]: SpeciesData} = {
  Abra: {
    types: ['Psychic'],
    bs: {hp: 25, at: 20, df: 15, sp: 90, sl: 105},
    weightkg: 19.5,
    nfe: true,
  },
  Aerodactyl: {
    types: ['Rock', 'Flying'],
    bs: {hp: 80, at: 105, df: 65, sp: 130, sl: 60},
    weightkg: 59,
  },
  Alakazam: {
    types: ['Psychic'],
    bs: {hp: 55, at: 50, df: 45, sp: 120, sl: 135},
    weightkg: 48,
  },
  Arbok: {types: ['Poison'], bs: {hp: 60, at: 85, df: 69, sp: 80, sl: 65}, weightkg: 65},
  Arcanine: {
    types: ['Fire'],
    bs: {hp: 90, at: 110, df: 80, sp: 95, sl: 80},
    weightkg: 155,
  },
  Articuno: {
    types: ['Ice', 'Flying'],
    bs: {hp: 90, at: 85, df: 100, sp: 85, sl: 125},
    weightkg: 55.4,
  },
  Beedrill: {
    types: ['Bug', 'Poison'],
    bs: {hp: 65, at: 80, df: 40, sp: 75, sl: 45},
    weightkg: 29.5,
  },
  Bellsprout: {
    types: ['Grass', 'Poison'],
    bs: {hp: 50, at: 75, df: 35, sp: 40, sl: 70},
    weightkg: 4,
    nfe: true,
  },
  Blastoise: {
    types: ['Water'],
    bs: {hp: 79, at: 83, df: 100, sp: 78, sl: 85},
    weightkg: 85.5,
  },
  Bulbasaur: {
    types: ['Grass', 'Poison'],
    bs: {hp: 45, at: 49, df: 49, sp: 45, sl: 65},
    weightkg: 6.9,
    nfe: true,
  },
  Butterfree: {
    types: ['Bug', 'Flying'],
    bs: {hp: 60, at: 45, df: 50, sp: 70, sl: 80},
    weightkg: 32,
  },
  Caterpie: {
    types: ['Bug'],
    bs: {hp: 45, at: 30, df: 35, sp: 45, sl: 20},
    weightkg: 2.9,
    nfe: true,
  },
  Chansey: {
    types: ['Normal'],
    bs: {hp: 250, at: 5, df: 5, sp: 50, sl: 105},
    weightkg: 34.6,
  },
  Charizard: {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 84, df: 78, sp: 100, sl: 85},
    weightkg: 90.5,
  },
  Charmander: {
    types: ['Fire'],
    bs: {hp: 39, at: 52, df: 43, sp: 65, sl: 50},
    weightkg: 8.5,
    nfe: true,
  },
  Charmeleon: {
    types: ['Fire'],
    bs: {hp: 58, at: 64, df: 58, sp: 80, sl: 65},
    weightkg: 19,
    nfe: true,
  },
  Clefable: {types: ['Normal'], bs: {hp: 95, at: 70, df: 73, sp: 60, sl: 85}, weightkg: 40},
  Clefairy: {
    types: ['Normal'],
    bs: {hp: 70, at: 45, df: 48, sp: 35, sl: 60},
    weightkg: 7.5,
    nfe: true,
  },
  Cloyster: {
    types: ['Water', 'Ice'],
    bs: {hp: 50, at: 95, df: 180, sp: 70, sl: 85},
    weightkg: 132.5,
  },
  Cubone: {
    types: ['Ground'],
    bs: {hp: 50, at: 50, df: 95, sp: 35, sl: 40},
    weightkg: 6.5,
    nfe: true,
  },
  Dewgong: {
    types: ['Water', 'Ice'],
    bs: {hp: 90, at: 70, df: 80, sp: 70, sl: 95},
    weightkg: 120,
  },
  Diglett: {
    types: ['Ground'],
    bs: {hp: 10, at: 55, df: 25, sp: 95, sl: 45},
    weightkg: 0.8,
    nfe: true,
  },
  Ditto: {types: ['Normal'], bs: {hp: 48, at: 48, df: 48, sp: 48, sl: 48}, weightkg: 4},
  Dodrio: {
    types: ['Normal', 'Flying'],
    bs: {hp: 60, at: 110, df: 70, sp: 100, sl: 60},
    weightkg: 85.2,
  },
  Doduo: {
    types: ['Normal', 'Flying'],
    bs: {hp: 35, at: 85, df: 45, sp: 75, sl: 35},
    weightkg: 39.2,
    nfe: true,
  },
  Dragonair: {
    types: ['Dragon'],
    bs: {hp: 61, at: 84, df: 65, sp: 70, sl: 70},
    weightkg: 16.5,
    nfe: true,
  },
  Dragonite: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 91, at: 134, df: 95, sp: 80, sl: 100},
    weightkg: 210,
  },
  Dratini: {
    types: ['Dragon'],
    bs: {hp: 41, at: 64, df: 45, sp: 50, sl: 50},
    weightkg: 3.3,
    nfe: true,
  },
  Drowzee: {
    types: ['Psychic'],
    bs: {hp: 60, at: 48, df: 45, sp: 42, sl: 90},
    weightkg: 32.4,
    nfe: true,
  },
  Dugtrio: {
    types: ['Ground'],
    bs: {hp: 35, at: 80, df: 50, sp: 120, sl: 70},
    weightkg: 33.3,
  },
  Eevee: {
    types: ['Normal'],
    bs: {hp: 55, at: 55, df: 50, sp: 55, sl: 65},
    weightkg: 6.5,
    nfe: true,
  },
  Ekans: {
    types: ['Poison'],
    bs: {hp: 35, at: 60, df: 44, sp: 55, sl: 40},
    weightkg: 6.9,
    nfe: true,
  },
  Electabuzz: {
    types: ['Electric'],
    bs: {hp: 65, at: 83, df: 57, sp: 105, sl: 85},
    weightkg: 30,
  },
  Electrode: {
    types: ['Electric'],
    bs: {hp: 60, at: 50, df: 70, sp: 140, sl: 80},
    weightkg: 66.6,
  },
  Exeggcute: {
    types: ['Grass', 'Psychic'],
    bs: {hp: 60, at: 40, df: 80, sp: 40, sl: 60},
    weightkg: 2.5,
    nfe: true,
  },
  Exeggutor: {
    types: ['Grass', 'Psychic'],
    bs: {hp: 95, at: 95, df: 85, sp: 55, sl: 125},
    weightkg: 120,
  },
  'Farfetch\u2019d': {
    types: ['Normal', 'Flying'],
    bs: {hp: 52, at: 65, df: 55, sp: 60, sl: 58},
    weightkg: 15,
  },
  Fearow: {
    types: ['Normal', 'Flying'],
    bs: {hp: 65, at: 90, df: 65, sp: 100, sl: 61},
    weightkg: 38,
  },
  Flareon: {types: ['Fire'], bs: {hp: 65, at: 130, df: 60, sp: 65, sl: 110}, weightkg: 25},
  Gastly: {
    types: ['Ghost', 'Poison'],
    bs: {hp: 30, at: 35, df: 30, sp: 80, sl: 100},
    weightkg: 0.1,
    nfe: true,
  },
  Gengar: {
    types: ['Ghost', 'Poison'],
    bs: {hp: 60, at: 65, df: 60, sp: 110, sl: 130},
    weightkg: 40.5,
  },
  Geodude: {
    types: ['Rock', 'Ground'],
    bs: {hp: 40, at: 80, df: 100, sp: 20, sl: 30},
    weightkg: 20,
    nfe: true,
  },
  Gloom: {
    types: ['Grass', 'Poison'],
    bs: {hp: 60, at: 65, df: 70, sp: 40, sl: 85},
    weightkg: 8.6,
    nfe: true,
  },
  Golbat: {
    types: ['Poison', 'Flying'],
    bs: {hp: 75, at: 80, df: 70, sp: 90, sl: 75},
    weightkg: 55,
  },
  Goldeen: {
    types: ['Water'],
    bs: {hp: 45, at: 67, df: 60, sp: 63, sl: 50},
    weightkg: 15,
    nfe: true,
  },
  Golduck: {types: ['Water'], bs: {hp: 80, at: 82, df: 78, sp: 85, sl: 80}, weightkg: 76.6},
  Golem: {
    types: ['Rock', 'Ground'],
    bs: {hp: 80, at: 110, df: 130, sp: 45, sl: 55},
    weightkg: 300,
  },
  Graveler: {
    types: ['Rock', 'Ground'],
    bs: {hp: 55, at: 95, df: 115, sp: 35, sl: 45},
    weightkg: 105,
    nfe: true,
  },
  Grimer: {
    types: ['Poison'],
    bs: {hp: 80, at: 80, df: 50, sp: 25, sl: 40},
    weightkg: 30,
    nfe: true,
  },
  Growlithe: {
    types: ['Fire'],
    bs: {hp: 55, at: 70, df: 45, sp: 60, sl: 50},
    weightkg: 19,
    nfe: true,
  },
  Gyarados: {
    types: ['Water', 'Flying'],
    bs: {hp: 95, at: 125, df: 79, sp: 81, sl: 100},
    weightkg: 235,
  },
  Haunter: {
    types: ['Ghost', 'Poison'],
    bs: {hp: 45, at: 50, df: 45, sp: 95, sl: 115},
    weightkg: 0.1,
    nfe: true,
  },
  Hitmonchan: {
    types: ['Fighting'],
    bs: {hp: 50, at: 105, df: 79, sp: 76, sl: 35},
    weightkg: 50.2,
  },
  Hitmonlee: {
    types: ['Fighting'],
    bs: {hp: 50, at: 120, df: 53, sp: 87, sl: 35},
    weightkg: 49.8,
  },
  Horsea: {
    types: ['Water'],
    bs: {hp: 30, at: 40, df: 70, sp: 60, sl: 70},
    weightkg: 8,
    nfe: true,
  },
  Hypno: {
    types: ['Psychic'],
    bs: {hp: 85, at: 73, df: 70, sp: 67, sl: 115},
    weightkg: 75.6,
  },
  Ivysaur: {
    types: ['Grass', 'Poison'],
    bs: {hp: 60, at: 62, df: 63, sp: 60, sl: 80},
    weightkg: 13,
    nfe: true,
  },
  Jigglypuff: {
    types: ['Normal'],
    bs: {hp: 115, at: 45, df: 20, sp: 20, sl: 25},
    weightkg: 5.5,
    nfe: true,
  },
  Jolteon: {
    types: ['Electric'],
    bs: {hp: 65, at: 65, df: 60, sp: 130, sl: 110},
    weightkg: 24.5,
  },
  Jynx: {
    types: ['Ice', 'Psychic'],
    bs: {hp: 65, at: 50, df: 35, sp: 95, sl: 95},
    weightkg: 40.6,
  },
  Kabuto: {
    types: ['Rock', 'Water'],
    bs: {hp: 30, at: 80, df: 90, sp: 55, sl: 45},
    weightkg: 11.5,
    nfe: true,
  },
  Kabutops: {
    types: ['Rock', 'Water'],
    bs: {hp: 60, at: 115, df: 105, sp: 80, sl: 70},
    weightkg: 40.5,
  },
  Kadabra: {
    types: ['Psychic'],
    bs: {hp: 40, at: 35, df: 30, sp: 105, sl: 120},
    weightkg: 56.5,
    nfe: true,
  },
  Kakuna: {
    types: ['Bug', 'Poison'],
    bs: {hp: 45, at: 25, df: 50, sp: 35, sl: 25},
    weightkg: 10,
    nfe: true,
  },
  Kangaskhan: {
    types: ['Normal'],
    bs: {hp: 105, at: 95, df: 80, sp: 90, sl: 40},
    weightkg: 80,
  },
  Kingler: {types: ['Water'], bs: {hp: 55, at: 130, df: 115, sp: 75, sl: 50}, weightkg: 60},
  Koffing: {
    types: ['Poison'],
    bs: {hp: 40, at: 65, df: 95, sp: 35, sl: 60},
    weightkg: 1,
    nfe: true,
  },
  Krabby: {
    types: ['Water'],
    bs: {hp: 30, at: 105, df: 90, sp: 50, sl: 25},
    weightkg: 6.5,
    nfe: true,
  },
  Lapras: {
    types: ['Water', 'Ice'],
    bs: {hp: 130, at: 85, df: 80, sp: 60, sl: 95},
    weightkg: 220,
  },
  Lickitung: {
    types: ['Normal'],
    bs: {hp: 90, at: 55, df: 75, sp: 30, sl: 60},
    weightkg: 65.5,
  },
  Machamp: {
    types: ['Fighting'],
    bs: {hp: 90, at: 130, df: 80, sp: 55, sl: 65},
    weightkg: 130,
  },
  Machoke: {
    types: ['Fighting'],
    bs: {hp: 80, at: 100, df: 70, sp: 45, sl: 50},
    weightkg: 70.5,
    nfe: true,
  },
  Machop: {
    types: ['Fighting'],
    bs: {hp: 70, at: 80, df: 50, sp: 35, sl: 35},
    weightkg: 19.5,
    nfe: true,
  },
  Magikarp: {
    types: ['Water'],
    bs: {hp: 20, at: 10, df: 55, sp: 80, sl: 20},
    weightkg: 10,
    nfe: true,
  },
  Magmar: {
    types: ['Fire'],
    bs: {hp: 65, at: 95, df: 57, sp: 93, sl: 85},
    weightkg: 44.5,
  },
  Magnemite: {
    types: ['Electric'],
    bs: {hp: 25, at: 35, df: 70, sp: 45, sl: 95},
    weightkg: 6,
    nfe: true,
  },
  Magneton: {
    types: ['Electric'],
    bs: {hp: 50, at: 60, df: 95, sp: 70, sl: 120},
    weightkg: 60,
  },
  Mankey: {
    types: ['Fighting'],
    bs: {hp: 40, at: 80, df: 35, sp: 70, sl: 35},
    weightkg: 28,
    nfe: true,
  },
  Marowak: {types: ['Ground'], bs: {hp: 60, at: 80, df: 110, sp: 45, sl: 50}, weightkg: 45},
  Meowth: {
    types: ['Normal'],
    bs: {hp: 40, at: 45, df: 35, sp: 90, sl: 40},
    weightkg: 4.2,
    nfe: true,
  },
  Metapod: {
    types: ['Bug'],
    bs: {hp: 50, at: 20, df: 55, sp: 30, sl: 25},
    weightkg: 9.9,
    nfe: true,
  },
  Mew: {
    types: ['Psychic'],
    bs: {hp: 100, at: 100, df: 100, sp: 100, sl: 100},
    weightkg: 4,
  },
  Mewtwo: {
    types: ['Psychic'],
    bs: {hp: 106, at: 110, df: 90, sp: 130, sl: 154},
    weightkg: 122,
  },
  Moltres: {
    types: ['Fire', 'Flying'],
    bs: {hp: 90, at: 100, df: 90, sp: 90, sl: 125},
    weightkg: 60,
  },
  'Mr. Mime': {
    types: ['Psychic'],
    bs: {hp: 40, at: 45, df: 65, sp: 90, sl: 100},
    weightkg: 54.5,
  },
  Muk: {types: ['Poison'], bs: {hp: 105, at: 105, df: 75, sp: 50, sl: 65}, weightkg: 30},
  Nidoking: {
    types: ['Poison', 'Ground'],
    bs: {hp: 81, at: 92, df: 77, sp: 85, sl: 75},
    weightkg: 62,
  },
  Nidoqueen: {
    types: ['Poison', 'Ground'],
    bs: {hp: 90, at: 82, df: 87, sp: 76, sl: 75},
    weightkg: 60,
  },
  'Nidoran-F': {
    types: ['Poison'],
    bs: {hp: 55, at: 47, df: 52, sp: 41, sl: 40},
    weightkg: 7,
    nfe: true,
  },
  'Nidoran-M': {
    types: ['Poison'],
    bs: {hp: 46, at: 57, df: 40, sp: 50, sl: 40},
    weightkg: 9,
    nfe: true,
  },
  Nidorina: {
    types: ['Poison'],
    bs: {hp: 70, at: 62, df: 67, sp: 56, sl: 55},
    weightkg: 20,
    nfe: true,
  },
  Nidorino: {
    types: ['Poison'],
    bs: {hp: 61, at: 72, df: 57, sp: 65, sl: 55},
    weightkg: 19.5,
    nfe: true,
  },
  Ninetales: {
    types: ['Fire'],
    bs: {hp: 73, at: 76, df: 75, sp: 100, sl: 100},
    weightkg: 19.9,
  },
  Oddish: {
    types: ['Grass', 'Poison'],
    bs: {hp: 45, at: 50, df: 55, sp: 30, sl: 75},
    weightkg: 5.4,
    nfe: true,
  },
  Omanyte: {
    types: ['Rock', 'Water'],
    bs: {hp: 35, at: 40, df: 100, sp: 35, sl: 90},
    weightkg: 7.5,
    nfe: true,
  },
  Omastar: {
    types: ['Rock', 'Water'],
    bs: {hp: 70, at: 60, df: 125, sp: 55, sl: 115},
    weightkg: 35,
  },
  Onix: {
    types: ['Rock', 'Ground'],
    bs: {hp: 35, at: 45, df: 160, sp: 70, sl: 30},
    weightkg: 210,
  },
  Paras: {
    types: ['Bug', 'Grass'],
    bs: {hp: 35, at: 70, df: 55, sp: 25, sl: 55},
    weightkg: 5.4,
    nfe: true,
  },
  Parasect: {
    types: ['Bug', 'Grass'],
    bs: {hp: 60, at: 95, df: 80, sp: 30, sl: 80},
    weightkg: 29.5,
  },
  Persian: {types: ['Normal'], bs: {hp: 65, at: 70, df: 60, sp: 115, sl: 65}, weightkg: 32},
  Pidgeot: {
    types: ['Normal', 'Flying'],
    bs: {hp: 83, at: 80, df: 75, sp: 91, sl: 70},
    weightkg: 39.5,
  },
  Pidgeotto: {
    types: ['Normal', 'Flying'],
    bs: {hp: 63, at: 60, df: 55, sp: 71, sl: 50},
    weightkg: 30,
    nfe: true,
  },
  Pidgey: {
    types: ['Normal', 'Flying'],
    bs: {hp: 40, at: 45, df: 40, sp: 56, sl: 35},
    weightkg: 1.8,
    nfe: true,
  },
  Pikachu: {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 30, sp: 90, sl: 50},
    weightkg: 6,
    nfe: true,
  },
  Pinsir: {types: ['Bug'], bs: {hp: 65, at: 125, df: 100, sp: 85, sl: 55}, weightkg: 55},
  Poliwag: {
    types: ['Water'],
    bs: {hp: 40, at: 50, df: 40, sp: 90, sl: 40},
    weightkg: 12.4,
    nfe: true,
  },
  Poliwhirl: {
    types: ['Water'],
    bs: {hp: 65, at: 65, df: 65, sp: 90, sl: 50},
    weightkg: 20,
    nfe: true,
  },
  Poliwrath: {
    types: ['Water', 'Fighting'],
    bs: {hp: 90, at: 85, df: 95, sp: 70, sl: 70},
    weightkg: 54,
  },
  Ponyta: {
    types: ['Fire'],
    bs: {hp: 50, at: 85, df: 55, sp: 90, sl: 65},
    weightkg: 30,
    nfe: true,
  },
  Porygon: {
    types: ['Normal'],
    bs: {hp: 65, at: 60, df: 70, sp: 40, sl: 75},
    weightkg: 36.5,
  },
  Primeape: {
    types: ['Fighting'],
    bs: {hp: 65, at: 105, df: 60, sp: 95, sl: 60},
    weightkg: 32,
  },
  Psyduck: {
    types: ['Water'],
    bs: {hp: 50, at: 52, df: 48, sp: 55, sl: 50},
    weightkg: 19.6,
    nfe: true,
  },
  Raichu: {
    types: ['Electric'],
    bs: {hp: 60, at: 90, df: 55, sp: 100, sl: 90},
    weightkg: 30,
  },
  Rapidash: {types: ['Fire'], bs: {hp: 65, at: 100, df: 70, sp: 105, sl: 80}, weightkg: 95},
  Raticate: {
    types: ['Normal'],
    bs: {hp: 55, at: 81, df: 60, sp: 97, sl: 50},
    weightkg: 18.5,
  },
  Rattata: {
    types: ['Normal'],
    bs: {hp: 30, at: 56, df: 35, sp: 72, sl: 25},
    weightkg: 3.5,
    nfe: true,
  },
  Rhydon: {
    types: ['Ground', 'Rock'],
    bs: {hp: 105, at: 130, df: 120, sp: 40, sl: 45},
    weightkg: 120,
  },
  Rhyhorn: {
    types: ['Ground', 'Rock'],
    bs: {hp: 80, at: 85, df: 95, sp: 25, sl: 30},
    weightkg: 115,
    nfe: true,
  },
  Sandshrew: {
    types: ['Ground'],
    bs: {hp: 50, at: 75, df: 85, sp: 40, sl: 30},
    weightkg: 12,
    nfe: true,
  },
  Sandslash: {
    types: ['Ground'],
    bs: {hp: 75, at: 100, df: 110, sp: 65, sl: 55},
    weightkg: 29.5,
  },
  Scyther: {
    types: ['Bug', 'Flying'],
    bs: {hp: 70, at: 110, df: 80, sp: 105, sl: 55},
    weightkg: 56,
  },
  Seadra: {types: ['Water'], bs: {hp: 55, at: 65, df: 95, sp: 85, sl: 95}, weightkg: 25},
  Seaking: {types: ['Water'], bs: {hp: 80, at: 92, df: 65, sp: 68, sl: 80}, weightkg: 39},
  Seel: {
    types: ['Water'],
    bs: {hp: 65, at: 45, df: 55, sp: 45, sl: 70},
    weightkg: 90,
    nfe: true,
  },
  Shellder: {
    types: ['Water'],
    bs: {hp: 30, at: 65, df: 100, sp: 40, sl: 45},
    weightkg: 4,
    nfe: true,
  },
  Slowbro: {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 110, sp: 30, sl: 80},
    weightkg: 78.5,
  },
  Slowpoke: {
    types: ['Water', 'Psychic'],
    bs: {hp: 90, at: 65, df: 65, sp: 15, sl: 40},
    weightkg: 36,
    nfe: true,
  },
  Snorlax: {
    types: ['Normal'],
    bs: {hp: 160, at: 110, df: 65, sp: 30, sl: 65},
    weightkg: 460,
  },
  Spearow: {
    types: ['Normal', 'Flying'],
    bs: {hp: 40, at: 60, df: 30, sp: 70, sl: 31},
    weightkg: 2,
    nfe: true,
  },
  Squirtle: {
    types: ['Water'],
    bs: {hp: 44, at: 48, df: 65, sp: 43, sl: 50},
    weightkg: 9,
    nfe: true,
  },
  Starmie: {
    types: ['Water', 'Psychic'],
    bs: {hp: 60, at: 75, df: 85, sp: 115, sl: 100},
    weightkg: 80,
    nfe: true,
  },
  Staryu: {
    types: ['Water'],
    bs: {hp: 30, at: 45, df: 55, sp: 85, sl: 70},
    weightkg: 34.5,
    nfe: true,
  },
  Tangela: {
    types: ['Grass'],
    bs: {hp: 65, at: 55, df: 115, sp: 60, sl: 100},
    weightkg: 35,
  },
  Tauros: {
    types: ['Normal'],
    bs: {hp: 75, at: 100, df: 95, sp: 110, sl: 70},
    weightkg: 88.4,
  },
  Tentacool: {
    types: ['Water', 'Poison'],
    bs: {hp: 40, at: 40, df: 35, sp: 70, sl: 100},
    weightkg: 45.5,
    nfe: true,
  },
  Tentacruel: {
    types: ['Water', 'Poison'],
    bs: {hp: 80, at: 70, df: 65, sp: 100, sl: 120},
    weightkg: 55,
  },
  Vaporeon: {
    types: ['Water'],
    bs: {hp: 130, at: 65, df: 60, sp: 65, sl: 110},
    weightkg: 29,
  },
  Venomoth: {
    types: ['Bug', 'Poison'],
    bs: {hp: 70, at: 65, df: 60, sp: 90, sl: 90},
    weightkg: 12.5,
  },
  Venonat: {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 55, df: 50, sp: 45, sl: 40},
    weightkg: 30,
    nfe: true,
  },
  Venusaur: {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 82, df: 83, sp: 80, sl: 100},
    weightkg: 100,
  },
  Victreebel: {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 105, df: 65, sp: 70, sl: 100},
    weightkg: 15.5,
  },
  Vileplume: {
    types: ['Grass', 'Poison'],
    bs: {hp: 75, at: 80, df: 85, sp: 50, sl: 100},
    weightkg: 18.6,
  },
  Voltorb: {
    types: ['Electric'],
    bs: {hp: 40, at: 30, df: 50, sp: 100, sl: 55},
    weightkg: 10.4,
    nfe: true,
  },
  Vulpix: {
    types: ['Fire'],
    bs: {hp: 38, at: 41, df: 40, sp: 65, sl: 65},
    weightkg: 9.9,
    nfe: true,
  },
  Wartortle: {
    types: ['Water'],
    bs: {hp: 59, at: 63, df: 80, sp: 58, sl: 65},
    weightkg: 22.5,
    nfe: true,
  },
  Weedle: {
    types: ['Bug', 'Poison'],
    bs: {hp: 40, at: 35, df: 30, sp: 50, sl: 20},
    weightkg: 3.2,
    nfe: true,
  },
  Weepinbell: {
    types: ['Grass', 'Poison'],
    bs: {hp: 65, at: 90, df: 50, sp: 55, sl: 85},
    weightkg: 6.4,
    nfe: true,
  },
  Weezing: {
    types: ['Poison'],
    bs: {hp: 65, at: 90, df: 120, sp: 60, sl: 85},
    weightkg: 9.5,
  },
  Wigglytuff: {
    types: ['Normal'],
    bs: {hp: 140, at: 70, df: 45, sp: 45, sl: 50},
    weightkg: 12,
  },
  Zapdos: {
    types: ['Electric', 'Flying'],
    bs: {hp: 90, at: 90, df: 85, sp: 100, sl: 125},
    weightkg: 52.6,
  },
  Zubat: {
    types: ['Poison', 'Flying'],
    bs: {hp: 40, at: 45, df: 35, sp: 55, sl: 40},
    weightkg: 7.5,
    nfe: true,
  },
};

const GSC_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Abra: {bs: {sa: 105, sd: 55}},
  Aerodactyl: {bs: {sa: 60, sd: 75}},
  Alakazam: {bs: {sa: 135, sd: 85}},
  Arbok: {bs: {sa: 65, sd: 79}},
  Arcanine: {bs: {sa: 100, sd: 80}},
  Articuno: {bs: {sa: 95, sd: 125}, gender: 'N'},
  Beedrill: {bs: {sa: 45, sd: 80}},
  Bellsprout: {bs: {sa: 70, sd: 30}},
  Blastoise: {bs: {sa: 85, sd: 105}},
  Bulbasaur: {bs: {sa: 65, sd: 65}},
  Butterfree: {bs: {sa: 80, sd: 80}},
  Caterpie: {bs: {sa: 20, sd: 20}},
  Chansey: {bs: {sa: 35, sd: 105}, nfe: true},
  Charizard: {bs: {sa: 109, sd: 85}},
  Charmander: {bs: {sa: 60, sd: 50}},
  Charmeleon: {bs: {sa: 80, sd: 65}},
  Clefable: {bs: {sa: 85, sd: 90}},
  Clefairy: {bs: {sa: 60, sd: 65}},
  Cloyster: {bs: {sa: 85, sd: 45}},
  Cubone: {bs: {sa: 40, sd: 50}},
  Dewgong: {bs: {sa: 70, sd: 95}},
  Diglett: {bs: {sa: 35, sd: 45}},
  Ditto: {bs: {sa: 48, sd: 48}, gender: 'N'},
  Dodrio: {bs: {sa: 60, sd: 60}},
  Doduo: {bs: {sa: 35, sd: 35}},
  Dragonair: {bs: {sa: 70, sd: 70}},
  Dragonite: {bs: {sa: 100, sd: 100}},
  Dratini: {bs: {sa: 50, sd: 50}},
  Drowzee: {bs: {sa: 43, sd: 90}},
  Dugtrio: {bs: {sa: 50, sd: 70}},
  Eevee: {bs: {sa: 45, sd: 65}},
  Ekans: {bs: {sa: 40, sd: 54}},
  Electabuzz: {bs: {sa: 95, sd: 85}},
  Electrode: {bs: {sa: 80, sd: 80}, gender: 'N'},
  Exeggcute: {bs: {sa: 60, sd: 45}},
  Exeggutor: {bs: {sa: 125, sd: 65}},
  'Farfetch\u2019d': {bs: {sa: 58, sd: 62}},
  Fearow: {bs: {sa: 61, sd: 61}},
  Flareon: {bs: {sa: 95, sd: 110}},
  Gastly: {bs: {sa: 100, sd: 35}},
  Gengar: {bs: {sa: 130, sd: 75}},
  Geodude: {bs: {sa: 30, sd: 30}},
  Gloom: {bs: {sa: 85, sd: 75}},
  Golbat: {bs: {sa: 65, sd: 75}, nfe: true},
  Goldeen: {bs: {sa: 35, sd: 50}},
  Golduck: {bs: {sa: 95, sd: 80}},
  Golem: {bs: {sa: 55, sd: 65}},
  Graveler: {bs: {sa: 45, sd: 45}},
  Grimer: {bs: {sa: 40, sd: 50}},
  Growlithe: {bs: {sa: 70, sd: 50}},
  Gyarados: {bs: {sa: 60, sd: 100}},
  Haunter: {bs: {sa: 115, sd: 55}},
  Hitmonchan: {bs: {sa: 35, sd: 110}},
  Hitmonlee: {bs: {sa: 35, sd: 110}},
  Horsea: {bs: {sa: 70, sd: 25}},
  Hypno: {bs: {sa: 73, sd: 115}},
  Ivysaur: {bs: {sa: 80, sd: 80}},
  Jigglypuff: {bs: {sa: 45, sd: 25}},
  Jolteon: {bs: {sa: 110, sd: 95}},
  Jynx: {bs: {sa: 115, sd: 95}},
  Kabuto: {bs: {sa: 55, sd: 45}},
  Kabutops: {bs: {sa: 65, sd: 70}},
  Kadabra: {bs: {sa: 120, sd: 70}},
  Kakuna: {bs: {sa: 25, sd: 25}},
  Kangaskhan: {bs: {sa: 40, sd: 80}},
  Kingler: {bs: {sa: 50, sd: 50}},
  Koffing: {bs: {sa: 60, sd: 45}},
  Krabby: {bs: {sa: 25, sd: 25}},
  Lapras: {bs: {sa: 85, sd: 95}},
  Lickitung: {bs: {sa: 60, sd: 75}},
  Machamp: {bs: {sa: 65, sd: 85}},
  Machoke: {bs: {sa: 50, sd: 60}},
  Machop: {bs: {sa: 35, sd: 35}},
  Magikarp: {bs: {sa: 15, sd: 20}},
  Magmar: {bs: {sa: 100, sd: 85}},
  Magnemite: {types: ['Electric', 'Steel'], bs: {sa: 95, sd: 55}, gender: 'N'},
  Magneton: {types: ['Electric', 'Steel'], bs: {sa: 120, sd: 70}, gender: 'N'},
  Mankey: {bs: {sa: 35, sd: 45}},
  Marowak: {bs: {sa: 50, sd: 80}},
  Meowth: {bs: {sa: 40, sd: 40}},
  Metapod: {bs: {sa: 25, sd: 25}},
  Mew: {bs: {sa: 100, sd: 100}, gender: 'N'},
  Mewtwo: {bs: {sa: 154, sd: 90}, gender: 'N'},
  Moltres: {bs: {sa: 125, sd: 85}, gender: 'N'},
  'Mr. Mime': {bs: {sa: 100, sd: 120}},
  Muk: {bs: {sa: 65, sd: 100}},
  Nidoking: {bs: {sa: 85, sd: 75}},
  Nidoqueen: {bs: {sa: 75, sd: 85}},
  'Nidoran-F': {bs: {sa: 40, sd: 40}},
  'Nidoran-M': {bs: {sa: 40, sd: 40}},
  Nidorina: {bs: {sa: 55, sd: 55}},
  Nidorino: {bs: {sa: 55, sd: 55}},
  Ninetales: {bs: {sa: 81, sd: 100}},
  Oddish: {bs: {sa: 75, sd: 65}},
  Omanyte: {bs: {sa: 90, sd: 55}},
  Omastar: {bs: {sa: 115, sd: 70}},
  Onix: {bs: {sa: 30, sd: 45}, nfe: true},
  Paras: {bs: {sa: 45, sd: 55}},
  Parasect: {bs: {sa: 60, sd: 80}},
  Persian: {bs: {sa: 65, sd: 65}},
  Pidgeot: {bs: {sa: 70, sd: 70}},
  Pidgeotto: {bs: {sa: 50, sd: 50}},
  Pidgey: {bs: {sa: 35, sd: 35}},
  Pikachu: {bs: {sa: 50, sd: 40}},
  Pinsir: {bs: {sa: 55, sd: 70}},
  Poliwag: {bs: {sa: 40, sd: 40}},
  Poliwhirl: {bs: {sa: 50, sd: 50}},
  Poliwrath: {bs: {sa: 70, sd: 90}},
  Ponyta: {bs: {sa: 65, sd: 65}},
  Porygon: {bs: {sa: 85, sd: 75}, nfe: true, gender: 'N'},
  Primeape: {bs: {sa: 60, sd: 70}},
  Psyduck: {bs: {sa: 65, sd: 50}},
  Raichu: {bs: {sa: 90, sd: 80}},
  Rapidash: {bs: {sa: 80, sd: 80}},
  Raticate: {bs: {sa: 50, sd: 70}},
  Rattata: {bs: {sa: 25, sd: 35}},
  Rhydon: {bs: {sa: 45, sd: 45}},
  Rhyhorn: {bs: {sa: 30, sd: 30}},
  Sandshrew: {bs: {sa: 20, sd: 30}},
  Sandslash: {bs: {sa: 45, sd: 55}},
  Scyther: {bs: {sa: 55, sd: 80}, nfe: true},
  Seadra: {bs: {sa: 95, sd: 45}, nfe: true},
  Seaking: {bs: {sa: 65, sd: 80}},
  Seel: {bs: {sa: 45, sd: 70}},
  Shellder: {bs: {sa: 45, sd: 25}},
  Slowbro: {bs: {sa: 100, sd: 80}},
  Slowpoke: {bs: {sa: 40, sd: 40}},
  Snorlax: {bs: {sa: 65, sd: 110}},
  Spearow: {bs: {sa: 31, sd: 31}},
  Squirtle: {bs: {sa: 50, sd: 64}},
  Starmie: {bs: {sa: 100, sd: 85}, gender: 'N'},
  Staryu: {bs: {sa: 70, sd: 55}, gender: 'N'},
  Tangela: {bs: {sa: 100, sd: 40}},
  Tauros: {bs: {sa: 40, sd: 70}},
  Tentacool: {bs: {sa: 50, sd: 100}},
  Tentacruel: {bs: {sa: 80, sd: 120}},
  Vaporeon: {bs: {sa: 110, sd: 95}},
  Venomoth: {bs: {sa: 90, sd: 75}},
  Venonat: {bs: {sa: 40, sd: 55}},
  Venusaur: {bs: {sa: 100, sd: 100}},
  Victreebel: {bs: {sa: 100, sd: 60}},
  Vileplume: {bs: {sa: 100, sd: 90}},
  Voltorb: {bs: {sa: 55, sd: 55}, gender: 'N'},
  Vulpix: {bs: {sa: 50, sd: 65}},
  Wartortle: {bs: {sa: 65, sd: 80}},
  Weedle: {bs: {sa: 20, sd: 20}},
  Weepinbell: {bs: {sa: 85, sd: 45}},
  Weezing: {bs: {sa: 85, sd: 70}},
  Wigglytuff: {bs: {sa: 75, sd: 50}},
  Zapdos: {bs: {sa: 125, sd: 90}, gender: 'N'},
  Zubat: {bs: {sa: 30, sd: 40}},
  // gen 2 pokemon
  Aipom: {types: ['Normal'], bs: {hp: 55, at: 70, df: 55, sa: 40, sd: 55, sp: 85}, weightkg: 11.5},
  Ampharos: {
    types: ['Electric'],
    bs: {hp: 90, at: 75, df: 75, sa: 115, sd: 90, sp: 55},
    weightkg: 61.5,
  },
  Ariados: {
    types: ['Bug', 'Poison'],
    bs: {hp: 70, at: 90, df: 70, sa: 60, sd: 60, sp: 40},
    weightkg: 33.5,
  },
  Azumarill: {
    types: ['Water'],
    bs: {hp: 100, at: 50, df: 80, sa: 50, sd: 80, sp: 50},
    weightkg: 28.5,
  },
  Bayleef: {
    types: ['Grass'],
    bs: {hp: 60, at: 62, df: 80, sa: 63, sd: 80, sp: 60},
    weightkg: 15.8,
    nfe: true,
  },
  Bellossom: {
    types: ['Grass'],
    bs: {hp: 75, at: 80, df: 85, sa: 90, sd: 100, sp: 50},
    weightkg: 5.8,
  },
  Blissey: {
    types: ['Normal'],
    bs: {hp: 255, at: 10, df: 10, sa: 75, sd: 135, sp: 55},
    weightkg: 46.8,
  },
  Celebi: {
    types: ['Psychic', 'Grass'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 5,
    gender: 'N',
  },
  Chikorita: {
    types: ['Grass'],
    bs: {hp: 45, at: 49, df: 65, sa: 49, sd: 65, sp: 45},
    weightkg: 6.4,
    nfe: true,
  },
  Chinchou: {
    types: ['Water', 'Electric'],
    bs: {hp: 75, at: 38, df: 38, sa: 56, sd: 56, sp: 67},
    weightkg: 12,
    nfe: true,
  },
  Cleffa: {
    types: ['Normal'],
    bs: {hp: 50, at: 25, df: 28, sa: 45, sd: 55, sp: 15},
    weightkg: 3,
    nfe: true,
  },
  Corsola: {
    types: ['Water', 'Rock'],
    bs: {hp: 55, at: 55, df: 85, sa: 65, sd: 85, sp: 35},
    weightkg: 5,
  },
  Crobat: {
    types: ['Poison', 'Flying'],
    bs: {hp: 85, at: 90, df: 80, sa: 70, sd: 80, sp: 130},
    weightkg: 75,
  },
  Croconaw: {
    types: ['Water'],
    bs: {hp: 65, at: 80, df: 80, sa: 59, sd: 63, sp: 58},
    weightkg: 25,
    nfe: true,
  },
  Cyndaquil: {
    types: ['Fire'],
    bs: {hp: 39, at: 52, df: 43, sa: 60, sd: 50, sp: 65},
    weightkg: 7.9,
    nfe: true,
  },
  Delibird: {
    types: ['Ice', 'Flying'],
    bs: {hp: 45, at: 55, df: 45, sa: 65, sd: 45, sp: 75},
    weightkg: 16,
  },
  Donphan: {
    types: ['Ground'],
    bs: {hp: 90, at: 120, df: 120, sa: 60, sd: 60, sp: 50},
    weightkg: 120,
  },
  Dunsparce: {
    types: ['Normal'],
    bs: {hp: 100, at: 70, df: 70, sa: 65, sd: 65, sp: 45},
    weightkg: 14,
  },
  Elekid: {
    types: ['Electric'],
    bs: {hp: 45, at: 63, df: 37, sa: 65, sd: 55, sp: 95},
    weightkg: 23.5,
    nfe: true,
  },
  Entei: {
    types: ['Fire'],
    bs: {hp: 115, at: 115, df: 85, sa: 90, sd: 75, sp: 100},
    weightkg: 198,
    gender: 'N',
  },
  Espeon: {
    types: ['Psychic'],
    bs: {hp: 65, at: 65, df: 60, sa: 130, sd: 95, sp: 110},
    weightkg: 26.5,
  },
  Feraligatr: {
    types: ['Water'],
    bs: {hp: 85, at: 105, df: 100, sa: 79, sd: 83, sp: 78},
    weightkg: 88.8,
  },
  Flaaffy: {
    types: ['Electric'],
    bs: {hp: 70, at: 55, df: 55, sa: 80, sd: 60, sp: 45},
    weightkg: 13.3,
    nfe: true,
  },
  Forretress: {
    types: ['Bug', 'Steel'],
    bs: {hp: 75, at: 90, df: 140, sa: 60, sd: 60, sp: 40},
    weightkg: 125.8,
  },
  Furret: {types: ['Normal'], bs: {hp: 85, at: 76, df: 64, sa: 45, sd: 55, sp: 90}, weightkg: 32.5},
  Girafarig: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 70, at: 80, df: 65, sa: 90, sd: 65, sp: 85},
    weightkg: 41.5,
  },
  Gligar: {
    types: ['Ground', 'Flying'],
    bs: {hp: 65, at: 75, df: 105, sa: 35, sd: 65, sp: 85},
    weightkg: 64.8,
  },
  Granbull: {
    types: ['Normal'],
    bs: {hp: 90, at: 120, df: 75, sa: 60, sd: 60, sp: 45},
    weightkg: 48.7,
  },
  Heracross: {
    types: ['Bug', 'Fighting'],
    bs: {hp: 80, at: 125, df: 75, sa: 40, sd: 95, sp: 85},
    weightkg: 54,
  },
  Hitmontop: {
    types: ['Fighting'],
    bs: {hp: 50, at: 95, df: 95, sa: 35, sd: 110, sp: 70},
    weightkg: 48,
  },
  'Ho-Oh': {
    types: ['Fire', 'Flying'],
    bs: {hp: 106, at: 130, df: 90, sa: 110, sd: 154, sp: 90},
    weightkg: 199,
    gender: 'N',
  },
  Hoothoot: {
    types: ['Normal', 'Flying'],
    bs: {hp: 60, at: 30, df: 30, sa: 36, sd: 56, sp: 50},
    weightkg: 21.2,
    nfe: true,
  },
  Hoppip: {
    types: ['Grass', 'Flying'],
    bs: {hp: 35, at: 35, df: 40, sa: 35, sd: 55, sp: 50},
    weightkg: 0.5,
    nfe: true,
  },
  Houndoom: {
    types: ['Dark', 'Fire'],
    bs: {hp: 75, at: 90, df: 50, sa: 110, sd: 80, sp: 95},
    weightkg: 35,
  },
  Houndour: {
    types: ['Dark', 'Fire'],
    bs: {hp: 45, at: 60, df: 30, sa: 80, sd: 50, sp: 65},
    weightkg: 10.8,
    nfe: true,
  },
  Igglybuff: {
    types: ['Normal'],
    bs: {hp: 90, at: 30, df: 15, sa: 40, sd: 20, sp: 15},
    weightkg: 1,
    nfe: true,
  },
  Jumpluff: {
    types: ['Grass', 'Flying'],
    bs: {hp: 75, at: 55, df: 70, sa: 55, sd: 85, sp: 110},
    weightkg: 3,
  },
  Kingdra: {
    types: ['Water', 'Dragon'],
    bs: {hp: 75, at: 95, df: 95, sa: 95, sd: 95, sp: 85},
    weightkg: 152,
  },
  Lanturn: {
    types: ['Water', 'Electric'],
    bs: {hp: 125, at: 58, df: 58, sa: 76, sd: 76, sp: 67},
    weightkg: 22.5,
  },
  Larvitar: {
    types: ['Rock', 'Ground'],
    bs: {hp: 50, at: 64, df: 50, sa: 45, sd: 50, sp: 41},
    weightkg: 72,
    nfe: true,
  },
  Ledian: {
    types: ['Bug', 'Flying'],
    bs: {hp: 55, at: 35, df: 50, sa: 55, sd: 110, sp: 85},
    weightkg: 35.6,
  },
  Ledyba: {
    types: ['Bug', 'Flying'],
    bs: {hp: 40, at: 20, df: 30, sa: 40, sd: 80, sp: 55},
    weightkg: 10.8,
    nfe: true,
  },
  Lugia: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 106, at: 90, df: 130, sa: 90, sd: 154, sp: 110},
    weightkg: 216,
    gender: 'N',
  },
  Magby: {
    types: ['Fire'],
    bs: {hp: 45, at: 75, df: 37, sa: 70, sd: 55, sp: 83},
    weightkg: 21.4,
    nfe: true,
  },
  Magcargo: {
    types: ['Fire', 'Rock'],
    bs: {hp: 50, at: 50, df: 120, sa: 80, sd: 80, sp: 30},
    weightkg: 55,
  },
  Mantine: {
    types: ['Water', 'Flying'],
    bs: {hp: 65, at: 40, df: 70, sa: 80, sd: 140, sp: 70},
    weightkg: 220,
  },
  Mareep: {
    types: ['Electric'],
    bs: {hp: 55, at: 40, df: 40, sa: 65, sd: 45, sp: 35},
    weightkg: 7.8,
    nfe: true,
  },
  Marill: {
    types: ['Water'],
    bs: {hp: 70, at: 20, df: 50, sa: 20, sd: 50, sp: 40},
    weightkg: 8.5,
    nfe: true,
  },
  Meganium: {
    types: ['Grass'],
    bs: {hp: 80, at: 82, df: 100, sa: 83, sd: 100, sp: 80},
    weightkg: 100.5,
  },
  Miltank: {
    types: ['Normal'],
    bs: {hp: 95, at: 80, df: 105, sa: 40, sd: 70, sp: 100},
    weightkg: 75.5,
  },
  Misdreavus: {
    types: ['Ghost'],
    bs: {hp: 60, at: 60, df: 60, sa: 85, sd: 85, sp: 85},
    weightkg: 1,
  },
  Murkrow: {
    types: ['Dark', 'Flying'],
    bs: {hp: 60, at: 85, df: 42, sa: 85, sd: 42, sp: 91},
    weightkg: 2.1,
  },
  Natu: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 40, at: 50, df: 45, sa: 70, sd: 45, sp: 70},
    weightkg: 2,
    nfe: true,
  },
  Noctowl: {
    types: ['Normal', 'Flying'],
    bs: {hp: 100, at: 50, df: 50, sa: 76, sd: 96, sp: 70},
    weightkg: 40.8,
  },
  Octillery: {
    types: ['Water'],
    bs: {hp: 75, at: 105, df: 75, sa: 105, sd: 75, sp: 45},
    weightkg: 28.5,
  },
  Phanpy: {
    types: ['Ground'],
    bs: {hp: 90, at: 60, df: 60, sa: 40, sd: 40, sp: 40},
    weightkg: 33.5,
    nfe: true,
  },
  Pichu: {
    types: ['Electric'],
    bs: {hp: 20, at: 40, df: 15, sa: 35, sd: 35, sp: 60},
    weightkg: 2,
    nfe: true,
  },
  Piloswine: {
    types: ['Ice', 'Ground'],
    bs: {hp: 100, at: 100, df: 80, sa: 60, sd: 60, sp: 50},
    weightkg: 55.8,
  },
  Pineco: {
    types: ['Bug'],
    bs: {hp: 50, at: 65, df: 90, sa: 35, sd: 35, sp: 15},
    weightkg: 7.2,
    nfe: true,
  },
  Politoed: {
    types: ['Water'],
    bs: {hp: 90, at: 75, df: 75, sa: 90, sd: 100, sp: 70},
    weightkg: 33.9,
  },
  Porygon2: {
    types: ['Normal'],
    bs: {hp: 85, at: 80, df: 90, sa: 105, sd: 95, sp: 60},
    weightkg: 32.5,
    gender: 'N',
  },
  Pupitar: {
    types: ['Rock', 'Ground'],
    bs: {hp: 70, at: 84, df: 70, sa: 65, sd: 70, sp: 51},
    weightkg: 152,
    nfe: true,
  },
  Quagsire: {
    types: ['Water', 'Ground'],
    bs: {hp: 95, at: 85, df: 85, sa: 65, sd: 65, sp: 35},
    weightkg: 75,
  },
  Quilava: {
    types: ['Fire'],
    bs: {hp: 58, at: 64, df: 58, sa: 80, sd: 65, sp: 80},
    weightkg: 19,
    nfe: true,
  },
  Qwilfish: {
    types: ['Water', 'Poison'],
    bs: {hp: 65, at: 95, df: 75, sa: 55, sd: 55, sp: 85},
    weightkg: 3.9,
  },
  Raikou: {
    types: ['Electric'],
    bs: {hp: 90, at: 85, df: 75, sa: 115, sd: 100, sp: 115},
    weightkg: 178,
    gender: 'N',
  },
  Remoraid: {
    types: ['Water'],
    bs: {hp: 35, at: 65, df: 35, sa: 65, sd: 35, sp: 65},
    weightkg: 12,
    nfe: true,
  },
  Scizor: {
    types: ['Bug', 'Steel'],
    bs: {hp: 70, at: 130, df: 100, sa: 55, sd: 80, sp: 65},
    weightkg: 118,
  },
  Sentret: {
    types: ['Normal'],
    bs: {hp: 35, at: 46, df: 34, sa: 35, sd: 45, sp: 20},
    weightkg: 6,
    nfe: true,
  },
  Shuckle: {
    types: ['Bug', 'Rock'],
    bs: {hp: 20, at: 10, df: 230, sa: 10, sd: 230, sp: 5},
    weightkg: 20.5,
  },
  Skarmory: {
    types: ['Steel', 'Flying'],
    bs: {hp: 65, at: 80, df: 140, sa: 40, sd: 70, sp: 70},
    weightkg: 50.5,
  },
  Skiploom: {
    types: ['Grass', 'Flying'],
    bs: {hp: 55, at: 45, df: 50, sa: 45, sd: 65, sp: 80},
    weightkg: 1,
    nfe: true,
  },
  Slowking: {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 80, sa: 100, sd: 110, sp: 30},
    weightkg: 79.5,
  },
  Slugma: {
    types: ['Fire'],
    bs: {hp: 40, at: 40, df: 40, sa: 70, sd: 40, sp: 20},
    weightkg: 35,
    nfe: true,
  },
  Smeargle: {types: ['Normal'], bs: {hp: 55, at: 20, df: 35, sa: 20, sd: 45, sp: 75}, weightkg: 58},
  Smoochum: {
    types: ['Ice', 'Psychic'],
    bs: {hp: 45, at: 30, df: 15, sa: 85, sd: 65, sp: 65},
    weightkg: 6,
    nfe: true,
  },
  Sneasel: {
    types: ['Dark', 'Ice'],
    bs: {hp: 55, at: 95, df: 55, sa: 35, sd: 75, sp: 115},
    weightkg: 28,
  },
  Snubbull: {
    types: ['Normal'],
    bs: {hp: 60, at: 80, df: 50, sa: 40, sd: 40, sp: 30},
    weightkg: 7.8,
    nfe: true,
  },
  Spinarak: {
    types: ['Bug', 'Poison'],
    bs: {hp: 40, at: 60, df: 40, sa: 40, sd: 40, sp: 30},
    weightkg: 8.5,
    nfe: true,
  },
  Stantler: {
    types: ['Normal'],
    bs: {hp: 73, at: 95, df: 62, sa: 85, sd: 65, sp: 85},
    weightkg: 71.2,
  },
  Steelix: {
    types: ['Steel', 'Ground'],
    bs: {hp: 75, at: 85, df: 200, sa: 55, sd: 65, sp: 30},
    weightkg: 400,
  },
  Sudowoodo: {
    types: ['Rock'],
    bs: {hp: 70, at: 100, df: 115, sa: 30, sd: 65, sp: 30},
    weightkg: 38,
  },
  Suicune: {
    types: ['Water'],
    bs: {hp: 100, at: 75, df: 115, sa: 90, sd: 115, sp: 85},
    weightkg: 187,
    gender: 'N',
  },
  Sunflora: {
    types: ['Grass'],
    bs: {hp: 75, at: 75, df: 55, sa: 105, sd: 85, sp: 30},
    weightkg: 8.5,
  },
  Sunkern: {
    types: ['Grass'],
    bs: {hp: 30, at: 30, df: 30, sa: 30, sd: 30, sp: 30},
    weightkg: 1.8,
    nfe: true,
  },
  Swinub: {
    types: ['Ice', 'Ground'],
    bs: {hp: 50, at: 50, df: 40, sa: 30, sd: 30, sp: 50},
    weightkg: 6.5,
    nfe: true,
  },
  Teddiursa: {
    types: ['Normal'],
    bs: {hp: 60, at: 80, df: 50, sa: 50, sd: 50, sp: 40},
    weightkg: 8.8,
    nfe: true,
  },
  Togepi: {
    types: ['Normal'],
    bs: {hp: 35, at: 20, df: 65, sa: 40, sd: 65, sp: 20},
    weightkg: 1.5,
    nfe: true,
  },
  Togetic: {
    types: ['Normal', 'Flying'],
    bs: {hp: 55, at: 40, df: 85, sa: 80, sd: 105, sp: 40},
    weightkg: 3.2,
  },
  Totodile: {
    types: ['Water'],
    bs: {hp: 50, at: 65, df: 64, sa: 44, sd: 48, sp: 43},
    weightkg: 9.5,
    nfe: true,
  },
  Typhlosion: {
    types: ['Fire'],
    bs: {hp: 78, at: 84, df: 78, sa: 109, sd: 85, sp: 100},
    weightkg: 79.5,
  },
  Tyranitar: {
    types: ['Rock', 'Dark'],
    bs: {hp: 100, at: 134, df: 110, sa: 95, sd: 100, sp: 61},
    weightkg: 202,
  },
  Tyrogue: {
    types: ['Fighting'],
    bs: {hp: 35, at: 35, df: 35, sa: 35, sd: 35, sp: 35},
    weightkg: 21,
    nfe: true,
  },
  Umbreon: {types: ['Dark'], bs: {hp: 95, at: 65, df: 110, sa: 60, sd: 130, sp: 65}, weightkg: 27},
  Unown: {
    types: ['Psychic'],
    bs: {hp: 48, at: 72, df: 48, sa: 72, sd: 48, sp: 48},
    weightkg: 5,
    gender: 'N',
  },
  Ursaring: {
    types: ['Normal'],
    bs: {hp: 90, at: 130, df: 75, sa: 75, sd: 75, sp: 55},
    weightkg: 125.8,
  },
  Wobbuffet: {
    types: ['Psychic'],
    bs: {hp: 190, at: 33, df: 58, sa: 33, sd: 58, sp: 33},
    weightkg: 28.5,
  },
  Wooper: {
    types: ['Water', 'Ground'],
    bs: {hp: 55, at: 45, df: 45, sa: 25, sd: 25, sp: 15},
    weightkg: 8.5,
    nfe: true,
  },
  Xatu: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 65, at: 75, df: 70, sa: 95, sd: 70, sp: 95},
    weightkg: 15,
  },
  Yanma: {
    types: ['Bug', 'Flying'],
    bs: {hp: 65, at: 65, df: 45, sa: 75, sd: 45, sp: 95},
    weightkg: 38,
  },
};
const GSC: {[name: string]: SpeciesData} = extend(true, {}, RBY, GSC_PATCH);

const ADV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  // gen 1 pokemon changes
  Abra: {abilities: {0: 'Synchronize'}},
  Aerodactyl: {abilities: {0: 'Rock Head'}},
  Alakazam: {abilities: {0: 'Synchronize'}},
  Arbok: {abilities: {0: 'Intimidate'}},
  Arcanine: {abilities: {0: 'Intimidate'}},
  Articuno: {abilities: {0: 'Pressure'}},
  Beedrill: {abilities: {0: 'Swarm'}},
  Bellsprout: {abilities: {0: 'Chlorophyll'}},
  Blastoise: {abilities: {0: 'Torrent'}},
  Bulbasaur: {abilities: {0: 'Overgrow'}},
  Butterfree: {abilities: {0: 'Compound Eyes'}},
  Caterpie: {abilities: {0: 'Shield Dust'}},
  Chansey: {abilities: {0: 'Natural Cure'}},
  Charizard: {abilities: {0: 'Blaze'}},
  Charmander: {abilities: {0: 'Blaze'}},
  Charmeleon: {abilities: {0: 'Blaze'}},
  Clefable: {abilities: {0: 'Cute Charm'}},
  Clefairy: {abilities: {0: 'Cute Charm'}},
  Cloyster: {abilities: {0: 'Shell Armor'}},
  Cubone: {abilities: {0: 'Rock Head'}},
  Dewgong: {abilities: {0: 'Thick Fat'}},
  Diglett: {abilities: {0: 'Sand Veil'}},
  Ditto: {abilities: {0: 'Limber'}},
  Dodrio: {abilities: {0: 'Run Away'}},
  Doduo: {abilities: {0: 'Run Away'}},
  Dragonair: {abilities: {0: 'Shed Skin'}},
  Dragonite: {abilities: {0: 'Inner Focus'}},
  Dratini: {abilities: {0: 'Shed Skin'}},
  Drowzee: {abilities: {0: 'Insomnia'}},
  Dugtrio: {abilities: {0: 'Sand Veil'}},
  Eevee: {abilities: {0: 'Run Away'}},
  Ekans: {abilities: {0: 'Intimidate'}},
  Electabuzz: {abilities: {0: 'Static'}},
  Electrode: {abilities: {0: 'Soundproof'}},
  Exeggcute: {abilities: {0: 'Chlorophyll'}},
  Exeggutor: {abilities: {0: 'Chlorophyll'}},
  'Farfetch\u2019d': {abilities: {0: 'Keen Eye'}},
  Fearow: {abilities: {0: 'Keen Eye'}},
  Flareon: {abilities: {0: 'Flash Fire'}},
  Gastly: {abilities: {0: 'Levitate'}},
  Gengar: {abilities: {0: 'Levitate'}},
  Geodude: {abilities: {0: 'Rock Head'}},
  Gloom: {abilities: {0: 'Chlorophyll'}},
  Golbat: {abilities: {0: 'Inner Focus'}},
  Goldeen: {abilities: {0: 'Swift Swim'}},
  Golduck: {abilities: {0: 'Damp'}},
  Golem: {abilities: {0: 'Rock Head'}},
  Graveler: {abilities: {0: 'Rock Head'}},
  Grimer: {abilities: {0: 'Stench'}},
  Growlithe: {abilities: {0: 'Intimidate'}},
  Gyarados: {abilities: {0: 'Intimidate'}},
  Haunter: {abilities: {0: 'Levitate'}},
  Hitmonchan: {abilities: {0: 'Keen Eye'}},
  Hitmonlee: {abilities: {0: 'Limber'}},
  Horsea: {abilities: {0: 'Swift Swim'}},
  Hypno: {abilities: {0: 'Insomnia'}},
  Ivysaur: {abilities: {0: 'Overgrow'}},
  Jigglypuff: {abilities: {0: 'Cute Charm'}},
  Jolteon: {abilities: {0: 'Volt Absorb'}},
  Jynx: {abilities: {0: 'Oblivious'}},
  Kabuto: {abilities: {0: 'Swift Swim'}},
  Kabutops: {abilities: {0: 'Swift Swim'}},
  Kadabra: {abilities: {0: 'Synchronize'}},
  Kakuna: {abilities: {0: 'Shed Skin'}},
  Kangaskhan: {abilities: {0: 'Early Bird'}},
  Kingler: {abilities: {0: 'Hyper Cutter'}},
  Koffing: {abilities: {0: 'Levitate'}},
  Krabby: {abilities: {0: 'Hyper Cutter'}},
  Lapras: {abilities: {0: 'Water Absorb'}},
  Lickitung: {abilities: {0: 'Own Tempo'}},
  Machamp: {abilities: {0: 'Guts'}},
  Machoke: {abilities: {0: 'Guts'}},
  Machop: {abilities: {0: 'Guts'}},
  Magikarp: {abilities: {0: 'Swift Swim'}},
  Magmar: {abilities: {0: 'Flame Body'}},
  Magnemite: {abilities: {0: 'Magnet Pull'}},
  Magneton: {abilities: {0: 'Magnet Pull'}},
  Mankey: {abilities: {0: 'Vital Spirit'}},
  Marowak: {abilities: {0: 'Rock Head'}},
  Meowth: {abilities: {0: 'Pickup'}},
  Metapod: {abilities: {0: 'Shed Skin'}},
  Mew: {abilities: {0: 'Synchronize'}},
  Mewtwo: {abilities: {0: 'Pressure'}},
  Moltres: {abilities: {0: 'Pressure'}},
  'Mr. Mime': {abilities: {0: 'Soundproof'}},
  Muk: {abilities: {0: 'Stench'}},
  Nidoking: {abilities: {0: 'Poison Point'}},
  Nidoqueen: {abilities: {0: 'Poison Point'}},
  'Nidoran-F': {abilities: {0: 'Poison Point'}},
  'Nidoran-M': {abilities: {0: 'Poison Point'}},
  Nidorina: {abilities: {0: 'Poison Point'}},
  Nidorino: {abilities: {0: 'Poison Point'}},
  Ninetales: {abilities: {0: 'Flash Fire'}},
  Oddish: {abilities: {0: 'Chlorophyll'}},
  Omanyte: {abilities: {0: 'Swift Swim'}},
  Omastar: {abilities: {0: 'Swift Swim'}},
  Onix: {abilities: {0: 'Rock Head'}},
  Paras: {abilities: {0: 'Effect Spore'}},
  Parasect: {abilities: {0: 'Effect Spore'}},
  Persian: {abilities: {0: 'Limber'}},
  Pidgeot: {abilities: {0: 'Keen Eye'}},
  Pidgeotto: {abilities: {0: 'Keen Eye'}},
  Pidgey: {abilities: {0: 'Keen Eye'}},
  Pikachu: {abilities: {0: 'Static'}},
  Pinsir: {abilities: {0: 'Hyper Cutter'}},
  Poliwag: {abilities: {0: 'Water Absorb'}},
  Poliwhirl: {abilities: {0: 'Water Absorb'}},
  Poliwrath: {abilities: {0: 'Water Absorb'}},
  Ponyta: {abilities: {0: 'Run Away'}},
  Porygon: {abilities: {0: 'Trace'}},
  Primeape: {abilities: {0: 'Vital Spirit'}},
  Psyduck: {abilities: {0: 'Damp'}},
  Raichu: {abilities: {0: 'Static'}},
  Rapidash: {abilities: {0: 'Run Away'}},
  Raticate: {abilities: {0: 'Run Away'}},
  Rattata: {abilities: {0: 'Run Away'}},
  Rhydon: {abilities: {0: 'Lightning Rod'}},
  Rhyhorn: {abilities: {0: 'Lightning Rod'}},
  Sandshrew: {abilities: {0: 'Sand Veil'}},
  Sandslash: {abilities: {0: 'Sand Veil'}},
  Scyther: {abilities: {0: 'Swarm'}},
  Seadra: {abilities: {0: 'Poison Point'}},
  Seaking: {abilities: {0: 'Swift Swim'}},
  Seel: {abilities: {0: 'Thick Fat'}},
  Shellder: {abilities: {0: 'Shell Armor'}},
  Slowbro: {abilities: {0: 'Oblivious'}},
  Slowpoke: {abilities: {0: 'Oblivious'}},
  Snorlax: {abilities: {0: 'Immunity'}},
  Spearow: {abilities: {0: 'Keen Eye'}},
  Squirtle: {abilities: {0: 'Torrent'}},
  Starmie: {abilities: {0: 'Illuminate'}},
  Staryu: {abilities: {0: 'Illuminate'}},
  Tangela: {abilities: {0: 'Chlorophyll'}},
  Tauros: {abilities: {0: 'Intimidate'}},
  Tentacool: {abilities: {0: 'Clear Body'}},
  Tentacruel: {abilities: {0: 'Clear Body'}},
  Vaporeon: {abilities: {0: 'Water Absorb'}},
  Venomoth: {abilities: {0: 'Shield Dust'}},
  Venonat: {abilities: {0: 'Compound Eyes'}},
  Venusaur: {abilities: {0: 'Overgrow'}},
  Victreebel: {abilities: {0: 'Chlorophyll'}},
  Vileplume: {abilities: {0: 'Chlorophyll'}},
  Voltorb: {abilities: {0: 'Soundproof'}},
  Vulpix: {abilities: {0: 'Flash Fire'}},
  Wartortle: {abilities: {0: 'Torrent'}},
  Weedle: {abilities: {0: 'Shield Dust'}},
  Weepinbell: {abilities: {0: 'Chlorophyll'}},
  Weezing: {abilities: {0: 'Levitate'}},
  Wigglytuff: {abilities: {0: 'Cute Charm'}},
  Zapdos: {abilities: {0: 'Pressure'}},
  Zubat: {abilities: {0: 'Inner Focus'}},
  // gen 2 pokemon changes
  Aipom: {abilities: {0: 'Run Away'}},
  Ampharos: {abilities: {0: 'Static'}},
  Ariados: {abilities: {0: 'Swarm'}},
  Azumarill: {abilities: {0: 'Thick Fat'}},
  Bayleef: {abilities: {0: 'Overgrow'}},
  Bellossom: {abilities: {0: 'Chlorophyll'}},
  Blissey: {abilities: {0: 'Natural Cure'}},
  Celebi: {abilities: {0: 'Natural Cure'}},
  Chikorita: {abilities: {0: 'Overgrow'}},
  Chinchou: {abilities: {0: 'Volt Absorb'}},
  Cleffa: {abilities: {0: 'Cute Charm'}},
  Corsola: {abilities: {0: 'Hustle'}},
  Crobat: {abilities: {0: 'Inner Focus'}},
  Croconaw: {abilities: {0: 'Torrent'}},
  Cyndaquil: {abilities: {0: 'Blaze'}},
  Delibird: {abilities: {0: 'Vital Spirit'}},
  Donphan: {abilities: {0: 'Sturdy'}},
  Dunsparce: {abilities: {0: 'Serene Grace'}},
  Elekid: {abilities: {0: 'Static'}},
  Entei: {abilities: {0: 'Pressure'}},
  Espeon: {abilities: {0: 'Synchronize'}},
  Feraligatr: {abilities: {0: 'Torrent'}},
  Flaaffy: {abilities: {0: 'Static'}},
  Forretress: {abilities: {0: 'Sturdy'}},
  Furret: {abilities: {0: 'Run Away'}},
  Girafarig: {abilities: {0: 'Inner Focus'}},
  Gligar: {abilities: {0: 'Hyper Cutter'}},
  Granbull: {abilities: {0: 'Intimidate'}},
  Heracross: {abilities: {0: 'Swarm'}},
  Hitmontop: {abilities: {0: 'Intimidate'}},
  'Ho-Oh': {abilities: {0: 'Pressure'}},
  Hoothoot: {abilities: {0: 'Insomnia'}},
  Hoppip: {abilities: {0: 'Chlorophyll'}},
  Houndoom: {abilities: {0: 'Early Bird'}},
  Houndour: {abilities: {0: 'Early Bird'}},
  Igglybuff: {abilities: {0: 'Cute Charm'}},
  Jumpluff: {abilities: {0: 'Chlorophyll'}},
  Kingdra: {abilities: {0: 'Swift Swim'}},
  Lanturn: {abilities: {0: 'Volt Absorb'}},
  Larvitar: {abilities: {0: 'Guts'}},
  Ledian: {abilities: {0: 'Swarm'}},
  Ledyba: {abilities: {0: 'Swarm'}},
  Lugia: {abilities: {0: 'Pressure'}},
  Magby: {abilities: {0: 'Flame Body'}},
  Magcargo: {abilities: {0: 'Magma Armor'}},
  Mantine: {abilities: {0: 'Swift Swim'}},
  Mareep: {abilities: {0: 'Static'}},
  Marill: {abilities: {0: 'Thick Fat'}},
  Meganium: {abilities: {0: 'Overgrow'}},
  Miltank: {abilities: {0: 'Thick Fat'}},
  Misdreavus: {abilities: {0: 'Levitate'}},
  Murkrow: {abilities: {0: 'Insomnia'}},
  Natu: {abilities: {0: 'Synchronize'}},
  Noctowl: {abilities: {0: 'Insomnia'}},
  Octillery: {abilities: {0: 'Suction Cups'}},
  Phanpy: {abilities: {0: 'Pickup'}},
  Pichu: {abilities: {0: 'Static'}},
  Piloswine: {abilities: {0: 'Oblivious'}},
  Pineco: {abilities: {0: 'Sturdy'}},
  Politoed: {abilities: {0: 'Water Absorb'}},
  Porygon2: {abilities: {0: 'Trace'}},
  Pupitar: {abilities: {0: 'Shed Skin'}},
  Quagsire: {abilities: {0: 'Damp'}},
  Quilava: {abilities: {0: 'Blaze'}},
  Qwilfish: {abilities: {0: 'Poison Point'}},
  Raikou: {abilities: {0: 'Pressure'}},
  Remoraid: {abilities: {0: 'Hustle'}},
  Scizor: {abilities: {0: 'Swarm'}},
  Sentret: {abilities: {0: 'Run Away'}},
  Shuckle: {abilities: {0: 'Sturdy'}},
  Skarmory: {abilities: {0: 'Keen Eye'}},
  Skiploom: {abilities: {0: 'Chlorophyll'}},
  Slowking: {abilities: {0: 'Oblivious'}},
  Slugma: {abilities: {0: 'Magma Armor'}},
  Smeargle: {abilities: {0: 'Own Tempo'}},
  Smoochum: {abilities: {0: 'Oblivious'}},
  Sneasel: {abilities: {0: 'Inner Focus'}},
  Snubbull: {abilities: {0: 'Intimidate'}},
  Spinarak: {abilities: {0: 'Swarm'}},
  Stantler: {abilities: {0: 'Intimidate'}},
  Steelix: {abilities: {0: 'Rock Head'}},
  Sudowoodo: {abilities: {0: 'Sturdy'}},
  Suicune: {abilities: {0: 'Pressure'}},
  Sunflora: {abilities: {0: 'Chlorophyll'}},
  Sunkern: {abilities: {0: 'Chlorophyll'}},
  Swinub: {abilities: {0: 'Oblivious'}},
  Teddiursa: {abilities: {0: 'Pickup'}},
  Togepi: {abilities: {0: 'Hustle'}},
  Togetic: {abilities: {0: 'Hustle'}},
  Totodile: {abilities: {0: 'Torrent'}},
  Typhlosion: {abilities: {0: 'Blaze'}},
  Tyranitar: {abilities: {0: 'Sand Stream'}},
  Tyrogue: {abilities: {0: 'Guts'}},
  Umbreon: {abilities: {0: 'Synchronize'}},
  Unown: {abilities: {0: 'Levitate'}},
  Ursaring: {abilities: {0: 'Guts'}},
  Wobbuffet: {abilities: {0: 'Shadow Tag'}},
  Wooper: {abilities: {0: 'Damp'}},
  Xatu: {abilities: {0: 'Synchronize'}},
  Yanma: {abilities: {0: 'Speed Boost'}},
  // gen 3 pokemon
  Absol: {
    types: ['Dark'],
    bs: {hp: 65, at: 130, df: 60, sa: 75, sd: 60, sp: 75},
    weightkg: 47,
    abilities: {0: 'Pressure'},
  },
  Aggron: {
    types: ['Steel', 'Rock'],
    bs: {hp: 70, at: 110, df: 180, sa: 60, sd: 60, sp: 50},
    weightkg: 360,
    abilities: {0: 'Sturdy'},
  },
  Altaria: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 75, at: 70, df: 90, sa: 70, sd: 105, sp: 80},
    weightkg: 20.6,
    abilities: {0: 'Natural Cure'},
  },
  Anorith: {
    types: ['Rock', 'Bug'],
    bs: {hp: 45, at: 95, df: 50, sa: 40, sd: 50, sp: 75},
    weightkg: 12.5,
    nfe: true,
    abilities: {0: 'Battle Armor'},
  },
  Armaldo: {
    types: ['Rock', 'Bug'],
    bs: {hp: 75, at: 125, df: 100, sa: 70, sd: 80, sp: 45},
    weightkg: 68.2,
    abilities: {0: 'Battle Armor'},
  },
  Aron: {
    types: ['Steel', 'Rock'],
    bs: {hp: 50, at: 70, df: 100, sa: 40, sd: 40, sp: 30},
    weightkg: 60,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Azurill: {
    types: ['Normal'],
    bs: {hp: 50, at: 20, df: 40, sa: 20, sd: 40, sp: 20},
    weightkg: 2,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Bagon: {
    types: ['Dragon'],
    bs: {hp: 45, at: 75, df: 60, sa: 40, sd: 30, sp: 50},
    weightkg: 42.1,
    nfe: true,
    abilities: {0: 'Rock Head'},
  },
  Baltoy: {
    types: ['Ground', 'Psychic'],
    bs: {hp: 40, at: 40, df: 55, sa: 40, sd: 70, sp: 55},
    weightkg: 21.5,
    abilities: {0: 'Levitate'},
    nfe: true,
    gender: 'N',
  },
  Banette: {
    types: ['Ghost'],
    bs: {hp: 64, at: 115, df: 65, sa: 83, sd: 63, sp: 65},
    weightkg: 12.5,
    abilities: {0: 'Insomnia'},
  },
  Barboach: {
    types: ['Water', 'Ground'],
    bs: {hp: 50, at: 48, df: 43, sa: 46, sd: 41, sp: 60},
    weightkg: 1.9,
    nfe: true,
    abilities: {0: 'Oblivious'},
  },
  Beautifly: {
    types: ['Bug', 'Flying'],
    bs: {hp: 60, at: 70, df: 50, sa: 90, sd: 50, sp: 65},
    weightkg: 28.4,
    abilities: {0: 'Swarm'},
  },
  Beldum: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 40, at: 55, df: 80, sa: 35, sd: 60, sp: 30},
    weightkg: 95.2,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Blaziken: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 80, at: 120, df: 70, sa: 110, sd: 70, sp: 80},
    weightkg: 52,
    abilities: {0: 'Blaze'},
  },
  Breloom: {
    types: ['Grass', 'Fighting'],
    bs: {hp: 60, at: 130, df: 80, sa: 60, sd: 60, sp: 70},
    weightkg: 39.2,
    abilities: {0: 'Effect Spore'},
  },
  Cacnea: {
    types: ['Grass'],
    bs: {hp: 50, at: 85, df: 40, sa: 85, sd: 40, sp: 35},
    weightkg: 51.3,
    nfe: true,
    abilities: {0: 'Sand Veil'},
  },
  Cacturne: {
    types: ['Grass', 'Dark'],
    bs: {hp: 70, at: 115, df: 60, sa: 115, sd: 60, sp: 55},
    weightkg: 77.4,
    abilities: {0: 'Sand Veil'},
  },
  Camerupt: {
    types: ['Fire', 'Ground'],
    bs: {hp: 70, at: 100, df: 70, sa: 105, sd: 75, sp: 40},
    weightkg: 220,
    abilities: {0: 'Magma Armor'},
  },
  Carvanha: {
    types: ['Water', 'Dark'],
    bs: {hp: 45, at: 90, df: 20, sa: 65, sd: 20, sp: 65},
    weightkg: 20.8,
    nfe: true,
    abilities: {0: 'Rough Skin'},
  },
  Cascoon: {
    types: ['Bug'],
    bs: {hp: 50, at: 35, df: 55, sa: 25, sd: 25, sp: 15},
    weightkg: 11.5,
    abilities: {0: 'Shed Skin'},
    nfe: true,
  },
  Castform: {
    types: ['Normal'],
    bs: {hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70},
    weightkg: 0.8,
    abilities: {0: 'Forecast'},
    otherFormes: ['Castform-Rainy', 'Castform-Snowy', 'Castform-Sunny'],
  },
  'Castform-Rainy': {
    types: ['Water'],
    bs: {hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70},
    weightkg: 0.8,
    abilities: {0: 'Forecast'},
    baseSpecies: 'Castform',
  },
  'Castform-Snowy': {
    types: ['Ice'],
    bs: {hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70},
    weightkg: 0.8,
    abilities: {0: 'Forecast'},
    baseSpecies: 'Castform',
  },
  'Castform-Sunny': {
    types: ['Fire'],
    bs: {hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70},
    weightkg: 0.8,
    abilities: {0: 'Forecast'},
    baseSpecies: 'Castform',
  },
  Chimecho: {
    types: ['Psychic'],
    bs: {hp: 65, at: 50, df: 70, sa: 95, sd: 80, sp: 65},
    weightkg: 1,
    abilities: {0: 'Levitate'},
  },
  Clamperl: {
    types: ['Water'],
    bs: {hp: 35, at: 64, df: 85, sa: 74, sd: 55, sp: 32},
    weightkg: 52.5,
    nfe: true,
    abilities: {0: 'Shell Armor'},
  },
  Claydol: {
    types: ['Ground', 'Psychic'],
    bs: {hp: 60, at: 70, df: 105, sa: 70, sd: 120, sp: 75},
    weightkg: 108,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  Combusken: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 60, at: 85, df: 60, sa: 85, sd: 60, sp: 55},
    weightkg: 19.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Corphish: {
    types: ['Water'],
    bs: {hp: 43, at: 80, df: 65, sa: 50, sd: 35, sp: 35},
    weightkg: 11.5,
    nfe: true,
    abilities: {0: 'Hyper Cutter'},
  },
  Cradily: {
    types: ['Rock', 'Grass'],
    bs: {hp: 86, at: 81, df: 97, sa: 81, sd: 107, sp: 43},
    weightkg: 60.4,
    abilities: {0: 'Suction Cups'},
  },
  Crawdaunt: {
    types: ['Water', 'Dark'],
    bs: {hp: 63, at: 120, df: 85, sa: 90, sd: 55, sp: 55},
    weightkg: 32.8,
    abilities: {0: 'Hyper Cutter'},
  },
  Delcatty: {
    types: ['Normal'],
    bs: {hp: 70, at: 65, df: 65, sa: 55, sd: 55, sp: 70},
    weightkg: 32.6,
    abilities: {0: 'Cute Charm'},
  },
  Deoxys: {
    types: ['Psychic'],
    bs: {hp: 50, at: 150, df: 50, sa: 150, sd: 50, sp: 150},
    weightkg: 60.8,
    abilities: {0: 'Pressure'},
    gender: 'N',
    otherFormes: ['Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed'],
  },
  'Deoxys-Attack': {
    types: ['Psychic'],
    bs: {hp: 50, at: 180, df: 20, sa: 180, sd: 20, sp: 150},
    weightkg: 60.8,
    abilities: {0: 'Pressure'},
    gender: 'N',
    baseSpecies: 'Deoxys',
  },
  'Deoxys-Defense': {
    types: ['Psychic'],
    bs: {hp: 50, at: 70, df: 160, sa: 70, sd: 160, sp: 90},
    weightkg: 60.8,
    abilities: {0: 'Pressure'},
    gender: 'N',
    baseSpecies: 'Deoxys',
  },
  'Deoxys-Speed': {
    types: ['Psychic'],
    bs: {hp: 50, at: 95, df: 90, sa: 95, sd: 90, sp: 180},
    weightkg: 60.8,
    abilities: {0: 'Pressure'},
    gender: 'N',
    baseSpecies: 'Deoxys',
  },
  Dusclops: {
    types: ['Ghost'],
    bs: {hp: 40, at: 70, df: 130, sa: 60, sd: 130, sp: 25},
    weightkg: 30.6,
    abilities: {0: 'Pressure'},
  },
  Duskull: {
    types: ['Ghost'],
    bs: {hp: 20, at: 40, df: 90, sa: 30, sd: 90, sp: 25},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Levitate'},
  },
  Dustox: {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 50, df: 70, sa: 50, sd: 90, sp: 65},
    weightkg: 31.6,
    abilities: {0: 'Shield Dust'},
  },
  Electrike: {
    types: ['Electric'],
    bs: {hp: 40, at: 45, df: 40, sa: 65, sd: 40, sp: 65},
    weightkg: 15.2,
    nfe: true,
    abilities: {0: 'Static'},
  },
  Exploud: {
    types: ['Normal'],
    bs: {hp: 104, at: 91, df: 63, sa: 91, sd: 63, sp: 68},
    weightkg: 84,
    abilities: {0: 'Soundproof'},
  },
  Feebas: {
    types: ['Water'],
    bs: {hp: 20, at: 15, df: 20, sa: 10, sd: 55, sp: 80},
    weightkg: 7.4,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Flygon: {
    types: ['Ground', 'Dragon'],
    bs: {hp: 80, at: 100, df: 80, sa: 80, sd: 80, sp: 100},
    weightkg: 82,
    abilities: {0: 'Levitate'},
  },
  Gardevoir: {
    types: ['Psychic'],
    bs: {hp: 68, at: 65, df: 65, sa: 125, sd: 115, sp: 80},
    weightkg: 48.4,
    abilities: {0: 'Synchronize'},
  },
  Glalie: {
    types: ['Ice'],
    bs: {hp: 80, at: 80, df: 80, sa: 80, sd: 80, sp: 80},
    weightkg: 256.5,
    abilities: {0: 'Inner Focus'},
  },
  Gorebyss: {
    types: ['Water'],
    bs: {hp: 55, at: 84, df: 105, sa: 114, sd: 75, sp: 52},
    weightkg: 22.6,
    abilities: {0: 'Swift Swim'},
  },
  Groudon: {
    types: ['Ground'],
    bs: {hp: 100, at: 150, df: 140, sa: 100, sd: 90, sp: 90},
    weightkg: 950,
    abilities: {0: 'Drought'},
    gender: 'N',
  },
  Grovyle: {
    types: ['Grass'],
    bs: {hp: 50, at: 65, df: 45, sa: 85, sd: 65, sp: 95},
    weightkg: 21.6,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Grumpig: {
    types: ['Psychic'],
    bs: {hp: 80, at: 45, df: 65, sa: 90, sd: 110, sp: 80},
    weightkg: 71.5,
    abilities: {0: 'Thick Fat'},
  },
  Gulpin: {
    types: ['Poison'],
    bs: {hp: 70, at: 43, df: 53, sa: 43, sd: 53, sp: 40},
    weightkg: 10.3,
    nfe: true,
    abilities: {0: 'Liquid Ooze'},
  },
  Hariyama: {
    types: ['Fighting'],
    bs: {hp: 144, at: 120, df: 60, sa: 40, sd: 60, sp: 50},
    weightkg: 253.8,
    abilities: {0: 'Thick Fat'},
  },
  Huntail: {
    types: ['Water'],
    bs: {hp: 55, at: 104, df: 105, sa: 94, sd: 75, sp: 52},
    weightkg: 27,
    abilities: {0: 'Swift Swim'},
  },
  Illumise: {
    types: ['Bug'],
    bs: {hp: 65, at: 47, df: 55, sa: 73, sd: 75, sp: 85},
    abilities: {0: 'Oblivious'},
    weightkg: 17.7,
  },
  Jirachi: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 1.1,
    abilities: {0: 'Serene Grace'},
    gender: 'N',
  },
  Kecleon: {
    types: ['Normal'],
    bs: {hp: 60, at: 90, df: 70, sa: 60, sd: 120, sp: 40},
    weightkg: 22,
    abilities: {0: 'Color Change'},
  },
  Kirlia: {
    types: ['Psychic'],
    bs: {hp: 38, at: 35, df: 35, sa: 65, sd: 55, sp: 50},
    weightkg: 20.2,
    nfe: true,
    abilities: {0: 'Synchronize'},
  },
  Kyogre: {
    types: ['Water'],
    bs: {hp: 100, at: 100, df: 90, sa: 150, sd: 140, sp: 90},
    weightkg: 352,
    abilities: {0: 'Drizzle'},
    gender: 'N',
  },
  Lairon: {
    types: ['Steel', 'Rock'],
    bs: {hp: 60, at: 90, df: 140, sa: 50, sd: 50, sp: 40},
    weightkg: 120,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Latias: {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 80, df: 90, sa: 110, sd: 130, sp: 110},
    weightkg: 40,
    abilities: {0: 'Levitate'},
  },
  Latios: {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 90, df: 80, sa: 130, sd: 110, sp: 110},
    weightkg: 60,
    abilities: {0: 'Levitate'},
  },
  Lileep: {
    types: ['Rock', 'Grass'],
    bs: {hp: 66, at: 41, df: 77, sa: 61, sd: 87, sp: 23},
    weightkg: 23.8,
    nfe: true,
    abilities: {0: 'Suction Cups'},
  },
  Linoone: {
    types: ['Normal'],
    bs: {hp: 78, at: 70, df: 61, sa: 50, sd: 61, sp: 100},
    weightkg: 32.5,
    abilities: {0: 'Pickup'},
  },
  Lombre: {
    types: ['Water', 'Grass'],
    bs: {hp: 60, at: 50, df: 50, sa: 60, sd: 70, sp: 50},
    weightkg: 32.5,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Lotad: {
    types: ['Water', 'Grass'],
    bs: {hp: 40, at: 30, df: 30, sa: 40, sd: 50, sp: 30},
    weightkg: 2.6,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Loudred: {
    types: ['Normal'],
    bs: {hp: 84, at: 71, df: 43, sa: 71, sd: 43, sp: 48},
    weightkg: 40.5,
    nfe: true,
    abilities: {0: 'Soundproof'},
  },
  Ludicolo: {
    types: ['Water', 'Grass'],
    bs: {hp: 80, at: 70, df: 70, sa: 90, sd: 100, sp: 70},
    weightkg: 55,
    abilities: {0: 'Swift Swim'},
  },
  Lunatone: {
    types: ['Rock', 'Psychic'],
    bs: {hp: 70, at: 55, df: 65, sa: 95, sd: 85, sp: 70},
    weightkg: 168,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  Luvdisc: {
    types: ['Water'],
    bs: {hp: 43, at: 30, df: 55, sa: 40, sd: 65, sp: 97},
    weightkg: 8.7,
    abilities: {0: 'Swift Swim'},
  },
  Makuhita: {
    types: ['Fighting'],
    bs: {hp: 72, at: 60, df: 30, sa: 20, sd: 30, sp: 25},
    weightkg: 86.4,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Manectric: {
    types: ['Electric'],
    bs: {hp: 70, at: 75, df: 60, sa: 105, sd: 60, sp: 105},
    weightkg: 40.2,
    abilities: {0: 'Static'},
  },
  Marshtomp: {
    types: ['Water', 'Ground'],
    bs: {hp: 70, at: 85, df: 70, sa: 60, sd: 70, sp: 50},
    weightkg: 28,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Masquerain: {
    types: ['Bug', 'Flying'],
    bs: {hp: 70, at: 60, df: 62, sa: 80, sd: 82, sp: 60},
    weightkg: 3.6,
    abilities: {0: 'Intimidate'},
  },
  Mawile: {
    types: ['Steel'],
    bs: {hp: 50, at: 85, df: 85, sa: 55, sd: 55, sp: 50},
    weightkg: 11.5,
    abilities: {0: 'Hyper Cutter'},
  },
  Medicham: {
    types: ['Fighting', 'Psychic'],
    bs: {hp: 60, at: 60, df: 75, sa: 60, sd: 75, sp: 80},
    weightkg: 31.5,
    abilities: {0: 'Pure Power'},
  },
  Meditite: {
    types: ['Fighting', 'Psychic'],
    bs: {hp: 30, at: 40, df: 55, sa: 40, sd: 55, sp: 60},
    weightkg: 11.2,
    nfe: true,
    abilities: {0: 'Pure Power'},
  },
  Metagross: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 80, at: 135, df: 130, sa: 95, sd: 90, sp: 70},
    weightkg: 550,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Metang: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 60, at: 75, df: 100, sa: 55, sd: 80, sp: 50},
    weightkg: 202.5,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Mightyena: {
    types: ['Dark'],
    bs: {hp: 70, at: 90, df: 70, sa: 60, sd: 60, sp: 70},
    weightkg: 37,
    abilities: {0: 'Intimidate'},
  },
  Milotic: {
    types: ['Water'],
    bs: {hp: 95, at: 60, df: 79, sa: 100, sd: 125, sp: 81},
    weightkg: 162,
    abilities: {0: 'Marvel Scale'},
  },
  Minun: {
    types: ['Electric'],
    bs: {hp: 60, at: 40, df: 50, sa: 75, sd: 85, sp: 95},
    weightkg: 4.2,
    abilities: {0: 'Minus'},
  },
  Mudkip: {
    types: ['Water'],
    bs: {hp: 50, at: 70, df: 50, sa: 50, sd: 50, sp: 40},
    weightkg: 7.6,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Nincada: {
    types: ['Bug', 'Ground'],
    bs: {hp: 31, at: 45, df: 90, sa: 30, sd: 30, sp: 40},
    weightkg: 5.5,
    nfe: true,
    abilities: {0: 'Compound Eyes'},
  },
  Ninjask: {
    types: ['Bug', 'Flying'],
    bs: {hp: 61, at: 90, df: 45, sa: 50, sd: 50, sp: 160},
    weightkg: 12,
    abilities: {0: 'Speed Boost'},
  },
  Nosepass: {
    types: ['Rock'],
    bs: {hp: 30, at: 45, df: 135, sa: 45, sd: 90, sp: 30},
    weightkg: 97,
    abilities: {0: 'Sturdy'},
  },
  Numel: {
    types: ['Fire', 'Ground'],
    bs: {hp: 60, at: 60, df: 40, sa: 65, sd: 45, sp: 35},
    weightkg: 24,
    nfe: true,
    abilities: {0: 'Oblivious'},
  },
  Nuzleaf: {
    types: ['Grass', 'Dark'],
    bs: {hp: 70, at: 70, df: 40, sa: 60, sd: 40, sp: 60},
    weightkg: 28,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Pelipper: {
    types: ['Water', 'Flying'],
    bs: {hp: 60, at: 50, df: 100, sa: 85, sd: 70, sp: 65},
    weightkg: 28,
    abilities: {0: 'Keen Eye'},
  },
  Plusle: {
    types: ['Electric'],
    bs: {hp: 60, at: 50, df: 40, sa: 85, sd: 75, sp: 95},
    weightkg: 4.2,
    abilities: {0: 'Plus'},
  },
  Poochyena: {
    types: ['Dark'],
    bs: {hp: 35, at: 55, df: 35, sa: 30, sd: 30, sp: 35},
    weightkg: 13.6,
    nfe: true,
    abilities: {0: 'Run Away'},
  },
  Ralts: {
    types: ['Psychic'],
    bs: {hp: 28, at: 25, df: 25, sa: 45, sd: 35, sp: 40},
    weightkg: 6.6,
    nfe: true,
    abilities: {0: 'Synchronize'},
  },
  Rayquaza: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 105, at: 150, df: 90, sa: 150, sd: 90, sp: 95},
    weightkg: 206.5,
    abilities: {0: 'Air Lock'},
    gender: 'N',
  },
  Regice: {
    types: ['Ice'],
    bs: {hp: 80, at: 50, df: 100, sa: 100, sd: 200, sp: 50},
    weightkg: 175,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Regirock: {
    types: ['Rock'],
    bs: {hp: 80, at: 100, df: 200, sa: 50, sd: 100, sp: 50},
    weightkg: 230,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Registeel: {
    types: ['Steel'],
    bs: {hp: 80, at: 75, df: 150, sa: 75, sd: 150, sp: 50},
    weightkg: 205,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Relicanth: {
    types: ['Water', 'Rock'],
    bs: {hp: 100, at: 90, df: 130, sa: 45, sd: 65, sp: 55},
    weightkg: 23.4,
    abilities: {0: 'Swift Swim'},
  },
  Roselia: {
    types: ['Grass', 'Poison'],
    bs: {hp: 50, at: 60, df: 45, sa: 100, sd: 80, sp: 65},
    weightkg: 2,
    abilities: {0: 'Natural Cure'},
  },
  Sableye: {
    types: ['Dark', 'Ghost'],
    bs: {hp: 50, at: 75, df: 75, sa: 65, sd: 65, sp: 50},
    weightkg: 11,
    abilities: {0: 'Keen Eye'},
  },
  Salamence: {
    types: ['Dragon', 'Flying'],
    bs: {hp: 95, at: 135, df: 80, sa: 110, sd: 80, sp: 100},
    weightkg: 102.6,
    abilities: {0: 'Intimidate'},
  },
  Sceptile: {
    types: ['Grass'],
    bs: {hp: 70, at: 85, df: 65, sa: 105, sd: 85, sp: 120},
    weightkg: 52.2,
    abilities: {0: 'Overgrow'},
  },
  Sealeo: {
    types: ['Ice', 'Water'],
    bs: {hp: 90, at: 60, df: 70, sa: 75, sd: 70, sp: 45},
    weightkg: 87.6,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Seedot: {
    types: ['Grass'],
    bs: {hp: 40, at: 40, df: 50, sa: 30, sd: 30, sp: 30},
    weightkg: 4,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Seviper: {
    types: ['Poison'],
    bs: {hp: 73, at: 100, df: 60, sa: 100, sd: 60, sp: 65},
    weightkg: 52.5,
    abilities: {0: 'Shed Skin'},
  },
  Sharpedo: {
    types: ['Water', 'Dark'],
    bs: {hp: 70, at: 120, df: 40, sa: 95, sd: 40, sp: 95},
    weightkg: 88.8,
    abilities: {0: 'Rough Skin'},
  },
  Shedinja: {
    types: ['Bug', 'Ghost'],
    bs: {hp: 1, at: 90, df: 45, sa: 30, sd: 30, sp: 40},
    weightkg: 1.2,
    abilities: {0: 'Wonder Guard'},
    gender: 'N',
  },
  Shelgon: {
    types: ['Dragon'],
    bs: {hp: 65, at: 95, df: 100, sa: 60, sd: 50, sp: 50},
    weightkg: 110.5,
    nfe: true,
    abilities: {0: 'Rock Head'},
  },
  Shiftry: {
    types: ['Grass', 'Dark'],
    bs: {hp: 90, at: 100, df: 60, sa: 90, sd: 60, sp: 80},
    weightkg: 59.6,
    abilities: {0: 'Chlorophyll'},
  },
  Shroomish: {
    types: ['Grass'],
    bs: {hp: 60, at: 40, df: 60, sa: 40, sd: 60, sp: 35},
    weightkg: 4.5,
    nfe: true,
    abilities: {0: 'Effect Spore'},
  },
  Shuppet: {
    types: ['Ghost'],
    bs: {hp: 44, at: 75, df: 35, sa: 63, sd: 33, sp: 45},
    weightkg: 2.3,
    nfe: true,
    abilities: {0: 'Insomnia'},
  },
  Silcoon: {
    types: ['Bug'],
    bs: {hp: 50, at: 35, df: 55, sa: 25, sd: 25, sp: 15},
    weightkg: 10,
    abilities: {0: 'Shed Skin'},
    nfe: true,
  },
  Skitty: {
    types: ['Normal'],
    bs: {hp: 50, at: 45, df: 45, sa: 35, sd: 35, sp: 50},
    weightkg: 11,
    nfe: true,
    abilities: {0: 'Cute Charm'},
  },
  Slaking: {
    types: ['Normal'],
    bs: {hp: 150, at: 160, df: 100, sa: 95, sd: 65, sp: 100},
    weightkg: 130.5,
    abilities: {0: 'Truant'},
  },
  Slakoth: {
    types: ['Normal'],
    bs: {hp: 60, at: 60, df: 60, sa: 35, sd: 35, sp: 30},
    weightkg: 24,
    abilities: {0: 'Truant'},
    nfe: true,
  },
  Snorunt: {
    types: ['Ice'],
    bs: {hp: 50, at: 50, df: 50, sa: 50, sd: 50, sp: 50},
    weightkg: 16.8,
    nfe: true,
    abilities: {0: 'Inner Focus'},
  },
  Solrock: {
    types: ['Rock', 'Psychic'],
    bs: {hp: 70, at: 95, df: 85, sa: 55, sd: 65, sp: 70},
    weightkg: 154,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  Spheal: {
    types: ['Ice', 'Water'],
    bs: {hp: 70, at: 40, df: 50, sa: 55, sd: 50, sp: 25},
    weightkg: 39.5,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Spinda: {
    types: ['Normal'],
    bs: {hp: 60, at: 60, df: 60, sa: 60, sd: 60, sp: 60},
    weightkg: 5,
    abilities: {0: 'Own Tempo'},
    nfe: true,
  },
  Spoink: {
    types: ['Psychic'],
    bs: {hp: 60, at: 25, df: 35, sa: 70, sd: 80, sp: 60},
    weightkg: 30.6,
    nfe: true,
    abilities: {0: 'Thick Fat'},
  },
  Surskit: {
    types: ['Bug', 'Water'],
    bs: {hp: 40, at: 30, df: 32, sa: 50, sd: 52, sp: 65},
    weightkg: 1.7,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Swablu: {
    types: ['Normal', 'Flying'],
    bs: {hp: 45, at: 40, df: 60, sa: 40, sd: 75, sp: 50},
    weightkg: 1.2,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  Swalot: {
    types: ['Poison'],
    bs: {hp: 100, at: 73, df: 83, sa: 73, sd: 83, sp: 55},
    weightkg: 80,
    abilities: {0: 'Liquid Ooze'},
  },
  Swampert: {
    types: ['Water', 'Ground'],
    bs: {hp: 100, at: 110, df: 90, sa: 85, sd: 90, sp: 60},
    weightkg: 81.9,
    abilities: {0: 'Torrent'},
  },
  Swellow: {
    types: ['Normal', 'Flying'],
    bs: {hp: 60, at: 85, df: 60, sa: 50, sd: 50, sp: 125},
    weightkg: 19.8,
    abilities: {0: 'Guts'},
  },
  Taillow: {
    types: ['Normal', 'Flying'],
    bs: {hp: 40, at: 55, df: 30, sa: 30, sd: 30, sp: 85},
    weightkg: 2.3,
    nfe: true,
    abilities: {0: 'Guts'},
  },
  Torchic: {
    types: ['Fire'],
    bs: {hp: 45, at: 60, df: 40, sa: 70, sd: 50, sp: 45},
    weightkg: 2.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Torkoal: {
    types: ['Fire'],
    bs: {hp: 70, at: 85, df: 140, sa: 85, sd: 70, sp: 20},
    weightkg: 80.4,
    abilities: {0: 'White Smoke'},
  },
  Trapinch: {
    types: ['Ground'],
    bs: {hp: 45, at: 100, df: 45, sa: 45, sd: 45, sp: 10},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Hyper Cutter'},
  },
  Treecko: {
    types: ['Grass'],
    bs: {hp: 40, at: 45, df: 35, sa: 65, sd: 55, sp: 70},
    weightkg: 5,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Tropius: {
    types: ['Grass', 'Flying'],
    bs: {hp: 99, at: 68, df: 83, sa: 72, sd: 87, sp: 51},
    weightkg: 100,
    abilities: {0: 'Chlorophyll'},
  },
  Vibrava: {
    types: ['Ground', 'Dragon'],
    bs: {hp: 50, at: 70, df: 50, sa: 50, sd: 50, sp: 70},
    weightkg: 15.3,
    abilities: {0: 'Levitate'},
    nfe: true,
  },
  Vigoroth: {
    types: ['Normal'],
    bs: {hp: 80, at: 80, df: 80, sa: 55, sd: 55, sp: 90},
    weightkg: 46.5,
    abilities: {0: 'Vital Spirit'},
    nfe: true,
  },
  Volbeat: {
    types: ['Bug'],
    bs: {hp: 65, at: 73, df: 55, sa: 47, sd: 75, sp: 85},
    weightkg: 17.7,
    abilities: {0: 'Illuminate'},
  },
  Wailmer: {
    types: ['Water'],
    bs: {hp: 130, at: 70, df: 35, sa: 70, sd: 35, sp: 60},
    weightkg: 130,
    nfe: true,
    abilities: {0: 'Water Veil'},
  },
  Wailord: {
    types: ['Water'],
    bs: {hp: 170, at: 90, df: 45, sa: 90, sd: 45, sp: 60},
    weightkg: 398,
    abilities: {0: 'Water Veil'},
  },
  Walrein: {
    types: ['Ice', 'Water'],
    bs: {hp: 110, at: 80, df: 90, sa: 95, sd: 90, sp: 65},
    weightkg: 150.6,
    abilities: {0: 'Thick Fat'},
  },
  Whiscash: {
    types: ['Water', 'Ground'],
    bs: {hp: 110, at: 78, df: 73, sa: 76, sd: 71, sp: 60},
    weightkg: 23.6,
    abilities: {0: 'Oblivious'},
  },
  Whismur: {
    types: ['Normal'],
    bs: {hp: 64, at: 51, df: 23, sa: 51, sd: 23, sp: 28},
    weightkg: 16.3,
    nfe: true,
    abilities: {0: 'Soundproof'},
  },
  Wingull: {
    types: ['Water', 'Flying'],
    bs: {hp: 40, at: 30, df: 30, sa: 55, sd: 30, sp: 85},
    weightkg: 9.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Wurmple: {
    types: ['Bug'],
    bs: {hp: 45, at: 45, df: 35, sa: 20, sd: 30, sp: 20},
    weightkg: 3.6,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Wynaut: {
    types: ['Psychic'],
    bs: {hp: 95, at: 23, df: 48, sa: 23, sd: 48, sp: 23},
    weightkg: 14,
    nfe: true,
    abilities: {0: 'Shadow Tag'},
  },
  Zangoose: {
    types: ['Normal'],
    bs: {hp: 73, at: 115, df: 60, sa: 60, sd: 60, sp: 90},
    weightkg: 40.3,
    abilities: {0: 'Immunity'},
  },
  Zigzagoon: {
    types: ['Normal'],
    bs: {hp: 38, at: 30, df: 41, sa: 30, sd: 41, sp: 60},
    weightkg: 17.5,
    nfe: true,
    abilities: {0: 'Pickup'},
  },
};

const ADV: {[name: string]: SpeciesData} = extend(true, {}, GSC, ADV_PATCH);

const DPP_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Aipom: {nfe: true},
  Dusclops: {nfe: true},
  Electabuzz: {nfe: true},
  Gligar: {nfe: true},
  Lickitung: {nfe: true},
  Magmar: {nfe: true},
  Magneton: {nfe: true},
  Misdreavus: {nfe: true},
  Murkrow: {nfe: true},
  Nosepass: {nfe: true},
  Piloswine: {nfe: true},
  Pichu: {otherFormes: ['Pichu-Spiky-eared']},
  Porygon2: {nfe: true},
  Rhydon: {nfe: true},
  Roselia: {nfe: true},
  Sneasel: {nfe: true},
  Tangela: {nfe: true},
  Togetic: {nfe: true},
  Yanma: {nfe: true},
  Abomasnow: {
    types: ['Grass', 'Ice'],
    bs: {hp: 90, at: 92, df: 75, sa: 92, sd: 85, sp: 60},
    weightkg: 135.5,
    abilities: {0: 'Snow Warning'},
  },
  Ambipom: {
    types: ['Normal'],
    bs: {hp: 75, at: 100, df: 66, sa: 60, sd: 66, sp: 115},
    weightkg: 20.3,
    abilities: {0: 'Technician'},
  },
  Arceus: {
    types: ['Normal'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    otherFormes: [
      'Arceus-Bug',
      'Arceus-Dark',
      'Arceus-Dragon',
      'Arceus-Electric',
      'Arceus-Fighting',
      'Arceus-Fire',
      'Arceus-Flying',
      'Arceus-Ghost',
      'Arceus-Grass',
      'Arceus-Ground',
      'Arceus-Ice',
      'Arceus-Poison',
      'Arceus-Psychic',
      'Arceus-Rock',
      'Arceus-Steel',
      'Arceus-Water',
    ],
  },
  'Arceus-Bug': {
    types: ['Bug'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Dark': {
    types: ['Dark'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Dragon': {
    types: ['Dragon'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Electric': {
    types: ['Electric'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Fighting': {
    types: ['Fighting'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Fire': {
    types: ['Fire'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Flying': {
    types: ['Flying'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Ghost': {
    types: ['Ghost'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Grass': {
    types: ['Grass'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Ground': {
    types: ['Ground'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Ice': {
    types: ['Ice'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Poison': {
    types: ['Poison'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Psychic': {
    types: ['Psychic'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Rock': {
    types: ['Rock'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Steel': {
    types: ['Steel'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  'Arceus-Water': {
    types: ['Water'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    gender: 'N',
    baseSpecies: 'Arceus',
  },
  Arghonaut: {
    types: ['Water', 'Fighting'],
    bs: {hp: 105, at: 110, df: 95, sa: 70, sd: 100, sp: 75},
    weightkg: 151,
    abilities: {0: 'Unaware'},
  },
  Azelf: {
    types: ['Psychic'],
    bs: {hp: 75, at: 125, df: 70, sa: 125, sd: 70, sp: 115},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  Bastiodon: {
    types: ['Rock', 'Steel'],
    bs: {hp: 60, at: 52, df: 168, sa: 47, sd: 138, sp: 30},
    weightkg: 149.5,
    abilities: {0: 'Sturdy'},
  },
  Bibarel: {
    types: ['Normal', 'Water'],
    bs: {hp: 79, at: 85, df: 60, sa: 55, sd: 60, sp: 71},
    weightkg: 31.5,
    abilities: {0: 'Simple'},
  },
  Bidoof: {
    types: ['Normal'],
    bs: {hp: 59, at: 45, df: 40, sa: 35, sd: 40, sp: 31},
    weightkg: 20,
    nfe: true,
    abilities: {0: 'Simple'},
  },
  Bonsly: {
    types: ['Rock'],
    bs: {hp: 50, at: 80, df: 95, sa: 10, sd: 45, sp: 10},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Breezi: {
    types: ['Poison', 'Flying'],
    bs: {hp: 50, at: 46, df: 69, sa: 60, sd: 50, sp: 75},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Unburden'},
  },
  Bronzong: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 67, at: 89, df: 116, sa: 79, sd: 116, sp: 33},
    weightkg: 187,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Bronzor: {
    types: ['Steel', 'Psychic'],
    bs: {hp: 57, at: 24, df: 86, sa: 24, sd: 86, sp: 23},
    weightkg: 60.5,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Budew: {
    types: ['Grass', 'Poison'],
    bs: {hp: 40, at: 30, df: 35, sa: 50, sd: 70, sp: 55},
    weightkg: 1.2,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  Buizel: {
    types: ['Water'],
    bs: {hp: 55, at: 65, df: 35, sa: 60, sd: 30, sp: 85},
    weightkg: 29.5,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Buneary: {
    types: ['Normal'],
    bs: {hp: 55, at: 66, df: 44, sa: 44, sd: 56, sp: 85},
    weightkg: 5.5,
    nfe: true,
    abilities: {0: 'Run Away'},
  },
  Burmy: {
    types: ['Bug'],
    bs: {hp: 40, at: 29, df: 45, sa: 29, sd: 45, sp: 36},
    weightkg: 3.4,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Carnivine: {
    types: ['Grass'],
    bs: {hp: 74, at: 100, df: 72, sa: 90, sd: 72, sp: 46},
    weightkg: 27,
    abilities: {0: 'Levitate'},
  },
  Chatot: {
    types: ['Normal', 'Flying'],
    bs: {hp: 76, at: 65, df: 45, sa: 92, sd: 42, sp: 91},
    weightkg: 1.9,
    abilities: {0: 'Keen Eye'},
  },
  Cherrim: {
    types: ['Grass'],
    bs: {hp: 70, at: 60, df: 70, sa: 87, sd: 78, sp: 85},
    weightkg: 9.3,
    abilities: {0: 'Flower Gift'},
    otherFormes: ['Cherrim-Sunshine'],
  },
  'Cherrim-Sunshine': {
    types: ['Grass'],
    bs: {hp: 70, at: 60, df: 70, sa: 87, sd: 78, sp: 85},
    weightkg: 9.3,
    abilities: {0: 'Flower Gift'},
    baseSpecies: 'Cherrim',
  },
  Cherubi: {
    types: ['Grass'],
    bs: {hp: 45, at: 35, df: 45, sa: 62, sd: 53, sp: 35},
    weightkg: 3.3,
    abilities: {0: 'Chlorophyll'},
    nfe: true,
  },
  Chimchar: {
    types: ['Fire'],
    bs: {hp: 44, at: 58, df: 44, sa: 58, sd: 44, sp: 61},
    weightkg: 6.2,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Chingling: {
    types: ['Psychic'],
    bs: {hp: 45, at: 30, df: 50, sa: 65, sd: 50, sp: 45},
    weightkg: 0.6,
    abilities: {0: 'Levitate'},
    nfe: true,
  },
  Colossoil: {
    types: ['Ground', 'Dark'],
    bs: {hp: 133, at: 122, df: 72, sa: 71, sd: 72, sp: 95},
    weightkg: 683.6,
    abilities: {0: 'Rebound'},
  },
  Combee: {
    types: ['Bug', 'Flying'],
    bs: {hp: 30, at: 30, df: 42, sa: 30, sd: 42, sp: 70},
    weightkg: 5.5,
    nfe: true,
    abilities: {0: 'Honey Gather'},
  },
  Cranidos: {
    types: ['Rock'],
    bs: {hp: 67, at: 125, df: 40, sa: 30, sd: 30, sp: 58},
    weightkg: 31.5,
    nfe: true,
    abilities: {0: 'Mold Breaker'},
  },
  Cresselia: {
    types: ['Psychic'],
    bs: {hp: 120, at: 70, df: 120, sa: 75, sd: 130, sp: 85},
    weightkg: 85.6,
    abilities: {0: 'Levitate'},
  },
  Croagunk: {
    types: ['Poison', 'Fighting'],
    bs: {hp: 48, at: 61, df: 40, sa: 61, sd: 40, sp: 50},
    weightkg: 23,
    nfe: true,
    abilities: {0: 'Anticipation'},
  },
  Cyclohm: {
    types: ['Electric', 'Dragon'],
    bs: {hp: 108, at: 60, df: 118, sa: 112, sd: 70, sp: 80},
    weightkg: 59,
    abilities: {0: 'Shield Dust'},
  },
  Darkrai: {
    types: ['Dark'],
    bs: {hp: 70, at: 90, df: 90, sa: 135, sd: 90, sp: 125},
    weightkg: 50.5,
    abilities: {0: 'Bad Dreams'},
    gender: 'N',
  },
  Dialga: {
    types: ['Steel', 'Dragon'],
    bs: {hp: 100, at: 120, df: 120, sa: 150, sd: 100, sp: 90},
    weightkg: 683,
    gender: 'N',
    abilities: {0: 'Pressure'},
  },
  Dorsoil: {
    types: ['Ground'],
    bs: {hp: 103, at: 72, df: 52, sa: 61, sd: 52, sp: 65},
    weightkg: 145,
    nfe: true,
    abilities: {0: 'Oblivious'},
  },
  Drapion: {
    types: ['Poison', 'Dark'],
    bs: {hp: 70, at: 90, df: 110, sa: 60, sd: 75, sp: 95},
    weightkg: 61.5,
    abilities: {0: 'Battle Armor'},
  },
  Drifblim: {
    types: ['Ghost', 'Flying'],
    bs: {hp: 150, at: 80, df: 44, sa: 90, sd: 54, sp: 80},
    weightkg: 15,
    abilities: {0: 'Aftermath'},
  },
  Drifloon: {
    types: ['Ghost', 'Flying'],
    bs: {hp: 90, at: 50, df: 34, sa: 60, sd: 44, sp: 70},
    weightkg: 1.2,
    nfe: true,
    abilities: {0: 'Aftermath'},
  },
  Duohm: {
    types: ['Electric', 'Dragon'],
    bs: {hp: 88, at: 40, df: 103, sa: 77, sd: 60, sp: 60},
    weightkg: 19.2,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Dusknoir: {
    types: ['Ghost'],
    bs: {hp: 45, at: 100, df: 135, sa: 65, sd: 135, sp: 45},
    weightkg: 106.6,
    abilities: {0: 'Pressure'},
  },
  Electivire: {
    types: ['Electric'],
    bs: {hp: 75, at: 123, df: 67, sa: 95, sd: 85, sp: 95},
    weightkg: 138.6,
    abilities: {0: 'Motor Drive'},
  },
  Embirch: {
    types: ['Fire', 'Grass'],
    bs: {hp: 60, at: 40, df: 55, sa: 65, sd: 40, sp: 60},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Reckless'},
  },
  Empoleon: {
    types: ['Water', 'Steel'],
    bs: {hp: 84, at: 86, df: 88, sa: 111, sd: 101, sp: 60},
    weightkg: 84.5,
    abilities: {0: 'Torrent'},
  },
  Fidgit: {
    types: ['Poison', 'Ground'],
    bs: {hp: 95, at: 76, df: 109, sa: 90, sd: 80, sp: 105},
    weightkg: 53,
    abilities: {0: 'Persistent'},
  },
  Finneon: {
    types: ['Water'],
    bs: {hp: 49, at: 49, df: 56, sa: 49, sd: 61, sp: 66},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Flarelm: {
    types: ['Fire', 'Grass'],
    bs: {hp: 90, at: 50, df: 95, sa: 75, sd: 70, sp: 40},
    weightkg: 73,
    nfe: true,
    abilities: {0: 'Rock Head'},
  },
  Floatzel: {
    types: ['Water'],
    bs: {hp: 85, at: 105, df: 55, sa: 85, sd: 50, sp: 115},
    weightkg: 33.5,
    abilities: {0: 'Swift Swim'},
  },
  Froslass: {
    types: ['Ice', 'Ghost'],
    bs: {hp: 70, at: 80, df: 70, sa: 80, sd: 70, sp: 110},
    weightkg: 26.6,
    abilities: {0: 'Snow Cloak'},
  },
  Gabite: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 68, at: 90, df: 65, sa: 50, sd: 55, sp: 82},
    weightkg: 56,
    nfe: true,
    abilities: {0: 'Sand Veil'},
  },
  Gallade: {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 68, at: 125, df: 65, sa: 65, sd: 115, sp: 80},
    weightkg: 52,
    abilities: {0: 'Steadfast'},
  },
  Garchomp: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 108, at: 130, df: 95, sa: 80, sd: 85, sp: 102},
    weightkg: 95,
    abilities: {0: 'Sand Veil'},
  },
  Gastrodon: {
    types: ['Water', 'Ground'],
    bs: {hp: 111, at: 83, df: 68, sa: 92, sd: 82, sp: 39},
    weightkg: 29.9,
    abilities: {0: 'Sticky Hold'},
  },
  Gible: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 58, at: 70, df: 45, sa: 40, sd: 45, sp: 42},
    weightkg: 20.5,
    nfe: true,
    abilities: {0: 'Sand Veil'},
  },
  Giratina: {
    types: ['Ghost', 'Dragon'],
    bs: {hp: 150, at: 100, df: 120, sa: 100, sd: 120, sp: 90},
    weightkg: 750,
    gender: 'N',
    otherFormes: ['Giratina-Origin'],
    abilities: {0: 'Pressure'},
  },
  'Giratina-Origin': {
    types: ['Ghost', 'Dragon'],
    bs: {hp: 150, at: 120, df: 100, sa: 120, sd: 100, sp: 90},
    weightkg: 650,
    gender: 'N',
    abilities: {0: 'Levitate'},
    baseSpecies: 'Giratina',
  },
  Glaceon: {
    types: ['Ice'],
    bs: {hp: 65, at: 60, df: 110, sa: 130, sd: 95, sp: 65},
    weightkg: 25.9,
    abilities: {0: 'Snow Cloak'},
  },
  Glameow: {
    types: ['Normal'],
    bs: {hp: 49, at: 55, df: 42, sa: 42, sd: 37, sp: 85},
    weightkg: 3.9,
    nfe: true,
    abilities: {0: 'Limber'},
  },
  Gliscor: {
    types: ['Ground', 'Flying'],
    bs: {hp: 75, at: 95, df: 125, sa: 45, sd: 75, sp: 95},
    weightkg: 42.5,
    abilities: {0: 'Hyper Cutter'},
  },
  Grotle: {
    types: ['Grass'],
    bs: {hp: 75, at: 89, df: 85, sa: 55, sd: 65, sp: 36},
    weightkg: 97,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Happiny: {
    types: ['Normal'],
    bs: {hp: 100, at: 5, df: 5, sa: 15, sd: 65, sp: 30},
    weightkg: 24.4,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  Heatran: {
    types: ['Fire', 'Steel'],
    bs: {hp: 91, at: 90, df: 106, sa: 130, sd: 106, sp: 77},
    weightkg: 430,
    abilities: {0: 'Flash Fire'},
  },
  Hippopotas: {
    types: ['Ground'],
    bs: {hp: 68, at: 72, df: 78, sa: 38, sd: 42, sp: 32},
    weightkg: 49.5,
    nfe: true,
    abilities: {0: 'Sand Stream'},
  },
  Hippowdon: {
    types: ['Ground'],
    bs: {hp: 108, at: 112, df: 118, sa: 68, sd: 72, sp: 47},
    weightkg: 300,
    abilities: {0: 'Sand Stream'},
  },
  Honchkrow: {
    types: ['Dark', 'Flying'],
    bs: {hp: 100, at: 125, df: 52, sa: 105, sd: 52, sp: 71},
    weightkg: 27.3,
    abilities: {0: 'Insomnia'},
  },
  Infernape: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 76, at: 104, df: 71, sa: 104, sd: 71, sp: 108},
    weightkg: 55,
    abilities: {0: 'Blaze'},
  },
  Kitsunoh: {
    types: ['Ghost', 'Steel'],
    bs: {hp: 80, at: 103, df: 85, sa: 55, sd: 80, sp: 120},
    weightkg: 51,
    abilities: {0: 'Frisk'},
  },
  Kricketot: {
    types: ['Bug'],
    bs: {hp: 37, at: 25, df: 41, sa: 25, sd: 41, sp: 25},
    weightkg: 2.2,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Kricketune: {
    types: ['Bug'],
    bs: {hp: 77, at: 85, df: 51, sa: 55, sd: 51, sp: 65},
    weightkg: 25.5,
    abilities: {0: 'Swarm'},
  },
  Krilowatt: {
    types: ['Electric', 'Water'],
    bs: {hp: 151, at: 84, df: 73, sa: 83, sd: 74, sp: 105},
    weightkg: 10.6,
    abilities: {0: 'Trace'},
  },
  Leafeon: {
    types: ['Grass'],
    bs: {hp: 65, at: 110, df: 130, sa: 60, sd: 65, sp: 95},
    weightkg: 25.5,
    abilities: {0: 'Leaf Guard'},
  },
  Lickilicky: {
    types: ['Normal'],
    bs: {hp: 110, at: 85, df: 95, sa: 80, sd: 95, sp: 50},
    weightkg: 140,
    abilities: {0: 'Own Tempo'},
  },
  Lopunny: {
    types: ['Normal'],
    bs: {hp: 65, at: 76, df: 84, sa: 54, sd: 96, sp: 105},
    weightkg: 33.3,
    abilities: {0: 'Cute Charm'},
  },
  Lucario: {
    types: ['Fighting', 'Steel'],
    bs: {hp: 70, at: 110, df: 70, sa: 115, sd: 70, sp: 90},
    weightkg: 54,
    abilities: {0: 'Steadfast'},
  },
  Lumineon: {
    types: ['Water'],
    bs: {hp: 69, at: 69, df: 76, sa: 69, sd: 86, sp: 91},
    weightkg: 24,
    abilities: {0: 'Swift Swim'},
  },
  Luxio: {
    types: ['Electric'],
    bs: {hp: 60, at: 85, df: 49, sa: 60, sd: 49, sp: 60},
    weightkg: 30.5,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Luxray: {
    types: ['Electric'],
    bs: {hp: 80, at: 120, df: 79, sa: 95, sd: 79, sp: 70},
    weightkg: 42,
    abilities: {0: 'Rivalry'},
  },
  Magmortar: {
    types: ['Fire'],
    bs: {hp: 75, at: 95, df: 67, sa: 125, sd: 95, sp: 83},
    weightkg: 68,
    abilities: {0: 'Flame Body'},
  },
  Magnezone: {
    types: ['Electric', 'Steel'],
    bs: {hp: 70, at: 70, df: 115, sa: 130, sd: 90, sp: 60},
    weightkg: 180,
    gender: 'N',
    abilities: {0: 'Magnet Pull'},
  },
  Mamoswine: {
    types: ['Ice', 'Ground'],
    bs: {hp: 110, at: 130, df: 80, sa: 70, sd: 60, sp: 80},
    weightkg: 291,
    abilities: {0: 'Oblivious'},
  },
  Manaphy: {
    types: ['Water'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 1.4,
    abilities: {0: 'Hydration'},
    gender: 'N',
  },
  Mantyke: {
    types: ['Water', 'Flying'],
    bs: {hp: 45, at: 20, df: 50, sa: 60, sd: 120, sp: 50},
    weightkg: 65,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Mesprit: {
    types: ['Psychic'],
    bs: {hp: 80, at: 105, df: 105, sa: 105, sd: 105, sp: 80},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  'Mime Jr.': {
    types: ['Psychic'],
    bs: {hp: 20, at: 25, df: 45, sa: 70, sd: 90, sp: 60},
    weightkg: 13,
    nfe: true,
    abilities: {0: 'Soundproof'},
  },
  Mismagius: {
    types: ['Ghost'],
    bs: {hp: 60, at: 60, df: 60, sa: 105, sd: 105, sp: 105},
    weightkg: 4.4,
    abilities: {0: 'Levitate'},
  },
  Monferno: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 64, at: 78, df: 52, sa: 78, sd: 52, sp: 81},
    weightkg: 22,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Monohm: {
    types: ['Electric'],
    bs: {hp: 53, at: 40, df: 58, sa: 67, sd: 55, sp: 55},
    weightkg: 4.1,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Mothim: {
    types: ['Bug', 'Flying'],
    bs: {hp: 70, at: 94, df: 50, sa: 94, sd: 50, sp: 66},
    weightkg: 23.3,
    abilities: {0: 'Swarm'},
  },
  Munchlax: {
    types: ['Normal'],
    bs: {hp: 135, at: 85, df: 40, sa: 40, sd: 85, sp: 5},
    weightkg: 105,
    nfe: true,
    abilities: {0: 'Pickup'},
  },
  Nohface: {
    types: ['Ghost'],
    bs: {hp: 50, at: 73, df: 50, sa: 30, sd: 50, sp: 80},
    weightkg: 5.9,
    nfe: true,
    abilities: {0: 'Frisk'},
  },
  Pachirisu: {
    types: ['Electric'],
    bs: {hp: 60, at: 45, df: 70, sa: 45, sd: 90, sp: 95},
    weightkg: 3.9,
    abilities: {0: 'Run Away'},
  },
  Palkia: {
    types: ['Water', 'Dragon'],
    bs: {hp: 90, at: 120, df: 100, sa: 150, sd: 120, sp: 100},
    weightkg: 336,
    gender: 'N',
    abilities: {0: 'Pressure'},
  },
  Phione: {
    types: ['Water'],
    bs: {hp: 80, at: 80, df: 80, sa: 80, sd: 80, sp: 80},
    weightkg: 3.1,
    abilities: {0: 'Hydration'},
    gender: 'N',
  },
  'Pichu-Spiky-eared': {
    types: ['Electric'],
    bs: {hp: 20, at: 40, df: 15, sa: 35, sd: 35, sp: 60},
    weightkg: 2,
    abilities: {0: 'Static'},
    baseSpecies: 'Pichu',
  },
  Piplup: {
    types: ['Water'],
    bs: {hp: 53, at: 51, df: 53, sa: 61, sd: 56, sp: 40},
    weightkg: 5.2,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  'Porygon-Z': {
    types: ['Normal'],
    bs: {hp: 85, at: 80, df: 70, sa: 135, sd: 75, sp: 90},
    weightkg: 34,
    gender: 'N',
    abilities: {0: 'Adaptability'},
  },
  Prinplup: {
    types: ['Water'],
    bs: {hp: 64, at: 66, df: 68, sa: 81, sd: 76, sp: 50},
    weightkg: 23,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Privatyke: {
    types: ['Water', 'Fighting'],
    bs: {hp: 65, at: 75, df: 65, sa: 40, sd: 60, sp: 45},
    weightkg: 35,
    nfe: true,
    abilities: {0: 'Unaware'},
  },
  Probopass: {
    types: ['Rock', 'Steel'],
    bs: {hp: 60, at: 55, df: 145, sa: 75, sd: 150, sp: 40},
    weightkg: 340,
    abilities: {0: 'Sturdy'},
  },
  Protowatt: {
    types: ['Electric', 'Water'],
    bs: {hp: 51, at: 44, df: 33, sa: 43, sd: 34, sp: 65},
    weightkg: 0.1,
    nfe: true,
    abilities: {0: 'Trace'},
  },
  Purugly: {
    types: ['Normal'],
    bs: {hp: 71, at: 82, df: 64, sa: 64, sd: 59, sp: 112},
    weightkg: 43.8,
    abilities: {0: 'Thick Fat'},
  },
  Pyroak: {
    types: ['Fire', 'Grass'],
    bs: {hp: 120, at: 70, df: 105, sa: 95, sd: 90, sp: 60},
    weightkg: 168,
    abilities: {0: 'Rock Head'},
  },
  Rampardos: {
    types: ['Rock'],
    bs: {hp: 97, at: 165, df: 60, sa: 65, sd: 50, sp: 58},
    weightkg: 102.5,
    abilities: {0: 'Mold Breaker'},
  },
  Rebble: {
    types: ['Rock'],
    bs: {hp: 45, at: 25, df: 65, sa: 75, sd: 55, sp: 80},
    weightkg: 7,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Regigigas: {
    types: ['Normal'],
    bs: {hp: 110, at: 160, df: 110, sa: 80, sd: 110, sp: 100},
    weightkg: 420,
    abilities: {0: 'Slow Start'},
    gender: 'N',
  },
  Revenankh: {
    types: ['Ghost', 'Fighting'],
    bs: {hp: 90, at: 105, df: 90, sa: 65, sd: 110, sp: 65},
    weightkg: 44,
    abilities: {0: 'Air Lock'},
  },
  Rhyperior: {
    types: ['Ground', 'Rock'],
    bs: {hp: 115, at: 140, df: 130, sa: 55, sd: 55, sp: 40},
    weightkg: 282.8,
    abilities: {0: 'Lightning Rod'},
  },
  Riolu: {
    types: ['Fighting'],
    bs: {hp: 40, at: 70, df: 40, sa: 35, sd: 40, sp: 60},
    weightkg: 20.2,
    nfe: true,
    abilities: {0: 'Steadfast'},
  },
  Roserade: {
    types: ['Grass', 'Poison'],
    bs: {hp: 60, at: 70, df: 55, sa: 125, sd: 105, sp: 90},
    weightkg: 14.5,
    abilities: {0: 'Natural Cure'},
  },
  Rotom: {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 50, df: 77, sa: 95, sd: 77, sp: 91},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
    otherFormes: ['Rotom-Fan', 'Rotom-Frost', 'Rotom-Heat', 'Rotom-Mow', 'Rotom-Wash'],
  },
  'Rotom-Mow': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
    baseSpecies: 'Rotom',
  },
  'Rotom-Frost': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
    baseSpecies: 'Rotom',
  },
  'Rotom-Heat': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
    baseSpecies: 'Rotom',
  },
  'Rotom-Fan': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
    baseSpecies: 'Rotom',
  },
  'Rotom-Wash': {
    types: ['Electric', 'Ghost'],
    bs: {hp: 50, at: 65, df: 107, sa: 105, sd: 107, sp: 86},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
    baseSpecies: 'Rotom',
  },
  Shaymin: {
    types: ['Grass'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 2.1,
    abilities: {0: 'Natural Cure'},
    gender: 'N',
    otherFormes: ['Shaymin-Sky'],
  },
  'Shaymin-Sky': {
    types: ['Grass', 'Flying'],
    bs: {hp: 100, at: 103, df: 75, sa: 120, sd: 75, sp: 127},
    weightkg: 5.2,
    abilities: {0: 'Serene Grace'},
    gender: 'N',
    baseSpecies: 'Shaymin',
  },
  Shellos: {
    types: ['Water'],
    bs: {hp: 76, at: 48, df: 48, sa: 57, sd: 62, sp: 34},
    weightkg: 6.3,
    nfe: true,
    abilities: {0: 'Sticky Hold'},
  },
  Shieldon: {
    types: ['Rock', 'Steel'],
    bs: {hp: 30, at: 42, df: 118, sa: 42, sd: 88, sp: 30},
    weightkg: 57,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Shinx: {
    types: ['Electric'],
    bs: {hp: 45, at: 65, df: 34, sa: 40, sd: 34, sp: 45},
    weightkg: 9.5,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Shox: {
    types: ['Electric', 'Normal'],
    bs: {hp: 136, at: 73, df: 81, sa: 90, sd: 98, sp: 56},
    weightkg: 99.9,
    abilities: {0: 'Electromorphosis'},
  },
  Skorupi: {
    types: ['Poison', 'Bug'],
    bs: {hp: 40, at: 50, df: 90, sa: 30, sd: 55, sp: 65},
    weightkg: 12,
    nfe: true,
    abilities: {0: 'Battle Armor'},
  },
  Skuntank: {
    types: ['Poison', 'Dark'],
    bs: {hp: 103, at: 93, df: 67, sa: 71, sd: 61, sp: 84},
    weightkg: 38,
    abilities: {0: 'Stench'},
  },
  Snover: {
    types: ['Grass', 'Ice'],
    bs: {hp: 60, at: 62, df: 50, sa: 62, sd: 60, sp: 40},
    weightkg: 50.5,
    nfe: true,
    abilities: {0: 'Snow Warning'},
  },
  Spiritomb: {
    types: ['Ghost', 'Dark'],
    bs: {hp: 50, at: 92, df: 108, sa: 92, sd: 108, sp: 35},
    weightkg: 108,
    abilities: {0: 'Pressure'},
  },
  Staraptor: {
    types: ['Normal', 'Flying'],
    bs: {hp: 85, at: 120, df: 70, sa: 50, sd: 50, sp: 100},
    weightkg: 24.9,
    abilities: {0: 'Intimidate'},
  },
  Staravia: {
    types: ['Normal', 'Flying'],
    bs: {hp: 55, at: 75, df: 50, sa: 40, sd: 40, sp: 80},
    weightkg: 15.5,
    nfe: true,
    abilities: {0: 'Intimidate'},
  },
  Starly: {
    types: ['Normal', 'Flying'],
    bs: {hp: 40, at: 55, df: 30, sa: 30, sd: 30, sp: 60},
    weightkg: 2,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Stratagem: {
    types: ['Rock'],
    bs: {hp: 90, at: 60, df: 65, sa: 120, sd: 70, sp: 130},
    weightkg: 45,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Stunky: {
    types: ['Poison', 'Dark'],
    bs: {hp: 63, at: 63, df: 47, sa: 41, sd: 41, sp: 74},
    weightkg: 19.2,
    nfe: true,
    abilities: {0: 'Stench'},
  },
  Syclant: {
    types: ['Ice', 'Bug'],
    bs: {hp: 70, at: 116, df: 70, sa: 114, sd: 64, sp: 121},
    weightkg: 52,
    abilities: {0: 'Compound Eyes'},
  },
  Syclar: {
    types: ['Ice', 'Bug'],
    bs: {hp: 40, at: 76, df: 45, sa: 74, sd: 39, sp: 91},
    weightkg: 4,
    nfe: true,
    abilities: {0: 'Compound Eyes'},
  },
  Tactite: {
    types: ['Rock'],
    bs: {hp: 70, at: 40, df: 65, sa: 100, sd: 65, sp: 95},
    weightkg: 16,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  Tangrowth: {
    types: ['Grass'],
    bs: {hp: 100, at: 100, df: 125, sa: 110, sd: 50, sp: 50},
    weightkg: 128.6,
    abilities: {0: 'Chlorophyll'},
  },
  Togekiss: {
    types: ['Normal', 'Flying'],
    bs: {hp: 85, at: 50, df: 95, sa: 120, sd: 115, sp: 80},
    weightkg: 38,
    abilities: {0: 'Hustle'},
  },
  Torterra: {
    types: ['Grass', 'Ground'],
    bs: {hp: 95, at: 109, df: 105, sa: 75, sd: 85, sp: 56},
    weightkg: 310,
    abilities: {0: 'Overgrow'},
  },
  Toxicroak: {
    types: ['Poison', 'Fighting'],
    bs: {hp: 83, at: 106, df: 65, sa: 86, sd: 65, sp: 85},
    weightkg: 44.4,
    abilities: {0: 'Anticipation'},
  },
  Turtwig: {
    types: ['Grass'],
    bs: {hp: 55, at: 68, df: 64, sa: 45, sd: 55, sp: 31},
    weightkg: 10.2,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Uxie: {
    types: ['Psychic'],
    bs: {hp: 75, at: 75, df: 130, sa: 75, sd: 130, sp: 95},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  Vespiquen: {
    types: ['Bug', 'Flying'],
    bs: {hp: 70, at: 80, df: 102, sa: 80, sd: 102, sp: 40},
    weightkg: 38.5,
    abilities: {0: 'Pressure'},
  },
  Voodoll: {
    types: ['Normal', 'Dark'],
    bs: {hp: 55, at: 40, df: 55, sa: 75, sd: 50, sp: 70},
    weightkg: 25,
    nfe: true,
    abilities: {0: 'Volt Absorb'},
  },
  Voodoom: {
    types: ['Fighting', 'Dark'],
    bs: {hp: 90, at: 85, df: 80, sa: 105, sd: 80, sp: 110},
    weightkg: 75.5,
    abilities: {0: 'Volt Absorb'},
  },
  Weavile: {
    types: ['Dark', 'Ice'],
    bs: {hp: 70, at: 120, df: 65, sa: 45, sd: 85, sp: 125},
    weightkg: 34,
    abilities: {0: 'Pressure'},
  },
  Wormadam: {
    types: ['Bug', 'Grass'],
    bs: {hp: 60, at: 59, df: 85, sa: 79, sd: 105, sp: 36},
    weightkg: 6.5,
    abilities: {0: 'Anticipation'},
    otherFormes: ['Wormadam-Sandy', 'Wormadam-Trash'],
  },
  'Wormadam-Sandy': {
    types: ['Bug', 'Ground'],
    bs: {hp: 60, at: 79, df: 105, sa: 59, sd: 85, sp: 36},
    weightkg: 6.5,
    abilities: {0: 'Anticipation'},
    baseSpecies: 'Wormadam',
  },
  'Wormadam-Trash': {
    types: ['Bug', 'Steel'],
    bs: {hp: 60, at: 69, df: 95, sa: 69, sd: 95, sp: 36},
    weightkg: 6.5,
    abilities: {0: 'Anticipation'},
    baseSpecies: 'Wormadam',
  },
  Yanmega: {
    types: ['Bug', 'Flying'],
    bs: {hp: 86, at: 76, df: 86, sa: 116, sd: 56, sp: 95},
    weightkg: 51.5,
    abilities: {0: 'Speed Boost'},
  },
};

const DPP: {[name: string]: SpeciesData} = extend(true, {}, ADV, DPP_PATCH);

const BW_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Rotom-Fan': {types: ['Electric', 'Flying']},
  'Rotom-Frost': {types: ['Electric', 'Ice']},
  'Rotom-Heat': {types: ['Electric', 'Fire']},
  'Rotom-Mow': {types: ['Electric', 'Grass']},
  'Rotom-Wash': {types: ['Electric', 'Water']},
  Accelgor: {
    types: ['Bug'],
    bs: {hp: 80, at: 70, df: 40, sa: 100, sd: 60, sp: 145},
    weightkg: 25.3,
    abilities: {0: 'Hydration'},
  },
  Alomomola: {
    types: ['Water'],
    bs: {hp: 165, at: 75, df: 80, sa: 40, sd: 45, sp: 65},
    weightkg: 31.6,
    abilities: {0: 'Healer'},
  },
  Amoonguss: {
    types: ['Grass', 'Poison'],
    bs: {hp: 114, at: 85, df: 70, sa: 85, sd: 80, sp: 30},
    weightkg: 10.5,
    abilities: {0: 'Effect Spore'},
  },
  Archen: {
    types: ['Rock', 'Flying'],
    bs: {hp: 55, at: 112, df: 45, sa: 74, sd: 45, sp: 70},
    weightkg: 9.5,
    abilities: {0: 'Defeatist'},
    nfe: true,
  },
  Archeops: {
    types: ['Rock', 'Flying'],
    bs: {hp: 75, at: 140, df: 65, sa: 112, sd: 65, sp: 110},
    weightkg: 32,
    abilities: {0: 'Defeatist'},
  },
  Argalis: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 60, at: 90, df: 89, sa: 87, sd: 40, sp: 54},
    weightkg: 341.4,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Audino: {
    types: ['Normal'],
    bs: {hp: 103, at: 60, df: 86, sa: 60, sd: 86, sp: 50},
    weightkg: 31,
    abilities: {0: 'Healer'},
  },
  Aurumoth: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 110, at: 120, df: 99, sa: 117, sd: 60, sp: 94},
    weightkg: 193,
    abilities: {0: 'Weak Armor'},
  },
  Axew: {
    types: ['Dragon'],
    bs: {hp: 46, at: 87, df: 60, sa: 30, sd: 40, sp: 57},
    weightkg: 18,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Basculin: {
    types: ['Water'],
    bs: {hp: 70, at: 92, df: 65, sa: 80, sd: 55, sp: 98},
    weightkg: 18,
    abilities: {0: 'Reckless'},
    otherFormes: ['Basculin-Blue-Striped'],
  },
  'Basculin-Blue-Striped': {
    types: ['Water'],
    bs: {hp: 70, at: 92, df: 65, sa: 80, sd: 55, sp: 98},
    weightkg: 18,
    abilities: {0: 'Rock Head'},
    baseSpecies: 'Basculin',
  },
  Beartic: {
    types: ['Ice'],
    bs: {hp: 95, at: 110, df: 80, sa: 70, sd: 80, sp: 50},
    weightkg: 260,
    abilities: {0: 'Snow Cloak'},
  },
  Beheeyem: {
    types: ['Psychic'],
    bs: {hp: 75, at: 75, df: 75, sa: 125, sd: 95, sp: 40},
    weightkg: 34.5,
    abilities: {0: 'Telepathy'},
  },
  Bisharp: {
    types: ['Dark', 'Steel'],
    bs: {hp: 65, at: 125, df: 100, sa: 60, sd: 70, sp: 70},
    weightkg: 70,
    abilities: {0: 'Defiant'},
  },
  Blitzle: {
    types: ['Electric'],
    bs: {hp: 45, at: 60, df: 32, sa: 50, sd: 32, sp: 76},
    weightkg: 29.8,
    nfe: true,
    abilities: {0: 'Lightning Rod'},
  },
  Boldore: {
    types: ['Rock'],
    bs: {hp: 70, at: 105, df: 105, sa: 50, sd: 40, sp: 20},
    weightkg: 102,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Bouffalant: {
    types: ['Normal'],
    bs: {hp: 95, at: 110, df: 95, sa: 40, sd: 95, sp: 55},
    weightkg: 94.6,
    abilities: {0: 'Reckless'},
  },
  Brattler: {
    types: ['Dark', 'Grass'],
    bs: {hp: 80, at: 70, df: 40, sa: 20, sd: 90, sp: 30},
    weightkg: 11.5,
    nfe: true,
    abilities: {0: 'Harvest'},
  },
  Braviary: {
    types: ['Normal', 'Flying'],
    bs: {hp: 100, at: 123, df: 75, sa: 57, sd: 75, sp: 80},
    weightkg: 41,
    abilities: {0: 'Keen Eye'},
  },
  Carracosta: {
    types: ['Water', 'Rock'],
    bs: {hp: 74, at: 108, df: 133, sa: 83, sd: 65, sp: 32},
    weightkg: 81,
    abilities: {0: 'Solid Rock'},
  },
  Cawdet: {
    types: ['Steel', 'Flying'],
    bs: {hp: 35, at: 72, df: 85, sa: 40, sd: 55, sp: 88},
    weightkg: 25,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Cawmodore: {
    types: ['Steel', 'Flying'],
    bs: {hp: 50, at: 92, df: 130, sa: 65, sd: 75, sp: 118},
    weightkg: 37,
    abilities: {0: 'Intimidate'},
  },
  Chandelure: {
    types: ['Ghost', 'Fire'],
    bs: {hp: 60, at: 55, df: 90, sa: 145, sd: 90, sp: 80},
    weightkg: 34.3,
    abilities: {0: 'Flash Fire'},
  },
  Chuggalong: {
    types: ['Dragon', 'Poison'],
    bs: {hp: 45, at: 46, df: 117, sa: 120, sd: 110, sp: 108},
    weightkg: 201.6,
    abilities: {0: 'Armor Tail'},
  },
  Cinccino: {
    types: ['Normal'],
    bs: {hp: 75, at: 95, df: 60, sa: 65, sd: 60, sp: 115},
    weightkg: 7.5,
    abilities: {0: 'Cute Charm'},
  },
  Cobalion: {
    types: ['Steel', 'Fighting'],
    bs: {hp: 91, at: 90, df: 129, sa: 90, sd: 72, sp: 108},
    weightkg: 250,
    abilities: {0: 'Justified'},
    gender: 'N',
  },
  Cofagrigus: {
    types: ['Ghost'],
    bs: {hp: 58, at: 50, df: 145, sa: 95, sd: 105, sp: 30},
    weightkg: 153.0,
    abilities: {0: 'Mummy'},
  },
  Conkeldurr: {
    types: ['Fighting'],
    bs: {hp: 105, at: 140, df: 95, sa: 55, sd: 65, sp: 45},
    weightkg: 87,
    abilities: {0: 'Guts'},
  },
  Cottonee: {
    types: ['Grass'],
    bs: {hp: 40, at: 27, df: 60, sa: 37, sd: 50, sp: 66},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Prankster'},
  },
  Crustle: {
    types: ['Bug', 'Rock'],
    bs: {hp: 70, at: 95, df: 125, sa: 65, sd: 75, sp: 45},
    weightkg: 200,
    abilities: {0: 'Sturdy'},
  },
  Cryogonal: {
    types: ['Ice'],
    bs: {hp: 70, at: 50, df: 30, sa: 95, sd: 135, sp: 105},
    weightkg: 148,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  Cubchoo: {
    types: ['Ice'],
    bs: {hp: 55, at: 70, df: 40, sa: 60, sd: 40, sp: 40},
    weightkg: 8.5,
    nfe: true,
    abilities: {0: 'Snow Cloak'},
  },
  Cupra: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 50, at: 60, df: 49, sa: 67, sd: 30, sp: 44},
    weightkg: 4.8,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Darmanitan: {
    types: ['Fire'],
    bs: {hp: 105, at: 140, df: 55, sa: 30, sd: 55, sp: 95},
    weightkg: 92.9,
    abilities: {0: 'Sheer Force'},
    otherFormes: ['Darmanitan-Zen'],
  },
  'Darmanitan-Zen': {
    types: ['Fire', 'Psychic'],
    bs: {hp: 105, at: 30, df: 105, sa: 140, sd: 105, sp: 55},
    weightkg: 92.9,
    baseSpecies: 'Darmanitan',
    abilities: {0: 'Zen Mode'},
  },
  Darumaka: {
    types: ['Fire'],
    bs: {hp: 70, at: 90, df: 45, sa: 15, sd: 45, sp: 50},
    weightkg: 37.5,
    nfe: true,
    abilities: {0: 'Hustle'},
  },
  Deerling: {
    types: ['Normal', 'Grass'],
    bs: {hp: 60, at: 60, df: 50, sa: 40, sd: 50, sp: 75},
    weightkg: 19.5,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Deino: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 52, at: 65, df: 50, sa: 45, sd: 50, sp: 38},
    weightkg: 17.3,
    abilities: {0: 'Hustle'},
    nfe: true,
  },
  Dewott: {
    types: ['Water'],
    bs: {hp: 75, at: 75, df: 60, sa: 83, sd: 60, sp: 60},
    weightkg: 24.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Drilbur: {
    types: ['Ground'],
    bs: {hp: 60, at: 85, df: 40, sa: 30, sd: 45, sp: 68},
    weightkg: 8.5,
    nfe: true,
    abilities: {0: 'Sand Rush'},
  },
  Druddigon: {
    types: ['Dragon'],
    bs: {hp: 77, at: 120, df: 90, sa: 60, sd: 90, sp: 48},
    weightkg: 139,
    abilities: {0: 'Rough Skin'},
  },
  Ducklett: {
    types: ['Water', 'Flying'],
    bs: {hp: 62, at: 44, df: 50, sa: 44, sd: 50, sp: 55},
    weightkg: 5.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Duosion: {
    types: ['Psychic'],
    bs: {hp: 65, at: 40, df: 50, sa: 125, sd: 60, sp: 30},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Overcoat'},
  },
  Durant: {
    types: ['Bug', 'Steel'],
    bs: {hp: 58, at: 109, df: 112, sa: 48, sd: 48, sp: 109},
    weightkg: 33,
    abilities: {0: 'Swarm'},
  },
  Dwebble: {
    types: ['Bug', 'Rock'],
    bs: {hp: 50, at: 65, df: 85, sa: 35, sd: 35, sp: 55},
    weightkg: 14.5,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Eelektrik: {
    types: ['Electric'],
    bs: {hp: 65, at: 85, df: 70, sa: 75, sd: 70, sp: 40},
    weightkg: 22,
    abilities: {0: 'Levitate'},
    nfe: true,
  },
  Eelektross: {
    types: ['Electric'],
    bs: {hp: 85, at: 115, df: 80, sa: 105, sd: 80, sp: 50},
    weightkg: 80.5,
    abilities: {0: 'Levitate'},
  },
  Elgyem: {
    types: ['Psychic'],
    bs: {hp: 55, at: 55, df: 55, sa: 85, sd: 55, sp: 30},
    weightkg: 9,
    nfe: true,
    abilities: {0: 'Telepathy'},
  },
  Emboar: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 110, at: 123, df: 65, sa: 100, sd: 65, sp: 65},
    weightkg: 150,
    abilities: {0: 'Blaze'},
  },
  Emolga: {
    types: ['Electric', 'Flying'],
    bs: {hp: 55, at: 75, df: 60, sa: 75, sd: 60, sp: 103},
    weightkg: 5,
    abilities: {0: 'Static'},
  },
  Escavalier: {
    types: ['Bug', 'Steel'],
    bs: {hp: 70, at: 135, df: 105, sa: 60, sd: 105, sp: 20},
    weightkg: 33,
    abilities: {0: 'Swarm'},
  },
  Excadrill: {
    types: ['Ground', 'Steel'],
    bs: {hp: 110, at: 135, df: 60, sa: 50, sd: 65, sp: 88},
    weightkg: 40.4,
    abilities: {0: 'Sand Rush'},
  },
  Ferroseed: {
    types: ['Grass', 'Steel'],
    bs: {hp: 44, at: 50, df: 91, sa: 24, sd: 86, sp: 10},
    weightkg: 18.8,
    nfe: true,
    abilities: {0: 'Iron Barbs'},
  },
  Ferrothorn: {
    types: ['Grass', 'Steel'],
    bs: {hp: 74, at: 94, df: 131, sa: 54, sd: 116, sp: 20},
    weightkg: 110,
    abilities: {0: 'Iron Barbs'},
  },
  Foongus: {
    types: ['Grass', 'Poison'],
    bs: {hp: 69, at: 55, df: 45, sa: 55, sd: 55, sp: 15},
    weightkg: 1,
    nfe: true,
    abilities: {0: 'Effect Spore'},
  },
  Fraxure: {
    types: ['Dragon'],
    bs: {hp: 66, at: 117, df: 70, sa: 40, sd: 50, sp: 67},
    weightkg: 36,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Frillish: {
    types: ['Water', 'Ghost'],
    bs: {hp: 55, at: 40, df: 50, sa: 65, sd: 85, sp: 40},
    weightkg: 33,
    nfe: true,
    abilities: {0: 'Water Absorb'},
  },
  Galvantula: {
    types: ['Bug', 'Electric'],
    bs: {hp: 70, at: 77, df: 60, sa: 97, sd: 60, sp: 108},
    weightkg: 14.3,
    abilities: {0: 'Compound Eyes'},
  },
  Garbodor: {
    types: ['Poison'],
    bs: {hp: 80, at: 95, df: 82, sa: 60, sd: 82, sp: 75},
    weightkg: 107.3,
    abilities: {0: 'Stench'},
  },
  Genesect: {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    abilities: {0: 'Download'},
    gender: 'N',
    otherFormes: ['Genesect-Burn', 'Genesect-Chill', 'Genesect-Douse', 'Genesect-Shock'],
  },
  'Genesect-Burn': {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    abilities: {0: 'Download'},
    gender: 'N',
    baseSpecies: 'Genesect',
  },
  'Genesect-Chill': {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    abilities: {0: 'Download'},
    gender: 'N',
    baseSpecies: 'Genesect',
  },
  'Genesect-Douse': {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    abilities: {0: 'Download'},
    gender: 'N',
    baseSpecies: 'Genesect',
  },
  'Genesect-Shock': {
    types: ['Bug', 'Steel'],
    bs: {hp: 71, at: 120, df: 95, sa: 120, sd: 95, sp: 99},
    weightkg: 82.5,
    abilities: {0: 'Download'},
    gender: 'N',
    baseSpecies: 'Genesect',
  },
  Gigalith: {
    types: ['Rock'],
    bs: {hp: 85, at: 135, df: 130, sa: 60, sd: 70, sp: 25},
    weightkg: 260,
    abilities: {0: 'Sturdy'},
  },
  Golett: {
    types: ['Ground', 'Ghost'],
    bs: {hp: 59, at: 74, df: 50, sa: 35, sd: 50, sp: 35},
    weightkg: 92,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Iron Fist'},
  },
  Golurk: {
    types: ['Ground', 'Ghost'],
    bs: {hp: 89, at: 124, df: 80, sa: 55, sd: 80, sp: 55},
    weightkg: 330,
    gender: 'N',
    abilities: {0: 'Iron Fist'},
  },
  Gothita: {
    types: ['Psychic'],
    bs: {hp: 45, at: 30, df: 50, sa: 55, sd: 65, sp: 45},
    weightkg: 5.8,
    nfe: true,
    abilities: {0: 'Frisk'},
  },
  Gothitelle: {
    types: ['Psychic'],
    bs: {hp: 70, at: 55, df: 95, sa: 95, sd: 110, sp: 65},
    weightkg: 44,
    abilities: {0: 'Frisk'},
  },
  Gothorita: {
    types: ['Psychic'],
    bs: {hp: 60, at: 45, df: 70, sa: 75, sd: 85, sp: 55},
    weightkg: 18,
    nfe: true,
    abilities: {0: 'Frisk'},
  },
  Gurdurr: {
    types: ['Fighting'],
    bs: {hp: 85, at: 105, df: 85, sa: 40, sd: 50, sp: 40},
    weightkg: 40,
    nfe: true,
    abilities: {0: 'Guts'},
  },
  Haxorus: {
    types: ['Dragon'],
    bs: {hp: 76, at: 147, df: 90, sa: 60, sd: 70, sp: 97},
    weightkg: 105.5,
    abilities: {0: 'Rivalry'},
  },
  Heatmor: {
    types: ['Fire'],
    bs: {hp: 85, at: 97, df: 66, sa: 105, sd: 66, sp: 65},
    weightkg: 58,
    abilities: {0: 'Gluttony'},
  },
  Herdier: {
    types: ['Normal'],
    bs: {hp: 65, at: 80, df: 65, sa: 35, sd: 65, sp: 60},
    weightkg: 14.7,
    nfe: true,
    abilities: {0: 'Intimidate'},
  },
  Hydreigon: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 92, at: 105, df: 90, sa: 125, sd: 90, sp: 98},
    weightkg: 160,
    abilities: {0: 'Levitate'},
  },
  Jellicent: {
    types: ['Water', 'Ghost'],
    bs: {hp: 100, at: 60, df: 70, sa: 85, sd: 105, sp: 60},
    weightkg: 135,
    abilities: {0: 'Water Absorb'},
  },
  Joltik: {
    types: ['Bug', 'Electric'],
    bs: {hp: 50, at: 47, df: 50, sa: 57, sd: 50, sp: 65},
    weightkg: 0.6,
    nfe: true,
    abilities: {0: 'Compound Eyes'},
  },
  Karrablast: {
    types: ['Bug'],
    bs: {hp: 50, at: 75, df: 45, sa: 40, sd: 45, sp: 60},
    weightkg: 5.9,
    nfe: true,
    abilities: {0: 'Swarm'},
  },
  Keldeo: {
    types: ['Water', 'Fighting'],
    bs: {hp: 91, at: 72, df: 90, sa: 129, sd: 90, sp: 108},
    weightkg: 48.5,
    abilities: {0: 'Justified'},
    gender: 'N',
    otherFormes: ['Keldeo-Resolute'],
  },
  'Keldeo-Resolute': {
    types: ['Water', 'Fighting'],
    bs: {hp: 91, at: 72, df: 90, sa: 129, sd: 90, sp: 108},
    weightkg: 48.5,
    abilities: {0: 'Justified'},
    gender: 'N',
    baseSpecies: 'Keldeo',
  },
  Klang: {
    types: ['Steel'],
    bs: {hp: 60, at: 80, df: 95, sa: 70, sd: 85, sp: 50},
    weightkg: 51,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Plus'},
  },
  Klink: {
    types: ['Steel'],
    bs: {hp: 40, at: 55, df: 70, sa: 45, sd: 60, sp: 30},
    weightkg: 21,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Plus'},
  },
  Klinklang: {
    types: ['Steel'],
    bs: {hp: 60, at: 100, df: 115, sa: 70, sd: 85, sp: 90},
    weightkg: 81,
    gender: 'N',
    abilities: {0: 'Plus'},
  },
  Krokorok: {
    types: ['Ground', 'Dark'],
    bs: {hp: 60, at: 82, df: 45, sa: 45, sd: 45, sp: 74},
    weightkg: 33.4,
    nfe: true,
    abilities: {0: 'Intimidate'},
  },
  Krookodile: {
    types: ['Ground', 'Dark'],
    bs: {hp: 95, at: 117, df: 70, sa: 65, sd: 70, sp: 92},
    weightkg: 96.3,
    abilities: {0: 'Intimidate'},
  },
  Kyurem: {
    types: ['Dragon', 'Ice'],
    bs: {hp: 125, at: 130, df: 90, sa: 130, sd: 90, sp: 95},
    weightkg: 325,
    abilities: {0: 'Pressure'},
    gender: 'N',
    otherFormes: ['Kyurem-Black', 'Kyurem-White'],
  },
  'Kyurem-Black': {
    types: ['Dragon', 'Ice'],
    bs: {hp: 125, at: 170, df: 100, sa: 120, sd: 90, sp: 95},
    weightkg: 325,
    abilities: {0: 'Teravolt'},
    gender: 'N',
    baseSpecies: 'Kyurem',
  },
  'Kyurem-White': {
    types: ['Dragon', 'Ice'],
    bs: {hp: 125, at: 120, df: 90, sa: 170, sd: 100, sp: 95},
    weightkg: 325,
    abilities: {0: 'Turboblaze'},
    gender: 'N',
    baseSpecies: 'Kyurem',
  },
  Lampent: {
    types: ['Ghost', 'Fire'],
    bs: {hp: 60, at: 40, df: 60, sa: 95, sd: 60, sp: 55},
    weightkg: 13,
    nfe: true,
    abilities: {0: 'Flash Fire'},
  },
  Landorus: {
    types: ['Ground', 'Flying'],
    bs: {hp: 89, at: 125, df: 90, sa: 115, sd: 80, sp: 101},
    weightkg: 68,
    abilities: {0: 'Sand Force'},
    otherFormes: ['Landorus-Therian'],
  },
  'Landorus-Therian': {
    types: ['Ground', 'Flying'],
    bs: {hp: 89, at: 145, df: 90, sa: 105, sd: 80, sp: 91},
    weightkg: 68,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Landorus',
  },
  Larvesta: {
    types: ['Bug', 'Fire'],
    bs: {hp: 55, at: 85, df: 55, sa: 50, sd: 55, sp: 60},
    weightkg: 28.8,
    nfe: true,
    abilities: {0: 'Flame Body'},
  },
  Leavanny: {
    types: ['Bug', 'Grass'],
    bs: {hp: 75, at: 103, df: 80, sa: 70, sd: 70, sp: 92},
    weightkg: 20.5,
    abilities: {0: 'Swarm'},
  },
  Liepard: {
    types: ['Dark'],
    bs: {hp: 64, at: 88, df: 50, sa: 88, sd: 50, sp: 106},
    weightkg: 37.5,
    abilities: {0: 'Limber'},
  },
  Lilligant: {
    types: ['Grass'],
    bs: {hp: 70, at: 60, df: 75, sa: 110, sd: 75, sp: 90},
    weightkg: 16.3,
    abilities: {0: 'Chlorophyll'},
  },
  Lillipup: {
    types: ['Normal'],
    bs: {hp: 45, at: 60, df: 45, sa: 25, sd: 45, sp: 55},
    weightkg: 4.1,
    nfe: true,
    abilities: {0: 'Vital Spirit'},
  },
  Litwick: {
    types: ['Ghost', 'Fire'],
    bs: {hp: 50, at: 30, df: 55, sa: 65, sd: 55, sp: 20},
    weightkg: 3.1,
    nfe: true,
    abilities: {0: 'Flash Fire'},
  },
  Malaconda: {
    types: ['Dark', 'Grass'],
    bs: {hp: 115, at: 100, df: 60, sa: 40, sd: 130, sp: 55},
    weightkg: 108.8,
    abilities: {0: 'Harvest'},
  },
  Mandibuzz: {
    types: ['Dark', 'Flying'],
    bs: {hp: 110, at: 65, df: 105, sa: 55, sd: 95, sp: 80},
    weightkg: 39.5,
    abilities: {0: 'Big Pecks'},
  },
  Maractus: {
    types: ['Grass'],
    bs: {hp: 75, at: 86, df: 67, sa: 106, sd: 67, sp: 60},
    weightkg: 28,
    abilities: {0: 'Water Absorb'},
  },
  Meloetta: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 100, at: 77, df: 77, sa: 128, sd: 128, sp: 90},
    weightkg: 6.5,
    abilities: {0: 'Serene Grace'},
    otherFormes: ['Meloetta-Pirouette'],
    gender: 'N',
  },
  'Meloetta-Pirouette': {
    types: ['Normal', 'Fighting'],
    bs: {hp: 100, at: 128, df: 90, sa: 77, sd: 77, sp: 128},
    weightkg: 6.5,
    abilities: {0: 'Serene Grace'},
    baseSpecies: 'Meloetta',
    gender: 'N',
  },
  Mienfoo: {
    types: ['Fighting'],
    bs: {hp: 45, at: 85, df: 50, sa: 55, sd: 50, sp: 65},
    weightkg: 20,
    nfe: true,
    abilities: {0: 'Inner Focus'},
  },
  Mienshao: {
    types: ['Fighting'],
    bs: {hp: 65, at: 125, df: 60, sa: 95, sd: 60, sp: 105},
    weightkg: 35.5,
    abilities: {0: 'Inner Focus'},
  },
  Minccino: {
    types: ['Normal'],
    bs: {hp: 55, at: 50, df: 40, sa: 40, sd: 40, sp: 75},
    weightkg: 5.8,
    nfe: true,
    abilities: {0: 'Cute Charm'},
  },
  Mollux: {
    types: ['Fire', 'Poison'],
    bs: {hp: 95, at: 45, df: 83, sa: 131, sd: 105, sp: 76},
    weightkg: 41,
    abilities: {0: 'Dry Skin'},
  },
  Munna: {
    types: ['Psychic'],
    bs: {hp: 76, at: 25, df: 45, sa: 67, sd: 55, sp: 24},
    weightkg: 23.3,
    nfe: true,
    abilities: {0: 'Forewarn'},
  },
  Musharna: {
    types: ['Psychic'],
    bs: {hp: 116, at: 55, df: 85, sa: 107, sd: 95, sp: 29},
    weightkg: 60.5,
    abilities: {0: 'Forewarn'},
  },
  Necturine: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 49, at: 55, df: 60, sa: 50, sd: 75, sp: 51},
    weightkg: 1.8,
    nfe: true,
    abilities: {0: 'Anticipation'},
  },
  Necturna: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 64, at: 120, df: 100, sa: 85, sd: 120, sp: 81},
    weightkg: 49.6,
    abilities: {0: 'Forewarn'},
  },
  Oshawott: {
    types: ['Water'],
    bs: {hp: 55, at: 55, df: 45, sa: 63, sd: 45, sp: 45},
    weightkg: 5.9,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Palpitoad: {
    types: ['Water', 'Ground'],
    bs: {hp: 75, at: 65, df: 55, sa: 65, sd: 55, sp: 69},
    weightkg: 17,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Panpour: {
    types: ['Water'],
    bs: {hp: 50, at: 53, df: 48, sa: 53, sd: 48, sp: 64},
    weightkg: 13.5,
    nfe: true,
    abilities: {0: 'Gluttony'},
  },
  Pansage: {
    types: ['Grass'],
    bs: {hp: 50, at: 53, df: 48, sa: 53, sd: 48, sp: 64},
    weightkg: 10.5,
    nfe: true,
    abilities: {0: 'Gluttony'},
  },
  Pansear: {
    types: ['Fire'],
    bs: {hp: 50, at: 53, df: 48, sa: 53, sd: 48, sp: 64},
    weightkg: 11,
    nfe: true,
    abilities: {0: 'Gluttony'},
  },
  Patrat: {
    types: ['Normal'],
    bs: {hp: 45, at: 55, df: 39, sa: 35, sd: 39, sp: 42},
    weightkg: 11.6,
    nfe: true,
    abilities: {0: 'Run Away'},
  },
  Pawniard: {
    types: ['Dark', 'Steel'],
    bs: {hp: 45, at: 85, df: 70, sa: 40, sd: 40, sp: 60},
    weightkg: 10.2,
    nfe: true,
    abilities: {0: 'Defiant'},
  },
  Petilil: {
    types: ['Grass'],
    bs: {hp: 45, at: 35, df: 50, sa: 70, sd: 50, sp: 30},
    weightkg: 6.6,
    nfe: true,
    abilities: {0: 'Chlorophyll'},
  },
  Pidove: {
    types: ['Normal', 'Flying'],
    bs: {hp: 50, at: 55, df: 50, sa: 36, sd: 30, sp: 43},
    weightkg: 2.1,
    nfe: true,
    abilities: {0: 'Big Pecks'},
  },
  Pignite: {
    types: ['Fire', 'Fighting'],
    bs: {hp: 90, at: 93, df: 55, sa: 70, sd: 55, sp: 55},
    weightkg: 55.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Purrloin: {
    types: ['Dark'],
    bs: {hp: 41, at: 50, df: 37, sa: 50, sd: 37, sp: 66},
    weightkg: 10.1,
    nfe: true,
    abilities: {0: 'Limber'},
  },
  Reshiram: {
    types: ['Dragon', 'Fire'],
    bs: {hp: 100, at: 120, df: 100, sa: 150, sd: 120, sp: 90},
    weightkg: 330,
    abilities: {0: 'Turboblaze'},
    gender: 'N',
  },
  Reuniclus: {
    types: ['Psychic'],
    bs: {hp: 110, at: 65, df: 75, sa: 125, sd: 85, sp: 30},
    weightkg: 20.1,
    abilities: {0: 'Overcoat'},
  },
  Roggenrola: {
    types: ['Rock'],
    bs: {hp: 55, at: 75, df: 85, sa: 25, sd: 25, sp: 15},
    weightkg: 18,
    nfe: true,
    abilities: {0: 'Sturdy'},
  },
  Rufflet: {
    types: ['Normal', 'Flying'],
    bs: {hp: 70, at: 83, df: 50, sa: 37, sd: 50, sp: 60},
    weightkg: 10.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Samurott: {
    types: ['Water'],
    bs: {hp: 95, at: 100, df: 85, sa: 108, sd: 70, sp: 70},
    weightkg: 94.6,
    abilities: {0: 'Torrent'},
  },
  Sandile: {
    types: ['Ground', 'Dark'],
    bs: {hp: 50, at: 72, df: 35, sa: 35, sd: 35, sp: 65},
    weightkg: 15.2,
    nfe: true,
    abilities: {0: 'Intimidate'},
  },
  Sawk: {
    types: ['Fighting'],
    bs: {hp: 75, at: 125, df: 75, sa: 30, sd: 75, sp: 85},
    weightkg: 51,
    abilities: {0: 'Sturdy'},
  },
  Sawsbuck: {
    types: ['Normal', 'Grass'],
    bs: {hp: 80, at: 100, df: 70, sa: 60, sd: 70, sp: 95},
    weightkg: 92.5,
    abilities: {0: 'Chlorophyll'},
  },
  Scolipede: {
    types: ['Bug', 'Poison'],
    bs: {hp: 60, at: 90, df: 89, sa: 55, sd: 69, sp: 112},
    weightkg: 200.5,
    abilities: {0: 'Poison Point'},
  },
  Scrafty: {
    types: ['Dark', 'Fighting'],
    bs: {hp: 65, at: 90, df: 115, sa: 45, sd: 115, sp: 58},
    weightkg: 30,
    abilities: {0: 'Shed Skin'},
  },
  Scraggy: {
    types: ['Dark', 'Fighting'],
    bs: {hp: 50, at: 75, df: 70, sa: 35, sd: 70, sp: 48},
    weightkg: 11.8,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Scratchet: {
    types: ['Normal', 'Fighting'],
    bs: {hp: 55, at: 85, df: 80, sa: 20, sd: 70, sp: 40},
    weightkg: 20,
    nfe: true,
    abilities: {0: 'Scrappy'},
  },
  Seismitoad: {
    types: ['Water', 'Ground'],
    bs: {hp: 105, at: 85, df: 75, sa: 85, sd: 75, sp: 74},
    weightkg: 62,
    abilities: {0: 'Swift Swim'},
  },
  Serperior: {
    types: ['Grass'],
    bs: {hp: 75, at: 75, df: 95, sa: 75, sd: 95, sp: 113},
    weightkg: 63,
    abilities: {0: 'Overgrow'},
  },
  Servine: {
    types: ['Grass'],
    bs: {hp: 60, at: 60, df: 75, sa: 60, sd: 75, sp: 83},
    weightkg: 16,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Sewaddle: {
    types: ['Bug', 'Grass'],
    bs: {hp: 45, at: 53, df: 70, sa: 40, sd: 60, sp: 42},
    weightkg: 2.5,
    nfe: true,
    abilities: {0: 'Swarm'},
  },
  Shelmet: {
    types: ['Bug'],
    bs: {hp: 50, at: 40, df: 85, sa: 40, sd: 65, sp: 25},
    weightkg: 7.7,
    nfe: true,
    abilities: {0: 'Hydration'},
  },
  Sigilyph: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 72, at: 58, df: 80, sa: 103, sd: 80, sp: 97},
    weightkg: 14,
    abilities: {0: 'Wonder Skin'},
  },
  Simipour: {
    types: ['Water'],
    bs: {hp: 75, at: 98, df: 63, sa: 98, sd: 63, sp: 101},
    weightkg: 29,
    abilities: {0: 'Gluttony'},
  },
  Simisage: {
    types: ['Grass'],
    bs: {hp: 75, at: 98, df: 63, sa: 98, sd: 63, sp: 101},
    weightkg: 30.5,
    abilities: {0: 'Gluttony'},
  },
  Simisear: {
    types: ['Fire'],
    bs: {hp: 75, at: 98, df: 63, sa: 98, sd: 63, sp: 101},
    weightkg: 28,
    abilities: {0: 'Gluttony'},
  },
  Snivy: {
    types: ['Grass'],
    bs: {hp: 45, at: 45, df: 55, sa: 45, sd: 55, sp: 63},
    weightkg: 8.1,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Solosis: {
    types: ['Psychic'],
    bs: {hp: 45, at: 30, df: 40, sa: 105, sd: 50, sp: 20},
    weightkg: 1,
    nfe: true,
    abilities: {0: 'Overcoat'},
  },
  Stoutland: {
    types: ['Normal'],
    bs: {hp: 85, at: 100, df: 90, sa: 45, sd: 90, sp: 80},
    weightkg: 61,
    abilities: {0: 'Intimidate'},
  },
  Stunfisk: {
    types: ['Ground', 'Electric'],
    bs: {hp: 109, at: 66, df: 84, sa: 81, sd: 99, sp: 32},
    weightkg: 11,
    abilities: {0: 'Static'},
  },
  Swadloon: {
    types: ['Bug', 'Grass'],
    bs: {hp: 55, at: 63, df: 90, sa: 50, sd: 80, sp: 42},
    weightkg: 7.3,
    nfe: true,
    abilities: {0: 'Leaf Guard'},
  },
  Swanna: {
    types: ['Water', 'Flying'],
    bs: {hp: 75, at: 87, df: 63, sa: 87, sd: 63, sp: 98},
    weightkg: 24.2,
    abilities: {0: 'Keen Eye'},
  },
  Swoobat: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 67, at: 57, df: 55, sa: 77, sd: 55, sp: 114},
    weightkg: 10.5,
    abilities: {0: 'Unaware'},
  },
  Tepig: {
    types: ['Fire'],
    bs: {hp: 65, at: 63, df: 45, sa: 45, sd: 45, sp: 45},
    weightkg: 9.9,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Terrakion: {
    types: ['Rock', 'Fighting'],
    bs: {hp: 91, at: 129, df: 90, sa: 72, sd: 90, sp: 108},
    weightkg: 260,
    abilities: {0: 'Justified'},
    gender: 'N',
  },
  Throh: {
    types: ['Fighting'],
    bs: {hp: 120, at: 100, df: 85, sa: 30, sd: 85, sp: 45},
    weightkg: 55.5,
    abilities: {0: 'Guts'},
  },
  Thundurus: {
    types: ['Electric', 'Flying'],
    bs: {hp: 79, at: 115, df: 70, sa: 125, sd: 80, sp: 111},
    weightkg: 61,
    abilities: {0: 'Prankster'},
    otherFormes: ['Thundurus-Therian'],
  },
  'Thundurus-Therian': {
    types: ['Electric', 'Flying'],
    bs: {hp: 79, at: 105, df: 70, sa: 145, sd: 80, sp: 101},
    weightkg: 61,
    abilities: {0: 'Volt Absorb'},
    baseSpecies: 'Thundurus',
  },
  Timburr: {
    types: ['Fighting'],
    bs: {hp: 75, at: 80, df: 55, sa: 25, sd: 35, sp: 35},
    weightkg: 12.5,
    nfe: true,
    abilities: {0: 'Guts'},
  },
  Tirtouga: {
    types: ['Water', 'Rock'],
    bs: {hp: 54, at: 78, df: 103, sa: 53, sd: 45, sp: 22},
    weightkg: 16.5,
    nfe: true,
    abilities: {0: 'Solid Rock'},
  },
  Tomohawk: {
    types: ['Flying', 'Fighting'],
    bs: {hp: 105, at: 60, df: 90, sa: 115, sd: 80, sp: 85},
    weightkg: 37.2,
    abilities: {0: 'Intimidate'},
  },
  Tornadus: {
    types: ['Flying'],
    bs: {hp: 79, at: 115, df: 70, sa: 125, sd: 80, sp: 111},
    weightkg: 63,
    abilities: {0: 'Prankster'},
    otherFormes: ['Tornadus-Therian'],
  },
  'Tornadus-Therian': {
    types: ['Flying'],
    bs: {hp: 79, at: 100, df: 80, sa: 110, sd: 90, sp: 121},
    weightkg: 63,
    abilities: {0: 'Regenerator'},
    baseSpecies: 'Tornadus',
  },
  Tranquill: {
    types: ['Normal', 'Flying'],
    bs: {hp: 62, at: 77, df: 62, sa: 50, sd: 42, sp: 65},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Big Pecks'},
  },
  Trubbish: {
    types: ['Poison'],
    bs: {hp: 50, at: 50, df: 62, sa: 40, sd: 62, sp: 65},
    weightkg: 31,
    nfe: true,
    abilities: {0: 'Stench'},
  },
  Tympole: {
    types: ['Water'],
    bs: {hp: 50, at: 50, df: 40, sa: 50, sd: 40, sp: 64},
    weightkg: 4.5,
    nfe: true,
    abilities: {0: 'Swift Swim'},
  },
  Tynamo: {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 45, sd: 40, sp: 60},
    weightkg: 0.3,
    abilities: {0: 'Levitate'},
    nfe: true,
  },
  Unfezant: {
    types: ['Normal', 'Flying'],
    bs: {hp: 80, at: 105, df: 80, sa: 65, sd: 55, sp: 93},
    weightkg: 29,
    abilities: {0: 'Big Pecks'},
  },
  Vanillish: {
    types: ['Ice'],
    bs: {hp: 51, at: 65, df: 65, sa: 80, sd: 75, sp: 59},
    weightkg: 41,
    nfe: true,
    abilities: {0: 'Ice Body'},
  },
  Vanillite: {
    types: ['Ice'],
    bs: {hp: 36, at: 50, df: 50, sa: 65, sd: 60, sp: 44},
    weightkg: 5.7,
    nfe: true,
    abilities: {0: 'Ice Body'},
  },
  Vanilluxe: {
    types: ['Ice'],
    bs: {hp: 71, at: 95, df: 85, sa: 110, sd: 95, sp: 79},
    weightkg: 57.5,
    abilities: {0: 'Ice Body'},
  },
  Venipede: {
    types: ['Bug', 'Poison'],
    bs: {hp: 30, at: 45, df: 59, sa: 30, sd: 39, sp: 57},
    weightkg: 5.3,
    nfe: true,
    abilities: {0: 'Poison Point'},
  },
  Victini: {
    types: ['Psychic', 'Fire'],
    bs: {hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100},
    weightkg: 4,
    abilities: {0: 'Victory Star'},
    gender: 'N',
  },
  Virizion: {
    types: ['Grass', 'Fighting'],
    bs: {hp: 91, at: 90, df: 72, sa: 90, sd: 129, sp: 108},
    weightkg: 200,
    abilities: {0: 'Justified'},
    gender: 'N',
  },
  Volcarona: {
    types: ['Bug', 'Fire'],
    bs: {hp: 85, at: 60, df: 65, sa: 135, sd: 105, sp: 100},
    weightkg: 46,
    abilities: {0: 'Flame Body'},
  },
  Vullaby: {
    types: ['Dark', 'Flying'],
    bs: {hp: 70, at: 55, df: 75, sa: 45, sd: 65, sp: 60},
    weightkg: 9,
    nfe: true,
    abilities: {0: 'Big Pecks'},
  },
  Watchog: {
    types: ['Normal'],
    bs: {hp: 60, at: 85, df: 69, sa: 60, sd: 69, sp: 77},
    weightkg: 27,
    abilities: {0: 'Illuminate'},
  },
  Whimsicott: {
    types: ['Grass'],
    bs: {hp: 60, at: 67, df: 85, sa: 77, sd: 75, sp: 116},
    weightkg: 6.6,
    abilities: {0: 'Prankster'},
  },
  Whirlipede: {
    types: ['Bug', 'Poison'],
    bs: {hp: 40, at: 55, df: 99, sa: 40, sd: 79, sp: 47},
    weightkg: 58.5,
    nfe: true,
    abilities: {0: 'Poison Point'},
  },
  Woobat: {
    types: ['Psychic', 'Flying'],
    bs: {hp: 55, at: 45, df: 43, sa: 55, sd: 43, sp: 72},
    weightkg: 2.1,
    nfe: true,
    abilities: {0: 'Unaware'},
  },
  Yamask: {
    types: ['Ghost'],
    bs: {hp: 38, at: 30, df: 85, sa: 55, sd: 65, sp: 30},
    weightkg: 1.5,
    abilities: {0: 'Mummy'},
    nfe: true,
  },
  Zebstrika: {
    types: ['Electric'],
    bs: {hp: 75, at: 100, df: 63, sa: 80, sd: 63, sp: 116},
    weightkg: 79.5,
    abilities: {0: 'Lightning Rod'},
  },
  Zekrom: {
    types: ['Dragon', 'Electric'],
    bs: {hp: 100, at: 150, df: 120, sa: 120, sd: 100, sp: 90},
    weightkg: 345,
    abilities: {0: 'Teravolt'},
    gender: 'N',
  },
  Zoroark: {
    types: ['Dark'],
    bs: {hp: 60, at: 105, df: 60, sa: 120, sd: 60, sp: 105},
    weightkg: 81.1,
    abilities: {0: 'Illusion'},
  },
  Zorua: {
    types: ['Dark'],
    bs: {hp: 40, at: 65, df: 40, sa: 80, sd: 40, sp: 65},
    weightkg: 12.5,
    abilities: {0: 'Illusion'},
    nfe: true,
  },
  Zweilous: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 72, at: 85, df: 70, sa: 65, sd: 70, sp: 58},
    weightkg: 50,
    abilities: {0: 'Hustle'},
    nfe: true,
  },
};

const BW: {[name: string]: SpeciesData} = extend(true, {}, DPP, BW_PATCH);

// @ts-ignore readonly
delete BW['Pichu'].otherFormes;
delete BW['Pichu-Spiky-eared'];

const XY_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Abomasnow: {otherFormes: ['Abomasnow-Mega']},
  Absol: {otherFormes: ['Absol-Mega']},
  Aerodactyl: {otherFormes: ['Aerodactyl-Mega']},
  Aggron: {otherFormes: ['Aggron-Mega']},
  Alakazam: {bs: {sd: 95}, otherFormes: ['Alakazam-Mega']},
  Altaria: {otherFormes: ['Altaria-Mega']},
  Ampharos: {bs: {df: 85}, otherFormes: ['Ampharos-Mega']},
  Audino: {otherFormes: ['Audino-Mega']},
  Azumarill: {types: ['Water', 'Fairy'], bs: {sa: 60}},
  Azurill: {types: ['Normal', 'Fairy']},
  Banette: {otherFormes: ['Banette-Mega']},
  Beautifly: {bs: {sa: 100}},
  Beedrill: {bs: {at: 90}, otherFormes: ['Beedrill-Mega']},
  Bellossom: {bs: {df: 95}},
  Blastoise: {otherFormes: ['Blastoise-Mega']},
  Blaziken: {otherFormes: ['Blaziken-Mega']},
  Butterfree: {bs: {sa: 90}},
  Camerupt: {otherFormes: ['Camerupt-Mega']},
  Charizard: {otherFormes: ['Charizard-Mega-X', 'Charizard-Mega-Y']},
  Clefable: {types: ['Fairy'], bs: {sa: 95}},
  Clefairy: {types: ['Fairy']},
  Cleffa: {types: ['Fairy']},
  Cottonee: {types: ['Grass', 'Fairy']},
  Exploud: {bs: {sd: 73}},
  Gallade: {otherFormes: ['Gallade-Mega']},
  Garchomp: {otherFormes: ['Garchomp-Mega']},
  Gardevoir: {types: ['Psychic', 'Fairy'], otherFormes: ['Gardevoir-Mega']},
  Gengar: {otherFormes: ['Gengar-Mega']},
  Gigalith: {bs: {sd: 80}},
  Glalie: {otherFormes: ['Glalie-Mega']},
  Golem: {bs: {at: 120}},
  Granbull: {types: ['Fairy']},
  Groudon: {otherFormes: ['Groudon-Primal']},
  Gyarados: {otherFormes: ['Gyarados-Mega']},
  Heracross: {otherFormes: ['Heracross-Mega']},
  Houndoom: {otherFormes: ['Houndoom-Mega']},
  Igglybuff: {types: ['Normal', 'Fairy']},
  Jigglypuff: {types: ['Normal', 'Fairy']},
  Jumpluff: {bs: {sd: 95}},
  Kangaskhan: {otherFormes: ['Kangaskhan-Mega']},
  Kirlia: {types: ['Psychic', 'Fairy']},
  Krookodile: {bs: {df: 80}},
  Kyogre: {otherFormes: ['Kyogre-Primal']},
  Latias: {otherFormes: ['Latias-Mega']},
  Latios: {otherFormes: ['Latios-Mega']},
  Leavanny: {bs: {sd: 80}},
  Lopunny: {otherFormes: ['Lopunny-Mega']},
  Lucario: {otherFormes: ['Lucario-Mega']},
  Manectric: {otherFormes: ['Manectric-Mega']},
  Marill: {types: ['Water', 'Fairy']},
  Mawile: {types: ['Steel', 'Fairy'], otherFormes: ['Mawile-Mega']},
  Medicham: {otherFormes: ['Medicham-Mega']},
  Metagross: {otherFormes: ['Metagross-Mega']},
  Mewtwo: {otherFormes: ['Mewtwo-Mega-X', 'Mewtwo-Mega-Y']},
  'Mime Jr.': {types: ['Psychic', 'Fairy']},
  'Mr. Mime': {types: ['Psychic', 'Fairy']},
  Nidoking: {bs: {at: 102}},
  Nidoqueen: {bs: {at: 92}},
  Pidgeot: {bs: {sp: 101}, otherFormes: ['Pidgeot-Mega']},
  Pikachu: {
    bs: {df: 40, sd: 50},
    otherFormes: [
      'Pikachu-Belle',
      'Pikachu-Cosplay',
      'Pikachu-Libre',
      'Pikachu-PhD',
      'Pikachu-Pop-Star',
      'Pikachu-Rock-Star',
    ],
  },
  Pinsir: {otherFormes: ['Pinsir-Mega']},
  Poliwrath: {bs: {at: 95}},
  Raichu: {bs: {sp: 110}},
  Ralts: {types: ['Psychic', 'Fairy']},
  Rayquaza: {otherFormes: ['Rayquaza-Mega']},
  Roserade: {bs: {df: 65}},
  Sableye: {otherFormes: ['Sableye-Mega']},
  Salamence: {otherFormes: ['Salamence-Mega']},
  Sceptile: {otherFormes: ['Sceptile-Mega']},
  Scizor: {otherFormes: ['Scizor-Mega']},
  Scolipede: {bs: {at: 100}},
  Seismitoad: {bs: {at: 95}},
  Sharpedo: {otherFormes: ['Sharpedo-Mega']},
  Slowbro: {otherFormes: ['Slowbro-Mega']},
  Snubbull: {types: ['Fairy']},
  Staraptor: {bs: {sd: 60}},
  Steelix: {otherFormes: ['Steelix-Mega']},
  Stoutland: {bs: {at: 110}},
  Swampert: {otherFormes: ['Swampert-Mega']},
  Togekiss: {types: ['Fairy', 'Flying']},
  Togepi: {types: ['Fairy']},
  Togetic: {types: ['Fairy', 'Flying']},
  Tyranitar: {otherFormes: ['Tyranitar-Mega']},
  Unfezant: {bs: {at: 115}},
  Venusaur: {otherFormes: ['Venusaur-Mega']},
  Victreebel: {bs: {sd: 70}},
  Vileplume: {bs: {sa: 110}},
  Whimsicott: {types: ['Grass', 'Fairy']},
  Wigglytuff: {types: ['Normal', 'Fairy'], bs: {sa: 85}},
  'Aegislash-Blade': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 150, df: 50, sa: 150, sd: 50, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    otherFormes: ['Aegislash-Shield', 'Aegislash-Both'],
  },
  'Aegislash-Shield': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 50, df: 150, sa: 50, sd: 150, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    baseSpecies: 'Aegislash-Blade',
  },
  'Aegislash-Both': {
    types: ['Steel', 'Ghost'],
    bs: {hp: 60, at: 150, df: 150, sa: 150, sd: 150, sp: 60},
    weightkg: 53,
    abilities: {0: 'Stance Change'},
    baseSpecies: 'Aegislash-Blade',
  },
  Amaura: {
    types: ['Rock', 'Ice'],
    bs: {hp: 77, at: 59, df: 50, sa: 67, sd: 63, sp: 46},
    weightkg: 25.2,
    nfe: true,
    abilities: {0: 'Refrigerate'},
  },
  'Arceus-Fairy': {
    types: ['Fairy'],
    bs: {hp: 120, at: 120, df: 120, sa: 120, sd: 120, sp: 120},
    weightkg: 320,
    abilities: {0: 'Multitype'},
    baseSpecies: 'Arceus',
    gender: 'N',
  },
  Aromatisse: {
    types: ['Fairy'],
    bs: {hp: 101, at: 72, df: 72, sa: 99, sd: 89, sp: 29},
    weightkg: 15.5,
    abilities: {0: 'Healer'},
  },
  Aurorus: {
    types: ['Rock', 'Ice'],
    bs: {hp: 123, at: 77, df: 72, sa: 99, sd: 92, sp: 58},
    weightkg: 225,
    abilities: {0: 'Refrigerate'},
  },
  Avalugg: {
    types: ['Ice'],
    bs: {hp: 95, at: 117, df: 184, sa: 44, sd: 46, sp: 28},
    weightkg: 505,
    abilities: {0: 'Own Tempo'},
  },
  Barbaracle: {
    types: ['Rock', 'Water'],
    bs: {hp: 72, at: 105, df: 115, sa: 54, sd: 86, sp: 68},
    weightkg: 96,
    abilities: {0: 'Tough Claws'},
  },
  Bergmite: {
    types: ['Ice'],
    bs: {hp: 55, at: 69, df: 85, sa: 32, sd: 35, sp: 28},
    weightkg: 99.5,
    nfe: true,
    abilities: {0: 'Own Tempo'},
  },
  Binacle: {
    types: ['Rock', 'Water'],
    bs: {hp: 42, at: 52, df: 67, sa: 39, sd: 56, sp: 50},
    weightkg: 31,
    nfe: true,
    abilities: {0: 'Tough Claws'},
  },
  Braixen: {
    types: ['Fire'],
    bs: {hp: 59, at: 59, df: 58, sa: 90, sd: 70, sp: 73},
    weightkg: 14.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Bunnelby: {
    types: ['Normal'],
    bs: {hp: 38, at: 36, df: 38, sa: 32, sd: 36, sp: 57},
    weightkg: 5,
    nfe: true,
    abilities: {0: 'Pickup'},
  },
  Caimanoe: {
    types: ['Water', 'Steel'],
    bs: {hp: 73, at: 85, df: 65, sa: 80, sd: 40, sp: 87},
    weightkg: 72.5,
    nfe: true,
    abilities: {0: 'Water Veil'},
  },
  Carbink: {
    types: ['Rock', 'Fairy'],
    bs: {hp: 50, at: 50, df: 150, sa: 50, sd: 150, sp: 50},
    weightkg: 5.7,
    gender: 'N',
    abilities: {0: 'Clear Body'},
  },
  Chesnaught: {
    types: ['Grass', 'Fighting'],
    bs: {hp: 88, at: 107, df: 122, sa: 74, sd: 75, sp: 64},
    weightkg: 90,
    abilities: {0: 'Overgrow'},
  },
  Chespin: {
    types: ['Grass'],
    bs: {hp: 56, at: 61, df: 65, sa: 48, sd: 45, sp: 38},
    weightkg: 9,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Clauncher: {
    types: ['Water'],
    bs: {hp: 50, at: 53, df: 62, sa: 58, sd: 63, sp: 44},
    weightkg: 8.3,
    abilities: {0: 'Mega Launcher'},
    nfe: true,
  },
  Clawitzer: {
    types: ['Water'],
    bs: {hp: 71, at: 73, df: 88, sa: 120, sd: 89, sp: 59},
    weightkg: 35.3,
    abilities: {0: 'Mega Launcher'},
  },
  Crucibelle: {
    types: ['Rock', 'Poison'],
    bs: {hp: 106, at: 105, df: 65, sa: 75, sd: 85, sp: 104},
    weightkg: 23.6,
    abilities: {0: 'Regenerator'},
    otherFormes: ['Crucibelle-Mega'],
  },
  Diancie: {
    types: ['Rock', 'Fairy'],
    bs: {hp: 50, at: 100, df: 150, sa: 100, sd: 150, sp: 50},
    weightkg: 8.8,
    abilities: {0: 'Clear Body'},
    otherFormes: ['Diancie-Mega'],
    gender: 'N',
  },
  Dedenne: {
    types: ['Electric', 'Fairy'],
    bs: {hp: 67, at: 58, df: 57, sa: 81, sd: 67, sp: 101},
    weightkg: 2.2,
    abilities: {0: 'Cheek Pouch'},
  },
  Delphox: {
    types: ['Fire', 'Psychic'],
    bs: {hp: 75, at: 69, df: 72, sa: 114, sd: 100, sp: 104},
    weightkg: 39,
    abilities: {0: 'Blaze'},
  },
  Diggersby: {
    types: ['Normal', 'Ground'],
    bs: {hp: 85, at: 56, df: 77, sa: 50, sd: 77, sp: 78},
    weightkg: 42.4,
    abilities: {0: 'Pickup'},
  },
  Doublade: {
    types: ['Steel', 'Ghost'],
    bs: {hp: 59, at: 110, df: 150, sa: 45, sd: 49, sp: 35},
    weightkg: 4.5,
    abilities: {0: 'No Guard'},
    nfe: true,
  },
  Dragalge: {
    types: ['Poison', 'Dragon'],
    bs: {hp: 65, at: 75, df: 90, sa: 97, sd: 123, sp: 44},
    weightkg: 81.5,
    abilities: {0: 'Poison Point'},
  },
  Espurr: {
    types: ['Psychic'],
    bs: {hp: 62, at: 48, df: 54, sa: 63, sd: 60, sp: 68},
    weightkg: 3.5,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Fennekin: {
    types: ['Fire'],
    bs: {hp: 40, at: 45, df: 40, sa: 62, sd: 60, sp: 60},
    weightkg: 9.4,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Flabébé: {
    types: ['Fairy'],
    bs: {hp: 44, at: 38, df: 39, sa: 61, sd: 79, sp: 42},
    weightkg: 0.1,
    nfe: true,
    abilities: {0: 'Flower Veil'},
  },
  Fletchinder: {
    types: ['Fire', 'Flying'],
    bs: {hp: 62, at: 73, df: 55, sa: 56, sd: 52, sp: 84},
    weightkg: 16,
    nfe: true,
    abilities: {0: 'Flame Body'},
  },
  Fletchling: {
    types: ['Normal', 'Flying'],
    bs: {hp: 45, at: 50, df: 43, sa: 40, sd: 38, sp: 62},
    weightkg: 1.7,
    nfe: true,
    abilities: {0: 'Big Pecks'},
  },
  Floatoy: {
    types: ['Water'],
    bs: {hp: 48, at: 70, df: 40, sa: 70, sd: 30, sp: 77},
    weightkg: 1.9,
    nfe: true,
    abilities: {0: 'Water Veil'},
  },
  Floette: {
    types: ['Fairy'],
    bs: {hp: 54, at: 45, df: 47, sa: 75, sd: 98, sp: 52},
    weightkg: 0.9,
    nfe: true,
    otherFormes: ['Floette-Eternal'],
    abilities: {0: 'Flower Veil'},
  },
  'Floette-Eternal': {
    types: ['Fairy'],
    bs: {hp: 74, at: 65, df: 67, sa: 125, sd: 128, sp: 92},
    weightkg: 0.9,
    abilities: {0: 'Flower Veil'},
    baseSpecies: 'Floette',
  },
  Florges: {
    types: ['Fairy'],
    bs: {hp: 78, at: 65, df: 68, sa: 112, sd: 154, sp: 75},
    weightkg: 10,
    abilities: {0: 'Flower Veil'},
  },
  Froakie: {
    types: ['Water'],
    bs: {hp: 41, at: 56, df: 40, sa: 62, sd: 44, sp: 71},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Frogadier: {
    types: ['Water'],
    bs: {hp: 54, at: 63, df: 52, sa: 83, sd: 56, sp: 97},
    weightkg: 10.9,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Furfrou: {
    types: ['Normal'],
    bs: {hp: 75, at: 80, df: 60, sa: 65, sd: 90, sp: 102},
    weightkg: 28,
    abilities: {0: 'Fur Coat'},
  },
  Gogoat: {
    types: ['Grass'],
    bs: {hp: 123, at: 100, df: 62, sa: 97, sd: 81, sp: 68},
    weightkg: 91,
    abilities: {0: 'Sap Sipper'},
  },
  Goodra: {
    types: ['Dragon'],
    bs: {hp: 90, at: 100, df: 70, sa: 110, sd: 150, sp: 80},
    weightkg: 150.5,
    abilities: {0: 'Sap Sipper'},
  },
  Goomy: {
    types: ['Dragon'],
    bs: {hp: 45, at: 50, df: 35, sa: 55, sd: 75, sp: 40},
    weightkg: 2.8,
    nfe: true,
    abilities: {0: 'Sap Sipper'},
  },
  Gourgeist: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 65, at: 90, df: 122, sa: 58, sd: 75, sp: 84},
    weightkg: 12.5,
    abilities: {0: 'Pickup'},
    otherFormes: ['Gourgeist-Large', 'Gourgeist-Small', 'Gourgeist-Super'],
  },
  'Gourgeist-Large': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 75, at: 95, df: 122, sa: 58, sd: 75, sp: 69},
    weightkg: 14,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Gourgeist',
  },
  'Gourgeist-Small': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 55, at: 85, df: 122, sa: 58, sd: 75, sp: 99},
    weightkg: 9.5,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Gourgeist',
  },
  'Gourgeist-Super': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 85, at: 100, df: 122, sa: 58, sd: 75, sp: 54},
    weightkg: 39,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Gourgeist',
  },
  Greninja: {
    types: ['Water', 'Dark'],
    bs: {hp: 72, at: 95, df: 67, sa: 103, sd: 71, sp: 122},
    weightkg: 40,
    abilities: {0: 'Torrent'},
  },
  Hawlucha: {
    types: ['Fighting', 'Flying'],
    bs: {hp: 78, at: 92, df: 75, sa: 74, sd: 63, sp: 118},
    weightkg: 21.5,
    abilities: {0: 'Limber'},
  },
  Heliolisk: {
    types: ['Electric', 'Normal'],
    bs: {hp: 62, at: 55, df: 52, sa: 109, sd: 94, sp: 109},
    weightkg: 21,
    abilities: {0: 'Dry Skin'},
  },
  Helioptile: {
    types: ['Electric', 'Normal'],
    bs: {hp: 44, at: 38, df: 33, sa: 61, sd: 43, sp: 70},
    weightkg: 6,
    nfe: true,
    abilities: {0: 'Dry Skin'},
  },
  Honedge: {
    types: ['Steel', 'Ghost'],
    bs: {hp: 45, at: 80, df: 100, sa: 35, sd: 37, sp: 28},
    weightkg: 2,
    abilities: {0: 'No Guard'},
    nfe: true,
  },
  Hoopa: {
    types: ['Psychic', 'Ghost'],
    bs: {hp: 80, at: 110, df: 60, sa: 150, sd: 130, sp: 70},
    weightkg: 9,
    gender: 'N',
    abilities: {0: 'Magician'},
    otherFormes: ['Hoopa-Unbound'],
  },
  'Hoopa-Unbound': {
    types: ['Psychic', 'Dark'],
    bs: {hp: 80, at: 160, df: 60, sa: 170, sd: 130, sp: 80},
    weightkg: 490,
    gender: 'N',
    abilities: {0: 'Magician'},
    baseSpecies: 'Hoopa',
  },
  Inkay: {
    types: ['Dark', 'Psychic'],
    bs: {hp: 53, at: 54, df: 53, sa: 37, sd: 46, sp: 45},
    weightkg: 3.5,
    nfe: true,
    abilities: {0: 'Contrary'},
  },
  Kerfluffle: {
    types: ['Fairy', 'Fighting'],
    bs: {hp: 84, at: 78, df: 86, sa: 115, sd: 88, sp: 119},
    weightkg: 24.2,
    abilities: {0: 'Natural Cure'},
  },
  Klefki: {
    types: ['Steel', 'Fairy'],
    bs: {hp: 57, at: 80, df: 91, sa: 80, sd: 87, sp: 75},
    weightkg: 3,
    abilities: {0: 'Prankster'},
  },
  Litleo: {
    types: ['Fire', 'Normal'],
    bs: {hp: 62, at: 50, df: 58, sa: 73, sd: 54, sp: 72},
    weightkg: 13.5,
    nfe: true,
    abilities: {0: 'Rivalry'},
  },
  Malamar: {
    types: ['Dark', 'Psychic'],
    bs: {hp: 86, at: 92, df: 88, sa: 68, sd: 75, sp: 73},
    weightkg: 47,
    abilities: {0: 'Contrary'},
  },
  'Abomasnow-Mega': {
    types: ['Grass', 'Ice'],
    bs: {hp: 90, at: 132, df: 105, sa: 132, sd: 105, sp: 30},
    weightkg: 185,
    abilities: {0: 'Snow Warning'},
    baseSpecies: 'Abomasnow',
  },
  'Absol-Mega': {
    types: ['Dark'],
    bs: {hp: 65, at: 150, df: 60, sa: 115, sd: 60, sp: 115},
    weightkg: 49,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Absol',
  },
  'Aerodactyl-Mega': {
    types: ['Rock', 'Flying'],
    bs: {hp: 80, at: 135, df: 85, sa: 70, sd: 95, sp: 150},
    weightkg: 79,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Aerodactyl',
  },
  'Aggron-Mega': {
    types: ['Steel'],
    bs: {hp: 70, at: 140, df: 230, sa: 60, sd: 80, sp: 50},
    weightkg: 395,
    abilities: {0: 'Filter'},
    baseSpecies: 'Aggron',
  },
  'Alakazam-Mega': {
    types: ['Psychic'],
    bs: {hp: 55, at: 50, df: 65, sa: 175, sd: 95, sp: 150},
    weightkg: 48,
    abilities: {0: 'Trace'},
    baseSpecies: 'Alakazam',
  },
  'Altaria-Mega': {
    types: ['Dragon', 'Fairy'],
    bs: {hp: 75, at: 110, df: 110, sa: 110, sd: 105, sp: 80},
    weightkg: 20.6,
    abilities: {0: 'Pixilate'},
    baseSpecies: 'Altaria',
  },
  'Ampharos-Mega': {
    types: ['Electric', 'Dragon'],
    bs: {hp: 90, at: 95, df: 105, sa: 165, sd: 110, sp: 45},
    weightkg: 61.5,
    abilities: {0: 'Mold Breaker'},
    baseSpecies: 'Ampharos',
  },
  'Audino-Mega': {
    types: ['Normal', 'Fairy'],
    bs: {hp: 103, at: 60, df: 126, sa: 80, sd: 126, sp: 50},
    weightkg: 32,
    abilities: {0: 'Healer'},
    baseSpecies: 'Audino',
  },
  'Banette-Mega': {
    types: ['Ghost'],
    bs: {hp: 64, at: 165, df: 75, sa: 93, sd: 83, sp: 75},
    weightkg: 13,
    abilities: {0: 'Prankster'},
    baseSpecies: 'Banette',
  },
  'Beedrill-Mega': {
    types: ['Bug', 'Poison'],
    bs: {hp: 65, at: 150, df: 40, sa: 15, sd: 80, sp: 145},
    weightkg: 40.5,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Beedrill',
  },
  'Blastoise-Mega': {
    types: ['Water'],
    bs: {hp: 79, at: 103, df: 120, sa: 135, sd: 115, sp: 78},
    weightkg: 101.1,
    abilities: {0: 'Mega Launcher'},
    baseSpecies: 'Blastoise',
  },
  'Blaziken-Mega': {
    types: ['Fire', 'Fighting'],
    bs: {hp: 80, at: 160, df: 80, sa: 130, sd: 80, sp: 100},
    weightkg: 52,
    abilities: {0: 'Speed Boost'},
    baseSpecies: 'Blaziken',
  },
  'Camerupt-Mega': {
    types: ['Fire', 'Ground'],
    bs: {hp: 70, at: 120, df: 100, sa: 145, sd: 105, sp: 20},
    weightkg: 320.5,
    abilities: {0: 'Sheer Force'},
    baseSpecies: 'Camerupt',
  },
  'Charizard-Mega-X': {
    types: ['Fire', 'Dragon'],
    bs: {hp: 78, at: 130, df: 111, sa: 130, sd: 85, sp: 100},
    weightkg: 110.5,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Charizard',
  },
  'Charizard-Mega-Y': {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 104, df: 78, sa: 159, sd: 115, sp: 100},
    weightkg: 100.5,
    abilities: {0: 'Drought'},
    baseSpecies: 'Charizard',
  },
  'Crucibelle-Mega': {
    types: ['Rock', 'Poison'],
    bs: {hp: 106, at: 135, df: 75, sa: 85, sd: 125, sp: 114},
    weightkg: 22.5,
    abilities: {0: 'Magic Guard'},
    baseSpecies: 'Crucibelle',
  },
  'Diancie-Mega': {
    types: ['Rock', 'Fairy'],
    bs: {hp: 50, at: 160, df: 110, sa: 160, sd: 110, sp: 110},
    weightkg: 27.8,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Diancie',
    gender: 'N',
  },
  'Gallade-Mega': {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 68, at: 165, df: 95, sa: 65, sd: 115, sp: 110},
    weightkg: 56.4,
    abilities: {0: 'Inner Focus'},
    baseSpecies: 'Gallade',
  },
  'Garchomp-Mega': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 108, at: 170, df: 115, sa: 120, sd: 95, sp: 92},
    weightkg: 95,
    abilities: {0: 'Sand Force'},
    baseSpecies: 'Garchomp',
  },
  'Gardevoir-Mega': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 68, at: 85, df: 65, sa: 165, sd: 135, sp: 100},
    weightkg: 48.4,
    abilities: {0: 'Pixilate'},
    baseSpecies: 'Gardevoir',
  },
  'Gengar-Mega': {
    types: ['Ghost', 'Poison'],
    bs: {hp: 60, at: 65, df: 80, sa: 170, sd: 95, sp: 130},
    weightkg: 40.5,
    abilities: {0: 'Shadow Tag'},
    baseSpecies: 'Gengar',
  },
  'Glalie-Mega': {
    types: ['Ice'],
    bs: {hp: 80, at: 120, df: 80, sa: 120, sd: 80, sp: 100},
    weightkg: 350.2,
    abilities: {0: 'Refrigerate'},
    baseSpecies: 'Glalie',
  },
  'Gyarados-Mega': {
    types: ['Water', 'Dark'],
    bs: {hp: 95, at: 155, df: 109, sa: 70, sd: 130, sp: 81},
    weightkg: 305,
    abilities: {0: 'Mold Breaker'},
    baseSpecies: 'Gyarados',
  },
  'Heracross-Mega': {
    types: ['Bug', 'Fighting'],
    bs: {hp: 80, at: 185, df: 115, sa: 40, sd: 105, sp: 75},
    weightkg: 62.5,
    abilities: {0: 'Skill Link'},
    baseSpecies: 'Heracross',
  },
  'Houndoom-Mega': {
    types: ['Dark', 'Fire'],
    bs: {hp: 75, at: 90, df: 90, sa: 140, sd: 90, sp: 115},
    weightkg: 49.5,
    abilities: {0: 'Solar Power'},
    baseSpecies: 'Houndoom',
  },
  'Kangaskhan-Mega': {
    types: ['Normal'],
    bs: {hp: 105, at: 125, df: 100, sa: 60, sd: 100, sp: 100},
    weightkg: 100,
    abilities: {0: 'Parental Bond'},
    baseSpecies: 'Kangaskhan',
  },
  'Latias-Mega': {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 100, df: 120, sa: 140, sd: 150, sp: 110},
    weightkg: 52,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Latias',
  },
  'Latios-Mega': {
    types: ['Dragon', 'Psychic'],
    bs: {hp: 80, at: 130, df: 100, sa: 160, sd: 120, sp: 110},
    weightkg: 70,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Latios',
  },
  'Lopunny-Mega': {
    types: ['Normal', 'Fighting'],
    bs: {hp: 65, at: 136, df: 94, sa: 54, sd: 96, sp: 135},
    weightkg: 28.3,
    abilities: {0: 'Scrappy'},
    baseSpecies: 'Lopunny',
  },
  'Lucario-Mega': {
    types: ['Fighting', 'Steel'],
    bs: {hp: 70, at: 145, df: 88, sa: 140, sd: 70, sp: 112},
    weightkg: 57.5,
    abilities: {0: 'Adaptability'},
    baseSpecies: 'Lucario',
  },
  'Manectric-Mega': {
    types: ['Electric'],
    bs: {hp: 70, at: 75, df: 80, sa: 135, sd: 80, sp: 135},
    weightkg: 44,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Manectric',
  },
  'Mawile-Mega': {
    types: ['Steel', 'Fairy'],
    bs: {hp: 50, at: 105, df: 125, sa: 55, sd: 95, sp: 50},
    weightkg: 23.5,
    abilities: {0: 'Huge Power'},
    baseSpecies: 'Mawile',
  },
  'Medicham-Mega': {
    types: ['Fighting', 'Psychic'],
    bs: {hp: 60, at: 100, df: 85, sa: 80, sd: 85, sp: 100},
    weightkg: 31.5,
    abilities: {0: 'Pure Power'},
    baseSpecies: 'Medicham',
  },
  'Metagross-Mega': {
    types: ['Steel', 'Psychic'],
    bs: {hp: 80, at: 145, df: 150, sa: 105, sd: 110, sp: 110},
    weightkg: 942.9,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Metagross',
    gender: 'N',
  },
  'Mewtwo-Mega-X': {
    types: ['Psychic', 'Fighting'],
    bs: {hp: 106, at: 190, df: 100, sa: 154, sd: 100, sp: 130},
    weightkg: 127,
    abilities: {0: 'Steadfast'},
    baseSpecies: 'Mewtwo',
    gender: 'N',
  },
  'Mewtwo-Mega-Y': {
    types: ['Psychic'],
    bs: {hp: 106, at: 150, df: 70, sa: 194, sd: 120, sp: 140},
    weightkg: 33,
    abilities: {0: 'Insomnia'},
    baseSpecies: 'Mewtwo',
    gender: 'N',
  },
  'Pidgeot-Mega': {
    types: ['Normal', 'Flying'],
    bs: {hp: 83, at: 80, df: 80, sa: 135, sd: 80, sp: 121},
    weightkg: 50.5,
    abilities: {0: 'No Guard'},
    baseSpecies: 'Pidgeot',
  },
  'Pinsir-Mega': {
    types: ['Bug', 'Flying'],
    bs: {hp: 65, at: 155, df: 120, sa: 65, sd: 90, sp: 105},
    weightkg: 59,
    abilities: {0: 'Aerilate'},
    baseSpecies: 'Pinsir',
  },
  'Rayquaza-Mega': {
    types: ['Dragon', 'Flying'],
    bs: {hp: 105, at: 180, df: 100, sa: 180, sd: 100, sp: 115},
    weightkg: 392,
    gender: 'N',
    abilities: {0: 'Delta Stream'},
    baseSpecies: 'Rayquaza',
  },
  'Sableye-Mega': {
    types: ['Dark', 'Ghost'],
    bs: {hp: 50, at: 85, df: 125, sa: 85, sd: 115, sp: 20},
    weightkg: 161,
    abilities: {0: 'Magic Bounce'},
    baseSpecies: 'Sableye',
  },
  'Salamence-Mega': {
    types: ['Dragon', 'Flying'],
    bs: {hp: 95, at: 145, df: 130, sa: 120, sd: 90, sp: 120},
    weightkg: 112.6,
    abilities: {0: 'Aerilate'},
    baseSpecies: 'Salamence',
  },
  'Sceptile-Mega': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 70, at: 110, df: 75, sa: 145, sd: 85, sp: 145},
    weightkg: 55.2,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Sceptile',
  },
  'Scizor-Mega': {
    types: ['Bug', 'Steel'],
    bs: {hp: 70, at: 150, df: 140, sa: 65, sd: 100, sp: 75},
    weightkg: 125,
    abilities: {0: 'Technician'},
    baseSpecies: 'Scizor',
  },
  'Sharpedo-Mega': {
    types: ['Water', 'Dark'],
    bs: {hp: 70, at: 140, df: 70, sa: 110, sd: 65, sp: 105},
    weightkg: 130.3,
    abilities: {0: 'Strong Jaw'},
    baseSpecies: 'Sharpedo',
  },
  'Slowbro-Mega': {
    types: ['Water', 'Psychic'],
    bs: {hp: 95, at: 75, df: 180, sa: 130, sd: 80, sp: 30},
    weightkg: 120,
    abilities: {0: 'Shell Armor'},
    baseSpecies: 'Slowbro',
  },
  'Steelix-Mega': {
    types: ['Steel', 'Ground'],
    bs: {hp: 75, at: 125, df: 230, sa: 55, sd: 95, sp: 30},
    weightkg: 740,
    abilities: {0: 'Sand Force'},
    baseSpecies: 'Steelix',
  },
  'Swampert-Mega': {
    types: ['Water', 'Ground'],
    bs: {hp: 100, at: 150, df: 110, sa: 95, sd: 110, sp: 70},
    weightkg: 102,
    abilities: {0: 'Swift Swim'},
    baseSpecies: 'Swampert',
  },
  'Tyranitar-Mega': {
    types: ['Rock', 'Dark'],
    bs: {hp: 100, at: 164, df: 150, sa: 95, sd: 120, sp: 71},
    weightkg: 255,
    abilities: {0: 'Sand Stream'},
    baseSpecies: 'Tyranitar',
  },
  'Venusaur-Mega': {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 100, df: 123, sa: 122, sd: 120, sp: 80},
    weightkg: 155.5,
    abilities: {0: 'Thick Fat'},
    baseSpecies: 'Venusaur',
  },
  Meowstic: {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 83, sd: 81, sp: 104},
    weightkg: 8.5,
    abilities: {0: 'Keen Eye'},
    otherFormes: ['Meowstic-F'],
  },
  'Meowstic-F': {
    types: ['Psychic'],
    bs: {hp: 74, at: 48, df: 76, sa: 83, sd: 81, sp: 104},
    weightkg: 8.5,
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Meowstic',
  },
  Naviathan: {
    types: ['Water', 'Steel'],
    bs: {hp: 103, at: 110, df: 90, sa: 95, sd: 65, sp: 97},
    weightkg: 510,
    abilities: {0: 'Water Veil'},
  },
  Noibat: {
    types: ['Flying', 'Dragon'],
    bs: {hp: 40, at: 30, df: 35, sa: 45, sd: 40, sp: 55},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Frisk'},
  },
  Noivern: {
    types: ['Flying', 'Dragon'],
    bs: {hp: 85, at: 70, df: 80, sa: 97, sd: 80, sp: 123},
    weightkg: 85,
    abilities: {0: 'Frisk'},
  },
  Pancham: {
    types: ['Fighting'],
    bs: {hp: 67, at: 82, df: 62, sa: 46, sd: 48, sp: 43},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Iron Fist'},
  },
  Pangoro: {
    types: ['Fighting', 'Dark'],
    bs: {hp: 95, at: 124, df: 78, sa: 69, sd: 71, sp: 58},
    weightkg: 136,
    abilities: {0: 'Iron Fist'},
  },
  Phantump: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 43, at: 70, df: 48, sa: 50, sd: 60, sp: 38},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  'Pikachu-Cosplay': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Rock-Star': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Belle': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-PhD': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Pop-Star': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Libre': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Lightning Rod'},
    baseSpecies: 'Pikachu',
  },
  Plasmanta: {
    types: ['Electric', 'Poison'],
    bs: {hp: 60, at: 57, df: 119, sa: 131, sd: 98, sp: 100},
    weightkg: 460,
    abilities: {0: 'Storm Drain'},
  },
  Pluffle: {
    types: ['Fairy'],
    bs: {hp: 74, at: 38, df: 51, sa: 65, sd: 78, sp: 49},
    weightkg: 1.8,
    nfe: true,
    abilities: {0: 'Natural Cure'},
  },
  'Groudon-Primal': {
    types: ['Ground', 'Fire'],
    bs: {hp: 100, at: 180, df: 160, sa: 150, sd: 90, sp: 90},
    weightkg: 999.7,
    abilities: {0: 'Desolate Land'},
    baseSpecies: 'Groudon',
    gender: 'N',
  },
  'Kyogre-Primal': {
    types: ['Water'],
    bs: {hp: 100, at: 150, df: 90, sa: 180, sd: 160, sp: 90},
    weightkg: 430,
    abilities: {0: 'Primordial Sea'},
    baseSpecies: 'Kyogre',
    gender: 'N',
  },
  Pumpkaboo: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 49, at: 66, df: 70, sa: 44, sd: 55, sp: 51},
    weightkg: 5,
    nfe: true,
    abilities: {0: 'Pickup'},
    otherFormes: ['Pumpkaboo-Large', 'Pumpkaboo-Small', 'Pumpkaboo-Super'],
  },
  'Pumpkaboo-Large': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 54, at: 66, df: 70, sa: 44, sd: 55, sp: 46},
    weightkg: 7.5,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Pumpkaboo',
  },
  'Pumpkaboo-Small': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 44, at: 66, df: 70, sa: 44, sd: 55, sp: 56},
    weightkg: 3.5,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Pumpkaboo',
  },
  'Pumpkaboo-Super': {
    types: ['Ghost', 'Grass'],
    bs: {hp: 59, at: 66, df: 70, sa: 44, sd: 55, sp: 41},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Pumpkaboo',
  },
  Pyroar: {
    types: ['Fire', 'Normal'],
    bs: {hp: 86, at: 68, df: 72, sa: 109, sd: 66, sp: 106},
    weightkg: 81.5,
    abilities: {0: 'Rivalry'},
  },
  Quilladin: {
    types: ['Grass'],
    bs: {hp: 61, at: 78, df: 95, sa: 56, sd: 58, sp: 57},
    weightkg: 29,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Scatterbug: {
    types: ['Bug'],
    bs: {hp: 38, at: 35, df: 40, sa: 27, sd: 25, sp: 35},
    weightkg: 2.5,
    nfe: true,
    abilities: {0: 'Shield Dust'},
  },
  Skiddo: {
    types: ['Grass'],
    bs: {hp: 66, at: 65, df: 48, sa: 62, sd: 57, sp: 52},
    weightkg: 31,
    nfe: true,
    abilities: {0: 'Sap Sipper'},
  },
  Skrelp: {
    types: ['Poison', 'Water'],
    bs: {hp: 50, at: 60, df: 60, sa: 60, sd: 60, sp: 30},
    weightkg: 7.3,
    nfe: true,
    abilities: {0: 'Poison Point'},
  },
  Sliggoo: {
    types: ['Dragon'],
    bs: {hp: 68, at: 75, df: 53, sa: 83, sd: 113, sp: 60},
    weightkg: 17.5,
    nfe: true,
    abilities: {0: 'Sap Sipper'},
  },
  Slurpuff: {
    types: ['Fairy'],
    bs: {hp: 82, at: 80, df: 86, sa: 85, sd: 75, sp: 72},
    weightkg: 5,
    abilities: {0: 'Sweet Veil'},
  },
  Snugglow: {
    types: ['Electric', 'Poison'],
    bs: {hp: 40, at: 37, df: 79, sa: 91, sd: 68, sp: 70},
    weightkg: 6,
    nfe: true,
    abilities: {0: 'Storm Drain'},
  },
  Spewpa: {
    types: ['Bug'],
    bs: {hp: 45, at: 22, df: 60, sa: 27, sd: 30, sp: 29},
    weightkg: 8.4,
    nfe: true,
    abilities: {0: 'Shed Skin'},
  },
  Spritzee: {
    types: ['Fairy'],
    bs: {hp: 78, at: 52, df: 60, sa: 63, sd: 65, sp: 23},
    weightkg: 0.5,
    nfe: true,
    abilities: {0: 'Healer'},
  },
  Swirlix: {
    types: ['Fairy'],
    bs: {hp: 62, at: 48, df: 66, sa: 59, sd: 57, sp: 49},
    weightkg: 3.5,
    nfe: true,
    abilities: {0: 'Sweet Veil'},
  },
  Sylveon: {
    types: ['Fairy'],
    bs: {hp: 95, at: 65, df: 65, sa: 110, sd: 130, sp: 60},
    weightkg: 23.5,
    abilities: {0: 'Cute Charm'},
  },
  Talonflame: {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 81, df: 71, sa: 74, sd: 69, sp: 126},
    weightkg: 24.5,
    abilities: {0: 'Flame Body'},
  },
  Trevenant: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 85, at: 110, df: 76, sa: 65, sd: 82, sp: 56},
    weightkg: 71,
    abilities: {0: 'Natural Cure'},
  },
  Tyrantrum: {
    types: ['Rock', 'Dragon'],
    bs: {hp: 82, at: 121, df: 119, sa: 69, sd: 59, sp: 71},
    weightkg: 270,
    abilities: {0: 'Strong Jaw'},
  },
  Tyrunt: {
    types: ['Rock', 'Dragon'],
    bs: {hp: 58, at: 89, df: 77, sa: 45, sd: 45, sp: 48},
    weightkg: 26,
    nfe: true,
    abilities: {0: 'Strong Jaw'},
  },
  Vivillon: {
    types: ['Bug', 'Flying'],
    bs: {hp: 80, at: 52, df: 50, sa: 90, sd: 50, sp: 89},
    weightkg: 17,
    abilities: {0: 'Shield Dust'},
    otherFormes: ['Vivillon-Fancy', 'Vivillon-Pokeball'],
  },
  'Vivillon-Fancy': {
    types: ['Bug', 'Flying'],
    bs: {hp: 80, at: 52, df: 50, sa: 90, sd: 50, sp: 89},
    weightkg: 17,
    abilities: {0: 'Shield Dust'},
    baseSpecies: 'Vivillon',
  },
  'Vivillon-Pokeball': {
    types: ['Bug', 'Flying'],
    bs: {hp: 80, at: 52, df: 50, sa: 90, sd: 50, sp: 89},
    weightkg: 17,
    abilities: {0: 'Shield Dust'},
    baseSpecies: 'Vivillon',
  },
  Volcanion: {
    types: ['Fire', 'Water'],
    bs: {hp: 80, at: 110, df: 120, sa: 130, sd: 90, sp: 70},
    weightkg: 195,
    gender: 'N',
    abilities: {0: 'Water Absorb'},
  },
  Volkraken: {
    types: ['Water', 'Fire'],
    bs: {hp: 100, at: 45, df: 80, sa: 135, sd: 100, sp: 95},
    weightkg: 44.5,
    abilities: {0: 'Analytic'},
  },
  Volkritter: {
    types: ['Water', 'Fire'],
    bs: {hp: 60, at: 30, df: 50, sa: 80, sd: 60, sp: 70},
    weightkg: 15,
    nfe: true,
    abilities: {0: 'Anticipation'},
  },
  Xerneas: {
    types: ['Fairy'],
    bs: {hp: 126, at: 131, df: 95, sa: 131, sd: 98, sp: 99},
    weightkg: 215,
    abilities: {0: 'Fairy Aura'},
    gender: 'N',
  },
  Yveltal: {
    types: ['Dark', 'Flying'],
    bs: {hp: 126, at: 131, df: 95, sa: 131, sd: 98, sp: 99},
    weightkg: 203,
    abilities: {0: 'Dark Aura'},
    gender: 'N',
  },
  Zygarde: {
    types: ['Dragon', 'Ground'],
    bs: {hp: 108, at: 100, df: 121, sa: 81, sd: 95, sp: 95},
    weightkg: 305,
    abilities: {0: 'Aura Break'},
    gender: 'N',
  },
};

const XY: {[name: string]: SpeciesData} = extend(true, {}, BW, XY_PATCH);

XY['Arceus'].otherFormes!.push('Arceus-Fairy');
XY['Arceus'].otherFormes!.sort();

const SM_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Alakazam-Mega': {bs: {sd: 105}},
  Arbok: {bs: {at: 95}},
  Ariados: {bs: {sd: 70}},
  Beartic: {bs: {at: 130}},
  Chimecho: {bs: {hp: 75, df: 80, sd: 90}},
  Corsola: {bs: {hp: 65, df: 95, sd: 95}},
  'Crucibelle-Mega': {bs: {sa: 91, sp: 108}},
  Crustle: {bs: {at: 105}},
  Cryogonal: {bs: {hp: 80, df: 50}},
  Delcatty: {bs: {sp: 90}},
  Diglett: {otherFormes: ['Diglett-Alola']},
  Dodrio: {bs: {sp: 110}},
  Dugtrio: {bs: {at: 100}, otherFormes: ['Dugtrio-Alola']},
  Eevee: {otherFormes: ['Eevee-Starter']},
  Electrode: {bs: {sp: 150}},
  Exeggutor: {bs: {sd: 75}, otherFormes: ['Exeggutor-Alola']},
  'Farfetch\u2019d': {bs: {at: 90}},
  Gengar: {abilities: {0: 'Cursed Body'}},
  Geodude: {otherFormes: ['Geodude-Alola']},
  Golem: {otherFormes: ['Golem-Alola']},
  Graveler: {otherFormes: ['Graveler-Alola']},
  Greninja: {otherFormes: ['Greninja-Ash', 'Greninja-Bond']},
  Grimer: {otherFormes: ['Grimer-Alola']},
  Illumise: {bs: {df: 75, sd: 85}},
  Lunatone: {bs: {hp: 90}},
  Magcargo: {bs: {hp: 60, sa: 90}},
  Mantine: {bs: {hp: 85}},
  Marowak: {otherFormes: ['Marowak-Alola', 'Marowak-Alola-Totem']},
  Masquerain: {bs: {sa: 100, sp: 80}},
  Meowth: {otherFormes: ['Meowth-Alola']},
  Muk: {otherFormes: ['Muk-Alola']},
  Necturna: {bs: {sp: 58}},
  Ninetales: {otherFormes: ['Ninetales-Alola']},
  Naviathan: {abilities: {0: 'Guts'}},
  Noctowl: {bs: {sa: 86}},
  Pelipper: {bs: {sa: 95}},
  Persian: {otherFormes: ['Persian-Alola']},
  Pikachu: {
    otherFormes: [
      'Pikachu-Alola',
      'Pikachu-Hoenn',
      'Pikachu-Kalos',
      'Pikachu-Original',
      'Pikachu-Partner',
      'Pikachu-Sinnoh',
      'Pikachu-Starter',
      'Pikachu-Unova',
    ],
  },
  Qwilfish: {bs: {df: 85}},
  Raichu: {otherFormes: ['Raichu-Alola']},
  Raticate: {otherFormes: ['Raticate-Alola', 'Raticate-Alola-Totem']},
  Rattata: {otherFormes: ['Rattata-Alola']},
  Sandshrew: {otherFormes: ['Sandshrew-Alola']},
  Sandslash: {otherFormes: ['Sandslash-Alola']},
  Solrock: {bs: {hp: 90}},
  Swellow: {bs: {sa: 75}},
  Volbeat: {bs: {df: 75, sd: 85}},
  Vulpix: {otherFormes: ['Vulpix-Alola']},
  Woobat: {bs: {hp: 65}},
  Zygarde: {otherFormes: ['Zygarde-10%', 'Zygarde-Complete']},
  Araquanid: {
    types: ['Water', 'Bug'],
    bs: {hp: 68, at: 70, df: 92, sa: 50, sd: 132, sp: 42},
    abilities: {0: 'Water Bubble'},
    weightkg: 82,
    otherFormes: ['Araquanid-Totem'],
  },
  'Araquanid-Totem': {
    types: ['Water', 'Bug'],
    bs: {hp: 68, at: 70, df: 92, sa: 50, sd: 132, sp: 42},
    abilities: {0: 'Water Bubble'},
    weightkg: 217.5,
    baseSpecies: 'Araquanid',
  },
  Bewear: {
    types: ['Normal', 'Fighting'],
    bs: {hp: 120, at: 125, df: 80, sa: 55, sd: 60, sp: 60},
    abilities: {0: 'Fluffy'},
    weightkg: 135,
  },
  Blacephalon: {
    types: ['Fire', 'Ghost'],
    bs: {hp: 53, at: 127, df: 53, sa: 151, sd: 79, sp: 107},
    weightkg: 13,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Bounsweet: {
    types: ['Grass'],
    bs: {hp: 42, at: 30, df: 38, sa: 30, sd: 38, sp: 32},
    weightkg: 3.2,
    nfe: true,
    abilities: {0: 'Leaf Guard'},
  },
  Brionne: {
    types: ['Water'],
    bs: {hp: 60, at: 69, df: 69, sa: 91, sd: 81, sp: 50},
    weightkg: 17.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Bruxish: {
    types: ['Water', 'Psychic'],
    bs: {hp: 68, at: 105, df: 70, sa: 70, sd: 70, sp: 92},
    weightkg: 19,
    abilities: {0: 'Dazzling'},
  },
  Buzzwole: {
    types: ['Bug', 'Fighting'],
    bs: {hp: 107, at: 139, df: 139, sa: 53, sd: 53, sp: 79},
    weightkg: 333.6,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Caribolt: {
    types: ['Grass', 'Electric'],
    bs: {hp: 84, at: 106, df: 82, sa: 77, sd: 80, sp: 106},
    weightkg: 140,
    abilities: {0: 'Overgrow'},
  },
  Celesteela: {
    types: ['Steel', 'Flying'],
    bs: {hp: 97, at: 101, df: 103, sa: 107, sd: 101, sp: 61},
    weightkg: 999.9,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Charjabug: {
    types: ['Bug', 'Electric'],
    bs: {hp: 57, at: 82, df: 95, sa: 55, sd: 75, sp: 36},
    weightkg: 10.5,
    nfe: true,
    abilities: {0: 'Battery'},
  },
  Comfey: {
    types: ['Fairy'],
    bs: {hp: 51, at: 52, df: 90, sa: 82, sd: 110, sp: 100},
    weightkg: 0.3,
    abilities: {0: 'Flower Veil'},
  },
  Cosmoem: {
    types: ['Psychic'],
    bs: {hp: 43, at: 29, df: 131, sa: 29, sd: 131, sp: 37},
    weightkg: 999.9,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Sturdy'},
  },
  Coribalis: {
    types: ['Water', 'Bug'],
    bs: {hp: 76, at: 69, df: 90, sa: 65, sd: 77, sp: 43},
    weightkg: 24.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Cosmog: {
    types: ['Psychic'],
    bs: {hp: 43, at: 29, df: 31, sa: 29, sd: 31, sp: 37},
    weightkg: 0.1,
    nfe: true,
    gender: 'N',
    abilities: {0: 'Unaware'},
  },
  Crabominable: {
    types: ['Fighting', 'Ice'],
    bs: {hp: 97, at: 132, df: 77, sa: 62, sd: 67, sp: 43},
    weightkg: 180,
    abilities: {0: 'Hyper Cutter'},
  },
  Crabrawler: {
    types: ['Fighting'],
    bs: {hp: 47, at: 82, df: 57, sa: 42, sd: 47, sp: 63},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Hyper Cutter'},
  },
  Cutiefly: {
    types: ['Bug', 'Fairy'],
    bs: {hp: 40, at: 45, df: 40, sa: 55, sd: 40, sp: 84},
    weightkg: 0.2,
    nfe: true,
    abilities: {0: 'Honey Gather'},
  },
  Dartrix: {
    types: ['Grass', 'Flying'],
    bs: {hp: 78, at: 75, df: 75, sa: 70, sd: 70, sp: 52},
    weightkg: 16,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Decidueye: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 78, at: 107, df: 75, sa: 100, sd: 100, sp: 70},
    weightkg: 36.6,
    abilities: {0: 'Overgrow'},
  },
  Dewpider: {
    types: ['Water', 'Bug'],
    bs: {hp: 38, at: 40, df: 52, sa: 40, sd: 72, sp: 27},
    weightkg: 4,
    nfe: true,
    abilities: {0: 'Water Bubble'},
  },
  Dhelmise: {
    types: ['Ghost', 'Grass'],
    bs: {hp: 70, at: 131, df: 100, sa: 86, sd: 90, sp: 40},
    weightkg: 210,
    gender: 'N',
    abilities: {0: 'Steelworker'},
  },
  Drampa: {
    types: ['Normal', 'Dragon'],
    bs: {hp: 78, at: 60, df: 85, sa: 135, sd: 91, sp: 36},
    weightkg: 185,
    abilities: {0: 'Berserk'},
  },
  'Diglett-Alola': {
    types: ['Ground', 'Steel'],
    bs: {hp: 10, at: 55, df: 30, sa: 35, sd: 45, sp: 90},
    weightkg: 1,
    baseSpecies: 'Diglett',
    nfe: true,
    abilities: {0: 'Sand Veil'},
  },
  'Dugtrio-Alola': {
    types: ['Ground', 'Steel'],
    bs: {hp: 35, at: 100, df: 60, sa: 50, sd: 70, sp: 110},
    weightkg: 66.6,
    baseSpecies: 'Dugtrio',
    abilities: {0: 'Sand Veil'},
  },
  'Eevee-Starter': {
    types: ['Normal'],
    bs: {hp: 65, at: 75, df: 70, sa: 65, sd: 85, sp: 75},
    weightkg: 6.5,
    abilities: {0: 'Run Away'},
    baseSpecies: 'Eevee',
  },
  Electrelk: {
    types: ['Grass', 'Electric'],
    bs: {hp: 59, at: 81, df: 67, sa: 57, sd: 55, sp: 101},
    weightkg: 41.5,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Equilibra: {
    types: ['Steel', 'Ground'],
    bs: {hp: 102, at: 50, df: 96, sa: 133, sd: 118, sp: 60},
    weightkg: 51.3,
    gender: 'N',
    abilities: {0: 'Levitate'},
  },
  'Exeggutor-Alola': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 95, at: 105, df: 85, sa: 125, sd: 75, sp: 45},
    weightkg: 415.6,
    baseSpecies: 'Exeggutor',
    abilities: {0: 'Frisk'},
  },
  Fawnifer: {
    types: ['Grass'],
    bs: {hp: 49, at: 61, df: 42, sa: 52, sd: 40, sp: 76},
    weightkg: 6.9,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Fomantis: {
    types: ['Grass'],
    bs: {hp: 40, at: 55, df: 35, sa: 50, sd: 35, sp: 35},
    weightkg: 1.5,
    nfe: true,
    abilities: {0: 'Leaf Guard'},
  },
  'Geodude-Alola': {
    types: ['Rock', 'Electric'],
    bs: {hp: 40, at: 80, df: 100, sa: 30, sd: 30, sp: 20},
    weightkg: 20.3,
    baseSpecies: 'Geodude',
    nfe: true,
    abilities: {0: 'Magnet Pull'},
  },
  'Golem-Alola': {
    types: ['Rock', 'Electric'],
    bs: {hp: 80, at: 120, df: 130, sa: 55, sd: 65, sp: 45},
    weightkg: 316,
    abilities: {0: 'Magnet Pull'},
    baseSpecies: 'Golem',
  },
  Golisopod: {
    types: ['Bug', 'Water'],
    bs: {hp: 75, at: 125, df: 140, sa: 60, sd: 90, sp: 40},
    weightkg: 108,
    abilities: {0: 'Emergency Exit'},
  },
  'Graveler-Alola': {
    types: ['Rock', 'Electric'],
    bs: {hp: 55, at: 95, df: 115, sa: 45, sd: 45, sp: 35},
    weightkg: 110,
    baseSpecies: 'Graveler',
    nfe: true,
    abilities: {0: 'Magnet Pull'},
  },
  'Grimer-Alola': {
    types: ['Poison', 'Dark'],
    bs: {hp: 80, at: 80, df: 50, sa: 40, sd: 50, sp: 25},
    weightkg: 42,
    baseSpecies: 'Grimer',
    nfe: true,
    abilities: {0: 'Poison Touch'},
  },
  'Greninja-Ash': {
    types: ['Water', 'Dark'],
    bs: {hp: 72, at: 145, df: 67, sa: 153, sd: 71, sp: 132},
    weightkg: 40,
    abilities: {0: 'Battle Bond'},
    baseSpecies: 'Greninja',
  },
  'Greninja-Bond': {
    types: ['Water', 'Dark'],
    bs: {hp: 72, at: 95, df: 67, sa: 103, sd: 71, sp: 122},
    weightkg: 40,
    abilities: {0: 'Battle Bond'},
    baseSpecies: 'Greninja',
  },
  Grubbin: {
    types: ['Bug'],
    bs: {hp: 47, at: 62, df: 45, sa: 55, sd: 45, sp: 46},
    weightkg: 4.4,
    nfe: true,
    abilities: {0: 'Swarm'},
  },
  Gumshoos: {
    types: ['Normal'],
    bs: {hp: 88, at: 110, df: 60, sa: 55, sd: 60, sp: 45},
    weightkg: 14.2,
    otherFormes: ['Gumshoos-Totem'],
    abilities: {0: 'Stakeout'},
  },
  'Gumshoos-Totem': {
    types: ['Normal'],
    bs: {hp: 88, at: 110, df: 60, sa: 55, sd: 60, sp: 45},
    weightkg: 60,
    baseSpecies: 'Gumshoos',
    abilities: {0: 'Adaptability'},
  },
  Guzzlord: {
    types: ['Dark', 'Dragon'],
    bs: {hp: 223, at: 101, df: 53, sa: 97, sd: 53, sp: 43},
    weightkg: 888,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  'Hakamo-o': {
    types: ['Dragon', 'Fighting'],
    bs: {hp: 55, at: 75, df: 90, sa: 65, sd: 70, sp: 65},
    weightkg: 47,
    nfe: true,
    abilities: {0: 'Bulletproof'},
  },
  Incineroar: {
    types: ['Fire', 'Dark'],
    bs: {hp: 95, at: 115, df: 90, sa: 80, sd: 90, sp: 60},
    weightkg: 83,
    abilities: {0: 'Blaze'},
  },
  'Jangmo-o': {
    types: ['Dragon'],
    bs: {hp: 45, at: 55, df: 65, sa: 45, sd: 45, sp: 45},
    weightkg: 29.7,
    nfe: true,
    abilities: {0: 'Bulletproof'},
  },
  Justyke: {
    types: ['Steel', 'Ground'],
    bs: {hp: 72, at: 70, df: 56, sa: 83, sd: 68, sp: 30},
    weightkg: 36.5,
    nfe: true,
    abilities: {0: 'Levitate'},
    gender: 'N',
  },
  Jumbao: {
    types: ['Grass', 'Fairy'],
    bs: {hp: 92, at: 63, df: 97, sa: 124, sd: 104, sp: 96},
    weightkg: 200,
    abilities: {0: 'Trace'},
  },
  Kartana: {
    types: ['Grass', 'Steel'],
    bs: {hp: 59, at: 181, df: 131, sa: 59, sd: 31, sp: 109},
    weightkg: 0.1,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Komala: {
    types: ['Normal'],
    bs: {hp: 65, at: 115, df: 65, sa: 75, sd: 95, sp: 65},
    weightkg: 19.9,
    abilities: {0: 'Comatose'},
  },
  'Kommo-o': {
    types: ['Dragon', 'Fighting'],
    bs: {hp: 75, at: 110, df: 125, sa: 100, sd: 105, sp: 85},
    weightkg: 78.2,
    otherFormes: ['Kommo-o-Totem'],
    abilities: {0: 'Bulletproof'},
  },
  'Kommo-o-Totem': {
    types: ['Dragon', 'Fighting'],
    bs: {hp: 75, at: 110, df: 125, sa: 100, sd: 105, sp: 85},
    weightkg: 207.5,
    abilities: {0: 'Overcoat'},
    baseSpecies: 'Kommo-o',
  },
  Litten: {
    types: ['Fire'],
    bs: {hp: 45, at: 65, df: 40, sa: 60, sd: 40, sp: 70},
    weightkg: 4.3,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Lunala: {
    types: ['Psychic', 'Ghost'],
    bs: {hp: 137, at: 113, df: 89, sa: 137, sd: 107, sp: 97},
    weightkg: 120,
    abilities: {0: 'Shadow Shield'},
    gender: 'N',
  },
  Lurantis: {
    types: ['Grass'],
    bs: {hp: 70, at: 105, df: 90, sa: 80, sd: 90, sp: 45},
    weightkg: 18.5,
    otherFormes: ['Lurantis-Totem'],
    abilities: {0: 'Leaf Guard'},
  },
  'Lurantis-Totem': {
    types: ['Grass'],
    bs: {hp: 70, at: 105, df: 90, sa: 80, sd: 90, sp: 45},
    weightkg: 58,
    abilities: {0: 'Leaf Guard'},
    baseSpecies: 'Lurantis',
  },
  Lycanroc: {
    types: ['Rock'],
    bs: {hp: 75, at: 115, df: 65, sa: 55, sd: 65, sp: 112},
    weightkg: 25,
    otherFormes: ['Lycanroc-Dusk', 'Lycanroc-Midnight'],
    abilities: {0: 'Keen Eye'},
  },
  'Lycanroc-Dusk': {
    types: ['Rock'],
    bs: {hp: 75, at: 117, df: 65, sa: 55, sd: 65, sp: 110},
    weightkg: 25,
    abilities: {0: 'Tough Claws'},
    baseSpecies: 'Lycanroc',
  },
  'Lycanroc-Midnight': {
    types: ['Rock'],
    bs: {hp: 85, at: 115, df: 75, sa: 55, sd: 75, sp: 82},
    weightkg: 25,
    baseSpecies: 'Lycanroc',
    abilities: {0: 'Keen Eye'},
  },
  Magearna: {
    types: ['Steel', 'Fairy'],
    bs: {hp: 80, at: 95, df: 115, sa: 130, sd: 115, sp: 65},
    weightkg: 80.5,
    gender: 'N',
    abilities: {0: 'Soul-Heart'},
  },
  Mareanie: {
    types: ['Poison', 'Water'],
    bs: {hp: 50, at: 53, df: 62, sa: 43, sd: 52, sp: 45},
    weightkg: 8,
    nfe: true,
    abilities: {0: 'Merciless'},
  },
  'Marowak-Alola': {
    types: ['Fire', 'Ghost'],
    bs: {hp: 60, at: 80, df: 110, sa: 50, sd: 80, sp: 45},
    weightkg: 34,
    abilities: {0: 'Cursed Body'},
    baseSpecies: 'Marowak',
  },
  'Marowak-Alola-Totem': {
    types: ['Fire', 'Ghost'],
    bs: {hp: 60, at: 80, df: 110, sa: 50, sd: 80, sp: 45},
    weightkg: 98,
    abilities: {0: 'Rock Head'},
    baseSpecies: 'Marowak',
  },
  Marshadow: {
    types: ['Fighting', 'Ghost'],
    bs: {hp: 90, at: 125, df: 80, sa: 90, sd: 90, sp: 125},
    weightkg: 22.2,
    gender: 'N',
    abilities: {0: 'Technician'},
  },
  Melmetal: {
    types: ['Steel'],
    bs: {hp: 135, at: 143, df: 143, sa: 80, sd: 65, sp: 34},
    weightkg: 800,
    gender: 'N',
    abilities: {0: 'Iron Fist'},
  },
  // Meltan does NOT benefit from Eviolite and should not have nfe: true (credit: Anubis)
  // https://smogon.com/forums/threads/sword-shield-battle-mechanics-research.3655528/post-8295399
  Meltan: {
    types: ['Steel'],
    bs: {hp: 46, at: 65, df: 65, sa: 55, sd: 35, sp: 34},
    weightkg: 8,
    gender: 'N',
    abilities: {0: 'Magnet Pull'},
  },
  'Meowth-Alola': {
    types: ['Dark'],
    bs: {hp: 40, at: 35, df: 35, sa: 50, sd: 40, sp: 90},
    weightkg: 4.2,
    baseSpecies: 'Meowth',
    nfe: true,
    abilities: {0: 'Pickup'},
  },
  Mimikyu: {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 0.7,
    otherFormes: ['Mimikyu-Busted', 'Mimikyu-Busted-Totem', 'Mimikyu-Totem'],
    abilities: {0: 'Disguise'},
  },
  'Mimikyu-Busted': {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 0.7,
    baseSpecies: 'Mimikyu',
    abilities: {0: 'Disguise'},
  },
  'Mimikyu-Busted-Totem': {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 2.8,
    baseSpecies: 'Mimikyu',
    abilities: {0: 'Disguise'},
  },
  'Mimikyu-Totem': {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 90, df: 80, sa: 50, sd: 105, sp: 96},
    weightkg: 2.8,
    baseSpecies: 'Mimikyu',
    abilities: {0: 'Disguise'},
  },
  Minior: {
    types: ['Rock', 'Flying'],
    bs: {hp: 60, at: 100, df: 60, sa: 100, sd: 60, sp: 120},
    weightkg: 0.3,
    otherFormes: ['Minior-Meteor'],
    gender: 'N',
    abilities: {0: 'Shields Down'},
  },
  'Minior-Meteor': {
    types: ['Rock', 'Flying'],
    bs: {hp: 60, at: 60, df: 100, sa: 60, sd: 100, sp: 60},
    weightkg: 40,
    gender: 'N',
    baseSpecies: 'Minior',
    abilities: {0: 'Shields Down'},
  },
  Morelull: {
    types: ['Grass', 'Fairy'],
    bs: {hp: 40, at: 35, df: 55, sa: 65, sd: 75, sp: 15},
    weightkg: 1.5,
    nfe: true,
    abilities: {0: 'Illuminate'},
  },
  Mudbray: {
    types: ['Ground'],
    bs: {hp: 70, at: 100, df: 70, sa: 45, sd: 55, sp: 45},
    weightkg: 110,
    nfe: true,
    abilities: {0: 'Own Tempo'},
  },
  Mudsdale: {
    types: ['Ground'],
    bs: {hp: 100, at: 125, df: 100, sa: 55, sd: 85, sp: 35},
    weightkg: 920,
    abilities: {0: 'Own Tempo'},
  },
  'Muk-Alola': {
    types: ['Poison', 'Dark'],
    bs: {hp: 105, at: 105, df: 75, sa: 65, sd: 100, sp: 50},
    weightkg: 52,
    baseSpecies: 'Muk',
    abilities: {0: 'Poison Touch'},
  },
  Mumbao: {
    types: ['Grass', 'Fairy'],
    bs: {hp: 55, at: 30, df: 64, sa: 87, sd: 73, sp: 66},
    weightkg: 83,
    nfe: true,
    abilities: {0: 'Trace'},
  },
  Naganadel: {
    types: ['Poison', 'Dragon'],
    bs: {hp: 73, at: 73, df: 73, sa: 127, sd: 73, sp: 121},
    weightkg: 150,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Necrozma: {
    types: ['Psychic'],
    bs: {hp: 97, at: 107, df: 101, sa: 127, sd: 89, sp: 79},
    weightkg: 230,
    abilities: {0: 'Prism Armor'},
    otherFormes: ['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra'],
    gender: 'N',
  },
  'Necrozma-Dawn-Wings': {
    types: ['Psychic', 'Ghost'],
    bs: {hp: 97, at: 113, df: 109, sa: 157, sd: 127, sp: 77},
    weightkg: 350,
    abilities: {0: 'Prism Armor'},
    baseSpecies: 'Necrozma',
    gender: 'N',
  },
  'Necrozma-Dusk-Mane': {
    types: ['Psychic', 'Steel'],
    bs: {hp: 97, at: 157, df: 127, sa: 113, sd: 109, sp: 77},
    weightkg: 460,
    abilities: {0: 'Prism Armor'},
    baseSpecies: 'Necrozma',
    gender: 'N',
  },
  'Necrozma-Ultra': {
    types: ['Psychic', 'Dragon'],
    bs: {hp: 97, at: 167, df: 97, sa: 167, sd: 97, sp: 129},
    weightkg: 230,
    abilities: {0: 'Neuroforce'},
    baseSpecies: 'Necrozma',
    gender: 'N',
  },
  Nihilego: {
    types: ['Rock', 'Poison'],
    bs: {hp: 109, at: 53, df: 47, sa: 127, sd: 131, sp: 103},
    weightkg: 55.5,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  'Ninetales-Alola': {
    types: ['Ice', 'Fairy'],
    bs: {hp: 73, at: 67, df: 75, sa: 81, sd: 100, sp: 109},
    weightkg: 19.9,
    abilities: {0: 'Snow Cloak'},
    baseSpecies: 'Ninetales',
  },
  Oranguru: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 90, at: 60, df: 80, sa: 90, sd: 110, sp: 60},
    weightkg: 76,
    abilities: {0: 'Inner Focus'},
  },
  Oricorio: {
    types: ['Fire', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
    otherFormes: ['Oricorio-Pa\'u', 'Oricorio-Pom-Pom', 'Oricorio-Sensu'],
  },
  'Oricorio-Pa\'u': {
    types: ['Psychic', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
    baseSpecies: 'Oricorio',
  },
  'Oricorio-Pom-Pom': {
    types: ['Electric', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
    baseSpecies: 'Oricorio',
  },
  'Oricorio-Sensu': {
    types: ['Ghost', 'Flying'],
    bs: {hp: 75, at: 70, df: 70, sa: 98, sd: 70, sp: 93},
    weightkg: 3.4,
    abilities: {0: 'Dancer'},
    baseSpecies: 'Oricorio',
  },
  Pajantom: {
    types: ['Dragon', 'Ghost'],
    bs: {hp: 84, at: 133, df: 71, sa: 51, sd: 111, sp: 101},
    weightkg: 3.1,
    abilities: {0: 'Comatose'},
  },
  Palossand: {
    types: ['Ghost', 'Ground'],
    bs: {hp: 85, at: 75, df: 110, sa: 100, sd: 75, sp: 35},
    weightkg: 250,
    abilities: {0: 'Water Compaction'},
  },
  Passimian: {
    types: ['Fighting'],
    bs: {hp: 100, at: 120, df: 90, sa: 40, sd: 60, sp: 80},
    weightkg: 82.8,
    abilities: {0: 'Receiver'},
  },
  'Persian-Alola': {
    types: ['Dark'],
    bs: {hp: 65, at: 60, df: 60, sa: 75, sd: 65, sp: 115},
    weightkg: 33,
    baseSpecies: 'Persian',
    abilities: {0: 'Fur Coat'},
  },
  Pheromosa: {
    types: ['Bug', 'Fighting'],
    bs: {hp: 71, at: 137, df: 37, sa: 137, sd: 37, sp: 151},
    weightkg: 25,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  'Pikachu-Alola': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Hoenn': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Kalos': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Original': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Partner': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Sinnoh': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Starter': {
    types: ['Electric'],
    bs: {hp: 45, at: 80, df: 50, sa: 75, sd: 60, sp: 120},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-Unova': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  Pikipek: {
    types: ['Normal', 'Flying'],
    bs: {hp: 35, at: 75, df: 30, sa: 30, sd: 30, sp: 65},
    weightkg: 1.2,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Poipole: {
    types: ['Poison'],
    bs: {hp: 67, at: 73, df: 67, sa: 73, sd: 67, sp: 73},
    weightkg: 1.8,
    abilities: {0: 'Beast Boost'},
    nfe: true,
    gender: 'N',
  },
  Popplio: {
    types: ['Water'],
    bs: {hp: 50, at: 54, df: 54, sa: 66, sd: 56, sp: 40},
    weightkg: 7.5,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  Primarina: {
    types: ['Water', 'Fairy'],
    bs: {hp: 80, at: 74, df: 74, sa: 126, sd: 116, sp: 60},
    weightkg: 44,
    abilities: {0: 'Torrent'},
  },
  Pyukumuku: {
    types: ['Water'],
    bs: {hp: 55, at: 60, df: 130, sa: 30, sd: 130, sp: 5},
    weightkg: 1.2,
    abilities: {0: 'Innards Out'},
  },
  'Raichu-Alola': {
    types: ['Electric', 'Psychic'],
    bs: {hp: 60, at: 85, df: 50, sa: 95, sd: 85, sp: 110},
    weightkg: 21,
    baseSpecies: 'Raichu',
    abilities: {0: 'Surge Surfer'},
  },
  'Raticate-Alola': {
    types: ['Dark', 'Normal'],
    bs: {hp: 75, at: 71, df: 70, sa: 40, sd: 80, sp: 77},
    weightkg: 25.5,
    baseSpecies: 'Raticate',
    abilities: {0: 'Gluttony'},
  },
  'Raticate-Alola-Totem': {
    types: ['Dark', 'Normal'],
    bs: {hp: 75, at: 71, df: 70, sa: 40, sd: 80, sp: 77},
    weightkg: 105,
    abilities: {0: 'Thick Fat'},
    baseSpecies: 'Raticate',
  },
  'Rattata-Alola': {
    types: ['Dark', 'Normal'],
    bs: {hp: 30, at: 56, df: 35, sa: 25, sd: 35, sp: 72},
    weightkg: 3.8,
    baseSpecies: 'Rattata',
    nfe: true,
    abilities: {0: 'Gluttony'},
  },
  Ribombee: {
    types: ['Bug', 'Fairy'],
    bs: {hp: 60, at: 55, df: 60, sa: 95, sd: 70, sp: 124},
    weightkg: 0.5,
    otherFormes: ['Ribombee-Totem'],
    abilities: {0: 'Honey Gather'},
  },
  'Ribombee-Totem': {
    types: ['Bug', 'Fairy'],
    bs: {hp: 60, at: 55, df: 60, sa: 95, sd: 70, sp: 124},
    weightkg: 2,
    abilities: {0: 'Sweet Veil'},
    baseSpecies: 'Ribombee',
  },
  Rockruff: {
    types: ['Rock'],
    bs: {hp: 45, at: 65, df: 40, sa: 30, sd: 40, sp: 60},
    weightkg: 9.2,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Rowlet: {
    types: ['Grass', 'Flying'],
    bs: {hp: 68, at: 55, df: 55, sa: 50, sd: 50, sp: 42},
    weightkg: 1.5,
    nfe: true,
    abilities: {0: 'Overgrow'},
  },
  Salandit: {
    types: ['Poison', 'Fire'],
    bs: {hp: 48, at: 44, df: 40, sa: 71, sd: 40, sp: 77},
    weightkg: 4.8,
    nfe: true,
    abilities: {0: 'Corrosion'},
  },
  Salazzle: {
    types: ['Poison', 'Fire'],
    bs: {hp: 68, at: 64, df: 60, sa: 111, sd: 60, sp: 117},
    weightkg: 22.2,
    otherFormes: ['Salazzle-Totem'],
    abilities: {0: 'Corrosion'},
  },
  'Salazzle-Totem': {
    types: ['Poison', 'Fire'],
    bs: {hp: 68, at: 64, df: 60, sa: 111, sd: 60, sp: 117},
    weightkg: 81,
    abilities: {0: 'Corrosion'},
    baseSpecies: 'Salazzle',
  },
  'Sandshrew-Alola': {
    types: ['Ice', 'Steel'],
    bs: {hp: 50, at: 75, df: 90, sa: 10, sd: 35, sp: 40},
    weightkg: 40,
    baseSpecies: 'Sandshrew',
    nfe: true,
    abilities: {0: 'Snow Cloak'},
  },
  'Sandslash-Alola': {
    types: ['Ice', 'Steel'],
    bs: {hp: 75, at: 100, df: 120, sa: 25, sd: 65, sp: 65},
    weightkg: 55,
    baseSpecies: 'Sandslash',
    abilities: {0: 'Snow Cloak'},
  },
  Sandygast: {
    types: ['Ghost', 'Ground'],
    bs: {hp: 55, at: 55, df: 80, sa: 70, sd: 45, sp: 15},
    weightkg: 70,
    nfe: true,
    abilities: {0: 'Water Compaction'},
  },
  Shiinotic: {
    types: ['Grass', 'Fairy'],
    bs: {hp: 60, at: 45, df: 80, sa: 90, sd: 100, sp: 30},
    weightkg: 11.5,
    abilities: {0: 'Illuminate'},
  },
  Silvally: {
    types: ['Normal'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    gender: 'N',
    otherFormes: [
      'Silvally-Bug',
      'Silvally-Dark',
      'Silvally-Dragon',
      'Silvally-Electric',
      'Silvally-Fairy',
      'Silvally-Fighting',
      'Silvally-Fire',
      'Silvally-Flying',
      'Silvally-Ghost',
      'Silvally-Grass',
      'Silvally-Ground',
      'Silvally-Ice',
      'Silvally-Poison',
      'Silvally-Psychic',
      'Silvally-Rock',
      'Silvally-Steel',
      'Silvally-Water',
    ],
  },
  'Silvally-Bug': {
    types: ['Bug'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Dark': {
    types: ['Dark'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Dragon': {
    types: ['Dragon'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Electric': {
    types: ['Electric'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Fairy': {
    types: ['Fairy'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Fighting': {
    types: ['Fighting'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Fire': {
    types: ['Fire'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Flying': {
    types: ['Flying'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Ghost': {
    types: ['Ghost'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Grass': {
    types: ['Grass'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Ground': {
    types: ['Ground'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Ice': {
    types: ['Ice'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Poison': {
    types: ['Poison'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Psychic': {
    types: ['Psychic'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Rock': {
    types: ['Rock'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Steel': {
    types: ['Steel'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  'Silvally-Water': {
    types: ['Water'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 95},
    weightkg: 100.5,
    abilities: {0: 'RKS System'},
    baseSpecies: 'Silvally',
    gender: 'N',
  },
  Smogecko: {
    types: ['Fire'],
    bs: {hp: 48, at: 66, df: 43, sa: 58, sd: 48, sp: 56},
    weightkg: 8.5,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Smoguana: {
    types: ['Fire', 'Ground'],
    bs: {hp: 68, at: 86, df: 53, sa: 68, sd: 68, sp: 76},
    weightkg: 22.2,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Smokomodo: {
    types: ['Fire', 'Ground'],
    bs: {hp: 88, at: 116, df: 67, sa: 88, sd: 78, sp: 97},
    weightkg: 205,
    abilities: {0: 'Blaze'},
  },
  Snaelstrom: {
    types: ['Water', 'Bug'],
    bs: {hp: 91, at: 94, df: 110, sa: 80, sd: 97, sp: 63},
    weightkg: 120,
    abilities: {0: 'Torrent'},
  },
  Solgaleo: {
    types: ['Psychic', 'Steel'],
    bs: {hp: 137, at: 137, df: 107, sa: 113, sd: 89, sp: 97},
    weightkg: 230,
    abilities: {0: 'Full Metal Body'},
    gender: 'N',
  },
  Stakataka: {
    types: ['Rock', 'Steel'],
    bs: {hp: 61, at: 131, df: 211, sa: 53, sd: 101, sp: 13},
    weightkg: 820,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Steenee: {
    types: ['Grass'],
    bs: {hp: 52, at: 40, df: 48, sa: 40, sd: 48, sp: 62},
    weightkg: 8.2,
    nfe: true,
    abilities: {0: 'Leaf Guard'},
  },
  Stufful: {
    types: ['Normal', 'Fighting'],
    bs: {hp: 70, at: 75, df: 50, sa: 45, sd: 50, sp: 50},
    weightkg: 6.8,
    abilities: {0: 'Fluffy'},
    nfe: true,
  },
  Swirlpool: {
    types: ['Water'],
    bs: {hp: 61, at: 49, df: 70, sa: 50, sd: 62, sp: 28},
    weightkg: 7,
    nfe: true,
    abilities: {0: 'Torrent'},
  },
  'Tapu Bulu': {
    types: ['Grass', 'Fairy'],
    bs: {hp: 70, at: 130, df: 115, sa: 85, sd: 95, sp: 75},
    weightkg: 45.5,
    abilities: {0: 'Grassy Surge'},
    gender: 'N',
  },
  'Tapu Fini': {
    types: ['Water', 'Fairy'],
    bs: {hp: 70, at: 75, df: 115, sa: 95, sd: 130, sp: 85},
    weightkg: 21.2,
    abilities: {0: 'Misty Surge'},
    gender: 'N',
  },
  'Tapu Koko': {
    types: ['Electric', 'Fairy'],
    bs: {hp: 70, at: 115, df: 85, sa: 95, sd: 75, sp: 130},
    weightkg: 20.5,
    abilities: {0: 'Electric Surge'},
    gender: 'N',
  },
  'Tapu Lele': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 70, at: 85, df: 75, sa: 130, sd: 115, sp: 95},
    weightkg: 18.6,
    abilities: {0: 'Psychic Surge'},
    gender: 'N',
  },
  Togedemaru: {
    types: ['Electric', 'Steel'],
    bs: {hp: 65, at: 98, df: 63, sa: 40, sd: 73, sp: 96},
    weightkg: 3.3,
    abilities: {0: 'Iron Barbs'},
    otherFormes: ['Togedemaru-Totem'],
  },
  'Togedemaru-Totem': {
    types: ['Electric', 'Steel'],
    bs: {hp: 65, at: 98, df: 63, sa: 40, sd: 73, sp: 96},
    weightkg: 13,
    abilities: {0: 'Sturdy'},
    baseSpecies: 'Togedemaru',
  },
  Torracat: {
    types: ['Fire'],
    bs: {hp: 65, at: 85, df: 50, sa: 80, sd: 50, sp: 90},
    weightkg: 25,
    nfe: true,
    abilities: {0: 'Blaze'},
  },
  Toucannon: {
    types: ['Normal', 'Flying'],
    bs: {hp: 80, at: 120, df: 75, sa: 75, sd: 75, sp: 60},
    weightkg: 26,
    abilities: {0: 'Keen Eye'},
  },
  Toxapex: {
    types: ['Poison', 'Water'],
    bs: {hp: 50, at: 63, df: 152, sa: 53, sd: 142, sp: 35},
    weightkg: 14.5,
    abilities: {0: 'Merciless'},
  },
  Trumbeak: {
    types: ['Normal', 'Flying'],
    bs: {hp: 55, at: 85, df: 50, sa: 40, sd: 50, sp: 75},
    weightkg: 14.8,
    nfe: true,
    abilities: {0: 'Keen Eye'},
  },
  Tsareena: {
    types: ['Grass'],
    bs: {hp: 72, at: 120, df: 98, sa: 50, sd: 98, sp: 72},
    weightkg: 21.4,
    abilities: {0: 'Leaf Guard'},
  },
  Turtonator: {
    types: ['Fire', 'Dragon'],
    bs: {hp: 60, at: 78, df: 135, sa: 91, sd: 85, sp: 36},
    weightkg: 212,
    abilities: {0: 'Shell Armor'},
  },
  'Type: Null': {
    types: ['Normal'],
    bs: {hp: 95, at: 95, df: 95, sa: 95, sd: 95, sp: 59},
    weightkg: 120.5,
    abilities: {0: 'Battle Armor'},
    nfe: true,
    gender: 'N',
  },
  Vikavolt: {
    types: ['Bug', 'Electric'],
    bs: {hp: 77, at: 70, df: 90, sa: 145, sd: 75, sp: 43},
    weightkg: 45,
    abilities: {0: 'Levitate'},
    otherFormes: ['Vikavolt-Totem'],
  },
  'Vikavolt-Totem': {
    types: ['Bug', 'Electric'],
    bs: {hp: 77, at: 70, df: 90, sa: 145, sd: 75, sp: 43},
    weightkg: 147.5,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Vikavolt',
  },
  'Vulpix-Alola': {
    types: ['Ice'],
    bs: {hp: 38, at: 41, df: 40, sa: 50, sd: 65, sp: 65},
    weightkg: 9.9,
    baseSpecies: 'Vulpix',
    nfe: true,
    abilities: {0: 'Snow Cloak'},
  },
  Wimpod: {
    types: ['Bug', 'Water'],
    bs: {hp: 25, at: 35, df: 40, sa: 20, sd: 30, sp: 80},
    weightkg: 12,
    abilities: {0: 'Wimp Out'},
    nfe: true,
  },
  Wishiwashi: {
    types: ['Water'],
    bs: {hp: 45, at: 20, df: 20, sa: 25, sd: 25, sp: 40},
    weightkg: 0.3,
    otherFormes: ['Wishiwashi-School'],
    abilities: {0: 'Schooling'},
  },
  'Wishiwashi-School': {
    types: ['Water'],
    bs: {hp: 45, at: 140, df: 130, sa: 140, sd: 135, sp: 30},
    weightkg: 78.6,
    baseSpecies: 'Wishiwashi',
    abilities: {0: 'Schooling'},
  },
  Xurkitree: {
    types: ['Electric'],
    bs: {hp: 83, at: 89, df: 71, sa: 173, sd: 71, sp: 83},
    weightkg: 100,
    abilities: {0: 'Beast Boost'},
    gender: 'N',
  },
  Yungoos: {
    types: ['Normal'],
    bs: {hp: 48, at: 70, df: 30, sa: 30, sd: 30, sp: 45},
    weightkg: 6,
    nfe: true,
    abilities: {0: 'Stakeout'},
  },
  Zeraora: {
    types: ['Electric'],
    bs: {hp: 88, at: 112, df: 75, sa: 102, sd: 80, sp: 143},
    weightkg: 44.5,
    abilities: {0: 'Volt Absorb'},
    gender: 'N',
  },
  'Zygarde-10%': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 54, at: 100, df: 71, sa: 61, sd: 85, sp: 115},
    weightkg: 33.5,
    abilities: {0: 'Aura Break'},
    baseSpecies: 'Zygarde',
    gender: 'N',
  },
  'Zygarde-Complete': {
    types: ['Dragon', 'Ground'],
    bs: {hp: 216, at: 100, df: 121, sa: 91, sd: 95, sp: 85},
    weightkg: 610,
    abilities: {0: 'Power Construct'},
    baseSpecies: 'Zygarde',
    gender: 'N',
  },
};

const SM: {[name: string]: SpeciesData} = extend(true, {}, XY, SM_PATCH);

delete SM['Pikachu-Cosplay'];
delete SM['Pikachu-Rock-Star'];
delete SM['Pikachu-Belle'];
delete SM['Pikachu-PhD'];
delete SM['Pikachu-Pop-Star'];
delete SM['Pikachu-Libre'];

const SS_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  'Aegislash-Blade': {bs: {at: 140, sa: 140}},
  'Aegislash-Both': {bs: {at: 140, df: 140, sa: 140, sd: 140}},
  'Aegislash-Shield': {bs: {df: 140, sd: 140}},
  Articuno: {otherFormes: ['Articuno-Galar']},
  Blastoise: {otherFormes: ['Blastoise-Gmax', 'Blastoise-Mega']},
  Butterfree: {otherFormes: ['Butterfree-Gmax']},
  Charizard: {otherFormes: ['Charizard-Gmax', 'Charizard-Mega-X', 'Charizard-Mega-Y']},
  Corsola: {otherFormes: ['Corsola-Galar']},
  Darmanitan: {
    otherFormes: ['Darmanitan-Galar', 'Darmanitan-Galar-Zen', 'Darmanitan-Zen'],
  },
  Darumaka: {otherFormes: ['Darumaka-Galar']},
  Eevee: {otherFormes: ['Eevee-Gmax']},
  Equilibra: {bs: {sa: 133}},
  'Farfetch\u2019d': {otherFormes: ['Farfetch\u2019d-Galar']},
  Garbodor: {otherFormes: ['Garbodor-Gmax']},
  Gengar: {otherFormes: ['Gengar-Gmax', 'Gengar-Mega']},
  Kingler: {otherFormes: ['Kingler-Gmax']},
  Lapras: {otherFormes: ['Lapras-Gmax']},
  Linoone: {otherFormes: ['Linoone-Galar']},
  Machamp: {otherFormes: ['Machamp-Gmax']},
  Melmetal: {otherFormes: ['Melmetal-Gmax']},
  Meowth: {otherFormes: ['Meowth-Alola', 'Meowth-Galar', 'Meowth-Gmax']},
  Moltres: {otherFormes: ['Moltres-Galar']},
  'Mr. Mime': {otherFormes: ['Mr. Mime-Galar']},
  Pikachu: {
    otherFormes: [
      'Pikachu-Alola',
      'Pikachu-Gmax',
      'Pikachu-Hoenn',
      'Pikachu-Kalos',
      'Pikachu-Original',
      'Pikachu-Partner',
      'Pikachu-Sinnoh',
      'Pikachu-Unova',
      'Pikachu-World',
    ],
  },
  Ponyta: {otherFormes: ['Ponyta-Galar']},
  Pyroak: {bs: {sa: 70, sd: 65}},
  Rapidash: {otherFormes: ['Rapidash-Galar']},
  Slowbro: {otherFormes: ['Slowbro-Galar', 'Slowbro-Mega']},
  Slowking: {otherFormes: ['Slowking-Galar']},
  Slowpoke: {otherFormes: ['Slowpoke-Galar']},
  Snorlax: {otherFormes: ['Snorlax-Gmax']},
  Stunfisk: {otherFormes: ['Stunfisk-Galar']},
  Venusaur: {otherFormes: ['Venusaur-Gmax', 'Venusaur-Mega']},
  Voodoom: {bs: {sa: 130}},
  Weezing: {otherFormes: ['Weezing-Galar']},
  Yamask: {otherFormes: ['Yamask-Galar']},
  Zapdos: {otherFormes: ['Zapdos-Galar']},
  Zigzagoon: {otherFormes: ['Zigzagoon-Galar']},
  Alcremie: {
    types: ['Fairy'],
    bs: {hp: 65, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
    weightkg: 0.5,
    abilities: {0: 'Sweet Veil'},
    otherFormes: ['Alcremie-Gmax'],
  },
  'Alcremie-Gmax': {
    types: ['Fairy'],
    bs: {hp: 65, at: 60, df: 75, sa: 110, sd: 121, sp: 64},
    weightkg: 0,
    abilities: {0: 'Sweet Veil'},
    baseSpecies: 'Alcremie',
  },
  Appletun: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 110, at: 85, df: 80, sa: 100, sd: 80, sp: 30},
    weightkg: 13,
    abilities: {0: 'Ripen'},
    otherFormes: ['Appletun-Gmax'],
  },
  'Appletun-Gmax': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 110, at: 85, df: 80, sa: 100, sd: 80, sp: 30},
    weightkg: 0,
    abilities: {0: 'Ripen'},
    baseSpecies: 'Appletun',
  },
  Applin: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 40, at: 40, df: 80, sa: 40, sd: 40, sp: 20},
    weightkg: 0.5,
    abilities: {0: 'Ripen'},
    nfe: true,
  },
  Arctovish: {
    types: ['Water', 'Ice'],
    bs: {hp: 90, at: 90, df: 100, sa: 80, sd: 90, sp: 55},
    weightkg: 175,
    abilities: {0: 'Water Absorb'},
    gender: 'N',
  },
  Arctozolt: {
    types: ['Electric', 'Ice'],
    bs: {hp: 90, at: 100, df: 90, sa: 90, sd: 80, sp: 55},
    weightkg: 150,
    abilities: {0: 'Volt Absorb'},
    gender: 'N',
  },
  Arrokuda: {
    types: ['Water'],
    bs: {hp: 41, at: 63, df: 40, sa: 40, sd: 30, sp: 66},
    weightkg: 1,
    abilities: {0: 'Swift Swim'},
    nfe: true,
  },
  'Articuno-Galar': {
    types: ['Psychic', 'Flying'],
    bs: {hp: 90, at: 85, df: 85, sa: 125, sd: 100, sp: 95},
    weightkg: 50.9,
    abilities: {0: 'Competitive'},
    gender: 'N',
    baseSpecies: 'Articuno',
  },
  Astrolotl: {
    types: ['Fire', 'Dragon'],
    bs: {hp: 108, at: 108, df: 74, sa: 92, sd: 64, sp: 114},
    weightkg: 50,
    abilities: {0: 'Regenerator'},
  },
  Barraskewda: {
    types: ['Water'],
    bs: {hp: 61, at: 123, df: 60, sa: 60, sd: 50, sp: 136},
    weightkg: 30,
    abilities: {0: 'Swift Swim'},
  },
  'Blastoise-Gmax': {
    types: ['Water'],
    bs: {hp: 79, at: 83, df: 100, sa: 85, sd: 105, sp: 78},
    weightkg: 0,
    abilities: {0: 'Torrent'},
    baseSpecies: 'Blastoise',
  },
  Blipbug: {
    types: ['Bug'],
    bs: {hp: 25, at: 20, df: 20, sa: 25, sd: 45, sp: 45},
    weightkg: 8,
    abilities: {0: 'Swarm'},
    nfe: true,
  },
  Boltund: {
    types: ['Electric'],
    bs: {hp: 69, at: 90, df: 60, sa: 90, sd: 60, sp: 121},
    weightkg: 34,
    abilities: {0: 'Strong Jaw'},
  },
  'Butterfree-Gmax': {
    types: ['Bug', 'Flying'],
    bs: {hp: 60, at: 45, df: 50, sa: 90, sd: 80, sp: 70},
    weightkg: 0,
    abilities: {0: 'Compound Eyes'},
    baseSpecies: 'Butterfree',
  },
  Calyrex: {
    types: ['Psychic', 'Grass'],
    bs: {hp: 100, at: 80, df: 80, sa: 80, sd: 80, sp: 80},
    weightkg: 7.7,
    abilities: {0: 'Unnerve'},
    gender: 'N',
    otherFormes: ['Calyrex-Ice', 'Calyrex-Shadow'],
  },
  'Calyrex-Ice': {
    types: ['Psychic', 'Ice'],
    bs: {hp: 100, at: 165, df: 150, sa: 85, sd: 130, sp: 50},
    weightkg: 809.1,
    abilities: {0: 'As One (Glastrier)'},
    gender: 'N',
    baseSpecies: 'Calyrex',
  },
  'Calyrex-Shadow': {
    types: ['Psychic', 'Ghost'],
    bs: {hp: 100, at: 85, df: 80, sa: 165, sd: 100, sp: 150},
    weightkg: 53.6,
    abilities: {0: 'As One (Spectrier)'},
    gender: 'N',
    baseSpecies: 'Calyrex',
  },
  Carkol: {
    types: ['Rock', 'Fire'],
    bs: {hp: 80, at: 60, df: 90, sa: 60, sd: 70, sp: 50},
    weightkg: 78,
    abilities: {0: 'Steam Engine'},
    nfe: true,
  },
  Centiskorch: {
    types: ['Fire', 'Bug'],
    bs: {hp: 100, at: 115, df: 65, sa: 90, sd: 90, sp: 65},
    weightkg: 120,
    abilities: {0: 'Flash Fire'},
    otherFormes: ['Centiskorch-Gmax'],
  },
  'Centiskorch-Gmax': {
    types: ['Fire', 'Bug'],
    bs: {hp: 100, at: 115, df: 65, sa: 90, sd: 90, sp: 65},
    weightkg: 0,
    abilities: {0: 'Flash Fire'},
    baseSpecies: 'Centiskorch',
  },
  'Charizard-Gmax': {
    types: ['Fire', 'Flying'],
    bs: {hp: 78, at: 84, df: 78, sa: 109, sd: 85, sp: 100},
    weightkg: 0,
    abilities: {0: 'Blaze'},
    baseSpecies: 'Charizard',
  },
  Chewtle: {
    types: ['Water'],
    bs: {hp: 50, at: 64, df: 50, sa: 38, sd: 38, sp: 44},
    weightkg: 8.5,
    abilities: {0: 'Strong Jaw'},
    nfe: true,
  },
  Chromera: {
    types: ['Dark', 'Normal'],
    bs: {hp: 85, at: 85, df: 115, sa: 115, sd: 100, sp: 100},
    weightkg: 215,
    abilities: {0: 'Color Change'},
    gender: 'N',
  },
  Cinderace: {
    types: ['Fire'],
    bs: {hp: 80, at: 116, df: 75, sa: 65, sd: 75, sp: 119},
    weightkg: 33,
    abilities: {0: 'Blaze'},
    otherFormes: ['Cinderace-Gmax'],
  },
  'Cinderace-Gmax': {
    types: ['Fire'],
    bs: {hp: 80, at: 116, df: 75, sa: 65, sd: 75, sp: 119},
    weightkg: 0,
    abilities: {0: 'Blaze'},
    baseSpecies: 'Cinderace',
  },
  Clobbopus: {
    types: ['Fighting'],
    bs: {hp: 50, at: 68, df: 60, sa: 50, sd: 50, sp: 32},
    weightkg: 4,
    abilities: {0: 'Limber'},
    nfe: true,
  },
  Coalossal: {
    types: ['Rock', 'Fire'],
    bs: {hp: 110, at: 80, df: 120, sa: 80, sd: 90, sp: 30},
    weightkg: 310.5,
    abilities: {0: 'Steam Engine'},
    otherFormes: ['Coalossal-Gmax'],
  },
  'Coalossal-Gmax': {
    types: ['Rock', 'Fire'],
    bs: {hp: 110, at: 80, df: 120, sa: 80, sd: 90, sp: 30},
    weightkg: 0,
    abilities: {0: 'Steam Engine'},
    baseSpecies: 'Coalossal',
  },
  Copperajah: {
    types: ['Steel'],
    bs: {hp: 122, at: 130, df: 69, sa: 80, sd: 69, sp: 30},
    weightkg: 650,
    abilities: {0: 'Sheer Force'},
    otherFormes: ['Copperajah-Gmax'],
  },
  'Copperajah-Gmax': {
    types: ['Steel'],
    bs: {hp: 122, at: 130, df: 69, sa: 80, sd: 69, sp: 30},
    weightkg: 0,
    abilities: {0: 'Sheer Force'},
    baseSpecies: 'Copperajah',
  },
  'Corsola-Galar': {
    types: ['Ghost'],
    bs: {hp: 60, at: 55, df: 100, sa: 65, sd: 100, sp: 30},
    weightkg: 0.5,
    abilities: {0: 'Weak Armor'},
    nfe: true,
    baseSpecies: 'Corsola',
  },
  Corviknight: {
    types: ['Flying', 'Steel'],
    bs: {hp: 98, at: 87, df: 105, sa: 53, sd: 85, sp: 67},
    weightkg: 75,
    abilities: {0: 'Pressure'},
    otherFormes: ['Corviknight-Gmax'],
  },
  'Corviknight-Gmax': {
    types: ['Flying', 'Steel'],
    bs: {hp: 98, at: 87, df: 105, sa: 53, sd: 85, sp: 67},
    weightkg: 0,
    abilities: {0: 'Pressure'},
    baseSpecies: 'Corviknight',
  },
  Corvisquire: {
    types: ['Flying'],
    bs: {hp: 68, at: 67, df: 55, sa: 43, sd: 55, sp: 77},
    weightkg: 16,
    abilities: {0: 'Keen Eye'},
    nfe: true,
  },
  Cramorant: {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    otherFormes: ['Cramorant-Gorging', 'Cramorant-Gulping'],
  },
  'Cramorant-Gorging': {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    baseSpecies: 'Cramorant',
  },
  'Cramorant-Gulping': {
    types: ['Flying', 'Water'],
    bs: {hp: 70, at: 85, df: 55, sa: 85, sd: 95, sp: 85},
    weightkg: 18,
    abilities: {0: 'Gulp Missile'},
    baseSpecies: 'Cramorant',
  },
  Cufant: {
    types: ['Steel'],
    bs: {hp: 72, at: 80, df: 49, sa: 40, sd: 49, sp: 40},
    weightkg: 100,
    abilities: {0: 'Sheer Force'},
    nfe: true,
  },
  Cursola: {
    types: ['Ghost'],
    bs: {hp: 60, at: 95, df: 50, sa: 145, sd: 130, sp: 30},
    weightkg: 0.4,
    abilities: {0: 'Weak Armor'},
  },
  'Darmanitan-Galar': {
    types: ['Ice'],
    bs: {hp: 105, at: 140, df: 55, sa: 30, sd: 55, sp: 95},
    weightkg: 120,
    abilities: {0: 'Gorilla Tactics'},
    baseSpecies: 'Darmanitan',
  },
  'Darmanitan-Galar-Zen': {
    types: ['Ice', 'Fire'],
    bs: {hp: 105, at: 160, df: 55, sa: 30, sd: 55, sp: 135},
    weightkg: 120,
    abilities: {0: 'Zen Mode'},
    baseSpecies: 'Darmanitan',
  },
  'Darumaka-Galar': {
    types: ['Ice'],
    bs: {hp: 70, at: 90, df: 45, sa: 15, sd: 45, sp: 50},
    weightkg: 40,
    abilities: {0: 'Hustle'},
    nfe: true,
    baseSpecies: 'Darumaka',
  },
  Dottler: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 50, at: 35, df: 80, sa: 50, sd: 90, sp: 30},
    weightkg: 19.5,
    abilities: {0: 'Swarm'},
    nfe: true,
  },
  Dracovish: {
    types: ['Water', 'Dragon'],
    bs: {hp: 90, at: 90, df: 100, sa: 70, sd: 80, sp: 75},
    weightkg: 215,
    abilities: {0: 'Water Absorb'},
    gender: 'N',
  },
  Dracozolt: {
    types: ['Electric', 'Dragon'],
    bs: {hp: 90, at: 100, df: 90, sa: 80, sd: 70, sp: 75},
    weightkg: 190,
    abilities: {0: 'Volt Absorb'},
    gender: 'N',
  },
  Dragapult: {
    types: ['Dragon', 'Ghost'],
    bs: {hp: 88, at: 120, df: 75, sa: 100, sd: 75, sp: 142},
    weightkg: 50,
    abilities: {0: 'Clear Body'},
  },
  Drakloak: {
    types: ['Dragon', 'Ghost'],
    bs: {hp: 68, at: 80, df: 50, sa: 60, sd: 50, sp: 102},
    weightkg: 11,
    abilities: {0: 'Clear Body'},
    nfe: true,
  },
  Drednaw: {
    types: ['Water', 'Rock'],
    bs: {hp: 90, at: 115, df: 90, sa: 48, sd: 68, sp: 74},
    weightkg: 115.5,
    abilities: {0: 'Strong Jaw'},
    otherFormes: ['Drednaw-Gmax'],
  },
  'Drednaw-Gmax': {
    types: ['Water', 'Rock'],
    bs: {hp: 90, at: 115, df: 90, sa: 48, sd: 68, sp: 74},
    weightkg: 0,
    abilities: {0: 'Strong Jaw'},
    baseSpecies: 'Drednaw',
  },
  Dreepy: {
    types: ['Dragon', 'Ghost'],
    bs: {hp: 28, at: 60, df: 30, sa: 40, sd: 30, sp: 82},
    weightkg: 2,
    abilities: {0: 'Clear Body'},
    nfe: true,
  },
  Drizzile: {
    types: ['Water'],
    bs: {hp: 65, at: 60, df: 55, sa: 95, sd: 55, sp: 90},
    weightkg: 11.5,
    abilities: {0: 'Torrent'},
    nfe: true,
  },
  Dubwool: {
    types: ['Normal'],
    bs: {hp: 72, at: 80, df: 100, sa: 60, sd: 90, sp: 88},
    weightkg: 43,
    abilities: {0: 'Fluffy'},
  },
  Duraludon: {
    types: ['Steel', 'Dragon'],
    bs: {hp: 70, at: 95, df: 115, sa: 120, sd: 50, sp: 85},
    weightkg: 40,
    abilities: {0: 'Light Metal'},
    otherFormes: ['Duraludon-Gmax'],
  },
  'Duraludon-Gmax': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 70, at: 95, df: 115, sa: 120, sd: 50, sp: 85},
    weightkg: 0,
    abilities: {0: 'Light Metal'},
    baseSpecies: 'Duraludon',
  },
  'Eevee-Gmax': {
    types: ['Normal'],
    bs: {hp: 55, at: 55, df: 50, sa: 45, sd: 65, sp: 55},
    weightkg: 0,
    abilities: {0: 'Run Away'},
    baseSpecies: 'Eevee',
  },
  Eiscue: {
    types: ['Ice'],
    bs: {hp: 75, at: 80, df: 110, sa: 65, sd: 90, sp: 50},
    weightkg: 89,
    abilities: {0: 'Ice Face'},
    otherFormes: ['Eiscue-Noice'],
  },
  'Eiscue-Noice': {
    types: ['Ice'],
    bs: {hp: 75, at: 80, df: 70, sa: 65, sd: 50, sp: 130},
    weightkg: 89,
    abilities: {0: 'Ice Face'},
    baseSpecies: 'Eiscue',
  },
  Eldegoss: {
    types: ['Grass'],
    bs: {hp: 60, at: 50, df: 90, sa: 80, sd: 120, sp: 60},
    weightkg: 2.5,
    abilities: {0: 'Cotton Down'},
  },
  Eternatus: {
    types: ['Poison', 'Dragon'],
    bs: {hp: 140, at: 85, df: 95, sa: 145, sd: 95, sp: 130},
    weightkg: 950,
    abilities: {0: 'Pressure'},
    gender: 'N',
    otherFormes: ['Eternatus-Eternamax'],
  },
  'Eternatus-Eternamax': {
    types: ['Poison', 'Dragon'],
    bs: {hp: 255, at: 115, df: 250, sa: 125, sd: 250, sp: 130},
    weightkg: 0,
    abilities: {0: 'Pressure'},
    gender: 'N',
    baseSpecies: 'Eternatus',
  },
  Falinks: {
    types: ['Fighting'],
    bs: {hp: 65, at: 100, df: 100, sa: 70, sd: 60, sp: 75},
    weightkg: 62,
    abilities: {0: 'Battle Armor'},
    gender: 'N',
  },
  'Farfetch\u2019d-Galar': {
    types: ['Fighting'],
    bs: {hp: 52, at: 95, df: 55, sa: 58, sd: 62, sp: 55},
    weightkg: 42,
    abilities: {0: 'Steadfast'},
    nfe: true,
    baseSpecies: 'Farfetch\u2019d',
  },
  Flapple: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 70, at: 110, df: 80, sa: 95, sd: 60, sp: 70},
    weightkg: 1,
    abilities: {0: 'Ripen'},
    otherFormes: ['Flapple-Gmax'],
  },
  'Flapple-Gmax': {
    types: ['Grass', 'Dragon'],
    bs: {hp: 70, at: 110, df: 80, sa: 95, sd: 60, sp: 70},
    weightkg: 0,
    abilities: {0: 'Ripen'},
    baseSpecies: 'Flapple',
  },
  Frosmoth: {
    types: ['Ice', 'Bug'],
    bs: {hp: 70, at: 65, df: 60, sa: 125, sd: 90, sp: 65},
    weightkg: 42,
    abilities: {0: 'Shield Dust'},
  },
  'Garbodor-Gmax': {
    types: ['Poison'],
    bs: {hp: 80, at: 95, df: 82, sa: 60, sd: 82, sp: 75},
    weightkg: 0,
    abilities: {0: 'Stench'},
    baseSpecies: 'Garbodor',
  },
  'Gengar-Gmax': {
    types: ['Ghost', 'Poison'],
    bs: {hp: 60, at: 65, df: 60, sa: 130, sd: 75, sp: 110},
    weightkg: 0,
    abilities: {0: 'Cursed Body'},
    baseSpecies: 'Gengar',
  },
  Glastrier: {
    types: ['Ice'],
    bs: {hp: 100, at: 145, df: 130, sa: 65, sd: 110, sp: 30},
    weightkg: 800,
    abilities: {0: 'Chilling Neigh'},
    gender: 'N',
  },
  Gossifleur: {
    types: ['Grass'],
    bs: {hp: 40, at: 40, df: 60, sa: 40, sd: 60, sp: 10},
    weightkg: 2.2,
    abilities: {0: 'Cotton Down'},
    nfe: true,
  },
  Grapploct: {
    types: ['Fighting'],
    bs: {hp: 80, at: 118, df: 90, sa: 70, sd: 80, sp: 42},
    weightkg: 39,
    abilities: {0: 'Limber'},
  },
  Greedent: {
    types: ['Normal'],
    bs: {hp: 120, at: 95, df: 95, sa: 55, sd: 75, sp: 20},
    weightkg: 6,
    abilities: {0: 'Cheek Pouch'},
  },
  Grimmsnarl: {
    types: ['Dark', 'Fairy'],
    bs: {hp: 95, at: 120, df: 65, sa: 95, sd: 75, sp: 60},
    weightkg: 61,
    abilities: {0: 'Prankster'},
    otherFormes: ['Grimmsnarl-Gmax'],
  },
  'Grimmsnarl-Gmax': {
    types: ['Dark', 'Fairy'],
    bs: {hp: 95, at: 120, df: 65, sa: 95, sd: 75, sp: 60},
    weightkg: 0,
    abilities: {0: 'Prankster'},
    baseSpecies: 'Grimmsnarl',
  },
  Grookey: {
    types: ['Grass'],
    bs: {hp: 50, at: 65, df: 50, sa: 40, sd: 40, sp: 65},
    weightkg: 5,
    abilities: {0: 'Overgrow'},
    nfe: true,
  },
  Hatenna: {
    types: ['Psychic'],
    bs: {hp: 42, at: 30, df: 45, sa: 56, sd: 53, sp: 39},
    weightkg: 3.4,
    abilities: {0: 'Healer'},
    nfe: true,
  },
  Hatterene: {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 57, at: 90, df: 95, sa: 136, sd: 103, sp: 29},
    weightkg: 5.1,
    abilities: {0: 'Healer'},
    otherFormes: ['Hatterene-Gmax'],
  },
  'Hatterene-Gmax': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 57, at: 90, df: 95, sa: 136, sd: 103, sp: 29},
    weightkg: 0,
    abilities: {0: 'Healer'},
    baseSpecies: 'Hatterene',
  },
  Hattrem: {
    types: ['Psychic'],
    bs: {hp: 57, at: 40, df: 65, sa: 86, sd: 73, sp: 49},
    weightkg: 4.8,
    abilities: {0: 'Healer'},
    nfe: true,
  },
  Impidimp: {
    types: ['Dark', 'Fairy'],
    bs: {hp: 45, at: 45, df: 30, sa: 55, sd: 40, sp: 50},
    weightkg: 5.5,
    abilities: {0: 'Prankster'},
    nfe: true,
  },
  Indeedee: {
    types: ['Psychic', 'Normal'],
    bs: {hp: 60, at: 65, df: 55, sa: 105, sd: 95, sp: 95},
    weightkg: 28,
    abilities: {0: 'Inner Focus'},
    otherFormes: ['Indeedee-F'],
  },
  'Indeedee-F': {
    types: ['Psychic', 'Normal'],
    bs: {hp: 70, at: 55, df: 65, sa: 95, sd: 105, sp: 85},
    weightkg: 28,
    abilities: {0: 'Own Tempo'},
    baseSpecies: 'Indeedee',
  },
  Inteleon: {
    types: ['Water'],
    bs: {hp: 70, at: 85, df: 65, sa: 125, sd: 65, sp: 120},
    weightkg: 45.2,
    abilities: {0: 'Torrent'},
    otherFormes: ['Inteleon-Gmax'],
  },
  'Inteleon-Gmax': {
    types: ['Water'],
    bs: {hp: 70, at: 85, df: 65, sa: 125, sd: 65, sp: 120},
    weightkg: 0,
    abilities: {0: 'Torrent'},
    baseSpecies: 'Inteleon',
  },
  'Kingler-Gmax': {
    types: ['Water'],
    bs: {hp: 55, at: 130, df: 115, sa: 50, sd: 50, sp: 75},
    weightkg: 0,
    abilities: {0: 'Hyper Cutter'},
    baseSpecies: 'Kingler',
  },
  'Kubfu': {
    types: ['Fighting'],
    bs: {hp: 60, at: 90, df: 60, sa: 53, sd: 50, sp: 72},
    weightkg: 12,
    nfe: true,
    abilities: {0: 'Inner Focus'},
  },
  'Lapras-Gmax': {
    types: ['Water', 'Ice'],
    bs: {hp: 130, at: 85, df: 80, sa: 85, sd: 95, sp: 60},
    weightkg: 0,
    abilities: {0: 'Water Absorb'},
    baseSpecies: 'Lapras',
  },
  'Linoone-Galar': {
    types: ['Dark', 'Normal'],
    bs: {hp: 78, at: 70, df: 61, sa: 50, sd: 61, sp: 100},
    weightkg: 32.5,
    abilities: {0: 'Pickup'},
    nfe: true,
    baseSpecies: 'Linoone',
  },
  Magearna: {otherFormes: ['Magearna-Original']},
  'Magearna-Original': {
    baseSpecies: 'Magearna',
    types: ['Steel', 'Fairy'],
    bs: {hp: 80, at: 95, df: 115, sa: 130, sd: 115, sp: 65},
    weightkg: 80.5,
    gender: 'N',
    abilities: {0: 'Soul-Heart'},
  },
  'Machamp-Gmax': {
    types: ['Fighting'],
    bs: {hp: 90, at: 130, df: 80, sa: 65, sd: 85, sp: 55},
    weightkg: 0,
    abilities: {0: 'Guts'},
    baseSpecies: 'Machamp',
  },
  'Melmetal-Gmax': {
    types: ['Steel'],
    bs: {hp: 135, at: 143, df: 143, sa: 80, sd: 65, sp: 34},
    weightkg: 0,
    abilities: {0: 'Iron Fist'},
    baseSpecies: 'Melmetal',
    gender: 'N',
  },
  'Meowth-Galar': {
    types: ['Steel'],
    bs: {hp: 50, at: 65, df: 55, sa: 40, sd: 40, sp: 40},
    weightkg: 7.5,
    abilities: {0: 'Pickup'},
    nfe: true,
    baseSpecies: 'Meowth',
  },
  'Meowth-Gmax': {
    types: ['Normal'],
    bs: {hp: 40, at: 45, df: 35, sa: 40, sd: 40, sp: 90},
    weightkg: 0,
    abilities: {0: 'Pickup'},
    baseSpecies: 'Meowth',
  },
  Miasmaw: {
    types: ['Bug', 'Dragon'],
    bs: {hp: 85, at: 135, df: 60, sa: 88, sd: 105, sp: 99},
    weightkg: 57,
    abilities: {0: 'Neutralizing Gas'},
  },
  Miasmite: {
    types: ['Bug', 'Dragon'],
    bs: {hp: 40, at: 85, df: 60, sa: 52, sd: 52, sp: 44},
    weightkg: 10.1,
    abilities: {0: 'Neutralizing Gas'},
    nfe: true,
  },
  Milcery: {
    types: ['Fairy'],
    bs: {hp: 45, at: 40, df: 40, sa: 50, sd: 61, sp: 34},
    weightkg: 0.3,
    abilities: {0: 'Sweet Veil'},
    nfe: true,
  },
  'Moltres-Galar': {
    types: ['Dark', 'Flying'],
    bs: {hp: 90, at: 85, df: 90, sa: 100, sd: 125, sp: 90},
    weightkg: 66,
    abilities: {0: 'Berserk'},
    gender: 'N',
    baseSpecies: 'Moltres',
  },
  Morgrem: {
    types: ['Dark', 'Fairy'],
    bs: {hp: 65, at: 60, df: 45, sa: 75, sd: 55, sp: 70},
    weightkg: 12.5,
    abilities: {0: 'Prankster'},
    nfe: true,
  },
  Morpeko: {
    types: ['Electric', 'Dark'],
    bs: {hp: 58, at: 95, df: 58, sa: 70, sd: 58, sp: 97},
    weightkg: 3,
    abilities: {0: 'Hunger Switch'},
    otherFormes: ['Morpeko-Hangry'],
  },
  'Morpeko-Hangry': {
    types: ['Electric', 'Dark'],
    bs: {hp: 58, at: 95, df: 58, sa: 70, sd: 58, sp: 97},
    weightkg: 3,
    abilities: {0: 'Hunger Switch'},
    baseSpecies: 'Morpeko',
  },
  'Mr. Mime-Galar': {
    types: ['Ice', 'Psychic'],
    bs: {hp: 50, at: 65, df: 65, sa: 90, sd: 90, sp: 100},
    weightkg: 56.8,
    abilities: {0: 'Vital Spirit'},
    nfe: true,
    baseSpecies: 'Mr. Mime',
  },
  'Mr. Rime': {
    types: ['Ice', 'Psychic'],
    bs: {hp: 80, at: 85, df: 75, sa: 110, sd: 100, sp: 70},
    weightkg: 58.2,
    abilities: {0: 'Tangled Feet'},
  },
  Nickit: {
    types: ['Dark'],
    bs: {hp: 40, at: 28, df: 28, sa: 47, sd: 52, sp: 50},
    weightkg: 8.9,
    abilities: {0: 'Run Away'},
    nfe: true,
  },
  Obstagoon: {
    types: ['Dark', 'Normal'],
    bs: {hp: 93, at: 90, df: 101, sa: 60, sd: 81, sp: 95},
    weightkg: 46,
    abilities: {0: 'Reckless'},
  },
  Orbeetle: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 60, at: 45, df: 110, sa: 80, sd: 120, sp: 90},
    weightkg: 40.8,
    abilities: {0: 'Swarm'},
    otherFormes: ['Orbeetle-Gmax'],
  },
  'Orbeetle-Gmax': {
    types: ['Bug', 'Psychic'],
    bs: {hp: 60, at: 45, df: 110, sa: 80, sd: 120, sp: 90},
    weightkg: 0,
    abilities: {0: 'Swarm'},
    baseSpecies: 'Orbeetle',
  },
  Perrserker: {
    types: ['Steel'],
    bs: {hp: 70, at: 110, df: 100, sa: 50, sd: 60, sp: 50},
    weightkg: 28,
    abilities: {0: 'Battle Armor'},
  },
  'Pikachu-Gmax': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 0,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  'Pikachu-World': {
    types: ['Electric'],
    bs: {hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90},
    weightkg: 6,
    abilities: {0: 'Static'},
    baseSpecies: 'Pikachu',
  },
  Pincurchin: {
    types: ['Electric'],
    bs: {hp: 48, at: 101, df: 95, sa: 91, sd: 85, sp: 15},
    weightkg: 1,
    abilities: {0: 'Lightning Rod'},
  },
  Polteageist: {
    types: ['Ghost'],
    bs: {hp: 60, at: 65, df: 65, sa: 134, sd: 114, sp: 70},
    weightkg: 0.4,
    abilities: {0: 'Weak Armor'},
    otherFormes: ['Polteageist-Antique'],
    gender: 'N',
  },
  'Polteageist-Antique': {
    types: ['Ghost'],
    bs: {hp: 60, at: 65, df: 65, sa: 134, sd: 114, sp: 70},
    weightkg: 0.4,
    abilities: {0: 'Weak Armor'},
    baseSpecies: 'Polteageist',
    gender: 'N',
  },
  'Ponyta-Galar': {
    types: ['Psychic'],
    bs: {hp: 50, at: 85, df: 55, sa: 65, sd: 65, sp: 90},
    weightkg: 24,
    abilities: {0: 'Run Away'},
    nfe: true,
    baseSpecies: 'Ponyta',
  },
  Raboot: {
    types: ['Fire'],
    bs: {hp: 65, at: 86, df: 60, sa: 55, sd: 60, sp: 94},
    weightkg: 9,
    abilities: {0: 'Blaze'},
    nfe: true,
  },
  'Rapidash-Galar': {
    types: ['Psychic', 'Fairy'],
    bs: {hp: 65, at: 100, df: 70, sa: 80, sd: 80, sp: 105},
    weightkg: 80,
    abilities: {0: 'Run Away'},
    baseSpecies: 'Rapidash',
  },
  Regidrago: {
    types: ['Dragon'],
    bs: {hp: 200, at: 100, df: 50, sa: 100, sd: 50, sp: 80},
    weightkg: 200,
    abilities: {0: 'Dragon\'s Maw'},
    gender: 'N',
  },
  Regieleki: {
    types: ['Electric'],
    bs: {hp: 80, at: 100, df: 50, sa: 100, sd: 50, sp: 200},
    weightkg: 145,
    abilities: {0: 'Transistor'},
    gender: 'N',
  },
  Rillaboom: {
    types: ['Grass'],
    bs: {hp: 100, at: 125, df: 90, sa: 60, sd: 70, sp: 85},
    weightkg: 90,
    abilities: {0: 'Overgrow'},
    otherFormes: ['Rillaboom-Gmax'],
  },
  'Rillaboom-Gmax': {
    types: ['Grass'],
    bs: {hp: 100, at: 125, df: 90, sa: 60, sd: 70, sp: 85},
    weightkg: 0,
    abilities: {0: 'Overgrow'},
    baseSpecies: 'Rillaboom',
  },
  Rolycoly: {
    types: ['Rock'],
    bs: {hp: 30, at: 40, df: 50, sa: 40, sd: 50, sp: 30},
    weightkg: 12,
    abilities: {0: 'Steam Engine'},
    nfe: true,
  },
  Rookidee: {
    types: ['Flying'],
    bs: {hp: 38, at: 47, df: 35, sa: 33, sd: 35, sp: 57},
    weightkg: 1.8,
    abilities: {0: 'Keen Eye'},
    nfe: true,
  },
  Runerigus: {
    types: ['Ground', 'Ghost'],
    bs: {hp: 58, at: 95, df: 145, sa: 50, sd: 105, sp: 30},
    weightkg: 66.6,
    abilities: {0: 'Wandering Spirit'},
  },
  Saharaja: {
    types: ['Ground'],
    bs: {hp: 70, at: 112, df: 105, sa: 65, sd: 123, sp: 78},
    weightkg: 303.9,
    abilities: {0: 'Water Absorb'},
  },
  Saharascal: {
    types: ['Ground'],
    bs: {hp: 50, at: 80, df: 65, sa: 45, sd: 90, sp: 70},
    weightkg: 48,
    abilities: {0: 'Water Absorb'},
    nfe: true,
  },
  Sandaconda: {
    types: ['Ground'],
    bs: {hp: 72, at: 107, df: 125, sa: 65, sd: 70, sp: 71},
    weightkg: 65.5,
    abilities: {0: 'Sand Spit'},
    otherFormes: ['Sandaconda-Gmax'],
  },
  'Sandaconda-Gmax': {
    types: ['Ground'],
    bs: {hp: 72, at: 107, df: 125, sa: 65, sd: 70, sp: 71},
    weightkg: 0,
    abilities: {0: 'Sand Spit'},
    baseSpecies: 'Sandaconda',
  },
  Scorbunny: {
    types: ['Fire'],
    bs: {hp: 50, at: 71, df: 40, sa: 40, sd: 40, sp: 69},
    weightkg: 4.5,
    abilities: {0: 'Blaze'},
    nfe: true,
  },
  Silicobra: {
    types: ['Ground'],
    bs: {hp: 52, at: 57, df: 75, sa: 35, sd: 50, sp: 46},
    weightkg: 7.6,
    abilities: {0: 'Sand Spit'},
    nfe: true,
  },
  Sinistea: {
    types: ['Ghost'],
    bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
    weightkg: 0.2,
    abilities: {0: 'Weak Armor'},
    nfe: true,
    otherFormes: ['Sinistea-Antique'],
    gender: 'N',
  },
  'Sinistea-Antique': {
    types: ['Ghost'],
    bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
    weightkg: 0.2,
    abilities: {0: 'Weak Armor'},
    nfe: true,
    baseSpecies: 'Sinistea',
    gender: 'N',
  },
  'Sirfetch\u2019d': {
    types: ['Fighting'],
    bs: {hp: 62, at: 135, df: 95, sa: 68, sd: 82, sp: 65},
    weightkg: 117,
    abilities: {0: 'Steadfast'},
  },
  Sizzlipede: {
    types: ['Fire', 'Bug'],
    bs: {hp: 50, at: 65, df: 45, sa: 50, sd: 50, sp: 45},
    weightkg: 1,
    abilities: {0: 'Flash Fire'},
    nfe: true,
  },
  Skwovet: {
    types: ['Normal'],
    bs: {hp: 70, at: 55, df: 55, sa: 35, sd: 35, sp: 25},
    weightkg: 2.5,
    abilities: {0: 'Cheek Pouch'},
    nfe: true,
  },
  'Slowbro-Galar': {
    types: ['Poison', 'Psychic'],
    bs: {hp: 95, at: 100, df: 95, sa: 100, sd: 70, sp: 30},
    weightkg: 70.5,
    abilities: {0: 'Quick Draw'},
    baseSpecies: 'Slowbro',
  },
  'Slowking-Galar': {
    types: ['Poison', 'Psychic'],
    bs: {hp: 95, at: 65, df: 80, sa: 110, sd: 110, sp: 30},
    weightkg: 79.5,
    abilities: {0: 'Curious Medicine'},
    baseSpecies: 'Slowking',
  },
  'Slowpoke-Galar': {
    types: ['Psychic'],
    bs: {hp: 90, at: 65, df: 65, sa: 40, sd: 40, sp: 15},
    weightkg: 36,
    nfe: true,
    abilities: {0: 'Gluttony'},
    baseSpecies: 'Slowpoke',
  },
  Solotl: {
    types: ['Fire', 'Dragon'],
    bs: {hp: 68, at: 48, df: 34, sa: 72, sd: 24, sp: 84},
    weightkg: 11.8,
    nfe: true,
    abilities: {0: 'Regenerator'},
  },
  Snom: {
    types: ['Ice', 'Bug'],
    bs: {hp: 30, at: 25, df: 35, sa: 45, sd: 30, sp: 20},
    weightkg: 3.8,
    abilities: {0: 'Shield Dust'},
    nfe: true,
  },
  'Snorlax-Gmax': {
    types: ['Normal'],
    bs: {hp: 160, at: 110, df: 65, sa: 65, sd: 110, sp: 30},
    weightkg: 0,
    abilities: {0: 'Immunity'},
    baseSpecies: 'Snorlax',
  },
  Sobble: {
    types: ['Water'],
    bs: {hp: 50, at: 40, df: 40, sa: 70, sd: 40, sp: 70},
    weightkg: 4,
    abilities: {0: 'Torrent'},
    nfe: true,
  },
  Spectrier: {
    types: ['Ghost'],
    bs: {hp: 100, at: 65, df: 60, sa: 145, sd: 80, sp: 130},
    weightkg: 44.5,
    abilities: {0: 'Grim Neigh'},
    gender: 'N',
  },
  Stonjourner: {
    types: ['Rock'],
    bs: {hp: 100, at: 125, df: 135, sa: 20, sd: 20, sp: 70},
    weightkg: 520,
    abilities: {0: 'Power Spot'},
  },
  'Stunfisk-Galar': {
    types: ['Ground', 'Steel'],
    bs: {hp: 109, at: 81, df: 99, sa: 66, sd: 84, sp: 32},
    weightkg: 20.5,
    abilities: {0: 'Mimicry'},
    baseSpecies: 'Stunfisk',
  },
  Thievul: {
    types: ['Dark'],
    bs: {hp: 70, at: 58, df: 58, sa: 87, sd: 92, sp: 90},
    weightkg: 19.9,
    abilities: {0: 'Run Away'},
  },
  Thwackey: {
    types: ['Grass'],
    bs: {hp: 70, at: 85, df: 70, sa: 55, sd: 60, sp: 80},
    weightkg: 14,
    abilities: {0: 'Overgrow'},
    nfe: true,
  },
  Toxel: {
    types: ['Electric', 'Poison'],
    bs: {hp: 40, at: 38, df: 35, sa: 54, sd: 35, sp: 40},
    weightkg: 11,
    abilities: {0: 'Rattled'},
    nfe: true,
  },
  Toxtricity: {
    types: ['Electric', 'Poison'],
    bs: {hp: 75, at: 98, df: 70, sa: 114, sd: 70, sp: 75},
    weightkg: 40,
    abilities: {0: 'Punk Rock'},
    otherFormes: ['Toxtricity-Gmax', 'Toxtricity-Low-Key', 'Toxtricity-Low-Key-Gmax'],
  },
  'Toxtricity-Gmax': {
    types: ['Electric', 'Poison'],
    bs: {hp: 75, at: 98, df: 70, sa: 114, sd: 70, sp: 75},
    weightkg: 0,
    abilities: {0: 'Punk Rock'},
    baseSpecies: 'Toxtricity',
  },
  'Toxtricity-Low-Key': {
    types: ['Electric', 'Poison'],
    bs: {hp: 75, at: 98, df: 70, sa: 114, sd: 70, sp: 75},
    weightkg: 40,
    abilities: {0: 'Punk Rock'},
    baseSpecies: 'Toxtricity',
  },
  'Toxtricity-Low-Key-Gmax': {
    types: ['Electric', 'Poison'],
    bs: {hp: 75, at: 98, df: 70, sa: 114, sd: 70, sp: 75},
    weightkg: 0,
    abilities: {0: 'Punk Rock'},
    baseSpecies: 'Toxtricity',
  },
  Urshifu: {
    types: ['Fighting', 'Dark'],
    bs: {hp: 100, at: 130, df: 100, sa: 63, sd: 60, sp: 97},
    weightkg: 105,
    abilities: {0: 'Unseen Fist'},
    otherFormes: ['Urshifu-Gmax', 'Urshifu-Rapid-Strike', 'Urshifu-Rapid-Strike-Gmax'],
  },
  'Urshifu-Rapid-Strike': {
    types: ['Fighting', 'Water'],
    bs: {hp: 100, at: 130, df: 100, sa: 63, sd: 60, sp: 97},
    weightkg: 105,
    abilities: {0: 'Unseen Fist'},
    baseSpecies: 'Urshifu',
  },
  'Urshifu-Rapid-Strike-Gmax': {
    types: ['Fighting', 'Water'],
    bs: {hp: 100, at: 130, df: 100, sa: 63, sd: 60, sp: 97},
    weightkg: 0,
    abilities: {0: 'Unseen Fist'},
    baseSpecies: 'Urshifu',
  },
  'Urshifu-Gmax': {
    types: ['Fighting', 'Dark'],
    bs: {hp: 100, at: 130, df: 100, sa: 63, sd: 60, sp: 97},
    weightkg: 0,
    abilities: {0: 'Unseen Fist'},
    baseSpecies: 'Urshifu',
  },
  Venomicon: {
    types: ['Poison', 'Flying'],
    bs: {hp: 85, at: 50, df: 113, sa: 118, sd: 90, sp: 64},
    weightkg: 11.5,
    abilities: {0: 'Stamina'},
    otherFormes: ['Venomicon-Epilogue'],
    gender: 'N',
  },
  'Venomicon-Epilogue': {
    types: ['Poison', 'Flying'],
    bs: {hp: 85, at: 102, df: 85, sa: 62, sd: 85, sp: 101},
    weightkg: 12.4,
    abilities: {0: 'Tinted Lens'},
    baseSpecies: 'Venomicon',
    gender: 'N',
  },
  'Venusaur-Gmax': {
    types: ['Grass', 'Poison'],
    bs: {hp: 80, at: 82, df: 83, sa: 100, sd: 100, sp: 80},
    weightkg: 0,
    abilities: {0: 'Overgrow'},
    baseSpecies: 'Venusaur',
  },
  'Weezing-Galar': {
    types: ['Poison', 'Fairy'],
    bs: {hp: 65, at: 90, df: 120, sa: 85, sd: 70, sp: 60},
    weightkg: 16,
    abilities: {0: 'Levitate'},
    baseSpecies: 'Weezing',
  },
  Wooloo: {
    types: ['Normal'],
    bs: {hp: 42, at: 40, df: 55, sa: 40, sd: 45, sp: 48},
    weightkg: 6,
    abilities: {0: 'Fluffy'},
    nfe: true,
  },
  'Yamask-Galar': {
    types: ['Ground', 'Ghost'],
    bs: {hp: 38, at: 55, df: 85, sa: 30, sd: 65, sp: 30},
    weightkg: 1.5,
    abilities: {0: 'Wandering Spirit'},
    nfe: true,
    baseSpecies: 'Yamask',
  },
  Yamper: {
    types: ['Electric'],
    bs: {hp: 59, at: 45, df: 50, sa: 40, sd: 50, sp: 26},
    weightkg: 13.5,
    abilities: {0: 'Ball Fetch'},
    nfe: true,
  },
  Zacian: {
    types: ['Fairy'],
    bs: {hp: 92, at: 130, df: 115, sa: 80, sd: 115, sp: 138},
    weightkg: 110,
    abilities: {0: 'Intrepid Sword'},
    gender: 'N',
    otherFormes: ['Zacian-Crowned'],
  },
  'Zacian-Crowned': {
    types: ['Fairy', 'Steel'],
    bs: {hp: 92, at: 170, df: 115, sa: 80, sd: 115, sp: 148},
    weightkg: 355,
    abilities: {0: 'Intrepid Sword'},
    baseSpecies: 'Zacian',
    gender: 'N',
  },
  Zamazenta: {
    types: ['Fighting'],
    bs: {hp: 92, at: 130, df: 115, sa: 80, sd: 115, sp: 138},
    weightkg: 210,
    abilities: {0: 'Dauntless Shield'},
    gender: 'N',
    otherFormes: ['Zamazenta-Crowned'],
  },
  'Zamazenta-Crowned': {
    types: ['Fighting', 'Steel'],
    bs: {hp: 92, at: 130, df: 145, sa: 80, sd: 145, sp: 128},
    weightkg: 785,
    abilities: {0: 'Dauntless Shield'},
    baseSpecies: 'Zamazenta',
    gender: 'N',
  },
  'Zapdos-Galar': {
    types: ['Fighting', 'Flying'],
    bs: {hp: 90, at: 125, df: 90, sa: 85, sd: 90, sp: 100},
    weightkg: 58.2,
    abilities: {0: 'Defiant'},
    gender: 'N',
    baseSpecies: 'Zapdos',
  },
  Zarude: {
    types: ['Dark', 'Grass'],
    bs: {hp: 105, at: 120, df: 105, sa: 70, sd: 95, sp: 105},
    weightkg: 70,
    abilities: {0: 'Leaf Guard'},
    gender: 'N',
    otherFormes: ['Zarude-Dada'],
  },
  'Zarude-Dada': {
    types: ['Dark', 'Grass'],
    bs: {hp: 105, at: 120, df: 105, sa: 70, sd: 95, sp: 105},
    weightkg: 70,
    abilities: {0: 'Leaf Guard'},
    baseSpecies: 'Zarude',
    gender: 'N',
  },
  'Zigzagoon-Galar': {
    types: ['Dark', 'Normal'],
    bs: {hp: 38, at: 30, df: 41, sa: 30, sd: 41, sp: 60},
    weightkg: 17.5,
    abilities: {0: 'Pickup'},
    nfe: true,
    baseSpecies: 'Zigzagoon',
  },
};

const SS: {[name: string]: SpeciesData} = extend(true, {}, SM, SS_PATCH);

delete SS['Pikachu-Starter'];
delete SS['Eevee-Starter'];

const PLA_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Arcanine: {otherFormes: ['Arcanine-Hisui']},
  Avalugg: {otherFormes: ['Avalugg-Hisui']},
  Basculin: {otherFormes: ['Basculin-Blue-Striped', 'Basculin-White-Striped']},
  Braviary: {otherFormes: ['Braviary-Hisui']},
  Decidueye: {otherFormes: ['Decidueye-Hisui']},
  Dialga: {otherFormes: ['Dialga-Origin']},
  Electrode: {otherFormes: ['Electrode-Hisui']},
  Goodra: {otherFormes: ['Goodra-Hisui']},
  Growlithe: {otherFormes: ['Growlithe-Hisui']},
  Lilligant: {otherFormes: ['Lilligant-Hisui']},
  Palkia: {otherFormes: ['Palkia-Origin']},
  Qwilfish: {otherFormes: ['Qwilfish-Hisui']},
  Samurott: {otherFormes: ['Samurott-Hisui']},
  Sliggoo: {otherFormes: ['Sliggoo-Hisui']},
  Sneasel: {otherFormes: ['Sneasel-Hisui']},
  Stantler: {nfe: true},
  Typhlosion: {otherFormes: ['Typhlosion-Hisui']},
  Ursaring: {nfe: true},
  Voltorb: {otherFormes: ['Voltorb-Hisui']},
  Zoroark: {otherFormes: ['Zoroark-Hisui']},
  Zorua: {otherFormes: ['Zorua-Hisui']},
  'Arcanine-Hisui': {
    types: ['Fire', 'Rock'],
    bs: {hp: 95, at: 115, df: 80, sa: 95, sd: 80, sp: 90},
    weightkg: 168,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Arcanine',
  },
  'Avalugg-Hisui': {
    types: ['Ice', 'Rock'],
    bs: {hp: 95, at: 127, df: 184, sa: 34, sd: 36, sp: 38},
    weightkg: 262.4,
    abilities: {0: 'Strong Jaw'},
    baseSpecies: 'Avalugg',
  },
  Basculegion: {
    types: ['Water', 'Ghost'],
    bs: {hp: 120, at: 112, df: 65, sa: 80, sd: 75, sp: 78},
    weightkg: 110,
    abilities: {0: 'Swift Swim'},
    otherFormes: ['Basculegion-F'],
  },
  'Basculegion-F': {
    types: ['Water', 'Ghost'],
    bs: {hp: 120, at: 92, df: 65, sa: 100, sd: 75, sp: 78},
    weightkg: 110,
    abilities: {0: 'Swift Swim'},
    baseSpecies: 'Basculegion',
  },
  'Basculin-White-Striped': {
    types: ['Water'],
    bs: {hp: 70, at: 92, df: 65, sa: 80, sd: 55, sp: 98},
    weightkg: 18,
    abilities: {0: 'Rattled'},
    baseSpecies: 'Basculin',
    nfe: true,
  },
  'Braviary-Hisui': {
    types: ['Psychic', 'Flying'],
    bs: {hp: 110, at: 83, df: 70, sa: 112, sd: 70, sp: 65},
    weightkg: 43.4,
    abilities: {0: 'Keen Eye'},
    baseSpecies: 'Braviary',
  },
  'Decidueye-Hisui': {
    types: ['Grass', 'Fighting'],
    bs: {hp: 88, at: 112, df: 80, sa: 95, sd: 95, sp: 60},
    weightkg: 37,
    abilities: {0: 'Overgrow'},
    baseSpecies: 'Decidueye',
  },
  'Dialga-Origin': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 100, at: 100, df: 120, sa: 150, sd: 120, sp: 90},
    weightkg: 850,
    gender: 'N',
    abilities: {0: 'Pressure'},
    baseSpecies: 'Dialga',
  },
  'Electrode-Hisui': {
    types: ['Electric', 'Grass'],
    bs: {hp: 60, at: 50, df: 70, sa: 80, sd: 80, sp: 150},
    weightkg: 71,
    gender: 'N',
    abilities: {0: 'Soundproof'},
    baseSpecies: 'Electrode',
  },
  Enamorus: {
    types: ['Fairy', 'Flying'],
    bs: {hp: 74, at: 115, df: 70, sa: 135, sd: 80, sp: 106},
    weightkg: 48,
    abilities: {0: 'Cute Charm'},
    otherFormes: ['Enamorus-Therian'],
  },
  'Enamorus-Therian': {
    types: ['Fairy', 'Flying'],
    bs: {hp: 74, at: 115, df: 110, sa: 135, sd: 100, sp: 46},
    weightkg: 48,
    abilities: {0: 'Overcoat'},
    baseSpecies: 'Enamorus',
  },
  'Goodra-Hisui': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 80, at: 100, df: 100, sa: 110, sd: 150, sp: 60},
    weightkg: 334.1,
    abilities: {0: 'Sap Sipper'},
    baseSpecies: 'Goodra',
  },
  'Growlithe-Hisui': {
    types: ['Fire', 'Rock'],
    bs: {hp: 60, at: 75, df: 45, sa: 65, sd: 50, sp: 55},
    weightkg: 22.7,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Growlithe',
    nfe: true,
  },
  Kleavor: {
    types: ['Bug', 'Rock'],
    bs: {hp: 70, at: 135, df: 95, sa: 45, sd: 70, sp: 85},
    weightkg: 89,
    abilities: {0: 'Swarm'},
  },
  'Lilligant-Hisui': {
    types: ['Grass', 'Fighting'],
    bs: {hp: 70, at: 105, df: 75, sa: 50, sd: 75, sp: 105},
    weightkg: 19.2,
    abilities: {0: 'Chlorophyll'},
    baseSpecies: 'Lilligant',
  },
  Overqwil: {
    types: ['Dark', 'Poison'],
    bs: {hp: 85, at: 115, df: 95, sa: 65, sd: 65, sp: 85},
    weightkg: 60.5,
    abilities: {0: 'Poison Point'},
  },
  'Palkia-Origin': {
    types: ['Water', 'Dragon'],
    bs: {hp: 90, at: 100, df: 100, sa: 150, sd: 120, sp: 120},
    weightkg: 660,
    gender: 'N',
    abilities: {0: 'Pressure'},
    baseSpecies: 'Palkia',
  },
  'Qwilfish-Hisui': {
    types: ['Dark', 'Poison'],
    bs: {hp: 65, at: 95, df: 85, sa: 55, sd: 55, sp: 85},
    weightkg: 3.9,
    abilities: {0: 'Poison Point'},
    baseSpecies: 'Qwilfish',
    nfe: true,
  },
  'Samurott-Hisui': {
    types: ['Water', 'Dark'],
    bs: {hp: 90, at: 108, df: 80, sa: 100, sd: 65, sp: 85},
    weightkg: 58.2,
    abilities: {0: 'Torrent'},
    baseSpecies: 'Samurott',
  },
  'Sliggoo-Hisui': {
    types: ['Steel', 'Dragon'],
    bs: {hp: 58, at: 75, df: 83, sa: 83, sd: 113, sp: 40},
    weightkg: 68.5,
    abilities: {0: 'Sap Sipper'},
    baseSpecies: 'Sliggoo',
    nfe: true,
  },
  'Sneasel-Hisui': {
    types: ['Fighting', 'Poison'],
    bs: {hp: 55, at: 95, df: 55, sa: 35, sd: 75, sp: 115},
    weightkg: 27,
    abilities: {0: 'Inner Focus'},
    baseSpecies: 'Sneasel',
    nfe: true,
  },
  Sneasler: {
    types: ['Fighting', 'Poison'],
    bs: {hp: 80, at: 130, df: 60, sa: 40, sd: 80, sp: 120},
    weightkg: 43,
    abilities: {0: 'Pressure'},
  },
  'Typhlosion-Hisui': {
    types: ['Fire', 'Ghost'],
    bs: {hp: 73, at: 84, df: 78, sa: 119, sd: 85, sp: 95},
    weightkg: 69.8,
    abilities: {0: 'Blaze'},
    baseSpecies: 'Typhlosion',
  },
  Ursaluna: {
    types: ['Ground', 'Normal'],
    bs: {hp: 130, at: 140, df: 105, sa: 45, sd: 80, sp: 50},
    weightkg: 290,
    abilities: {0: 'Guts'},
  },
  'Voltorb-Hisui': {
    types: ['Electric', 'Grass'],
    bs: {hp: 40, at: 30, df: 50, sa: 55, sd: 55, sp: 100},
    weightkg: 13,
    gender: 'N',
    abilities: {0: 'Soundproof'},
    baseSpecies: 'Voltorb',
    nfe: true,
  },
  Wyrdeer: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 103, at: 105, df: 72, sa: 105, sd: 75, sp: 65},
    weightkg: 95.1,
    abilities: {0: 'Intimidate'},
  },
  'Zoroark-Hisui': {
    types: ['Normal', 'Ghost'],
    bs: {hp: 55, at: 100, df: 60, sa: 125, sd: 60, sp: 110},
    weightkg: 73,
    abilities: {0: 'Illusion'},
    baseSpecies: 'Zoroark',
  },
  'Zorua-Hisui': {
    types: ['Normal', 'Ghost'],
    bs: {hp: 35, at: 60, df: 40, sa: 85, sd: 40, sp: 70},
    weightkg: 12.5,
    abilities: {0: 'Illusion'},
    baseSpecies: 'Zorua',
    nfe: true,
  },
};

const SV_PATCH: {[name: string]: DeepPartial<SpeciesData>} = {
  Bisharp: {nfe: true},
  Cresselia: {bs: {df: 110, sd: 120}},
  Dunsparce: {nfe: true},
  Duraludon: {nfe: true},
  Girafarig: {nfe: true},
  Primeape: {nfe: true},
  Tauros: {otherFormes: ['Tauros-Paldea-Aqua', 'Tauros-Paldea-Blaze', 'Tauros-Paldea-Combat']},
  Wooper: {otherFormes: ['Wooper-Paldea']},
  Zacian: {bs: {at: 120}},
  'Zacian-Crowned': {bs: {at: 150}},
  Zamazenta: {bs: {at: 120}},
  'Zamazenta-Crowned': {bs: {at: 120, df: 140, sd: 140}},
  Ababo: {
    types: ['Fairy'],
    bs: {hp: 42, at: 35, df: 27, sa: 35, sd: 35, sp: 38},
    weightkg: 3.5,
    abilities: {0: 'Pixilate'},
    nfe: true,
  },
  Annihilape: {
    types: ['Fighting', 'Ghost'],
    bs: {hp: 110, at: 115, df: 80, sa: 50, sd: 90, sp: 90},
    weightkg: 56,
    abilities: {0: 'Vital Spirit'},
  },
  Arboliva: {
    types: ['Grass', 'Normal'],
    bs: {hp: 78, at: 69, df: 90, sa: 125, sd: 109, sp: 39},
    weightkg: 48.2,
    abilities: {0: 'Seed Sower'},
  },
  Archaludon: {
    types: ['Steel', 'Dragon'],
    bs: {hp: 90, at: 105, df: 130, sa: 125, sd: 65, sp: 85},
    weightkg: 60,
    abilities: {0: 'Stamina'},
  },
  Arctibax: {
    types: ['Dragon', 'Ice'],
    bs: {hp: 90, at: 95, df: 66, sa: 45, sd: 65, sp: 62},
    weightkg: 30,
    abilities: {0: 'Thermal Exchange'},
    nfe: true,
  },
  Armarouge: {
    types: ['Fire', 'Psychic'],
    bs: {hp: 85, at: 60, df: 100, sa: 125, sd: 80, sp: 75},
    weightkg: 85,
    abilities: {0: 'Flash Fire'},
  },
  Baxcalibur: {
    types: ['Dragon', 'Ice'],
    bs: {hp: 115, at: 145, df: 92, sa: 75, sd: 86, sp: 87},
    weightkg: 210,
    abilities: {0: 'Thermal Exchange'},
  },
  Bellibolt: {
    types: ['Electric'],
    bs: {hp: 109, at: 64, df: 91, sa: 103, sd: 83, sp: 45},
    weightkg: 113,
    abilities: {0: 'Electromorphosis'},
  },
  Bombirdier: {
    types: ['Flying', 'Dark'],
    bs: {hp: 70, at: 103, df: 85, sa: 60, sd: 85, sp: 82},
    weightkg: 42.9,
    abilities: {0: 'Big Pecks'},
  },
  Brambleghast: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 55, at: 115, df: 70, sa: 80, sd: 70, sp: 90},
    weightkg: 6,
    abilities: {0: 'Wind Rider'},
  },
  Bramblin: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 40, at: 65, df: 30, sa: 45, sd: 35, sp: 60},
    weightkg: 0.6,
    abilities: {0: 'Wind Rider'},
    nfe: true,
  },
  'Brute Bonnet': {
    types: ['Grass', 'Dark'],
    bs: {hp: 111, at: 127, df: 99, sa: 79, sd: 99, sp: 55},
    weightkg: 21,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Capsakid: {
    types: ['Grass'],
    bs: {hp: 50, at: 62, df: 40, sa: 62, sd: 40, sp: 50},
    weightkg: 3,
    abilities: {0: 'Chlorophyll'},
    nfe: true,
  },
  Ceruledge: {
    types: ['Fire', 'Ghost'],
    bs: {hp: 75, at: 125, df: 80, sa: 60, sd: 100, sp: 85},
    weightkg: 62,
    abilities: {0: 'Flash Fire'},
  },
  Cetitan: {
    types: ['Ice'],
    bs: {hp: 170, at: 113, df: 65, sa: 45, sd: 55, sp: 73},
    weightkg: 700,
    abilities: {0: 'Thick Fat'},
  },
  Cetoddle: {
    types: ['Ice'],
    bs: {hp: 108, at: 68, df: 45, sa: 30, sd: 40, sp: 43},
    weightkg: 45,
    abilities: {0: 'Thick Fat'},
    nfe: true,
  },
  Charcadet: {
    types: ['Fire'],
    bs: {hp: 40, at: 50, df: 40, sa: 50, sd: 40, sp: 35},
    weightkg: 10.5,
    abilities: {0: 'Flash Fire'},
    nfe: true,
  },
  'Chi-Yu': {
    types: ['Dark', 'Fire'],
    bs: {hp: 55, at: 80, df: 80, sa: 135, sd: 120, sp: 100},
    weightkg: 4.9,
    gender: 'N',
    abilities: {0: 'Beads of Ruin'},
  },
  'Chien-Pao': {
    types: ['Dark', 'Ice'],
    bs: {hp: 80, at: 120, df: 80, sa: 90, sd: 65, sp: 135},
    weightkg: 152.2,
    gender: 'N',
    abilities: {0: 'Sword of Ruin'},
  },
  Clodsire: {
    types: ['Poison', 'Ground'],
    bs: {hp: 130, at: 75, df: 60, sa: 45, sd: 100, sp: 20},
    weightkg: 223,
    abilities: {0: 'Poison Point'},
  },
  Cresceidon: {
    types: ['Water', 'Fairy'],
    bs: {hp: 80, at: 32, df: 111, sa: 88, sd: 99, sp: 125},
    weightkg: 999.9,
    abilities: {0: 'Multiscale'},
  },
  Crocalor: {
    types: ['Fire'],
    bs: {hp: 81, at: 55, df: 78, sa: 90, sd: 58, sp: 49},
    weightkg: 30.7,
    abilities: {0: 'Blaze'},
    nfe: true,
  },
  Cyclizar: {
    types: ['Dragon', 'Normal'],
    bs: {hp: 70, at: 95, df: 65, sa: 85, sd: 65, sp: 121},
    weightkg: 63,
    abilities: {0: 'Shed Skin'},
  },
  Dachsbun: {
    types: ['Fairy'],
    bs: {hp: 57, at: 80, df: 115, sa: 50, sd: 80, sp: 95},
    weightkg: 14.9,
    abilities: {0: 'Well-Baked Body'},
  },
  Dipplin: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 80, at: 80, df: 110, sa: 95, sd: 80, sp: 40},
    weightkg: 4.4,
    abilities: {0: 'Supersweet Syrup'},
    nfe: true,
  },
  Dolliv: {
    types: ['Grass', 'Normal'],
    bs: {hp: 52, at: 53, df: 60, sa: 78, sd: 78, sp: 33},
    weightkg: 11.9,
    abilities: {0: 'Early Bird'},
    nfe: true,
  },
  Dondozo: {
    types: ['Water'],
    bs: {hp: 150, at: 100, df: 115, sa: 65, sd: 65, sp: 35},
    weightkg: 220,
    abilities: {0: 'Unaware'},
  },
  Dudunsparce: {
    types: ['Normal'],
    bs: {hp: 125, at: 100, df: 80, sa: 85, sd: 75, sp: 55},
    weightkg: 39.2,
    abilities: {0: 'Serene Grace'},
    otherFormes: ['Dudunsparce-Three-Segment'],
  },
  'Dudunsparce-Three-Segment': {
    types: ['Normal'],
    bs: {hp: 125, at: 100, df: 80, sa: 85, sd: 75, sp: 55},
    weightkg: 47.4,
    abilities: {0: 'Serene Grace'},
    baseSpecies: 'Dudunsparce',
  },
  Espathra: {
    types: ['Psychic'],
    bs: {hp: 95, at: 60, df: 60, sa: 101, sd: 60, sp: 105},
    weightkg: 90,
    abilities: {0: 'Opportunist'},
  },
  Farigiraf: {
    types: ['Normal', 'Psychic'],
    bs: {hp: 120, at: 90, df: 70, sa: 110, sd: 70, sp: 60},
    weightkg: 160,
    abilities: {0: 'Cud Chew'},
  },
  Fezandipiti: {
    types: ['Poison', 'Fairy'],
    bs: {hp: 88, at: 91, df: 82, sa: 70, sd: 125, sp: 99},
    weightkg: 30.1,
    abilities: {0: 'Toxic Chain'},
  },
  Fidough: {
    types: ['Fairy'],
    bs: {hp: 37, at: 55, df: 70, sa: 30, sd: 55, sp: 65},
    weightkg: 10.9,
    abilities: {0: 'Own Tempo'},
    nfe: true,
  },
  Finizen: {
    types: ['Water'],
    bs: {hp: 70, at: 45, df: 40, sa: 45, sd: 40, sp: 75},
    weightkg: 60.2,
    abilities: {0: 'Water Veil'},
    nfe: true,
  },
  Flamigo: {
    types: ['Flying', 'Fighting'],
    bs: {hp: 82, at: 115, df: 74, sa: 75, sd: 64, sp: 90},
    weightkg: 37,
    abilities: {0: 'Scrappy'},
  },
  Flittle: {
    types: ['Psychic'],
    bs: {hp: 30, at: 35, df: 30, sa: 55, sd: 30, sp: 75},
    weightkg: 1.5,
    abilities: {0: 'Anticipation'},
    nfe: true,
  },
  Floragato: {
    types: ['Grass'],
    bs: {hp: 61, at: 80, df: 63, sa: 60, sd: 63, sp: 83},
    weightkg: 12.2,
    abilities: {0: 'Overgrow'},
    nfe: true,
  },
  'Flutter Mane': {
    types: ['Ghost', 'Fairy'],
    bs: {hp: 55, at: 55, df: 55, sa: 135, sd: 135, sp: 135},
    weightkg: 4,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Frigibax: {
    types: ['Dragon', 'Ice'],
    bs: {hp: 65, at: 75, df: 45, sa: 35, sd: 45, sp: 55},
    weightkg: 17,
    abilities: {0: 'Thermal Exchange'},
    nfe: true,
  },
  Fuecoco: {
    types: ['Fire'],
    bs: {hp: 67, at: 45, df: 59, sa: 63, sd: 40, sp: 36},
    weightkg: 9.8,
    abilities: {0: 'Blaze'},
    nfe: true,
  },
  Garganacl: {
    types: ['Rock'],
    bs: {hp: 100, at: 100, df: 130, sa: 45, sd: 90, sp: 35},
    weightkg: 240,
    abilities: {0: 'Purifying Salt'},
  },
  Gholdengo: {
    types: ['Steel', 'Ghost'],
    bs: {hp: 87, at: 60, df: 95, sa: 133, sd: 91, sp: 84},
    weightkg: 30,
    gender: 'N',
    abilities: {0: 'Good as Gold'},
  },
  Gimmighoul: {
    types: ['Ghost'],
    bs: {hp: 45, at: 30, df: 70, sa: 75, sd: 70, sp: 10},
    weightkg: 5,
    gender: 'N',
    abilities: {0: 'Rattled'},
    nfe: true,
    otherFormes: ['Gimmighoul-Roaming'],
  },
  'Gimmighoul-Roaming': {
    types: ['Ghost'],
    bs: {hp: 45, at: 30, df: 25, sa: 75, sd: 45, sp: 80},
    weightkg: 0.1,
    gender: 'N',
    abilities: {0: 'Run Away'},
    nfe: true,
    baseSpecies: 'Gimmighoul',
  },
  Glimmet: {
    types: ['Rock', 'Poison'],
    bs: {hp: 48, at: 35, df: 42, sa: 105, sd: 60, sp: 60},
    weightkg: 8,
    abilities: {0: 'Toxic Debris'},
    nfe: true,
  },
  Glimmora: {
    types: ['Rock', 'Poison'],
    bs: {hp: 83, at: 55, df: 90, sa: 130, sd: 81, sp: 86},
    weightkg: 45,
    abilities: {0: 'Toxic Debris'},
  },
  'Gouging Fire': {
    types: ['Fire', 'Dragon'],
    bs: {hp: 105, at: 115, df: 121, sa: 65, sd: 93, sp: 91},
    weightkg: 590,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Grafaiai: {
    types: ['Poison', 'Normal'],
    bs: {hp: 63, at: 95, df: 65, sa: 80, sd: 72, sp: 110},
    weightkg: 27.2,
    abilities: {0: 'Unburden'},
  },
  'Great Tusk': {
    types: ['Ground', 'Fighting'],
    bs: {hp: 115, at: 131, df: 131, sa: 53, sd: 53, sp: 87},
    weightkg: 320,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Greavard: {
    types: ['Ghost'],
    bs: {hp: 50, at: 61, df: 60, sa: 30, sd: 55, sp: 34},
    weightkg: 35,
    abilities: {0: 'Pickup'},
    nfe: true,
  },
  Hemogoblin: {
    types: ['Fairy', 'Fire'],
    bs: {hp: 90, at: 96, df: 87, sa: 96, sd: 89, sp: 55},
    weightkg: 85,
    abilities: {0: 'Pixilate'},
  },
  Houndstone: {
    types: ['Ghost'],
    bs: {hp: 72, at: 101, df: 100, sa: 50, sd: 97, sp: 68},
    weightkg: 15,
    abilities: {0: 'Sand Rush'},
  },
  Hydrapple: {
    types: ['Grass', 'Dragon'],
    bs: {hp: 106, at: 80, df: 110, sa: 120, sd: 80, sp: 44},
    weightkg: 93,
    abilities: {0: 'Supersweet Syrup'},
  },
  'Iron Bundle': {
    types: ['Ice', 'Water'],
    bs: {hp: 56, at: 80, df: 114, sa: 124, sd: 60, sp: 136},
    weightkg: 11,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Boulder': {
    types: ['Rock', 'Psychic'],
    bs: {hp: 90, at: 120, df: 80, sa: 68, sd: 108, sp: 124},
    weightkg: 162.5,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Crown': {
    types: ['Steel', 'Psychic'],
    bs: {hp: 90, at: 72, df: 100, sa: 122, sd: 108, sp: 98},
    weightkg: 156,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Hands': {
    types: ['Fighting', 'Electric'],
    bs: {hp: 154, at: 140, df: 108, sa: 50, sd: 68, sp: 50},
    weightkg: 380.7,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Jugulis': {
    types: ['Dark', 'Flying'],
    bs: {hp: 94, at: 80, df: 86, sa: 122, sd: 80, sp: 108},
    weightkg: 111,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Leaves': {
    types: ['Grass', 'Psychic'],
    bs: {hp: 90, at: 130, df: 88, sa: 70, sd: 108, sp: 104},
    weightkg: 125,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Moth': {
    types: ['Fire', 'Poison'],
    bs: {hp: 80, at: 70, df: 60, sa: 140, sd: 110, sp: 110},
    weightkg: 36,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Thorns': {
    types: ['Rock', 'Electric'],
    bs: {hp: 100, at: 134, df: 110, sa: 70, sd: 84, sp: 72},
    weightkg: 303,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Treads': {
    types: ['Ground', 'Steel'],
    bs: {hp: 90, at: 112, df: 120, sa: 72, sd: 70, sp: 106},
    weightkg: 240,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  'Iron Valiant': {
    types: ['Fairy', 'Fighting'],
    bs: {hp: 74, at: 130, df: 90, sa: 120, sd: 60, sp: 116},
    weightkg: 35,
    gender: 'N',
    abilities: {0: 'Quark Drive'},
  },
  Kilowattrel: {
    types: ['Electric', 'Flying'],
    bs: {hp: 70, at: 70, df: 60, sa: 105, sd: 60, sp: 125},
    weightkg: 38.6,
    abilities: {0: 'Wind Power'},
  },
  Kingambit: {
    types: ['Dark', 'Steel'],
    bs: {hp: 100, at: 135, df: 120, sa: 60, sd: 85, sp: 50},
    weightkg: 120,
    abilities: {0: 'Defiant'},
  },
  Klawf: {
    types: ['Rock'],
    bs: {hp: 70, at: 100, df: 115, sa: 35, sd: 55, sp: 75},
    weightkg: 79,
    abilities: {0: 'Anger Shell'},
  },
  Koraidon: {
    types: ['Fighting', 'Dragon'],
    bs: {hp: 100, at: 135, df: 115, sa: 85, sd: 100, sp: 135},
    weightkg: 303,
    gender: 'N',
    abilities: {0: 'Orichalcum Pulse'},
  },
  Lechonk: {
    types: ['Normal'],
    bs: {hp: 54, at: 45, df: 40, sa: 35, sd: 45, sp: 35},
    weightkg: 10.2,
    abilities: {0: 'Aroma Veil'},
    nfe: true,
  },
  Lokix: {
    types: ['Bug', 'Dark'],
    bs: {hp: 71, at: 102, df: 78, sa: 52, sd: 55, sp: 92},
    weightkg: 17.5,
    abilities: {0: 'Swarm'},
  },
  Mabosstiff: {
    types: ['Dark'],
    bs: {hp: 80, at: 120, df: 90, sa: 60, sd: 70, sp: 85},
    weightkg: 61,
    abilities: {0: 'Intimidate'},
  },
  Maschiff: {
    types: ['Dark'],
    bs: {hp: 60, at: 78, df: 60, sa: 40, sd: 51, sp: 51},
    weightkg: 16,
    abilities: {0: 'Intimidate'},
    nfe: true,
  },
  Maushold: {
    types: ['Normal'],
    bs: {hp: 74, at: 75, df: 70, sa: 65, sd: 75, sp: 111},
    weightkg: 2.3,
    gender: 'N',
    abilities: {0: 'Friend Guard'},
    otherFormes: ['Maushold-Four'],
  },
  'Maushold-Four': {
    types: ['Normal'],
    bs: {hp: 74, at: 75, df: 70, sa: 65, sd: 75, sp: 111},
    weightkg: 2.8,
    gender: 'N',
    abilities: {0: 'Friend Guard'},
    baseSpecies: 'Maushold',
  },
  Meowscarada: {
    types: ['Grass', 'Dark'],
    bs: {hp: 76, at: 110, df: 70, sa: 81, sd: 70, sp: 123},
    weightkg: 31.2,
    abilities: {0: 'Overgrow'},
  },
  Miraidon: {
    types: ['Electric', 'Dragon'],
    bs: {hp: 100, at: 85, df: 100, sa: 135, sd: 115, sp: 135},
    weightkg: 240,
    gender: 'N',
    abilities: {0: 'Hadron Engine'},
  },
  Munkidori: {
    types: ['Poison', 'Psychic'],
    bs: {hp: 88, at: 75, df: 66, sa: 130, sd: 90, sp: 106},
    weightkg: 12.2,
    abilities: {0: 'Toxic Chain'},
  },
  Nacli: {
    types: ['Rock'],
    bs: {hp: 55, at: 55, df: 75, sa: 35, sd: 35, sp: 25},
    weightkg: 16,
    abilities: {0: 'Purifying Salt'},
    nfe: true,
  },
  Naclstack: {
    types: ['Rock'],
    bs: {hp: 60, at: 60, df: 100, sa: 35, sd: 65, sp: 35},
    weightkg: 105,
    abilities: {0: 'Purifying Salt'},
    nfe: true,
  },
  Nymble: {
    types: ['Bug'],
    bs: {hp: 33, at: 46, df: 40, sa: 21, sd: 25, sp: 45},
    weightkg: 1,
    abilities: {0: 'Swarm'},
    nfe: true,
  },
  Ogerpon: {
    types: ['Grass'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Defiant'},
    weightkg: 39.8,
    otherFormes: [
      'Ogerpon-Cornerstone', 'Ogerpon-Cornerstone-Tera',
      'Ogerpon-Hearthflame', 'Ogerpon-Hearthflame-Tera',
      'Ogerpon-Teal-Tera',
      'Ogerpon-Wellspring', 'Ogerpon-Wellspring-Tera',
    ],
  },
  'Ogerpon-Wellspring': {
    types: ['Grass', 'Water'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Water Absorb'},
    weightkg: 39.8,
    baseSpecies: 'Ogerpon',
  },
  'Ogerpon-Hearthflame': {
    types: ['Grass', 'Fire'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Mold Breaker'},
    weightkg: 39.8,
    baseSpecies: 'Ogerpon',
  },
  'Ogerpon-Cornerstone': {
    types: ['Grass', 'Rock'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Sturdy'},
    weightkg: 39.8,
    baseSpecies: 'Ogerpon',
  },
  'Ogerpon-Teal-Tera': {
    types: ['Grass'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Embody Aspect (Teal)'},
    weightkg: 39.8,
    baseSpecies: 'Ogerpon',
  },
  'Ogerpon-Wellspring-Tera': {
    types: ['Grass', 'Water'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Embody Aspect (Wellspring)'},
    weightkg: 39.8,
    baseSpecies: 'Ogerpon',
  },
  'Ogerpon-Hearthflame-Tera': {
    types: ['Grass', 'Fire'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Embody Aspect (Hearthflame)'},
    weightkg: 39.8,
    baseSpecies: 'Ogerpon',
  },
  'Ogerpon-Cornerstone-Tera': {
    types: ['Grass', 'Rock'],
    bs: {hp: 80, at: 120, df: 84, sa: 60, sd: 96, sp: 110},
    abilities: {0: 'Embody Aspect (Cornerstone)'},
    weightkg: 39.8,
    baseSpecies: 'Ogerpon',
  },
  Oinkologne: {
    types: ['Normal'],
    bs: {hp: 110, at: 100, df: 75, sa: 59, sd: 80, sp: 65},
    weightkg: 120,
    abilities: {0: 'Lingering Aroma'},
    otherFormes: ['Oinkologne-F'],
  },
  'Oinkologne-F': {
    types: ['Normal'],
    bs: {hp: 115, at: 90, df: 70, sa: 59, sd: 90, sp: 65},
    weightkg: 120,
    abilities: {0: 'Aroma Veil'},
    baseSpecies: 'Oinkologne',
  },
  Okidogi: {
    types: ['Poison', 'Fighting'],
    bs: {hp: 88, at: 128, df: 115, sa: 58, sd: 86, sp: 80},
    weightkg: 92,
    abilities: {0: 'Toxic Chain'},
  },
  Orthworm: {
    types: ['Steel'],
    bs: {hp: 70, at: 85, df: 145, sa: 60, sd: 55, sp: 65},
    weightkg: 310,
    abilities: {0: 'Earth Eater'},
  },
  Palafin: {
    types: ['Water'],
    bs: {hp: 100, at: 70, df: 72, sa: 53, sd: 62, sp: 100},
    weightkg: 60.2,
    abilities: {0: 'Zero to Hero'},
    otherFormes: ['Palafin-Hero'],
  },
  'Palafin-Hero': {
    types: ['Water'],
    bs: {hp: 100, at: 160, df: 97, sa: 106, sd: 87, sp: 100},
    weightkg: 97.4,
    abilities: {0: 'Zero to Hero'},
    baseSpecies: 'Palafin',
  },
  Pawmi: {
    types: ['Electric'],
    bs: {hp: 45, at: 50, df: 20, sa: 40, sd: 25, sp: 60},
    weightkg: 2.5,
    abilities: {0: 'Static'},
    nfe: true,
  },
  Pawmo: {
    types: ['Electric', 'Fighting'],
    bs: {hp: 60, at: 75, df: 40, sa: 50, sd: 40, sp: 85},
    weightkg: 6.5,
    abilities: {0: 'Volt Absorb'},
    nfe: true,
  },
  Pawmot: {
    types: ['Electric', 'Fighting'],
    bs: {hp: 70, at: 115, df: 70, sa: 70, sd: 60, sp: 105},
    weightkg: 41,
    abilities: {0: 'Volt Absorb'},
  },
  Pecharunt: {
    types: ['Poison', 'Ghost'],
    bs: {hp: 88, at: 88, df: 160, sa: 88, sd: 88, sp: 88},
    weightkg: 0.3,
    gender: 'N',
    abilities: {0: 'Poison Puppeteer'},
  },
  Poltchageist: {
    types: ['Grass', 'Ghost'],
    bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
    weightkg: 1.1,
    abilities: {0: 'Hospitality'},
    nfe: true,
    otherFormes: ['Poltchageist-Artisan'],
    gender: 'N',
  },
  'Poltchageist-Artisan': {
    types: ['Grass', 'Ghost'],
    bs: {hp: 40, at: 45, df: 45, sa: 74, sd: 54, sp: 50},
    weightkg: 1.1,
    abilities: {0: 'Hospitality'},
    nfe: true,
    gender: 'N',
    baseSpecies: 'Poltchageist',
  },

  Quaquaval: {
    types: ['Water', 'Fighting'],
    bs: {hp: 85, at: 120, df: 80, sa: 85, sd: 75, sp: 85},
    weightkg: 61.9,
    abilities: {0: 'Torrent'},
  },
  Quaxly: {
    types: ['Water'],
    bs: {hp: 55, at: 65, df: 45, sa: 50, sd: 45, sp: 50},
    weightkg: 6.1,
    abilities: {0: 'Torrent'},
    nfe: true,
  },
  Quaxwell: {
    types: ['Water'],
    bs: {hp: 70, at: 85, df: 65, sa: 65, sd: 60, sp: 65},
    weightkg: 21.5,
    abilities: {0: 'Torrent'},
    nfe: true,
  },
  Rabsca: {
    types: ['Bug', 'Psychic'],
    bs: {hp: 75, at: 50, df: 85, sa: 115, sd: 100, sp: 45},
    weightkg: 3.5,
    abilities: {0: 'Synchronize'},
  },
  'Raging Bolt': {
    types: ['Electric', 'Dragon'],
    bs: {hp: 125, at: 73, df: 91, sa: 137, sd: 89, sp: 75},
    weightkg: 480,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Rellor: {
    types: ['Bug'],
    bs: {hp: 41, at: 50, df: 60, sa: 31, sd: 58, sp: 30},
    weightkg: 1,
    abilities: {0: 'Compound Eyes'},
    nfe: true,
  },
  Revavroom: {
    types: ['Steel', 'Poison'],
    bs: {hp: 80, at: 119, df: 90, sa: 54, sd: 67, sp: 90},
    weightkg: 120,
    abilities: {0: 'Overcoat'},
  },
  'Roaring Moon': {
    types: ['Dragon', 'Dark'],
    bs: {hp: 105, at: 139, df: 71, sa: 55, sd: 101, sp: 119},
    weightkg: 380,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  'Sandy Shocks': {
    types: ['Electric', 'Ground'],
    bs: {hp: 85, at: 81, df: 97, sa: 121, sd: 85, sp: 101},
    weightkg: 60,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Scattervein: {
    types: ['Fairy'],
    bs: {hp: 75, at: 74, df: 87, sa: 62, sd: 89, sp: 63},
    weightkg: 25,
    abilities: {0: 'Pixilate'},
    nfe: true,
  },
  Scovillain: {
    types: ['Grass', 'Fire'],
    bs: {hp: 65, at: 108, df: 65, sa: 108, sd: 65, sp: 75},
    weightkg: 15,
    abilities: {0: 'Chlorophyll'},
  },
  'Scream Tail': {
    types: ['Fairy', 'Psychic'],
    bs: {hp: 115, at: 65, df: 99, sa: 65, sd: 115, sp: 111},
    weightkg: 8,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Shroodle: {
    types: ['Poison', 'Normal'],
    bs: {hp: 40, at: 65, df: 35, sa: 40, sd: 35, sp: 75},
    weightkg: 0.7,
    abilities: {0: 'Unburden'},
    nfe: true,
  },
  'Sinistcha': {
    types: ['Grass', 'Ghost'],
    bs: {hp: 71, at: 60, df: 106, sa: 121, sd: 80, sp: 70},
    weightkg: 2.2,
    abilities: {0: 'Hospitality'},
    otherFormes: ['Sinistcha-Masterpiece'],
    gender: 'N',
  },
  'Sinistcha-Masterpiece': {
    types: ['Grass', 'Ghost'],
    bs: {hp: 71, at: 60, df: 106, sa: 121, sd: 80, sp: 70},
    weightkg: 2.2,
    abilities: {0: 'Hospitality'},
    gender: 'N',
    baseSpecies: 'Sinistcha',
  },
  Skeledirge: {
    types: ['Fire', 'Ghost'],
    bs: {hp: 104, at: 75, df: 100, sa: 110, sd: 75, sp: 66},
    weightkg: 326.5,
    abilities: {0: 'Blaze'},
  },
  'Slither Wing': {
    types: ['Bug', 'Fighting'],
    bs: {hp: 85, at: 135, df: 79, sa: 85, sd: 105, sp: 81},
    weightkg: 92,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Smoliv: {
    types: ['Grass', 'Normal'],
    bs: {hp: 41, at: 35, df: 45, sa: 58, sd: 51, sp: 30},
    weightkg: 6.5,
    abilities: {0: 'Early Bird'},
    nfe: true,
  },
  Spidops: {
    types: ['Bug'],
    bs: {hp: 60, at: 79, df: 92, sa: 52, sd: 86, sp: 35},
    weightkg: 16.5,
    abilities: {0: 'Insomnia'},
  },
  Sprigatito: {
    types: ['Grass'],
    bs: {hp: 40, at: 61, df: 54, sa: 45, sd: 45, sp: 65},
    weightkg: 4.1,
    abilities: {0: 'Overgrow'},
    nfe: true,
  },
  Squawkabilly: {
    types: ['Normal', 'Flying'],
    bs: {hp: 82, at: 96, df: 51, sa: 45, sd: 51, sp: 92},
    weightkg: 2.4,
    abilities: {0: 'Intimidate'},
    otherFormes: ['Squawkabilly-Blue', 'Squawkabilly-White', 'Squawkabilly-Yellow'],
  },
  'Squawkabilly-Blue': {
    types: ['Normal', 'Flying'],
    bs: {hp: 82, at: 96, df: 51, sa: 45, sd: 51, sp: 92},
    weightkg: 2.4,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Squawkabilly',
  },
  'Squawkabilly-White': {
    types: ['Normal', 'Flying'],
    bs: {hp: 82, at: 96, df: 51, sa: 45, sd: 51, sp: 92},
    weightkg: 2.4,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Squawkabilly',
  },
  'Squawkabilly-Yellow': {
    types: ['Normal', 'Flying'],
    bs: {hp: 82, at: 96, df: 51, sa: 45, sd: 51, sp: 92},
    weightkg: 2.4,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Squawkabilly',
  },
  Tadbulb: {
    types: ['Electric'],
    bs: {hp: 61, at: 31, df: 41, sa: 59, sd: 35, sp: 45},
    weightkg: 0.4,
    abilities: {0: 'Own Tempo'},
    nfe: true,
  },
  Tandemaus: {
    types: ['Normal'],
    bs: {hp: 50, at: 50, df: 45, sa: 40, sd: 45, sp: 75},
    weightkg: 1.8,
    gender: 'N',
    abilities: {0: 'Run Away'},
    nfe: true,
  },
  Tarountula: {
    types: ['Bug'],
    bs: {hp: 35, at: 41, df: 45, sa: 29, sd: 40, sp: 20},
    weightkg: 4,
    abilities: {0: 'Insomnia'},
    nfe: true,
  },
  Tatsugiri: {
    types: ['Dragon', 'Water'],
    bs: {hp: 68, at: 50, df: 60, sa: 120, sd: 95, sp: 82},
    weightkg: 8,
    abilities: {0: 'Commander'},
  },
  'Tauros-Paldea-Aqua': {
    types: ['Fighting', 'Water'],
    bs: {hp: 75, at: 110, df: 105, sa: 30, sd: 70, sp: 100},
    weightkg: 110,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Tauros',
  },
  'Tauros-Paldea-Blaze': {
    types: ['Fighting', 'Fire'],
    bs: {hp: 75, at: 110, df: 105, sa: 30, sd: 70, sp: 100},
    weightkg: 85,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Tauros',
  },
  'Tauros-Paldea-Combat': {
    types: ['Fighting'],
    bs: {hp: 75, at: 110, df: 105, sa: 30, sd: 70, sp: 100},
    weightkg: 115,
    abilities: {0: 'Intimidate'},
    baseSpecies: 'Tauros',
  },
  'Terapagos': {
    types: ['Normal'],
    bs: {hp: 90, at: 65, df: 85, sa: 65, sd: 85, sp: 60},
    weightkg: 6.5,
    abilities: {0: 'Tera Shift'},
    // baseSpecies: 'Terapagos',
    otherFormes: ['Terapagos-Stellar', 'Terapagos-Terastal'],
  },
  'Terapagos-Stellar': {
    types: ['Normal'],
    bs: {hp: 160, at: 105, df: 110, sa: 130, sd: 110, sp: 85},
    weightkg: 77,
    abilities: {0: 'Teraform Zero'},
    baseSpecies: 'Terapagos',
    // otherFormes: ['Terapagos', 'Terapagos-Terastal'],
  },
  'Terapagos-Terastal': {
    types: ['Normal'],
    bs: {hp: 95, at: 95, df: 110, sa: 105, sd: 110, sp: 85},
    weightkg: 16,
    abilities: {0: 'Tera Shell'},
    baseSpecies: 'Terapagos',
    // otherFormes: ['Terapagos-Stellar', 'Terapagos'],
  },
  'Ting-Lu': {
    types: ['Dark', 'Ground'],
    bs: {hp: 155, at: 110, df: 125, sa: 55, sd: 80, sp: 45},
    weightkg: 699.7,
    gender: 'N',
    abilities: {0: 'Vessel of Ruin'},
  },
  Tinkatink: {
    types: ['Fairy', 'Steel'],
    bs: {hp: 50, at: 45, df: 45, sa: 35, sd: 64, sp: 58},
    weightkg: 8.9,
    abilities: {0: 'Mold Breaker'},
    nfe: true,
  },
  Tinkaton: {
    types: ['Fairy', 'Steel'],
    bs: {hp: 85, at: 75, df: 77, sa: 70, sd: 105, sp: 94},
    weightkg: 112.8,
    abilities: {0: 'Mold Breaker'},
  },
  Tinkatuff: {
    types: ['Fairy', 'Steel'],
    bs: {hp: 65, at: 55, df: 55, sa: 45, sd: 82, sp: 78},
    weightkg: 59.1,
    abilities: {0: 'Mold Breaker'},
    nfe: true,
  },
  Toedscool: {
    types: ['Ground', 'Grass'],
    bs: {hp: 40, at: 40, df: 35, sa: 50, sd: 100, sp: 70},
    weightkg: 33,
    abilities: {0: 'Mycelium Might'},
    nfe: true,
  },
  Toedscruel: {
    types: ['Ground', 'Grass'],
    bs: {hp: 80, at: 70, df: 65, sa: 80, sd: 120, sp: 100},
    weightkg: 58,
    abilities: {0: 'Mycelium Might'},
  },
  'Ursaluna': {
    otherFormes: ['Ursaluna-Bloodmoon'],
  },
  'Ursaluna-Bloodmoon': {
    types: ['Ground', 'Normal'],
    bs: {hp: 113, at: 70, df: 120, sa: 135, sd: 65, sp: 52},
    weightkg: 333,
    abilities: {0: 'Mind\'s Eye'},
    baseSpecies: 'Ursaluna',
  },
  Varoom: {
    types: ['Steel', 'Poison'],
    bs: {hp: 45, at: 70, df: 63, sa: 30, sd: 45, sp: 47},
    weightkg: 35,
    abilities: {0: 'Overcoat'},
    nfe: true,
  },
  Veluza: {
    types: ['Water', 'Psychic'],
    bs: {hp: 90, at: 102, df: 73, sa: 78, sd: 65, sp: 70},
    weightkg: 90,
    abilities: {0: 'Mold Breaker'},
  },
  'Walking Wake': {
    types: ['Water', 'Dragon'],
    bs: {hp: 99, at: 83, df: 91, sa: 125, sd: 83, sp: 109},
    weightkg: 280,
    gender: 'N',
    abilities: {0: 'Protosynthesis'},
  },
  Wattrel: {
    types: ['Electric', 'Flying'],
    bs: {hp: 40, at: 40, df: 35, sa: 55, sd: 40, sp: 70},
    weightkg: 3.6,
    abilities: {0: 'Wind Power'},
    nfe: true,
  },
  Wiglett: {
    types: ['Water'],
    bs: {hp: 10, at: 55, df: 25, sa: 35, sd: 25, sp: 95},
    weightkg: 1.8,
    abilities: {0: 'Gooey'},
    nfe: true,
  },
  'Wo-Chien': {
    types: ['Dark', 'Grass'],
    bs: {hp: 85, at: 85, df: 100, sa: 95, sd: 135, sp: 70},
    weightkg: 74.2,
    gender: 'N',
    abilities: {0: 'Tablets of Ruin'},
  },
  'Wooper-Paldea': {
    types: ['Poison', 'Ground'],
    bs: {hp: 55, at: 45, df: 45, sa: 25, sd: 25, sp: 15},
    weightkg: 11,
    abilities: {0: 'Poison Point'},
    baseSpecies: 'Wooper',
    nfe: true,
  },
  Wugtrio: {
    types: ['Water'],
    bs: {hp: 35, at: 100, df: 50, sa: 50, sd: 70, sp: 120},
    weightkg: 5.4,
    abilities: {0: 'Gooey'},
  },
  'Orchynx': {
    types: ['Grass', 'Steel'],
    bs: { hp: 50, at: 55, df: 55, sa: 70, sd: 70, sp: 50 },
    weightkg: 6.9,
    abilities: { 0: 'Battle Armor' },
    nfe: true,
    origin: "Uranium"
    
},
'Metalynx': {
    types: ['Grass', 'Steel'],
    bs: { hp: 85, at: 95, df: 115, sa: 70, sd: 100, sp: 65 },
    weightkg: 125,
    abilities: { 0: 'Battle Armor' },
    origin: "Uranium"
    },
'Metalynx-Mega': {
    types: ['Grass', 'Steel'],
    bs: { hp: 85, at: 140, df: 160, sa: 70, sd: 110, sp: 65 },
    weightkg: 146.5,
    abilities: { 0: 'Heatproof' },
    origin: "Uranium"
    },
'Raptorch': {
    types: ['Fire', 'Ground'],
    bs: { hp: 40, at: 55, df: 45, sa: 65, sd: 50, sp: 70 },
    weightkg: 85.5,
    abilities: { 0: 'Flame Body' },
    nfe: true,
    origin: "Uranium"
    
},
'Archilles': {
    types: ['Fire', 'Ground'],
    bs: { hp: 75, at: 90, df: 80, sa: 90, sd: 80, sp: 125 },
    weightkg: 85.5,
    abilities: { 0: 'Flame Body' },
    origin: "Uranium"
    },
'Archilles-Mega': {
    types: ['Fire', 'Ground'],
    bs: { hp: 75, at: 90, df: 95, sa: 135, sd: 90, sp: 155 },
    weightkg: 88.7,
    abilities: { 0: 'Drought' },
    origin: "Uranium"
    },
'Eletux': {
    types: ['Water', 'Electric'],
    bs: { hp: 60, at: 50, df: 65, sa: 50, sd: 65, sp: 45 },
    weightkg: 18.5,
    abilities: { 0: 'Static' },
    nfe: true,
    origin: "Uranium"
    
},
'Electruxo': {
    types: ['Water', 'Electric'],
    bs: { hp: 95, at: 80, df: 95, sa: 90, sd: 105, sp: 85 },
    weightkg: 85.5,
    abilities: { 0: 'Static' },
    origin: "Uranium"
    },
'Electruxo-Mega': {
    types: ['Water', 'Electric'],
    bs: { hp: 95, at: 90, df: 95, sa: 135, sd: 105, sp: 110 },
    weightkg: 96.5,
    abilities: { 0: 'Drizzle' },
    origin: "Uranium"
    },
'Chyinmunk': {
    types: ['Normal'],
    bs: { hp: 35, at: 40, df: 50, sa: 55, sd: 50, sp: 55 },
    weightkg: 6,
    abilities: { 0: 'Run Away' },
    nfe: true,
    origin: "Uranium"
    
},
'Chyinmunk-Nuclear': {
    types: ['Normal', 'Nuclear'],
    bs: { hp: 35, at: 40, df: 50, sa: 55, sd: 50, sp: 55 },
    weightkg: 6,
    abilities: { 0: 'Run Away' },
    nfe: true,
    origin: "Uranium"
    
},
'Kinetmunk': {
    types: ['Normal', 'Electric'],
    bs: { hp: 65, at: 45, df: 70, sa: 75, sd: 70, sp: 90 },
    weightkg: 20.1,
    abilities: { 0: 'Run Away' },
    origin: "Uranium"
    },
'Kinetmunk-Nuclear': {
    types: ['Normal', 'Nuclear'],
    bs: { hp: 65, at: 45, df: 70, sa: 75, sd: 70, sp: 90 },
    weightkg: 20.1,
    abilities: { 0: 'Run Away' },
    origin: "Uranium"
    },
'Birbie': {
    types: ['Normal', 'Flying'],
    bs: { hp: 50, at: 36, df: 30, sa: 55, sd: 50, sp: 43 },
    weightkg: 1.6,
    abilities: { 0: 'Big Pecks' },
    nfe: true,
    origin: "Uranium"
    
},
'Aveden': {
    types: ['Normal', 'Flying'],
    bs: { hp: 62, at: 50, df: 42, sa: 77, sd: 62, sp: 65 },
    weightkg: 13,
    abilities: { 0: 'Big Pecks' },
    nfe: true,
    origin: "Uranium"
    
},
'Splendifowl': {
    types: ['Normal', 'Flying'],
    bs: { hp: 80, at: 65, df: 55, sa: 105, sd: 80, sp: 93 },
    weightkg: 33,
    abilities: { 0: 'Big Pecks' },
    origin: "Uranium"
    },
'Cubbug': {
    types: ['Bug'],
    bs: { hp: 45, at: 53, df: 70, sa: 40, sd: 60, sp: 42 },
    weightkg: 0.6,
    abilities: { 0: 'Swarm' },
    nfe: true,
    origin: "Uranium"
    
},
'Cubblfly': {
    types: ['Bug', 'Fairy'],
    bs: { hp: 55, at: 63, df: 90, sa: 50, sd: 80, sp: 42 },
    weightkg: 4.8,
    abilities: { 0: 'Swarm' },
    nfe: true,
    origin: "Uranium"
    
},
'Nimflora': {
    types: ['Bug', 'Fairy'],
    bs: { hp: 75, at: 103, df: 80, sa: 70, sd: 70, sp: 92 },
    weightkg: 21.4,
    abilities: { 0: 'Swarm' },
    origin: "Uranium"
    },
'Barewl': {
    types: ['Steel', 'Rock'],
    bs: { hp: 50, at: 50, df: 90, sa: 40, sd: 55, sp: 35 },
    weightkg: 120,
    abilities: { 0: 'Sturdy' },
    nfe: true,
    origin: "Uranium"
    
},
'Dearewl': {
    types: ['Steel', 'Rock'],
    bs: { hp: 65, at: 75, df: 120, sa: 50, sd: 65, sp: 45 },
    weightkg: 120,
    abilities: { 0: 'Sturdy' },
    nfe: true,
    origin: "Uranium"
    
},
'Gararewl': {
    types: ['Steel'],
    bs: { hp: 75, at: 100, df: 140, sa: 65, sd: 85, sp: 55 },
    weightkg: 190,
    abilities: { 0: 'Sturdy' },
    origin: "Uranium"
    },
'Grozard': {
    types: ['Ground'],
    bs: { hp: 25, at: 45, df: 25, sa: 55, sd: 45, sp: 85 },
    weightkg: 14.3,
    abilities: { 0: 'Sand Veil' },
    nfe: true,
    origin: "Uranium"
    
},
'Terlard': {
    types: ['Ground', 'Dragon'],
    bs: { hp: 60, at: 80, df: 65, sa: 85, sd: 70, sp: 95 },
    weightkg: 86.6,
    abilities: { 0: 'Sand Veil' },
    origin: "Uranium"
    },
'Tonemy': {
    types: ['Poison'],
    bs: { hp: 60, at: 45, df: 45, sa: 40, sd: 45, sp: 95 },
    weightkg: 1,
    abilities: { 0: 'Levitate' },
    nfe: true,
    origin: "Uranium"
    
},
'Tofurang': {
    types: ['Poison'],
    bs: { hp: 100, at: 60, df: 85, sa: 40, sd: 85, sp: 60 },
    weightkg: 99.5,
    abilities: { 0: 'Intimidate' },
    origin: "Uranium"
    },
'Dunseraph': {
    types: ['Dragon', 'Flying'],
    bs: { hp: 150, at: 80, df: 80, sa: 100, sd: 75, sp: 75 },
    weightkg: 110,
    abilities: { 0: 'Serene Grace' },
    origin: "Uranium"
    },
'Fortog': {
    types: ['Water', 'Poison'],
    bs: { hp: 65, at: 50, df: 40, sa: 65, sd: 80, sp: 35 },
    weightkg: 65.3,
    abilities: { 0: 'Clear Body' },
    nfe: true,
    origin: "Uranium"
    
},
'Folerog': {
    types: ['Water', 'Poison'],
    bs: { hp: 80, at: 60, df: 60, sa: 75, sd: 90, sp: 50 },
    weightkg: 85.3,
    abilities: { 0: 'Clear Body' },
    nfe: true,
    origin: "Uranium"
    
},
'Blubelrog': {
    types: ['Water', 'Poison'],
    bs: { hp: 105, at: 70, df: 75, sa: 105, sd: 115, sp: 65 },
    weightkg: 98,
    abilities: { 0: 'Clear Body' },
    origin: "Uranium"
    },
'Feleng': {
    types: ['Normal'],
    bs: { hp: 50, at: 70, df: 45, sa: 35, sd: 35, sp: 50 },
    weightkg: 6.8,
    abilities: { 0: 'Intimidate' },
    nfe: true,
    origin: "Uranium"
    
},
'Felunge': {
    types: ['Normal'],
    bs: { hp: 60, at: 95, df: 70, sa: 45, sd: 37, sp: 95 },
    weightkg: 22.5,
    abilities: { 0: 'Intimidate' },
    nfe: true,
    origin: "Uranium"
    
},
'Feliger': {
    types: ['Normal'],
    bs: { hp: 120, at: 155, df: 105, sa: 35, sd: 95, sp: 65 },
    weightkg: 130.5,
    abilities: { 0: 'Lazy' },
    origin: "Uranium"
    },
'Empirilla': {
    types: ['Fighting'],
    bs: { hp: 80, at: 115, df: 70, sa: 80, sd: 80, sp: 95 },
    weightkg: 88.5,
    abilities: { 0: 'Infuriate' },
    origin: "Uranium"
    },
'Owten': {
    types: ['Normal', 'Flying'],
    bs: { hp: 50, at: 60, df: 30, sa: 40, sd: 35, sp: 75 },
    weightkg: 2.3,
    abilities: { 0: 'Serene Grace' },
    nfe: true,
    origin: "Uranium"
    
},
'Owten-Nuclear': {
    types: ['Normal', 'Nuclear'],
    bs: { hp: 50, at: 60, df: 30, sa: 40, sd: 35, sp: 75 },
    weightkg: 2.3,
    abilities: { 0: 'Serene Grace' },
    nfe: true,
    origin: "Uranium"
    
},
'Eshouten': {
    types: ['Normal', 'Flying'],
    bs: { hp: 75, at: 85, df: 55, sa: 65, sd: 60, sp: 110 },
    weightkg: 12.2,
    abilities: { 0: 'Serene Grace' },
    origin: "Uranium"
    },
'Eshouten-Nuclear': {
    types: ['Normal', 'Nuclear'],
    bs: { hp: 75, at: 85, df: 55, sa: 65, sd: 60, sp: 110 },
    weightkg: 12.2,
    abilities: { 0: 'Serene Grace' },
    origin: "Uranium"
    },
'Smore': {
    types: ['Bug'],
    bs: { hp: 40, at: 30, df: 40, sa: 70, sd: 40, sp: 45 },
    weightkg: 1.2,
    abilities: { 0: 'Swarm' },
    nfe: true,
    origin: "Uranium"
    
},
'Firoke': {
    types: ['Bug', 'Fire'],
    bs: { hp: 80, at: 60, df: 60, sa: 100, sd: 60, sp: 65 },
    weightkg: 19.2,
    abilities: { 0: 'Sniper' },
    origin: "Uranium"
    },
'Brailip': {
    types: ['Water', 'Psychic'],
    bs: { hp: 90, at: 35, df: 65, sa: 75, sd: 80, sp: 45 },
    weightkg: 22.4,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Uranium"
    
},
'Brainoar': {
    types: ['Water', 'Psychic'],
    bs: { hp: 105, at: 35, df: 85, sa: 100, sd: 140, sp: 65 },
    weightkg: 224.6,
    abilities: { 0: 'Swift Swim' },
    origin: "Uranium"
    },
'Tancoon': {
    types: ['Dark', 'Normal'],
    bs: { hp: 55, at: 55, df: 40, sa: 45, sd: 55, sp: 60 },
    weightkg: 6.3,
    abilities: { 0: 'Guts' },
    nfe: true,
    origin: "Uranium"
    
},
'Tancoon-Nuclear': {
    types: ['Dark', 'Nuclear'],
    bs: { hp: 55, at: 55, df: 40, sa: 45, sd: 55, sp: 60 },
    weightkg: 6.3,
    abilities: { 0: 'Guts' },
    nfe: true,
    origin: "Uranium"
    
},
'Tanscure': {
    types: ['Dark', 'Normal'],
    bs: { hp: 80, at: 85, df: 60, sa: 55, sd: 80, sp: 95 },
    weightkg: 38.5,
    abilities: { 0: 'Guts' },
    origin: "Uranium"
    },
'Tanscure-Nuclear': {
    types: ['Dark', 'Nuclear'],
    bs: { hp: 80, at: 85, df: 60, sa: 55, sd: 80, sp: 95 },
    weightkg: 38.5,
    abilities: { 0: 'Guts' },
    origin: "Uranium"
    },
'Sponee': {
    types: ['Bug'],
    bs: { hp: 40, at: 20, df: 45, sa: 50, sd: 60, sp: 55 },
    weightkg: 2.2,
    abilities: { 0: 'Swarm' },
    nfe: true,
    origin: "Uranium"
    
},
'Sponaree': {
    types: ['Bug', 'Water'],
    bs: { hp: 88, at: 35, df: 68, sa: 82, sd: 90, sp: 70 },
    weightkg: 20.5,
    abilities: { 0: 'Water Absorb' },
    origin: "Uranium"
    },
'Pahar': {
    types: ['Fire', 'Flying'],
    bs: { hp: 45, at: 45, df: 50, sa: 70, sd: 60, sp: 60 },
    weightkg: 1.6,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Uranium"
    
},
'Pahar-Nuclear': {
    types: ['Fire', 'Nuclear'],
    bs: { hp: 45, at: 45, df: 50, sa: 70, sd: 60, sp: 60 },
    weightkg: 1.6,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Uranium"
    
},
'Palij': {
    types: ['Fire', 'Flying'],
    bs: { hp: 60, at: 45, df: 60, sa: 90, sd: 80, sp: 85 },
    weightkg: 11.3,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Uranium"
    
},
'Palij-Nuclear': {
    types: ['Fire', 'Nuclear'],
    bs: { hp: 60, at: 45, df: 60, sa: 90, sd: 80, sp: 85 },
    weightkg: 11.3,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Uranium"
    
},
'Pajay': {
    types: ['Fire', 'Flying'],
    bs: { hp: 80, at: 50, df: 60, sa: 110, sd: 80, sp: 100 },
    weightkg: 28.3,
    abilities: { 0: 'Flash Fire' },
    origin: "Uranium"
    },
'Pajay-Nuclear': {
    types: ['Fire', 'Nuclear'],
    bs: { hp: 80, at: 50, df: 60, sa: 110, sd: 80, sp: 100 },
    weightkg: 28.3,
    abilities: { 0: 'Flash Fire' },
    origin: "Uranium"
    },
'Jerbolta': {
    types: ['Electric', 'Ground'],
    bs: { hp: 60, at: 65, df: 45, sa: 85, sd: 65, sp: 110 },
    weightkg: 2.9,
    abilities: { 0: 'Quick Charge' },
    origin: "Uranium"
    },
'Jerbolta-Nuclear': {
    types: ['Electric', 'Nuclear'],
    bs: { hp: 60, at: 65, df: 45, sa: 85, sd: 65, sp: 110 },
    weightkg: 2.9,
    abilities: { 0: 'Quick Charge' },
    origin: "Uranium"
    },
'Comite': {
    types: ['Rock'],
    bs: { hp: 50, at: 30, df: 55, sa: 75, sd: 40, sp: 60 },
    weightkg: 60.8,
    abilities: { 0: 'Hustle' },
    nfe: true,
    origin: "Uranium"
    
},
'Cometeor': {
    types: ['Rock', 'Psychic'],
    bs: { hp: 75, at: 45, df: 65, sa: 95, sd: 60, sp: 75 },
    weightkg: 207.5,
    abilities: { 0: 'Technician' },
    nfe: true,
    origin: "Uranium"
    
},
'Astronite': {
    types: ['Rock', 'Psychic'],
    bs: { hp: 80, at: 85, df: 85, sa: 115, sd: 75, sp: 105 },
    weightkg: 242.7,
    abilities: { 0: 'Technician' },
    origin: "Uranium"
    },
'Baashaun': {
    types: ['Dark', 'Fighting'],
    bs: { hp: 70, at: 75, df: 50, sa: 35, sd: 40, sp: 40 },
    weightkg: 10.5,
    abilities: { 0: 'Guts' },
    nfe: true,
    origin: "Uranium"
    
},
'Baashaun-Nuclear': {
    types: ['Dark', 'Nuclear'],
    bs: { hp: 70, at: 75, df: 50, sa: 35, sd: 40, sp: 40 },
    weightkg: 10.5,
    abilities: { 0: 'Guts' },
    nfe: true,
    origin: "Uranium"
    
},
'Baaschaf': {
    types: ['Dark', 'Fighting'],
    bs: { hp: 85, at: 90, df: 70, sa: 45, sd: 65, sp: 55 },
    weightkg: 26.5,
    abilities: { 0: 'Guts' },
    nfe: true,
    origin: "Uranium"
    
},
'Baaschaf-Nuclear': {
    types: ['Dark', 'Nuclear'],
    bs: { hp: 85, at: 90, df: 70, sa: 45, sd: 65, sp: 55 },
    weightkg: 26.5,
    abilities: { 0: 'Guts' },
    nfe: true,
    origin: "Uranium"
    
},
'Baariette': {
    types: ['Dark', 'Fighting'],
    bs: { hp: 100, at: 125, df: 85, sa: 75, sd: 85, sp: 75 },
    weightkg: 72,
    abilities: { 0: 'Guts' },
    origin: "Uranium"
    },
'Baariette-Mega': {
    types: ['Dark', 'Fighting'],
    bs: { hp: 100, at: 160, df: 120, sa: 80, sd: 110, sp: 100 },
    weightkg: 115.7,
    abilities: { 0: 'Blood Lust' },
    origin: "Uranium"
    },
'Baariette-Nuclear': {
    types: ['Dark', 'Nuclear'],
    bs: { hp: 100, at: 125, df: 85, sa: 75, sd: 85, sp: 75 },
    weightkg: 72,
    abilities: { 0: 'Guts' },
    origin: "Uranium"
    },
'Baariette-Nuclear-Mega': {
    types: ['Dark', 'Nuclear'],
    bs: { hp: 100, at: 160, df: 120, sa: 80, sd: 110, sp: 100 },
    weightkg: 115.7,
    abilities: { 0: 'Blood Lust' },
    origin: "Uranium"
    },
'Tricwe': {
    types: ['Bug'],
    bs: { hp: 40, at: 65, df: 35, sa: 30, sd: 30, sp: 65 },
    weightkg: 2.5,
    abilities: { 0: 'Swarm' },
    nfe: true,
    origin: "Uranium"
    
},
'Harylect': {
    types: ['Bug', 'Electric'],
    bs: { hp: 70, at: 100, df: 55, sa: 50, sd: 60, sp: 85 },
    weightkg: 18.5,
    abilities: { 0: 'Volt Absorb' },
    origin: "Uranium"
    },
'Costraw': {
    types: ['Poison', 'Psychic'],
    bs: { hp: 55, at: 40, df: 40, sa: 55, sd: 55, sp: 60 },
    weightkg: 6.9,
    abilities: { 0: 'Shed Skin' },
    nfe: true,
    origin: "Uranium"
    
},
'Costraw-Nuclear': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 55, at: 40, df: 40, sa: 55, sd: 55, sp: 60 },
    weightkg: 6.9,
    abilities: { 0: 'Shed Skin' },
    nfe: true,
    origin: "Uranium"
    
},
'Trawpint': {
    types: ['Poison', 'Psychic'],
    bs: { hp: 90, at: 50, df: 85, sa: 85, sd: 95, sp: 85 },
    weightkg: 65,
    abilities: { 0: 'Shed Skin' },
    origin: "Uranium"
    },
'Trawpint-Nuclear': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 90, at: 50, df: 85, sa: 85, sd: 95, sp: 85 },
    weightkg: 65,
    abilities: { 0: 'Shed Skin' },
    origin: "Uranium"
    },
'Lunapup': {
    types: ['Ground', 'Fighting'],
    bs: { hp: 64, at: 64, df: 64, sa: 30, sd: 44, sp: 36 },
    weightkg: 8,
    abilities: { 0: 'Mold Breaker' },
    nfe: true,
    origin: "Uranium"
    
},
'Herolune': {
    types: ['Ground', 'Fighting'],
    bs: { hp: 95, at: 124, df: 83, sa: 63, sd: 68, sp: 60 },
    weightkg: 88.2,
    abilities: { 0: 'Mold Breaker' },
    origin: "Uranium"
    },
'Minyan': {
    types: ['Dark', 'Poison'],
    bs: { hp: 48, at: 64, df: 36, sa: 58, sd: 35, sp: 61 },
    weightkg: 14.8,
    abilities: { 0: 'Blood Lust' },
    nfe: true,
    origin: "Uranium"
    
},
'Minyan-Mystery': {
    types: ['Dark', 'Poison'],
    bs: { hp: 48, at: 64, df: 36, sa: 58, sd: 35, sp: 61 },
    weightkg: 14.8,
    abilities: { 0: 'Speed Boost' },
    nfe: true,
    origin: "Uranium"
    
},
'Vilucard': {
    types: ['Dark', 'Poison'],
    bs: { hp: 75, at: 108, df: 60, sa: 102, sd: 58, sp: 90 },
    weightkg: 64.4,
    abilities: { 0: 'Blood Lust' },
    origin: "Uranium"
    },
'Vilucard-Mystery': {
    types: ['Dark', 'Poison'],
    bs: { hp: 75, at: 108, df: 60, sa: 102, sd: 58, sp: 90 },
    weightkg: 64.4,
    abilities: { 0: 'Speed Boost' },
    origin: "Uranium"
    },
'Modrille': {
    types: ['Ground', 'Dark'],
    bs: { hp: 50, at: 70, df: 60, sa: 40, sd: 45, sp: 50 },
    weightkg: 44.3,
    abilities: { 0: 'Lightning Rod' },
    nfe: true,
    origin: "Uranium"
    
},
'Drilgann': {
    types: ['Ground', 'Dark'],
    bs: { hp: 75, at: 140, df: 70, sa: 60, sd: 75, sp: 55 },
    weightkg: 190,
    abilities: { 0: 'Lightning Rod' },
    origin: "Uranium"
    },
'Drilgann-Mega': {
    types: ['Ground', 'Dark'],
    bs: { hp: 75, at: 180, df: 88, sa: 60, sd: 88, sp: 84 },
    weightkg: 223.2,
    abilities: { 0: 'Sand Rush' },
    origin: "Uranium"
    },
'Cocaran': {
    types: ['Grass', 'Ground'],
    bs: { hp: 60, at: 70, df: 75, sa: 35, sd: 70, sp: 50 },
    weightkg: 14,
    abilities: { 0: 'Sand Veil' },
    nfe: true,
    origin: "Uranium"
    
},
'Cocaran-Mystery': {
    types: ['Grass', 'Ground'],
    bs: { hp: 60, at: 70, df: 75, sa: 35, sd: 70, sp: 50 },
    weightkg: 14,
    abilities: { 0: 'Filter' },
    nfe: true,
    origin: "Uranium"
    
},
'Cararalm': {
    types: ['Grass', 'Ground'],
    bs: { hp: 80, at: 80, df: 85, sa: 35, sd: 85, sp: 80 },
    weightkg: 60.7,
    abilities: { 0: 'Sand Veil' },
    nfe: true,
    origin: "Uranium"
    
},
'Cararalm-Mystery': {
    types: ['Grass', 'Ground'],
    bs: { hp: 80, at: 80, df: 85, sa: 35, sd: 85, sp: 80 },
    weightkg: 60.7,
    abilities: { 0: 'Filter' },
    nfe: true,
    origin: "Uranium"
    
},
'Cocancer': {
    types: ['Grass', 'Ground'],
    bs: { hp: 90, at: 95, df: 120, sa: 35, sd: 115, sp: 60 },
    weightkg: 240.7,
    abilities: { 0: 'Sand Veil' },
    origin: "Uranium"
    },
'Cocancer-Mystery': {
    types: ['Grass', 'Ground'],
    bs: { hp: 90, at: 95, df: 120, sa: 35, sd: 115, sp: 60 },
    weightkg: 240.7,
    abilities: { 0: 'Filter' },
    origin: "Uranium"
    },
'Corsoreef': {
    types: ['Water', 'Rock'],
    bs: { hp: 90, at: 55, df: 105, sa: 60, sd: 105, sp: 25 },
    weightkg: 84,
    abilities: { 0: 'Sharp Coral' },
    origin: "Uranium"
    },
'Corsoreef-Nuclear': {
    types: ['Water', 'Nuclear'],
    bs: { hp: 90, at: 55, df: 105, sa: 60, sd: 105, sp: 25 },
    weightkg: 84,
    abilities: { 0: 'Sharp Coral' },
    origin: "Uranium"
    },
'Tubjaw': {
    types: ['Water', 'Dark'],
    bs: { hp: 70, at: 70, df: 90, sa: 45, sd: 65, sp: 65 },
    weightkg: 55.4,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Uranium"
    
},
'Tubjaw-Nuclear': {
    types: ['Water', 'Nuclear'],
    bs: { hp: 70, at: 70, df: 90, sa: 45, sd: 65, sp: 65 },
    weightkg: 55.4,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Uranium"
    
},
'Tubareel': {
    types: ['Water', 'Dark'],
    bs: { hp: 105, at: 100, df: 140, sa: 55, sd: 85, sp: 65 },
    weightkg: 224.6,
    abilities: { 0: 'Swift Swim' },
    origin: "Uranium"
    },
'Tubareel-Nuclear': {
    types: ['Water', 'Nuclear'],
    bs: { hp: 105, at: 100, df: 140, sa: 55, sd: 85, sp: 65 },
    weightkg: 224.6,
    abilities: { 0: 'Swift Swim' },
    origin: "Uranium"
    },
'Cassnail': {
    types: ['Ground', 'Water'],
    bs: { hp: 80, at: 45, df: 70, sa: 70, sd: 55, sp: 40 },
    weightkg: 11.3,
    abilities: { 0: 'Shell Armor' },
    nfe: true,
    origin: "Uranium"
    
},
'Sableau': {
    types: ['Ground', 'Water'],
    bs: { hp: 100, at: 60, df: 85, sa: 90, sd: 65, sp: 65 },
    weightkg: 87.6,
    abilities: { 0: 'Shell Armor' },
    nfe: true,
    origin: "Uranium"
    
},
'Escartress': {
    types: ['Ground', 'Water'],
    bs: { hp: 120, at: 60, df: 90, sa: 110, sd: 70, sp: 65 },
    weightkg: 229.9,
    abilities: { 0: 'Shell Armor' },
    origin: "Uranium"
    },
'Nupin': {
    types: ['Grass', 'Electric'],
    bs: { hp: 75, at: 20, df: 45, sa: 80, sd: 70, sp: 25 },
    weightkg: 2.6,
    abilities: { 0: 'Chlorophyll' },
    nfe: true,
    origin: "Uranium"
    
},
'Nupin-Nuclear': {
    types: ['Grass', 'Nuclear'],
    bs: { hp: 75, at: 20, df: 45, sa: 80, sd: 70, sp: 25 },
    weightkg: 2.6,
    abilities: { 0: 'Chlorophyll' },
    nfe: true,
    origin: "Uranium"
    
},
'Gellin': {
    types: ['Grass', 'Electric'],
    bs: { hp: 90, at: 35, df: 75, sa: 120, sd: 100, sp: 85 },
    weightkg: 38.3,
    abilities: { 0: 'Chlorophyll' },
    origin: "Uranium"
    },
'Gellin-Nuclear': {
    types: ['Grass', 'Nuclear'],
    bs: { hp: 90, at: 35, df: 75, sa: 120, sd: 100, sp: 85 },
    weightkg: 38.3,
    abilities: { 0: 'Chlorophyll' },
    origin: "Uranium"
    },
'Barand': {
    types: ['Dragon'],
    bs: { hp: 45, at: 115, df: 45, sa: 40, sd: 30, sp: 85 },
    weightkg: 90.4,
    abilities: { 0: 'Rivalry' },
    origin: "Uranium"
    },
'Barand-Nuclear': {
    types: ['Dragon', 'Nuclear'],
    bs: { hp: 45, at: 115, df: 45, sa: 40, sd: 30, sp: 85 },
    weightkg: 90.4,
    abilities: { 0: 'Rivalry' },
    origin: "Uranium"
    },
'Glaslug': {
    types: ['Water', 'Ice'],
    bs: { hp: 70, at: 25, df: 35, sa: 70, sd: 70, sp: 35 },
    weightkg: 18,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Uranium"
    
},
'Glavinug': {
    types: ['Water', 'Ice'],
    bs: { hp: 95, at: 75, df: 80, sa: 115, sd: 115, sp: 70 },
    weightkg: 44.5,
    abilities: { 0: 'Swift Swim' },
    origin: "Uranium"
    },
'S51': {
    types: ['Psychic', 'Steel'],
    bs: { hp: 60, at: 60, df: 60, sa: 60, sd: 60, sp: 60 },
    weightkg: 12.5,
    abilities: { 0: 'Levitate' },
    nfe: true,
    origin: "Uranium"
    
},
'S51-A': {
    types: ['Psychic', 'Steel'],
    bs: { hp: 105, at: 65, df: 90, sa: 115, sd: 90, sp: 75 },
    weightkg: 98.2,
    abilities: { 0: 'Levitate' },
    origin: "Uranium"
    },
'S51-A-Mega': {
    types: ['Psychic', 'Steel'],
    bs: { hp: 105, at: 95, df: 90, sa: 150, sd: 90, sp: 110 },
    weightkg: 137.8,
    abilities: { 0: 'Mega Launcher' },
    origin: "Uranium"
    },
'Paraudio': {
    types: ['Normal', 'Psychic'],
    bs: { hp: 50, at: 40, df: 55, sa: 60, sd: 50, sp: 50 },
    weightkg: 47.9,
    abilities: { 0: 'Soundproof' },
    nfe: true,
    origin: "Uranium"
    
},
'Paraudio-Nuclear': {
    types: ['Normal', 'Nuclear'],
    bs: { hp: 50, at: 40, df: 55, sa: 60, sd: 50, sp: 50 },
    weightkg: 47.9,
    abilities: { 0: 'Soundproof' },
    nfe: true,
    origin: "Uranium"
    
},
'Paraboom': {
    types: ['Normal', 'Psychic'],
    bs: { hp: 90, at: 65, df: 75, sa: 105, sd: 75, sp: 80 },
    weightkg: 77.7,
    abilities: { 0: 'Soundproof' },
    origin: "Uranium"
    },
'Paraboom-Nuclear': {
    types: ['Normal', 'Nuclear'],
    bs: { hp: 90, at: 65, df: 75, sa: 105, sd: 75, sp: 80 },
    weightkg: 77.7,
    abilities: { 0: 'Soundproof' },
    origin: "Uranium"
    },
'Flager': {
    types: ['Fire'],
    bs: { hp: 40, at: 55, df: 45, sa: 65, sd: 50, sp: 90 },
    weightkg: 8.5,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Uranium"
    
},
'Inflagetah': {
    types: ['Fire'],
    bs: { hp: 85, at: 100, df: 60, sa: 80, sd: 80, sp: 150 },
    weightkg: 45.5,
    abilities: { 0: 'Acceleration' },
    origin: "Uranium"
    },
'Inflagetah-Mega': {
    types: ['Fire'],
    bs: { hp: 85, at: 145, df: 80, sa: 80, sd: 90, sp: 175 },
    weightkg: 52.2,
    abilities: { 0: 'Acceleration' },
    origin: "Uranium"
    },
'Chimical': {
    types: ['Fire', 'Poison'],
    bs: { hp: 70, at: 40, df: 50, sa: 70, sd: 50, sp: 50 },
    weightkg: 5.7,
    abilities: { 0: 'Petrify' },
    nfe: true,
    origin: "Uranium"
    
},
'Chimaconda': {
    types: ['Fire', 'Poison'],
    bs: { hp: 95, at: 80, df: 90, sa: 100, sd: 100, sp: 85 },
    weightkg: 72.5,
    abilities: { 0: 'Petrify' },
    origin: "Uranium"
    },
'Tikiki': {
    types: ['Grass'],
    bs: { hp: 50, at: 75, df: 55, sa: 50, sd: 50, sp: 70 },
    weightkg: 26.9,
    abilities: { 0: 'Vital Spirit' },
    nfe: true,
    origin: "Uranium"
    
},
'Frikitiki': {
    types: ['Grass', 'Fire'],
    bs: { hp: 75, at: 125, df: 70, sa: 90, sd: 65, sp: 85 },
    weightkg: 55,
    abilities: { 0: 'Vital Spirit' },
    origin: "Uranium"
    },
'Unymph': {
    types: ['Bug'],
    bs: { hp: 45, at: 65, df: 75, sa: 25, sd: 35, sp: 20 },
    weightkg: 21.5,
    abilities: { 0: 'Shield Dust' },
    nfe: true,
    origin: "Uranium"
    
},
'Harptera': {
    types: ['Bug', 'Flying'],
    bs: { hp: 70, at: 130, df: 75, sa: 90, sd: 75, sp: 125 },
    weightkg: 41.1,
    abilities: { 0: 'Moxie' },
    origin: "Uranium"
    },
'Chicoatl': {
    types: ['Grass'],
    bs: { hp: 65, at: 45, df: 50, sa: 70, sd: 50, sp: 80 },
    weightkg: 3.6,
    abilities: { 0: 'Sap Sipper' },
    nfe: true,
    origin: "Uranium"
    
},
'Quetzoral': {
    types: ['Grass', 'Flying'],
    bs: { hp: 80, at: 45, df: 65, sa: 85, sd: 65, sp: 90 },
    weightkg: 14.3,
    abilities: { 0: 'Sap Sipper' },
    nfe: true,
    origin: "Uranium"
    
},
'Coatlith': {
    types: ['Grass', 'Dragon'],
    bs: { hp: 110, at: 50, df: 70, sa: 100, sd: 70, sp: 100 },
    weightkg: 148.3,
    abilities: { 0: 'Levitate' },
    origin: "Uranium"
    },
'Tracton': {
    types: ['Dragon', 'Steel'],
    bs: { hp: 85, at: 110, df: 70, sa: 50, sd: 80, sp: 100 },
    weightkg: 120,
    abilities: { 0: 'Speed Boost' },
    origin: "Uranium"
    },
'Snopach': {
    types: ['Ice', 'Rock'],
    bs: { hp: 90, at: 80, df: 80, sa: 50, sd: 40, sp: 50 },
    weightkg: 140.8,
    abilities: { 0: 'Solid Rock' },
    nfe: true,
    origin: "Uranium"
    
},
'Dermafrost': {
    types: ['Ice', 'Rock'],
    bs: { hp: 95, at: 115, df: 120, sa: 60, sd: 70, sp: 80 },
    weightkg: 890,
    abilities: { 0: 'Solid Rock' },
    origin: "Uranium"
    },
'Slothohm': {
    types: ['Electric', 'Rock'],
    bs: { hp: 60, at: 90, df: 50, sa: 50, sd: 20, sp: 70 },
    weightkg: 44.8,
    abilities: { 0: 'Galvanize' },
    nfe: true,
    origin: "Uranium"
    
},
'Theriamp': {
    types: ['Electric', 'Rock'],
    bs: { hp: 75, at: 125, df: 60, sa: 60, sd: 80, sp: 100 },
    weightkg: 491,
    abilities: { 0: 'Galvanize' },
    origin: "Uranium"
    },
'Titanice': {
    types: ['Ice'],
    bs: { hp: 90, at: 90, df: 75, sa: 65, sd: 55, sp: 90 },
    weightkg: 1050.5,
    abilities: { 0: 'Forewarn' },
    origin: "Uranium"
    },
'Frynai': {
    types: ['Water', 'Steel'],
    bs: { hp: 55, at: 68, df: 32, sa: 40, sd: 37, sp: 79 },
    weightkg: 3.6,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Uranium"
    
},
'Saidine': {
    types: ['Water', 'Steel'],
    bs: { hp: 75, at: 89, df: 55, sa: 44, sd: 42, sp: 91 },
    weightkg: 14.3,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Uranium"
    
},
'Daikatuna': {
    types: ['Water', 'Steel'],
    bs: { hp: 90, at: 118, df: 75, sa: 53, sd: 50, sp: 110 },
    weightkg: 58.3,
    abilities: { 0: 'Swift Swim' },
    origin: "Uranium"
    },
'Selkid': {
    types: ['Water', 'Fairy'],
    bs: { hp: 58, at: 32, df: 51, sa: 66, sd: 73, sp: 61 },
    weightkg: 15.5,
    abilities: { 0: 'Cute Charm' },
    nfe: true,
    origin: "Uranium"
    
},
'Syrentide': {
    types: ['Water', 'Fairy'],
    bs: { hp: 98, at: 68, df: 108, sa: 88, sd: 108, sp: 88 },
    weightkg: 32.6,
    abilities: { 0: 'Cute Charm' },
    origin: "Uranium"
    },
'Syrentide-Mega': {
    types: ['Water', 'Fairy'],
    bs: { hp: 98, at: 68, df: 128, sa: 118, sd: 158, sp: 88 },
    weightkg: 44.8,
    abilities: { 0: 'Pixilate' },
    origin: "Uranium"
    },
'Miasmedic': {
    types: ['Fairy', 'Poison'],
    bs: { hp: 81, at: 102, df: 72, sa: 79, sd: 99, sp: 29 },
    weightkg: 15.5,
    abilities: { 0: 'Healer' },
    origin: "Uranium"
    },
'Jackdeary': {
    types: ['Fairy', 'Fighting'],
    bs: { hp: 60, at: 72, df: 42, sa: 44, sd: 40, sp: 70 },
    weightkg: 11.2,
    abilities: { 0: 'Magic Guard' },
    nfe: true,
    origin: "Uranium"
    
},
'Jackdeary-Mystery': {
    types: ['Fairy', 'Fighting'],
    bs: { hp: 60, at: 72, df: 42, sa: 44, sd: 40, sp: 70 },
    weightkg: 11.2,
    abilities: { 0: 'Pixilate' },
    nfe: true,
    origin: "Uranium"
    
},
'Winotinger': {
    types: ['Fairy', 'Fighting'],
    bs: { hp: 110, at: 80, df: 85, sa: 105, sd: 85, sp: 85 },
    weightkg: 31.5,
    abilities: { 0: 'Magic Guard' },
    origin: "Uranium"
    },
'Winotinger-Mystery': {
    types: ['Fairy', 'Fighting'],
    bs: { hp: 110, at: 80, df: 85, sa: 105, sd: 85, sp: 85 },
    weightkg: 31.5,
    abilities: { 0: 'Pixilate' },
    origin: "Uranium"
    },
'Duplicat': {
    types: ['Normal'],
    bs: { hp: 58, at: 58, df: 58, sa: 58, sd: 58, sp: 58 },
    weightkg: 7.2,
    abilities: { 0: 'Prankster' },
    origin: "Uranium"
    },
'Nucleon': {
    types: ['Nuclear'],
    bs: { hp: 70, at: 55, df: 85, sa: 115, sd: 115, sp: 90 },
    weightkg: 21.5,
    abilities: { 0: 'Atomizate' },
    origin: "Uranium"
    },
'Ratsy': {
    types: ['Dark'],
    bs: { hp: 50, at: 35, df: 40, sa: 45, sd: 40, sp: 50 },
    weightkg: 12.5,
    abilities: { 0: 'Insomnia' },
    nfe: true,
    origin: "Uranium"
    
},
'Raffiti': {
    types: ['Dark'],
    bs: { hp: 75, at: 80, df: 70, sa: 80, sd: 70, sp: 90 },
    weightkg: 81.1,
    abilities: { 0: 'Insomnia' },
    origin: "Uranium"
    },
'Gargryph': {
    types: ['Rock'],
    bs: { hp: 80, at: 80, df: 150, sa: 85, sd: 75, sp: 70 },
    weightkg: 230,
    abilities: { 0: 'Rebuild' },
    origin: "Uranium"
    },
'Masking': {
    types: ['Psychic'],
    bs: { hp: 45, at: 15, df: 60, sa: 85, sd: 55, sp: 75 },
    weightkg: 10.2,
    abilities: { 0: 'Illusion' },
    nfe: true,
    origin: "Uranium"
    
},
'Dramsama': {
    types: ['Psychic', 'Ghost'],
    bs: { hp: 85, at: 25, df: 70, sa: 105, sd: 65, sp: 95 },
    weightkg: 42.3,
    abilities: { 0: 'Illusion' },
    origin: "Uranium"
    },
'Dramsama-Mega': {
    types: ['Psychic', 'Ghost'],
    bs: { hp: 85, at: 35, df: 80, sa: 145, sd: 65, sp: 120 },
    weightkg: 50.3,
    abilities: { 0: 'Bad Dreams' },
    origin: "Uranium"
    },
'Antarki': {
    types: ['Ghost', 'Fire'],
    bs: { hp: 85, at: 45, df: 70, sa: 125, sd: 90, sp: 105 },
    weightkg: 42.3,
    abilities: { 0: 'Illuminate' },
    origin: "Uranium"
    },
'Chupacho': {
    types: ['Poison'],
    bs: { hp: 68, at: 77, df: 55, sa: 30, sd: 35, sp: 75 },
    weightkg: 25.6,
    abilities: { 0: 'Poison Point' },
    nfe: true,
    origin: "Uranium"
    
},
'Chupacho-Nuclear': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 68, at: 77, df: 55, sa: 30, sd: 35, sp: 75 },
    weightkg: 25.6,
    abilities: { 0: 'Poison Point' },
    nfe: true,
    origin: "Uranium"
    
},
'Luchabra': {
    types: ['Poison', 'Fighting'],
    bs: { hp: 110, at: 120, df: 85, sa: 60, sd: 85, sp: 75 },
    weightkg: 98.7,
    abilities: { 0: 'Poison Point' },
    origin: "Uranium"
    },
'Luchabra-Nuclear': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 110, at: 120, df: 85, sa: 60, sd: 85, sp: 75 },
    weightkg: 98.7,
    abilities: { 0: 'Poison Point' },
    origin: "Uranium"
    },
'Linkite': {
    types: ['Ghost'],
    bs: { hp: 35, at: 55, df: 25, sa: 20, sd: 50, sp: 30 },
    weightkg: 98.6,
    abilities: { 0: 'Shadow Tag' },
    nfe: true,
    origin: "Uranium"
    
},
'Chainite': {
    types: ['Ghost', 'Dark'],
    bs: { hp: 95, at: 130, df: 70, sa: 80, sd: 60, sp: 60 },
    weightkg: 98.6,
    abilities: { 0: 'Shadow Tag' },
    origin: "Uranium"
    },
'Pufluff': {
    types: ['Ice', 'Fairy'],
    bs: { hp: 60, at: 45, df: 45, sa: 60, sd: 50, sp: 52 },
    weightkg: 8.5,
    abilities: { 0: 'Snow Cloak' },
    nfe: true,
    origin: "Uranium"
    
},
'Alpico': {
    types: ['Ice', 'Fairy'],
    bs: { hp: 75, at: 60, df: 70, sa: 110, sd: 78, sp: 132 },
    weightkg: 45,
    abilities: { 0: 'Competitive' },
    origin: "Uranium"
    },
'Anderind': {
    types: ['Ice', 'Ground'],
    bs: { hp: 90, at: 127, df: 100, sa: 60, sd: 75, sp: 78 },
    weightkg: 55.8,
    abilities: { 0: 'Snow Warning' },
    origin: "Uranium"
    },
'Colarva': {
    types: ['Bug', 'Ice'],
    bs: { hp: 45, at: 43, df: 55, sa: 60, sd: 41, sp: 45 },
    weightkg: 28.8,
    abilities: { 0: 'Ice Body' },
    nfe: true,
    origin: "Uranium"
    
},
'Frosulo': {
    types: ['Bug', 'Ice'],
    bs: { hp: 55, at: 45, df: 85, sa: 90, sd: 35, sp: 67 },
    weightkg: 28.8,
    abilities: { 0: 'Ice Body' },
    nfe: true,
    origin: "Uranium"
    
},
'Frosthra': {
    types: ['Bug', 'Ice'],
    bs: { hp: 85, at: 55, df: 60, sa: 140, sd: 95, sp: 115 },
    weightkg: 46,
    abilities: { 0: 'Deep Freeze' },
    origin: "Uranium"
    },
'Fafurr': {
    types: ['Ice', 'Dragon'],
    bs: { hp: 90, at: 75, df: 45, sa: 60, sd: 70, sp: 60 },
    weightkg: 64.3,
    abilities: { 0: 'Thick Fat' },
    nfe: true,
    origin: "Uranium"
    
},
'Fafninter': {
    types: ['Ice', 'Dragon'],
    bs: { hp: 120, at: 110, df: 77, sa: 95, sd: 98, sp: 90 },
    weightkg: 187.7,
    abilities: { 0: 'Thick Fat' },
    origin: "Uranium"
    },
'Shrimputy': {
    types: ['Water', 'Fire'],
    bs: { hp: 43, at: 50, df: 65, sa: 80, sd: 35, sp: 35 },
    weightkg: 11.5,
    abilities: { 0: 'Sniper' },
    nfe: true,
    origin: "Uranium"
    
},
'Krilvolver': {
    types: ['Water', 'Fire'],
    bs: { hp: 73, at: 90, df: 85, sa: 120, sd: 45, sp: 85 },
    weightkg: 32.8,
    abilities: { 0: 'Sniper' },
    origin: "Uranium"
    },
'Lavent': {
    types: ['Fire', 'Dragon'],
    bs: { hp: 70, at: 80, df: 70, sa: 105, sd: 70, sp: 80 },
    weightkg: 120.4,
    abilities: { 0: 'Magma Armor' },
    origin: "Uranium"
    },
'Swabone': {
    types: ['Ghost', 'Fighting'],
    bs: { hp: 40, at: 85, df: 55, sa: 50, sd: 55, sp: 60 },
    weightkg: 14.9,
    abilities: { 0: 'Scrappy' },
    nfe: true,
    origin: "Uranium"
    
},
'Skelerogue': {
    types: ['Ghost', 'Fighting'],
    bs: { hp: 55, at: 105, df: 65, sa: 60, sd: 65, sp: 70 },
    weightkg: 60.9,
    abilities: { 0: 'Scrappy' },
    nfe: true,
    origin: "Uranium"
    
},
'Navighast': {
    types: ['Ghost', 'Fighting'],
    bs: { hp: 80, at: 115, df: 75, sa: 90, sd: 75, sp: 90 },
    weightkg: 88.9,
    abilities: { 0: 'Levitate' },
    origin: "Uranium"
    },
'Stenowatt': {
    types: ['Electric'],
    bs: { hp: 75, at: 85, df: 60, sa: 75, sd: 80, sp: 110 },
    weightkg: 67.9,
    abilities: { 0: 'Motor Drive' },
    origin: "Uranium"
    },
'Jungore': {
    types: ['Fighting', 'Rock'],
    bs: { hp: 100, at: 100, df: 50, sa: 50, sd: 50, sp: 40 },
    weightkg: 56.9,
    abilities: { 0: 'Battle Armor' },
    nfe: true,
    origin: "Uranium"
    
},
'Majungold': {
    types: ['Fighting', 'Rock'],
    bs: { hp: 125, at: 135, df: 75, sa: 70, sd: 75, sp: 60 },
    weightkg: 156.9,
    abilities: { 0: 'Battle Armor' },
    origin: "Uranium"
    },
'Hagoop': {
    types: ['Poison', 'Electric'],
    bs: { hp: 60, at: 45, df: 45, sa: 85, sd: 105, sp: 50 },
    weightkg: 39.9,
    abilities: { 0: 'Gooey' },
    nfe: true,
    origin: "Uranium"
    
},
'Hagoop-Nuclear': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 60, at: 45, df: 45, sa: 85, sd: 105, sp: 50 },
    weightkg: 39.9,
    abilities: { 0: 'Gooey' },
    nfe: true,
    origin: "Uranium"
    
},
'Haagross': {
    types: ['Poison', 'Electric'],
    bs: { hp: 80, at: 65, df: 65, sa: 105, sd: 125, sp: 70 },
    weightkg: 77.9,
    abilities: { 0: 'Gooey' },
    origin: "Uranium"
    },
'Haagross-Nuclear': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 80, at: 65, df: 65, sa: 105, sd: 125, sp: 70 },
    weightkg: 77.9,
    abilities: { 0: 'Gooey' },
    origin: "Uranium"
    },
'Xenomite': {
    types: ['Nuclear'],
    bs: { hp: 66, at: 44, df: 56, sa: 76, sd: 74, sp: 64 },
    weightkg: 35.9,
    abilities: { 0: 'Damp' },
    nfe: true,
    origin: "Uranium"
    
},
'Xenogen': {
    types: ['Nuclear'],
    bs: { hp: 76, at: 44, df: 76, sa: 91, sd: 89, sp: 74 },
    weightkg: 98.9,
    abilities: { 0: 'Damp' },
    nfe: true,
    origin: "Uranium"
    
},
'Xenoqueen': {
    types: ['Nuclear'],
    bs: { hp: 96, at: 44, df: 96, sa: 116, sd: 114, sp: 84 },
    weightkg: 470.9,
    abilities: { 0: 'Damp' },
    origin: "Uranium"
    },
'Hazma': {
    types: ['Nuclear'],
    bs: { hp: 106, at: 54, df: 88, sa: 66, sd: 92, sp: 44 },
    weightkg: 25.9,
    abilities: { 0: 'Lead Skin' },
    origin: "Uranium"
    },
'Geigeroach': {
    types: ['Bug', 'Nuclear'],
    bs: { hp: 66, at: 54, df: 104, sa: 92, sd: 66, sp: 88 },
    weightkg: 39.9,
    abilities: { 0: 'Lead Skin' },
    origin: "Uranium"
    },
'Minicorn': {
    types: ['Fairy', 'Normal'],
    bs: { hp: 50, at: 68, df: 52, sa: 52, sd: 50, sp: 88 },
    weightkg: 29.8,
    abilities: { 0: 'Cute Charm' },
    nfe: true,
    origin: "Uranium"
    
},
'Kiricorn': {
    types: ['Fairy', 'Normal'],
    bs: { hp: 75, at: 103, df: 72, sa: 67, sd: 75, sp: 118 },
    weightkg: 480.7,
    abilities: { 0: 'Cute Charm' },
    origin: "Uranium"
    },
'Kiricorn-Mega': {
    types: ['Fairy', 'Normal'],
    bs: { hp: 75, at: 123, df: 72, sa: 127, sd: 75, sp: 128 },
    weightkg: 480.7,
    abilities: { 0: 'Magic Bounce' },
    origin: "Uranium"
    },
'Oblivicorn': {
    types: ['Fairy', 'Dark'],
    bs: { hp: 75, at: 123, df: 67, sa: 67, sd: 65, sp: 113 },
    weightkg: 560.7,
    abilities: { 0: 'Mold Breaker' },
    origin: "Uranium"
    },
  'Oblivicorn-Mega': {
      types: ['Fairy', 'Dark'],
      bs: { hp: 75, at: 143, df: 102, sa: 67, sd: 100, sp: 123 },
      weightkg: 560.7,
      abilities: { 0: 'Sheer Force' },
      origin: "Uranium"
      },
'Luxi': {
    types: ['Dragon', 'Fairy'],
    bs: { hp: 60, at: 30, df: 40, sa: 50, sd: 60, sp: 40 },
    weightkg: 28.9,
    abilities: { 0: 'Super Luck' },
    nfe: true,
    origin: "Uranium"
    
},
'Luxor': {
    types: ['Dragon', 'Fairy'],
    bs: { hp: 70, at: 40, df: 50, sa: 60, sd: 70, sp: 50 },
    weightkg: 47.9,
    abilities: { 0: 'Super Luck' },
    nfe: true,
    origin: "Uranium"
    
},
'Luxelong': {
    types: ['Dragon', 'Fairy'],
    bs: { hp: 100, at: 70, df: 80, sa: 90, sd: 100, sp: 80 },
    weightkg: 140.9,
    abilities: { 0: 'Super Luck' },
    origin: "Uranium"
    },
'Praseopunk': {
    types: ['Psychic', 'Electric'],
    bs: { hp: 85, at: 80, df: 85, sa: 100, sd: 70, sp: 80 },
    weightkg: 43.6,
    abilities: { 0: 'Plus' },
    origin: "Uranium"
    },
'Neopunk': {
    types: ['Psychic', 'Electric'],
    bs: { hp: 65, at: 100, df: 65, sa: 120, sd: 60, sp: 90 },
    weightkg: 40.2,
    abilities: { 0: 'Minus' },
    origin: "Uranium"
    },
'Sheebit': {
    types: ['Ground'],
    bs: { hp: 62, at: 62, df: 48, sa: 38, sd: 42, sp: 48 },
    weightkg: 15.2,
    abilities: { 0: 'Intimidate' },
    nfe: true,
    origin: "Uranium"
    
},
'Terrabbit': {
    types: ['Ground'],
    bs: { hp: 76, at: 84, df: 70, sa: 60, sd: 66, sp: 64 },
    weightkg: 33.4,
    abilities: { 0: 'Intimidate' },
    nfe: true,
    origin: "Uranium"
    
},
'Laissure': {
    types: ['Ground'],
    bs: { hp: 105, at: 125, df: 100, sa: 80, sd: 95, sp: 95 },
    weightkg: 106.3,
    abilities: { 0: 'Intimidate' },
    origin: "Uranium"
    },
'Volchik': {
    types: ['Electric', 'Flying'],
    bs: { hp: 55, at: 40, df: 50, sa: 65, sd: 40, sp: 55 },
    weightkg: 9.5,
    abilities: { 0: 'Volt Absorb' },
    nfe: true,
    origin: "Uranium"
    
},
'Voltasu': {
    types: ['Electric', 'Flying'],
    bs: { hp: 60, at: 60, df: 65, sa: 90, sd: 55, sp: 90 },
    weightkg: 42,
    abilities: { 0: 'Volt Absorb' },
    nfe: true,
    origin: "Uranium"
    
},
'Yatagaryu': {
    types: ['Electric', 'Dragon'],
    bs: { hp: 90, at: 90, df: 85, sa: 130, sd: 85, sp: 120 },
    weightkg: 72.6,
    abilities: { 0: 'Stormbringer' },
    origin: "Uranium"
    },
'Devimp': {
    types: ['Fire', 'Dark'],
    bs: { hp: 65, at: 65, df: 55, sa: 30, sd: 45, sp: 40 },
    weightkg: 28.6,
    abilities: { 0: 'Defiant' },
    nfe: true,
    origin: "Uranium"
    
},
'Fallengel': {
    types: ['Fire', 'Dark'],
    bs: { hp: 85, at: 105, df: 75, sa: 35, sd: 55, sp: 55 },
    weightkg: 58.6,
    abilities: { 0: 'Defiant' },
    nfe: true,
    origin: "Uranium"
    
},
'Beliaddon': {
    types: ['Fire', 'Dark'],
    bs: { hp: 115, at: 145, df: 100, sa: 80, sd: 90, sp: 70 },
    weightkg: 178.6,
    abilities: { 0: 'Defiant' },
    origin: "Uranium"
    },
'Seikamater': {
    types: ['Bug', 'Normal'],
    bs: { hp: 155, at: 95, df: 90, sa: 105, sd: 90, sp: 65 },
    weightkg: 638.5,
    abilities: { 0: 'Elementalist' },
    origin: "Uranium"
    },
'Garlikid': {
    types: ['Grass', 'Fighting'],
    bs: { hp: 90, at: 115, df: 85, sa: 105, sd: 90, sp: 115 },
    weightkg: 33.4,
    abilities: { 0: 'Justified' },
    origin: "Uranium"
    },
'Baitatao': {
    types: ['Water', 'Fire'],
    bs: { hp: 90, at: 70, df: 110, sa: 135, sd: 100, sp: 105 },
    weightkg: 255.5,
    abilities: { 0: 'Pressure' },
    origin: "Uranium"
    },
'Leviathao': {
    types: ['Water', 'Ice'],
    bs: { hp: 125, at: 100, df: 115, sa: 85, sd: 100, sp: 85 },
    weightkg: 150.6,
    abilities: { 0: 'Pressure' },
    origin: "Uranium"
    },
'Krakanao': {
    types: ['Water', 'Dark'],
    bs: { hp: 90, at: 145, df: 90, sa: 70, sd: 120, sp: 95 },
    weightkg: 88.8,
    abilities: { 0: 'Pressure' },
    origin: "Uranium"
    },
'Lanthan': {
    types: ['Ground', 'Steel'],
    bs: { hp: 110, at: 106, df: 130, sa: 70, sd: 109, sp: 77 },
    weightkg: 1430,
    abilities: { 0: 'Sheer Force' },
    origin: "Uranium"
    },
'Actan': {
    types: ['Dark', 'Steel'],
    bs: { hp: 96, at: 144, df: 96, sa: 73, sd: 94, sp: 97 },
    weightkg: 1270,
    abilities: { 0: 'Intimidate' },
    origin: "Uranium"
    },
'Actan-Nuclear': {
    types: ['Nuclear', 'Steel'],
    bs: { hp: 96, at: 144, df: 96, sa: 73, sd: 94, sp: 97 },
    weightkg: 1270,
    abilities: { 0: 'Intimidate' },
    origin: "Uranium"
    },
'Urayne': {
    types: ['Nuclear'],
    bs: { hp: 82, at: 120, df: 86, sa: 134, sd: 84, sp: 102 },
    weightkg: 240,
    abilities: { 0: 'Geiger Sense' },
    origin: "Uranium"
    },
'Urayne-Beta': {
    types: ['Nuclear'],
    bs: { hp: 102, at: 130, df: 96, sa: 144, sd: 94, sp: 112 },
    weightkg: 240,
    abilities: { 0: 'Geiger Sense' },
    origin: "Uranium"
    },
'Urayne-Gamma': {
    types: ['Nuclear'],
    bs: { hp: 122, at: 130, df: 116, sa: 154, sd: 104, sp: 132 },
    weightkg: 240,
    abilities: { 0: 'Chernobyl' },
    origin: "Uranium"
    },
'Aotius': {
    types: ['Flying', 'Fire'],
    bs: { hp: 110, at: 100, df: 110, sa: 160, sd: 100, sp: 120 },
    weightkg: 360,
    abilities: { 0: 'Pressure' },
    origin: "Uranium"
    },
'Mutios': {
    types: ['Ghost', 'Water'],
    bs: { hp: 110, at: 100, df: 120, sa: 110, sd: 160, sp: 100 },
    weightkg: 360,
    abilities: { 0: 'Pressure' },
    origin: "Uranium"
    },
'Zephy': {
    types: ['Electric', 'Ice'],
    bs: { hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100 },
    weightkg: 28,
    abilities: { 0: 'Levitate' },
    origin: "Uranium"
    },
'Magikarp-Nuclear': {
    types: ['Water', 'Nuclear'],
    bs: { hp: 20, at: 10, df: 55, sa: 15, sd: 20, sp: 80 },
    weightkg: 10,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Uranium"
    
},
'Gyarados-Nuclear': {
    types: ['Water', 'Nuclear'],
    bs: { hp: 95, at: 125, df: 79, sa: 60, sd: 100, sp: 81 },
    weightkg: 235,
    abilities: { 0: 'Intimidate' },
    origin: "Uranium"
    },
'Gyarados-Nuclear-Mega': {
    types: ['Water', 'Nuclear'],
    bs: { hp: 95, at: 155, df: 109, sa: 70, sd: 130, sp: 81 },
    weightkg: 305,
    abilities: { 0: 'Mold Breaker' },
    origin: "Uranium"
    },
'Ekans-Nuclear': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 35, at: 60, df: 44, sa: 40, sd: 54, sp: 55 },
    weightkg: 6.9,
    abilities: { 0: 'Intimidate' },
    nfe: true,
    origin: "Uranium"
    
},
'Arbok-Mega': {
    types: ['Poison', 'Dark'],
    bs: { hp: 60, at: 130, df: 100, sa: 65, sd: 95, sp: 90 },
    weightkg: 122.5,
    abilities: { 0: 'Petrify' },
    origin: "Uranium"
    },
'Arbok-Nuclear': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 60, at: 95, df: 69, sa: 65, sd: 79, sp: 80 },
    weightkg: 65,
    abilities: { 0: 'Intimidate' },
    origin: "Uranium"
    },
'Arbok-Nuclear-Mega': {
    types: ['Poison', 'Nuclear'],
    bs: { hp: 60, at: 130, df: 100, sa: 65, sd: 95, sp: 90 },
    weightkg: 122.5,
    abilities: { 0: 'Petrify' },
    origin: "Uranium"
    },
'Gligar-Nuclear': {
    types: ['Ground', 'Nuclear'],
    bs: { hp: 65, at: 75, df: 105, sa: 35, sd: 65, sp: 85 },
    weightkg: 64.8,
    abilities: { 0: 'Hyper Cutter' },
    nfe: true,
    origin: "Uranium"
    
},
'Gliscor-Nuclear': {
    types: ['Ground', 'Nuclear'],
    bs: { hp: 75, at: 95, df: 125, sa: 45, sd: 75, sp: 95 },
    weightkg: 42.5,
    abilities: { 0: 'Hyper Cutter' },
    origin: "Uranium"
    },
'Corsola-Nuclear': {
    types: ['Water', 'Nuclear'],
    bs: { hp: 65, at: 55, df: 95, sa: 65, sd: 95, sp: 35 },
    weightkg: 5,
    abilities: { 0: 'Hustle' },
    nfe: true,
    origin: "Uranium"
    
},
'Whimsicott-Mega': {
    types: ['Grass', 'Fairy'],
    bs: { hp: 60, at: 65, df: 115, sa: 120, sd: 105, sp: 115 },
    weightkg: 10.5,
    abilities: { 0: 'Regenerator' },
    origin: "Uranium"
    },
'Bulbasaur-Delta': {
    types: ['Fairy', 'Psychic'],
    bs: { hp: 45, at: 49, df: 49, sa: 65, sd: 65, sp: 45 },
    weightkg: 6.9,
    abilities: { 0: 'Psycho Call' },
    nfe: true,
    origin: "Insurgence"
},
'Ivysaur-Delta': {
    types: ['Fairy', 'Psychic'],
    bs: { hp: 60, at: 62, df: 63, sa: 80, sd: 80, sp: 60 },
    weightkg: 13,
    abilities: { 0: 'Psycho Call' },
    nfe: true,
    origin: "Insurgence"
},
'Venusaur-Delta': {
    types: ['Fairy', 'Psychic'],
    bs: { hp: 80, at: 82, df: 83, sa: 100, sd: 100, sp: 80 },
    weightkg: 100,
    abilities: { 0: 'Psycho Call' },
    origin: "Insurgence"
    },
'Venusaur-Delta-Mega': {
    types: ['Fairy', 'Psychic'],
    bs: { hp: 80, at: 100, df: 123, sa: 122, sd: 120, sp: 80 },
    weightkg: 155.5,
    abilities: { 0: 'Hubris' },
    origin: "Insurgence"
    },
'Charmander-Delta': {
    types: ['Ghost', 'Dragon'],
    bs: { hp: 39, at: 52, df: 43, sa: 60, sd: 50, sp: 65 },
    weightkg: 8.5,
    abilities: { 0: 'Spirit Call' },
    nfe: true,
    origin: "Insurgence"
},
'Charmeleon-Delta': {
    types: ['Ghost', 'Dragon'],
    bs: { hp: 58, at: 64, df: 58, sa: 80, sd: 65, sp: 80 },
    weightkg: 19,
    abilities: { 0: 'Spirit Call' },
    nfe: true,
    origin: "Insurgence"
},
'Charizard-Delta': {
    types: ['Ghost', 'Dragon'],
    bs: { hp: 78, at: 84, df: 78, sa: 109, sd: 85, sp: 100 },
    weightkg: 90.5,
    abilities: { 0: 'Spirit Call' },
    origin: "Insurgence"
    },
'Charizard-Delta-Mega': {
    types: ['Ghost', 'Dragon'],
    bs: { hp: 78, at: 104, df: 78, sa: 159, sd: 115, sp: 100 },
    weightkg: 100.5,
    abilities: { 0: 'Noctem' },
    origin: "Insurgence"
    },
'Squirtle-Delta': {
    types: ['Dark', 'Fighting'],
    bs: { hp: 44, at: 48, df: 65, sa: 50, sd: 64, sp: 43 },
    weightkg: 9,
    abilities: { 0: 'Shadow Call' },
    nfe: true,
    origin: "Insurgence"
},
'Wartortle-Delta': {
    types: ['Dark', 'Fighting'],
    bs: { hp: 59, at: 63, df: 80, sa: 65, sd: 80, sp: 58 },
    weightkg: 22.5,
    abilities: { 0: 'Shadow Call' },
    nfe: true,
    origin: "Insurgence"
},
'Blastoise-Delta': {
    types: ['Dark', 'Fighting'],
    bs: { hp: 79, at: 83, df: 100, sa: 85, sd: 105, sp: 78 },
    weightkg: 85.5,
    abilities: { 0: 'Shadow Call' },
    origin: "Insurgence"
    },
'Blastoise-Delta-Mega': {
    types: ['Dark', 'Fighting'],
    bs: { hp: 79, at: 103, df: 120, sa: 135, sd: 115, sp: 78 },
    weightkg: 101.1,
    abilities: { 0: 'Mega Launcher' },
    origin: "Insurgence"
    },
'Pidgey-Delta': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 40, at: 45, df: 40, sa: 35, sd: 35, sp: 56 },
    weightkg: 1.8,
    abilities: { 0: 'Intimidate' },
    nfe: true,
    origin: "Insurgence"
},
'Pidgeotto-Delta': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 63, at: 60, df: 55, sa: 50, sd: 50, sp: 71 },
    weightkg: 30,
    abilities: { 0: 'Intimidate' },
    nfe: true,
    origin: "Insurgence"
},
'Pidgeot-Delta': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 83, at: 80, df: 75, sa: 70, sd: 70, sp: 101 },
    weightkg: 39.5,
    abilities: { 0: 'Intimidate' },
    origin: "Insurgence"
    },
'Pidgeot-Delta-Mega': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 83, at: 80, df: 80, sa: 135, sd: 80, sp: 121 },
    weightkg: 50.5,
    abilities: { 0: 'Intimidate' },
    origin: "Insurgence"
    },
'Pikachu-Delta': {
    types: ['Flying', 'Fairy'],
    bs: { hp: 35, at: 55, df: 40, sa: 50, sd: 50, sp: 90 },
    weightkg: 6,
    abilities: { 0: 'Cute Charm' },
    nfe: true,
    origin: "Insurgence"
},
'Raichu-Delta': {
    types: ['Flying', 'Fairy'],
    bs: { hp: 60, at: 90, df: 55, sa: 90, sd: 80, sp: 110 },
    weightkg: 30,
    abilities: { 0: 'Cute Charm' },
    origin: "Insurgence"
    },
'Diglett-Delta': {
    types: ['Ice', 'Normal'],
    bs: { hp: 10, at: 55, df: 25, sa: 35, sd: 45, sp: 95 },
    weightkg: 0.8,
    abilities: { 0: 'Snow Cloak' },
    nfe: true,
    origin: "Insurgence"
},
'Dugtrio-Delta': {
    types: ['Ice', 'Normal'],
    bs: { hp: 35, at: 80, df: 50, sa: 50, sd: 70, sp: 120 },
    weightkg: 33.3,
    abilities: { 0: 'Snow Cloak' },
    origin: "Insurgence"
    },
'Growlithe-Delta': {
    types: ['Normal', 'Dragon'],
    bs: { hp: 55, at: 70, df: 45, sa: 70, sd: 50, sp: 60 },
    weightkg: 19,
    abilities: { 0: 'Inner Focus' },
    nfe: true,
    origin: "Insurgence"
},
'Arcanine-Delta': {
    types: ['Normal', 'Dragon'],
    bs: { hp: 90, at: 110, df: 80, sa: 100, sd: 80, sp: 95 },
    weightkg: 155,
    abilities: { 0: 'Inner Focus' },
    origin: "Insurgence"
    },
'Tentacool-Delta': {
    types: ['Grass', 'Poison'],
    bs: { hp: 40, at: 40, df: 35, sa: 50, sd: 100, sp: 70 },
    weightkg: 45.5,
    abilities: { 0: 'Storm Drain' },
    nfe: true,
    origin: "Insurgence"
},
'Tentacruel-Delta': {
    types: ['Grass', 'Poison'],
    bs: { hp: 80, at: 70, df: 65, sa: 80, sd: 120, sp: 100 },
    weightkg: 55,
    abilities: { 0: 'Storm Drain' },
    origin: "Insurgence"
    },
'Geodude-Delta': {
    types: ['Psychic', 'Rock'],
    bs: { hp: 40, at: 80, df: 100, sa: 30, sd: 30, sp: 20 },
    weightkg: 20,
    abilities: { 0: 'Regenerator' },
    nfe: true,
    origin: "Insurgence"
},
'Graveler-Delta': {
    types: ['Psychic', 'Rock'],
    bs: { hp: 55, at: 95, df: 115, sa: 45, sd: 45, sp: 35 },
    weightkg: 105,
    abilities: { 0: 'Regenerator' },
    nfe: true,
    origin: "Insurgence"
},
'Golem-Delta': {
    types: ['Psychic', 'Rock'],
    bs: { hp: 80, at: 120, df: 130, sa: 55, sd: 65, sp: 45 },
    weightkg: 300,
    abilities: { 0: 'Regenerator' },
    origin: "Insurgence"
    },
'Doduo-Delta': {
    types: ['Psychic'],
    bs: { hp: 35, at: 85, df: 45, sa: 35, sd: 35, sp: 75 },
    weightkg: 39.2,
    abilities: { 0: 'Compound Eyes' },
    nfe: true,
    origin: "Insurgence"
},
'Dodrio-Delta': {
    types: ['Psychic'],
    bs: { hp: 60, at: 110, df: 70, sa: 60, sd: 60, sp: 110 },
    weightkg: 85.2,
    abilities: { 0: 'Compound Eyes' },
    origin: "Insurgence"
    },
'Grimer-Delta': {
    types: ['Ground'],
    bs: { hp: 80, at: 80, df: 50, sa: 40, sd: 50, sp: 25 },
    weightkg: 30,
    abilities: { 0: 'Sap Sipper' },
    nfe: true,
    origin: "Insurgence"
},
'Muk-Delta': {
    types: ['Ground'],
    bs: { hp: 105, at: 105, df: 75, sa: 65, sd: 100, sp: 50 },
    weightkg: 30,
    abilities: { 0: 'Sap Sipper' },
    origin: "Insurgence"
    },
'Koffing-Delta': {
    types: ['Electric', 'Flying'],
    bs: { hp: 40, at: 65, df: 95, sa: 60, sd: 45, sp: 35 },
    weightkg: 1,
    abilities: { 0: 'Cloud Nine' },
    nfe: true,
    origin: "Insurgence"
},
'Weezing-Delta': {
    types: ['Electric', 'Flying'],
    bs: { hp: 65, at: 90, df: 120, sa: 85, sd: 70, sp: 60 },
    weightkg: 9.5,
    abilities: { 0: 'Cloud Nine' },
    origin: "Insurgence"
    },
'Tangela-Delta': {
    types: ['Ground'],
    bs: { hp: 65, at: 55, df: 115, sa: 100, sd: 40, sp: 60 },
    weightkg: 35,
    abilities: { 0: 'Dry Skin' },
    nfe: true,
    origin: "Insurgence"
},
'Scyther-Delta': {
    types: ['Ice', 'Fighting'],
    bs: { hp: 70, at: 110, df: 80, sa: 55, sd: 80, sp: 105 },
    weightkg: 56,
    abilities: { 0: 'Hustle' },
    nfe: true,
    origin: "Insurgence"
},
'Electabuzz-Delta': {
    types: ['Rock'],
    bs: { hp: 65, at: 83, df: 57, sa: 95, sd: 85, sp: 105 },
    weightkg: 30,
    abilities: { 0: 'Inner Focus' },
    nfe: true,
    origin: "Insurgence"
},
'Magmar-Delta': {
    types: ['Water'],
    bs: { hp: 65, at: 95, df: 57, sa: 100, sd: 85, sp: 93 },
    weightkg: 44.5,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Insurgence"
},
'Ditto-Delta': {
    types: ['Water'],
    bs: { hp: 48, at: 48, df: 48, sa: 48, sd: 48, sp: 48 },
    weightkg: 4,
    abilities: { 0: 'Protean' },
    origin: "Insurgence"
    },
'Kabuto-Delta': {
    types: ['Bug', 'Dark'],
    bs: { hp: 30, at: 80, df: 90, sa: 55, sd: 45, sp: 55 },
    weightkg: 11.5,
    abilities: { 0: 'Swarm' },
    nfe: true,
    origin: "Insurgence"
},
'Kabutops-Delta': {
    types: ['Bug', 'Dark'],
    bs: { hp: 60, at: 115, df: 105, sa: 65, sd: 70, sp: 80 },
    weightkg: 40.5,
    abilities: { 0: 'Swarm' },
    origin: "Insurgence"
    },
'Snorlax-Delta': {
    types: ['Grass'],
    bs: { hp: 160, at: 110, df: 65, sa: 65, sd: 110, sp: 30 },
    weightkg: 460,
    abilities: { 0: 'Overcoat' },
    origin: "Insurgence"
    },
'Dratini-Delta': {
    types: ['Electric', 'Water'],
    bs: { hp: 41, at: 64, df: 45, sa: 50, sd: 50, sp: 50 },
    weightkg: 3.3,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Insurgence"
},
'Dragonair-Delta': {
    types: ['Electric', 'Water'],
    bs: { hp: 61, at: 84, df: 65, sa: 70, sd: 70, sp: 70 },
    weightkg: 16.5,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Insurgence"
},
'Dragonite-Delta': {
    types: ['Electric', 'Water'],
    bs: { hp: 91, at: 134, df: 95, sa: 100, sd: 100, sp: 80 },
    weightkg: 210,
    abilities: { 0: 'Swift Swim' },
    origin: "Insurgence"
    },
'Cyndaquil-Delta': {
    types: ['Electric'],
    bs: { hp: 39, at: 52, df: 43, sa: 60, sd: 50, sp: 65 },
    weightkg: 7.9,
    abilities: { 0: 'Static' },
    nfe: true,
    origin: "Insurgence"
},
'Quilava-Delta': {
    types: ['Electric', 'Steel'],
    bs: { hp: 58, at: 64, df: 58, sa: 80, sd: 65, sp: 80 },
    weightkg: 28.5,
    abilities: { 0: 'Static' },
    nfe: true,
    origin: "Insurgence"
},
'Typhlosion-Delta': {
    types: ['Electric', 'Steel'],
    bs: { hp: 78, at: 84, df: 78, sa: 109, sd: 85, sp: 100 },
    weightkg: 159,
    abilities: { 0: 'Motor Drive' },
    origin: "Insurgence"
    },
'Typhlosion-Delta-Mega': {
    types: ['Electric', 'Steel'],
    bs: { hp: 78, at: 89, df: 88, sa: 159, sd: 110, sp: 110 },
    weightkg: 159,
    abilities: { 0: 'Supercell' },
    origin: "Insurgence"
    },
'Typhlosion-Delta-Mega-Active': {
    types: ['Electric', 'Steel'],
    bs: { hp: 78, at: 89, df: 88, sa: 159, sd: 110, sp: 110 },
    weightkg: 159,
    abilities: { 0: 'Supercell' },
    origin: "Insurgence"
    },
'Hoothoot-Delta': {
    types: ['Ice', 'Flying'],
    bs: { hp: 60, at: 30, df: 30, sa: 36, sd: 56, sp: 50 },
    weightkg: 21.2,
    abilities: { 0: 'Snow Cloak' },
    nfe: true,
    origin: "Insurgence"
},
'Noctowl-Delta': {
    types: ['Ice', 'Flying'],
    bs: { hp: 100, at: 50, df: 50, sa: 86, sd: 96, sp: 70 },
    weightkg: 40.8,
    abilities: { 0: 'No Guard' },
    origin: "Insurgence"
    },
'Chinchou-Delta': {
    types: ['Ghost', 'Fire'],
    bs: { hp: 75, at: 38, df: 38, sa: 56, sd: 56, sp: 67 },
    weightkg: 12,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Insurgence"
},
'Lanturn-Delta': {
    types: ['Ghost', 'Fire'],
    bs: { hp: 125, at: 58, df: 58, sa: 76, sd: 76, sp: 67 },
    weightkg: 22.5,
    abilities: { 0: 'Flash Fire' },
    origin: "Insurgence"
    },
'Pichu-Delta': {
    types: ['Flying', 'Fairy'],
    bs: { hp: 20, at: 40, df: 15, sa: 35, sd: 35, sp: 60 },
    weightkg: 2,
    abilities: { 0: 'Cute Charm' },
    nfe: true,
    origin: "Insurgence"
},
'Aipom-Delta': {
    types: ['Ghost', 'Normal'],
    bs: { hp: 55, at: 70, df: 55, sa: 40, sd: 55, sp: 85 },
    weightkg: 11.5,
    abilities: { 0: 'Cursed Body' },
    nfe: true,
    origin: "Insurgence"
},
'Sunkern-Delta': {
    types: ['Fire', 'Poison'],
    bs: { hp: 30, at: 30, df: 30, sa: 30, sd: 30, sp: 30 },
    weightkg: 1.8,
    abilities: { 0: 'Flame Body' },
    nfe: true,
    origin: "Insurgence"
},
'Sunflora-Delta': {
    types: ['Fire', 'Poison'],
    bs: { hp: 75, at: 75, df: 55, sa: 105, sd: 85, sp: 30 },
    weightkg: 8.5,
    abilities: { 0: 'Flame Body' },
    origin: "Insurgence"
    },
'Sunflora-Delta-Mega': {
    types: ['Fire', 'Poison'],
    bs: { hp: 75, at: 85, df: 80, sa: 135, sd: 105, sp: 45 },
    weightkg: 8.5,
    abilities: { 0: 'Chlorofury' },
    origin: "Insurgence"
    },
'Yanma-Delta': {
    types: ['Grass', 'Flying'],
    bs: { hp: 65, at: 65, df: 45, sa: 75, sd: 45, sp: 95 },
    weightkg: 38,
    abilities: { 0: 'Adaptability' },
    nfe: true,
    origin: "Insurgence"
},
'Wooper-Delta': {
    types: ['Grass', 'Fire'],
    bs: { hp: 55, at: 45, df: 45, sa: 25, sd: 25, sp: 15 },
    weightkg: 8.5,
    abilities: { 0: 'Pickup' },
    nfe: true,
    origin: "Insurgence"
},
'Quagsire-Delta': {
    types: ['Grass', 'Fire'],
    bs: { hp: 95, at: 85, df: 85, sa: 65, sd: 65, sp: 35 },
    weightkg: 75,
    abilities: { 0: 'Pickup' },
    origin: "Insurgence"
    },
'Misdreavus-Delta': {
    types: ['Ice', 'Fairy'],
    bs: { hp: 60, at: 60, df: 60, sa: 85, sd: 85, sp: 85 },
    weightkg: 1,
    abilities: { 0: 'Magic Guard' },
    nfe: true,
    origin: "Insurgence"
},
'Girafarig-Delta': {
    types: ['Steel', 'Poison'],
    bs: { hp: 70, at: 80, df: 65, sa: 90, sd: 65, sp: 85 },
    weightkg: 41.5,
    abilities: { 0: 'Anger Point' },
    origin: "Insurgence"
    },
'Girafarig-Delta-Mega': {
    types: ['Steel', 'Poison'],
    bs: { hp: 70, at: 80, df: 95, sa: 130, sd: 95, sp: 85 },
    weightkg: 41.5,
    abilities: { 0: 'Intimidate' },
    origin: "Insurgence"
    },
'Dunsparce-Delta': {
    types: ['Water', 'Bug'],
    bs: { hp: 100, at: 70, df: 70, sa: 65, sd: 65, sp: 45 },
    weightkg: 14,
    abilities: { 0: 'Hyper Cutter' },
    nfe: true,
    origin: "Insurgence"
},
'Scizor-Delta': {
    types: ['Ice', 'Fighting'],
    bs: { hp: 70, at: 130, df: 100, sa: 55, sd: 80, sp: 65 },
    weightkg: 118,
    abilities: { 0: 'Tough Claws' },
    origin: "Insurgence"
    },
'Scizor-Delta-Mega': {
    types: ['Ice', 'Fighting'],
    bs: { hp: 70, at: 150, df: 140, sa: 65, sd: 100, sp: 75 },
    weightkg: 125,
    abilities: { 0: 'Adaptability' },
    origin: "Insurgence"
    },
'Shuckle-Delta': {
    types: ['Fighting', 'Steel'],
    bs: { hp: 20, at: 10, df: 230, sa: 10, sd: 230, sp: 5 },
    weightkg: 20.5,
    abilities: { 0: 'Sturdy' },
    origin: "Insurgence"
    },
'Remoraid-Delta': {
    types: ['Fire'],
    bs: { hp: 35, at: 65, df: 35, sa: 65, sd: 35, sp: 65 },
    weightkg: 12,
    abilities: { 0: 'Heatproof' },
    nfe: true,
    origin: "Insurgence"
},
'Octillery-Delta': {
    types: ['Fire'],
    bs: { hp: 75, at: 105, df: 75, sa: 105, sd: 75, sp: 45 },
    weightkg: 28.5,
    abilities: { 0: 'Heatproof' },
    origin: "Insurgence"
    },
'Elekid-Delta': {
    types: ['Rock'],
    bs: { hp: 45, at: 63, df: 37, sa: 65, sd: 55, sp: 95 },
    weightkg: 23.5,
    abilities: { 0: 'Inner Focus' },
    nfe: true,
    origin: "Insurgence"
},
'Magby-Delta': {
    types: ['Water'],
    bs: { hp: 45, at: 75, df: 37, sa: 70, sd: 55, sp: 83 },
    weightkg: 21.4,
    abilities: { 0: 'Swift Swim' },
    nfe: true,
    origin: "Insurgence"
},
'Treecko-Delta': {
    types: ['Normal', 'Fighting'],
    bs: { hp: 40, at: 45, df: 35, sa: 65, sd: 55, sp: 70 },
    weightkg: 5,
    abilities: { 0: 'Inner Focus' },
    nfe: true,
    origin: "Insurgence"
},
'Grovyle-Delta': {
    types: ['Normal', 'Fighting'],
    bs: { hp: 50, at: 65, df: 45, sa: 85, sd: 65, sp: 95 },
    weightkg: 21.6,
    abilities: { 0: 'Inner Focus' },
    nfe: true,
    origin: "Insurgence"
},
'Sceptile-Delta': {
    types: ['Dragon', 'Fighting'],
    bs: { hp: 70, at: 85, df: 65, sa: 105, sd: 85, sp: 120 },
    weightkg: 52.2,
    abilities: { 0: 'Inner Focus' },
    origin: "Insurgence"
    },
'Torchic-Delta': {
    types: ['Psychic'],
    bs: { hp: 45, at: 60, df: 40, sa: 70, sd: 50, sp: 45 },
    weightkg: 2.5,
    abilities: { 0: 'Keen Eye' },
    nfe: true,
    origin: "Insurgence"
},
'Combusken-Delta': {
    types: ['Psychic'],
    bs: { hp: 60, at: 85, df: 60, sa: 85, sd: 60, sp: 55 },
    weightkg: 19.5,
    abilities: { 0: 'Keen Eye' },
    nfe: true,
    origin: "Insurgence"
},
'Blaziken-Delta': {
    types: ['Psychic', 'Flying'],
    bs: { hp: 80, at: 120, df: 70, sa: 110, sd: 70, sp: 80 },
    weightkg: 52,
    abilities: { 0: 'Keen Eye' },
    origin: "Insurgence"
    },
'Lotad-Delta': {
    types: ['Psychic', 'Water'],
    bs: { hp: 40, at: 30, df: 30, sa: 40, sd: 50, sp: 30 },
    weightkg: 2.6,
    abilities: { 0: 'Magic Bounce' },
    nfe: true,
    origin: "Insurgence"
},
'Lombre-Delta': {
    types: ['Psychic', 'Water'],
    bs: { hp: 60, at: 50, df: 50, sa: 60, sd: 70, sp: 50 },
    weightkg: 32.5,
    abilities: { 0: 'Magic Bounce' },
    nfe: true,
    origin: "Insurgence"
},
'Ludicolo-Delta': {
    types: ['Psychic', 'Water'],
    bs: { hp: 80, at: 70, df: 70, sa: 90, sd: 100, sp: 70 },
    weightkg: 55,
    abilities: { 0: 'Magic Bounce' },
    origin: "Insurgence"
    },
'Seedot-Delta': {
    types: ['Electric'],
    bs: { hp: 40, at: 40, df: 50, sa: 30, sd: 30, sp: 30 },
    weightkg: 4,
    abilities: { 0: 'Volt Absorb' },
    nfe: true,
    origin: "Insurgence"
},
'Nuzleaf-Delta': {
    types: ['Electric'],
    bs: { hp: 70, at: 70, df: 40, sa: 60, sd: 40, sp: 60 },
    weightkg: 28,
    abilities: { 0: 'Volt Absorb' },
    nfe: true,
    origin: "Insurgence"
},
'Shiftry-Delta': {
    types: ['Electric'],
    bs: { hp: 90, at: 100, df: 60, sa: 90, sd: 60, sp: 80 },
    weightkg: 59.6,
    abilities: { 0: 'Volt Absorb' },
    origin: "Insurgence"
    },
'Ralts-Delta': {
    types: ['Electric', 'Ice'],
    bs: { hp: 28, at: 25, df: 25, sa: 45, sd: 35, sp: 40 },
    weightkg: 6.6,
    abilities: { 0: 'Lightning Rod' },
    nfe: true,
    origin: "Insurgence"
},
'Kirlia-Delta': {
    types: ['Electric', 'Ice'],
    bs: { hp: 38, at: 35, df: 35, sa: 65, sd: 55, sp: 50 },
    weightkg: 20.2,
    abilities: { 0: 'Lightning Rod' },
    nfe: true,
    origin: "Insurgence"
},
'Gardevoir-Delta': {
    types: ['Electric', 'Ice'],
    bs: { hp: 68, at: 65, df: 65, sa: 125, sd: 115, sp: 80 },
    weightkg: 48.4,
    abilities: { 0: 'Lightning Rod' },
    origin: "Insurgence"
    },
'Gardevoir-Delta-Mega': {
    types: ['Electric', 'Ice'],
    bs: { hp: 68, at: 85, df: 65, sa: 165, sd: 135, sp: 100 },
    weightkg: 48.4,
    abilities: { 0: 'Lightning Rod' },
    origin: "Insurgence"
    },
'Sableye-Delta': {
    types: ['Fire', 'Rock'],
    bs: { hp: 50, at: 75, df: 75, sa: 65, sd: 65, sp: 50 },
    weightkg: 11,
    abilities: { 0: 'Solid Rock' },
    origin: "Insurgence"
    },
'Sableye-Delta-Mega': {
    types: ['Fire', 'Rock'],
    bs: { hp: 50, at: 85, df: 125, sa: 85, sd: 115, sp: 20 },
    weightkg: 161,
    abilities: { 0: 'Dry Skin' },
    origin: "Insurgence"
    },
'Mawile-Delta': {
    types: ['Grass', 'Dark'],
    bs: { hp: 50, at: 85, df: 85, sa: 55, sd: 55, sp: 50 },
    weightkg: 11.5,
    abilities: { 0: 'Serene Grace' },
    origin: "Insurgence"
    },
'Mawile-Delta-Mega': {
    types: ['Grass', 'Dark'],
    bs: { hp: 50, at: 105, df: 125, sa: 55, sd: 95, sp: 50 },
    weightkg: 23.5,
    abilities: { 0: 'Arena Trap' },
    origin: "Insurgence"
    },
'Aron-Delta': {
    types: ['Fire', 'Steel'],
    bs: { hp: 50, at: 70, df: 100, sa: 40, sd: 40, sp: 30 },
    weightkg: 60,
    abilities: { 0: 'Flame Body' },
    nfe: true,
    origin: "Insurgence"
},
'Lairon-Delta': {
    types: ['Fire', 'Steel'],
    bs: { hp: 60, at: 90, df: 140, sa: 50, sd: 50, sp: 40 },
    weightkg: 120,
    abilities: { 0: 'Flame Body' },
    nfe: true,
    origin: "Insurgence"
},
'Aggron-Delta': {
    types: ['Fire', 'Steel'],
    bs: { hp: 70, at: 110, df: 180, sa: 60, sd: 60, sp: 50 },
    weightkg: 360,
    abilities: { 0: 'Flame Body' },
    origin: "Insurgence"
    },
'Meditite-Delta': {
    types: ['Fairy'],
    bs: { hp: 30, at: 40, df: 55, sa: 40, sd: 55, sp: 60 },
    weightkg: 11.2,
    abilities: { 0: 'Sap Sipper' },
    nfe: true,
    origin: "Insurgence"
},
'Medicham-Delta': {
    types: ['Fairy', 'Ground'],
    bs: { hp: 60, at: 60, df: 75, sa: 60, sd: 75, sp: 80 },
    weightkg: 31.5,
    abilities: { 0: 'Sap Sipper' },
    origin: "Insurgence"
    },
'Medicham-Delta-Mega': {
    types: ['Fairy', 'Ground'],
    bs: { hp: 60, at: 100, df: 85, sa: 80, sd: 85, sp: 100 },
    weightkg: 31.5,
    abilities: { 0: 'Athenian' },
    origin: "Insurgence"
    },
'Plusle-Delta': {
    types: ['Fire', 'Fairy'],
    bs: { hp: 60, at: 50, df: 40, sa: 85, sd: 75, sp: 95 },
    weightkg: 4.2,
    abilities: { 0: 'Cute Charm' },
    origin: "Insurgence"
    },
'Minun-Delta': {
    types: ['Ice', 'Fairy'],
    bs: { hp: 60, at: 40, df: 50, sa: 75, sd: 85, sp: 95 },
    weightkg: 4.2,
    abilities: { 0: 'Cute Charm' },
    origin: "Insurgence"
    },
'Roselia-Delta': {
    types: ['Dark', 'Fairy'],
    bs: { hp: 50, at: 60, df: 45, sa: 100, sd: 80, sp: 65 },
    weightkg: 2,
    abilities: { 0: 'Shadow Dance' },
    nfe: true,
    origin: "Insurgence"
},
'Wailmer-Delta': {
    types: ['Ice', 'Flying'],
    bs: { hp: 130, at: 70, df: 35, sa: 70, sd: 35, sp: 60 },
    weightkg: 130,
    abilities: { 0: 'Wonder Skin' },
    nfe: true,
    origin: "Insurgence"
},
'Wailord-Delta': {
    types: ['Ice', 'Flying'],
    bs: { hp: 170, at: 90, df: 45, sa: 90, sd: 45, sp: 60 },
    weightkg: 398,
    abilities: { 0: 'Wonder Skin' },
    origin: "Insurgence"
    },
'Numel-Delta': {
    types: ['Poison'],
    bs: { hp: 60, at: 60, df: 40, sa: 65, sd: 45, sp: 35 },
    weightkg: 24,
    abilities: { 0: 'Venomous' },
    nfe: true,
    origin: "Insurgence"
},
'Camerupt-Delta': {
    types: ['Poison'],
    bs: { hp: 70, at: 100, df: 70, sa: 105, sd: 75, sp: 40 },
    weightkg: 220,
    abilities: { 0: 'Venomous' },
    origin: "Insurgence"
    },
'Camerupt-Delta-Mega': {
    types: ['Poison'],
    bs: { hp: 70, at: 120, df: 100, sa: 145, sd: 105, sp: 20 },
    weightkg: 320.5,
    abilities: { 0: 'Venomous' },
    origin: "Insurgence"
    },
'Feebas-Delta': {
    types: ['Ghost'],
    bs: { hp: 20, at: 15, df: 20, sa: 10, sd: 55, sp: 80 },
    weightkg: 7.4,
    abilities: { 0: 'Rattled' },
    nfe: true,
    origin: "Insurgence"
},
'Milotic-Delta': {
    types: ['Ghost'],
    bs: { hp: 95, at: 60, df: 79, sa: 100, sd: 125, sp: 81 },
    weightkg: 162,
    abilities: { 0: 'Regenerator' },
    origin: "Insurgence"
    },
'Milotic-Delta-Mega': {
    types: ['Ghost'],
    bs: { hp: 95, at: 70, df: 109, sa: 130, sd: 155, sp: 81 },
    weightkg: 162,
    abilities: { 0: 'Absolution' },
    origin: "Insurgence"
    },
'Castform-Sandy': {
    types: ['Rock', 'Ground'],
    bs: { hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70 },
    weightkg: 0.8,
    abilities: { 0: 'Forecast' },
    origin: "Insurgence"
    },
'Castform-Cloudy': {
    types: ['Dark'],
    bs: { hp: 70, at: 70, df: 70, sa: 70, sd: 70, sp: 70 },
    weightkg: 0.8,
    abilities: { 0: 'Forecast' },
    origin: "Insurgence"
    },
'Snorunt-Delta': {
    types: ['Fire'],
    bs: { hp: 50, at: 50, df: 50, sa: 50, sd: 50, sp: 50 },
    weightkg: 16.8,
    abilities: { 0: 'White Smoke' },
    nfe: true,
    origin: "Insurgence"
},
'Glalie-Delta': {
    types: ['Fire', 'Rock'],
    bs: { hp: 80, at: 80, df: 80, sa: 80, sd: 80, sp: 80 },
    weightkg: 256.5,
    abilities: { 0: 'Rock Head' },
    origin: "Insurgence"
    },
'Glalie-Delta-Mega': {
    types: ['Fire', 'Rock'],
    bs: { hp: 80, at: 120, df: 80, sa: 120, sd: 80, sp: 100 },
    weightkg: 350.2,
    abilities: { 0: 'Reckless' },
    origin: "Insurgence"
    },
'Clamperl-Delta': {
    types: ['Dragon'],
    bs: { hp: 35, at: 64, df: 85, sa: 74, sd: 55, sp: 32 },
    weightkg: 52.5,
    abilities: { 0: 'Pressure' },
    nfe: true,
    origin: "Insurgence"
},
'Huntail-Delta': {
    types: ['Dragon', 'Dark'],
    bs: { hp: 55, at: 104, df: 105, sa: 94, sd: 75, sp: 52 },
    weightkg: 27,
    abilities: { 0: 'Pressure' },
    origin: "Insurgence"
    },
'Gorebyss-Delta': {
    types: ['Dragon', 'Fairy'],
    bs: { hp: 55, at: 84, df: 105, sa: 114, sd: 75, sp: 52 },
    weightkg: 22.6,
    abilities: { 0: 'Pressure' },
    origin: "Insurgence"
    },
'Beldum-Delta-Spider': {
    types: ['Ground', 'Bug'],
    bs: { hp: 40, at: 55, df: 80, sa: 35, sd: 60, sp: 30 },
    weightkg: 47.5,
    abilities: { 0: 'Poison Touch' },
    nfe: true,
    origin: "Insurgence"
},
'Beldum-Delta-Ruin': {
    types: ['Grass', 'Rock'],
    bs: { hp: 40, at: 55, df: 80, sa: 35, sd: 60, sp: 30 },
    weightkg: 95.2,
    abilities: { 0: 'Sturdy' },
    nfe: true,
    origin: "Insurgence"
},
'Metang-Delta-Spider': {
    types: ['Ground', 'Bug'],
    bs: { hp: 60, at: 75, df: 100, sa: 55, sd: 80, sp: 50 },
    weightkg: 101.3,
    abilities: { 0: 'Poison Touch' },
    nfe: true,
    origin: "Insurgence"
},
'Metang-Delta-Ruin': {
    types: ['Grass', 'Rock'],
    bs: { hp: 60, at: 75, df: 100, sa: 55, sd: 80, sp: 50 },
    weightkg: 202.5,
    abilities: { 0: 'Sturdy' },
    nfe: true,
    origin: "Insurgence"
},
'Metagross-Delta-Spider': {
    types: ['Ground', 'Bug'],
    bs: { hp: 80, at: 135, df: 130, sa: 95, sd: 90, sp: 70 },
    weightkg: 224,
    abilities: { 0: 'Poison Touch' },
    origin: "Insurgence"
    },
'Metagross-Delta-Ruin': {
    types: ['Grass', 'Rock'],
    bs: { hp: 80, at: 135, df: 130, sa: 95, sd: 90, sp: 70 },
    weightkg: 550,
    abilities: { 0: 'Sturdy' },
    origin: "Insurgence"
    },
'Metagross-Delta-Spider-Mega': {
    types: ['Ground', 'Bug'],
    bs: { hp: 80, at: 145, df: 150, sa: 105, sd: 110, sp: 110 },
    weightkg: 942.9,
    abilities: { 0: 'Mold Breaker' },
    origin: "Insurgence"
    },
'Metagross-Delta-Ruin-Mega': {
    types: ['Grass', 'Rock'],
    bs: { hp: 80, at: 145, df: 150, sa: 105, sd: 110, sp: 110 },
    weightkg: 942.9,
    abilities: { 0: 'Rock Head' },
    origin: "Insurgence"
    },
'Metagross-Delta-Ruin-Crystal': {
    types: ['Grass', 'Crystal'],
    bs: { hp: 80, at: 180, df: 100, sa: 120, sd: 100, sp: 100 },
    weightkg: 942.9,
    abilities: { 0: 'Weak Armor' },
    origin: "Insurgence"
    },
'Regirock-Delta': {
    types: ['Ground'],
    bs: { hp: 80, at: 100, df: 200, sa: 50, sd: 100, sp: 50 },
    weightkg: 230,
    abilities: { 0: 'Sand Veil' },
    origin: "Insurgence"
    },
'Regice-Delta': {
    types: ['Water'],
    bs: { hp: 80, at: 50, df: 100, sa: 100, sd: 200, sp: 50 },
    weightkg: 175,
    abilities: { 0: 'Water Veil' },
    origin: "Insurgence"
    },
'Registeel-Delta': {
    types: ['Fire'],
    bs: { hp: 80, at: 75, df: 150, sa: 75, sd: 150, sp: 50 },
    weightkg: 205,
    abilities: { 0: 'Flame Body' },
    origin: "Insurgence"
    },
'Turtwig-Delta': {
    types: ['Water', 'Ground'],
    bs: { hp: 55, at: 68, df: 64, sa: 45, sd: 55, sp: 31 },
    weightkg: 10.2,
    abilities: { 0: 'Water Absorb' },
    nfe: true,
    origin: "Insurgence"
},
'Grotle-Delta': {
    types: ['Water', 'Ground'],
    bs: { hp: 75, at: 89, df: 85, sa: 55, sd: 65, sp: 36 },
    weightkg: 97,
    abilities: { 0: 'Water Absorb' },
    nfe: true,
    origin: "Insurgence"
},
'Torterra-Delta': {
    types: ['Water', 'Ground'],
    bs: { hp: 95, at: 109, df: 105, sa: 75, sd: 85, sp: 56 },
    weightkg: 310,
    abilities: { 0: 'Water Absorb' },
    origin: "Insurgence"
    },
'Shinx-Delta': {
    types: ['Steel', 'Poison'],
    bs: { hp: 45, at: 65, df: 34, sa: 40, sd: 34, sp: 45 },
    weightkg: 19,
    abilities: { 0: 'Vampiric' },
    nfe: true,
    origin: "Insurgence"
},
'Luxio-Delta': {
    types: ['Steel', 'Poison'],
    bs: { hp: 60, at: 85, df: 49, sa: 60, sd: 49, sp: 60 },
    weightkg: 30.5,
    abilities: { 0: 'Vampiric' },
    nfe: true,
    origin: "Insurgence"
},
'Luxray-Delta': {
    types: ['Steel', 'Poison'],
    bs: { hp: 80, at: 120, df: 79, sa: 95, sd: 79, sp: 70 },
    weightkg: 42,
    abilities: { 0: 'Vampiric' },
    origin: "Insurgence"
    },
'Budew-Delta': {
    types: ['Dark', 'Fairy'],
    bs: { hp: 40, at: 30, df: 35, sa: 50, sd: 70, sp: 55 },
    weightkg: 1.2,
    abilities: { 0: 'Shadow Dance' },
    nfe: true,
    origin: "Insurgence"
},
'Roserade-Delta': {
    types: ['Dark', 'Fairy'],
    bs: { hp: 60, at: 70, df: 65, sa: 125, sd: 105, sp: 90 },
    weightkg: 14.5,
    abilities: { 0: 'Shadow Dance' },
    origin: "Insurgence"
    },
'Combee-Delta': {
    types: ['Steel', 'Fire'],
    bs: { hp: 30, at: 30, df: 42, sa: 30, sd: 42, sp: 70 },
    weightkg: 11,
    abilities: { 0: 'Levitate' },
    nfe: true,
    origin: "Insurgence"
},
'Vespiquen-Delta': {
    types: ['Steel', 'Fire'],
    bs: { hp: 70, at: 80, df: 102, sa: 80, sd: 102, sp: 40 },
    weightkg: 38.5,
    abilities: { 0: 'Levitate' },
    origin: "Insurgence"
    },
'Ambipom-Delta': {
    types: ['Ghost', 'Normal'],
    bs: { hp: 75, at: 100, df: 66, sa: 60, sd: 66, sp: 115 },
    weightkg: 20.3,
    abilities: { 0: 'Cursed Body' },
    origin: "Insurgence"
    },
'Drifloon-Delta': {
    types: ['Fire', 'Flying'],
    bs: { hp: 90, at: 50, df: 34, sa: 60, sd: 44, sp: 70 },
    weightkg: 1.2,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Insurgence"
},
'Drifblim-Delta': {
    types: ['Fire', 'Flying'],
    bs: { hp: 150, at: 80, df: 44, sa: 90, sd: 54, sp: 80 },
    weightkg: 15,
    abilities: { 0: 'Flash Fire' },
    origin: "Insurgence"
    },
'Buneary-Delta': {
    types: ['Fighting'],
    bs: { hp: 55, at: 66, df: 44, sa: 44, sd: 56, sp: 85 },
    weightkg: 5.5,
    abilities: { 0: 'Pickpocket' },
    nfe: true,
    origin: "Insurgence"
},
'Lopunny-Delta': {
    types: ['Fighting'],
    bs: { hp: 65, at: 76, df: 84, sa: 54, sd: 96, sp: 105 },
    weightkg: 33.3,
    abilities: { 0: 'Unburden' },
    origin: "Insurgence"
    },
'Lopunny-Delta-Mega': {
    types: ['Fighting', 'Psychic'],
    bs: { hp: 65, at: 136, df: 94, sa: 54, sd: 96, sp: 135 },
    weightkg: 28.3,
    abilities: { 0: 'Infiltrator' },
    origin: "Insurgence"
    },
'Mismagius-Delta': {
    types: ['Ice', 'Fairy'],
    bs: { hp: 60, at: 60, df: 60, sa: 105, sd: 105, sp: 105 },
    weightkg: 4.4,
    abilities: { 0: 'Magic Guard' },
    origin: "Insurgence"
    },
'Munchlax-Delta': {
    types: ['Grass'],
    bs: { hp: 135, at: 85, df: 40, sa: 40, sd: 85, sp: 5 },
    weightkg: 105,
    abilities: { 0: 'Overcoat' },
    nfe: true,
    origin: "Insurgence"
},
'Riolu-Delta': {
    types: ['Dark'],
    bs: { hp: 40, at: 70, df: 40, sa: 35, sd: 40, sp: 60 },
    weightkg: 20.2,
    abilities: { 0: 'Justified' },
    nfe: true,
    origin: "Insurgence"
},
'Lucario-Delta': {
    types: ['Dark', 'Ground'],
    bs: { hp: 70, at: 110, df: 70, sa: 115, sd: 70, sp: 90 },
    weightkg: 54,
    abilities: { 0: 'Justified' },
    origin: "Insurgence"
    },
'Lucario-Delta-Mega': {
    types: ['Dark', 'Ground'],
    bs: { hp: 70, at: 145, df: 88, sa: 140, sd: 70, sp: 112 },
    weightkg: 57.5,
    abilities: { 0: 'Defiant' },
    origin: "Insurgence"
    },
'Croagunk-Delta': {
    types: ['Fire'],
    bs: { hp: 48, at: 61, df: 40, sa: 61, sd: 40, sp: 50 },
    weightkg: 23,
    abilities: { 0: 'Magma Armor' },
    nfe: true,
    origin: "Insurgence"
},
'Toxicroak-Delta': {
    types: ['Fire'],
    bs: { hp: 83, at: 106, df: 65, sa: 86, sd: 65, sp: 85 },
    weightkg: 44.4,
    abilities: { 0: 'Magma Armor' },
    origin: "Insurgence"
    },
'Tangrowth-Delta': {
    types: ['Ground', 'Fighting'],
    bs: { hp: 100, at: 100, df: 125, sa: 110, sd: 50, sp: 50 },
    weightkg: 128.6,
    abilities: { 0: 'Dry Skin' },
    origin: "Insurgence"
    },
'Electivire-Delta': {
    types: ['Rock', 'Dragon'],
    bs: { hp: 75, at: 123, df: 67, sa: 95, sd: 85, sp: 95 },
    weightkg: 138.6,
    abilities: { 0: 'Shadow Dance' },
    origin: "Insurgence"
    },
'Magmortar-Delta': {
    types: ['Water', 'Steel'],
    bs: { hp: 75, at: 95, df: 67, sa: 125, sd: 95, sp: 83 },
    weightkg: 68,
    abilities: { 0: 'Mega Launcher' },
    origin: "Insurgence"
    },
'Yanmega-Delta': {
    types: ['Grass', 'Flying'],
    bs: { hp: 86, at: 76, df: 86, sa: 116, sd: 56, sp: 95 },
    weightkg: 51.5,
    abilities: { 0: 'Adaptability' },
    origin: "Insurgence"
    },
'Gallade-Delta': {
    types: ['Electric', 'Ice'],
    bs: { hp: 68, at: 125, df: 65, sa: 65, sd: 115, sp: 80 },
    weightkg: 52,
    abilities: { 0: 'Volt Absorb' },
    origin: "Insurgence"
    },
'Gallade-Delta-Mega': {
    types: ['Electric', 'Ice'],
    bs: { hp: 68, at: 165, df: 95, sa: 65, sd: 115, sp: 110 },
    weightkg: 56.4,
    abilities: { 0: 'Volt Absorb' },
    origin: "Insurgence"
    },
'Froslass-Delta': {
    types: ['Fire'],
    bs: { hp: 70, at: 80, df: 70, sa: 80, sd: 70, sp: 110 },
    weightkg: 26.6,
    abilities: { 0: 'Competitive' },
    origin: "Insurgence"
    },
'Froslass-Delta-Mega': {
    types: ['Fire', 'Ghost'],
    bs: { hp: 70, at: 80, df: 85, sa: 120, sd: 105, sp: 120 },
    weightkg: 26.6,
    abilities: { 0: 'Magic Guard' },
    origin: "Insurgence"
    },
'Regigigas-Primal': {
    types: ['Normal', 'Ground'],
    bs: { hp: 110, at: 195, df: 140, sa: 95, sd: 100, sp: 100 },
    weightkg: 420,
    abilities: { 0: 'Unaware' },
    origin: "Insurgence"
    },
'Giratina-Primal': {
    types: ['Ghost', 'Dragon'],
    bs: { hp: 150, at: 135, df: 135, sa: 135, sd: 135, sp: 130 },
    weightkg: 420,
    abilities: { 0: 'Omnitype' },
    origin: "Insurgence"
    },
'Arceus-Primal': {
    types: ['Normal', 'Dragon'],
    bs: { hp: 120, at: 145, df: 135, sa: 145, sd: 135, sp: 140 },
    weightkg: 320,
    abilities: { 0: 'Ancient Presence' },
    origin: "Insurgence"
    },
'Snivy-Delta': {
    types: ['Water'],
    bs: { hp: 45, at: 45, df: 55, sa: 45, sd: 55, sp: 63 },
    weightkg: 8.1,
    abilities: { 0: 'Multiscale' },
    nfe: true,
    origin: "Insurgence"
},
'Servine-Delta': {
    types: ['Water'],
    bs: { hp: 60, at: 60, df: 75, sa: 60, sd: 75, sp: 83 },
    weightkg: 16,
    abilities: { 0: 'Multiscale' },
    nfe: true,
    origin: "Insurgence"
},
'Serperior-Delta': {
    types: ['Water', 'Dragon'],
    bs: { hp: 75, at: 75, df: 95, sa: 75, sd: 95, sp: 113 },
    weightkg: 63,
    abilities: { 0: 'Multiscale' },
    origin: "Insurgence"
    },
'Purrloin-Delta': {
    types: ['Ghost', 'Fairy'],
    bs: { hp: 41, at: 50, df: 37, sa: 50, sd: 37, sp: 66 },
    weightkg: 10.1,
    abilities: { 0: 'Illusion' },
    nfe: true,
    origin: "Insurgence"
},
'Liepard-Delta': {
    types: ['Ghost', 'Fairy'],
    bs: { hp: 64, at: 88, df: 50, sa: 88, sd: 50, sp: 106 },
    weightkg: 37.5,
    abilities: { 0: 'Illusion' },
    origin: "Insurgence"
    },
'Venipede-Delta': {
    types: ['Rock', 'Fire'],
    bs: { hp: 30, at: 45, df: 59, sa: 30, sd: 39, sp: 57 },
    weightkg: 5.3,
    abilities: { 0: 'Weak Armor' },
    nfe: true,
    origin: "Insurgence"
},
'Whirlipede-Delta': {
    types: ['Rock', 'Fire'],
    bs: { hp: 40, at: 55, df: 99, sa: 40, sd: 79, sp: 47 },
    weightkg: 58.5,
    abilities: { 0: 'Weak Armor' },
    nfe: true,
    origin: "Insurgence"
},
'Scolipede-Delta': {
    types: ['Rock', 'Fire'],
    bs: { hp: 60, at: 100, df: 89, sa: 55, sd: 69, sp: 112 },
    weightkg: 200.5,
    abilities: { 0: 'Weak Armor' },
    origin: "Insurgence"
    },
'Petilil-Delta-Fairy': {
    types: ['Fairy', 'Flying'],
    bs: { hp: 45, at: 35, df: 50, sa: 70, sd: 50, sp: 30 },
    weightkg: 6.6,
    abilities: { 0: 'Serene Grace' },
    nfe: true,
    origin: "Insurgence"
},
'Petilil-Delta-Water': {
    types: ['Water', 'Fire'],
    bs: { hp: 45, at: 35, df: 50, sa: 70, sd: 50, sp: 30 },
    weightkg: 6.6,
    abilities: { 0: 'Storm Drain' },
    nfe: true,
    origin: "Insurgence"
},
'Lilligant-Delta-Fairy': {
    types: ['Fairy', 'Flying'],
    bs: { hp: 70, at: 60, df: 75, sa: 110, sd: 75, sp: 90 },
    weightkg: 16.3,
    abilities: { 0: 'Serene Grace' },
    origin: "Insurgence"
    },
'Lilligant-Delta-Water': {
    types: ['Water', 'Fire'],
    bs: { hp: 70, at: 60, df: 75, sa: 110, sd: 75, sp: 90 },
    weightkg: 16.3,
    abilities: { 0: 'Storm Drain' },
    origin: "Insurgence"
    },
'Darumaka-Delta': {
    types: ['Dark', 'Ghost'],
    bs: { hp: 70, at: 90, df: 45, sa: 15, sd: 45, sp: 50 },
    weightkg: 37.5,
    abilities: { 0: 'Unnerve' },
    nfe: true,
    origin: "Insurgence"
},
'Darmanitan-Delta': {
    types: ['Dark', 'Ghost'],
    bs: { hp: 105, at: 140, df: 55, sa: 30, sd: 55, sp: 95 },
    weightkg: 92.9,
    abilities: { 0: 'Unnerve' },
    origin: "Insurgence"
    },
'Maractus-Delta': {
    types: ['Steel'],
    bs: { hp: 75, at: 86, df: 67, sa: 106, sd: 67, sp: 60 },
    weightkg: 28,
    abilities: { 0: 'Motor Drive' },
    origin: "Insurgence"
    },
'Dwebble-Delta-Berry': {
    types: ['Grass', 'Poison'],
    bs: { hp: 50, at: 65, df: 85, sa: 35, sd: 35, sp: 55 },
    weightkg: 14.5,
    abilities: { 0: 'Harvest' },
    nfe: true,
    origin: "Insurgence"
},
'Dwebble-Delta-Cake': {
    types: ['Fairy', 'Normal'],
    bs: { hp: 50, at: 65, df: 85, sa: 35, sd: 35, sp: 55 },
    weightkg: 14.5,
    abilities: { 0: 'Own Tempo' },
    nfe: true,
    origin: "Insurgence"
},
'Crustle-Delta-Berry': {
    types: ['Grass', 'Poison'],
    bs: { hp: 70, at: 95, df: 125, sa: 65, sd: 75, sp: 45 },
    weightkg: 150,
    abilities: { 0: 'Harvest' },
    origin: "Insurgence"
    },
'Crustle-Delta-Cake': {
    types: ['Fairy', 'Normal'],
    bs: { hp: 70, at: 95, df: 125, sa: 65, sd: 75, sp: 45 },
    weightkg: 100,
    abilities: { 0: 'Own Tempo' },
    origin: "Insurgence"
    },
'Scraggy-Delta': {
    types: ['Grass'],
    bs: { hp: 50, at: 75, df: 70, sa: 35, sd: 70, sp: 48 },
    weightkg: 11.8,
    abilities: { 0: 'Rough Skin' },
    nfe: true,
    origin: "Insurgence"
},
'Scrafty-Delta': {
    types: ['Grass'],
    bs: { hp: 65, at: 90, df: 115, sa: 45, sd: 115, sp: 58 },
    weightkg: 30,
    abilities: { 0: 'Rough Skin' },
    origin: "Insurgence"
    },
'Yamask-Delta': {
    types: ['Steel', 'Poison'],
    bs: { hp: 38, at: 30, df: 85, sa: 55, sd: 65, sp: 30 },
    weightkg: 1.5,
    abilities: { 0: 'Aftermath' },
    nfe: true,
    origin: "Insurgence"
},
'Cofagrigus-Delta': {
    types: ['Steel', 'Poison'],
    bs: { hp: 58, at: 50, df: 145, sa: 95, sd: 105, sp: 30 },
    weightkg: 76.5,
    abilities: { 0: 'Aftermath' },
    origin: "Insurgence"
    },
'Solosis-Delta': {
    types: ['Ghost', 'Rock'],
    bs: { hp: 45, at: 30, df: 40, sa: 105, sd: 50, sp: 20 },
    weightkg: 1,
    abilities: { 0: 'Levitate' },
    nfe: true,
    origin: "Insurgence"
},
'Duosion-Delta': {
    types: ['Ghost', 'Rock'],
    bs: { hp: 65, at: 40, df: 50, sa: 125, sd: 60, sp: 30 },
    weightkg: 8,
    abilities: { 0: 'Levitate' },
    nfe: true,
    origin: "Insurgence"
},
'Reuniclus-Delta': {
    types: ['Ghost', 'Rock'],
    bs: { hp: 110, at: 65, df: 75, sa: 125, sd: 85, sp: 30 },
    weightkg: 20.1,
    abilities: { 0: 'Levitate' },
    origin: "Insurgence"
    },
'Emolga-Delta': {
    types: ['Fire', 'Dark'],
    bs: { hp: 55, at: 75, df: 60, sa: 75, sd: 60, sp: 103 },
    weightkg: 5,
    abilities: { 0: 'Flash Fire' },
    origin: "Insurgence"
    },
'Emolga-Delta-Fired': {
    types: ['Fire', 'Dark'],
    bs: { hp: 55, at: 75, df: 60, sa: 75, sd: 60, sp: 103 },
    weightkg: 5,
    abilities: { 0: 'Blaze Boost' },
    origin: "Insurgence"
    },
'Karrablast-Delta': {
    types: ['Fairy'],
    bs: { hp: 50, at: 75, df: 45, sa: 40, sd: 45, sp: 60 },
    weightkg: 5.9,
    abilities: { 0: 'Heatproof' },
    nfe: true,
    origin: "Insurgence"
},
'Escavalier-Delta': {
    types: ['Fairy'],
    bs: { hp: 70, at: 135, df: 105, sa: 60, sd: 105, sp: 20 },
    weightkg: 33,
    abilities: { 0: 'Heatproof' },
    origin: "Insurgence"
    },
'Foongus-Delta': {
    types: ['Ghost', 'Dark'],
    bs: { hp: 69, at: 55, df: 45, sa: 55, sd: 55, sp: 15 },
    weightkg: 1,
    abilities: { 0: 'Prankster' },
    nfe: true,
    origin: "Insurgence"
},
'Amoonguss-Delta': {
    types: ['Ghost', 'Dark'],
    bs: { hp: 114, at: 85, df: 70, sa: 85, sd: 80, sp: 30 },
    weightkg: 10.5,
    abilities: { 0: 'Prankster' },
    origin: "Insurgence"
    },
'Litwick-Delta': {
    types: ['Fairy', 'Fire'],
    bs: { hp: 50, at: 30, df: 55, sa: 65, sd: 55, sp: 20 },
    weightkg: 3.1,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Insurgence"
},
'Lampent-Delta': {
    types: ['Fairy', 'Fire'],
    bs: { hp: 60, at: 40, df: 60, sa: 95, sd: 60, sp: 55 },
    weightkg: 13,
    abilities: { 0: 'Flash Fire' },
    nfe: true,
    origin: "Insurgence"
},
'Chandelure-Delta': {
    types: ['Fairy', 'Fire'],
    bs: { hp: 60, at: 55, df: 90, sa: 145, sd: 90, sp: 80 },
    weightkg: 34.3,
    abilities: { 0: 'Flash Fire' },
    origin: "Insurgence"
    },
'Axew-Delta': {
    types: ['Water'],
    bs: { hp: 46, at: 87, df: 60, sa: 30, sd: 40, sp: 57 },
    weightkg: 18,
    abilities: { 0: 'Strong Jaw' },
    nfe: true,
    origin: "Insurgence"
},
'Fraxure-Delta': {
    types: ['Water'],
    bs: { hp: 66, at: 117, df: 70, sa: 40, sd: 50, sp: 67 },
    weightkg: 36,
    abilities: { 0: 'Strong Jaw' },
    nfe: true,
    origin: "Insurgence"
},
'Haxorus-Delta': {
    types: ['Water', 'Steel'],
    bs: { hp: 76, at: 147, df: 90, sa: 60, sd: 70, sp: 97 },
    weightkg: 105.5,
    abilities: { 0: 'Strong Jaw' },
    origin: "Insurgence"
    },
'Golett-Delta': {
    types: ['Fighting', 'Steel'],
    bs: { hp: 59, at: 74, df: 50, sa: 35, sd: 50, sp: 35 },
    weightkg: 92,
    abilities: { 0: 'Iron Fist' },
    nfe: true,
    origin: "Insurgence"
},
'Golurk-Delta': {
    types: ['Fighting', 'Steel'],
    bs: { hp: 89, at: 124, df: 80, sa: 55, sd: 80, sp: 55 },
    weightkg: 330,
    abilities: { 0: 'Iron Fist' },
    origin: "Insurgence"
    },
'Pawniard-Delta': {
    types: ['Flying', 'Fighting'],
    bs: { hp: 45, at: 85, df: 70, sa: 40, sd: 40, sp: 60 },
    weightkg: 10.2,
    abilities: { 0: 'Defiant' },
    nfe: true,
    origin: "Insurgence"
},
'Bisharp-Delta': {
    types: ['Flying', 'Fighting'],
    bs: { hp: 65, at: 125, df: 100, sa: 60, sd: 70, sp: 70 },
    weightkg: 70,
    abilities: { 0: 'Defiant' },
    nfe: true,
    origin: "Insurgence"
},
'Bisharp-Delta-Mega': {
    types: ['Flying', 'Fighting'],
    bs: { hp: 65, at: 145, df: 130, sa: 60, sd: 85, sp: 105 },
    weightkg: 70,
    abilities: { 0: 'Technician' },
    origin: "Insurgence"
    },
'Heatmor-Delta': {
    types: ['Poison', 'Steel'],
    bs: { hp: 85, at: 97, df: 66, sa: 105, sd: 66, sp: 65 },
    weightkg: 116,
    abilities: { 0: 'Liquid Ooze' },
    origin: "Insurgence"
    },
'Deino-Delta': {
    types: ['Ground', 'Poison'],
    bs: { hp: 52, at: 65, df: 50, sa: 45, sd: 50, sp: 38 },
    weightkg: 17.3,
    abilities: { 0: 'Venomous' },
    nfe: true,
    origin: "Insurgence"
},
'Zweilous-Delta': {
    types: ['Ground', 'Poison'],
    bs: { hp: 72, at: 85, df: 70, sa: 65, sd: 70, sp: 58 },
    weightkg: 50,
    abilities: { 0: 'Venomous' },
    nfe: true,
    origin: "Insurgence"
},
'Hydreigon-Delta': {
    types: ['Ground', 'Poison'],
    bs: { hp: 92, at: 105, df: 90, sa: 125, sd: 90, sp: 98 },
    weightkg: 160,
    abilities: { 0: 'Intoxicate' },
    origin: "Insurgence"
    },
'Larvesta-Delta': {
    types: ['Dark', 'Poison'],
    bs: { hp: 55, at: 85, df: 55, sa: 50, sd: 55, sp: 60 },
    weightkg: 28.8,
    abilities: { 0: 'Defiant' },
    nfe: true,
    origin: "Insurgence"
},
'Volcarona-Delta': {
    types: ['Dark', 'Poison'],
    bs: { hp: 85, at: 60, df: 65, sa: 135, sd: 105, sp: 100 },
    weightkg: 46,
    abilities: { 0: 'Levitate' },
    origin: "Insurgence"
    },
'Volcarona-Delta-Armor': {
    types: ['Dark', 'Poison'],
    bs: { hp: 85, at: 60, df: 85, sa: 135, sd: 137, sp: 100 },
    weightkg: 46,
    abilities: { 0: 'Levitate' },
    origin: "Insurgence"
    },
'Meloetta-Delta': {
    types: ['Dark', 'Fairy'],
    bs: { hp: 100, at: 128, df: 90, sa: 77, sd: 77, sp: 128 },
    weightkg: 6.5,
    abilities: { 0: 'Filter' },
    origin: "Insurgence"
    },
'Meloetta-Delta-Magician': {
    types: ['Dark', 'Psychic'],
    bs: { hp: 100, at: 77, df: 77, sa: 128, sd: 128, sp: 90 },
    weightkg: 6.5,
    abilities: { 0: 'Filter' },
    origin: "Insurgence"
    },
'Froakie-Delta': {
    types: ['Grass'],
    bs: { hp: 41, at: 56, df: 40, sa: 62, sd: 44, sp: 71 },
    weightkg: 7,
    abilities: { 0: 'Steadfast' },
    nfe: true,
    origin: "Insurgence"
},
'Frogadier-Delta': {
    types: ['Grass'],
    bs: { hp: 54, at: 63, df: 52, sa: 83, sd: 56, sp: 97 },
    weightkg: 10.9,
    abilities: { 0: 'Steadfast' },
    nfe: true,
    origin: "Insurgence"
},
'Greninja-Delta': {
    types: ['Grass', 'Fire'],
    bs: { hp: 72, at: 95, df: 67, sa: 103, sd: 71, sp: 122 },
    weightkg: 40,
    abilities: { 0: 'Steadfast' },
    origin: "Insurgence"
    },
'Amaura-Delta': {
    types: ['Grass', 'Water'],
    bs: { hp: 77, at: 59, df: 50, sa: 67, sd: 63, sp: 46 },
    weightkg: 25.2,
    abilities: { 0: 'Friend Guard' },
    nfe: true,
    origin: "Insurgence"
},
'Aurorus-Delta': {
    types: ['Grass', 'Water'],
    bs: { hp: 123, at: 77, df: 72, sa: 99, sd: 92, sp: 58 },
    weightkg: 255,
    abilities: { 0: 'Friend Guard' },
    origin: "Insurgence"
    },
'Goomy-Delta': {
    types: ['Ground', 'Water'],
    bs: { hp: 45, at: 50, df: 35, sa: 55, sd: 75, sp: 40 },
    weightkg: 2.8,
    abilities: { 0: 'Overcoat' },
    nfe: true,
    origin: "Insurgence"
},
'Sliggoo-Delta': {
    types: ['Ground', 'Water'],
    bs: { hp: 68, at: 75, df: 53, sa: 83, sd: 113, sp: 60 },
    weightkg: 17.5,
    abilities: { 0: 'Overcoat' },
    nfe: true,
    origin: "Insurgence"
},
'Goodra-Delta': {
    types: ['Ground', 'Water'],
    bs: { hp: 90, at: 100, df: 70, sa: 110, sd: 150, sp: 80 },
    weightkg: 150.5,
    abilities: { 0: 'Overcoat' },
    origin: "Insurgence"
    },
'Phantump-Delta': {
    types: ['Fairy'],
    bs: { hp: 43, at: 70, df: 48, sa: 50, sd: 60, sp: 38 },
    weightkg: 7,
    abilities: { 0: 'Snow Warning' },
    nfe: true,
    origin: "Insurgence"
},
'Trevenant-Delta': {
    types: ['Fairy', 'Fighting'],
    bs: { hp: 85, at: 110, df: 76, sa: 65, sd: 82, sp: 56 },
    weightkg: 71,
    abilities: { 0: 'Snow Warning' },
    origin: "Insurgence"
    },
'Bergmite-Delta': {
    types: ['Rock'],
    bs: { hp: 55, at: 69, df: 85, sa: 32, sd: 35, sp: 28 },
    weightkg: 99.5,
    abilities: { 0: 'Solid Rock' },
    nfe: true,
    origin: "Insurgence"
},
'Avalugg-Delta': {
    types: ['Rock', 'Dragon'],
    bs: { hp: 95, at: 117, df: 184, sa: 44, sd: 46, sp: 28 },
    weightkg: 505,
    abilities: { 0: 'Solid Rock' },
    origin: "Insurgence"
    },
'Noibat-Delta': {
    types: ['Grass', 'Steel'],
    bs: { hp: 40, at: 30, df: 35, sa: 45, sd: 40, sp: 55 },
    weightkg: 8,
    abilities: { 0: 'Chlorophyll' },
    nfe: true,
    origin: "Insurgence"
},
'Noivern-Delta': {
    types: ['Grass', 'Steel'],
    bs: { hp: 85, at: 70, df: 80, sa: 97, sd: 80, sp: 123 },
    weightkg: 85,
    abilities: { 0: 'Chlorophyll' },
    origin: "Insurgence"
    },
'Hoopa-Delta': {
    types: ['Flying'],
    bs: { hp: 80, at: 110, df: 60, sa: 150, sd: 130, sp: 70 },
    weightkg: 9,
    abilities: { 0: 'Cloud Nine' },
    origin: "Insurgence"
    },
'Hoopa-Delta-Unleashed': {
    types: ['Flying', 'Fairy'],
    bs: { hp: 80, at: 160, df: 60, sa: 170, sd: 130, sp: 80 },
    weightkg: 490,
    abilities: { 0: 'Cloud Nine' },
    origin: "Insurgence"
    },
'Ufi': {
    types: ['Psychic', 'Electric'],
    bs: { hp: 100, at: 100, df: 100, sa: 100, sd: 100, sp: 100 },
    weightkg: 9,
    abilities: { 0: 'Event Horizon' },
    origin: "Insurgence"
    },
'Poliwrath-Mega': {
    types: ['Water', 'Fighting'],
    bs: { hp: 90, at: 155, df: 120, sa: 70, sd: 105, sp: 70 },
    weightkg: 54,
    abilities: { 0: 'No Guard' },
    origin: "Insurgence"
    },
'Marowak-Mega': {
    types: ['Ground', 'Ghost'],
    bs: { hp: 60, at: 135, df: 120, sa: 50, sd: 100, sp: 60 },
    weightkg: 45,
    abilities: { 0: 'Parental Bond' },
    origin: "Insurgence"
    },
'Eevee-Mega': {
    types: ['Normal'],
    bs: { hp: 83, at: 83, df: 83, sa: 83, sd: 83, sp: 83 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Eevee-Mega-V': {
    types: ['Water'],
    bs: { hp: 130, at: 65, df: 60, sa: 110, sd: 95, sp: 65 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Eevee-Mega-J': {
    types: ['Electric'],
    bs: { hp: 65, at: 65, df: 60, sa: 110, sd: 95, sp: 130 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Eevee-Mega-F': {
    types: ['Fire'],
    bs: { hp: 65, at: 130, df: 60, sa: 95, sd: 110, sp: 65 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Eevee-Mega-E': {
    types: ['Psychic'],
    bs: { hp: 65, at: 65, df: 60, sa: 130, sd: 95, sp: 110 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Eevee-Mega-U': {
    types: ['Dark'],
    bs: { hp: 95, at: 65, df: 110, sa: 60, sd: 130, sp: 65 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Eevee-Mega-L': {
    types: ['Grass'],
    bs: { hp: 65, at: 110, df: 130, sa: 60, sd: 65, sp: 95 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Eevee-Mega-G': {
    types: ['Ice'],
    bs: { hp: 65, at: 60, df: 110, sa: 130, sd: 95, sp: 65 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Eevee-Mega-S': {
    types: ['Fairy'],
    bs: { hp: 95, at: 65, df: 65, sa: 110, sd: 130, sp: 60 },
    weightkg: 6.5,
    abilities: { 0: 'Protean Maxima' },
    origin: "Insurgence"
    },
'Mewtwo-Shadow': {
    types: ['Psychic', 'Dark'],
    bs: { hp: 106, at: 110, df: 90, sa: 154, sd: 90, sp: 130 },
    weightkg: 122,
    abilities: { 0: 'Intimidate' },
    origin: "Insurgence"
    },
'Mewtwo-Shadow-Mega': {
    types: ['Psychic', 'Fighting'],
    bs: { hp: 106, at: 190, df: 100, sa: 154, sd: 100, sp: 130 },
    weightkg: 127,
    abilities: { 0: 'Shadow Synergy' },
    origin: "Insurgence"
    },
'Meganium-Mega': {
    types: ['Grass', 'Fairy'],
    bs: { hp: 80, at: 82, df: 140, sa: 83, sd: 140, sp: 100 },
    weightkg: 100.5,
    abilities: { 0: 'Magic Bounce' },
    origin: "Insurgence"
    },
'Typhlosion-Mega': {
    types: ['Fire'],
    bs: { hp: 78, at: 89, df: 88, sa: 159, sd: 110, sp: 110 },
    weightkg: 79.5,
    abilities: { 0: 'Hubris' },
    origin: "Insurgence"
    },
'Feraligatr-Mega': {
    types: ['Water'],
    bs: { hp: 85, at: 140, df: 110, sa: 89, sd: 103, sp: 103 },
    weightkg: 88.8,
    abilities: { 0: 'Tough Claws' },
    origin: "Insurgence"
    },
'Sudowoodo-Mega': {
    types: ['Rock', 'Grass'],
    bs: { hp: 70, at: 140, df: 145, sa: 40, sd: 95, sp: 20 },
    weightkg: 38,
    abilities: { 0: 'Analytic' },
    origin: "Insurgence"
    },
'Politoed-Mega': {
    types: ['Water'],
    bs: { hp: 90, at: 75, df: 95, sa: 120, sd: 140, sp: 80 },
    weightkg: 33.9,
    abilities: { 0: 'Drizzle' },
    origin: "Insurgence"
    },
'Sunflora-Mega-M': {
    types: ['Grass', 'Fire'],
    bs: { hp: 75, at: 85, df: 80, sa: 135, sd: 105, sp: 45 },
    weightkg: 8.5,
    abilities: { 0: 'Unleafed' },
    origin: "Insurgence"
    },
'Sunflora-Mega-F': {
    types: ['Grass'],
    bs: { hp: 75, at: 85, df: 80, sa: 135, sd: 105, sp: 45 },
    weightkg: 8.5,
    abilities: { 0: 'Unleafed' },
    origin: "Insurgence"
    },
'Girafarig-Mega': {
    types: ['Normal', 'Psychic'],
    bs: { hp: 70, at: 80, df: 95, sa: 130, sd: 95, sp: 85 },
    weightkg: 41.5,
    abilities: { 0: 'Spectral Jaws' },
    origin: "Insurgence"
    },
'Steelix-Mega-Fire': {
    types: ['Steel', 'Fire'],
    bs: { hp: 75, at: 135, df: 225, sa: 65, sd: 55, sp: 55 },
    weightkg: 740,
    abilities: { 0: 'Foundry' },
    origin: "Insurgence"
    },
'Magcargo-Mega': {
    types: ['Fire'],
    bs: { hp: 60, at: 70, df: 100, sa: 150, sd: 100, sp: 50 },
    weightkg: 55,
    abilities: { 0: 'Vaporization' },
    origin: "Insurgence"
    },
'Donphan-Mega': {
    types: ['Ground'],
    bs: { hp: 90, at: 150, df: 150, sa: 60, sd: 100, sp: 50 },
    weightkg: 120,
    abilities: { 0: 'Irrelephant' },
    origin: "Insurgence"
    },
'Miltank-Mega': {
    types: ['Normal'],
    bs: { hp: 95, at: 125, df: 145, sa: 40, sd: 115, sp: 70 },
    weightkg: 75.5,
    abilities: { 0: 'Pendulum' },
    origin: "Insurgence"
    },
'Shiftry-Mega': {
    types: ['Grass', 'Dark'],
    bs: { hp: 90, at: 135, df: 70, sa: 125, sd: 60, sp: 100 },
    weightkg: 59.6,
    abilities: { 0: 'Shadow Dance' },
    origin: "Insurgence"
    },
'Flygon-Mega': {
    types: ['Bug', 'Dragon'],
    bs: { hp: 80, at: 110, df: 90, sa: 140, sd: 80, sp: 120 },
    weightkg: 82,
    abilities: { 0: 'Amplifier' },
    origin: "Insurgence"
    },
'Cacturne-Mega': {
    types: ['Grass', 'Dark'],
    bs: { hp: 70, at: 145, df: 70, sa: 145, sd: 70, sp: 75 },
    weightkg: 77.4,
    abilities: { 0: 'Sand Rush' },
    origin: "Insurgence"
    },
'Crawdaunt-Mega': {
    types: ['Water', 'Dark'],
    bs: { hp: 63, at: 145, df: 95, sa: 100, sd: 85, sp: 80 },
    weightkg: 32.8,
    abilities: { 0: 'Adaptability' },
    origin: "Insurgence"
    },
'Milotic-Mega': {
    types: ['Water', 'Fairy'],
    bs: { hp: 95, at: 70, df: 109, sa: 130, sd: 155, sp: 81 },
    weightkg: 162,
    abilities: { 0: 'Prism Guard' },
    origin: "Insurgence"
    },
'Jirachi-Mega': {
    types: ['Steel', 'Psychic'],
    bs: { hp: 100, at: 100, df: 140, sa: 130, sd: 115, sp: 115 },
    weightkg: 1.1,
    abilities: { 0: 'Periodic Orbit' },
    origin: "Insurgence"
    },
'Chatot-Mega': {
    types: ['Normal', 'Flying'],
    bs: { hp: 76, at: 65, df: 55, sa: 147, sd: 52, sp: 116 },
    weightkg: 1.9,
    abilities: { 0: 'Amplifier' },
    origin: "Insurgence"
    },
'Spiritomb-Mega': {
    types: ['Ghost', 'Dark'],
    bs: { hp: 50, at: 142, df: 128, sa: 133, sd: 112, sp: 20 },
    weightkg: 108,
    abilities: { 0: 'Tough Claws' },
    origin: "Insurgence"
    },
'Froslass-Mega': {
    types: ['Ice', 'Ghost'],
    bs: { hp: 70, at: 80, df: 85, sa: 120, sd: 105, sp: 120 },
    weightkg: 26.6,
    abilities: { 0: 'Fur Coat' },
    origin: "Insurgence"
    },
'Zebstrika-Mega': {
    types: ['Electric', 'Fairy'],
    bs: { hp: 75, at: 100, df: 63, sa: 135, sd: 83, sp: 141 },
    weightkg: 79.5,
    abilities: { 0: 'Competitive' },
    origin: "Insurgence"
    },
'Zoroark-Mega': {
    types: ['Dark'],
    bs: { hp: 60, at: 130, df: 60, sa: 145, sd: 90, sp: 125 },
    weightkg: 81.1,
    abilities: { 0: 'Trace' },
    origin: "Insurgence"
    },
'Gothitelle-Mega': {
    types: ['Psychic', 'Dark'],
    bs: { hp: 70, at: 55, df: 125, sa: 125, sd: 150, sp: 65 },
    weightkg: 44,
    abilities: { 0: 'Ethereal Shroud' },
    origin: "Insurgence"
    },
'Reuniclus-Mega': {
    types: ['Psychic'],
    bs: { hp: 110, at: 80, df: 65, sa: 160, sd: 90, sp: 80 },
    weightkg: 20.1,
    abilities: { 0: 'Speed Swap' },
    origin: "Insurgence"
    },
'Cryogonal-Mega': {
    types: ['Ice'],
    bs: { hp: 80, at: 50, df: 65, sa: 115, sd: 150, sp: 135 },
    weightkg: 148,
    abilities: { 0: 'Sleet' },
    origin: "Insurgence"
    },
'Haxorus-Mega': {
    types: ['Dragon', 'Steel'],
    bs: { hp: 76, at: 182, df: 130, sa: 80, sd: 90, sp: 82 },
    weightkg: 105.5,
    abilities: { 0: 'Weak Armor' },
    origin: "Insurgence"
    },
'Stunfisk-Mega': {
    types: ['Ground', 'Electric'],
    bs: { hp: 109, at: 76, df: 104, sa: 91, sd: 134, sp: 57 },
    weightkg: 11,
    abilities: { 0: 'Athenian' },
    origin: "Insurgence"
    },
'Bisharp-Mega': {
    types: ['Dark', 'Steel'],
    bs: { hp: 65, at: 145, df: 130, sa: 60, sd: 85, sp: 105 },
    weightkg: 70,
    abilities: { 0: 'Moxie' },
    origin: "Insurgence"
    },
'Hydreigon-Mega-Five': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 92, at: 130, df: 105, sa: 170, sd: 105, sp: 98 },
    weightkg: 160,
    abilities: { 0: 'Lernean' },
    origin: "Insurgence"
    },
'Hydreigon-Mega-Six': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 92, at: 130, df: 105, sa: 170, sd: 105, sp: 98 },
    weightkg: 160,
    abilities: { 0: 'Lernean' },
    origin: "Insurgence"
    },
'Hydreigon-Mega-Seven': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 92, at: 130, df: 105, sa: 170, sd: 105, sp: 98 },
    weightkg: 160,
    abilities: { 0: 'Lernean' },
    origin: "Insurgence"
    },
'Hydreigon-Mega-Eight': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 92, at: 130, df: 105, sa: 170, sd: 105, sp: 98 },
    weightkg: 160,
    abilities: { 0: 'Lernean' },
    origin: "Insurgence"
    },
'Hydreigon-Mega-Nine': {
    types: ['Dark', 'Dragon'],
    bs: { hp: 92, at: 130, df: 105, sa: 170, sd: 105, sp: 98 },
    weightkg: 160,
    abilities: { 0: 'Lernean' },
    origin: "Insurgence"
    },
'Mewtwo-Armor': {
    types: ['Psychic'],
    bs: { hp: 106, at: 110, df: 90, sa: 154, sd: 90, sp: 130 },
    weightkg: 122,
    abilities: { 0: 'Hubris' },
    origin: "Insurgence"
    },
'Tyranitar-Armor': {
    types: ['Rock', 'Dark'],
    bs: { hp: 100, at: 134, df: 143, sa: 95, sd: 130, sp: 61 },
    weightkg: 202,
    abilities: { 0: 'Sand Stream' },
    origin: "Insurgence"
    },
'Flygon-Armor': {
    types: ['Ground', 'Dragon'],
    bs: { hp: 80, at: 100, df: 104, sa: 80, sd: 104, sp: 100 },
    weightkg: 82,
    abilities: { 0: 'Levitate' },
    origin: "Insurgence"
    },
'Leavanny-Armor': {
    types: ['Bug', 'Grass'],
    bs: { hp: 75, at: 103, df: 104, sa: 70, sd: 104, sp: 92 },
    weightkg: 20.5,
    abilities: { 0: 'Swarm' },
    origin: "Insurgence"
    },
'Zekrom-Armor': {
    types: ['Dragon', 'Electric'],
    bs: { hp: 100, at: 150, df: 156, sa: 120, sd: 130, sp: 90 },
    weightkg: 345,
    abilities: { 0: 'Teravolt' },
    origin: "Insurgence"
    },
// Infinity
'Bulbasaur-Egho':{
types: ['Grass', 'Rock'],
bs: {hp:44, at:60, df:54, sa:50, sd:64, sp:37}, 
weightkg: 16,
abilities: {0: 'Rough Skin'},
nfe: true,
origin: 'Infinity'
},
'Ivysaur-Egho':{
types: ['Grass', 'Rock'],
bs: {hp:60, at:80, df:65, sa:67, sd:78, sp:45}, 
weightkg: 70,
abilities: {0: 'Rough Skin'},
nfe: true,
origin: 'Infinity'
},
'Venusaur-Egho':{
types: ['Grass', 'Rock'],
bs: {hp:80, at:111, df:100, sa:90, sd:88, sp:65}, 
weightkg: 280,
abilities: {0: 'Rough Skin'},
origin: 'Infinity'
},
'Charmander-Egho':{
types: ['Fire', 'Dragon'],
bs: {hp:39, at:50, df:43, sa:62, sd:50, sp:65}, 
weightkg: 8.5,
abilities: {0: 'Oblivious'},
nfe: true,
origin: 'Infinity'
},
'Charmeleon-Egho':{
types: ['Fire', 'Dragon'],
bs: {hp:58, at:64, df:58, sa:80, sd:65, sp:80}, 
weightkg: 19,
abilities: {0: 'Oblivious'},
nfe: true,
origin: 'Infinity'
},
'Charizard-Egho':{
types: ['Fire', 'Dragon'],
bs: {hp:76, at:75, df:75, sa:114, sd:80, sp:114}, 
weightkg: 90.5,
abilities: {0: 'Levitate'},
origin: 'Infinity'
},
'Squirtle-Egho':{
types: ['Water'],
bs: {hp:44, at:48, df:65, sa:50, sd:64, sp:43}, 
weightkg: 8.5,
abilities: {0: 'Serene Grace'},
nfe: true,
origin: 'Infinity'
},
'Wartortle-Egho':{
types: ['Water', 'Flying'],
bs: {hp:59, at:63, df:80, sa:65, sd:80, sp:58}, 
weightkg: 20,
abilities: {0: 'Serene Grace'},
nfe: true,
origin: 'Infinity'
},
'Blastoise-Egho':{
types: ['Water', 'Flying'],
bs: {hp:70, at:85, df:85, sa:95, sd:105, sp:90}, 
weightkg: 76,
abilities: {0: 'Serene Grace'},
origin: 'Infinity'
},
'Lukpup':{
types: ['Fairy'],
bs: {hp:60, at:75, df:50, sa:70, sd:70, sp:60}, 
weightkg: 14.9,
abilities: {0: 'Fluffy'},
nfe: true,
origin: 'Infinity'
},
'Lukagon':{
types: ['Fairy', 'Dragon'],
bs: {hp:100, at:124, df:88, sa:102, sd:92, sp:94}, 
weightkg: 123,
abilities: {0: 'Fluffy'},
origin: 'Infinity'
},
'Kokiseed':{
types: ['Grass'],
bs: {hp:45, at:55, df:55, sa:55, sd:60, sp:40}, 
weightkg: 6,
abilities: {0: 'Own Tempo'},
nfe: true,
origin: 'Infinity'
},
'Kokipound':{
types: ['Grass', 'Fighting'],
bs: {hp:60, at:85, df:70, sa:53, sd:65, sp:60}, 
weightkg: 36,
abilities: {0: 'Justified'},
nfe: true,
origin: 'Infinity'
},
'Kokismash':{
types: ['Grass', 'Fighting'],
bs: {hp:80, at:130, df:85, sa:65, sd:80, sp:85}, 
weightkg: 164,
abilities: {0: 'Justified'},
origin: 'Infinity'
},
'Chargo':{
types: ['Fire'],
bs: {hp:49, at:45, df:50, sa:64, sd:54, sp:58}, 
weightkg: 14.8,
abilities: {0: 'Reckless'},
nfe: true,
origin: 'Infinity'
},
'Burnaram':{
types: ['Fire'],
bs: {hp:58, at:75, df:61, sa:83, sd:68, sp:75}, 
weightkg: 53,
abilities: {0: 'Reckless'},
nfe: true,
origin: 'Infinity'
},
'Psysteed':{
types: ['Fire', 'Psychic'],
bs: {hp:80, at:90, df:82, sa:113, sd:85, sp:87}, 
weightkg: 88,
abilities: {0: 'Reckless'},
origin: 'Infinity'
},
'Darpole':{
types: ['Water'],
bs: {hp:56, at:60, df:50, sa:40, sd:60, sp:40}, 
weightkg: 2.8,
abilities: {0: 'Pickpocket'},
nfe: true,
origin: 'Infinity'
},
'Brutoad':{
types: ['Water', 'Dark'],
bs: {hp:68, at:80, df:71, sa:60, sd:71, sp:50}, 
weightkg: 43,
abilities: {0: 'Pickpocket'},
nfe: true,
origin: 'Infinity'
},
'Godfrogger':{
types: ['Water', 'Dark'],
bs: {hp:85, at:102, df:95, sa:90, sd:105, sp:70}, 
weightkg: 187,
abilities: {0: 'Bulletproof'},
origin: 'Infinity'
},
'Gorochu':{
types: ['Electric', 'Fire'],
bs: {hp:60, at:112, df:50, sa:88, sd:70, sp:105}, 
weightkg: 38.4,
abilities: {0: 'Reckless'},
origin: 'Infinity'
},
'Nidorook':{
types: ['Poison', 'Ground'],
bs: {hp:78, at:97, df:75, sa:85, sd:70, sp:100}, 
weightkg: 76.8,
abilities: {0: 'Poison Point'},
origin: 'Infinity'
},
'Quezsparce':{
types: ['Fairy', 'Ground'],
bs: {hp:110, at:105, df:75, sa:80, sd:70, sp:100}, 
weightkg: 79.3,
abilities: {0: 'Serene Grace'},
origin: 'Infinity'
},
'Faeralynx':{
types: ['Fairy', 'Dark'],
bs: {hp:75, at:98, df:73, sa:88, sd:75, sp:126}, 
weightkg: 51,
abilities: {0: 'Infiltrator'},
origin: 'Infinity'
},
'Shellder-Egho':{
types: ['Water', 'Steel'],
bs: {hp:52, at:40, df:70, sa:55, sd:57, sp:31}, 
weightkg: 41,
abilities: {0: 'Iron Barbs'},
nfe: true,
origin: 'Infinity'
},
'Skulkraken':{
types: ['Water', 'Steel'],
bs: {hp:80, at:83, df:123, sa:83, sd:110, sp:46}, 
weightkg: 212,
abilities: {0: 'Iron Barbs'},
origin: 'Infinity'
},
'Grimer-Egho':{
types: ['Poison', 'Rock'],
bs: {hp:60, at:70, df:70, sa:60, sd:45, sp:20}, 
weightkg: 205,
abilities: {0: 'Stench'},
nfe: true,
origin: 'Infinity'
},
'Muk-Egho':{
types: ['Poison', 'Rock'],
bs: {hp:85, at:100, df:105, sa:90, sd:80, sp:40}, 
weightkg: 395,
abilities: {0: 'Stench'},
nfe: true,
origin: 'Infinity'
},
'Oozma':{
types: ['Fire', 'Rock'],
bs: {hp:95, at:134, df:100, sa:100, sd:55, sp:96}, 
weightkg: 240,
abilities: {0: 'Iron Fist'},
origin: 'Infinity'
},
'Omeon':{
types: ['Ghost'],
bs: {hp:70, at:124, df:85, sa:65, sd:65, sp:116}, 
weightkg: 18,
abilities: {0: 'Super Luck'},
origin: 'Infinity'
},
'Champeon':{
types: ['Fighting'],
bs: {hp:65, at:110, df:65, sa:95, sd:60, sp:130}, 
weightkg: 23,
abilities: {0: 'Scrappy'},
origin: 'Infinity'
},
'Lepideon':{
types: ['Bug'],
bs: {hp:80, at:65, df:72, sa:115, sd:90, sp:103}, 
weightkg: 22,
abilities: {0: 'Rattled'},
origin: 'Infinity'
},
'Guardeon':{
types: ['Steel'],
bs: {hp:65, at:60, df:130, sa:110, sd:95, sp:65}, 
weightkg: 58.5,
abilities: {0: 'Bulletproof'},
origin: 'Infinity'
},
'Obsideon':{
types: ['Rock'],
bs: {hp:75, at:120, df:75, sa:60, sd:115, sp:80}, 
weightkg: 33,
abilities: {0: 'Rock Head'},
origin: 'Infinity'
},
'Scorpeon':{
types: ['Poison'],
bs: {hp:65, at:111, df:105, sa:84, sd:50, sp:110}, 
weightkg: 23,
abilities: {0: 'Poison Touch'},
origin: 'Infinity'
},
'Sphynxeon':{
types: ['Ground'],
bs: {hp:120, at:88, df:106, sa:70, sd:80, sp:61}, 
weightkg: 24,
abilities: {0: 'Synchronize'},
origin: 'Infinity'
},
'Nimbeon':{
types: ['Flying'],
bs: {hp:120, at:88, df:61, sa:70, sd:80, sp:106}, 
weightkg: 14,
abilities: {0: 'Aerilate'},
origin: 'Infinity'
},
'Draconeon':{
types: ['Dragon'],
bs: {hp:80, at:127, df:80, sa:70, sd:50, sp:118}, 
weightkg: 25,
abilities: {0: 'Tough Claws'},
origin: 'Infinity'
},
'Eeveeon':{
types: ['Normal'],
bs: {hp:90, at:95, df:70, sa:95, sd:70, sp:105}, 
weightkg: 25,
abilities: {0: 'Klutz'},
origin: 'Infinity'
},
'Vareon':{
types: ['???'],
bs: {hp:100, at:110, df:100, sa:110, sd:100, sp:80}, 
weightkg: 28,
abilities: {0: 'Protean'},
origin: 'Infinity'
},
'Terathwack':{
types: ['Normal', 'Ground'],
bs: {hp:100, at:135, df:113, sa:60, sd:80, sp:77}, 
weightkg: 123,
abilities: {0: 'Rock Head'},
origin: 'Infinity'
},
'Spearow-Egho':{
types: ['Dark', 'Fighting'],
bs: {hp:40, at:70, df:25, sa:26, sd:31, sp:70}, 
weightkg: 2.8,
abilities: {0: 'Defiant'},
nfe: true,
origin: 'Infinity'
},
'Fearow-Egho':{
types: ['Dark', 'Fighting'],
bs: {hp:65, at:112, df:55, sa:50, sd:50, sp:110}, 
weightkg: 45,
abilities: {0: 'Defiant'},
origin: 'Infinity'
},
'Hoothoot-Egho':{
types: ['Dark', 'Flying'],
bs: {hp:60, at:30, df:40, sa:56, sd:36, sp:40}, 
weightkg: 23.5,
abilities: {0: 'Unnerve'},
nfe: true,
origin: 'Infinity'
},
'Noctowl-Egho':{
types: ['Dark', 'Flying'],
bs: {hp:86, at:50, df:77, sa:99, sd:70, sp:70}, 
weightkg: 49.8,
abilities: {0: 'Unnerve'},
nfe: true,
origin: 'Infinity'
},
'Grimfowl':{
types: ['Dark', 'Flying'],
bs: {hp:112, at:63, df:80, sa:130, sd:77, sp:78}, 
weightkg: 70,
abilities: {0: 'Unnerve'},
origin: 'Infinity'
},
'Azurill-Egho':{
types: ['Normal', 'Rock'],
bs: {hp:50, at:40, df:30, sa:20, sd:25, sp:25}, 
weightkg: 4,
abilities: {0: 'Huge Power'},
nfe: true,
origin: 'Infinity'
},
'Marill-Egho':{
types: ['Rock', 'Fighting'],
bs: {hp:70, at:50, df:40, sa:20, sd:30, sp:40}, 
weightkg: 15,
abilities: {0: 'Huge Power'},
nfe: true,
origin: 'Infinity'
},
'Azumarill-Egho':{
types: ['Rock', 'Fighting'],
bs: {hp:100, at:80, df:65, sa:60, sd:60, sp:55}, 
weightkg: 46,
abilities: {0: 'Huge Power'},
origin: 'Infinity'
},
'Trubbish-Egho':{
types: ['Poison', 'Steel'],
bs: {hp:57, at:22, df:95, sa:60, sd:87, sp:10}, 
weightkg: 43,
abilities: {0: 'Filter'},
nfe: true,
origin: 'Infinity'
},
'Garbodor-Egho':{
types: ['Poison', 'Steel'],
bs: {hp:90, at:25, df:147, sa:95, sd:107, sp:15}, 
weightkg: 177.3,
abilities: {0: 'Unaware'},
origin: 'Infinity'
},
'Swablu-Egho':{
types: ['Normal', 'Ice'],
bs: {hp:50, at:30, df:55, sa:60, sd:45, sp:70}, 
weightkg: 4.2,
abilities: {0: 'Levitate'},
nfe: true,
origin: 'Infinity'
},
'Altaria-Egho':{
types: ['Dragon', 'Ice'],
bs: {hp:80, at:60, df:90, sa:95, sd:60, sp:105}, 
weightkg: 24,
abilities: {0: 'Levitate'},
origin: 'Infinity'
},
'Lotad-Egho':{
types: ['Fire', 'Steel'],
bs: {hp:40, at:30, df:40, sa:50, sd:30, sp:30}, 
weightkg: 8,
abilities: {0: 'Harvest'},
nfe: true,
origin: 'Infinity'
},
'Lombre-Egho':{
types: ['Fire', 'Steel'],
bs: {hp:60, at:50, df:60, sa:70, sd:50, sp:50}, 
weightkg: 73.5,
abilities: {0: 'Harvest'},
nfe: true,
origin: 'Infinity'
},
'Ludicolo-Egho':{
types: ['Fire', 'Steel'],
bs: {hp:85, at:50, df:95, sa:100, sd:75, sp:75}, 
weightkg: 130,
abilities: {0: 'Harvest'},
origin: 'Infinity'
},
'Sunflorid':{
types: ['Grass', 'Fire'],
bs: {hp:110, at:90, df:75, sa:115, sd:80, sp:65}, 
weightkg: 34,
abilities: {0: 'Chlorophyll'},
origin: 'Infinity'
},
'Sorcerice':{
types: ['Ice', 'Psychic'],
bs: {hp:75, at:60, df:40, sa:130, sd:105, sp:125}, 
weightkg: 71,
abilities: {0: 'Infiltrator'},
origin: 'Infinity'
},
'Kecleodon':{
types: ['Normal'],
bs: {hp:90, at:110, df:75, sa:80, sd:140, sp:40}, 
weightkg: 142,
abilities: {0: 'Protean'},
origin: 'Infinity'
},
'Magnemite-Egho':{
types: ['Grass', 'Steel'],
bs: {hp:40, at:80, df:55, sa:40, sd:65, sp:45}, 
weightkg: 20,
abilities: {0: 'Magnet Pull'},
nfe: true,
origin: 'Infinity'
},
'Magneton-Egho':{
types: ['Grass', 'Steel'],
bs: {hp:65, at:109, df:66, sa:65, sd:90, sp:70}, 
weightkg: 90,
abilities: {0: 'Magnet Pull'},
nfe: true,
origin: 'Infinity'
},
'Magnezone-Egho':{
types: ['Grass', 'Steel'],
bs: {hp:80, at:130, df:85, sa:75, sd:105, sp:60}, 
weightkg: 285,
abilities: {0: 'Magnet Pull'},
origin: 'Infinity'
},
'Tangela-Egho':{
types: ['Electric', 'Steel'],
bs: {hp:63, at:70, df:90, sa:80, sd:77, sp:55}, 
weightkg: 35,
abilities: {0: 'Volt Absorb'},
nfe: true,
origin: 'Infinity'
},
'Tangrowth-Egho':{
types: ['Electric', 'Steel'],
bs: {hp:110, at:55, df:107, sa:96, sd:77, sp:92}, 
weightkg: 138.6,
abilities: {0: 'Volt Absorb'},
origin: 'Infinity'
},
'Wereyena':{
types: ['Dark', 'Fairy'],
bs: {hp:75, at:129, df:75, sa:84, sd:70, sp:102}, 
weightkg: 108,
abilities: {0: 'Intimidate'},
origin: 'Infinity'
},
'Reaptide':{
types: ['Water', 'Ghost'],
bs: {hp:28, at:130, df:72, sa:105, sd:28, sp:122}, 
weightkg: 6,
abilities: {0: 'Rattled'},
origin: 'Infinity'
},
'Happiny-Egho':{
types: ['Fighting', 'Fairy'],
bs: {hp:65, at:100, df:15, sa:5, sd:5, sp:30}, 
weightkg: 24.4,
abilities: {0: 'Anger Point'},
nfe: true,
origin: 'Infinity'
},
'Chansey-Egho':{
types: ['Fighting', 'Fairy'],
bs: {hp:105, at:250, df:35, sa:5, sd:5, sp:50}, 
weightkg: 34.6,
abilities: {0: 'Anger Point'},
nfe: true,
origin: 'Infinity'
},
'Blissey-Egho':{
types: ['Fighting', 'Fairy'],
bs: {hp:135, at:255, df:55, sa:10, sd:10, sp:75}, 
weightkg: 46.8,
abilities: {0: 'Anger Point'},
origin: 'Infinity'
},
'Kidfoot':{
types: ['Normal'],
bs: {hp:55, at:75, df:45, sa:45, sd:45, sp:60}, 
weightkg: 70,
abilities: {0: 'Forewarn'},
nfe: true,
origin: 'Infinity'
},
'Snosquatch':{
types: ['Ice', 'Rock'],
bs: {hp:74, at:130, df:100, sa:80, sd:60, sp:96}, 
weightkg: 450,
abilities: {0: 'Moxie'},
origin: 'Infinity'
},
'Grasquatch':{
types: ['Grass', 'Psychic'],
bs: {hp:74, at:80, df:60, sa:130, sd:100, sp:96}, 
weightkg: 370,
abilities: {0: 'Chlorophyll'},
origin: 'Infinity'
},
'Arctusk':{
types: ['Ice', 'Normal'],
bs: {hp:45, at:65, df:100, sa:50, sd:55, sp:40}, 
weightkg: 107,
abilities: {0: 'Sturdy'},
nfe: true,
origin: 'Infinity'
},
'Gigantusk':{
types: ['Ice', 'Steel'],
bs: {hp:85, at:100, df:133, sa:60, sd:60, sp:57}, 
weightkg: 440,
abilities: {0: 'Sturdy'},
origin: 'Infinity'
},
'Iceros':{
types: ['Ice', 'Ground'],
bs: {hp:50, at:85, df:70, sa:40, sd:60, sp:50}, 
weightkg: 73,
abilities: {0: 'Ice Body'},
nfe: true,
origin: 'Infinity'
},
'Glacieros':{
types: ['Ice', 'Ground'],
bs: {hp:75, at:120, df:100, sa:40, sd:76, sp:84}, 
weightkg: 132,
abilities: {0: 'Ice Body'},
origin: 'Infinity'
},
'Mockroach':{
types: ['Bug', 'Dark'],
bs: {hp:52, at:100, df:70, sa:40, sd:90, sp:138}, 
weightkg: 10,
abilities: {0: 'Prankster'},
origin: 'Infinity'
},
'Jollibird':{
types: ['Ice', 'Fairy'],
bs: {hp:80, at:50, df:105, sa:120, sd:115, sp:75}, 
weightkg: 98,
abilities: {0: 'Thick Fat'},
origin: 'Infinity'
},
'Kablowfish':{
types: ['Water', 'Steel'],
bs: {hp:85, at:100, df:125, sa:65, sd:85, sp:75}, 
weightkg: 60,
abilities: {0: 'Poison Point'},
origin: 'Infinity'
},
'Scalarva':{
types: ['Bug', 'Dragon'],
bs: {hp:50, at:70, df:65, sa:40, sd:40, sp:35}, 
weightkg: 12.5,
abilities: {0: 'Compound Eyes'},
nfe: true,
origin: 'Infinity'
},
'Dragalis':{
types: ['Bug', 'Dragon'],
bs: {hp:70, at:80, df:100, sa:70, sd:65, sp:25}, 
weightkg: 12.5,
abilities: {0: 'Compound Eyes'},
nfe: true,
origin: 'Infinity'
},
'Ceregal':{
types: ['Bug', 'Dragon'],
bs: {hp:80, at:145, df:110, sa:90, sd:75, sp:100}, 
weightkg: 70,
abilities: {0: 'Compound Eyes'},
origin: 'Infinity'
},
'Gargon':{
types: ['Rock', 'Dragon'],
bs: {hp:45, at:65, df:65, sa:60, sd:45, sp:45}, 
weightkg: 70,
abilities: {0: 'Intimidate'},
nfe: true,
origin: 'Infinity'
},
'Wardern':{
types: ['Rock', 'Dragon'],
bs: {hp:65, at:80, df:90, sa:70, sd:60, sp:60}, 
weightkg: 190,
abilities: {0: 'Intimidate'},
nfe: true,
origin: 'Infinity'
},
'Dragoyle':{
types: ['Rock', 'Dragon'],
bs: {hp:70, at:113, df:122, sa:99, sd:65, sp:81}, 
weightkg: 360,
abilities: {0: 'Intimidate'},
origin: 'Infinity'
},
'Porygon-X':{
types: ['Electric', 'Normal'],
bs: {hp:85, at:70, df:72, sa:95, sd:72, sp:141}, 
weightkg: 34,
abilities: {0: 'Adaptability'},
origin: 'Infinity'
},
'Oculeus':{
types: ['Psychic', 'Cosmic'],
bs: {hp:120, at:120, df:120, sa:120, sd:120, sp:120}, 
weightkg: 45,
abilities: {0: 'Technician'},
origin: 'Infinity'
},
'Arkhaos':{
types: ['Cosmic'],
bs: {hp:140, at:136, df:100, sa:136, sd:100, sp:188}, 
weightkg: 888,
abilities: {0: 'Shed Skin'},
origin: 'Infinity'
},
'Botamon':{
types: ['Normal'],
bs: {hp:30, at:20, df:20, sa:25, sd:25, sp:25}, 
weightkg: 2.6,
abilities: {0: 'Klutz'},
nfe: true,
origin: 'Infinity'
},
'Koromon':{
types: ['Normal'],
bs: {hp:45, at:35, df:35, sa:30, sd:25, sp:30}, 
weightkg: 5,
abilities: {0: 'Adaptability'},
nfe: true,
origin: 'Infinity'
},
'Agumon':{
types: ['Fire'],
bs: {hp:65, at:75, df:75, sa:80, sd:65, sp:60}, 
weightkg: 80,
abilities: {0: 'Adaptability'},
nfe: true,
origin: 'Infinity'
},
'Greymon':{
types: ['Fire'],
bs: {hp:80, at:115, df:100, sa:100, sd:80, sp:90}, 
weightkg: 500,
abilities: {0: 'Adaptability'},
nfe: true,
origin: 'Infinity'
},
'MetalGreymon':{
types: ['Fire', 'Steel'],
bs: {hp:85, at:120, df:120, sa:110, sd:80, sp:100}, 
weightkg: 1220,
abilities: {0: 'Adaptability'},
nfe: true,
origin: 'Infinity'
},
'WarGreymon':{
types: ['Fire', 'Steel'],
bs: {hp:104, at:135, df:150, sa:135, sd:100, sp:86}, 
weightkg: 1350,
abilities: {0: 'Download'},
origin: 'Infinity'
},
'Tyrannomon':{
types: ['Fire'],
bs: {hp:85, at:115, df:100, sa:70, sd:90, sp:100}, 
weightkg: 350,
abilities: {0: 'Adaptability'},
origin: 'Infinity'
},
'SkullGreymon':{
types: ['Fire', 'Ghost'],
bs: {hp:75, at:140, df:70, sa:140, sd:55, sp:110}, 
weightkg: 160,
abilities: {0: 'Intimidate'},
nfe: true,
origin: 'Infinity'
},
'Betamon':{
types: ['Water'],
bs: {hp:70, at:79, df:77, sa:60, sd:65, sp:54}, 
weightkg: 55,
abilities: {0: 'Mold Breaker'},
nfe: true,
origin: 'Infinity'
},
'Seadramon':{
types: ['Water', 'Dragon'],
bs: {hp:90, at:110, df:80, sa:95, sd:70, sp:95}, 
weightkg: 195,
abilities: {0: 'Mold Breaker'},
nfe: true,
origin: 'Infinity'
},
'Numemon':{
types: ['Poison', 'Dark'],
bs: {hp:90, at:90, df:100, sa:90, sd:100, sp:65}, 
weightkg: 110,
abilities: {0: 'Limber'},
nfe: true,
origin: 'Infinity'
},
'Oddish-Egho':{
types: ['Ghost', 'Poison'],
bs: {hp:45, at:30, df:65, sa:75, sd:55, sp:50}, 
weightkg: 3.4,
abilities: {0: 'Levitate'},
nfe: true,
origin: 'Infinity'
},
'Gloom-Egho':{
types: ['Ghost', 'Poison'],
bs: {hp:60, at:45, df:90, sa:85, sd:65, sp:55}, 
weightkg: 6.5,
abilities: {0: 'Levitate'},
nfe: true,
origin: 'Infinity'
},
'Viledoom':{
types: ['Ghost', 'Poison'],
bs: {hp:80, at:52, df:113, sa:105, sd:80, sp:60}, 
weightkg: 14.2,
abilities: {0: 'Levitate'},
origin: 'Infinity'
},
'Mortossum':{
types: ['Ghost', 'Fairy'],
bs: {hp:90, at:57, df:80, sa:100, sd:80, sp:83}, 
weightkg: 5,
abilities: {0: 'Levitate'},
origin: 'Infinity'
},
'Mushling':{
types: ['Grass', 'Psychic'],
bs: {hp:40, at:30, df:40, sa:60, sd:50, sp:47}, 
weightkg: 8,
abilities: {0: 'Magic Guard'},
nfe: true,
origin: 'Infinity'
},
'Psycholyte':{
types: ['Grass', 'Psychic'],
bs: {hp:55, at:50, df:60, sa:85, sd:70, sp:58}, 
weightkg: 14,
abilities: {0: 'Magic Guard'},
nfe: true,
origin: 'Infinity'
},
'Shroomage':{
types: ['Grass', 'Psychic'],
bs: {hp:85, at:60, df:80, sa:130, sd:100, sp:76}, 
weightkg: 30,
abilities: {0: 'Magic Guard'},
origin: 'Infinity'
},
'Calfpint':{
types: ['Normal'],
bs: {hp:63, at:65, df:50, sa:27, sd:50, sp:65}, 
weightkg: 48,
abilities: {0: 'Forewarn'},
nfe: true,
origin: 'Infinity'
},
'Arbird':{
types: ['Steel', 'Normal'],
bs: {hp:47, at:56, df:95, sa:18, sd:52, sp:52}, 
weightkg: 15,
abilities: {0: 'Keen Eye'},
nfe: true,
origin: 'Infinity'
},
'Girafaraf':{
types: ['Fairy', 'Psychic'],
bs: {hp:75, at:80, df:70, sa:120, sd:105, sp:95}, 
weightkg: 95,
abilities: {0: 'Pixilate'},
origin: 'Infinity'
},
'Giragira':{
types: ['Dark', 'Psychic'],
bs: {hp:70, at:120, df:70, sa:110, sd:70, sp:105}, 
weightkg: 75,
abilities: {0: 'Strong Jaw'},
origin: 'Infinity'
},
'Whave':{
types: ['Water'],
bs: {hp:85, at:80, df:75, sa:55, sd:60, sp:70}, 
weightkg: 124,
abilities: {0: 'Hydration'},
nfe: true,
origin: 'Infinity'
},
'Orcabyss':{
types: ['Water'],
bs: {hp:110, at:110, df:100, sa:90, sd:85, sp:50}, 
weightkg: 768.5,
abilities: {0: 'Pressure'},
origin: 'Infinity'
},
'Zapalope':{
types: ['Electric', 'Grass'],
bs: {hp:40, at:75, df:40, sa:35, sd:30, sp:100}, 
weightkg: 10,
abilities: {0: 'Fluffy'},
nfe: true,
origin: 'Infinity'
},
'Joltalope':{
types: ['Electric', 'Grass'],
bs: {hp:70, at:102, df:80, sa:47, sd:55, sp:131}, 
weightkg: 24,
abilities: {0: 'Overgrow'},
origin: 'Infinity'
},
'Chikorita-Egho':{
types: ['Grass', 'Dragon'],
bs: {hp:85, at:10, df:49, sa:65, sd:65, sp:44}, 
weightkg: 6.4,
abilities: {0: 'Chlorophyll'},
nfe: true,
origin: 'Infinity'
},
'Bayleef-Egho':{
types: ['Grass', 'Dragon'],
bs: {hp:108, at:17, df:63, sa:80, sd:80, sp:57}, 
weightkg: 15.8,
abilities: {0: 'Chlorophyll'},
nfe: true,
origin: 'Infinity'
},
'Meganium-Egho':{
types: ['Grass', 'Dragon'],
bs: {hp:143, at:24, df:83, sa:100, sd:100, sp:75}, 
weightkg: 100.5,
abilities: {0: 'Chlorophyll'},
origin: 'Infinity'
},
'Cyndaquil-Egho':{
types: ['Fire', 'Electric'],
bs: {hp:50, at:38, df:52, sa:65, sd:44, sp:60}, 
weightkg: 6.3,
abilities: {0: 'Static'},
nfe: true,
origin: 'Infinity'
},
'Quilava-Egho':{
types: ['Fire', 'Electric'],
bs: {hp:66, at:52, df:71, sa:83, sd:60, sp:73}, 
weightkg: 14,
abilities: {0: 'Static'},
nfe: true,
origin: 'Infinity'
},
'Typhlosion-Egho':{
types: ['Fire', 'Electric'],
bs: {hp:84, at:64, df:94, sa:120, sd:78, sp:97}, 
weightkg: 68,
abilities: {0: 'Static'},
origin: 'Infinity'
},
'Totodile-Egho':{
types: ['Water', 'Poison'],
bs: {hp:45, at:56, df:45, sa:57, sd:42, sp:69}, 
weightkg: 9.5,
abilities: {0: 'Merciless'},
nfe: true,
origin: 'Infinity'
},
'Croconaw-Egho':{
types: ['Water', 'Poison'],
bs: {hp:65, at:70, df:59, sa:70, sd:54, sp:87}, 
weightkg: 25,
abilities: {0: 'Merciless'},
nfe: true,
origin: 'Infinity'
},
'Feraligatr-Egho':{
types: ['Water', 'Poison'],
bs: {hp:75, at:95, df:70, sa:103, sd:66, sp:121}, 
weightkg: 88.8,
abilities: {0: 'Merciless'},
origin: 'Infinity'
},
'Mewthree':{
types: ['Psychic'],
bs: {hp:150, at:100, df:95, sa:150, sd:95, sp:130}, 
weightkg: 162,
abilities: {0: 'Pressure'},
origin: 'Infinity'
},
'Palmon':{
types: ['Grass'],
bs: {hp:70, at:69, df:71, sa:75, sd:62, sp:63}, 
weightkg: 40,
abilities: {0: 'Super Luck'},
nfe: true,
origin: 'Infinity'
},
'Togemon':{
types: ['Grass', 'Fighting'],
bs: {hp:85, at:160, df:85, sa:80, sd:65, sp:55}, 
weightkg: 197.5,
abilities: {0: 'Super Luck'},
nfe: true,
origin: 'Infinity'
},
'Shellmon':{
types: ['Water', 'Ground'],
bs: {hp:135, at:80, df:120, sa:75, sd:110, sp:45}, 
weightkg: 420,
abilities: {0: 'Super Luck'},
origin: 'Infinity'
},
'Tsunomon':{
types: ['Normal'],
bs: {hp:40, at:30, df:30, sa:35, sd:30, sp:35}, 
weightkg: 5.5,
abilities: {0: 'Defiant'},
nfe: true,
origin: 'Infinity'
},
'Motimon':{
types: ['Normal'],
bs: {hp:45, at:30, df:30, sa:30, sd:35, sp:30}, 
weightkg: 5,
abilities: {0: 'Super Luck'},
nfe: true,
origin: 'Infinity'
},
'Gabumon':{
types: ['Ice'],
bs: {hp:70, at:75, df:75, sa:75, sd:65, sp:65}, 
weightkg: 50,
abilities: {0: 'Anger Point'},
nfe: true,
origin: 'Infinity'
},
'Elecmon':{
types: ['Electric'],
bs: {hp:60, at:70, df:70, sa:75, sd:65, sp:75}, 
weightkg: 30,
abilities: {0: 'Anger Point'},
nfe: true,
origin: 'Infinity'
},
'Gomamon':{
types: ['Water'],
bs: {hp:69, at:73, df:73, sa:65, sd:70, sp:65}, 
weightkg: 34,
abilities: {0: 'Anger Point'},
nfe: true,
origin: 'Infinity'
},
'Crabmon':{
types: ['Water'],
bs: {hp:70, at:65, df:85, sa:75, sd:70, sp:40}, 
weightkg: 40,
abilities: {0: 'Rough Skin'},
nfe: true,
origin: 'Infinity'
},
'Kunemon':{
types: ['Electric', 'Poison'],
bs: {hp:57, at:75, df:73, sa:70, sd:45, sp:85}, 
weightkg: 26,
abilities: {0: 'Poison Point'},
nfe: true,
origin: 'Infinity'
},
'Tentomon':{
types: ['Bug', 'Flying'],
bs: {hp:65, at:84, df:86, sa:65, sd:62, sp:53}, 
weightkg: 30,
abilities: {0: 'Super Luck'},
nfe: true,
origin: 'Infinity'
},
'Biyomon':{
types: ['Fairy', 'Flying'],
bs: {hp:80, at:66, df:64, sa:73, sd:55, sp:72}, 
weightkg: 30,
abilities: {0: 'Cute Charm'},
nfe: true,
origin: 'Infinity'
},
'Patamon':{
types: ['Flying', 'Normal'],
bs: {hp:75, at:61, df:64, sa:65, sd:55, sp:95}, 
weightkg: 19,
abilities: {0: 'Telepathy'},
nfe: true,
origin: 'Infinity'
},
'Monochromon':{
types: ['Ground', 'Fire'],
bs: {hp:97, at:105, df:125, sa:80, sd:110, sp:33}, 
weightkg: 419,
abilities: {0: 'Anger Point'},
origin: 'Infinity'
},
'Birdramon':{
types: ['Fairy', 'Fire'],
bs: {hp:115, at:110, df:65, sa:104, sd:60, sp:101}, 
weightkg: 305,
abilities: {0: 'Levitate'},
nfe: true,
origin: 'Infinity'
},
'Drimogemon':{
types: ['Ground'],
bs: {hp:90, at:125, df:105, sa:70, sd:70, sp:95}, 
weightkg: 477,
abilities: {0: 'Sand Rush'},
origin: 'Infinity'
},
'Garurumon':{
types: ['Ice'],
bs: {hp:80, at:115, df:75, sa:110, sd:70, sp:110}, 
weightkg: 255,
abilities: {0: 'Technician'},
nfe: true,
origin: 'Infinity'
},
'Unimon':{
types: ['Steel', 'Fairy'],
bs: {hp:105, at:106, df:75, sa:80, sd:75, sp:109}, 
weightkg: 175,
abilities: {0: 'Natural Cure'},
nfe: true,
origin: 'Infinity'
},
'Leomon':{
types: ['Normal', 'Fighting'],
bs: {hp:85, at:123, df:89, sa:75, sd:66, sp:102}, 
weightkg: 246,
abilities: {0: 'Steadfast'},
nfe: true,
origin: 'Infinity'
},
'Ogremon':{
types: ['Dark'],
bs: {hp:75, at:130, df:85, sa:70, sd:80, sp:100}, 
weightkg: 221,
abilities: {0: 'Anger Point'},
origin: 'Infinity'
},
'Ikkakumon':{
types: ['Ice', 'Water'],
bs: {hp:95, at:120, df:90, sa:85, sd:80, sp:70}, 
weightkg: 460,
abilities: {0: 'Anger Point'},
nfe: true,
origin: 'Infinity'
},
'Mojyamon':{
types: ['Normal'],
bs: {hp:90, at:115, df:100, sa:75, sd:100, sp:75}, 
weightkg: 254,
abilities: {0: 'Early Bird'},
nfe: true,
origin: 'Infinity'
},
'Frigimon':{
types: ['Ice'],
bs: {hp:75, at:125, df:90, sa:80, sd:80, sp:105}, 
weightkg: 237,
abilities: {0: 'Iron Fist'},
origin: 'Infinity'
},
'Kuwagamon':{
types: ['Bug', 'Fighting'],
bs: {hp:65, at:135, df:95, sa:85, sd:70, sp:90}, 
weightkg: 372.5,
abilities: {0: 'Hyper Cutter'},
nfe: true,
origin: 'Infinity'
},
'Kabuterimon':{
types: ['Bug', 'Electric'],
bs: {hp:80, at:110, df:125, sa:70, sd:85, sp:70}, 
weightkg: 400,
abilities: {0: 'Levitate'},
nfe: true,
origin: 'Infinity'
},
'Flymon':{
types: ['Electric', 'Poison'],
bs: {hp:70, at:122, df:80, sa:82, sd:55, sp:136}, 
weightkg: 55,
abilities: {0: 'Static'},
origin: 'Infinity'
},
'Vegiemon':{
types: ['Grass', 'Poison'],
bs: {hp:80, at:104, df:85, sa:106, sd:90, sp:90}, 
weightkg: 93,
abilities: {0: 'Prankster'},
origin: 'Infinity'
},
'RedVegiemon':{
types: ['Grass', 'Poison'],
bs: {hp:85, at:120, df:80, sa:100, sd:80, sp:100}, 
weightkg: 94,
abilities: {0: 'Poison Touch'},
origin: 'Infinity'
},
'Coelamon':{
types: ['Water', 'Steel'],
bs: {hp:90, at:95, df:100, sa:110, sd:95, sp:55}, 
weightkg: 321.5,
abilities: {0: 'Rough Skin'},
nfe: true,
origin: 'Infinity'
},
'Airdramon':{
types: ['Dragon', 'Flying'],
bs: {hp:90, at:130, df:70, sa:80, sd:70, sp:105}, 
weightkg: 242,
abilities: {0: 'Rock Head'},
origin: 'Infinity'
},
'Angemon':{
types: ['Fairy', 'Flying'],
bs: {hp:105, at:115, df:70, sa:90, sd:70, sp:105}, 
weightkg: 133.5,
abilities: {0: 'Long Reach'},
nfe: true,
origin: 'Infinity'
},
'WereGarurumon':{
types: ['Ice', 'Fighting'],
bs: {hp:85, at:130, df:80, sa:115, sd:85, sp:115}, 
weightkg: 257.5,
abilities: {0: 'Technician'},
nfe: true,
origin: 'Infinity'
},
'MegaKabuterimon':{
types: ['Bug', 'Electric'],
bs: {hp:105, at:120, df:150, sa:80, sd:95, sp:65}, 
weightkg: 986,
abilities: {0: 'Levitate'},
origin: 'Infinity'
},
'Garudamon':{
types: ['Fire', 'Flying'],
bs: {hp:90, at:138, df:80, sa:104, sd:75, sp:123}, 
weightkg: 645,
abilities: {0: 'Guts'},
origin: 'Infinity'
},
'Zudomon':{
types: ['Ice', 'Rock'],
bs: {hp:90, at:140, df:120, sa:92, sd:90, sp:78}, 
weightkg: 1547,
abilities: {0: 'Anger Point'},
origin: 'Infinity'
},
'MegaSeadramon':{
types: ['Water', 'Dragon'],
bs: {hp:90, at:120, df:100, sa:114, sd:74, sp:117}, 
weightkg: 485,
abilities: {0: 'Lightning Rod'},
origin: 'Infinity'
},
'Okuwamon':{
types: ['Bug', 'Fighting'],
bs: {hp:65, at:150, df:100, sa:117, sd:73, sp:110}, 
weightkg: 821,
abilities: {0: 'Hyper Cutter'},
origin: 'Infinity'
},
'Piximon':{
types: ['Fairy', 'Fighting'],
bs: {hp:85, at:120, df:85, sa:100, sd:90, sp:130}, 
weightkg: 49,
abilities: {0: 'Levitate'},
origin: 'Infinity'
},
'Lillymon':{
types: ['Grass', 'Fairy'],
bs: {hp:100, at:90, df:80, sa:138, sd:85, sp:117}, 
weightkg: 74.5,
abilities: {0: 'Opportunist'},
origin: 'Infinity'
},
'Whamon':{
types: ['Water', 'Normal'],
bs: {hp:100, at:125, df:110, sa:110, sd:105, sp:60}, 
weightkg: 1284,
abilities: {0: 'Rough Skin'},
origin: 'Infinity'
},
'Monzaemon':{
types: ['Normal', 'Fairy'],
bs: {hp:120, at:120, df:100, sa:100, sd:95, sp:70}, 
weightkg: 470,
abilities: {0: 'Pixilate'},
origin: 'Infinity'
},
'MagnaAngemon':{
types: ['Fairy', 'Flying'],
bs: {hp:95, at:120, df:85, sa:120, sd:85, sp:110}, 
weightkg: 238,
abilities: {0: 'Magic Guard'},
origin: 'Infinity'
},
'SaberLeomon':{
types: ['Electric', 'Fighting'],
bs: {hp:100, at:135, df:120, sa:105, sd:90, sp:140}, 
weightkg: 525,
abilities: {0: 'Iron Barbs'},
origin: 'Infinity'
},
'MetalGarurumon':{
types: ['Ice', 'Steel'],
bs: {hp:100, at:134, df:120, sa:126, sd:105, sp:125}, 
weightkg: 616,
abilities: {0: 'Technician'},
origin: 'Infinity'
},
'Machinedramon':{
types: ['Steel', 'Ghost'],
bs: {hp:76, at:145, df:135, sa:155, sd:125, sp:79}, 
weightkg: 1490,
abilities: {0: 'Mega Launcher'},
origin: 'Infinity'
},
'Omnimon':{
types: ['Fire', 'Ice'],
bs: {hp:115, at:145, df:120, sa:145, sd:120, sp:130}, 
weightkg: 470,
abilities: {0: 'Magic Guard'},
origin: 'Infinity'
},
'Pagumon':{
types: ['Poison'],
bs: {hp:35, at:30, df:30, sa:40, sd:35, sp:30}, 
weightkg: 13,
abilities: {0: 'Prankster'},
nfe: true,
origin: 'Infinity'
},
'Gazimon':{
types: ['Poison', 'Dark'],
bs: {hp:70, at:70, df:60, sa:80, sd:70, sp:70}, 
weightkg: 49,
abilities: {0: 'Prankster'},
nfe: true,
origin: 'Infinity'
},
'Etemon':{
types: ['Fighting', 'Ground'],
bs: {hp:80, at:130, df:90, sa:95, sd:92, sp:118}, 
weightkg: 117.5,
abilities: {0: 'Prankster'},
nfe: true,
origin: 'Infinity'
},
'MetalEtemon':{
types: ['Fighting', 'Steel'],
bs: {hp:100, at:140, df:120, sa:109, sd:130, sp:106}, 
weightkg: 278.5,
abilities: {0: 'Filter'},
origin: 'Infinity'
},
'Demidevimon':{
types: ['Flying', 'Poison'],
bs: {hp:70, at:69, df:66, sa:70, sd:70, sp:80}, 
weightkg: 30,
abilities: {0: 'Prankster'},
nfe: true,
origin: 'Infinity'
},
'Devimon':{
types: ['Flying', 'Poison'],
bs: {hp:85, at:125, df:70, sa:90, sd:80, sp:105}, 
weightkg: 112,
abilities: {0: 'Long Reach'},
nfe: true,
origin: 'Infinity'
},
'Bakemon':{
types: ['Poison', 'Ghost'],
bs: {hp:75, at:70, df:90, sa:114, sd:120, sp:81}, 
weightkg: 26,
abilities: {0: 'Cursed Body'},
nfe: true,
origin: 'Infinity'
},
'Keramon':{
types: ['Poison'],
bs: {hp:75, at:70, df:70, sa:70, sd:70, sp:70}, 
weightkg: 83,
abilities: {0: 'Prankster'},
nfe: true,
origin: 'Infinity'
},
'Infermon':{
types: ['Bug', 'Poison'],
bs: {hp:90, at:90, df:110, sa:120, sd:110, sp:110}, 
weightkg: 450,
abilities: {0: 'Prankster'},
nfe: true,
origin: 'Infinity'
},
'Diaboromon':{
types: ['Poison', 'Dark'],
bs: {hp:105, at:130, df:120, sa:151, sd:120, sp:129}, 
weightkg: 587,
abilities: {0: 'Dark Aura'},
origin: 'Infinity'
},
'Wizardmon':{
types: ['Psychic', 'Ghost'],
bs: {hp:80, at:100, df:70, sa:130, sd:75, sp:100}, 
weightkg: 75,
abilities: {0: 'Magic Bounce'},
origin: 'Infinity'
},
'Woodmon':{
types: ['Grass'],
bs: {hp:105, at:95, df:130, sa:70, sd:65, sp:60}, 
weightkg: 519,
abilities: {0: 'Super Luck'},
nfe: true,
origin: 'Infinity'
},
'Cherrymon':{
types: ['Grass', 'Poison'],
bs: {hp:105, at:130, df:130, sa:95, sd:65, sp:64}, 
weightkg: 1251,
abilities: {0: 'Sniper'},
nfe: true,
origin: 'Infinity'
},
'Puppetmon':{
types: ['Grass', 'Dark'],
bs: {hp:120, at:141, df:110, sa:120, sd:90, sp:119}, 
weightkg: 158,
abilities: {0: 'Sniper'},
origin: 'Infinity'
},
'MetalSeadramon':{
types: ['Steel', 'Dragon'],
bs: {hp:104, at:100, df:130, sa:145, sd:105, sp:121}, 
weightkg: 1485,
abilities: {0: 'Drizzle'},
origin: 'Infinity'
},
'Myotismon':{
types: ['Poison', 'Psychic'],
bs: {hp:100, at:119, df:94, sa:126, sd:80, sp:106}, 
weightkg: 238,
abilities: {0: 'Tough Claws'},
origin: 'Infinity'
},
'Phantomon':{
types: ['Poison', 'Ghost'],
bs: {hp:94, at:128, df:90, sa:100, sd:95, sp:103}, 
weightkg: 127.5,
abilities: {0: 'Cursed Body'},
nfe: true,
origin: 'Infinity'
},
'Piedmon':{
types: ['Ghost', 'Dark'],
bs: {hp:104, at:160, df:105, sa:108, sd:110, sp:118}, 
weightkg: 163.5,
abilities: {0: 'Cursed Body'},
origin: 'Infinity'
},
'Venus':{
types: ['Grass', 'Ground'],
bs: {hp:115, at:120, df:130, sa:75, sd:110, sp:80}, 
weightkg: 90,
abilities: {0: 'Magic Guard'},
origin: 'Infinity'
},
'Mars':{
types: ['Fire', 'Dragon'],
bs: {hp:80, at:130, df:110, sa:120, sd:75, sp:115}, 
weightkg: 60,
abilities: {0: 'No Guard'},
origin: 'Infinity'
},
'Mercury':{
types: ['Water', 'Ice'],
bs: {hp:130, at:75, df:80, sa:120, sd:115, sp:110}, 
weightkg: 90,
abilities: {0: 'Filter'},
origin: 'Infinity'
},
'Jupiter':{
types: ['Flying', 'Electric'],
bs: {hp:75, at:115, df:110, sa:80, sd:120, sp:130}, 
weightkg: 70,
abilities: {0: 'Friend Guard'},
origin: 'Infinity'
},

// Mariomon
'Piranha Plant':{
types: ['Grass'],
bs: {hp:60, at:75, df:55, sa:35, sd:35, sp:40}, 
weightkg: 7,
abilities: {0: 'Overgrow'},
nfe: true,
origin: 'Mariomon'
},
'Peewee Piranha':{
types: ['Grass'],
bs: {hp:85, at:100, df:75, sa:45, sd:45, sp:70}, 
weightkg: 13,
abilities: {0: 'Overgrow'},
nfe: true,
origin: 'Mariomon'
},
'Petey Piranha':{
types: ['Grass', 'Flying'],
bs: {hp:105, at:130, df:100, sa:55, sd:55, sp:85}, 
weightkg: 100,
abilities: {0: 'Overgrow'},
origin: 'Mariomon'
},
'Blooper':{
types: ['Water'],
bs: {hp:45, at:50, df:30, sa:60, sd:80, sp:35}, 
weightkg: 0.8,
abilities: {0: 'Torrent'},
nfe: true,
origin: 'Mariomon'
},
'Bubble Blooper':{
types: ['Water'],
bs: {hp:80, at:60, df:40, sa:90, sd:100, sp:50}, 
weightkg: 4.5,
abilities: {0: 'Torrent'},
nfe: true,
origin: 'Mariomon'
},
'Gooper Blooper':{
types: ['Water', 'Poison'],
bs: {hp:90, at:65, df:75, sa:130, sd:110, sp:60}, 
weightkg: 80,
abilities: {0: 'Torrent'},
origin: 'Mariomon'
},
'Bob-Omb':{
types: ['Fire'],
bs: {hp:105, at:70, df:25, sa:50, sd:20, sp:30}, 
weightkg: 10.4,
abilities: {0: 'Blaze'},
nfe: true,
origin: 'Mariomon'
},
'Chuckya':{
types: ['Fire', 'Fighting'],
bs: {hp:150, at:100, df:30, sa:65, sd:30, sp:45}, 
weightkg: 200,
abilities: {0: 'Blaze'},
nfe: true,
origin: 'Mariomon'
},
'King Bob-Omb':{
types: ['Fire', 'Fighting'],
bs: {hp:185, at:120, df:45, sa:80, sd:45, sp:55}, 
weightkg: 500,
abilities: {0: 'Blaze'},
origin: 'Mariomon'
},
'Goomba':{
types: ['Normal'],
bs: {hp:35, at:50, df:25, sa:20, sd:35, sp:80}, 
weightkg: 6,
abilities: {0: 'Quick Feet'},
nfe: true,
origin: 'Mariomon'
},
'Goomba Stack':{
types: ['Normal'],
bs: {hp:105, at:100, df:50, sa:60, sd:60, sp:40}, 
weightkg: 24,
abilities: {0: 'Quick Feet'},
origin: 'Mariomon'
},
'Ant Trooper':{
types: ['Bug'],
bs: {hp:35, at:55, df:40, sa:30, sd:40, sp:20}, 
weightkg: 2.2,
abilities: {0: 'Swarm'},
nfe: true,
origin: 'Mariomon'
},
'Horned Ant Trooper':{
types: ['Bug', 'Steel'],
bs: {hp:70, at:85, df:90, sa:50, sd:55, sp:45}, 
weightkg: 4,
abilities: {0: 'Swarm'},
origin: 'Mariomon'
},
'Cheep Cheep':{
types: ['Water'],
bs: {hp:55, at:40, df:60, sa:35, sd:30, sp:45}, 
weightkg: 10,
abilities: {0: 'Swift Swim'},
nfe: true,
origin: 'Mariomon'
},
'Cheep Chomp':{
types: ['Water'],
bs: {hp:85, at:60, df:90, sa:50, sd:45, sp:55}, 
weightkg: 39,
abilities: {0: 'Swift Swim'},
nfe: true,
origin: 'Mariomon'
},
'Porcupuffer':{
types: ['Water', 'Poison'],
bs: {hp:100, at:95, df:95, sa:70, sd:75, sp:65}, 
weightkg: 48,
abilities: {0: 'Swift Swim'},
origin: 'Mariomon'
},
'Podoboo':{
types: ['Fire'],
bs: {hp:60, at:80, df:20, sa:35, sd:40, sp:100}, 
weightkg: 38,
abilities: {0: 'Magma Armor'},
nfe: true,
origin: 'Mariomon'
},
'Blargg':{
types: ['Fire', 'Dragon'],
bs: {hp:95, at:60, df:100, sa:125, sd:80, sp:80}, 
weightkg: 235,
abilities: {0: 'Magma Armor'},
origin: 'Mariomon'
},
'Biddybud':{
types: ['Normal'],
bs: {hp:35, at:50, df:45, sa:35, sd:45, sp:50}, 
weightkg: 4,
abilities: {0: 'Keen Eye'},
nfe: true,
origin: 'Mariomon'
},
'Parabiddy':{
types: ['Normal', 'Flying'],
bs: {hp:70, at:85, df:70, sa:70, sd:60, sp:75}, 
weightkg: 24,
abilities: {0: 'Keen Eye'},
origin: 'Mariomon'
},
'Shy Guy':{
types: ['Normal'],
bs: {hp:44, at:44, df:44, sa:44, sd:44, sp:44}, 
weightkg: 7,
abilities: {0: 'Battle Armor'},
nfe: true,
origin: 'Mariomon'
},
'Sniffit':{
types: ['Normal', 'Steel'],
bs: {hp:74, at:64, df:114, sa:124, sd:64, sp:54}, 
weightkg: 8.5,
abilities: {0: 'Battle Armor'},
origin: 'Mariomon'
},
'Fuzzy':{
types: ['Bug', 'Dark'],
bs: {hp:40, at:20, df:25, sa:20, sd:30, sp:50}, 
weightkg: 8.4,
abilities: {0: 'Schooling'},
origin: 'Mariomon'
},
'Fuzzy-Swarm':{
types: ['Bug', 'Dark'],
bs: {hp:40, at:130, df:135, sa:130, sd:135, sp:50}, 
weightkg: 84,
abilities: {0: 'Schooling'},
origin: 'Mariomon'
},
'Lava Drop':{
types: ['Fire'],
bs: {hp:70, at:50, df:40, sa:85, sd:65, sp:110}, 
weightkg: 7,
abilities: {0: 'Flame Body'},
origin: 'Mariomon'
},
'Monty Mole':{
types: ['Ground'],
bs: {hp:50, at:75, df:85, sa:20, sd:30, sp:40}, 
weightkg: 8.5,
abilities: {0: 'Sand Veil'},
nfe: true,
origin: 'Mariomon'
},
'Mega Mole':{
types: ['Ground'],
bs: {hp:75, at:95, df:115, sa:25, sd:50, sp:45}, 
weightkg: 40.4,
abilities: {0: 'Sand Veil'},
nfe: true,
origin: 'Mariomon'
},
'Major Burrows':{
types: ['Ground', 'Steel'],
bs: {hp:100, at:115, df:135, sa:45, sd:70, sp:50}, 
weightkg: 220,
abilities: {0: 'Arena Trap'},
origin: 'Mariomon'
},
'Thwimp':{
types: ['Rock'],
bs: {hp:20, at:45, df:85, sa:10, sd:15, sp:5}, 
weightkg: 20,
abilities: {0: 'Sturdy'},
nfe: true,
origin: 'Mariomon'
},
'Thwomp':{
types: ['Rock'],
bs: {hp:100, at:90, df:175, sa:50, sd:60, sp:10}, 
weightkg: 105,
abilities: {0: 'Sturdy'},
origin: 'Mariomon'
},
'Whomp':{
types: ['Ground', 'Rock'],
bs: {hp:70, at:100, df:175, sa:30, sd:45, sp:35}, 
weightkg: 180,
abilities: {0: 'Sand Force'},
origin: 'Mariomon'
},
'Boo':{
types: ['Ghost'],
bs: {hp:80, at:30, df:25, sa:50, sd:90, sp:20}, 
weightkg: 0.1,
abilities: {0: 'Levitate'},
nfe: true,
origin: 'Mariomon'
},
'Balloon Boo':{
types: ['Ghost'],
bs: {hp:130, at:40, df:40, sa:70, sd:100, sp:35}, 
weightkg: 15,
abilities: {0: 'Levitate'},
nfe: true,
origin: 'Mariomon'
},
'King Boo':{
types: ['Ghost', 'Dark'],
bs: {hp:110, at:55, df:60, sa:90, sd:130, sp:50}, 
weightkg: 40.5,
abilities: {0: 'Levitate'},
origin: 'Mariomon'
},
'Dino Torch':{
types: ['Fire'],
bs: {hp:45, at:70, df:30, sa:60, sd:20, sp:25}, 
weightkg: 19,
abilities: {0: 'Flash Fire'},
nfe: true,
origin: 'Mariomon'
},
'Dino Rhino':{
types: ['Fire', 'Ground'],
bs: {hp:115, at:90, df:60, sa:90, sd:40, sp:50}, 
weightkg: 115,
abilities: {0: 'Flash Fire'},
origin: 'Mariomon'
},
'Rex':{
types: ['Dragon'],
bs: {hp:110, at:130, df:65, sa:60, sd:65, sp:95}, 
weightkg: 18,
abilities: {0: 'Defeatist'},
origin: 'Mariomon'
},
'Rex-Squished':{
types: ['Dragon'],
bs: {hp:110, at:130, df:65, sa:60, sd:65, sp:95}, 
weightkg: 18,
abilities: {0: 'Defeatist'},
origin: 'Mariomon'
},
'Baby Yoshi':{
types: ['Normal'],
bs: {hp:65, at:55, df:55, sa:50, sd:55, sp:45}, 
weightkg: 29.7,
abilities: {0: 'Run Away'},
nfe: true,
origin: 'Mariomon'
},
'Yoshi':{
types: ['Normal'],
bs: {hp:80, at:60, df:80, sa:55, sd:80, sp:60}, 
weightkg: 47,
abilities: {0: 'Run Away'},
nfe: true,
origin: 'Mariomon'
},
'Yoob':{
types: ['Normal', 'Dragon'],
bs: {hp:140, at:95, df:125, sa:80, sd:100, sp:60}, 
weightkg: 999.9,
abilities: {0: 'Mold Breaker'},
origin: 'Mariomon'
},
'Red Yoshi':{
types: ['Fire'],
bs: {hp:65, at:130, df:60, sa:95, sd:110, sp:65}, 
weightkg: 47,
abilities: {0: 'Flame Body'},
origin: 'Mariomon'
},
'Blue Yoshi':{
types: ['Flying'],
bs: {hp:65, at:65, df:60, sa:110, sd:95, sp:130}, 
weightkg: 47,
abilities: {0: 'Cloud Nine'},
origin: 'Mariomon'
},
'Yellow Yoshi':{
types: ['Ground'],
bs: {hp:95, at:110, df:130, sa:65, sd:65, sp:60}, 
weightkg: 47,
abilities: {0: 'Sand Force'},
origin: 'Mariomon'
},
'Birdo':{
types: ['Fairy'],
bs: {hp:65, at:65, df:95, sa:130, sd:110, sp:60}, 
weightkg: 23.5,
abilities: {0: 'Cute Charm'},
origin: 'Mariomon'
},
'Crazee Dayzee':{
types: ['Fairy'],
bs: {hp:50, at:30, df:15, sa:60, sd:50, sp:60}, 
weightkg: 0.1,
abilities: {0: 'Run Away'},
nfe: true,
origin: 'Mariomon'
},
'Amazy Dayzee':{
types: ['Fairy'],
bs: {hp:65, at:45, df:30, sa:140, sd:75, sp:80}, 
weightkg: 0.9,
abilities: {0: 'Run Away'},
origin: 'Mariomon'
},
'Fang':{
types: ['Poison', 'Flying'],
bs: {hp:40, at:45, df:35, sa:30, sd:40, sp:55}, 
weightkg: 2.1,
abilities: {0: 'Inner Focus'},
nfe: true,
origin: 'Mariomon'
},
'Swoop':{
types: ['Poison', 'Flying'],
bs: {hp:75, at:80, df:70, sa:65, sd:75, sp:90}, 
weightkg: 10.5,
abilities: {0: 'Inner Focus'},
origin: 'Mariomon'
},
'Bald Cleft':{
types: ['Rock'],
bs: {hp:65, at:45, df:100, sa:30, sd:50, sp:80}, 
weightkg: 18,
abilities: {0: 'Sturdy'},
nfe: true,
origin: 'Mariomon'
},
'Iron Cleft':{
types: ['Rock', 'Steel'],
bs: {hp:70, at:90, df:110, sa:30, sd:60, sp:90}, 
weightkg: 102,
abilities: {0: 'Sturdy'},
nfe: true,
origin: 'Mariomon'
},
'Bristle':{
types: ['Rock', 'Steel'],
bs: {hp:20, at:35, df:230, sa:15, sd:200, sp:5}, 
weightkg: 260,
abilities: {0: 'Iron Barbs'},
origin: 'Mariomon'
},
'Bullet Bill':{
types: ['Steel'],
bs: {hp:35, at:50, df:70, sa:40, sd:35, sp:100}, 
weightkg: 120,
abilities: {0: 'Levitate'},
nfe: true,
origin: 'Mariomon'
},
'Banzai Bill':{
types: ['Steel'],
bs: {hp:65, at:90, df:110, sa:55, sd:50, sp:130}, 
weightkg: 360,
abilities: {0: 'Levitate'},
origin: 'Mariomon'
},
'Duplighost':{
types: ['Ghost'],
bs: {hp:50, at:50, df:50, sa:50, sd:50, sp:50}, 
weightkg: 0.4,
abilities: {0: 'Imposter'},
origin: 'Mariomon'
},
'Broozer':{
types: ['Ghost', 'Fighting'],
bs: {hp:65, at:100, df:100, sa:30, sd:75, sp:110}, 
weightkg: 22,
abilities: {0: 'Iron Fist'},
origin: 'Mariomon'
},
"Chargin' Chuck":{
types: ['Fighting'],
bs: {hp:120, at:95, df:110, sa:30, sd:80, sp:45}, 
weightkg: 55,
abilities: {0: 'Defiant'},
origin: 'Mariomon'
},
'Baby Penguin':{
types: ['Ice'],
bs: {hp:35, at:40, df:50, sa:40, sd:55, sp:40}, 
weightkg: 5.2,
abilities: {0: 'Slush Rush'},
nfe: true,
origin: 'Mariomon'
},
'Penguin':{
types: ['Ice'],
bs: {hp:130, at:80, df:70, sa:80, sd:95, sp:50}, 
weightkg: 23,
abilities: {0: 'Slush Rush'},
origin: 'Mariomon'
},
'Buzzy Beetle':{
types: ['Dark'],
bs: {hp:35, at:50, df:110, sa:20, sd:100, sp:15}, 
weightkg: 8.5,
abilities: {0: 'Quick Feet'},
nfe: true,
origin: 'Mariomon'
},
'Spike Top':{
types: ['Dark', 'Steel'],
bs: {hp:50, at:65, df:150, sa:35, sd:130, sp:20}, 
weightkg: 15,
abilities: {0: 'Levitate'},
origin: 'Mariomon'
},
'Spiny':{
types: ['Steel'],
bs: {hp:50, at:50, df:100, sa:30, sd:80, sp:20}, 
weightkg: 24,
abilities: {0: 'Shell Armor'},
nfe: true,
origin: 'Mariomon'
},
'Lakitu':{
types: ['Steel', 'Flying'],
bs: {hp:80, at:100, df:50, sa:70, sd:50, sp:110}, 
weightkg: 42.9,
abilities: {0: 'Cloud Nine'},
origin: 'Mariomon'
},
'Spike':{
types: ['Normal'],
bs: {hp:65, at:30, df:60, sa:30, sd:35, sp:20}, 
weightkg: 25,
abilities: {0: 'Stamina'},
nfe: true,
origin: 'Mariomon'
},
'Clubba':{
types: ['Normal', 'Steel'],
bs: {hp:105, at:70, df:100, sa:50, sd:60, sp:35}, 
weightkg: 120,
abilities: {0: 'Stamina'},
origin: 'Mariomon'
},
'Pokey':{
types: ['Ground', 'Grass'],
bs: {hp:115, at:85, df:45, sa:50, sd:45, sp:55}, 
weightkg: 28,
abilities: {0: 'Sand Force'},
nfe: true,
origin: 'Mariomon'
},
'Poison Pokey':{
types: ['Ground', 'Poison'],
bs: {hp:100, at:90, df:100, sa:50, sd:75, sp:55}, 
weightkg: 33,
abilities: {0: 'Toxic Debris'},
origin: 'Mariomon'
},
'Koopa Troopa':{
types: ['Normal'],
bs: {hp:41, at:50, df:70, sa:40, sd:50, sp:60}, 
weightkg: 9,
abilities: {0: 'Shell Armor'},
nfe: true,
origin: 'Mariomon'
},
'Paratroopa':{
types: ['Flying'],
bs: {hp:71, at:100, df:50, sa:50, sd:50, sp:120}, 
weightkg: 11,
abilities: {0: 'Shell Armor'},
origin: 'Mariomon'
},
'Dry Bones':{
types: ['Dark', 'Ground'],
bs: {hp:1, at:100, df:50, sa:50, sd:50, sp:40}, 
weightkg: 3.5,
abilities: {0: 'Wonder Guard'},
origin: 'Mariomon'
},
'Cataquack':{
types: ['Water', 'Fighting'],
bs: {hp:50, at:75, df:60, sa:75, sd:60, sp:50}, 
weightkg: 33.9,
abilities: {0: 'Mega Launcher'},
nfe: true,
origin: 'Mariomon'
},
'Plungelo':{
types: ['Water', 'Fighting'],
bs: {hp:70, at:90, df:80, sa:110, sd:80, sp:70}, 
weightkg: 54,
abilities: {0: 'Mega Launcher'},
origin: 'Mariomon'
},
'Chain Chomp':{
types: ['Steel'],
bs: {hp:90, at:130, df:110, sa:45, sd:70, sp:35}, 
weightkg: 149.5,
abilities: {0: 'Intimidate'},
origin: 'Mariomon'
},
'Hammer Bro':{
types: ['Normal'],
bs: {hp:80, at:100, df:80, sa:100, sd:70, sp:70}, 
weightkg: 1.2,
abilities: {0: 'Forecast'},
origin: 'Mariomon'
},
'Fire Bro':{
types: ['Fire'],
bs: {hp:80, at:100, df:80, sa:100, sd:70, sp:70}, 
weightkg: 1.2,
abilities: {0: 'Forecast'},
origin: 'Mariomon'
},
'Boomerang Bro':{
types: ['Flying'],
bs: {hp:80, at:100, df:80, sa:100, sd:70, sp:70}, 
weightkg: 1.2,
abilities: {0: 'Forecast'},
origin: 'Mariomon'
},
'Ice Bro':{
types: ['Ice'],
bs: {hp:80, at:100, df:80, sa:100, sd:70, sp:70}, 
weightkg: 1.2,
abilities: {0: 'Forecast'},
origin: 'Mariomon'
},
'Bully':{
types: ['Rock'],
bs: {hp:50, at:90, df:110, sa:25, sd:40, sp:40}, 
weightkg: 262.4,
abilities: {0: 'Solid Rock'},
nfe: true,
origin: 'Mariomon'
},
'Chill Bully':{
types: ['Ice', 'Rock'],
bs: {hp:75, at:110, df:140, sa:45, sd:70, sp:60}, 
weightkg: 505,
abilities: {0: 'Ice Body'},
origin: 'Mariomon'
},
'Gushen':{
types: ['Water'],
bs: {hp:40, at:30, df:50, sa:60, sd:50, sp:100}, 
weightkg: 45.5,
abilities: {0: 'Swift Swim'},
nfe: true,
origin: 'Mariomon'
},
'Mollusque-Lanceur':{
types: ['Water', 'Fire'],
bs: {hp:120, at:55, df:90, sa:110, sd:100, sp:25}, 
weightkg: 195,
abilities: {0: 'Swift Swim'},
origin: 'Mariomon'
},
'T-Rex':{
types: ['Dragon'],
bs: {hp:85, at:130, df:110, sa:60, sd:50, sp:80}, 
weightkg: 480,
abilities: {0: 'Intimidate'},
origin: 'Mariomon'
},
'Foo':{
types: ['Ice', 'Fairy'],
bs: {hp:60, at:40, df:50, sa:65, sd:65, sp:55}, 
weightkg: 0.8,
abilities: {0: 'Competitive'},
nfe: true,
origin: 'Mariomon'
},
'Ty-Foo':{
types: ['Ice', 'Fairy'],
bs: {hp:80, at:60, df:70, sa:80, sd:110, sp:90}, 
weightkg: 1.2,
abilities: {0: 'Competitive'},
origin: 'Mariomon'
},
'Uproot':{
types: ['Grass', 'Dark'],
bs: {hp:55, at:90, df:105, sa:50, sd:80, sp:100}, 
weightkg: 15.5,
abilities: {0: 'Disguise'},
origin: 'Mariomon'
},
'Uproot-Naked':{
types: ['Grass', 'Dark'],
bs: {hp:55, at:90, df:105, sa:50, sd:80, sp:100}, 
weightkg: 15.5,
abilities: {0: 'Disguise'},
origin: 'Mariomon'
},
'Klepto':{
types: ['Flying', 'Ground'],
bs: {hp:100, at:95, df:105, sa:60, sd:65, sp:80}, 
weightkg: 39.5,
abilities: {0: 'Keen Eye'},
origin: 'Mariomon'
},
"Strollin' Stu":{
types: ['Water'],
bs: {hp:50, at:80, df:80, sa:80, sd:80, sp:80}, 
weightkg: 28.5,
abilities: {0: 'Innards Out'},
origin: 'Mariomon'
},
'Chincho':{
types: ['Normal', 'Ghost'],
bs: {hp:100, at:100, df:60, sa:90, sd:70, sp:100}, 
weightkg: 35,
abilities: {0: 'Mummy'},
origin: 'Mariomon'
},
'Fighter Fly':{
types: ['Fighting', 'Flying'],
bs: {hp:55, at:55, df:45, sa:30, sd:30, sp:80}, 
weightkg: 1,
abilities: {0: 'Guts'},
nfe: true,
origin: 'Mariomon'
},
'Super Fly':{
types: ['Fighting', 'Flying'],
bs: {hp:80, at:80, df:65, sa:60, sd:60, sp:130}, 
weightkg: 17.5,
abilities: {0: 'Guts'},
origin: 'Mariomon'
},
'Beanie':{
types: ['Grass'],
bs: {hp:50, at:65, df:65, sa:30, sd:35, sp:50}, 
weightkg: 4,
abilities: {0: 'Solar Power'},
nfe: true,
origin: 'Mariomon'
},
'Parabeanie':{
types: ['Grass', 'Flying'],
bs: {hp:70, at:80, df:95, sa:50, sd:55, sp:80}, 
weightkg: 6.4,
abilities: {0: 'Solar Power'},
origin: 'Mariomon'
},
'Wiggler':{
types: ['Bug', 'Fighting'],
bs: {hp:75, at:125, df:105, sa:60, sd:75, sp:60}, 
weightkg: 200.5,
abilities: {0: 'Anger Point'},
origin: 'Mariomon'
},
'Wiggler-Angry':{
types: ['Bug', 'Fighting'],
bs: {hp:75, at:125, df:105, sa:60, sd:75, sp:60}, 
weightkg: 200.5,
abilities: {0: 'Anger Point'},
origin: 'Mariomon'
},
'Trunkle':{
types: ['Grass', 'Fighting'],
bs: {hp:100, at:105, df:130, sa:50, sd:50, sp:50}, 
weightkg: 38,
abilities: {0: 'Regenerator'},
origin: 'Mariomon'
},
'Maw-Maw':{
types: ['Dragon', 'Normal'],
bs: {hp:77, at:110, df:103, sa:55, sd:90, sp:50}, 
weightkg: 75.6,
abilities: {0: 'Cheek Pouch'},
origin: 'Mariomon'
},
'Shrooblet':{
types: ['Poison'],
bs: {hp:70, at:40, df:60, sa:20, sd:60, sp:25}, 
weightkg: 0.1,
abilities: {0: 'Poison Touch'},
nfe: true,
origin: 'Mariomon'
},
'Shroob':{
types: ['Poison'],
bs: {hp:85, at:60, df:80, sa:30, sd:80, sp:35}, 
weightkg: 10.5,
abilities: {0: 'Poison Touch'},
nfe: true,
origin: 'Mariomon'
},
'Shrooboid':{
types: ['Poison'],
bs: {hp:113, at:83, df:93, sa:43, sd:103, sp:53}, 
weightkg: 21,
abilities: {0: 'Poison Touch'},
origin: 'Mariomon'
},
'Crystal King':{
types: ['Ice', 'Ghost'],
bs: {hp:85, at:70, df:70, sa:135, sd:80, sp:80}, 
weightkg: 58.2,
abilities: {0: 'Refrigerate'},
origin: 'Mariomon'
},
'Pidgit':{
types: ['Psychic', 'Flying'],
bs: {hp:65, at:50, df:45, sa:90, sd:80, sp:100}, 
weightkg: 2.1,
abilities: {0: 'Magic Bounce'},
origin: 'Mariomon'
},
'Tuff Puff':{
types: ['Poison', 'Electric'],
bs: {hp:40, at:60, df:45, sa:65, sd:95, sp:35}, 
weightkg: 1,
abilities: {0: 'Neutralizing Gas'},
nfe: true,
origin: 'Mariomon'
},
'Huff n Puff':{
types: ['Poison', 'Electric'],
bs: {hp:65, at:85, df:70, sa:90, sd:120, sp:60}, 
weightkg: 2,
abilities: {0: 'Neutralizing Gas'},
origin: 'Mariomon'
},
'Minion':{
types: ['Ground'],
bs: {hp:60, at:50, df:65, sa:45, sd:50, sp:60}, 
weightkg: 7.6,
abilities: {0: 'Sand Force'},
nfe: true,
origin: 'Mariomon'
},
'Hisstocrat':{
types: ['Ground'],
bs: {hp:85, at:100, df:115, sa:65, sd:70, sp:75}, 
weightkg: 65.5,
abilities: {0: 'Sand Force'},
origin: 'Mariomon'
},
'Lil Sparky':{
types: ['Electric'],
bs: {hp:40, at:60, df:55, sa:30, sd:50, sp:100}, 
weightkg: 0.3,
abilities: {0: 'Motor Drive'},
nfe: true,
origin: 'Mariomon'
},
'Spark':{
types: ['Electric'],
bs: {hp:60, at:85, df:80, sa:50, sd:70, sp:150}, 
weightkg: 10.4,
abilities: {0: 'Motor Drive'},
origin: 'Mariomon'
},
'Handfake':{
types: ['Dark'],
bs: {hp:105, at:120, df:60, sa:105, sd:60, sp:50}, 
weightkg: 12.6,
abilities: {0: 'Illusion'},
origin: 'Mariomon'
},
'Sprangler':{
types: ['Bug', 'Poison'],
bs: {hp:55, at:50, df:60, sa:45, sd:25, sp:30}, 
weightkg: 8.5,
abilities: {0: 'Corrosion'},
nfe: true,
origin: 'Mariomon'
},
'Tarantox':{
types: ['Bug', 'Poison'],
bs: {hp:110, at:60, df:95, sa:60, sd:35, sp:40}, 
weightkg: 33.5,
abilities: {0: 'Corrosion'},
origin: 'Mariomon'
},
'Fish Bone':{
types: ['Water', 'Ghost'],
bs: {hp:65, at:105, df:40, sa:85, sd:40, sp:120}, 
weightkg: 23.4,
abilities: {0: 'Swift Swim'},
origin: 'Mariomon'
},
'Snoozorb':{
types: ['Electric', 'Steel'],
bs: {hp:85, at:100, df:80, sa:100, sd:80, sp:55}, 
weightkg: 66.6,
abilities: {0: 'Comatose'},
origin: 'Mariomon'
},
'Happy Moon':{
types: ['Fairy', 'Dark'],
bs: {hp:90, at:55, df:65, sa:106, sd:86, sp:70}, 
weightkg: 168,
abilities: {0: 'Shadow Shield'},
origin: 'Mariomon'
},
'Angry Sun':{
types: ['Fire'],
bs: {hp:90, at:106, df:86, sa:55, sd:65, sp:70}, 
weightkg: 154,
abilities: {0: 'Drought'},
origin: 'Mariomon'
},
'Luma':{
types: ['Psychic', 'Fairy'],
bs: {hp:150, at:5, df:5, sa:55, sd:105, sp:65}, 
weightkg: 3,
abilities: {0: 'Synchronize'},
nfe: true,
origin: 'Mariomon'
},
'Lubba':{
types: ['Psychic', 'Fairy'],
bs: {hp:255, at:10, df:10, sa:75, sd:135, sp:55}, 
weightkg: 40,
abilities: {0: 'Synchronize'},
origin: 'Mariomon'
},
'Starbag':{
types: ['Psychic'],
bs: {hp:90, at:60, df:65, sa:85, sd:100, sp:120}, 
weightkg: 7.5,
abilities: {0: 'Run Away'},
origin: 'Mariomon'
},
'Chill Virus':{
types: ['Ice'],
bs: {hp:50, at:70, df:93, sa:70, sd:93, sp:123}, 
weightkg: 0.3,
abilities: {0: 'Ice Body'},
origin: 'Mariomon'
},
'Fever Virus':{
types: ['Fire'],
bs: {hp:50, at:103, df:70, sa:103, sd:70, sp:103}, 
weightkg: 0.3,
abilities: {0: 'Flame Body'},
origin: 'Mariomon'
},
'Weird Virus':{
types: ['Electric'],
bs: {hp:50, at:80, df:103, sa:80, sd:103, sp:83}, 
weightkg: 0.3,
abilities: {0: 'Static'},
origin: 'Mariomon'
},
'Eerie':{
types: ['Ghost'],
bs: {hp:70, at:95, df:65, sa:95, sd:55, sp:40}, 
weightkg: 0.2,
abilities: {0: 'Perish Body'},
origin: 'Mariomon'
},
'Nipper':{
types: ['Grass'],
bs: {hp:60, at:65, df:85, sa:60, sd:40, sp:15}, 
weightkg: 4,
abilities: {0: 'Battle Armor'},
nfe: true,
origin: 'Mariomon'
},
'Muncher':{
types: ['Grass', 'Dark'],
bs: {hp:90, at:110, df:100, sa:90, sd:60, sp:30}, 
weightkg: 6.4,
abilities: {0: 'Battle Armor'},
origin: 'Mariomon'
},
'Sumo Bro':{
types: ['Fighting'],
bs: {hp:120, at:110, df:95, sa:80, sd:30, sp:45}, 
weightkg: 39,
abilities: {0: 'Unseen Fist'},
origin: 'Mariomon'
},
'Mechakoopa':{
types: ['Steel', 'Electric'],
bs: {hp:40, at:85, df:100, sa:60, sd:60, sp:45}, 
weightkg: 33,
abilities: {0: 'Lightning Rod'},
nfe: true,
origin: 'Mariomon'
},
'Mechachomp':{
types: ['Steel', 'Electric'],
bs: {hp:50, at:115, df:130, sa:70, sd:70, sp:60}, 
weightkg: 105,
abilities: {0: 'Lightning Rod'},
origin: 'Mariomon'
},
'Pyoro':{
types: ['Flying', 'Dark'],
bs: {hp:100, at:105, df:75, sa:60, sd:40, sp:120}, 
weightkg: 27.3,
abilities: {0: 'Super Luck'},
origin: 'Mariomon'
},
'Toady':{
types: ['Psychic', 'Flying'],
bs: {hp:50, at:30, df:60, sa:85, sd:80, sp:60}, 
weightkg: 2,
abilities: {0: 'Prankster'},
nfe: true,
origin: 'Mariomon'
},
'Magikoopa':{
types: ['Psychic', 'Flying'],
bs: {hp:60, at:35, df:75, sa:125, sd:100, sp:110}, 
weightkg: 15,
abilities: {0: 'Prankster'},
origin: 'Mariomon'
},
'Mad Piano':{
types: ['Ghost'],
bs: {hp:72, at:150, df:53, sa:90, sd:43, sp:80}, 
weightkg: 71,
abilities: {0: 'Intimidate'},
origin: 'Mariomon'
},
'Freezie':{
types: ['Ice'],
bs: {hp:40, at:45, df:50, sa:70, sd:70, sp:30}, 
weightkg: 5.7,
abilities: {0: 'Snow Warning'},
nfe: true,
origin: 'Mariomon'
},
'Mr. Blizzard':{
types: ['Ice'],
bs: {hp:80, at:75, df:85, sa:120, sd:100, sp:60}, 
weightkg: 41,
abilities: {0: 'Snow Warning'},
origin: 'Mariomon'
},
'Heave-Ho':{
types: ['Electric'],
bs: {hp:70, at:85, df:150, sa:70, sd:95, sp:33}, 
weightkg: 42,
abilities: {0: 'Galvanize'},
origin: 'Mariomon'
},
'Mr. I':{
types: ['Psychic', 'Dark'],
bs: {hp:85, at:100, df:110, sa:80, sd:90, sp:5}, 
weightkg: 40,
abilities: {0: 'Keen Eye'},
origin: 'Mariomon'
},
'Maw-Ray':{
types: ['Water'],
bs: {hp:100, at:150, df:90, sa:70, sd:40, sp:50}, 
weightkg: 235,
abilities: {0: 'Rough Skin'},
origin: 'Mariomon'
},
'Ukiki':{
types: ['Normal', 'Ground'],
bs: {hp:70, at:90, df:80, sa:60, sd:60, sp:100}, 
weightkg: 11.5,
abilities: {0: 'Vital Spirit'},
origin: 'Mariomon'
},
'Skeeter':{
types: ['Bug', 'Water'],
bs: {hp:40, at:65, df:30, sa:30, sd:20, sp:80}, 
weightkg: 1.7,
abilities: {0: 'Swarm'},
nfe: true,
origin: 'Mariomon'
},
'Scuttlebug':{
types: ['Bug', 'Water'],
bs: {hp:55, at:95, df:45, sa:60, sd:35, sp:110}, 
weightkg: 82,
abilities: {0: 'Swarm'},
origin: 'Mariomon'
},
'Twirlip':{
types: ['Grass', 'Fairy'],
bs: {hp:40, at:30, df:70, sa:40, sd:70, sp:60}, 
weightkg: 0.6,
abilities: {0: 'Prankster'},
nfe: true,
origin: 'Mariomon'
},
'Spindrift':{
types: ['Grass', 'Fairy'],
bs: {hp:60, at:65, df:75, sa:80, sd:85, sp:120}, 
weightkg: 6.6,
abilities: {0: 'Prankster'},
origin: 'Mariomon'
},
'Bandit':{
types: ['Dark'],
bs: {hp:60, at:115, df:85, sa:65, sd:50, sp:90}, 
weightkg: 7,
abilities: {0: 'Pickpocket'},
origin: 'Mariomon'
},
'X-Naut':{
types: ['Normal'],
bs: {hp:70, at:80, df:75, sa:50, sd:60, sp:70}, 
weightkg: 9,
abilities: {0: 'Scrappy'},
nfe: true,
origin: 'Mariomon'
},
'Elite X-Naut':{
types: ['Normal', 'Dark'],
bs: {hp:100, at:105, df:90, sa:60, sd:80, sp:80}, 
weightkg: 34.5,
abilities: {0: 'Scrappy'},
origin: 'Mariomon'
},
'Jabble':{
types: ['Bug', 'Flying'],
bs: {hp:25, at:40, df:50, sa:40, sd:50, sp:60}, 
weightkg: 0.2,
abilities: {0: 'Swarm'},
nfe: true,
origin: 'Mariomon'
},
'Jabbi':{
types: ['Bug', 'Flying'],
bs: {hp:60, at:110, df:75, sa:110, sd:75, sp:40}, 
weightkg: 7.5,
abilities: {0: 'Swarm'},
origin: 'Mariomon'
},
'Ghost Mouse':{
types: ['Ghost'],
bs: {hp:30, at:60, df:40, sa:25, sd:35, sp:75}, 
weightkg: 2.3,
abilities: {0: 'Frisk'},
nfe: true,
origin: 'Mariomon'
},
'Twirler':{
types: ['Ghost'],
bs: {hp:145, at:120, df:75, sa:50, sd:60, sp:45}, 
weightkg: 12.5,
abilities: {0: 'Frisk'},
origin: 'Mariomon'
},
'Brolder':{
types: ['Rock'],
bs: {hp:40, at:50, df:70, sa:30, sd:50, sp:30}, 
weightkg: 16,
abilities: {0: 'Steam Engine'},
nfe: true,
origin: 'Mariomon'
},
'Boss Brolder':{
types: ['Rock', 'Fire'],
bs: {hp:110, at:90, df:120, sa:70, sd:90, sp:30}, 
weightkg: 240,
abilities: {0: 'Steam Engine'},
origin: 'Mariomon'
},
'Phanto':{
types: ['Dark', 'Fairy'],
bs: {hp:60, at:50, df:75, sa:90, sd:65, sp:145}, 
weightkg: 1.5,
abilities: {0: 'Infiltrator'},
origin: 'Mariomon'
},
'Tweester':{
types: ['Ground'],
bs: {hp:60, at:80, df:60, sa:100, sd:110, sp:115}, 
weightkg: 0.1,
abilities: {0: 'Sand Stream'},
origin: 'Mariomon'
},
'Mini-Yux':{
types: ['Psychic'],
bs: {hp:40, at:20, df:70, sa:30, sd:50, sp:25}, 
weightkg: 1,
abilities: {0: 'Synchronize'},
nfe: true,
origin: 'Mariomon'
},
'Yux':{
types: ['Psychic'],
bs: {hp:60, at:80, df:125, sa:80, sd:100, sp:30}, 
weightkg: 21,
abilities: {0: 'Synchronize'},
origin: 'Mariomon'
},
'Exor':{
types: ['Steel'],
bs: {hp:80, at:120, df:140, sa:90, sd:120, sp:30}, 
weightkg: 400,
abilities: {0: 'Mold Breaker'},
origin: 'Mariomon'
},
'Hooktail':{
types: ['Fire', 'Dragon'],
bs: {hp:90, at:85, df:75, sa:100, sd:115, sp:115}, 
weightkg: 750,
abilities: {0: 'Berserk'},
origin: 'Mariomon'
},
'Gloomtail':{
types: ['Dark', 'Dragon'],
bs: {hp:85, at:115, df:115, sa:90, sd:75, sp:100}, 
weightkg: 750,
abilities: {0: 'Moxie'},
origin: 'Mariomon'
},
'Bonetail':{
types: ['Ghost', 'Dragon'],
bs: {hp:115, at:115, df:85, sa:100, sd:90, sp:75}, 
weightkg: 350,
abilities: {0: 'Multiscale'},
origin: 'Mariomon'
},
'Antasma':{
types: ['Dark'],
bs: {hp:100, at:50, df:60, sa:120, sd:60, sp:110}, 
weightkg: 50.5,
abilities: {0: 'Bad Dreams'},
origin: 'Mariomon'
},
'Sonic':{
types: ['Electric', 'Fighting'],
bs: {hp:70, at:143, df:50, sa:133, sd:50, sp:220}, 
weightkg: 35,
abilities: {0: 'Chaos Emeralds'},
origin: 'Mariomon'
},
'Super Sonic':{
types: ['Electric', 'Fighting'],
bs: {hp:124, at:153, df:75, sa:143, sd:75, sp:230}, 
weightkg: 55.7,
abilities: {0: 'Chaos Emeralds'},
origin: 'Mariomon'
},
'Tiptron':{
types: ['Fairy', 'Steel'],
bs: {hp:100, at:100, df:100, sa:100, sd:100, sp:100}, 
weightkg: 1,
abilities: {0: 'Download'},
origin: 'Mariomon'
},

// PoA 
'Ashenash':{
types: ['Fire'],
bs: {hp:57, at:31, df:45, sa:58, sd:41, sp:45}, 
weightkg: 70,
abilities: {0: 'Lightning Rod'},
nfe: true,
origin: 'Pokeathlon'
},
'Aviotion':{
types: ['Bug'],
bs: {hp:90, at:70, df:45, sa:70, sd:45, sp:100}, 
weightkg: 95,
abilities: {0: 'Swarm'},
nfe: true,
origin: 'Pokeathlon'
},
'Bahamist':{
types: ['Water', 'Dragon'],
bs: {hp:89, at:95, df:79, sa:70, sd:88, sp:101}, 
weightkg: 54,
abilities: {0: 'Sheer Force'},
origin: 'Pokeathlon'
},
'Barrimander':{
types: ['Psychic', 'Poison'],
bs: {hp:50, at:70, df:70, sa:80, sd:80, sp:105}, 
weightkg: 10,
abilities: {0: 'Own Tempo'},
origin: 'Pokeathlon'
},
'Berserker Gene':{
types: ['Psychic', 'Dragon'],
bs: {hp:99, at:139, df:101, sa:51, sd:93, sp:107}, 
weightkg: 5,
abilities: {0: 'Protosynthesis'},
origin: 'Pokeathlon'
},
'Bewitwing':{
types: ['Ghost', 'Fairy'],
bs: {hp:85, at:100, df:85, sa:62, sd:125, sp:90}, 
weightkg: 9,
abilities: {0: 'Serene Grace'},
origin: 'Pokeathlon'
},
'Blaziken-Delta-Mega':{
types: ['Psychic', 'Flying'],
bs: {hp:80, at:160, df:80, sa:130, sd:80, sp:100}, 
weightkg: 52,
abilities: {0: 'Magic Guard'},
origin: 'Pokeathlon'
},
'Bohememoss':{
types: ['Grass', 'Fairy'],
bs: {hp:79, at:97, df:79, sa:109, sd:79, sp:127}, 
weightkg: 124,
abilities: {0: 'Beast Boost'},
origin: 'Pokeathlon'
},
'Braskeptic':{
types: ['Steel'],
bs: {hp:110, at:106, df:100, sa:106, sd:109, sp:69}, 
weightkg: 163,
abilities: {0: 'Light Metal'},
origin: 'Pokeathlon'
},
'Bunnor':{
types: ['Normal', 'Ice'],
bs: {hp:30, at:75, df:25, sa:45, sd:35, sp:40}, 
weightkg: 2,
abilities: {0: 'Snow Cloak'},
nfe: true,
origin: 'Pokeathlon'
},
'Buntaki':{
types: ['Fire'],
bs: {hp:94, at:52, df:97, sa:108, sd:70, sp:81}, 
weightkg: 3.4,
abilities: {0: 'Flame Body'},
origin: 'Pokeathlon'
},
'Calobera':{
types: ['Grass', 'Ghost'],
bs: {hp:80, at:60, df:70, sa:104, sd:108, sp:94}, 
weightkg: 31.8,
abilities: {0: 'Grassy Surge'},
origin: 'Pokeathlon'
},
'Caramitti':{
types: ['Fairy', 'Flying'],
bs: {hp:89, at:73, df:35, sa:86, sd:72, sp:140}, 
weightkg: 0.9,
abilities: {0: 'Sweet Tooth'},
origin: 'Pokeathlon'
},
'Caramitti-Crazed':{
types: ['Fairy', 'Flying'],
bs: {hp:89, at:118, df:25, sa:131, sd:62, sp:140}, 
weightkg: 0.9,
abilities: {0: 'Sweet Tooth'},
origin: 'Pokeathlon'
},
'Carcharus':{
types: ['Rock', 'Ground'],
bs: {hp:74, at:107, df:98, sa:50, sd:59, sp:107}, 
weightkg: 210,
abilities: {0: 'Strong Jaw'},
origin: 'Pokeathlon'
},
'Catzelwyrm':{
types: ['Dragon', 'Fairy'],
bs: {hp:75, at:125, df:75, sa:75, sd:115, sp:90}, 
weightkg: 84,
abilities: {0: 'Technician'},
origin: 'Pokeathlon'
},
'Cetitan-Hisui':{
types: ['Water', 'Fire'],
bs: {hp:170, at:113, df:75, sa:40, sd:60, sp:63}, 
weightkg: 750,
abilities: {0: 'Water Compaction'},
origin: 'Pokeathlon'
},
'Chickix':{
types: ['Fighting', 'Flying'],
bs: {hp:46, at:70, df:34, sa:23, sd:24, sp:55}, 
weightkg: 40,
abilities: {0: 'Keen Eye'},
nfe: true,
origin: 'Pokeathlon'
},
'Chocogrif':{
types: ['Grass', 'Flying'],
bs: {hp:69, at:45, df:21, sa:21, sd:78, sp:13}, 
weightkg: 10,
abilities: {0: 'Gooey'},
nfe: true,
origin: 'Pokeathlon'
},
'Chronobour':{
types: ['Grass', 'Ground'],
bs: {hp:115, at:92, df:129, sa:92, sd:66, sp:66}, 
weightkg: 323.3,
abilities: {0: 'Shed Skin'},
origin: 'Pokeathlon'
},
'Conductree':{
types: ['Fire', 'Electric'],
bs: {hp:102, at:31, df:76, sa:100, sd:79, sp:96}, 
weightkg: 130,
abilities: {0: 'Lightning Rod'},
origin: 'Pokeathlon'
},
'Crayzigater':{
types: ['Water'],
bs: {hp:115, at:103, df:103, sa:57, sd:85, sp:33}, 
weightkg: 210,
abilities: {0: 'Immunity'},
origin: 'Pokeathlon'
},
'Crenibex':{
types: ['Rock'],
bs: {hp:100, at:111, df:130, sa:50, sd:84, sp:65}, 
weightkg: 485,
abilities: {0: 'Rock Head'},
origin: 'Pokeathlon'
},
'Dangonna':{
types: ['Normal'],
bs: {hp:30, at:46, df:50, sa:46, sd:60, sp:22}, 
weightkg: 0.6,
abilities: {0: 'Gooey'},
nfe: true,
origin: 'Pokeathlon'
},
'Decidueye-Olul':{
types: ['Rock', 'Dark'],
bs: {hp:80, at:110, df:85, sa:110, sd:90, sp:55}, 
weightkg: 44,
abilities: {0: 'Sniper'},
origin: 'Pokeathlon'
},
'Dracat':{
types: ['Dragon', 'Fairy'],
bs: {hp:40, at:85, df:45, sa:20, sd:85, sp:75}, 
weightkg: 0.2,
abilities: {0: 'Technician'},
nfe: true,
origin: 'Pokeathlon'
},
'Dracotion':{
types: ['Bug', 'Dragon'],
bs: {hp:120, at:100, df:75, sa:100, sd:75, sp:130}, 
weightkg: 95,
abilities: {0: 'Windy Wall'},
origin: 'Pokeathlon'
},
'Drifbozu':{
types: ['Water', 'Ghost'],
bs: {hp:150, at:34, df:70, sa:74, sd:60, sp:122}, 
weightkg: 2.5,
abilities: {0: 'Natural Cure'},
origin: 'Pokeathlon'
},
'Drifloon-Kitakami':{
types: ['Water', 'Ghost'],
bs: {hp:90, at:34, df:60, sa:44, sd:50, sp:72}, 
weightkg: 1.1,
abilities: {0: 'Natural Cure'},
nfe: true,
origin: 'Pokeathlon'
},
'Eggchell':{
types: ['Electric', 'Flying'],
bs: {hp:65, at:89, df:54, sa:42, sd:60, sp:80}, 
weightkg: 25,
abilities: {0: 'Defiant'},
nfe: true,
origin: 'Pokeathlon'
},
'Eidolburgh':{
types: ['Bug', 'Fairy'],
bs: {hp:93, at:72, df:117, sa:133, sd:132, sp:53}, 
weightkg: 266,
abilities: {0: 'Sanctuary'},
origin: 'Pokeathlon'
},
'Electrikitty':{
types: ['Ghost', 'Electric'],
bs: {hp:65, at:30, df:95, sa:55, sd:90, sp:35}, 
weightkg: 0.3,
abilities: {0: 'Filter'},
nfe: true,
origin: 'Pokeathlon'
},
'Electrode-Mega':{
types: ['Electric'],
bs: {hp:60, at:200, df:10, sa:110, sd:10, sp:200}, 
weightkg: 80,
abilities: {0: 'Kablooey'},
origin: 'Pokeathlon'
},
'Enchantobra':{
types: ['Fire', 'Fairy'],
bs: {hp:117, at:40, df:60, sa:117, sd:60, sp:116}, 
weightkg: 31.5,
abilities: {0: 'Cute Charm'},
origin: 'Pokeathlon'
},
'Entei-Supra':{
types: ['Ice'],
bs: {hp:115, at:115, df:85, sa:90, sd:75, sp:100}, 
weightkg: 198,
abilities: {0: 'Snow Warning'},
origin: 'Pokeathlon'
},
'Eyespy':{
types: ['Psychic'],
bs: {hp:40, at:20, df:20, sa:40, sd:20, sp:40}, 
weightkg: 5,
abilities: {0: 'Keen Eye'},
nfe: true,
origin: 'Pokeathlon'
},
'Feidan':{
types: ['Steel', 'Ghost'],
bs: {hp:80, at:80, df:130, sa:80, sd:130, sp:25}, 
weightkg: 125,
abilities: {0: 'Iron Barbs'},
origin: 'Pokeathlon'
},
'Felapstan':{
types: ['Ghost', 'Electric'],
bs: {hp:90, at:70, df:100, sa:105, sd:110, sp:100}, 
weightkg: 0.3,
abilities: {0: 'Multitasker'},
origin: 'Pokeathlon'
},
'Florges-Mega':{
types: ['Fairy'],
bs: {hp:78, at:55, df:108, sa:132, sd:184, sp:95}, 
weightkg: 10,
abilities: {0: 'Ivy Wall'},
origin: 'Pokeathlon'
},
'Fonspring':{
types: ['Water', 'Ground'],
bs: {hp:94, at:52, df:116, sa:98, sd:70, sp:65}, 
weightkg: 102.1,
abilities: {0: 'Weak Armor'},
origin: 'Pokeathlon'
},
'Furumo':{
types: ['Water', 'Ice'],
bs: {hp:85, at:99, df:69, sa:99, sd:69, sp:109}, 
weightkg: 6,
abilities: {0: 'Water Veil'},
origin: 'Pokeathlon'
},
'Gelazura':{
types: ['Water', 'Poison'],
bs: {hp:122, at:116, df:60, sa:77, sd:63, sp:92}, 
weightkg: 190,
abilities: {0: 'Torrent'},
origin: 'Pokeathlon'
},
'Gilotherma':{
types: ['Dragon', 'Ground'],
bs: {hp:111, at:65, df:99, sa:103, sd:82, sp:70}, 
weightkg: 124.3,
abilities: {0: 'Intimidate'},
origin: 'Pokeathlon'
},
'Golisopod-Shogun':{
types: ['Bug', 'Steel'],
bs: {hp:75, at:125, df:140, sa:60, sd:90, sp:40}, 
weightkg: 108,
abilities: {0: 'Bushido'},
origin: 'Pokeathlon'
},
'Grand Mirage':{
types: ['Dark', 'Fighting'],
bs: {hp:91, at:115, df:97, sa:101, sd:65, sp:101}, 
weightkg: 120,
abilities: {0: 'Protosynthesis'},
origin: 'Pokeathlon'
},
'Growlsome':{
types: ['Normal', 'Fighting'],
bs: {hp:124, at:128, df:70, sa:52, sd:62, sp:104}, 
weightkg: 160,
abilities: {0: 'Thick Fat'},
origin: 'Pokeathlon'
},
'Guarig':{
types: ['Water', 'Steel'],
bs: {hp:80, at:115, df:130, sa:35, sd:85, sp:30}, 
weightkg: 121,
abilities: {0: 'Hyper Cutter'},
origin: 'Pokeathlon'
},
'Harportia':{
types: ['Electric', 'Flying'],
bs: {hp:91, at:95, df:73, sa:62, sd:90, sp:124}, 
weightkg: 238,
abilities: {0: 'Defiant'},
origin: 'Pokeathlon'
},
'Heatran-Supra':{
types: ['Fire', 'Grass'],
bs: {hp:101, at:95, df:116, sa:95, sd:116, sp:77}, 
weightkg: 430,
abilities: {0: 'Dancer'},
origin: 'Pokeathlon'
},
'Heracross-Subarctic':{
types: ['Bug', 'Ice'],
bs: {hp:85, at:35, df:75, sa:135, sd:90, sp:80}, 
weightkg: 54,
abilities: {0: 'Compound Eyes'},
origin: 'Pokeathlon'
},
'Hydroupa':{
types: ['Ghost', 'Dragon'],
bs: {hp:90, at:81, df:108, sa:90, sd:99, sp:36}, 
weightkg: 28.3,
abilities: {0: 'Lernean'},
origin: 'Pokeathlon'
},
'Icyall':{
types: ['Psychic'],
bs: {hp:100, at:80, df:60, sa:140, sd:60, sp:80}, 
weightkg: 52,
abilities: {0: 'Multishot'},
origin: 'Pokeathlon'
},
'Imitotion':{
types: ['Bug'],
bs: {hp:70, at:50, df:25, sa:50, sd:25, sp:80}, 
weightkg: 95,
abilities: {0: 'Swarm'},
nfe: true,
origin: 'Pokeathlon'
},
'Incandele':{
types: ['Fire', 'Fairy'],
bs: {hp:100, at:76, df:115, sa:91, sd:66, sp:74}, 
weightkg: 10.1,
abilities: {0: 'Magic Bounce'},
origin: 'Pokeathlon'
},
'Incineroar-Olul':{
types: ['Fighting', 'Steel'],
bs: {hp:95, at:130, df:110, sa:65, sd:80, sp:50}, 
weightkg: 76.1,
abilities: {0: 'Iron Fist'},
origin: 'Pokeathlon'
},
'Iron Everlasting':{
types: ['Normal', 'Steel'],
bs: {hp:90, at:114, df:80, sa:76, sd:80, sp:130}, 
weightkg: 68,
abilities: {0: 'Quark Drive'},
origin: 'Pokeathlon'
},
'Jovianshk':{
types: ['Dragon', 'Psychic'],
bs: {hp:125, at:77, df:57, sa:123, sd:80, sp:98}, 
weightkg: 50.2,
abilities: {0: 'Slow Light'},
origin: 'Pokeathlon'
},
'Kaleidleon':{
types: ['Normal', 'Dragon'],
bs: {hp:70, at:100, df:60, sa:100, sd:140, sp:80}, 
weightkg: 80,
abilities: {0: 'Color Change'},
origin: 'Pokeathlon'
},
'Kleavor-Delta':{
types: ['Ice', 'Fire'],
bs: {hp:70, at:135, df:95, sa:45, sd:70, sp:85}, 
weightkg: 89,
abilities: {0: 'Hustle'},
origin: 'Pokeathlon'
},
'Larvitar-Delta':{
types: ['Dragon', 'Psychic'],
bs: {hp:50, at:64, df:50, sa:45, sd:50, sp:41}, 
weightkg: 72,
abilities: {0: 'Synchronize'},
nfe: true,
origin: 'Pokeathlon'
},
'Loxicant':{
types: ['Steel', 'Poison'],
bs: {hp:85, at:102, df:120, sa:45, sd:100, sp:68}, 
weightkg: 125,
abilities: {0: 'Poison Point'},
origin: 'Pokeathlon'
},
'Lunachi':{
types: ['Fairy', 'Dark'],
bs: {hp:108, at:87, df:72, sa:87, sd:72, sp:114}, 
weightkg: 11,
abilities: {0: 'Sacred Treasures'},
origin: 'Pokeathlon'
},
'Lunachi-Bestowed':{
types: ['Fairy', 'Dark'],
bs: {hp:108, at:87, df:72, sa:87, sd:72, sp:114}, 
weightkg: 11,
abilities: {0: 'Sacred Treasures'},
origin: 'Pokeathlon'
},
'Maggony':{
types: ['Bug'],
bs: {hp:35, at:11, df:12, sa:11, sd:12, sp:9}, 
weightkg: 2.4,
abilities: {0: 'Necromancy'},
origin: 'Pokeathlon'
},
'Magiliar':{
types: ['Fairy', 'Ghost'],
bs: {hp:40, at:66, df:32, sa:32, sd:79, sp:35}, 
weightkg: 3,
abilities: {0: 'Serene Grace'},
nfe: true,
origin: 'Pokeathlon'
},
'Magnegauss':{
types: ['Electric', 'Grass'],
bs: {hp:90, at:60, df:115, sa:130, sd:90, sp:50}, 
weightkg: 140,
abilities: {0: 'Magnet Pull'},
origin: 'Pokeathlon'
},
'Magnemite-Terof':{
types: ['Electric', 'Grass'],
bs: {hp:55, at:35, df:70, sa:85, sd:55, sp:25}, 
weightkg: 40,
abilities: {0: 'Magnet Pull'},
nfe: true,
origin: 'Pokeathlon'
},
'Magneton-Terof':{
types: ['Electric', 'Grass'],
bs: {hp:70, at:50, df:95, sa:120, sd:70, sp:60}, 
weightkg: 120,
abilities: {0: 'Magnet Pull'},
nfe: true,
origin: 'Pokeathlon'
},
'Manacra':{
types: ['Rock', 'Ghost'],
bs: {hp:50, at:60, df:95, sa:118, sd:87, sp:105}, 
weightkg: 72,
abilities: {0: 'Levitate'},
origin: 'Pokeathlon'
},
'Manacra-Plated':{
types: ['Steel', 'Ghost'],
bs: {hp:50, at:60, df:155, sa:80, sd:120, sp:50}, 
weightkg: 159,
abilities: {0: 'Levitate'},
origin: 'Pokeathlon'
},
'Meditao':{
types: ['Psychic', 'Fighting'],
bs: {hp:80, at:80, df:80, sa:80, sd:80, sp:80}, 
weightkg: 31.5,
abilities: {0: 'Inner Focus'},
origin: 'Pokeathlon'
},
'Mephistoxin':{
types: ['Poison', 'Steel'],
bs: {hp:70, at:126, df:80, sa:76, sd:60, sp:117}, 
weightkg: 90,
abilities: {0: 'Unaware'},
origin: 'Pokeathlon'
},
'Miasmiss':{
types: ['Fighting', 'Poison'],
bs: {hp:74, at:96, df:92, sa:118, sd:52, sp:108}, 
weightkg: 42.6,
abilities: {0: 'Neutralizing Gas'},
origin: 'Pokeathlon'
},
'Mjochiin':{
types: ['Water', 'Flying'],
bs: {hp:89, at:118, df:75, sa:98, sd:104, sp:76}, 
weightkg: 190,
abilities: {0: 'Wind Rider'},
origin: 'Pokeathlon'
},
'Mochimechi':{
types: ['Normal'],
bs: {hp:99, at:89, df:110, sa:46, sd:120, sp:63}, 
weightkg: 84,
abilities: {0: 'Gooey'},
origin: 'Pokeathlon'
},
'Monetoad':{
types: ['Ground'],
bs: {hp:148, at:168, df:74, sa:56, sd:94, sp:48}, 
weightkg: 113,
abilities: {0: 'Pickup'},
origin: 'Pokeathlon'
},
'Mosster':{
types: ['Rock', 'Grass'],
bs: {hp:120, at:90, df:120, sa:50, sd:100, sp:30}, 
weightkg: 2000,
abilities: {0: 'Water Absorb'},
origin: 'Pokeathlon'
},
'Nestitan':{
types: ['Grass', 'Flying'],
bs: {hp:100, at:52, df:160, sa:75, sd:65, sp:93}, 
weightkg: 364,
abilities: {0: 'Overcoat'},
origin: 'Pokeathlon'
},
'Niandertroll':{
types: ['Grass', 'Steel'],
bs: {hp:108, at:127, df:106, sa:90, sd:94, sp:75}, 
weightkg: 345,
abilities: {0: 'Seed Sower'},
origin: 'Pokeathlon'
},
'Ockthane':{
types: ['Ice', 'Electric'],
bs: {hp:87, at:93, df:62, sa:139, sd:121, sp:78}, 
weightkg: 17,
abilities: {0: 'Supreme Overlord'},
origin: 'Pokeathlon'
},
'Omecha':{
types: ['Electric', 'Normal'],
bs: {hp:84, at:42, df:69, sa:110, sd:104, sp:111}, 
weightkg: 24,
abilities: {0: 'Volt Absorb'},
origin: 'Pokeathlon'
},
'Paldemaria':{
types: ['Water', 'Fairy'],
bs: {hp:70, at:54, df:75, sa:105, sd:110, sp:106}, 
weightkg: 60,
abilities: {0: 'Regenerator'},
origin: 'Pokeathlon'
},
'Pandiz':{
types: ['Normal'],
bs: {hp:100, at:110, df:85, sa:60, sd:85, sp:100}, 
weightkg: 50,
abilities: {0: 'Own Tempo'},
origin: 'Pokeathlon'
},
'Parashukado':{
types: ['Bug', 'Ghost'],
bs: {hp:85, at:115, df:100, sa:85, sd:120, sp:20}, 
weightkg: 44,
abilities: {0: 'Effect Spore'},
origin: 'Pokeathlon'
},
'Penumbralith':{
types: ['Rock', 'Psychic'],
bs: {hp:80, at:45, df:120, sa:100, sd:100, sp:55}, 
weightkg: 420,
abilities: {0: 'Clairvoyance'},
origin: 'Pokeathlon'
},
'Pestri':{
types: ['Poison', 'Flying'],
bs: {hp:95, at:60, df:90, sa:100, sd:105, sp:80}, 
weightkg: 70,
abilities: {0: 'Poison Point'},
origin: 'Pokeathlon'
},
'Poltank':{
types: ['Bug', 'Normal'],
bs: {hp:93, at:83, df:122, sa:62, sd:104, sp:61}, 
weightkg: 253.5,
abilities: {0: 'Adaptive Armor'},
origin: 'Pokeathlon'
},
'Porygon2-Rhinian':{
types: ['Grass', 'Electric'],
bs: {hp:100, at:90, df:95, sa:100, sd:90, sp:40}, 
weightkg: 32.5,
abilities: {0: 'Early Bird'},
nfe: true,
origin: 'Pokeathlon'
},
'PorygonZ-Rhinian':{
types: ['Grass', 'Electric'],
bs: {hp:100, at:95, df:65, sa:135, sd:60, sp:80}, 
weightkg: 34,
abilities: {0: 'Early Bird'},
origin: 'Pokeathlon'
},
'Premotee':{
types: ['Water'],
bs: {hp:100, at:30, df:50, sa:70, sd:75, sp:35}, 
weightkg: 31.7,
abilities: {0: 'Stalwart'},
nfe: true,
origin: 'Pokeathlon'
},
'Primarina-Olul':{
types: ['Psychic', 'Fire'],
bs: {hp:80, at:50, df:84, sa:130, sd:116, sp:70}, 
weightkg: 44,
abilities: {0: 'Spitting Fire'},
origin: 'Pokeathlon'
},
'Pupitar-Delta':{
types: ['Dragon', 'Psychic'],
bs: {hp:70, at:84, df:70, sa:65, sd:70, sp:51}, 
weightkg: 152,
abilities: {0: 'Synchronize'},
nfe: true,
origin: 'Pokeathlon'
},
'Rabbicicle':{
types: ['Normal', 'Ice'],
bs: {hp:90, at:105, df:65, sa:65, sd:75, sp:100}, 
weightkg: 10,
abilities: {0: 'Snow Cloak'},
origin: 'Pokeathlon'
},
'Raikou-Supra':{
types: ['Rock'],
bs: {hp:90, at:85, df:75, sa:115, sd:100, sp:115}, 
weightkg: 178,
abilities: {0: 'Sand Stream'},
origin: 'Pokeathlon'
},
'Regimyo':{
types: ['Fighting'],
bs: {hp:80, at:150, df:150, sa:75, sd:50, sp:75}, 
weightkg: 255,
abilities: {0: 'Clear Body'},
origin: 'Pokeathlon'
},
'Rotom-Hisui':{
types: ['Poison', 'Fairy'],
bs: {hp:60, at:81, df:67, sa:50, sd:67, sp:115}, 
weightkg: 72,
abilities: {0: 'Dry Skin'},
origin: 'Pokeathlon'
},
'Rotom-Hisui-Armored':{
types: ['Poison', 'Ground'],
bs: {hp:60, at:105, df:97, sa:45, sd:97, sp:106}, 
weightkg: 159,
abilities: {0: 'Dry Skin'},
origin: 'Pokeathlon'
},
'Scaleslash':{
types: ['Ground', 'Fairy'],
bs: {hp:90, at:115, df:120, sa:45, sd:75, sp:105}, 
weightkg: 110,
abilities: {0: 'Sand Force'},
origin: 'Pokeathlon'
},
'Scaly Terror':{
types: ['Bug', 'Dragon'],
bs: {hp:75, at:127, df:73, sa:81, sd:83, sp:131}, 
weightkg: 120,
abilities: {0: 'Protosynthesis'},
origin: 'Pokeathlon'
},
'Sceptile-Delta-Mega':{
types: ['Dragon', 'Fighting'],
bs: {hp:70, at:110, df:75, sa:145, sd:85, sp:145}, 
weightkg: 70,
abilities: {0: 'No Guard'},
origin: 'Pokeathlon'
},
'Scorching Kiln':{
types: ['Ground', 'Fire'],
bs: {hp:81, at:63, df:105, sa:99, sd:135, sp:87}, 
weightkg: 343.3,
abilities: {0: 'Protosynthesis'},
origin: 'Pokeathlon'
},
'Sekrilon':{
types: ['Fighting', 'Flying'],
bs: {hp:80, at:120, df:70, sa:40, sd:70, sp:99}, 
weightkg: 72,
abilities: {0: 'Keen Eye'},
origin: 'Pokeathlon'
},
'Sekrilon-Mega':{
types: ['Fighting', 'Flying'],
bs: {hp:80, at:135, df:109, sa:55, sd:85, sp:115}, 
weightkg: 805,
abilities: {0: 'Scrappy'},
origin: 'Pokeathlon'
},
'Sinister Sickle':{
types: ['Poison', 'Flying'],
bs: {hp:79, at:121, df:73, sa:121, sd:73, sp:103}, 
weightkg: 150,
abilities: {0: 'Protosynthesis'},
origin: 'Pokeathlon'
},
'Sirentom':{
types: ['Ghost', 'Water'],
bs: {hp:150, at:70, df:62, sa:99, sd:105, sp:19}, 
weightkg: 449,
abilities: {0: 'Comatose'},
origin: 'Pokeathlon'
},
'Slowbro-Rhinian':{
types: ['Water', 'Steel'],
bs: {hp:95, at:110, df:100, sa:75, sd:80, sp:30}, 
weightkg: 118,
abilities: {0: 'Full Plate'},
origin: 'Pokeathlon'
},
'Slowking-Rhinian':{
types: ['Grass', 'Steel'],
bs: {hp:95, at:75, df:110, sa:105, sd:75, sp:30}, 
weightkg: 108,
abilities: {0: 'Full Plate'},
origin: 'Pokeathlon'
},
'Slowpoke-Rhinian':{
types: ['Grass', 'Water'],
bs: {hp:90, at:65, df:65, sa:40, sd:40, sp:15}, 
weightkg: 48,
abilities: {0: 'Berserk'},
nfe: true,
origin: 'Pokeathlon'
},
'Snorlax-Frost':{
types: ['Ground', 'Ice'],
bs: {hp:160, at:110, df:65, sa:65, sd:110, sp:30}, 
weightkg: 460,
abilities: {0: 'Thick Fat'},
origin: 'Pokeathlon'
},
'Snorlax-Frost-Mega':{
types: ['Ground', 'Ice'],
bs: {hp:160, at:157, df:80, sa:80, sd:123, sp:40}, 
weightkg: 805,
abilities: {0: 'Sheer Force'},
origin: 'Pokeathlon'
},
'Snowiibay':{
types: ['Flying', 'Ghost'],
bs: {hp:115, at:68, df:78, sa:95, sd:90, sp:85}, 
weightkg: 26,
abilities: {0: 'Thick Fat'},
origin: 'Pokeathlon'
},
'Snowlet':{
types: ['Flying'],
bs: {hp:70, at:47, df:53, sa:74, sd:66, sp:50}, 
weightkg: 8,
abilities: {0: 'Thick Fat'},
nfe: true,
origin: 'Pokeathlon'
},
'Snugglosis':{
types: ['Dark', 'Ground'],
bs: {hp:85, at:110, df:75, sa:85, sd:125, sp:30}, 
weightkg: 20.4,
abilities: {0: 'Wind Rider'},
origin: 'Pokeathlon'
},
'Soulply':{
types: ['Ghost'],
bs: {hp:110, at:90, df:90, sa:20, sd:119, sp:33}, 
weightkg: 4,
abilities: {0: 'Sticky Hold'},
origin: 'Pokeathlon'
},
'Squice':{
types: ['Water', 'Ice'],
bs: {hp:65, at:30, df:30, sa:60, sd:60, sp:60}, 
weightkg: 7,
abilities: {0: 'Water Veil'},
nfe: true,
origin: 'Pokeathlon'
},
'Staruhz':{
types: ['Water', 'Psychic'],
bs: {hp:70, at:75, df:85, sa:110, sd:95, sp:125}, 
weightkg: 10,
abilities: {0: 'Natural Cure'},
origin: 'Pokeathlon'
},
'Suenami':{
types: ['Water'],
bs: {hp:85, at:63, df:70, sa:120, sd:95, sp:37}, 
weightkg: 62.3,
abilities: {0: 'Magic Bounce'},
origin: 'Pokeathlon'
},
'Suicune-Supra':{
types: ['Fire'],
bs: {hp:100, at:75, df:115, sa:90, sd:115, sp:85}, 
weightkg: 187,
abilities: {0: 'Drought'},
origin: 'Pokeathlon'
},
'Sweepdol':{
types: ['Grass', 'Fairy'],
bs: {hp:80, at:45, df:80, sa:90, sd:115, sp:88}, 
weightkg: 24.5,
abilities: {0: 'Clean Sweep'},
origin: 'Pokeathlon'
},
'Tinkashank':{
types: ['Steel', 'Dark'],
bs: {hp:70, at:95, df:85, sa:70, sd:87, sp:95}, 
weightkg: 8.4,
abilities: {0: 'Mold Breaker'},
origin: 'Pokeathlon'
},
'Tinkaslice':{
types: ['Steel', 'Dark'],
bs: {hp:45, at:82, df:79, sa:55, sd:55, sp:65}, 
weightkg: 1.5,
abilities: {0: 'Mold Breaker'},
nfe: true,
origin: 'Pokeathlon'
},
'Tinkastab':{
types: ['Steel', 'Dark'],
bs: {hp:35, at:64, df:58, sa:45, sd:45, sp:50}, 
weightkg: 0.3,
abilities: {0: 'Mold Breaker'},
nfe: true,
origin: 'Pokeathlon'
},
'Tinkatink-Rhinian':{
types: ['Fairy', 'Normal'],
bs: {hp:60, at:50, df:50, sa:25, sd:65, sp:70}, 
weightkg: 64,
abilities: {0: 'Fairy Law'},
nfe: true,
origin: 'Pokeathlon'
},
'Tinkaton-Rhinian':{
types: ['Fairy', 'Normal'],
bs: {hp:85, at:70, df:77, sa:65, sd:115, sp:94}, 
weightkg: 112.8,
abilities: {0: 'Fairy Law'},
origin: 'Pokeathlon'
},
'Tinkatuff-Rhinian':{
types: ['Fairy', 'Normal'],
bs: {hp:65, at:64, df:70, sa:40, sd:85, sp:84}, 
weightkg: 82,
abilities: {0: 'Fairy Law'},
nfe: true,
origin: 'Pokeathlon'
},
'Tofagrif':{
types: ['Grass', 'Flying'],
bs: {hp:72, at:107, df:56, sa:53, sd:75, sp:122}, 
weightkg: 30,
abilities: {0: 'Gooey'},
origin: 'Pokeathlon'
},
'Torterra-Delta-Crystal':{
types: ['Rock', 'Fairy'],
bs: {hp:95, at:109, df:105, sa:75, sd:85, sp:56}, 
weightkg: 310,
abilities: {0: 'Solid Rock'},
origin: 'Pokeathlon'
},
'Toxice':{
types: ['Poison', 'Ice'],
bs: {hp:92, at:92, df:66, sa:93, sd:69, sp:73}, 
weightkg: 22,
abilities: {0: 'Levitate'},
origin: 'Pokeathlon'
},
'Treatern':{
types: ['Dark', 'Ghost'],
bs: {hp:114, at:99, df:80, sa:99, sd:84, sp:55}, 
weightkg: 60,
abilities: {0: 'Pickpocket'},
origin: 'Pokeathlon'
},
'Trickin':{
types: ['Dark', 'Ghost'],
bs: {hp:66, at:66, df:39, sa:66, sd:41, sp:31}, 
weightkg: 14,
abilities: {0: 'Pickpocket'},
nfe: true,
origin: 'Pokeathlon'
},
'Tyranisacer':{
types: ['Bug', 'Dark'],
bs: {hp:100, at:134, df:110, sa:95, sd:100, sp:61}, 
weightkg: 202,
abilities: {0: 'Overcoat'},
origin: 'Pokeathlon'
},
'Tyranitar-Delta':{
types: ['Dragon', 'Psychic'],
bs: {hp:100, at:134, df:110, sa:95, sd:100, sp:61}, 
weightkg: 202,
abilities: {0: 'Analytic'},
origin: 'Pokeathlon'
},
'Tyranitar-Delta-Mega':{
types: ['Dragon', 'Psychic'],
bs: {hp:100, at:164, df:150, sa:95, sd:120, sp:71}, 
weightkg: 255,
abilities: {0: 'Psychic Surge'},
origin: 'Pokeathlon'
},
'Voliable':{
types: ['Grass', 'Flying'],
bs: {hp:74, at:40, df:115, sa:56, sd:50, sp:70}, 
weightkg: 131.5,
abilities: {0: 'Overcoat'},
nfe: true,
origin: 'Pokeathlon'
},
'Wrighvern':{
types: ['Dragon', 'Flying'],
bs: {hp:90, at:90, df:80, sa:125, sd:85, sp:130}, 
weightkg: 90,
abilities: {0: 'Technician'},
origin: 'Pokeathlon'
},
'Wyvarice':{
types: ['Dark', 'Dragon'],
bs: {hp:117, at:57, df:67, sa:117, sd:67, sp:117}, 
weightkg: 22.4,
abilities: {0: 'Pickpocket'},
origin: 'Pokeathlon'
},
'Twinova':{
types: ['Psychic', 'Fairy'],
bs: {hp:90, at:52, df:101, sa:77, sd:101, sp:109}, 
weightkg: 32.8,
abilities: {0: 'Synchronize'},
origin: 'Pokeathlon'
},
'Anneliark':{
types: ['Psychic', 'Ground'],
bs: {hp:84, at:83, df:124, sa:130, sd:85, sp:44}, 
weightkg: 999.9,
abilities: {0: 'Mold Breaker'},
origin: 'Pokeathlon'
},
'Reneguana':{
types: ['Dragon', 'Electric'],
bs: {hp:80, at:110, df:110, sa:110, sd:50, sp:75}, 
weightkg: 55,
abilities: {0: 'Battle Armor'},
origin: 'Pokeathlon'
},
'Pupprodigy':{
types: ['Psychic', 'Normal'],
bs: {hp:75, at:40, df:65, sa:90, sd:40, sp:65}, 
weightkg: 14.4,
abilities: {0: 'Cute Charm'},
nfe: true,
origin: 'Pokeathlon'
},
'Malamancer':{
types: ['Psychic', 'Normal'],
bs: {hp:95, at:70, df:100, sa:110, sd:70, sp:90}, 
weightkg: 34,
abilities: {0: 'Telepathy'},
origin: 'Pokeathlon'
},
'Stratosting':{
types: ['Ghost', 'Flying'],
bs: {hp:70, at:76, df:62, sa:47, sd:60, sp:65}, 
weightkg: 14,
abilities: {0: 'Infiltrator'},
nfe: true,
origin: 'Pokeathlon'
},
'Celestray':{
types: ['Ghost', 'Flying'],
bs: {hp:96, at:119, df:90, sa:60, sd:65, sp:95}, 
weightkg: 34,
abilities: {0: 'Infiltrator'},
origin: 'Pokeathlon'
},
'Saturoceras':{
types: ['Fire', 'Rock'],
bs: {hp:65, at:60, df:75, sa:115, sd:95, sp:85}, 
weightkg: 376,
abilities: {0: 'Shell Armor'},
origin: 'Pokeathlon'
},
'Nebulant':{
types: ['Bug', 'Psychic'],
bs: {hp:91, at:66, df:70, sa:108, sd:71, sp:114}, 
weightkg: 28,
abilities: {0: 'Vacuum Bubble'},
origin: 'Pokeathlon'
},
'Zorblob':{
types: ['Psychic'],
bs: {hp:90, at:72, df:78, sa:105, sd:110, sp:85}, 
weightkg: 49.2,
abilities: {0: 'Hive Mind'},
origin: 'Pokeathlon'
},
'Zorblob-Split':{
types: ['Psychic'],
bs: {hp:90, at:91, df:66, sa:115, sd:66, sp:112}, 
weightkg: 49.2,
abilities: {0: 'Hive Mind'},
origin: 'Pokeathlon'
},
'Tanukief':{
types: ['Dark', 'Fighting'],
bs: {hp:95, at:84, df:121, sa:76, sd:94, sp:60}, 
weightkg: 95,
abilities: {0: 'Coat of Arms'},
origin: 'Pokeathlon'
},
'Alphbit':{
types: ['Electric', 'Normal'],
bs: {hp:44, at:40, df:33, sa:62, sd:44, sp:67}, 
weightkg: 5.6,
abilities: {0: 'Volt Absorb'},
nfe: true,
origin: 'Pokeathlon'
},
'Betech':{
types: ['Electric', 'Normal'],
bs: {hp:54, at:44, df:43, sa:76, sd:64, sp:87}, 
weightkg: 14.2,
abilities: {0: 'Volt Absorb'},
nfe: true,
origin: 'Pokeathlon'
},
'Othocket':{
types: ['Fire', 'Rock'],
bs: {hp:35, at:35, df:65, sa:90, sd:75, sp:55}, 
weightkg: 11.4,
abilities: {0: 'Shell Armor'},
nfe: true,
origin: 'Pokeathlon'
},
'Whacksteroid':{
types: ['Electric', 'Fighting'],
bs: {hp:75, at:110, df:105, sa:65, sd:85, sp:75}, 
weightkg: 257,
abilities: {0: 'Static'},
origin: 'Pokeathlon'
},
'Thatchling':{
types: ['Grass', 'Flying'],
bs: {hp:52, at:30, df:90, sa:45, sd:40, sp:50}, 
weightkg: 8,
abilities: {0: 'Overcoat'},
nfe: true,
origin: 'Pokeathlon'
},
'Matterpillar':{
types: ['Psychic'],
bs: {hp:55, at:22, df:61, sa:47, sd:71, sp:29}, 
weightkg: 9.8,
abilities: {0: 'Synchronize'},
nfe: true,
origin: 'Pokeathlon'
},
'Wyrmplode':{
types: ['Fire', 'Dragon'],
bs: {hp:85, at:60, df:95, sa:105, sd:100, sp:75}, 
weightkg: 791,
abilities: {0: 'Aftermath'},
origin: 'Pokeathlon'
},
'Iron Chamber':{
types: ['Steel', 'Water'],
bs: {hp:84, at:110, df:134, sa:54, sd:134, sp:54}, 
weightkg: 172,
abilities: {0: 'Quark Drive'},
origin: 'Pokeathlon'
},
'Hoppyre':{
types: ['Fire', 'Ghost'],
bs: {hp:91, at:105, df:77, sa:50, sd:80, sp:112}, 
weightkg: 21.2,
abilities: {0: 'Wimp Out'},
origin: 'Pokeathlon'
},
'Cloudinyte':{
types: ['Dark', 'Flying'],
bs: {hp:79, at:105, df:78, sa:50, sd:78, sp:110}, 
weightkg: 28,
abilities: {0: 'Retribution'},
origin: 'Pokeathlon'
},
'Barreko':{
types: ['Grass', 'Ground'],
bs: {hp:44, at:38, df:55, sa:38, sd:55, sp:20}, 
weightkg: 8,
abilities: {0: 'Water Absorb'},
nfe: true,
origin: 'Pokeathlon'
},
'Cactusplash':{
types: ['Grass', 'Water'],
bs: {hp:92, at:53, df:81, sa:102, sd:110, sp:42}, 
weightkg: 32,
abilities: {0: 'Storm Drain'},
origin: 'Pokeathlon'
},
'Dryguaro':{
types: ['Ground', 'Ghost'],
bs: {hp:92, at:102, df:110, sa:53, sd:81, sp:42}, 
weightkg: 20,
abilities: {0: 'Dry Skin'},
origin: 'Pokeathlon'
},
'Varkacosm':{
types: ['Dark', 'Fairy'],
bs: {hp:115, at:85, df:80, sa:85, sd:115, sp:100}, 
weightkg: 0.1,
abilities: {0: 'As Above'},
origin: 'Pokeathlon'
},
'Escarphone':{
types: ['Ghost', 'Poison'],
bs: {hp:76, at:64, df:140, sa:90, sd:82, sp:46}, 
weightkg: 48.3,
abilities: {0: 'Soul Symphony'},
origin: 'Pokeathlon'
},
'Potermit':{
types: ['Water'],
bs: {hp:64, at:51, df:84, sa:27, sd:58, sp:31}, 
weightkg: 8,
abilities: {0: 'Weak Armor'},
nfe: true,
origin: 'Pokeathlon'
},
'Ceraguard':{
types: ['Water', 'Fighting'],
bs: {hp:101, at:109, df:121, sa:67, sd:76, sp:66}, 
weightkg: 93,
abilities: {0: 'Shell Armor'},
origin: 'Pokeathlon'
},
'Silretro':{
types: ['Rock', 'Electric'],
bs: {hp:55, at:115, df:60, sa:100, sd:50, sp:115}, 
weightkg: 198.9,
abilities: {0: 'Sturdy'},
origin: 'Pokeathlon'
},
'Gluttini':{
types: ['Dark', 'Dragon'],
bs: {hp:87, at:37, df:47, sa:87, sd:47, sp:77}, 
weightkg: 11.2,
abilities: {0: 'Pickpocket'},
nfe: true,
origin: 'Pokeathlon'
},
'Utensitile':{
types: ['Steel'],
bs: {hp:79, at:84, df:90, sa:51, sd:131, sp:55}, 
weightkg: 63,
abilities: {0: 'Heatproof'},
origin: 'Pokeathlon'
},
'Arcaspark':{
types: ['Water', 'Electric'],
bs: {hp:100, at:95, df:72, sa:87, sd:86, sp:55}, 
weightkg: 38.6,
abilities: {0: 'Volt Absorb'},
origin: 'Pokeathlon'
},
'Catastropede':{
types: ['Fire', 'Dark'],
bs: {hp:132, at:71, df:58, sa:132, sd:77, sp:25}, 
weightkg: 213,
abilities: {0: 'Flash Fire'},
origin: 'Pokeathlon'
},
'Nweet':{
types: ['Fairy', 'Normal'],
bs: {hp:57, at:75, df:64, sa:53, sd:63, sp:43}, 
weightkg: 36,
abilities: {0: 'Guts'},
origin: 'Pokeathlon',
nfe: true,
},
'Jawladin':{
types: ['Fairy', 'Normal'],
bs: {hp:115, at:97, df:88, sa:68, sd:83, sp:34}, 
weightkg: 36,
abilities: {0: 'Guts'},
origin: 'Pokeathlon'
},
'Rakura':{
types: ['Rock', 'Grass'],
bs: {hp:99, at:54, df:80, sa:111, sd:118, sp:73}, 
weightkg: 58.6,
abilities: {0: 'Solar Power'},
origin: 'Pokeathlon'
},
'Sauphozoa':{
types: ['Psychic', 'Poison'],
bs: {hp:103, at:87, df:63, sa:117, sd:110, sp:37}, 
weightkg: 113,
abilities: {0: 'Cute Charm'},
origin: 'Pokeathlon'
},
};

const SV: {[name: string]: SpeciesData} = extend(true, {}, SS, SV_PATCH, PLA_PATCH);

export const SPECIES = [{}, RBY, GSC, ADV, DPP, BW, XY, SM, SS, SV];

export class Species implements I.Species {
  private readonly gen: I.GenerationNum;

  constructor(gen: I.GenerationNum) {
    this.gen = gen;
  }

  get(id: I.ID) {
    return SPECIES_BY_ID[this.gen][id];
  }

  *[Symbol.iterator]() {
    for (const id in SPECIES_BY_ID[this.gen]) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Specie implements I.Specie {
  readonly kind: 'Species';
  readonly id: I.ID;
  readonly name: I.SpeciesName;
  readonly types!: [I.TypeName] | [I.TypeName, I.TypeName];
  readonly baseStats: Readonly<I.StatsTable>;
  readonly weightkg!: number; // weight
  readonly nfe?: boolean;
  readonly gender?: I.GenderName;
  readonly otherFormes?: I.SpeciesName[];
  readonly baseSpecies?: I.SpeciesName;
  readonly abilities?: {0: I.AbilityName}; // ability

  private static readonly EXCLUDE = new Set(['bs', 'otherFormes']);

  constructor(name: string, data: SpeciesData) {
    this.kind = 'Species';
    this.id = toID(name);
    this.name = name as I.SpeciesName;

    const baseStats: Partial<I.StatsTable> = {};
    baseStats.hp = data.bs.hp;
    baseStats.atk = data.bs.at;
    baseStats.def = data.bs.df;
    baseStats.spa = gen >= 2 ? data.bs.sa : data.bs.sl;
    baseStats.spd = gen >= 2 ? data.bs.sd : data.bs.sl;
    baseStats.spe = data.bs.sp;
    this.baseStats = baseStats as I.StatsTable;
    // Hack for getting Gmax pokemon out of existence in Gen 9+
    if (data.otherFormes) {
      this.otherFormes = data.otherFormes as I.SpeciesName[];
      if (gen >= 9 && !['toxtricity', 'urshifu'].includes(this.id)) {
        this.otherFormes = this.otherFormes.filter(f => !f.endsWith('-Gmax'));
        if (!this.otherFormes.length) this.otherFormes = undefined;
        if (this.otherFormes) this.otherFormes = [...new Set(this.otherFormes)];
      }
    }

    assignWithout(this, data, Specie.EXCLUDE);
  }
}
const SPECIES_BY_ID: Array<{[id: string]: Specie}> = [];

let gen = 0;
for (const species of SPECIES) {
  const map: {[id: string]: Specie} = {};
  for (const specie in species) {
    if (gen >= 2 && species[specie].bs.sl) delete species[specie].bs.sl;
    const m = new Specie(specie, species[specie]);
    map[m.id] = m;
  }
  SPECIES_BY_ID.push(map);
  gen++;
}
