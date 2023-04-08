import { renderHook } from '@testing-library/react-hooks';
import { ethers } from 'ethers';

import { useENS } from '../../src/hooks/useENS';
import { initialize } from '../../src/index';

describe('useENS', () => {
  it('throws an error when the provider is not initialized', () => {
    const { result } = renderHook(() => useENS('0x123'));
    expect(result.error).toEqual(
      new Error('Provider is not initialized. Please call initialize() first.')
    );
  });
  it('returns null when address is not provided', () => {
    initialize({
      infuraProviderConfig: {
        network: 'mainnet',
        projectId: 'my-project-id',
        projectSecret: 'my-project-secret',
      },
    });
    const { result } = renderHook(() => useENS(''));
    expect(result.current).toBeNull();
  });

  it('resolves the ENS name for the given address', async () => {
    initialize({
      infuraProviderConfig: {
        network: 'mainnet',
        projectId: 'my-project-id',
        projectSecret: 'my-project-secret',
      },
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
      useENS('0x21C7D619baE3bF026B469eFe44f9157D59131e0a')
    );
    expect(result.current).toBeNull();

    await waitForNextUpdate();

    expect(lookupAddressMock).toHaveBeenCalledWith(
      '0x21C7D619baE3bF026B469eFe44f9157D59131e0a'
    );
    expect(result.current).toBe(ensName);

    InfuraProviderSpy.mockRestore();
  });
});
