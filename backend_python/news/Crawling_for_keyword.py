from bs4 import BeautifulSoup
import requests
import re
import pandas as pd
from datetime import datetime
import csv

class ThreeDays:

    def date(self):
        date = []
        today = datetime.today()
        dt_index = pd.date_range(today, periods=2, freq='-1d')
        dt_list = dt_index.strftime("%Y%m%d").tolist()
        for i in dt_list:
            date.append(i)
        return date

    def news_crawling(self, page_number):
        result = []
        date = self.date()
        for regDate in date:
            for i in range(page_number):
                url = "https://finance.naver.com/news/news_list.nhn?mode=LSS3D&section_id=101&section_id2=258&section_id3=402" \
                      "&date={date}&page={page}".format(date=regDate, page=i)
                html = requests.get(url).text
                soup = BeautifulSoup(html, 'html.parser')
                a = soup.find_all('dd', {'class': 'articleSubject'})
                for item in a:
                    link = str('https://finance.naver.com{}') \
                        .format(item.find('a')['href']
                                .replace("§", "&sect"))
                    content = self.get_text(link)
                    news = {content: "content"}
                    result.append(news)
        self.get_csv(result)
        return result

    def get_csv(self, result):
        file = open('../static/data/news_threeDays_crawling.csv', 'w', encoding='utf-8', newline='')
        csvfile = csv.writer(file)
        for row in result:
            csvfile.writerow(row)
        file.close()

    def get_text(self, url):
        html = requests.get(url).text
        soup = BeautifulSoup(html, 'html.parser')
        content = ''
        for item in soup.find_all('div', {'id': 'content'}):
            for text in item.find_all(text=True):
                if re.search('▶', text) is not None:
                    break
                content = content + text + "\n\n"
        return content


if __name__ == '__main__':
    some = ThreeDays()
    crawl = some.news_crawling(page_number=100)
