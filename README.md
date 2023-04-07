# web3-common-utils

web3-common-utils is a library that provides common utility functions and React hooks for working with web3. It aims to simplify the development of dApps that use web3.

## Installation

You can install web3-common-utils using npm:

```bash
npm install web3-common-utils
```

## Usage

Here's an example of using useENS hook:

```jsx
import React from 'react';
import { useENS, initialize } from 'web3-common-utils';

initialize({
  infuraKey: 'your-infura-key',
});

function MyComponent() {
  const [address, setAddress] = React.useState('');
  const ensName = useENS(address);

  return (
    <div>
      <label>
        Enter an Ethereum address:
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      {ensName ? <p>The ENS name is {ensName}</p> : null}
    </div>
  );
}
```

This will display a text input where the user can enter an Ethereum address. When the user types an address, the useENS hook will resolve the corresponding ENS name, if it exists, and display it.

## License

web3-common-utils is MIT licensed.
