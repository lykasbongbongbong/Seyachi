from flask import Flask, render_template
from flask import request
import mysql.connector
import boto3
from botocore.exceptions import ClientError


app = Flask(__name__)
jinja_options = app.jinja_options.copy()
jinja_options.update(dict(
    variable_start_string='(%',
    variable_end_string='%)'
))
app.jinja_options = jinja_options

app.config["DEBUG"] = True 


#db info
mycursor = mydb.cursor()



@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/api/stand/<stand_id>', methods=['GET'])
def get_stand_menu(stand_id): 
    # TODO: 連到資料庫，以 {stand_id} 來拿菜單資料
    menu_query = "SELECT * FROM menu_info WHERE stand_id="+stand_id
    mycursor.execute(menu_query)
    menu_data = mycursor.fetchall()

    stand_query = "SELECT * FROM stand_info WHERE stand_id="+stand_id
    mycursor.execute(stand_query)
    stand_data = mycursor.fetchall()

    menu_data_list = []
    
    stand_name = stand_data[0][1]
    stand_image_url = stand_data[0][2]


    menu_data_list = []
    print(menu_data)
    for item in menu_data:
        food_id = item[0]
        food_name = item[1]
        food_price = item[2]
        food_image_url = item[3]
        food_stand_id = item[4]
        
        food_dict = {
            "food_id": food_id,
            "food_name": food_name,
            "food_price": food_price,
            "food_image_url": food_image_url
        }
        menu_data_list.append(food_dict)

    return_menu_data = {
        "data" : {
            "stand_id": stand_id,
            "stand_name": stand_name,
            "stand_image": stand_image_url,
            "menu_data": menu_data_list
        }
    }
    return return_menu_data 

def get_food_info(food_id):
    query = "SELECT food_name, stand_id FROM menu_info WHERE food_id="+str(food_id)
    mycursor.execute(query)
    data = mycursor.fetchall()
    food_name = data[0][0]
    stand_id = data[0][1]
    stand_name = get_stand_info(stand_id)

    return food_name, stand_name  

def get_stand_info(stand_id):
    query = "SELECT stand_name FROM stand_info WHERE stand_id="+str(stand_id)
    mycursor.execute(query)
    data = mycursor.fetchall()
    stand_name = data[0][0]
    return stand_name

@app.route('/api/order', methods=['POST'])
def get_order():
    content = request.get_json()
    print(content)
    
    stand_id = content["stand_id"]
    total_charge = content["total_charge"]
    select_items = content["select_items"]

    
    
    #分批存進資料庫
    order_record = []
    food_name_list = []
    for item in select_items:
        food_name = str(item["food_name"])
        food_price = str(item["food_price"])
        order_query = "INSERT INTO order_record(order_food_name, food_price) VALUES (%s, %s)"
        args = (food_name, food_price)
        mycursor.execute(order_query, args)
        mydb.commit()
        stand_name = get_stand_info(stand_id)
        
        
        food_name_list.append(food_name)

    # trigger lambda 發訊息 
    # message to queue
   
    food_str = '\n'.join(str(food_name) for food_name in food_name_list)
    msg = "您好,\n選得好！" + stand_name + "的美味餐點已在外送途中。\n訂單細節請看以下\n\n"+food_str+"\n\n祝您用餐愉快！\n\n\n---\nSeyachi"
    # # # # 包含: food_name, quantity
    region_name = "us-east-1"

    client = boto3.client('sns', region_name="us-east-1")
    # seyachi 
    response = client.publish(
        TopicArn='arn:aws:sns:us-east-1:099287135517:seyachi',
        Message=msg,
        Subject='【Seyachi】您已下了訂單',
        MessageStructure='string'
    )

    # seyachi 2    
    response = client.publish(
        TopicArn='arn:aws:sns:us-east-1:099287135517:seyachi2',
        Message=msg,
        Subject='【Seyachi】您已下了訂單',
        MessageStructure='string'
    )


    status = 200
    return_msg = {
        "status": status
    }
    
    return return_msg 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
