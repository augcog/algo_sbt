import json
import hashlib
import os
from algosdk import mnemonic
from algosdk.v2client import algod
from algosdk.future.transaction import AssetConfigTxn, wait_for_confirmation
from algosdk.future import transaction
# reference: https://replit.com/@Algorand/CreateNFTPython#main.py

#ref: https://github.com/MatiFalcone/algorand-soulbound/tree/main/python
def create_non_fungible_token(issuer_address, issuer_private_key, claimer_address):
    print("--------------------------------------------")
    print("loading account")

    # Connect to node
    algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    algod_address = "http://localhost:4001"
    algod_client = algod.AlgodClient(algod_token, algod_address)

    print("--------------------------------------------")
    print("Creating Asset...")

    # Get account information
    account_info = algod_client.account_info(issuer_address)
    print("Account balance: {} microAlgos".format(account_info.get('amount')) + "\n")

    # Get network params for transactions before every transaction.
    params = algod_client.suggested_params()

    # ARC69 allows us to write metadata on the blockchain itself in the Notes field
    metadataJSON = {
        "standard": "arc69",
        "issuer": issuer_address,
        "claimer": claimer_address,
        "status": "issued",
        "description": "SBT for CS294-137, F22",
        "mime_type": "image/png",
        "properties": {
            "Course": "Immersive Computing and Virtual Reality",
            "Issuer": "FHL Vive Center for Enhanced Reality, UCB",
            "Term": "Fall 2022"
        }
    }

    metadataStr = json.dumps(metadataJSON)
    hash = hashlib.new("sha512_256")
    hash.update(metadataStr.encode("utf-8"))
    json_metadata_hash = hash.digest()
    print("json metadata hash {}".format(json_metadata_hash))

    try:
        txn = AssetConfigTxn(
            sender=issuer_address,
            sp=params,
            total=1,
            default_frozen = True,
            unit_name = "arc69",
            asset_name = "SBT for CS294-137, F22", #max 32 characters
            manager = issuer_address,
            reserve = issuer_address,
            freeze = issuer_address,
            clawback = issuer_address,
            url = "ipfs://QmPJiSwGKqwt3VEw11LDSmnv3hRAK9L5SpJeo8gRTbX6WF",
            metadata_hash = json_metadata_hash,
            strict_empty_address_check=False,
            note = metadataStr,
            decimals = 0)
    except Exception as err:
        print(err)
        return

    # Sign transaction
    stxn = txn.sign(issuer_private_key)

    # Submit transaction
    txid = algod_client.send_transaction(stxn)
    print("SBT Creation Transaction ID: {}".format(txid))

    # wait for confirmation
    try:
        confirmed_txn = transaction.wait_for_confirmation(algod_client, txid, 4)
        print("TXID: ", txid)
        print("Result confirmed in round: {}".format(confirmed_txn['confirmed-round']))
    except Exception as err:
        print(err)
        return

    try:
        ptx = algod_client.pending_transaction_info(txid)
        asset_id = ptx["asset-index"]
    except Exception as e:
        print(e)

    print("Transaction information: {}".format(json.dumps(confirmed_txn, indent=4)))
    print("Starting Account balance: {} microAlgos".format(account_info.get('amount')))
    print("Fee: {} microAlgos".format(params.fee))

    account_info = algod_client.account_info(issuer_address)
    print("Final Account balance: {} microAlgos".format(account_info.get('amount')) + "\n")

    print("--------------------------------------------")
    print("You have successfully created your frozen SoulBound Token!")

    return asset_id