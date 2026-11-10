/*
 * Personal severity thresholds for the Severity Profile Generator.
 *
 * Same rules as src/severity-profiles.ts in the card (option `auto_severity`),
 * so the page and the card always give the same thresholds. Keep both in sync.
 * Data: severity-data.js (window.severityData).
 */
(function () {
  const LB = 2.20462;

  /** Metrics whose thresholds are masses (kg), converted when the unit is lbs. */
  const MASS_METRICS = ['weight', 'ideal', 'bone_mass', 'muscle_mass', 'skeletal_muscle_mass', 'bcm'];

  /*
   * S400 (dual-frequency) metrics — reference values from the bodymiscale
   * integration (README_S400_UPGRADE.md):
   * - Skeletal muscle: SMI cut-points of Janssen et al. (2004), SMI = SMM / height²:
   *   male 8.51 / 10.75 kg/m², female 5.76 / 6.75 kg/m²
   * - ECW/TBW ratio: normal from 37 % up to 40 % (the integration model cannot
   *   exceed 40 % and gives ~39.2–39.3 % with real impedances; reference range 37–39 %)
   * - ECW, ICW, BCM: the same partition applied to TBW = (1 − fat%/100) × 0.73 × weight,
   *   BCM = ICW / 0.73
   * The outer limits only set the length of the bar.
   */
  const SMI_LIMITS = { male: [6.0, 8.51, 10.75, 14.0], female: [4.0, 5.76, 6.75, 9.0] };
  const ECW_RATIO_LIMITS = [30, 37, 40, 41];
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

  const round = (v, decimals) => {
    const f = 10 ** decimals;
    return Math.round(v * f) / f;
  };

  const bands = (limits, segments, decimals) =>
    segments.map((seg, i) => ({
      from: round(limits[i], decimals),
      to: round(limits[i + 1], decimals),
      color: seg.color,
      label: seg.label,
    }));

  const closestHeight = (table, height) => {
    const heights = Object.keys(table).map((h) => parseInt(h, 10));
    const closest = heights.reduce((prev, curr) =>
      Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev,
    );
    return table[String(closest)];
  };

  function basalMetabolism({ gender, age, weight, height }, activityFactor = 1.9) {
    let bmr;
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

  function s400Profile(key, { gender, height, weight, bodyFat }) {
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

    const icw = [...ecw].reverse().map((e) => tbw - e);
    if (key === 'intracellular_water') return bands(icw, ICW_SEGMENTS, 1);

    return bands(icw.map((v) => v / 0.73), ICW_SEGMENTS, 1); // bcm
  }

  function profileFor(key, p) {
    if (key === 'basal_metabolism') return basalMetabolism(p);

    const s400 = s400Profile(key, p);
    if (s400) return s400;

    const data = window.severityData[key]?.severity;
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
   * Thresholds for one metric, or undefined when the metric has no profile or
   * the profile is incomplete. `person.weight` is in kg, `person.height` in cm.
   * Mass thresholds are converted to lbs when `unitLb` is true.
   */
  function computeSeverity(key, person, unitLb) {
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
      from: toLb ? Math.round(Number(seg.from) * LB * 100) / 100 : seg.from,
      to: toLb ? Math.round(Number(seg.to) * LB * 100) / 100 : seg.to,
    }));
  }

  window.SeverityProfiles = { computeSeverity, MASS_METRICS, LB };
})();
