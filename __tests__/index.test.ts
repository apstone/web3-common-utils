import { Config, getConfig, initialize } from '../src/index';

describe('getConfig', () => {
  beforeEach(() => {
    initialize({});
  });

  it('should return the default config if none has been set', () => {
    const result = getConfig();
    expect(result).toEqual({});
  });

  it('should return the current config', () => {
    const mockConfig: Config = {
      infuraProviderConfig: {
        network: 'mainnet',
        projectId: 'my-project-id',
        projectSecret: 'my-project-secret',
      },
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
    const options: Config = {
      infuraProviderConfig: {
        network: 'mainnet',
        projectId: 'my-project-id',
        projectSecret: 'my-project-secret',
      },
    };
    initialize(options);
    const result = getConfig();
    expect(result).toEqual(options);
  });

  it('should merge with existing config options', () => {
    const existingConfig: Config = {
      infuraProviderConfig: {
        network: 'mainnet',
        projectId: 'my-project-id',
        projectSecret: 'my-project-secret',
      },
    };
    initialize(existingConfig);
    const newOptions: Config = {
      infuraProviderConfig: {
        network: 'mainnet',
        projectId: 'my-project-id-123',
        projectSecret: 'my-project-secret',
      },
    };
    initialize(newOptions);
    const result = getConfig();
    expect(result).toEqual(newOptions);
  });
});
