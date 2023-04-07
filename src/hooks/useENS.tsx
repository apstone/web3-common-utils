import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { config } from '../index';

const useENS = (address: string) => {
  if (!config.infuraKey) throw new Error('Infura key not set');

  const [ens, setEns] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      const provider = new ethers.InfuraProvider('homestead', config.infuraKey);
      provider.lookupAddress(address).then((ens) => {
        setEns(ens);
      });
    }
  }, [address]);

  return ens;
};

export default useENS;
