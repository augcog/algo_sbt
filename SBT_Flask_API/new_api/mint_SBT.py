import json
import hashlib
import os
from algosdk import mnemonic
from algosdk.v2client import algod
from algosdk.transaction import AssetConfigTxn, wait_for_confirmation
# reference: https://replit.com/@Algorand/CreateNFTPython#main.py
def create_non_fungible_token(ipfs_link,issuer_address,issuer_pk):
  # For ease of reference, add account public and private keys to
  # an accounts dict.
  print("--------------------------------------------")
  print("loading account")
  accounts = {}
  m = issuer_pk
  accounts[1] = {}
  accounts[1]['pk'] = issuer_address
  accounts[1]['sk'] = mnemonic.to_private_key(m)
  print(accounts[1]['pk'])
  algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  algod_address = "http://localhost:4001"
  algod_client = algod.AlgodClient(algod_token, algod_address)
  print("--------------------------------------------")
  print("Creating Asset...")
  # CREATE ASSET
  # Get network params for transactions before every transaction.
  params = algod_client.suggested_params()
    
  
  # Reading from file
  metadataStr = ipfs_link
  print(metadataStr)
  hash = hashlib.new("sha512_256")
  hash.update(b"arc0003/amj")
  hash.update(metadataStr.encode("utf-8"))
  json_metadata_hash = hash.digest()
  print(metadataStr)
  # sets Account 1 as the manager, reserve, freeze, and clawback address.
  # Asset Creation transaction
  txn = AssetConfigTxn(
      sender=accounts[1]['pk'],
      sp=params,
      total=1,
      default_frozen=True,
      unit_name="CS294-VR",
      asset_name="CS294-VR-SBT",
    #   note=metadataStr.encode(),
      manager=accounts[1]['pk'],
      reserve=accounts[1]['pk'],
      freeze=accounts[1]['pk'],
      clawback=accounts[1]['pk'],
      strict_empty_address_check=False,
      url=ipfs_link, 
      metadata_hash=json_metadata_hash,
      decimals=0)

  # Sign with secret key of creator
  stxn = txn.sign(accounts[1]['sk'])

  # Send the transaction to the network and retrieve the txid.
  txid = algod_client.send_transaction(stxn)
  print("Asset Creation Transaction ID: {}".format(txid))


  # Wait for the transaction to be confirmed
  confirmed_txn = wait_for_confirmation(algod_client, txid, 4)  
  print("TXID: ", txid)
  print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))
  try:
      ptx = algod_client.pending_transaction_info(txid)
      asset_id = ptx["asset-index"]
  except Exception as e:
      print(e)

  print("--------------------------------------------")
  print("You have successfully created your frozen Non-fungible token!")
  return asset_id