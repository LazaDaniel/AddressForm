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
    this.values = {};
  }

  submitForm() {
    console.log("this.values:", this.values);
  }

  updateValue(name, e) {
    this.values[name] = e.srcElement.value;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="header"><h2>${this.title}</h2></div>
      <div class="container">
        <div class="inner-container" id="address-form">
          <label for="street-name"> Street name </label>
          <input
            type="text"
            id="street-name"
            maxlength="30"
            pattern="[a-zA-Z0-9]+$"
            @change=${(e) => this.updateValue("streetName", e)}
          />

          <label for="house-number"> House number </label>
          <input
            type="text"
            id="house-number"
            maxlength="5"
            @change=${(e) => this.updateValue("houseNumber", e)}
          />

          <label for="house-number-addition"> House number addition</label>
          <input
            type="number"
            id="house-number-addition"
            maxlength="5"
            @change=${(e) => this.updateValue("houseNumberAddition", e)}
          />

          <label for="postal-code"> Postal code </label>
          <input
            type="text"
            id="postal-code"
            @change=${(e) => this.updateValue("postalCode", e)}
          />

          <label for="city"> City </label>
          <input
            type="text"
            id="city"
            maxlength="30"
            @change=${(e) => this.updateValue("city", e)}
          />

          <label for="additional-information"> Additional information </label>
          <input
            type="text"
            id="additional-information"
            maxlength="50"
            @change=${(e) => this.updateValue("additionalInfo", e)}
          />
          <button @click="${this.submitForm}">Submit</button>
        </div>
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
      </div>
    `;
  }
}
