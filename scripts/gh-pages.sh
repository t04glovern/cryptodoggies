#!/usr/bin/env bash

## This script will migrate all necessary files from
## various locations into the docs/ directory for serving
## using GitHub pages
rm -rf docs
cp -R src/ docs/
cp scripts/CNAME docs/
cp build/contracts/CryptoDoggies.json docs/
