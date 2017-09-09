/* eslint-env mocha */
const { expect } = require('chai');
const { all } = require('./index');

all();

describe('qualitylab', () => {
  it('should be an object', () => {
    expect('I love you'.properties()).to.be.an('object');
  });

  it('should have property value', () => {
    expect('I love you'.properties()).to.have.property('value');
  });

  it('should have property length', () => {
    expect('I love you'.properties()).to.have.property('length');
  });

  it('should have the same value', () => {
    expect('I love you'.properties()).to.deep.include({ value: 'I love you' });
  });

  it('should have the text length', () => {
    expect('I love you'.properties()).to.deep.include({ length: 10 });
  });

  it('should give the last 8 chars', () => {
    expect('I love you'.right(8)).to.equal('love you');
  });

  it('should have 8 chars', () => {
    expect('I love you'.right(8)).to.have.lengthOf(8);
  });

  it('should have 8 chars', () => {
    expect('Hey'.right(8)).to.have.lengthOf.below(8);
  });

  it('should have 6 chars', () => {
    expect('I love you'.left(6)).to.have.lengthOf(6);
  });

  it('should end with e', () => {
    expect('I love you'.left(6).endsWith('e')).to.equal(true);
  });

  it('should end with u', () => {
    expect('I love you'.endsWith('u')).to.equal(true);
  });

  it('should give back false when incorrect char', () => {
    expect('I love you'.endsWith('s')).to.equal(false);
  });

  it('should give back false when no char', () => {
    expect('I love you'.endsWith()).to.equal(false);
  });
});

