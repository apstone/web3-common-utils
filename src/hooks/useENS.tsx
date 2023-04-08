import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { config } from '../index';

const useENS = (address: string) => {
  const [ens, setEns] = useState<string | null>(null);

  useEffect(() => {
    if (!config.infuraProviderConfig)
      throw new Error(
        'Provider is not initialized. Please call initialize() first.'
      );

    if (address) {
      const provider = new ethers.InfuraProvider(
        config.infuraProviderConfig.network,
        config.infuraProviderConfig.projectId,
        config.infuraProviderConfig.projectSecret
      );
      provider
        .lookupAddress(address)
        .then((ens) => {
          setEns(ens);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [address]);

  return ens;
};

export { useENS };
