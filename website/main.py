from flask import Flask, render_template, request, jsonify
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
    
    #print("Account Info: " + json.dumps(response, indent=2, sort_keys=True))
    return render_template("index.html",data=notes)
    # your code
    # return a response


@app.route('/mint', methods=['POST'])
def mint():
    assetid = create_non_fungible_token()
    #print("Account Info: " + json.dumps(response, indent=2, sort_keys=True))
    return render_template("index.html",AssetId=assetid)

@app.route('/distribute', methods=['POST'])
def distribute():
    address = request.form.get("ReceiverAddress")
    assetid = request.form.get("SBTId")
    print(address)
    print(assetid)
    try:
        distributeAsset(assetid,address)
        response = address+" received SBT "+assetid
        return render_template("index.html",rep=response)
    except: 
        return render_template("index.html",rep="Please opt in the SBT!")
    #print("Account Info: " + json.dumps(response, indent=2, sort_keys=True))
@app.route('/revoke', methods=['POST'])
def revoke():
    address = request.form.get("ReceiverAddress2")
    assetid = request.form.get("SBTId2")
    print(address)
    print(assetid)
    try:
        RevokeAsset(assetid,address)
        return render_template("index.html",revokerep="You have successfully revoke SBT!")
    except: 
        return render_template("index.html",revokerep="Error")
app.run(port=8085,debug=True,threaded=True)