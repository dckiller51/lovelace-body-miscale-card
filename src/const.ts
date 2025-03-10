import localize from './localize';
import { BodymiscaleCardConfig } from './types';

export const CARD_VERSION = '2025.2.0';

export const states = {
  status: {
    key: 'status',
    icon: 'mdi:scale-bathroom',
  },
  problem: {
    key: 'problem',
    icon: 'mdi:alert',
  },
  last_measurement_time: {
    key: 'last_measurement_time',
    icon: 'mdi:calendar-clock'

  },
};

export const attributes_kg = {
  weight: {
    key: 'weight',
    label: localize(`attributes.${'weight: '}`),
    unit: ' kg',
  },
  impedance: {
    key: 'impedance',
    label: localize(`attributes.${'impedance: '}`),
    unit: ' ohm',
  },
  height: {
    key: 'height',
    label: localize(`attributes.${'height: '}`),
    unit: ' cm',
  },
  age: {
    key: 'age',
    label: localize(`attributes.${'age: '}`),
    unit: localize(`unit.${' years'}`),
  },
  gender: {
    key: 'gender',
    label: localize(`attributes.${'gender: '}`),
  },
};

export const attributes_lb = {
  weight: {
    key: 'weight',
    label: localize(`attributes.${'weight: '}`),
    unit: ' lbs',
  },
  impedance: {
    key: 'impedance',
    label: localize(`attributes.${'impedance: '}`),
    unit: ' ohm',
  },
  height: {
    key: 'height',
    label: localize(`attributes.${'height: '}`),
    unit: ' cm',
  },
  age: {
    key: 'age',
    label: localize(`attributes.${'age: '}`),
    unit: localize(`unit.${' years'}`),
  },
  gender: {
    key: 'gender',
    label: localize(`attributes.${'gender: '}`),
  },
};

export const body_kg = {
  bmi: {
    key: 'bmi',
    label: localize(`body.${'bmi'}`),
    icon: '/local/images/bodyscoreIcon/bmi.png',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 40,
    min: 0,
    severity: [
      { from: 0, to: 18.5, color: 'blue' },
      { from: 18.51, to: 25, color: 'green' },
      { from: 25.01, to: 28, color: 'orange' },
      { from: 28.01, to: 32, color: 'orangered' },
      { from: 32.01, to: Infinity, color: 'red' },
    ],
    target: 21.75,
  },
  bmi_label: {
    key: 'bmi_label',
    label: localize(`body.${'bmi_label'}`),
    icon: '/local/images/bodyscoreIcon/body_type.png',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
  },
  visceral_fat: {
    key: 'visceral_fat',
    label: localize(`body.${'visceral_fat'}`),
    icon: '/local/images/bodyscoreIcon/visceral_fat.png',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 20,
    min: 0,
    severity: [
      { from: 0, to: 10, color: 'green' },
      { from: 10.01, to: 15, color: 'orange' },
      { from: 15.01, to: Infinity, color: 'orangered' },
    ],
    target: 12.5,
  },
  body_fat: {
    key: 'body_fat',
    label: localize(`body.${'body_fat'}`),
    icon: '/local/images/bodyscoreIcon/body_fat.png',
    unit: ' %',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 40,
    min: 0,
    severity: [
      { from: 0, to: 12, color: 'blue' },
      { from: 12.01, to: 18, color: 'royalblue' },
      { from: 18.01, to: 23, color: 'green' },
      { from: 23.01, to: 28, color: 'orange' },
      { from: 28.01, to: Infinity, color: 'orangered' },
    ],
    target: 20.5,
  },
  protein: {
    key: 'protein',
    label: localize(`body.${'protein'}`),
    icon: '/local/images/bodyscoreIcon/protein.png',
    unit: ' %',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 32,
    min: 0,
    severity: [
      { from: 0, to: 16, color: 'orangered' },
      { from: 16.01, to: 20, color: 'green' },
      { from: 20.01, to: Infinity, color: 'darkgreen' },
    ],
    target: 18,
  },
  water: {
    key: 'water',
    label: localize(`body.${'water'}`),
    icon: '/local/images/bodyscoreIcon/water.png',
    unit: ' %',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 80,
    min: 0,
    severity: [
      { from: 0, to: 55, color: 'orangered' },
      { from: 55.01, to: 65.1, color: 'green' },
      { from: 65.11, to: Infinity, color: 'darkgreen' },
    ],
    target: 60,
  },
  muscle_mass: {
    key: 'muscle_mass',
    label: localize(`body.${'muscle_mass'}`),
    icon: '/local/images/bodyscoreIcon/muscle_mass.png',
    unit: ' kg',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 100,
    min: 0,
    severity: [
      { from: 0, to: 49.4, color: 'orangered' },
      { from: 49.41, to: 59.5, color: 'green' },
      { from: 59.51, to: Infinity, color: 'darkgreen' },
    ],
    target: 54.45,
  },
  bone_mass: {
    key: 'bone_mass',
    label: localize(`body.${'bone_mass'}`),
    icon: '/local/images/bodyscoreIcon/bone_mass.png',
    unit: ' kg',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 8,
    min: 0,
    severity: [
      { from: 0, to: 2, color: 'orangered' },
      { from: 2.01, to: 4.2, color: 'green' },
      { from: 4.21, to: Infinity, color: 'darkgreen' },
    ],
    target: 3.1,
  },
  weight: {
    key: 'weight',
    label: localize(`body.${'weight'}`),
    icon: '/local/images/bodyscoreIcon/ideal.png',
    unit: ' kg',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 130,
    min: 0,
    severity: [
      { from: 0, to: 57.3, color: 'blue' },
      { from: 57.31, to: 77.4, color: 'green' },
      { from: 77.41, to: 86.7, color: 'orange' },
      { from: 86.71, to: 99.1, color: 'orangered' },
      { from: 99.11, to: Infinity, color: 'red' },
    ],
    target: 67.35,
  },
  ideal: {
    key: 'ideal',
    label: localize(`body.${'ideal'}`),
    icon: '/local/images/bodyscoreIcon/ideal.png',
    unit: ' kg',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 130,
    min: 0,
    severity: [
      { from: 0, to: 57.3, color: 'blue' },
      { from: 57.31, to: 77.4, color: 'green' },
      { from: 77.41, to: 86.7, color: 'orange' },
      { from: 86.71, to: 99.1, color: 'orangered' },
      { from: 99.11, to: Infinity, color: 'red' },
    ],
    target: 67.35,
  },
  basal_metabolism: {
    key: 'basal_metabolism',
    label: localize(`body.${'basal_metabolism'}`),
    icon: '/local/images/bodyscoreIcon/basal_metabolism.png',
    unit: ' kcal',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 3000,
    min: 0,
    severity: [
      { from: 0, to: 1530, color: 'orangered' },
      { from: 1530.01, to: Infinity, color: 'green' },
    ],
    target: 1530,
  },
  body_type: {
    key: 'body_type',
    label: localize(`body.${'body_type'}`),
    icon: '/local/images/bodyscoreIcon/body_type.png',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
  },
  metabolic_age: {
    key: 'metabolic_age',
    label: localize(`body.${'metabolic_age'}`),
    icon: '/local/images/bodyscoreIcon/metabolic_age.png',
    unit: localize(`unit.${' years'}`),
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: null,
    min: null,
    severity: null,
    target: null,
  },
};

export const body_lb = {
  bmi: {
    key: 'bmi',
    label: localize(`body.${'bmi'}`),
    icon: '/local/images/bodyscoreIcon/bmi.png',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 40,
    min: 0,
    severity: [
      { from: 0, to: 18.5, color: 'blue' },
      { from: 18.51, to: 25, color: 'green' },
      { from: 25.01, to: 28, color: 'orange' },
      { from: 28.01, to: 32, color: 'orangered' },
      { from: 32.01, to: Infinity, color: 'red' },
    ],
    target: 21.75,
  },
  bmi_label: {
    key: 'bmi_label',
    label: localize(`body.${'bmi_label'}`),
    icon: '/local/images/bodyscoreIcon/body_type.png',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
  },
  visceral_fat: {
    key: 'visceral_fat',
    label: localize(`body.${'visceral_fat'}`),
    icon: '/local/images/bodyscoreIcon/visceral_fat.png',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 20,
    min: 0,
    severity: [
      { from: 0, to: 10, color: 'green' },
      { from: 10.01, to: 15, color: 'orange' },
      { from: 15.01, to: Infinity, color: 'orangered' },
    ],
    target: 12.5,
  },
  body_fat: {
    key: 'body_fat',
    label: localize(`body.${'body_fat'}`),
    icon: '/local/images/bodyscoreIcon/body_fat.png',
    unit: ' %',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 40,
    min: 0,
    severity: [
      { from: 0, to: 12, color: 'blue' },
      { from: 12.01, to: 18, color: 'royalblue' },
      { from: 18.01, to: 23, color: 'green' },
      { from: 23.01, to: 28, color: 'orange' },
      { from: 28.01, to: Infinity, color: 'orangered' },
    ],
    target: 20.5,
  },
  protein: {
    key: 'protein',
    label: localize(`body.${'protein'}`),
    icon: '/local/images/bodyscoreIcon/protein.png',
    unit: ' %',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 32,
    min: 0,
    severity: [
      { from: 0, to: 16, color: 'orangered' },
      { from: 16.01, to: 20, color: 'green' },
      { from: 20.01, to: Infinity, color: 'darkgreen' },
    ],
    target: 18,
  },
  water: {
    key: 'water',
    label: localize(`body.${'water'}`),
    icon: '/local/images/bodyscoreIcon/water.png',
    unit: ' %',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 80,
    min: 0,
    severity: [
      { from: 0, to: 55, color: 'orangered' },
      { from: 55.01, to: 65.1, color: 'green' },
      { from: 65.11, to: Infinity, color: 'darkgreen' },
    ],
    target: 60,
  },
  muscle_mass: {
    key: 'muscle_mass',
    label: localize(`body.${'muscle_mass'}`),
    icon: '/local/images/bodyscoreIcon/muscle_mass.png',
    unit: ' lbs',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 220.5,
    min: 0,
    severity: [
      { from: 0, to: 108.9, color: 'orangered' },
      { from: 109, to: 131.2, color: 'green' },
      { from: 131.3, to: Infinity, color: 'darkgreen' },
    ],
    target: 120.1,
  },
  bone_mass: {
    key: 'bone_mass',
    label: localize(`body.${'bone_mass'}`),
    icon: '/local/images/bodyscoreIcon/bone_mass.png',
    unit: ' lbs',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 17.6,
    min: 0,
    severity: [
      { from: 0, to: 4.4, color: 'orangered' },
      { from: 4.5, to: 9.3, color: 'green' },
      { from: 9.4, to: Infinity, color: 'darkgreen' },
    ],
    target: 6.9,
  },
  weight: {
    key: 'weight',
    label: localize(`body.${'weight'}`),
    icon: '/local/images/bodyscoreIcon/ideal.png',
    unit: ' lbs',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 286.6,
    min: 0,
    severity: [
      { from: 0, to: 126.3, color: 'blue' },
      { from: 126.4, to: 170.6, color: 'green' },
      { from: 170.7, to: 191.1, color: 'orange' },
      { from: 191.2, to: 218.5, color: 'orangered' },
      { from: 218.6, to: Infinity, color: 'red' },
    ],
    target: 148.5,
  },
  ideal: {
    key: 'ideal',
    label: localize(`body.${'ideal'}`),
    icon: '/local/images/bodyscoreIcon/ideal.png',
    unit: ' lbs',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 286.6,
    min: 0,
    severity: [
      { from: 0, to: 126.3, color: 'blue' },
      { from: 126.4, to: 170.6, color: 'green' },
      { from: 170.7, to: 191.1, color: 'orange' },
      { from: 191.2, to: 218.5, color: 'orangered' },
      { from: 218.6, to: Infinity, color: 'red' },
    ],
    target: 148.5,
  },
  basal_metabolism: {
    key: 'basal_metabolism',
    label: localize(`body.${'basal_metabolism'}`),
    icon: '/local/images/bodyscoreIcon/basal_metabolism.png',
    unit: ' kcal',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: 3000,
    min: 0,
    severity: [
      { from: 0, to: 1530, color: 'orangered' },
      { from: 1530.01, to: Infinity, color: 'green' },
    ],
    target: 1530,
  },
  body_type: {
    key: 'body_type',
    label: localize(`body.${'body_type'}`),
    icon: '/local/images/bodyscoreIcon/body_type.png',
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
  },
  metabolic_age: {
    key: 'metabolic_age',
    label: localize(`body.${'metabolic_age'}`),
    icon: '/local/images/bodyscoreIcon/metabolic_age.png',
    unit: localize(`unit.${' years'}`),
    direction: 'right',
    height: '30px',
    width: '100%',
    positions: {
      icon: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    },
    color: 'var(--score-card-color, var(--ha-card-background))',
    max: null,
    min: null,
    severity: null,
    target: null,
  },
};

export const buttons = {
  user1: {
    show: false,
    label: 'User1',
    icon: 'mdi:alpha-u-circle',
  },
  user2: {
    show: false,
    label: 'User2',
    icon: 'mdi:alpha-u-circle',
  },
  user3: {
    show: false,
    label: 'User3',
    icon: 'mdi:alpha-u-circle',
  },
  user4: {
    show: false,
    label: 'User4',
    icon: 'mdi:alpha-u-circle',
  },
  user5: {
    show: false,
    label: 'User5',
    icon: 'mdi:alpha-u-circle',
  },
};

const compute = {
  convertkgtolb: (v: any) => Math.round((Number(v) * 2.20462) * 10) / 10,
}

export const models = {
  no_impedance: {
    states: {
      status: {
        key: 'state',
      },
    },
    attributes_kg: {
      weight: { key: 'weight' },
      impedance: false,
      height: { key: 'height' },
      age: { key: 'age' },
      gender: { key: 'gender' },
    },
    attributes_lb: {
      weight: { 
        key: 'weight',
        compute: compute.convertkgtolb,
      },
      impedance: false,
      height: { key: 'height' },
      age: { key: 'age' },
      gender: { key: 'gender' },
    },
    body_kg: {
      bmi: { key: 'bmi' },
      bmi_label: { key: 'bmi_label' },
      visceral_fat: { key: 'visceral_fat' },
      body_fat: false,
      protein: false,
      water: false,
      muscle_mass: false,
      bone_mass: false,
      weight: { key: 'weight' },
      ideal: { key: 'ideal' },
      basal_metabolism: { key: 'basal_metabolism' },
      body_type: false,
      metabolic_age: false,
    },
    body_lb: {
      bmi: { key: 'bmi' },
      bmi_label: { key: 'bmi_label' },
      visceral_fat: { key: 'visceral_fat' },
      body_fat: false,
      protein: false,
      water: false,
      muscle_mass: false,
      bone_mass: false,
      weight: {
        key: 'weight',
        compute: compute.convertkgtolb,
      },
      ideal: {
        key: 'ideal',
        compute: compute.convertkgtolb,
      },
      basal_metabolism: { key: 'basal_metabolism' },
      body_type: false,
      metabolic_age: false,
    },
    buttons: {},
  },
  with_impedance: {
    states: {
      status: {
        key: 'state',
      },
    },
    attributes_kg: {
      weight: { key: 'weight' },
      impedance: { key: 'impedance' },
      height: { key: 'height' },
      age: { key: 'age' },
      gender: { key: 'gender' },
    },
    attributes_lb: {
      weight: { 
        key: 'weight',
        compute: compute.convertkgtolb,
      },
      impedance: { key: 'impedance' },
      height: { key: 'height' },
      age: { key: 'age' },
      gender: { key: 'gender' },
    },
    body_kg: {
      bmi: { key: 'bmi' },
      bmi_label: { key: 'bmi_label' },
      visceral_fat: { key: 'visceral_fat' },
      body_fat: { key: 'body_fat' },
      protein: { key: 'protein' },
      water: { key: 'water' },
      muscle_mass: { key: 'muscle_mass' },
      bone_mass: { key: 'bone_mass' },
      weight: { key: 'weight' },
      ideal: { key: 'ideal' },
      basal_metabolism: { key: 'basal_metabolism' },
      body_type: { key: 'body_type' },
      metabolic_age: { key: 'metabolic_age' },
    },
    body_lb: {
      bmi: { key: 'bmi' },
      bmi_label: { key: 'bmi_label' },
      visceral_fat: { key: 'visceral_fat' },
      body_fat: { key: 'body_fat' },
      protein: { key: 'protein' },
      water: { key: 'water' },
      muscle_mass: {
        key: 'muscle_mass',
        compute: compute.convertkgtolb,
      },
      bone_mass: {
        key: 'bone_mass',
        compute: compute.convertkgtolb,
      },
      weight: {
        key: 'weight',
        compute: compute.convertkgtolb,
      },
      ideal: {
        key: 'ideal',
        compute: compute.convertkgtolb,
      },
      basal_metabolism: { key: 'basal_metabolism' },
      body_type: { key: 'body_type' },
      metabolic_age: { key: 'metabolic_age' },
    },
    buttons: {},
  },
};

export const defaultCardConfig: Partial<BodymiscaleCardConfig> = {
  entity: '',
  image: '',
  model: false,
  unit: false,
  theme: true,
  show_name: true,
  show_states: true,
  show_attributes: true,
  show_always_details: false,
  show_toolbar: true,
  show_body: true,
  show_buttons: false,
};
