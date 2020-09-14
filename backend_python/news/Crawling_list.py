from bs4 import BeautifulSoup
import requests
import re
import pandas as pd
import csv

# 썸네일 포함한 뉴스 5일치 크롤링
# csv 파일로 생성하여 DB에 저장한다

class NewsListCrawler:

    def date(self):
        date = []
        selected = '2020-08-25'
        dt_index = pd.date_range(selected, periods=8, freq='-1d')
        dt_list = dt_index.strftime("%Y%m%d").tolist()
        for i in dt_list:
            print(i)
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
                    title = item.find('a')['title']
                    link = str('https://finance.naver.com{}') \
                        .format(item.find('a')['href']
                                .replace("§", "&sect"))
                    wdate = self.get_wdate(link)
                    content = self.get_text(link)
                    thumbnail = self.get_thumbnail(link)
                    news = {wdate: "wdate", title: "title", content: "content", link: "link", thumbnail: "thumbnail"}
                    result.append(news)
        self.get_csv(result)
        return result

    def get_csv(self, result):
        file = open('../static/data/final_news_crawling.csv', 'w', encoding='utf-8', newline='')
        csvfile = csv.writer(file)
        for row in result:
            csvfile.writerow(row)
        file.close()

    def get_wdate(self, url):
        html = requests.get(url).text
        soup = BeautifulSoup(html, 'html.parser')
        written_date = soup.find_all(class_='article_sponsor')
        for date in written_date:
            wdate = date.find('span').text
            return wdate

    def get_thumbnail(self, url):
        html = requests.get(url).text
        soup = BeautifulSoup(html, 'html.parser')
        article_image = soup.find_all(class_='end_photo_org')
        for item in article_image:
            src = item.find('img')['src']
            return src

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
    total = NewsListCrawler()
    crawl = total.news_crawling(page_number=100)
