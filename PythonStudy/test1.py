#coding=utf-8
strinput = raw_input()
arr = strinput.split(' ')
arr1 = []
arr1Index = []
arr2 = []
arr2Index = []
# for index in range(len(arr)):
    # item = arr[index]
for index,item in enumerate(arr):
    arr[index] = item = int(item)
    if (index+1)%3!=0 and (index+1)%2==0:
        arr1.append(item)
        arr1Index.append(index)
    elif (index+1)%3==0:
        arr2.append(item)
        arr2Index.append(index)
#print arr
#print arr1
#print arr1Index
arr1.sort()
arr2.sort(reverse=True)
#print arr1


for index in range(len(arr1Index)):
    val = arr1Index[index]
    arr[val] = arr1[index]

for index,val in enumerate(arr2Index):
    arr[val] = arr2[index]


for index in range(len(arr)):
    arr[index] = str(arr[index])
print ' '.join(arr)

