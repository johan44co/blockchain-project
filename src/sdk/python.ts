import requests

class BlockchainSDK:
    def __init__(self, base_url):
        self.base_url = base_url
        self.headers = {
            'Content-Type': 'application/json'
        }

    def get_chain(self):
        response = requests.get(f'{self.base_url}/chain', headers=self.headers)
        return response.json()

    def add_transaction(self, transaction):
        response = requests.post(f'{self.base_url}/transactions', json=transaction, headers=self.headers)
        return response.json()

    def add_validator(self, address, stake):
        response = requests.post(f'{self.base_url}/validators', json={'address': address, 'stake': stake}, headers=self.headers)
        return response.json()

    def deploy_contract(self, id, code):
        response = requests.post(f'{self.base_url}/contracts/deploy', json={'id': id, 'code': code}, headers=self.headers)
        return response.json()

    def execute_contract(self, id, method, args):
        response = requests.post(f'{self.base_url}/contracts/execute', json={'id': id, 'method': method, 'args': args}, headers=self.headers)
        return response.json()

    def get_contract_state(self, id):
        response = requests.get(f'{self.base_url}/contracts/{id}/state', headers=self.headers)
        return response.json()
