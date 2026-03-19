import requests
import json

url = "http://localhost:8000/api/diagnose"
payload = {
    "symptom_ids": ["G001", "G003"],
    "patient": {
        "age": 25,
        "sex": "male",
        "skinType": "type2",
        "duration": "1-2_weeks"
    },
    "selected_regions": ["head"]
}

try:
    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Response JSON:", json.dumps(response.json(), indent=2))
except Exception as e:
    print("Error:", e)
