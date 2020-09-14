import collections
import csv
from dataclasses import dataclass
import pandas as pd
from konlpy.tag import Okt
from nltk import word_tokenize, re, FreqDist


@dataclass
class Entity:
    context: str
    fname: str
    target: str
    date: str

    @property
    def date(self) -> str: return self._date

    @date.setter
    def date(self, date): self._date = date

    @property
    def context(self) -> str: return self._context

    @context.setter
    def context(self, _context): self._context = _context

    @property
    def fname(self) -> str: return self._fname

    @fname.setter
    def fname(self, _fname): self._fname = _fname

    @property
    def target(self) -> str: return self._target

    @target.setter
    def target(self, _target): self._target = _target


class Service:
    def __init__(self):
        self.texts = []
        self.tokens = []
        self.noun_tokens = []
        self.okt = Okt()
        self.stopword = []
        self.freqtxt = []
        self.date = []

    def tokenize(self):
        filename = r'../static/data/news_threeDays_crawling.csv'
        with open(filename, 'r', encoding='utf-8') as f:
            self.texts = f.read()
        texts = self.texts.replace('\n', '')
        tokenizer = re.compile(r'[^ㄱ-힣]')
        self.texts = tokenizer.sub(' ', texts)
        self.tokens = word_tokenize(self.texts)
        _arr = []
        for token in self.tokens:
            token_pos = self.okt.pos(token)
            _ = [txt_tag[0] for txt_tag in token_pos if txt_tag[1] == 'Noun']
            if len("".join(_)) > 1:
                _arr.append("".join(_))
        self.noun_tokens = " ".join(_arr)

        filename = r'../static/data/stopwords.txt'
        with open(filename, 'r', encoding='utf-8') as f:
            self.stopword = f.read()
        print(type(self.stopword))
        self.noun_tokens = word_tokenize(self.noun_tokens)
        self.noun_tokens = [text for text in self.noun_tokens
                            if text not in self.stopword]
        keyword_list = self.noun_tokens
        self.freqtxt = pd.Series(dict(FreqDist(keyword_list))).sort_values(ascending=False)
        c2 = collections.Counter(keyword_list)
        a = c2.most_common(50)
        file = open('../static/data/news_threeDays_mining.csv', 'w', encoding='utf-8', newline='')
        print(file.name)
        csvfile = csv.writer(file)
        for row in a:
            csvfile.writerow(row)
        file.close()
        return file


class MiningController:
    def __init__(self):
        pass

    def do_mining(self):
        service = Service()
        a = service.tokenize()
        return a






if __name__ == '__main__':
    T = MiningController()
    result = T.do_mining()
    print(result)