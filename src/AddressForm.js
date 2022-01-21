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
    e.preventDefault()
    if (name === 'postalCode'){
      if(inputElement.value.substring(4,5)!=' ')
      inputElement.value = [inputElement.value.slice(0, 4), ' ', inputElement.value.slice(4)].join('');
      }
      this.values[name] = inputElement.value;
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <form class="container" id="address-form">
        <label for="street-name"> Street name </label>
        <input type="text" required id="street-name" maxlength="30" pattern="^[a-zA-Z0-9 ]+$" oninvalid="()=>{this.setCustomValidity('Required, only alpha-numeric characters allowed'); this.checkValidity()" @change=${(e) => this.updateValue('streetName', e)}>
        </br>
        <label for="house-number"> House number </label>
        <input type="text" required id="house-number" maxlength="5" pattern="^[0-9]+$" oninvalid="()=>{this.setCustomValidity('Only numeric characters allowed'); this.checkValidity()" @change=${(e) => this.updateValue('houseNumber', e)}>
        </br>
        <label for="house-number-addition"> House number addition</label>
        <input type="text" id="house-number-addition" maxlength="5" pattern="^[a-zA-Z0-9]+$" oninvalid="()=>{this.setCustomValidity('Only alpha-numeric characters allowed'); this.checkValidity()" @change=${(e) => this.updateValue('houseNumberAddition', e)}>
        </br>
        <label for="postal-code"> Postal code </label>
        <input type="text" required id="postalCode" pattern="[0-9]{4}[A-Z]{2}|[0-9]{4} [A-Z]{2}" oninvalid="()=>{this.setCustomValidity('Please match NNNNAA or NNNN AA format'); this.checkValidity()" @change=${(e) => this.updateValue('postalCode', e)}>
        </br>
        <label for="city"> City </label>
        <input type="text" id='city 'required maxlength="30" @change=${(e) => this.updateValue('city', e)}>
        </br>
        <label for="additional-information"> Additional information </label>
        <input type="text" id="additional-information" maxlength="50"  pattern="^[a-zA-Z0-9 ]+$" @change=${(e) => this.updateValue('additionalInfo', e)}>
        </br>
        <button @submit="${this.submitForm}"> Submit </button>
      </form>    
    `;
  }
}
