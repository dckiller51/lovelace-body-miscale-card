/* eslint-disable @typescript-eslint/no-unused-vars */
function generateSeverityTable() {
    // Get age and gender inputs
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
  
    // Validate inputs
    if (isNaN(age) || age <= 0) {
      alert('Please enter a valid age.');
      return;
    }
  
    // Example severity configurations for metrics
    const severityConfig = {
      basal_metabolism: [
        { from: 0, to: 1549, color: 'red', label: 'objective_not_achieved' },
        { from: 1549, to: 3000, color: 'green', label: 'objective_achieved' },
      ],
      bmi: [
        { from: 12, to: 18.5, color: 'blue', label: 'low' },
        { from: 18.5, to: 25.0, color: 'green', label: 'normal' },
        { from: 25.0, to: 30.0, color: 'orange', label: 'high' },
        { from: 30.0, to: 36.5, color: 'red', label: 'very_high' },
      ],
      body_fat: [
        { from: 5, to: 12, color: 'blue', label: 'very_low' },
        { from: 12, to: 18, color: 'royalblue', label: 'low' },
        { from: 18, to: 23, color: 'green', label: 'normal' },
        { from: 23, to: 28, color: 'orange', label: 'increased' },
        { from: 28, to: 35, color: 'red', label: 'high' },
      ],
      bone_mass: [
        { from: 0, to: 2.00, color: 'red', label: 'insufficient' },
        { from: 2.00, to: 4.20, color: 'green', label: 'normal' },
        { from: 4.20, to: 6.40, color: 'blue', label: 'good' },
      ],
      ideal: [
        { from: 39.30, to: 57.30, color: 'blue', label: 'underweight' },
        { from: 57.30, to: 75.30, color: 'green', label: 'balanced' },
        { from: 75.30, to: 93.30, color: 'orange', label: 'overweight' },
        { from: 93.30, to: 111.30, color: 'red', label: 'obese' },
      ],
      muscle_mass:[
        { from: 39.30, to: 49.40, color: 'red', label: 'insufficient' },
        { from: 49.40, to: 59.50, color: 'green', label: 'normal' },
        { from: 59.50, to: 69.60, color: 'blue', label: 'good' },
      ],
      protein: [
        { from: 11, to: 16, color: 'red', label: 'insufficient' },
        { from: 16, to: 20, color: 'green', label: 'normal' },
        { from: 20, to: 24, color: 'blue', label: 'good' },
      ],
      visceral_fat: [
        { from: 5, to: 10, color: 'green', label: 'normal' },
        { from: 10, to: 15, color: 'orange', label: 'high' },
        { from: 15, to: 20, color: 'red', label: 'very_high' },
      ],
      water: [
        { from: 45, to: 55, color: 'red', label: 'insufficient' },
        { from: 55, to: 65.1, color: 'green', label: 'normal' },
        { from: 65.1, to: 75, color: 'blue', label: 'good' },
      ]
    };
  
    // Adjust configurations based on age and gender (for now, just a placeholder logic)
    if (age > 30) {
      severityConfig.bmi[2].color = 'orange'; // Example adjustment for age
    }
  
    // Generate the table
    let tableHtml = '<table><tr><th>Metric</th><th>From</th><th>To</th><th>Color</th><th>Label</th></tr>';
  
    for (const metric in severityConfig) {
      severityConfig[metric].forEach(segment => {
        tableHtml += `<tr style="background-color: ${segment.color};">
          <td>${metric}</td>
          <td>${segment.from}</td>
          <td>${segment.to}</td>
          <td>${segment.color}</td>
          <td>${segment.label}</td>
        </tr>`;
      });
    }
  
    tableHtml += '</table>';
  
    // Display the generated table in the div
    document.getElementById('severity-table').innerHTML = tableHtml;
  }
  