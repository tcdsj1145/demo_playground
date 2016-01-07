#coding=utf-8
n = raw_input('')
str = raw_input('')
target = raw_input('')
index1 =-1
index2 =-1


arr = str.split(' ')
#arr转为数字
for index,item in enumerate(arr):
    arr[index] = int(item)
#print arr

target = int(target)

for index,item in enumerate(arr):
    next = target - item
    #print 'next',next
    #arr.index(next) 如果next元素不存在会报错 而不是返回-1
    if next in arr:
        index1 = index
        index2 = arr.index(next)
        break

if index1!=-1 and index2!=-1:
    print index1+1,index2+1

