from flask import Flask,request
from model import main
app = Flask(__name__)

@app.route('/')
def greet():
    return {"message": "Welcome"}

@app.route('/get_answer',methods=['POST'])
def get_answer():
    data = request.get_json()

    # Body
    # scores:{
    #
    # }
    scores = data['scores']

    response = main(scores)

    return {"response":response}

if __name__=="__main__":
    app.run()