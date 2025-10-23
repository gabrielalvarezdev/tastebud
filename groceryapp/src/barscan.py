import requests

def call_api(user_input):
    item = {
    "barcode": user_input,
    }

    API_ENDPOINT = 'https://api.barcodelookup.com/v3/products?barcode='+user_input+'&formatted=y&key=5zy8hv8qumrg4mmers8wgnwyqeuwp0'
    print(user_input)
    print(API_ENDPOINT)
    
    response = requests.post(API_ENDPOINT, json=item)
    print(response.json())
    

while True:
    user_input = input("Enter your input (or 'q' to quit): ")
    if user_input.lower() == 'q':
        break
    call_api(user_input)
