/* eslint-disable @typescript-eslint/no-explicit-any */
import localize from './localize';
import { BodymiscaleCardConfig, RenderBodyData } from './types';

let compute = {
  convertkgtolb: (v: any) => Math.round(Number(v) * 2.20462 * 10) / 10,
};

export const states = {
  status: {
    key: 'state',
    icon: 'mdi:scale-bathroom',
  },
  problem: {
    key: 'problem',
    icon: 'mdi:alert',
  },
  last_measurement_time: {
    key: 'last_measurement_time',
    icon: 'mdi:calendar-clock',
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
    impedance_required: true,
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
    compute: compute.convertkgtolb,
  },
  impedance: {
    key: 'impedance',
    label: localize(`attributes.${'impedance: '}`),
    unit: ' ohm',
    impedance_required: true,
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

export const body_kg: Record<string, RenderBodyData> = {
  basal_metabolism: {
    key: 'basal_metabolism',
    label: localize(`body.${'basal_metabolism'}`),
    icon: 'basal_metabolism.png',
    unit: ' kcal',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 0, to: 1549, color: 'red', label: 'objective_not_achieved' },
      { from: 1549, to: 3000, color: 'green', label: 'objective_achieved' },
    ],
    impedance_required: false,
  },
  bmi: {
    key: 'bmi',
    label: localize(`body.${'bmi'}`),
    icon: 'bmi.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 12, to: 18.5, color: 'blue', label: 'low' },
      { from: 18.5, to: 25.0, color: 'green', label: 'normal' },
      { from: 25.0, to: 30.0, color: 'orange', label: 'high' },
      { from: 30.0, to: 36.5, color: 'red', label: 'very_high' },
    ],
    impedance_required: false,
  },
  bmi_label: {
    key: 'bmi_label',
    label: localize(`body.${'bmi_label'}`),
    icon: 'body_type.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: false,
  },
  body_fat: {
    key: 'body_fat',
    label: localize(`body.${'body_fat'}`),
    icon: 'body_fat.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 5, to: 12, color: 'royalblue', label: 'very_low' },
      { from: 12, to: 18, color: 'blue', label: 'low' },
      { from: 18, to: 23, color: 'green', label: 'normal' },
      { from: 23, to: 28, color: 'orange', label: 'increased' },
      { from: 28, to: 35, color: 'red', label: 'high' },
    ],
    impedance_required: true,
  },
  body_type: {
    key: 'body_type',
    label: localize(`body.${'body_type'}`),
    icon: 'body_type.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: true,
  },
  bone_mass: {
    key: 'bone_mass',
    label: localize(`body.${'bone_mass'}`),
    icon: 'bone_mass.png',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 0, to: 2.00, color: 'red', label: 'insufficient' },
      { from: 2.00, to: 4.20, color: 'green', label: 'normal' },
      { from: 4.20, to: 6.40, color: 'blue', label: 'good' },
    ],
    impedance_required: true,
  },
  ideal: {
    key: 'ideal',
    label: localize(`body.${'ideal'}`),
    icon: 'ideal.png',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 39.30, to: 57.30, color: 'blue', label: 'underweight' },
      { from: 57.30, to: 75.30, color: 'green', label: 'balanced' },
      { from: 75.30, to: 93.30, color: 'orange', label: 'overweight' },
      { from: 93.30, to: 111.30, color: 'red', label: 'obese' },
    ],
    impedance_required: false,
  },
  metabolic_age: {
    key: 'metabolic_age',
    label: localize(`body.${'metabolic_age'}`),
    icon: 'metabolic_age.png',
    unit: localize(`unit.${' years'}`),
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: true,
  },
  muscle_mass: {
    key: 'muscle_mass',
    label: localize(`body.${'muscle_mass'}`),
    icon: 'muscle_mass.png',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 39.30, to: 49.40, color: 'red', label: 'insufficient' },
      { from: 49.40, to: 59.50, color: 'green', label: 'normal' },
      { from: 59.50, to: 69.60, color: 'blue', label: 'good' },
    ],
    impedance_required: true,
  },
  protein: {
    key: 'protein',
    label: localize(`body.${'protein'}`),
    icon: 'protein.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 11, to: 16, color: 'red', label: 'insufficient' },
      { from: 16, to: 20, color: 'green', label: 'normal' },
      { from: 20, to: 24, color: 'blue', label: 'good' },
    ],
    impedance_required: true,
  },
  visceral_fat: {
    key: 'visceral_fat',
    label: localize(`body.${'visceral_fat'}`),
    icon: 'visceral_fat.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 5, to: 10, color: 'green', label: 'normal' },
      { from: 10, to: 15, color: 'orange', label: 'high' },
      { from: 15, to: 20, color: 'red', label: 'very_high' },
    ],
    impedance_required: false,
  },
  water: {
    key: 'water',
    label: localize(`body.${'water'}`),
    icon: 'water.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 45, to: 55, color: 'red', label: 'insufficient' },
      { from: 55, to: 65.1, color: 'green', label: 'normal' },
      { from: 65.1, to: 75, color: 'blue', label: 'good' },
    ],
    impedance_required: true,
  },
  weight: {
    key: 'weight',
    label: localize(`body.${'weight'}`),
    icon: 'ideal.png',
    unit: ' kg',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 39.30, to: 57.30, color: 'blue', label: 'underweight' },
      { from: 57.30, to: 75.30, color: 'green', label: 'balanced' },
      { from: 75.30, to: 93.30, color: 'orange', label: 'overweight' },
      { from: 93.30, to: 111.30, color: 'red', label: 'obese' },
    ],
    impedance_required: false,
  },
};
export const body_lb: Record<string, RenderBodyData> = {
  basal_metabolism: {
    key: 'basal_metabolism',
    label: localize(`body.${'basal_metabolism'}`),
    icon: 'basal_metabolism.png',
    unit: ' kcal',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 0, to: 1549, color: 'red', label: 'objective_not_achieved' },
      { from: 1549, to: 3000, color: 'green', label: 'objective_achieved' },
    ],
    impedance_required: false,
  },
  bmi: {
    key: 'bmi',
    label: localize(`body.${'bmi'}`),
    icon: 'bmi.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 12, to: 18.5, color: 'blue', label: 'low' },
      { from: 18.5, to: 25.0, color: 'green', label: 'normal' },
      { from: 25.0, to: 30.0, color: 'orange', label: 'high' },
      { from: 30.0, to: 36.5, color: 'red', label: 'very_high' },
    ],
    impedance_required: false,
  },
  bmi_label: {
    key: 'bmi_label',
    label: localize(`body.${'bmi_label'}`),
    icon: 'body_type.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: false,
  },
  body_fat: {
    key: 'body_fat',
    label: localize(`body.${'body_fat'}`),
    icon: 'body_fat.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 5, to: 12, color: 'royalblue', label: 'very_low' },
      { from: 12, to: 18, color: 'blue', label: 'low' },
      { from: 18, to: 23, color: 'green', label: 'normal' },
      { from: 23, to: 28, color: 'orange', label: 'increased' },
      { from: 28, to: 35, color: 'red', label: 'high' },
    ],
    impedance_required: true,
  },
  body_type: {
    key: 'body_type',
    label: localize(`body.${'body_type'}`),
    icon: 'body_type.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: true,
  },
  bone_mass: {
    key: 'bone_mass',
    label: localize(`body.${'bone_mass'}`),
    icon: 'bone_mass.png',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 0, to: 4.41, color: 'red', label: 'insufficient' },
      { from: 4.41, to: 9.26, color: 'green', label: 'normal' },
      { from: 9.26, to: 14.11, color: 'blue', label: 'good' },
    ],
    impedance_required: true,
  },
  ideal: {
    key: 'ideal',
    label: localize(`body.${'ideal'}`),
    icon: 'ideal.png',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 86.64, to: 126.34, color: 'blue', label: 'underweight' },
      { from: 126.34, to: 166.04, color: 'green', label: 'balanced' },
      { from: 166.04, to: 205.75, color: 'orange', label: 'overweight' },
      { from: 205.75, to: 245.45, color: 'red', label: 'obese' },
    ],
    impedance_required: false,
  },
  metabolic_age: {
    key: 'metabolic_age',
    label: localize(`body.${'metabolic_age'}`),
    icon: 'metabolic_age.png',
    unit: localize(`unit.${' years'}`),
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: null,
    showbelowlabels: null,
    severity: null,
    impedance_required: true,
  },
  muscle_mass: {
    key: 'muscle_mass',
    label: localize(`body.${'muscle_mass'}`),
    icon: 'muscle_mass.png',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 86.64, to: 108.97, color: 'red', label: 'insufficient' },
      { from: 108.97, to: 131.17, color: 'green', label: 'normal' },
      { from: 131.17, to: 153.38, color: 'blue', label: 'good' },
    ],
    impedance_required: true,
  },
  protein: {
    key: 'protein',
    label: localize(`body.${'protein'}`),
    icon: 'protein.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 11, to: 16, color: 'red', label: 'insufficient' },
      { from: 16, to: 20, color: 'green', label: 'normal' },
      { from: 20, to: 24, color: 'blue', label: 'good' },
    ],
    impedance_required: true,
  },
  visceral_fat: {
    key: 'visceral_fat',
    label: localize(`body.${'visceral_fat'}`),
    icon: 'visceral_fat.png',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 5, to: 10, color: 'green', label: 'normal' },
      { from: 10, to: 15, color: 'orange', label: 'high' },
      { from: 15, to: 20, color: 'red', label: 'very_high' },
    ],
    impedance_required: false,
  },
  water: {
    key: 'water',
    label: localize(`body.${'water'}`),
    icon: 'water.png',
    unit: ' %',
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 45, to: 55, color: 'red', label: 'insufficient' },
      { from: 55, to: 65.1, color: 'green', label: 'normal' },
      { from: 65.1, to: 75, color: 'blue', label: 'good' },
    ],
    impedance_required: true,
  },
  weight: {
    key: 'weight',
    label: localize(`body.${'weight'}`),
    icon: 'ideal.png',
    unit: ' lbs',
    compute: compute.convertkgtolb,
    color: 'var(--score-card-color, var(--ha-card-background))',
    positions: {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
    showabovelabels: "true",
    showbelowlabels: "true",
    severity: [
      { from: 86.64, to: 126.34, color: 'blue', label: 'underweight' },
      { from: 126.34, to: 166.04, color: 'green', label: 'balanced' },
      { from: 166.04, to: 205.75, color: 'orange', label: 'overweight' },
      { from: 205.75, to: 245.45, color: 'red', label: 'obese' },
    ],
    impedance_required: false,
  },
};

export const buttons = {
  user1: {
    show: false,
    label: 'User1',
    icon: 'mdi:alpha-u-circle',
    entity: '',
  },
  user2: {
    show: false,
    label: 'User2',
    icon: 'mdi:alpha-u-circle',
    entity: '',
  },
  user3: {
    show: false,
    label: 'User3',
    icon: 'mdi:alpha-u-circle',
    entity: '',
  },
  user4: {
    show: false,
    label: 'User4',
    icon: 'mdi:alpha-u-circle',
    entity: '',
  },
  user5: {
    show: false,
    label: 'User5',
    icon: 'mdi:alpha-u-circle',
    entity: '',
  },
};

export const defaultCardConfig: Partial<BodymiscaleCardConfig> = {
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
  attributes: {
    impedance: {
      key: 'impedance',
      impedance_required: true,
    },
  },
  body: {
    basal_metabolism: {
      key: 'basal_metabolism',
      severity: [
        { from: 0, to: 1549, color: 'red', label: 'objective_not_achieved' },
        { from: 1549, to: 3000, color: 'green', label: 'objective_achieved' },
      ],
      impedance_required: false,
    },
    bmi: {
      key: 'bmi',
      severity: [
        { from: 12, to: 18.5, color: 'blue', label: 'low' },
        { from: 18.5, to: 25.0, color: 'green', label: 'normal' },
        { from: 25.0, to: 30.0, color: 'orange', label: 'high' },
        { from: 30.0, to: 36.5, color: 'red', label: 'very_high' },
      ],
      impedance_required: false,
    },
    bmi_label: {
      key: 'bmi_label',
      impedance_required: false,
    },
    body_fat: {
      key: 'body_fat',
      severity: [
        { from: 5, to: 12, color: 'royalblue', label: 'very_low' },
        { from: 12, to: 18, color: 'blue', label: 'low' },
        { from: 18, to: 23, color: 'green', label: 'normal' },
        { from: 23, to: 28, color: 'orange', label: 'increased' },
        { from: 28, to: 35, color: 'red', label: 'high' },
      ],
      impedance_required: true,
    },
    body_type: {
      key: 'body_type',
      impedance_required: true,
    },
    bone_mass: {
      key: 'bone_mass',
      severity: [
        { from: 0, to: 2.00, color: 'red', label: 'insufficient' },
        { from: 2.00, to: 4.20, color: 'green', label: 'normal' },
        { from: 4.20, to: 6.40, color: 'blue', label: 'good' },
      ],
      impedance_required: true,
    },
    ideal: {
      key: 'ideal',
      severity: [
        { from: 39.30, to: 57.30, color: 'blue', label: 'underweight' },
        { from: 57.30, to: 75.30, color: 'green', label: 'balanced' },
        { from: 75.30, to: 93.30, color: 'orange', label: 'overweight' },
        { from: 93.30, to: 111.30, color: 'red', label: 'obese' },
      ],
      impedance_required: false,
    },
    metabolic_age: {
      key: 'metabolic_age',
      impedance_required: true,
    },
    muscle_mass: {
      key: 'muscle_mass',
      severity: [
        { from: 39.30, to: 49.40, color: 'red', label: 'insufficient' },
        { from: 49.40, to: 59.50, color: 'green', label: 'normal' },
        { from: 59.50, to: 69.60, color: 'blue', label: 'good' },
      ],
      impedance_required: true,
    },
    protein: {
      key: 'protein',
      severity: [
        { from: 11, to: 16, color: 'red', label: 'insufficient' },
        { from: 16, to: 20, color: 'green', label: 'normal' },
        { from: 20, to: 24, color: 'blue', label: 'good' },
      ],
      impedance_required: true,
    },
    visceral_fat: {
      key: 'visceral_fat',
      severity: [
        { from: 5, to: 10, color: 'green', label: 'normal' },
        { from: 10, to: 15, color: 'orange', label: 'high' },
        { from: 15, to: 20, color: 'red', label: 'very_high' },
      ],
      impedance_required: false,
    },
    water: {
      key: 'water',
      severity: [
        { from: 45, to: 55, color: 'red', label: 'insufficient' },
        { from: 55, to: 65.1, color: 'green', label: 'normal' },
        { from: 65.1, to: 75, color: 'blue', label: 'good' },
      ],
      impedance_required: true,
    },
    weight: {
      key: 'weight',
      severity: [
        { from: 39.30, to: 57.30, color: 'blue', label: 'underweight' },
        { from: 57.30, to: 75.30, color: 'green', label: 'balanced' },
        { from: 75.30, to: 93.30, color: 'orange', label: 'overweight' },
        { from: 93.30, to: 111.30, color: 'red', label: 'obese' },
      ],
      impedance_required: false,
    },
  },
};

