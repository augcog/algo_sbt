import json
import hashlib
import os
from algosdk import mnemonic
from algosdk.v2client import algod
from algosdk.future.transaction import AssetConfigTxn, wait_for_confirmation
from algosdk.future import transaction
# reference: https://replit.com/@Algorand/CreateNFTPython#main.py
def RevokeAsset(asset_id,receiver_address):
  algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  algod_address = "http://localhost:4001"
  algod_client = algod.AlgodClient(algod_token, algod_address)
    # JSON file
  dir_path = os.path.dirname(os.path.realpath(__file__))
  f = open (dir_path + '/NFTmetadata.json', "r")
  # Reading from file
  metadataJSON = json.loads(f.read())
  metadataStr = json.dumps(metadataJSON)
  accounts = {}
  m = "blanket erupt math cargo stay trophy give shell mix nominee margin gain zoo trumpet arrow always secret between sound visual gentle amount million able olympic"
  accounts[1] = {}
  accounts[1]['pk'] = mnemonic.to_public_key(m)
  accounts[1]['sk'] = mnemonic.to_private_key(m)
  txn = transaction.AssetTransferTxn(
        sender=accounts[1]['pk'],
        sp=algod_client.suggested_params(),
        receiver=accounts[1]['pk'],
        amt=1,
        index=asset_id,
        # note=metadataStr.encode(),
        revocation_target=receiver_address
    )
  signedTxn = txn.sign(accounts[1]['sk'])
  algod_client.send_transaction(signedTxn)
  response = transaction.wait_for_confirmation(algod_client, signedTxn.get_txid(),4)
  print("--------------------------------------------")
  print("You have successfully revoke frozen Non-fungible token!")
