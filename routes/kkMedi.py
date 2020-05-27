import time
import sys
import datetime
import pandas as pd
import numpy as np
import re

from selenium import webdriver
from bs4 import BeautifulSoup

from konlpy.tag import Kkma
from konlpy.tag import Twitter
from konlpy.utils import pprint
from konlpy.tag import Mecab

#text = '당의정, 동성 정로환 당의정 동성정.\n동성제약(주) (1) 동성제약(주) (동성\n동성 정로환 당의정, 동성 정로환 당의정 동정.\n동성제약(주) () 동성제역(주) 동성\n동성 정로환 당의정 동정 정로환 당의정\n'

kkma = Kkma()
#mecab = Mecab()
#print(mecab.pos(text))
# print(kkma.morphs(text))
# print(kkma.nouns(text))
#print(kkma.pos(text))

# 띄어쓰기 제거하기, 얼마나 NNP로 읽히는지? + 전문의약품 추가

samp = sys.argv
samp = ''.join(samp)
#print('samp:'+samp)
#result = mecab.pos(samp)
#mlist = list()
#samp = re.sub('[-=.#/?,():$}]','',samp)
#samp= samp.replace(" ", "")
#print(samp)
#print(samp)
result = kkma.pos(samp)
nouns = list()

for keyword, type in result:
    if type=="NNP":
        nouns.append(keyword)
        #nouns.append(kkma.pos(keyword))
#print(mlist)
nouns = list(set(nouns))
name = ''.join(nouns)
print(name)