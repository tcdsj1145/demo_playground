#coding=utf-8
str = raw_input('')
alpha_count =0
space_count =0
num_count = 0
other_count =0
for index in range(len(str)):
    if str[index].isalpha():
        alpha_count = alpha_count +1
    elif str[index].isdigit():
        num_count = num_count +1
    elif str[index].isspace():
        space_count = space_count +1
    else:
        other_count =other_count + 1

print alpha_count,' ',num_count,' ',space_count,' ',other_count\n