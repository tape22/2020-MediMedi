import re
import sys
import pandas as pd



df = pd.read_csv("../public/csv/medi.csv",sep = ',') 
df['품목명'] = df['품목명'].str.replace(r'\([^)]*\)', '') # 괄호 안 내용 제거
df['품목명'] = df['품목명'].str.replace(r'[0-9]+', '') # 괄호 안 내용 제거
df['품목명'] = df['품목명'].str.replace(r'[\{\}\[\]\/?.•·,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]', '') # 특수 문자 제거 
medName = df.loc[df['전문일반구분'] == '일반의약품', '품목명'] # 일반의약품인 품목만 가져오기

MedList = []
test =[]
nomenc = ['캡슐','주사액','수성현탁주사액','점안액','액','농축액','점안액','신','점비액','산','가루','엑스산','연고','연질','진통제','수입','정','시럽','좌제','연질','페이스트','주정','과립',
'세립','유동','정제','엑스','활성','겔','경옥고','현탁액','당의정','장','연질캡슐','연질캅셀','밀리그램','밀리그람','미리그람','원료','수입','액티브','액티브정','%','엑스과립','크림','mg','연조엑스','정300','정800']

regex = "(" + "|".join(nomenc) + ")$" 

for word in medName:
  if re.search(regex,word):
    word= re.sub(regex,'',word)
    MedList.append(word)
  else:
    MedList.append(word)

for word in MedList:
  if re.search(regex,word):
    word= re.sub(regex,'',word)
    test.append(word)
  else:
    test.append(word)

dff = pd.DataFrame(test)
dff.to_csv("/Users/jungmin/Downloads/mediemedi.csv",encoding='utf-8-sig')
