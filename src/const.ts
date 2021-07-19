import { localize } from './localize/localize';

export const CARD_VERSION = '5.0.0';

export const states = {
  status: {
      key: 'status',
      icon: 'mdi:scale-bathroom',
  },
  problem: {
      key: 'problem',
      icon: 'mdi:alert',
  },
};

export const attributes = {
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

export const body = {
  bmi: {
    key: 'bmi',
    label: localize(`body.${'bmi'}`),
    icon: '/local/images/bodyscoreIcon/bmi.webp',
  },
  bmi_label: {
    key: 'bmi_label',
    label: localize(`body.${'bmi_label'}`),
    icon: '/local/images/bodyscoreIcon/body_type.webp',
  },
  visceral_fat: {
    key: 'visceral_fat',
    label: localize(`body.${'visceral_fat'}`),
    icon: '/local/images/bodyscoreIcon/visceral_fat.webp',
  },
  body_fat: {
    key: 'body_fat',
    label: localize(`body.${'body_fat'}`),
    icon: '/local/images/bodyscoreIcon/body_fat.webp',
    unit: ' %',
  },
  protein: {
    key: 'protein',
    label: localize(`body.${'protein'}`),
    icon: '/local/images/bodyscoreIcon/protein.webp',
    unit: ' %',
  },
  water: {
    key: 'water',
    label: localize(`body.${'water'}`),
    icon: '/local/images/bodyscoreIcon/water.webp',
    unit: ' %',
  },
  muscle_mass: {
    key: 'muscle_mass',
    label: localize(`body.${'muscle_mass'}`),
    icon: '/local/images/bodyscoreIcon/muscle_mass.webp',
    unit: ' kg',
  },
  bone_mass: {
    key: 'bone_mass',
    label: localize(`body.${'bone_mass'}`),
    icon: '/local/images/bodyscoreIcon/bone_mass.webp',
    unit: ' kg',
  },
  weight: {
    key: 'weight',
    label: localize(`body.${'weight'}`),
    icon: '/local/images/bodyscoreIcon/ideal.webp',
    unit: ' kg',
  },
  ideal: {
    key: 'ideal',
    label: localize(`body.${'ideal'}`),
    icon: '/local/images/bodyscoreIcon/ideal.webp',
    unit: ' kg',
  },
  basal_metabolism: {
    key: 'basal_metabolism',
    label: localize(`body.${'basal_metabolism'}`),
    icon: '/local/images/bodyscoreIcon/basal_metabolism.webp',
    unit: ' kcal',
  },
  body_type: {
    key: 'body_type',
    label: localize(`body.${'body_type'}`),
    icon: '/local/images/bodyscoreIcon/body_type.webp',
  },
  metabolic_age: {
    key: 'metabolic_age',
    label: localize(`body.${'metabolic_age'}`),
    icon: '/local/images/bodyscoreIcon/metabolic_age.webp',
    unit: localize(`unit.${' years'}`),
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

export const models = {
  false: {
    states: {
        status: {
            key: 'state',
        },
    },
    attributes: {
        weight: {key: 'weight'},
        impedance: false,
        height: {key: 'height'},
        age: {key: 'age'},
        gender: {key: 'gender'},
    },
    body: {
        bmi: {key: 'bmi'},
        bmi_label: {key: 'bmi_label'},
        visceral_fat: {key: 'visceral_fat'},
        body_fat: false,
        protein: false,
        water: false,
        muscle_mass: false,
        bone_mass: false,
        weight: {key: 'weight'},
        ideal: {key: 'ideal'},
        basal_metabolism: {key: 'basal_metabolism'},
        body_type: false,
        metabolic_age: false,
    },
  },
  true: {
    states: {
          status: {
              key: 'state',
          },
      },
      attributes: {
          weight: {key: 'weight'},
          impedance: {key: 'impedance'},
          height: {key: 'height'},
          age: {key: 'age'},
          gender: {key: 'gender'},
      },
      body: {
          bmi: {key: 'bmi'},
          bmi_label: {key: 'bmi_label'},
          visceral_fat: {key: 'visceral_fat'},
          body_fat: {key: 'body_fat'},
          protein: {key: 'protein'},
          water: {key: 'water'},
          muscle_mass: {key: 'muscle_mass'},
          bone_mass: {key: 'bone_mass'},
          weight: {key: 'weight'},
          ideal: {key: 'ideal'},
          basal_metabolism: {key: 'basal_metabolism'},
          body_type: {key: 'body_type'},
          metabolic_age: {key: 'metabolic_age'},
      },
  },
};