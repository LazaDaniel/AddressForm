import { html, css, LitElement } from 'lit-element';

export class AddressForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--address-form-text-color, #000);
      }
      .container {
        display: flex;
        flex-direction: column;
        max-width: 500px;
      }
      input {
        margin-bottom: 20px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = '';
    this.values = {};
  }

  submitForm() {
    console.log('this.values:', this.values);
  }

  updateValue(name, e) {
    const inputElement = e.currentTarget;
    this.values[name] = inputElement.value;
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <form class="container" id="address-form">
        <label for="street-name"> Street name </label>
        <input type="text" id="street-name" maxlength="30" pattern="[a-zA-Z0-9]+$" @change=${(e) => this.updateValue('streetName', e)}>

        <label for="house-number"> House number </label>
        <input type="text" id="house-number" maxlength="5" @change=${(e) => this.updateValue('houseNumber', e)}>
        
        <label for="house-number-addition"> House number addition</label>
        <input type="number" id="house-number-addition" maxlength="5" @change=${(e) => this.updateValue('houseNumberAddition', e)}>
        
        <label for="postal-code"> Postal code </label>
        <input type="text" id="postal-code" @change=${(e) => this.updateValue('postalCode', e)}>
        
        <label for="city"> City </label>
        <input type="text" id="city" maxlength="30" @change=${(e) => this.updateValue('city', e)}>
        
        <label for="additional-information"> Additional information </label>
        <input type="text" id="additional-information" maxlength="50" @change=${(e) => this.updateValue('additionalInfo', e)}>
      </form>

      <button @click="${this.submitForm}"> Submit </button>
    `;
  }
}
