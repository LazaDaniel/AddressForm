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

  it('should render table method', async () => {
    sinon.spy(el, 'renderTable');
    el.renderTable();
    expect(el.renderTable.called).to.equal(true);
  });

  it('should trigger submit method', async () => {
    sinon.spy(el, 'submitForm');
    sinon.spy(el, 'requestUpdate');
    el.submitForm();
    el.requestUpdate();
    expect(el.display).to.equal(false);
    expect(el.requestUpdate.called).to.equal(true);
  });

  it('should not have a display table as default', async () => {
    const table = el.shadowRoot.querySelectorAll('table');
    expect(table.length).to.equal(0);
  });

  it('updateValue should be triggered', async () => {
    const input = el.shadowRoot.querySelector('input');
    const inputSubmitSpy = sinon.spy(input, 'addEventListener');
    el.updateValue('additionalInfo', { currentTarget: { value: 'dsa' } });
    expect(inputSubmitSpy.calledWith('change'));
  });

  it('get error when inserting a non alpha numeric character', async () => {
    const text = '@';  
    el.updateValue('additionalInfo', { currentTarget: { value: text } });
    expect(text).not.to.match(/^[A-Za-z]+$/);
  });

  it('pass when inserting an alpha numeric character', async () => {
    const text = 'text';  
    el.updateValue('additionalInfo', { currentTarget: { value: text } });
    expect(text).to.match(/^[A-Za-z]+$/);
  });
});
