import pandas_datareader as pdr
from datetime import datetime
import numpy as np
from pandas._libs.tslibs.offsets import relativedelta


class candleController:

    def candle_crawling(self, symbol):
        symbol = symbol
        symbol_with_ks = symbol + '.KS'

        end_date = datetime.now()
        start_date = datetime.now()-relativedelta(months=3)
        temp = pdr.get_data_yahoo(symbol_with_ks, start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d'))
        temp.drop(['Volume', 'Adj Close'], axis=1, inplace=True)

        date_index = temp.index.get_level_values('Date').tolist()

        result = []
        for i in range(len(date_index)):
            result.append({'x': str(date_index[i].strftime('%Y-%m-%d')),
                           'y': list(np.array(temp.iloc[i]).tolist())})
        return result
