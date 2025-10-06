def cipher(cipher, word):
    if word == "":
        print("Word cannot be empty")
        exit()

    print("Cipher")
    Print_Mat(cipher)
    print()

    print("My word is", word)
    print()

    Matrix = string_to_num(word)
    Print_Mat(Matrix)
    print()

    print("My Multiply Array")
    mult_Matrix = Multiply_Matrix(cipher, Matrix)
    Print_Mat(mult_Matrix)
    print()

    print("Mod 26 Matrix")
    modded_Mat = Modded_Matrix(mult_Matrix)
    Print_Mat(modded_Mat)
    print()

    return Convert_Back(modded_Mat)

def DeCipher(DeCipher, word):
    if word == "":
        print("Word cannot be empty")
        exit()

    print("DeCipher")
    Print_Mat(DeCipher)
    print()

    print("My word is", word)
    print()

    Matrix = string_to_num(word)
    Print_Mat(Matrix)
    print()

    print("My Multiply Array")
    mult_Matrix = Multiply_Matrix(DeCipher, Matrix)
    Print_Mat(mult_Matrix)
    print()

    print("Mod 26 Matrix")
    modded_Mat = Modded_Matrix(mult_Matrix)
    Print_Mat(modded_Mat)
    print()

    return Convert_Back(modded_Mat)

def Print_Mat(matrix):
    for row_col in matrix:
        print(row_col)

def string_to_num(word):
    num_getter = [ord(char) - ord('a') for char in word]
    position = 0
    matrix = [[0] * 3 for _ in range(3)]

    print("String to numbers")
    for col in range(3):
        for row in range(3):
            number = num_getter[position]
            matrix[row][col] = number
            position += 1
    return matrix

def Multiply_Matrix(crypt, multiply_mat1):
    multiply_mat = [[0] * 3 for _ in range(3)]
    for row in range(3):
        for col in range(3):
            for pos in range(3):
                multiply_mat[row][col] += crypt[row][pos] * multiply_mat1[pos][col]
    return multiply_mat

def Modded_Matrix(multiply_mat1):
    modded_mat = [[0] * 3 for _ in range(3)]
    for row in range(3):
        for col in range(3):
            modded_mat[row][col] = multiply_mat1[row][col] % 26
    return modded_mat

def Convert_Back(modded_mat):
    String = ""
    for col in range(3):
        for row in range(3):
            String += chr(modded_mat[row][col] + ord('a'))
    return String

given_word = "sellitnow"

encrypt = [[6, 24, 1], [13, 16, 10], [20, 17, 15]]
crypt = cipher(encrypt, given_word)
if crypt:
    print("My encrypted word is", crypt)
    print()

decrypted =[[8, 5, 10], [21, 8, 21], [21, 12, 8]]
decrypted_word = DeCipher(decrypted, crypt)
if decrypted_word:
    print("My decrypted word is", decrypted_word)


