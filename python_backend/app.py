from flask import Flask, request
from main import main

app = Flask(__name__)

@app.route('/get-answer', methods = ['POST'])
def get_answer(): 
    data = request.get_json()
    query = data['query']
    response = main(query)
    
    return {"response":response}
    
if __name__=="__main__":
    app.run()