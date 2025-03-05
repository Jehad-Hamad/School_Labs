

def bin2dec(binary):
    decimal = binary[::-1]
    position = 0
    total = 0

    for i in decimal:
        total += int(i)*(pow (2,position))
        position =1 + position
    print("From binary to decimal it is", total)
bin2dec('1011')

def dec2bin(decimal):
    decimal = int(decimal)
    binary = ""
    if (decimal == 0):
        binary = '0'
    else:
        while (decimal > 0):
            binary += str(decimal % 2)
            decimal = decimal // 2
    binary = binary[::-1]
    print("From decimal to binary it is", binary)
dec2bin('11')

def oct2bin(octal):
    binary = ''
    convert = ['000', '001', '010', '011', '100', '101', '110', '111']
    for postion in octal:
        binary += convert[int(postion)]
    print ("From octal to binary   it is", binary)
oct2bin('10')








