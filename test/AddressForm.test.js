import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../address-form.js';

describe('Address form', () => {
  let el;
  before(async () => {
    el = await fixture(html`<address-form .title=${''}></address-form>`);
  });

  it('should have title.', async () => {
    const addressForm = await fixture(html`
      <address-form .title=${'Foo Bar'}> </address-form>
    `);
    await addressForm.updateComplete;
    expect(addressForm.title).to.equal('Foo Bar');
  });

  it('has a form', async () => {
    const forms = el.shadowRoot.querySelectorAll('form');
    expect(forms.length).to.equal(1);
  });

  it('should have a submit button', async () => {
    const button = el.shadowRoot.querySelectorAll('button');
    expect(button.length).to.equal(1);
  });

  it('should submit form ', async () => {
    const submitBtn = el.shadowRoot.querySelector('form');
    const submitBtnSpy = sinon.spy(submitBtn, 'addEventListener');
    el.submitForm();
    expect(submitBtnSpy.calledWith('click'));
  });

  it('updateValue should be triggered', async () => {
    const input = el.shadowRoot.querySelector('input');
    console.log('input', input);
    const inputSubmitSpy = sinon.spy(input, 'addEventListener');
    console.log('inputSubmitSpy', inputSubmitSpy);
    el.updateValue('additionalInfo', {currentTarget: {value: 'asd'}});
    expect(inputSubmitSpy.calledWith('change'));
  });
});
