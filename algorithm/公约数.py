#coding=utf-8

#def要在前面
def minyue(a, b):
    yue = 1
    maxyue = yue
    while (yue < a and yue < b):
        if (a%yue ==0) and (b%yue ==0):
            if maxyue < yue:
                maxyue = yue
        yue= yue +1

    return maxyue


while (1==1):
    firstLine = raw_input()
    arr1 = firstLine.split(' ')
    if len(arr1) == 2:
        c = int(arr1[1])

    secLine = raw_input()
    arr2 = secLine.split(' ')

    for idx,val in enumerate(arr2):
        #print str(idx)+'---'
        val = int(val)
        if val <= c:
            c += val
        else:
            c += minyue(c, val)

    print c

