import { css } from 'lit';

export const styles = css`
  ha-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .background {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height: 220px;
  }
  .pointer {
    cursor: pointer;
  }
  .preview {
    background-color: var(--primary-color);
    cursor: pointer;
    overflow: hidden;
    position: relative;
  }
  .preview.not-available {
    filter: grayscale(1);
  }
  .not-available {
    text-align: center;
    color: var(--text-primary-color);
    font-size: 16px;
  }
  .metadata {
    margin: 10px auto;
  }
  .title {
    font-size: 20px;
    padding: 12px 16px 8px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    cursor: pointer;
  }
  .grid-content {
    display: grid;
    align-content: flex-start;
    grid-row-gap: 6px;
  }
  .grid-left {
    text-align: left;
    font-size: 110%;
    padding-left: 10px;
    border-left: 2px solid var(--primary-color);
  }
  .grid-right {
    text-align: right;
    padding-right: 10px;
    border-right: 2px solid var(--primary-color);
  }
  #items {
    padding: 0;
    margin: 0;
    overflow: hidden;
    max-height: 0;
  }
  #items[open] {
    overflow: visible;
    max-height: none;
  }
  .toolbar {
    min-height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .toolbar ha-icon-button:first-child {
    margin-left: 5px;
  }
  .toolbar ha-icon-button:last-child {
    margin-right: 5px;
  }
  .fill-gap {
    flex-grow: 1;
  }
  .image {
    display: var(--ha-icon-display, inline-flex);
    align-items: center;
    justify-content: center;
    position: relative;
    vertical-align: middle;
    fill: currentcolor;
    width: var(--mdc-icon-size, 24px);
    height: var(--mdc-icon-size, 24px);
  }
  .ok {
    visibility: hidden;
  }
  .problem {
    color: var(--error-color);
    animation: blinker 2s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
  }
  @keyframes blinker {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .state-div {
    display: grid;
    grid-template-columns: 24px repeat(1, auto);
  }
  .state-label {
    padding: 3px 0px 0px 10px;
  }
  #score {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 8px;
  }
  #score > * {
    margin-bottom: 8px;
  }
  #score > :last-child {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  #score > :first-child {
    margin-top: 0px;
  }
  score-card-row {
    display: flex;
    flex-grow: 1;
  }
  score-card-row > div {
    flex-basis: 100%;
  }
  score-card-row:empty {
    display: none;
  }
  score-card-card {
    display: flex;
    flex-basis: 100%;
    flex-direction: row;
    margin-right: 8px;
  }
  score-card-card:last-child {
    margin-right: 0px;
  }
  score-card-background {
    cursor: pointer;
    flex-grow: 1;
    position: relative;
  }
  score-card-iconbar {
    color: var(--icon-color, var(--paper-item-icon-color));
    align-items: center;
    align-self: center;
    display: flex;
    height: 30px;
    justify-content: center;
    position: relative;
    width: 30px;
  }
  score-card-currentbar,
  score-card-backgroundbar,
  score-card-contentbar,
  score-card-targetbar {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: var(--score-card-border-radius, var(--ha-card-border-radius));
  }
  score-card-contentbar {
    align-items: center;
    color: var(--primary-text-color);
    display: flex;
    justify-content: flex-start;
  }
  .contentbar-direction-right {
    flex-direction: row;
  }
  .contentbar-direction-up {
    flex-direction: column;
  }
  score-card-backgroundbar {
    background: var(--bar-color);
    filter: brightness(0.5);
    opacity: 0.25;
  }
  score-card-currentbar {
    background: linear-gradient(
      to var(--bar-direction),
      var(--bar-color) var(--bar-percent),
      #0000 var(--bar-percent),
      #0000 var(--bar-percent)
    );
  }
  score-card-targetbar {
    background: linear-gradient(
      to var(--bar-direction),
      #0000 var(--bar-percent),
      var(--bar-color) var(--bar-percent),
      var(--bar-color) var(--bar-target-percent),
      #0000 var(--bar-target-percent)
    );
    display: var(--target-display);
    filter: brightness(0.66);
    opacity: 0.33;
  }
  score-card-markerbar {
    background: var(--bar-color);
    filter: brightness(0.75);
    opacity: 50%;
    position: absolute;
  }
  score-card-name {
    align-items: center;
    align-self: center;
    justify-content: center;
    margin: 4px;
    overflow: hidden;
    position: relative;
    text-align: left;
    text-overflow: ellipsis;
  }
  .name-outside {
    margin-left: 16px;
  }
  score-card-value,
  score-card-min,
  score-card-max,
  score-card-divider {
    align-self: center;
    position: relative;
  }
  score-card-min,
  score-card-max,
  score-card-divider {
    font-size: 10px;
    margin: 2px;
    opacity: 0.5;
  }
  .min-direction-up {
    margin-top: auto;
  }
  .min-direction-right {
    margin-left: auto;
  }
  score-card-divider {
    margin-left: 0px;
    margin-right: 0px;
  }
  score-card-value {
    white-space: nowrap;
    margin: 4px;
  }
  .value-direction-right {
    margin-left: auto;
  }
  .value-direction-up {
    margin-top: auto;
  }
`;
