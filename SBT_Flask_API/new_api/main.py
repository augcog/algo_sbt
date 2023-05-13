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
import os
import ipfsApi
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

@app.route('/manage-wallets', methods=['POST'])
def ipfs_html_gen():

    data = request.get_json()
    tasks_list = data.get("tasks_list")
    wallets = data.get("wallets")
    weight = data.get("weight")
   
    
    output = []
    project_completion = 0
    for idx, sub_task in enumerate(tasks_list['tasks']):
        if ((sub_task["status"]["status"]=="complete")):
            assignees = []
            for a in sub_task['assignees']:
                assignees.append(a['email'])
            project_name = sub_task['list']['name']
            task_weight = weight[sub_task['id']]['weight']
            project_completion += float(task_weight)
            try:
                task_contrib = weight[sub_task['id']]['task_contrib']*task_weight
            except:
                if len(assignees)>=1:
                    task_contrib = [task_weight/len(assignees)] * len(assignees)
                else:
                    task_contrib = None
            output.append({'task_id': sub_task['id'],
                           'task_name': sub_task['name'],
                           'task_finish_date': sub_task['due_date'],
                           'task_assignees': assignees,
                           'parent_task': sub_task['parent'],
                           'task_weight': task_weight,
                           'task_contrib': task_contrib})

    html_files_hash = []
    ipfsapi = ipfsApi.Client('127.0.0.1', 5001)
    for e in wallets:
        document = ''
        html_doc_head = '''<html><head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
        <style>body{ margin:0 100; background:whitesmoke; }</style>
        </head>
        <body>'''
    
        html_doc_heading = "<h1>{}</h1>".format(project_name)
        html_doc_project_progress = "<h3>Project Completion: {}%</h3>".format(str(round(project_completion * 100,3)))
    
        html_wallet_details = "<h3>{} | {}</h3>".format(e, wallets[e])
        
        html_table_header = '''<table class="table table-striped">
        <th>Task Name</th><th>Completion Date</th>'''
        
        contrib_e = 0.0
        html_row = ''
        for o in output:
            if e in o['task_assignees']:
                idx_e = o['task_assignees'].index(e)
                contrib_e +=  o['task_contrib'][idx_e]
                
                html_row += '''<tr><td>{}</td><td>{}</td></tr>'''.format(o['task_name'], 
                                                                         str(datetime.fromtimestamp(int(int(o['task_finish_date'])/1000)).date()))

        html_table_footer = '</table>'
        html_footer = "<h3>Overall Contribution: {}%</h3>".format(str(round(contrib_e * 100,2)))

        html_doc_end = '''</body></html>'''
        
        if not os.path.exists('./ipfs_files/'):
            os.makedirs('ipfs_files')
        
        document = html_doc_head + html_doc_heading + html_doc_project_progress + html_wallet_details + html_table_header + html_row + html_table_footer + html_footer + html_doc_end

        with open('./ipfs_files/' + project_name + '_' + e.rsplit('@', 1)[0] + '.html', "w") as file:
            file.write(document)
            
        
        #ipfs_html_file = ipfsapi.add_pyobj(document)
        #html_files_hash.append(ipfs_html_file)
            
    files_list = os.listdir('./ipfs_files')
    
    for f in files_list:
        ipfs_html_file = None
        ipfs_html_file = ipfsapi.add('./ipfs_files/' + f)
        #ipfs_html_file['URL'] =  'ipfs://' + ipfs_html_file['Hash']
        html_files_hash.append(ipfs_html_file)
        
    #optionally delete the folder
    #if os.path.exists('./ipfs_files/'):
    #    os.rmdir('ipfs_files')
        
    return html_files_hash

app.run(port=8085,debug=True,threaded=True)