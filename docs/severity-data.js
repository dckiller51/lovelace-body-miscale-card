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

  },
  muscle_mass: {

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
