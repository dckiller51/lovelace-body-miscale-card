const profiles = {
  basal_metabolism: {

  },
  bmi: {

  },
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

  },
  ideal: {

  },
  muscle_mass: {

  },
  protein: {

  },
  visceral_fat: {

  },
  water: {

  },
  weight: {

  }
};

// Attacher `severityData` à l'objet global `window`
window.severityData = profiles;
