from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import requests
import base64
# requires Python SDK version 1.3 or higher
from algosdk.v2client import indexer
from mint_SBT import create_non_fungible_token
from claim_SBT import distributeAsset
from revoke_SBT import RevokeAsset
# instantiate indexer client
myindexer = indexer.IndexerClient(indexer_token="", indexer_address="http://localhost:8980")


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
@app.route("/")
def root():
    return render_template("index.html")

@app.route('/display', methods=['POST'])
def display():
    address = request.form.get("Address")
    assetid = request.form.get("AssetId")
    notes = []
    # find the all assetid this address had https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/27TQXOPJDV6VA3R2WAHCORLHDURY7K77UO6IKK4TB7PQIIJFKDLKSDNLKU
    owningassets = []
    content = requests.get('https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/'+address).content
    print(json.loads(content.decode()))
    assets = json.loads(content.decode())['account']['assets']
    for a in assets:
        if a['amount'] > 0:
            owningassets.append(a['asset-id'])
    if (assetid != ""):
        content = requests.get('https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/'+address+'/transactions?asset-id='+assetid).content
        note = base64.b64decode(json.loads(content.decode())['transactions'][0]['note'])
        if asset_id in owningassets:
            notes.append(note)
    else:
        content = requests.get('https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/'+address+'/transactions').content
        transactions = json.loads(content.decode())['transactions']
        print(type(transactions))
        for t in transactions:
            # find asset id in this transaction
            # asset-transfer-transaction
            if 'asset-transfer-transaction' in t:
                asset_id = t["asset-transfer-transaction"]['asset-id']
                print(asset_id)
                if asset_id not in owningassets:
                    continue
            if 'note' in t:
                print(type(bytes.decode(base64.b64decode(t["note"]))))
                print(bytes.decode(base64.b64decode(t["note"])))
                try:
                    notes.append(json.loads(bytes.decode(base64.b64decode(t["note"]))))
                except:
                    print("error")
    
    return notes

@app.route('/*', methods=['OPTIONS'])
def handle_options(path=None):
    print("options")
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST', 
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    return ('', 204, headers)

@app.route('/mint', methods=['POST', 'OPTIONS'])
def mint():
    data = request.get_json()
    setting_id = data.get("settingsID")
    issuer_address = data.get("issuerWalletAddress")
    issuer_pk = data.get("privateKey")
    ipfs_link = "setting_id: "+str(setting_id)
    assetid = create_non_fungible_token(ipfs_link,issuer_address,issuer_pk)
    print(assetid)
    return {"assetid": str(assetid)}

@app.route('/issue', methods=['POST'])
def distribute():
    print("issue")
    data = request.get_json()
    address = data.get("receiverWalletAddress")
    issuer_address = data.get("issuerWalletAddress")
    issuer_pk = data.get("privateKey")
    assetid = data.get("sbtID")
    print(address)
    print(assetid)
    try:
        print("will issue")
        distributeAsset(assetid,address,issuer_address,issuer_pk)
        response = address+" received SBT "+assetid
        return str(response)
    except Exception as e:
        print(e)
        return "Please opt in the SBT"
    
@app.route('/revoke', methods=['POST'])
def revoke():
    data = request.get_json()
    address = data.get("receiverWalletAddress")
    issuer_address = data.get("issuerWalletAddress")
    issuer_pk = data.get("privateKey")
    assetid = data.get("sbtID")
    print(address)
    print(assetid)
    try:
        RevokeAsset(assetid,address,issuer_address,issuer_pk)
        return "You have successfully revoke SBT!"
    except: 
        return "Error"

app.run(port=8085,debug=True,threaded=True)