# Verifier Validation Registry - Proof of Concept

This is a proof of concept implementation for a [Verifier Validation Registry](https://hackmd.io/@FlyingNobita/verifier-validator-registry-proposal-draft).

This registry's main objective is to allow users to quickly check the validity of zero-knowledge proof (ZKP) verifiers.

## Install

```
yarn install
```

## Clean Artifacts

```
cd packages/foundry
forge clean
```

## Test

### Run Tests

```
yarn foundry:test
```

### Run Test with Watch

```shell
yarn foundry:test:watch
```

## Run

1. Run a local network in the first terminal:

```
yarn chain
```

2. On a second terminal, deploy the test contract:

```
yarn deploy
```

3. On a third terminal, start your NextJS app:

```
yarn start
```

## To Dos

- [ ] validator page
- [ ] gas efficient storage for other information
  - Project: Description, Team, URL
  - Verifier: Name, Description, Source link, Status (active, inactive, etc)
  - Validator: social details
- [ ] verifier account owner before action
- [ ] other gas optimization
- [ ] clean out debug code
- [ ] fresh coat of paint / UI
- [ ] remaining TODOs
