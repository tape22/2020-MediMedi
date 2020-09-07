#-*-coding:utf-8-*-
import time
import sys
import datetime
import re

#from selenium import webdriver
#from bs4 import BeautifulSoup

from konlpy.tag import Kkma
from konlpy.tag import Mecab as m
# from gensim.models import word2vec
# import csv

# f = open('/Users/jungmin/Downloads/med.csv', 'r', encoding='utf-8')
# rdr = csv.reader(f, delimiter='\t')
# r= list(rdr)
# f.close()

m=m()
#samp = "○흉터치료제노스카나noscarna0동아제약로이드성홍터190519810g"
samp = sys.argv[1]
samp = ''.join(samp)



result= m.pos(samp)
#print(result)
nouns = list()
#print(result)

nomenc = ['캡슐','주사액','수성현탁주사액','점안액','액','농축액','점안액','신','점비액','산','가루','엑스산','연고','연질','진통제','수입','정','시럽','좌제','연질','페이스트','주정','과립',
'세립','유동','정제','활성','겔','경옥고','현탁액','당의정','전문','일반','주','코리아','이','의약품','일반','일반의약품','전문의약품','한국','장']


for keyword, type in result:
    if (type=="NNP")and keyword not in nomenc:
        nouns.append(keyword)

nouns = list(set(nouns))
# 여러개의 NNP 중에서 어떤 것을 의약품명으로 인식할 것인지?
name = ''.join(nouns)

print(name)


# with open("NaverMovie.nlp",'w', encoding='utf-8') as fp:
#      fp.write("\n".join(nouns))

#  #Word2Vec 모델 만들기
# wData = word2vec.LineSentence("NaverMovie.nlp")
# wModel =word2vec.Word2Vec(wData, size=200, window=10, hs=1, min_count=1, sg=1)
# wModel.save("NaverMovie.model")
# print("Word2Vec Modeling finished")

# print(wModel.wv.most_similar("정"))

# model = word2vec.Word2Vec.load("NaverMovie.model")

# print(model.most_similar(positive=["노스카나"]))

# #print(model.most_similar(positive=["노비손"]))