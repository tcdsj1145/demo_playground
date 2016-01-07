import re
print re.search(r'..g','piiig').group()
print re.search(r'\d\d\d','p123g').group()
print re.search(r'\w\w\w','@@abcd!!').group()


str = 'purple alice-b@jisuanke.com monkey dishwasher'
match = re.search('([\w.-]+)@([\w.-]+)',str)
if match:
    print match.group()
    print match.group(1)
    print match.group(2)


str = 'purple alice@jisuanke.com, blah monkey bob@abc.com blah dishwasher'
tuples = re.findall(r'([\w\.-]+)@([\w\.-]+)',str)
print tuples
