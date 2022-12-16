## User and Developer Documentation at:
https://docs.google.com/document/d/1Mu2MYntf_HmPBQb2KO5B96jY1GwtM6vTfiBhXJeaD4E/edit?usp=sharing

## How to call the functions

### 1. import the libraries
import os  
from sbt_mint import mintAsset  
from sbt_claim import distributeAsset  
from sbt_clawback import clawbackAsset  
from algosdk import mnemonic, constants  
from algosdk.v2client import algod  
from algosdk.future.transaction import AssetConfigTxn, wait_for_confirmation  
from algosdk.future import transaction  

### 2. Issuer: To mint a new SBT
mintAsset(issuer_address,issuer_private_key,claimer_address)

### 3. Receiver: 
Use Pera Algo Wallet (on Android, iOS) or https://wallet.myalgo.com/ (on browser) to claim SBT issued in Step-2

### 4. Issuer: Atomic transaction to update metadata, transfer SBT, and freeze SBT
distributeAsset(sbt_asset_id, claimer_address, issuer_address, issuer_private_key)

### 5. Issuer: In case Clawback is required:
clawbackAsset(sbt_asset_id, claimer_address, issuer_address, issuer_private_key)

## SBT issued as per ARC-69
ARC69 allows Token properties to be listed in the Notes field on the Blockchain. For example:  
{
  "standard": "arc69",
  "issuer": "6HSPR27ERLFJGOZMQDJQHH6XDNP2WXWH64QKWFT6NZMATXWTLE6HHEI3FQ",
  "claimer": "DBRZIGCXWLVMNABW3MNTB7RFYXDEK6ORQYPGNUV4JDBRZYKIV6EXRFXCTU",
  "status": "claimed",
  "description": "SBT for CS294-137, F22",
  "mime_type": "image/png",
  "properties": {
    "Course": "Immersive Computing and Virtual Reality",
    "Issuer": "FHL Vive Center for Enhanced Reality, UCB",
    "Term": "Fall 2022"
  }
}
