#coding=utf-8
a = 10
if 9 < a <12:
    print 'Hello Jisuanke'.isalpha()

list = ['a', 'b', 'c', 'd']
print list.pop(3)



n =7
f0 = 0
f1 = 1
i = 2
while i <= n:
    y1 = f1
    f1 = f0 + f1
    f0 = y1
    i = i+1
print f1

#list.sort() 不会返回对象，改变原有的list
#sorted(list)返回一个对象，可以用作表达式。原来的list不变，生成一个新的排好序的list对象
print sorted([2,4,1,0])


# str = raw_input()
# arr = str.split(' ')
# arr1 = []
# arr1Index = []
# arr2 = []
# arr2Index = []
# # for index in range(len(arr)):
#     # item = arr[index]
# for index,item in enumerate(arr):
#     arr[index] = item = int(item)
#     if (index+1)%3!=0 and (index+1)%2==0:
#         arr1.append(item)
#         arr1Index.append(index)
#     elif (index+1)%3==0:
#         arr2.append(item)
#         arr2Index.append(index)
# #print arr
# #print arr1
# #print arr1Index
# arr1.sort()
# arr2.sort(reverse=True)
# #print arr1

# # 模拟for(var i) 那种下标循环的效果
# for index in range(len(arr1Index)):
#     val = arr1Index[index]
#     arr[val] = arr1[index]

# for index,val in enumerate(arr2Index):
#     arr[val] = arr2[index]
# print arr


