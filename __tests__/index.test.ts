import { getConfig, initialize } from '../index';

describe('getConfig', () => {
  beforeEach(() => {
    initialize({});
  });

  it('should return the default config if none has been set', () => {
    const result = getConfig();
    expect(result).toEqual({});
  });

  it('should return the current config', () => {
    const mockConfig = {
      infuraKey: 'my-infura-key',
    };
    initialize(mockConfig);
    const result = getConfig();
    expect(result).toEqual(mockConfig);
  });
});

describe('initialize', () => {
  beforeEach(() => {
    initialize({});
  });

  it('should set the config options', () => {
    const options = { infuraKey: 'my-infura-key' };
    initialize(options);
    const result = getConfig();
    expect(result).toEqual(options);
  });

  it('should merge with existing config options', () => {
    const existingConfig = { infuraKey: 'my-infura-key' };
    initialize(existingConfig);
    const newOptions = { infuraKey: 'my-new-infura-key' };
    initialize(newOptions);
    const result = getConfig();
    expect(result).toEqual({ infuraKey: 'my-new-infura-key' });
  });
});
