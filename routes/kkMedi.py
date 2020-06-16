import time
import sys
import datetime
import re

from selenium import webdriver
from bs4 import BeautifulSoup

from konlpy.tag import Kkma
from konlpy.tag import Mecab as m
import MeCab

#부스코판당의정
# 코푸시럽에스 됨
# 제일알지싹세티연질캡슐
# 둥근머리버물리겔
# 설페린에프캡슐
# 아이미루콘택트퓨어점안액
# 팜시드정10밀리그램(파모티딘)
# 아로나민아이정
# 모드코에스연질캡슐
# 더블락캡슐
# 바스포연고
# 솔루샷쿨연질캡슐
# 위스콘더블액션현탁액

m=m()
mecab = MeCab.Tagger('-d /usr/local/lib/mecab/dic/mecab-ko-dic')
samp = sys.argv[1]
#samp ="팜시드정"
samp = ''.join(samp)

#result2 = mecab.parse(samp)
result= m.pos(samp)
#print(result2)
#print(result)
nouns = list()

#밀리그램도 없애는게 좋겠다.
# 단어가 일부 포함된 것도 가져와야 함.
nomenc = ['정','캡슐','주사액','수성현탁주사액','점안','액','농축액','점안액','점비액','산','가루','엑스산',
'연고','연질','시럽','좌제','연질','페이스트','주정','과립','세립','유동','정제','활성','겔','경옥고','현탁액','당의정']

for keyword, type in result:
    if type=="NNP":
        nouns.append(keyword)
    # NNG중에서 nomenc와 일치하는 게 있어야 추가, NNP가 없는 경우 실행 
    elif type == "NNG":
        if keyword in nomenc:
            nouns.append(keyword)

nouns = list(set(nouns))
name = ''.join(nouns)
print(name)

