from flask import Flask

from candleCharts.candle_crawling import candleController
from new_magic_formula.model import Recommendation_Stock_Model
import json
from flask_cors import CORS

from news.Read_csv import Read_csv_create_wordcloud

app = Flask(__name__)


@app.route('/recommendation/<period>/<propensity>', methods=['GET'])
def recommend_stock(period, propensity):
    period = period
    propensity = propensity
    print(period, propensity)
    recommend_stock_model = Recommendation_Stock_Model()
    return json.dumps(recommend_stock_model.recommendation_listing(period=period, propensity=propensity))


@app.route('/cloud', methods=['GET'])
def create_wordcloud_using_csv():
    C = Read_csv_create_wordcloud()
    result = C.read()
    print(result)
    return result


@app.route('/stocks/candle/<symbol>', methods=['GET'])
def getCandle(symbol):
    symbol = symbol
    a = candleController()
    app_result = a.candle_crawling(symbol=symbol)
    return json.dumps(app_result)

CORS(app)
if __name__ == '__main__':
    app.run()
