import { html, css, LitElement } from "lit-element";

export class AddressForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--address-form-text-color, #000);
      }
      * {
        font-family: Arial;
      }
      body {
        background-color: #ffeeee !important;
      }
      .container {
        display: flex;
        gap: 20px;
      }
      .header {
        border-left: 10px solid #2c3845;
        padding: 5px 15px;
        margin: 15px 0px;
        border-radius: 5px;
      }
      .error {
        color: #cc0000;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .inner-container {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        width: 100%;
        background-color: #2c3845;
        color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      input {
        margin-bottom: 20px;
        border-radius: 5px;
        color: #bec9d6;
        font-size: 24px;
        border: none;
        padding: 14px;
        background-color: #474f59;
      }
     
      table {
        max-width: 600px;
        background-color: #2c3845;
        color: white;
        min-width: 400px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        height: 400px;
        width: 100%;
      }
      td {
        width: 33%;
        height: 110px;
        border-bottom: 1px solid grey;
        padding: 5px 5px;
        vertical-align: initial;
      }
      td span {
        font-weight: 800;
        font-size: 24px;
        display: block;
        color: #4bb543;
        word-wrap: break-word;
      }

      button {
        background-color: #4bb543;

        width: 100%;
        border: none;
        margin: 20px 0px;
        padding: 20px 0px;
        color: white;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      button:hover {
        transform: scale(1.02);
      }
      tr {
        height: 60px;
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
    this.title = "";
    this.values = {
      streetName: '',
      houseNumber: '',
      houseNumberAddition: '',
      postalCode: '',
      city: '',
      additionalInfo: '',
    };
    this.errors = {
      streetName: '',
      houseNumber: '',
      houseNumberAddition: '',
      postalCode: '',
      city: '',
      additionalInfo: '',
    };
    this.required = {
      streetName: true,
      houseNumber: true,
      houseNumberAddition: false,
      postalCode: true,
      city: true,
      additionalInfo: false,
    };
    this.display = false;
  }

  renderTable() {
    return html`
      <table>
        <tbody>
          <tr>
            <td colspan="3">
              Additional information:
              <span>${this.values.additionalInfo}</span>
            </td>
          </tr>
          <tr>
            <td>Street Name: <span>${this.values.streetName}</span></td>
            <td>House number: <span>${this.values.houseNumber}</span></td>
            <td>
              House number addition:
              <span>${this.values.houseNumberAddition}</span>
            </td>
          </tr>
          <tr>
            <td>Postal code: <span>${this.values.postalCode}</span></td>
            <td colspan="2">City: <span>${this.values.city}</span></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  
  submitForm(e) {
    this.display = false;
    let valid = 0
    Object.keys(this.errors).forEach((key) => {
      if ((this.required[key] === true && this.values[key] === '')) {
        this.errors[key] = 'Required'
      }
      if (this.errors[key] != '') {
        valid = valid + 1;
      }
    });
    if (valid == 0) {
      this.display = true;
      this.requestUpdate();
    }
    else {
      this.display = false;
      this.requestUpdate();
    }
  }

  updateValue(name, e, errorMessage = 'This field contains an error') {
    const inputElement = e.currentTarget;
    if (!e.currentTarget.validity?.valid) {
      this.values[name] = inputElement.value;
      this.errors[name] = errorMessage
      this.display = false;
      this.requestUpdate();
    }
    else {
      this.errors[name] = '';
      this.requestUpdate();
    }
    if (name === 'postalCode') {
      if (inputElement.value.substring(4, 5) != ' ')
        inputElement.value = [inputElement.value.slice(0, 4), ' ', inputElement.value.slice(4)].join('');
    }
    this.values[name] = inputElement.value;
  }

  render() {
    return html` 
    <h2 class="header">${this.title}</h2>
      <div class="container">
        <form class="inner-container" id="address-form" onSubmit="return false">
          <label for="street-name"> Street name </label>
          ${this.errors['streetName'] ? html`<div class="error">*${this.errors['streetName']}</div>` : ""}
          <input type="text" 
              required
              id="street-name" 
              maxlength="30" pattern="^[a-zA-Z0-9 ]+$" 
              @input=${(e) => this.updateValue('streetName', e, 'Required, only alpha-numeric characters allowed')}
            />

          <label for="house-number"> House number </label>
          ${this.errors['houseNumber'] ? html`<div class="error">*${this.errors['houseNumber']}</div>` : ""}
          <input type="text"
              required 
              id="houseNumber" 
              maxlength="5" 
              pattern="^[0-9]+$" 
              @change=${(e) => this.updateValue('houseNumber', e, 'Only numeric characters allowed')}
            />
           
          <label for="house-number-addition"> House number addition</label>
          ${this.errors['houseNumberAddition'] ? html`<div class="error">*${this.errors['houseNumberAddition']}</div>` : ""}
          <input type="text" 
              id="house-number-addition" 
              maxlength="5" 
              @change=${(e) => this.updateValue('houseNumberAddition', e, 'Only alpha-numeric characters allowed')}
            />

          <label for="postal-code"> Postal code </label>
          ${this.errors['postalCode'] ? html`<div class="error">*${this.errors['postalCode']}</div>` : ""}
          <input type="text" 
              required 
              id="postal-code" 
              pattern="[0-9]{4}[A-Z]{2}|[0-9]{4} [A-Z]{2}" 
              @change=${(e) => this.updateValue('postalCode', e, 'Please match NNNNAA or NNNN AA format')}
            />

          <label for="city"> City </label>
          ${this.errors['city'] ? html`<div class="error">*${this.errors['city']}</div>` : ""}
          <input type="text" 
              id='city'
              required 
              maxlength="30" 
              @change=${(e) => this.updateValue('city', e)}
            />
          
          <label for="additional-information"> Additional information </label>
          ${this.errors['additionalInfo'] ? html`<div class="error">*${this.errors['additionalInfo']}</div>` : ""}
          <input
              type="text"
              id="additional-information"
              maxlength="50"
              pattern="^[a-zA-Z0-9 ]+$" 
              @change=${(e) => this.updateValue("additionalInfo", e)}
           />
         <button @click="${(e) => this.submitForm(e)}">Submit</button>
        </form>
      
        ${this.display ? this.renderTable() : ""}

      </div>
    `;
  }
}
