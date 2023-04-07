import { renderHook } from '@testing-library/react-hooks';
import { ethers } from 'ethers';

import useENS from '../../hooks/useENS';
import { initialize } from '../..';

describe('useENS', () => {
  it('returns null when address is not provided', () => {
    initialize({
      infuraKey: 'my-infura-key',
    });
    const { result } = renderHook(() => useENS(''));
    expect(result.current).toBeNull();
  });

  it('throws an error when Infura key is not set', () => {
    initialize({
      infuraKey: undefined,
    });

    expect(() => useENS('0x123456789abcdef')).toThrowError(
      'Infura key not set'
    );
  });
  it('resolves the ENS name for the given address', async () => {
    initialize({
      infuraKey: 'my-infura-key',
    });
    const ensName = 'my-ens-name.eth';
    const lookupAddressMock = jest.fn(() => Promise.resolve(ensName));
    const InfuraProviderSpy = jest
      .spyOn(ethers, 'InfuraProvider')
      .mockImplementation(() => {
        return {
          lookupAddress: lookupAddressMock,
        } as any;
      });

    const { result, waitForNextUpdate } = renderHook(() =>
      useENS('0x123456789abcdef')
    );
    expect(result.current).toBeNull();

    await waitForNextUpdate();

    expect(lookupAddressMock).toHaveBeenCalledWith('0x123456789abcdef');
    expect(result.current).toBe(ensName);

    InfuraProviderSpy.mockRestore();
  });
});
