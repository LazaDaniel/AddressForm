import { html, css, LitElement } from 'lit-element';

export class FormInputElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--address-form-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      value: { type: String },
      label: {type: String},
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
        <label for="t2">${this.label}</label>
        <input type="email" id="t2" name="email" value=${this.value}>
    `;
  }
}
