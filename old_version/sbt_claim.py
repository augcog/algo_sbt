import json
import hashlib
import os
from algosdk import mnemonic, constants
from algosdk.v2client import algod
from algosdk.future.transaction import AssetConfigTxn, wait_for_confirmation
from algosdk.future import transaction


def distributeAsset(sbt_asset_id, claimer_address, issuer_address, issuer_private_key):

    #code will throw an error if the asset has not been opted-in
    #receiver error: must optin

    # Connect to node
    algod_address = "http://localhost:4001"
    algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    algod_client = algod.AlgodClient(algod_token, algod_address)

    # Get asset information
    asset_info = algod_client.asset_info(sbt_asset_id)
    print("SBT Info".format(asset_info) + "\n")

    # Get network params
    params = algod_client.suggested_params()

    # Step-1) Update the metadata to reflect status as "claimed"
    metadataJSON = {
        "standard": "arc69",
        "issuer": issuer_address,
        "claimer": claimer_address,
        "status": "claimed",
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

    # Step-2) Unfreeze SBT
    try:
        unfreeze_txn = transaction.AssetFreezeTxn(
            sender=issuer_address, #asset’s freeze manager
            sp=params,
            index=sbt_asset_id, #index of the asset
            target=claimer_address, #address having its assets frozen or unfrozen
            new_freeze_state=False) #true for frozen, false for transferrable
    except Exception as err:
        print(err)
        return

    # Step-3) Transfer SBT to claimer's account
    try:
        transfer_txn = transaction.AssetTransferTxn(
            sender=issuer_address,
            sp=params,
            receiver=claimer_address,
            amt=1,
            index=sbt_asset_id)
    except Exception as err:
        print(err)
        return

    # Step-4) Freeze SBT again
    try:
        freeze_txn = transaction.AssetFreezeTxn(
            sender=issuer_address,
            sp=params,
            index=sbt_asset_id,
            target=claimer_address,
            new_freeze_state=True)
    except Exception as err:
        print(err)
        return

    # Group unsigned transactions for Atomic Transfer
    gid = transaction.calculate_group_id([metadata_update_txn, unfreeze_txn, transfer_txn, freeze_txn])
    metadata_update_txn.group = gid
    unfreeze_txn.group = gid
    transfer_txn.group = gid
    freeze_txn.group = gid

    # Sign the grouped transactions individually
    s_metadata_update_txn = metadata_update_txn.sign(issuer_private_key)
    s_unfreeze_txn = unfreeze_txn.sign(issuer_private_key)
    s_transfer_txn = transfer_txn.sign(issuer_private_key)
    s_freeze_txn = freeze_txn.sign(issuer_private_key)

    # Assemble signed transaction group
    signed_txn_group = [s_metadata_update_txn, s_unfreeze_txn, s_transfer_txn, s_freeze_txn]

    # Submit transaction for execution
    txid = algod_client.send_transactions(signed_txn_group)
    print("Successfully sent Atomic Transaction for SBT transfer with txID: {}".format(txid))

    # wait for txn confirmation
    try:
        confirmed_txn = transaction.wait_for_confirmation(algod_client, txid, 4)
    except Exception as err:
        print(err)
        return

    print("Transaction information: {}".format(json.dumps(confirmed_txn, indent=4)))
    asset_info = algod_client.asset_info(sbt_asset_id)
    print("SBT Info".format(asset_info) + "\n")