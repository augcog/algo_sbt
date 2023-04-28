import json
import hashlib
import os
from algosdk import mnemonic
from algosdk.v2client import algod
from algosdk import transaction
# reference: https://replit.com/@Algorand/CreateNFTPython#main.py
def RevokeAsset(asset_id,receiver_address,issuer_address,issuer_pk):
  algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  algod_address = "http://localhost:4001"
  algod_client = algod.AlgodClient(algod_token, algod_address)
  accounts = {}
  m = issuer_pk
  accounts[1] = {}
  accounts[1]['pk'] = issuer_address
  accounts[1]['sk'] = mnemonic.to_private_key(m)
  txn = transaction.AssetTransferTxn(
        sender=accounts[1]['pk'],
        sp=algod_client.suggested_params(),
        receiver=accounts[1]['pk'],
        amt=1,
        index=asset_id,
        revocation_target=receiver_address
    )
  signedTxn = txn.sign(accounts[1]['sk'])
  algod_client.send_transaction(signedTxn)
  response = transaction.wait_for_confirmation(algod_client, signedTxn.get_txid(),4)
  print("--------------------------------------------")
  print("You have successfully revoke frozen Non-fungible token!")
