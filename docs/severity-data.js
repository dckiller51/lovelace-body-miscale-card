const profiles = {
  basal_metabolism: {

  },
  bmi: [
    { from: 12, to: 18.5, color: 'blue', label: 'low' },
    { from: 18.5, to: 25.0, color: 'green', label: 'normal' },
    { from: 25.0, to: 30.0, color: 'orange', label: 'high' },
    { from: 30.0, to: 36.5, color: 'red', label: 'very_high' }
  ],
  bodyfat: {
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
  },
  bone_mass: {
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
  },
  ideal: {
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
  },
  muscle_mass: {
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
  },
  protein: {

  },
  visceral_fat: [
    { from: 5, to: 10, color: 'green', label: 'normal' },
    { from: 10, to: 15, color: 'orange', label: 'high' },
    { from: 15, to: 20, color: 'red', label: 'very_high' }
  ],
  water: {
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
  },
  weight: {

  }
};

// Attacher `severityData` à l'objet global `window`
window.severityData = profiles;
