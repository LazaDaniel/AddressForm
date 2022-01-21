import { html, css, LitElement } from 'lit-element';
import { FormInputElement } from './FormInputElement.js'

export class AddressForm extends LitElement {
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
      title: { type: String },
    };
  }

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    const childNodes = slot.assignedNodes({flatten: true});
    return Array.prototype.filter.call(childNodes, (node) => node.nodeType == Node.ELEMENT_NODE);
  }

  handleSlotchange(e) {
    const childNodes = e.target.assignedNodes({flatten: true});
    // ... do something with childNodes ...
    this.allText = Array.prototype.map.call(childNodes, (node) => {
      return node.textContent ? node.textContent : ''
    }).join('');
  }

  constructor() {
    super();
    this.title = '';
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <slot @slotchange=${this.handleSlotchange}></slot>
    `;
  }
}
