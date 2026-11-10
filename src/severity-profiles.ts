/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Personal severity profiles (#72).
 *
 * Same data and rules as the Severity Configuration Helper
 * (docs/profiles.js + docs/severity-data.js), so the card and the helper
 * give the same thresholds. Keep both in sync.
 */
import { NumericSeverity } from './types';

export interface PersonProfile {
  gender?: string;
  age?: number;
  height?: number; // cm
  weight?: number; // kg
  bodyFat?: number; // %, needed for the S400 water compartments
}

const profiles: Record<string, any> = {
  basal_metabolism: {
    key: 'basal_metabolism',
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
    impedance_required: true,
    severity: {
      male: {
        '18-39': [
          { from: 3, to: 10, color: 'blue', label: 'very_low' },
          { from: 10, to: 16, color: 'royalblue', label: 'low' },
          { from: 16, to: 21, color: 'green', label: 'normal' },
          { from: 21, to: 26, color: 'orange', label: 'increased' },
          { from: 26, to: 33, color: 'red', label: 'high' }
        ],
        '40-59': [
          { from: 5, to: 12, color: 'blue', label: 'very_low' },
          { from: 12, to: 18, color: 'royalblue', label: 'low' },
          { from: 18, to: 23, color: 'green', label: 'normal' },
          { from: 23, to: 28, color: 'orange', label: 'increased' },
          { from: 28, to: 35, color: 'red', label: 'high' }
        ],
        '60+': [
          { from: 7, to: 14, color: 'blue', label: 'very_low' },
          { from: 14, to: 20, color: 'royalblue', label: 'low' },
          { from: 20, to: 25, color: 'green', label: 'normal' },
          { from: 25, to: 30, color: 'orange', label: 'increased' },
          { from: 30, to: 37, color: 'red', label: 'high' }
        ]
      },
      female: {
        '18-39': [
          { from: 16, to: 23, color: 'blue', label: 'very_low' },
          { from: 23, to: 29, color: 'royalblue', label: 'low' },
          { from: 29, to: 34, color: 'green', label: 'normal' },
          { from: 34, to: 39, color: 'orange', label: 'increased' },
          { from: 39, to: 46, color: 'red', label: 'high' }
        ],
        '40-59': [
          { from: 18, to: 25, color: 'blue', label: 'very_low' },
          { from: 25, to: 31, color: 'royalblue', label: 'low' },
          { from: 31, to: 36, color: 'green', label: 'normal' },
          { from: 36, to: 41, color: 'orange', label: 'increased' },
          { from: 41, to: 48, color: 'red', label: 'high' }
        ],
        '60+': [
          { from: 20, to: 27, color: 'blue', label: 'very_low' },
          { from: 27, to: 33, color: 'royalblue', label: 'low' },
          { from: 33, to: 38, color: 'green', label: 'normal' },
          { from: 38, to: 43, color: 'orange', label: 'increased' },
          { from: 43, to: 50, color: 'red', label: 'high' }
        ]
      }
    }
  },
  body_type: {
    key: 'body_type',
    impedance_required: true,
  },
  bone_mass: {
    key: 'bone_mass',
    impedance_required: true,
    severity: {
      male: {
        '-65': [
          { from: 0, to: 1.60, color: 'red', label: 'insufficient' },
          { from: 1.60, to: 3.40, color: 'green', label: 'normal' },
          { from: 3.40, to: 5.20, color: 'blue', label: 'good' }
        ],
        '65-95': [
          { from: 0, to: 2.00, color: 'red', label: 'insufficient' },
          { from: 2.00, to: 4.20, color: 'green', label: 'normal' },
          { from: 4.20, to: 6.40, color: 'blue', label: 'good' }
        ],
        '95+': [
          { from: 0, to: 2.25, color: 'red', label: 'insufficient' },
          { from: 2.25, to: 4.70, color: 'green', label: 'normal' },
          { from: 4.70, to: 7.20, color: 'blue', label: 'good' }
        ]
      },
      female: {
        '-50': [
          { from: 0, to: 1.20, color: 'red', label: 'insufficient' },
          { from: 1.20, to: 2.50, color: 'green', label: 'normal' },
          { from: 2.50, to: 3.80, color: 'blue', label: 'good' }
        ],
        '50-75': [
          { from: 0, to: 1.45, color: 'red', label: 'insufficient' },
          { from: 1.45, to: 3.10, color: 'green', label: 'normal' },
          { from: 3.10, to: 4.70, color: 'blue', label: 'good' }
        ],
        '75+': [
          { from: 0, to: 1.80, color: 'red', label: 'insufficient' },
          { from: 1.80, to: 3.80, color: 'green', label: 'normal' },
          { from: 3.80, to: 5.80, color: 'blue', label: 'good' }
        ]
      }
    }
  },
  ideal: {
    key: 'ideal',
    impedance_required: false,
      severity: {
      '155': [
        { from: 20, to: 44, color: 'blue', label: 'underweight' },
        { from: 44, to: 58, color: 'green', label: 'balanced' },
        { from: 58, to: 69, color: 'orange', label: 'overweight' },
        { from: 69, to: 93, color: 'red', label: 'obese' }
      ],
      '160': [
        { from: 26, to: 47, color: 'blue', label: 'underweight' },
        { from: 47, to: 61, color: 'green', label: 'balanced' },
        { from: 61, to: 74, color: 'orange', label: 'overweight' },
        { from: 74, to: 100, color: 'red', label: 'obese' }
      ],
      '165': [
        { from: 23, to: 50, color: 'blue', label: 'underweight' },
        { from: 50, to: 65, color: 'green', label: 'balanced' },
        { from: 65, to: 79, color: 'orange', label: 'overweight' },
        { from: 79, to: 106, color: 'red', label: 'obese' }
      ],
      '170': [
        { from: 25, to: 54, color: 'blue', label: 'underweight' },
        { from: 54, to: 69, color: 'green', label: 'balanced' },
        { from: 69, to: 84, color: 'orange', label: 'overweight' },
        { from: 84, to: 113, color: 'red', label: 'obese' }
      ],
      '175': [
        { from: 27, to: 57, color: 'blue', label: 'underweight' },
        { from: 57, to: 74, color: 'green', label: 'balanced' },
        { from: 74, to: 89, color: 'orange', label: 'overweight' },
        { from: 89, to: 119, color: 'red', label: 'obese' }
        ],
      '180': [
        { from: 27, to: 60, color: 'blue', label: 'underweight' },
        { from: 60, to: 78, color: 'green', label: 'balanced' },
        { from: 78, to: 94, color: 'orange', label: 'overweight' },
        { from: 94, to: 127, color: 'red', label: 'obese' }
      ],
      '185': [
        { from: 29, to: 64, color: 'blue', label: 'underweight' },
        { from: 64, to: 83, color: 'green', label: 'balanced' },
        { from: 83, to: 99, color: 'orange', label: 'overweight' },
        { from: 99, to: 134, color: 'red', label: 'obese' }
      ],
      '190': [
        { from: 31, to: 67, color: 'blue', label: 'underweight' },
        { from: 67, to: 87, color: 'green', label: 'balanced' },
        { from: 87, to: 105, color: 'orange', label: 'overweight' },
        { from: 105, to: 141, color: 'red', label: 'obese' }
      ],
      '195': [
        { from: 34, to: 71, color: 'blue', label: 'underweight' },
        { from: 71, to: 89, color: 'green', label: 'balanced' },
        { from: 89, to: 108, color: 'orange', label: 'overweight' },
        { from: 108, to: 145, color: 'red', label: 'obese' }
      ]
    }
  },
  metabolic_age: {
    key: 'metabolic_age',
    impedance_required: true,
  },
  muscle_mass: {
    key: 'muscle_mass',
    impedance_required: true,
    severity: {
      male: {
        '18-29': [
          { from: 25, to: 49, color: 'red', label: 'insufficient' },
          { from: 49, to: 73, color: 'green', label: 'normal' },
          { from: 73, to: 98, color: 'blue', label: 'good' }
        ],
        '30-39': [
          { from: 22, to: 47, color: 'red', label: 'insufficient' },
          { from: 47, to: 72, color: 'green', label: 'normal' },
          { from: 72, to: 97, color: 'blue', label: 'good' }
        ],
        '40-49': [
          { from: 19, to: 44, color: 'red', label: 'insufficient' },
          { from: 44, to: 69, color: 'green', label: 'normal' },
          { from: 69, to: 94, color: 'blue', label: 'good' }
        ],
        '50-59': [
          { from: 14, to: 39, color: 'red', label: 'insufficient' },
          { from: 39, to: 63, color: 'green', label: 'normal' },
          { from: 63, to: 88, color: 'blue', label: 'good' }
        ],
        '60-69': [
          { from: 10, to: 35, color: 'red', label: 'insufficient' },
          { from: 35, to: 55, color: 'green', label: 'normal' },
          { from: 55, to: 80, color: 'blue', label: 'good' }
        ],
        '70-79': [
          { from: 0, to: 25, color: 'red', label: 'insufficient' },
          { from: 25, to: 45, color: 'green', label: 'normal' },
          { from: 45, to: 70, color: 'blue', label: 'good' }
        ],
        '80-89': [
          { from: 4, to: 21, color: 'red', label: 'insufficient' },
          { from: 21, to: 38, color: 'green', label: 'normal' },
          { from: 38, to: 55, color: 'blue', label: 'good' }
        ],
      },
      female: {
        '18-29': [
          { from: 28, to: 48, color: 'red', label: 'insufficient' },
          { from: 48, to: 68, color: 'green', label: 'normal' },
          { from: 68, to: 88, color: 'blue', label: 'good' }
        ],
        '30-39': [
          { from: 27, to: 48, color: 'red', label: 'insufficient' },
          { from: 48, to: 69, color: 'green', label: 'normal' },
          { from: 69, to: 90, color: 'blue', label: 'good' }
        ],
        '40-49': [
          { from: 22, to: 45, color: 'red', label: 'insufficient' },
          { from: 45, to: 68, color: 'green', label: 'normal' },
          { from: 68, to: 91, color: 'blue', label: 'good' }
        ],
        '50-59': [
          { from: 16, to: 41, color: 'red', label: 'insufficient' },
          { from: 41, to: 66, color: 'green', label: 'normal' },
          { from: 66, to: 91, color: 'blue', label: 'good' }
        ],
        '60-69': [
          { from: 8, to: 34, color: 'red', label: 'insufficient' },
          { from: 34, to: 60, color: 'green', label: 'normal' },
          { from: 60, to: 86, color: 'blue', label: 'good' }
        ],
        '70-79': [
          { from: 0, to: 26, color: 'red', label: 'insufficient' },
          { from: 26, to: 53, color: 'green', label: 'normal' },
          { from: 53, to: 80, color: 'blue', label: 'good' }
        ],
        '80-89': [
          { from: 0, to: 22, color: 'red', label: 'insufficient' },
          { from: 22, to: 49, color: 'green', label: 'normal' },
          { from: 49, to: 76, color: 'blue', label: 'good' }
        ]
      }
    }
  },
  protein: {
    key: 'protein',
    impedance_required: true,
    severity: [
      { from: 11, to: 16, color: 'red', label: 'insufficient' },
      { from: 16, to: 20, color: 'green', label: 'normal' },
      { from: 20, to: 24, color: 'blue', label: 'good' },
    ]
  },
  visceral_fat: {
    key: 'visceral_fat',
    impedance_required: false,
    severity:[
      { from: 5, to: 10, color: 'green', label: 'normal' },
      { from: 10, to: 15, color: 'orange', label: 'high' },
      { from: 15, to: 20, color: 'red', label: 'very_high' }
    ],
  },
  water: {
    key: 'water',
    impedance_required: true,
    severity: {
      male: [
        { from: 45, to: 55, color: 'red', label: 'insufficient' },
        { from: 55, to: 65, color: 'green', label: 'normal' },
        { from: 65, to: 75, color: 'blue', label: 'good' }
      ],
      female: [
        { from: 40, to: 50, color: 'red', label: 'insufficient' },
        { from: 50, to: 60, color: 'green', label: 'normal' },
        { from: 60, to: 70, color: 'blue', label: 'good' }
      ]
    }
  },
  weight: {
    key: 'weight',
    impedance_required: false,
      severity: {
      '155': [
        { from: 20, to: 44, color: 'blue', label: 'underweight' },
        { from: 44, to: 58, color: 'green', label: 'balanced' },
        { from: 58, to: 69, color: 'orange', label: 'overweight' },
        { from: 69, to: 93, color: 'red', label: 'obese' }
      ],
      '160': [
        { from: 26, to: 47, color: 'blue', label: 'underweight' },
        { from: 47, to: 61, color: 'green', label: 'balanced' },
        { from: 61, to: 74, color: 'orange', label: 'overweight' },
        { from: 74, to: 100, color: 'red', label: 'obese' }
      ],
      '165': [
        { from: 23, to: 50, color: 'blue', label: 'underweight' },
        { from: 50, to: 65, color: 'green', label: 'balanced' },
        { from: 65, to: 79, color: 'orange', label: 'overweight' },
        { from: 79, to: 106, color: 'red', label: 'obese' }
      ],
      '170': [
        { from: 25, to: 54, color: 'blue', label: 'underweight' },
        { from: 54, to: 69, color: 'green', label: 'balanced' },
        { from: 69, to: 84, color: 'orange', label: 'overweight' },
        { from: 84, to: 113, color: 'red', label: 'obese' }
      ],
      '175': [
        { from: 27, to: 57, color: 'blue', label: 'underweight' },
        { from: 57, to: 74, color: 'green', label: 'balanced' },
        { from: 74, to: 89, color: 'orange', label: 'overweight' },
        { from: 89, to: 119, color: 'red', label: 'obese' }
        ],
      '180': [
        { from: 27, to: 60, color: 'blue', label: 'underweight' },
        { from: 60, to: 78, color: 'green', label: 'balanced' },
        { from: 78, to: 94, color: 'orange', label: 'overweight' },
        { from: 94, to: 127, color: 'red', label: 'obese' }
      ],
      '185': [
        { from: 29, to: 64, color: 'blue', label: 'underweight' },
        { from: 64, to: 83, color: 'green', label: 'balanced' },
        { from: 83, to: 99, color: 'orange', label: 'overweight' },
        { from: 99, to: 134, color: 'red', label: 'obese' }
      ],
      '190': [
        { from: 31, to: 67, color: 'blue', label: 'underweight' },
        { from: 67, to: 87, color: 'green', label: 'balanced' },
        { from: 87, to: 105, color: 'orange', label: 'overweight' },
        { from: 105, to: 141, color: 'red', label: 'obese' }
      ],
      '195': [
        { from: 34, to: 71, color: 'blue', label: 'underweight' },
        { from: 71, to: 89, color: 'green', label: 'balanced' },
        { from: 89, to: 108, color: 'orange', label: 'overweight' },
        { from: 108, to: 145, color: 'red', label: 'obese' }
      ]
    }
  }
};

/** Body elements that get personal thresholds with `auto_severity`. */
export const AUTO_SEVERITY_KEYS = [
  'basal_metabolism',
  'bmi',
  'body_fat',
  'bone_mass',
  'ideal',
  'muscle_mass',
  'protein',
  'visceral_fat',
  'water',
  'weight',
  'skeletal_muscle_mass',
  'ecw_tbw_ratio',
  'extracellular_water',
  'intracellular_water',
  'bcm',
];

/** Metrics whose thresholds are masses (kg), converted when the card is in lbs. */
const MASS_METRICS = ['weight', 'ideal', 'bone_mass', 'muscle_mass', 'skeletal_muscle_mass', 'bcm'];

/* ------------------------------------------------------------------------
 * S400 (dual-frequency) metrics.
 * Reference values from the bodymiscale integration (README_S400_UPGRADE.md):
 * - Skeletal muscle: Skeletal Muscle Index cut-points of Janssen et al. (2004),
 *   SMI = SMM / height² (kg/m²): male 8.51 / 10.75, female 5.76 / 6.75.
 * - ECW/TBW ratio: normal from 37 %. The reference range is 37–39 %, but the
 *   integration model (ECW = TBW × (0.32 + 0.08 × Z_hf/Z_lf)) cannot exceed 40 %
 *   and gives ~39.2–39.3 % with real impedances, so normal goes up to 40 %.
 * - ECW, ICW and BCM: the same partition applied to the person's total
 *   body water, TBW = (1 − fat% / 100) × 0.73 × weight (the TBW used by the
 *   integration for these compartments), and BCM = ICW / 0.73.
 * The outer limits only set the length of the bar.
 * --------------------------------------------------------------------- */
const SMI_LIMITS: Record<string, number[]> = {
  male: [6.0, 8.51, 10.75, 14.0],
  female: [4.0, 5.76, 6.75, 9.0],
};
// ECW / TBW (%) bands: low (dehydration) / normal / high (overhydration, inflammation)
const ECW_RATIO_LIMITS = [30, 37, 40, 41];

const round = (v: number, decimals: number) => {
  const f = 10 ** decimals;
  return Math.round(v * f) / f;
};

const bands = (
  limits: number[],
  segments: { color: string; label: string }[],
  decimals: number,
): NumericSeverity =>
  segments.map((seg, i) => ({
    from: round(limits[i], decimals),
    to: round(limits[i + 1], decimals),
    color: seg.color,
    label: seg.label,
  }));

const ECW_SEGMENTS = [
  { color: 'blue', label: 'low' },
  { color: 'green', label: 'normal' },
  { color: 'orange', label: 'high' },
];
const ICW_SEGMENTS = [
  { color: 'orange', label: 'low' },
  { color: 'green', label: 'normal' },
  { color: 'blue', label: 'high' },
];

function s400Profile(key: string, p: Required<PersonProfile>): NumericSeverity | undefined {
  const { gender, height, weight, bodyFat } = p;

  if (key === 'skeletal_muscle_mass') {
    const h2 = (height / 100) ** 2;
    return bands(
      SMI_LIMITS[gender].map((smi) => smi * h2),
      [
        { color: 'red', label: 'low' },
        { color: 'orange', label: 'below_normal' },
        { color: 'green', label: 'normal' },
      ],
      2,
    );
  }

  if (key === 'ecw_tbw_ratio') return bands(ECW_RATIO_LIMITS, ECW_SEGMENTS, 1);

  if (!['extracellular_water', 'intracellular_water', 'bcm'].includes(key)) return undefined;
  if (!Number.isFinite(bodyFat) || bodyFat <= 0 || bodyFat >= 100) return undefined;

  const tbw = (1 - bodyFat / 100) * 0.73 * weight;
  const ecw = ECW_RATIO_LIMITS.map((r) => (tbw * r) / 100);
  if (key === 'extracellular_water') return bands(ecw, ECW_SEGMENTS, 1);

  // ICW = TBW − ECW, in increasing order
  const icw = [...ecw].reverse().map((e) => tbw - e);
  if (key === 'intracellular_water') return bands(icw, ICW_SEGMENTS, 1);

  return bands(icw.map((v) => v / 0.73), ICW_SEGMENTS, 1); // bcm
}

const closestHeight = (table: Record<string, NumericSeverity>, height: number) => {
  const heights = Object.keys(table).map((h) => parseInt(h, 10));
  const closest = heights.reduce((prev, curr) =>
    Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev,
  );
  return table[String(closest)];
};

function basalMetabolism(
  { gender, age, weight, height }: Required<PersonProfile>,
  activityFactor = 1.9,
): NumericSeverity {
  let bmr: number;
  if (gender === 'female') {
    bmr = 864.6 + 10.2036 * weight - 0.39336 * height - 6.204 * age;
    if (bmr > 2996) bmr = 5000;
  } else {
    bmr = 877.8 + 14.916 * weight - 0.726 * height - 8.976 * age;
    if (bmr > 2322) bmr = 5000;
  }
  bmr = Math.min(Math.max(bmr, 500), 5000);
  const upperBound = Math.round(bmr * activityFactor);
  const lowerBound = Math.round(bmr);
  const from = Math.max(Math.round(lowerBound - (upperBound - lowerBound)), 0);
  return [
    { from, to: lowerBound, color: 'red', label: 'objective_not_achieved' },
    { from: lowerBound, to: upperBound, color: 'green', label: 'objective_achieved' },
  ];
}

function profileFor(key: string, p: Required<PersonProfile>): NumericSeverity | undefined {
  // Computed from the profile, no table
  if (key === 'basal_metabolism') return basalMetabolism(p);

  const s400 = s400Profile(key, p);
  if (s400) return s400;

  const data = profiles[key]?.severity;
  if (!data) return undefined;
  const { gender, age, weight, height } = p;

  switch (key) {
    case 'weight':
    case 'ideal':
      return closestHeight(data, height);
    case 'bone_mass':
      // Weight bands differ by gender: male -65 / 65-95 / 95+, female -50 / 50-75 / 75+
      if (gender === 'female') {
        if (weight < 50) return data.female?.['-50'];
        if (weight <= 75) return data.female?.['50-75'];
        return data.female?.['75+'];
      }
      if (weight < 65) return data.male?.['-65'];
      if (weight <= 95) return data.male?.['65-95'];
      return data.male?.['95+'];
    case 'muscle_mass':
      if (age < 30) return data[gender]?.['18-29'];
      if (age < 40) return data[gender]?.['30-39'];
      if (age < 50) return data[gender]?.['40-49'];
      if (age < 60) return data[gender]?.['50-59'];
      if (age < 70) return data[gender]?.['60-69'];
      if (age < 80) return data[gender]?.['70-79'];
      return data[gender]?.['80-89'];
    case 'body_fat':
      if (age < 40) return data[gender]?.['18-39'];
      if (age < 60) return data[gender]?.['40-59'];
      return data[gender]?.['60+'];
    case 'water':
      return data[gender];
    default:
      return Array.isArray(data) ? data : undefined;
  }
}

/**
 * Severity computed from the person's profile, or undefined when the metric
 * has no profile or the profile data (gender, age, height, weight) is missing.
 * Mass thresholds are converted to lbs when `unitLb` is true.
 */
export function getAutoSeverity(
  key: string,
  person: PersonProfile,
  unitLb?: boolean,
): NumericSeverity | undefined {
  const gender = String(person.gender ?? '').toLowerCase();
  const age = Number(person.age);
  const height = Number(person.height);
  const weight = Number(person.weight);
  const bodyFat = Number(person.bodyFat);

  if (
    (gender !== 'male' && gender !== 'female') ||
    !Number.isFinite(age) ||
    !Number.isFinite(height) ||
    !Number.isFinite(weight) ||
    age <= 0 ||
    height <= 0 ||
    weight <= 0
  ) {
    return undefined;
  }

  const severity = profileFor(key, { gender, age, height, weight, bodyFat });
  if (!Array.isArray(severity) || severity.length === 0) return undefined;

  const toLb = unitLb && MASS_METRICS.includes(key);
  return severity.map((seg) => ({
    ...seg,
    from: toLb ? Math.round(Number(seg.from) * 2.20462 * 100) / 100 : seg.from,
    to: toLb ? Math.round(Number(seg.to) * 2.20462 * 100) / 100 : seg.to,
  }));
}
