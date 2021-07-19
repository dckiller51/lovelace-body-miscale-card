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
.score {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin-bottom: 10px;
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
.ok {
  visibility: hidden;
}
.problem {
  color: var(--error-color);
  animation: blinker 2s cubic-bezier(.5, 0, 1, 1) infinite alternate;
}
@keyframes blinker {  
  from { opacity: 1; }
  to { opacity: 0; }
}
.state-div {
  display: grid;
  grid-template-columns: 24px repeat(1, auto);
}
.state-label {
  padding: 3px 0px 0px 10px;
}
.score-div {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.score-icon {
  margin-left: 24px;
  flex-basis: 40px;
  flex-shrink: 0;
  flex-grow: 0;
}
.image {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.score-label {
  flex-basis: 30%;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 8px;
}
.score-value {
  margin-right: 24px;
  flex-direction: row;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
.fill-gap {
  flex-grow: 1;
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
}`;