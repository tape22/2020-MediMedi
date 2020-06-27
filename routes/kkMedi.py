import time
import sys
import datetime
import re

from selenium import webdriver
from bs4 import BeautifulSoup

from konlpy.tag import Kkma
from konlpy.tag import Mecab as m

m=m()

samp = sys.argv[1]
samp = ''.join(samp)
result= m.pos(samp)
#print(result)
nouns = list()


nomenc = ['캡슐','주사액','수성현탁주사액','점안액','액','농축액','점안액','신','점비액','산','가루','엑스산','연고','연질','진통제','수입','정','시럽','좌제','연질','페이스트','주정','과립',
'세립','유동','정제','활성','겔','경옥고','현탁액','당의정','전문','일반','주','코리아','이','의약품','일반','일반의약품','전문의약품','한국','장']


for keyword, type in result:
    if (type=="NNP")and keyword not in nomenc:
        nouns.append(keyword)

nouns = list(set(nouns))
name = ''.join(nouns)

print(name)

