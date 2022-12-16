import json
import hashlib
import os
from algosdk import mnemonic, constants
from algosdk.v2client import algod
from algosdk.future.transaction import AssetConfigTxn, wait_for_confirmation
from algosdk.future import transaction

def clawbackAsset(sbt_asset_id, claimer_address, issuer_address, issuer_private_key):

    # Connect to node
    algod_address = "http://localhost:4001"
    algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    algod_client = algod.AlgodClient(algod_token, algod_address)

    # Get asset information
    asset_info = algod_client.asset_info(sbt_asset_id)
    print("SBT Info".format(asset_info) + "\n")

    # Get network params
    params = algod_client.suggested_params()

    # Step-1) Unfreeze SBT asset
    try:
        unfreeze_txn = transaction.AssetFreezeTxn(
            sender=issuer_address,
            sp=params,
            index=sbt_asset_id,
            target=claimer_address,
            new_freeze_state=False)
    except Exception as err:
        print(err)
        return

    # Step-2) Update the metadata of the Asseet
    metadataJSON = {
        "standard": "arc69",
        "issuer": issuer_address,
        "claimer": claimer_address,
        "status": "revoked",
        "description": "SBT for CS294-137, F22",
        "mime_type": "image/png",
        "properties": {
            "Course": "Immersive Computing and Virtual Reality",
            "Issuer": "FHL Vive Center for Enhanced Reality, UCB",
            "Term": "Fall 2022"
        }
    }

    metadataStr = json.dumps(metadataJSON)

    try:
        metadata_update_txn = transaction.AssetConfigTxn(
            sender=issuer_address,
            sp=params,
            index=sbt_asset_id,
            note=metadataStr,
            manager=issuer_address,
            reserve=issuer_address,
            freeze=issuer_address,
            clawback=issuer_address,
            strict_empty_address_check=False)
    except Exception as err:
        print(err)
        return

    # 3) Clawback SBT from claimer's account
    try:
        clawback_txn = transaction.AssetTransferTxn(
            sender=issuer_address,
            sp=params,
            receiver=issuer_address,
            amt=1,
            index=sbt_asset_id,
            revocation_target=claimer_address
        )
    except Exception as err:
        print(err)
        return

    # Group unsigned transactions together for Atomic Transfer
    gid = transaction.calculate_group_id([unfreeze_txn, metadata_update_txn, clawback_txn])
    unfreeze_txn.group = gid
    metadata_update_txn.group = gid
    clawback_txn.group = gid

    # Sign the grouped transactions individually
    s_unfreeze_txn = unfreeze_txn.sign(issuer_private_key)
    s_metadata_update_txn = metadata_update_txn.sign(issuer_private_key)
    s_clawback_txn = clawback_txn.sign(issuer_private_key)

    # Assemble transaction group
    signed_group = [s_unfreeze_txn, s_metadata_update_txn, s_clawback_txn]

    # Submit the signed transaction for execution
    txid = algod_client.send_transactions(signed_group)
    print("Successfully sent SBT Revokation transaction with txID: {}".format(txid))

    # wait for confirmation
    try:
        confirmed_txn = transaction.wait_for_confirmation(algod_client, txid, 4)
    except Exception as err:
        print(err)
        return

    print("Transaction information: {}".format(json.dumps(confirmed_txn, indent=4)))
    # Get asset information
    asset_info = algod_client.asset_info(sbt_asset_id)
    print("SBT Info".format(asset_info) + "\n")
