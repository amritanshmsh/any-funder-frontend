import { useState } from 'react';

import { ContractFactory } from 'ethers';
import { useSigner } from 'wagmi';

import { FUND_ABI, FUND_BYTECODE } from '../config';

import type { Signer } from 'ethers';

export const useDeployContract = (args: any[]) => {
  const [address, setAddress] = useState<string>('');
  const { data: signer } = useSigner();

  const factory = new ContractFactory(FUND_ABI, FUND_BYTECODE).connect(
    signer as Signer
  );

  const deploy = async () => {
    const tx = await factory.deploy(...args);

    await tx.deployed();

    setAddress(tx.address);
  };

  deploy();

  return address;
};
