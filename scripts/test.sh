#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

# Executes cleanup function at script exit.
trap cleanup EXIT

cleanup() {
  # Kill the testrpc instance that we started (if we started one and if it's still running).
  if [ -n "$testrpc_pid" ] && ps -p $testrpc_pid > /dev/null; then
    kill -9 $testrpc_pid
  fi
}

# Port for the testrpc
testrpc_port=8545

testrpc_running() {
  nc -z localhost "$testrpc_port"
}

start_testrpc() {
  # We define 10 accounts with balance 1M ether, needed for high-value tests.
  local accounts=(
    --account="0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3,1000000000000000000000000"
    --account="0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f,1000000000000000000000000"
    --account="0x0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1,1000000000000000000000000"
    --account="0xc88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c,1000000000000000000000000"
    --account="0x388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418,1000000000000000000000000"
    --account="0x659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63,1000000000000000000000000"
    --account="0x82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8,1000000000000000000000000"
    --account="0xaa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7,1000000000000000000000000"
    --account="0x0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4,1000000000000000000000000"
    --account="0x8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5,1000000000000000000000000"
  )

  node_modules/.bin/testrpc --gasLimit 0xfffffffffff "${accounts[@]}" > /dev/null &
  testrpc_pid=$!
}

if testrpc_running; then
  echo "Using existing testrpc instance"
else
  echo "Starting our own testrpc instance"
  start_testrpc
fi

node_modules/.bin/truffle test "$@"
