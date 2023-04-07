export type Config = {
  infuraKey?: string;
};

export let config: Config = {};

export function initialize(options: Config) {
  config = {
    ...config,
    ...options,
  };
}

export function getConfig(): Config {
  return { ...config };
}
