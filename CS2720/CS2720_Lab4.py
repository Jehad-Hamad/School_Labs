
                                                            #JehadMHamad CS2720 Lab 4 01/03/24
def Print_Mat(matrix):
     print('-'*10)
     for i in matrix:
         for j in i:
             print (j, end=' ')
         print()
     print('-'*10)

def Mat_Builder(r_len, c_len):
    matrix = [[0] * r_len for _ in range(c_len)]
    return matrix

def Adj_Builder(relation, matrix):
    for i in relation:
        if i[0] < len(matrix) and i[1] < len(matrix[0]):
            matrix[i[0]][i[1]] = 1

def matMultBool(Matrix1, other_Matrix, This_Matrix):
    for row in range(len(Matrix1)):
        for col in range(len(Matrix1)):
            state = 0
            for pos in range(len(Matrix1)):
                state = state or (Matrix1[row][pos] and other_Matrix[pos][col])
                This_Matrix[row][col] = state
    return This_Matrix

def matAddBool(Matrix1, other_Matrix, This_Matrix):
    for i in range (len(Matrix1)):
        for j in range (len(other_Matrix[0])):
            This_Matrix[i][j] = (Matrix1[i][j] or other_Matrix[i][j])
    return This_Matrix

def Small_Relation_Builder(relation):
    true_Relation =[]
    for i in range(len(relation)):
        for j in range(len(relation[i])):
            if(relation[i][j] == 1):
                true_Relation +=[(i, j)]
    return true_Relation

def myMain():
    # we assume that set A = {0, 1, 2, 3, 4}
    r = [(1, 1), (2, 2), (3, 3), (1, 2), (2, 3), (4, 4), (3,4)]
    Matrix1 = Mat_Builder(5, 5)
    Adj_Builder(r, Matrix1)
    
    
    print("This is the adj matrix")
    Print_Mat(Matrix1)
    print(r)
    print()
    
    Matrix2 = Mat_Builder(5, 5)
    matMultBool(Matrix1, Matrix1, Matrix2)
    print("this is R^2")
    Print_Mat(Matrix2)
    r2 = Small_Relation_Builder(Matrix2)
    print(r2)
    print()
    
    Matrix3 = Mat_Builder(5, 5)
    matMultBool(Matrix1, Matrix2, Matrix3)
    print("this is R^3")
    Print_Mat(Matrix3)
    r3 = Small_Relation_Builder(Matrix3)
    print(r3)
    print()
    
    Matrix4 = Mat_Builder(5, 5)
    matMultBool(Matrix2, Matrix2, Matrix4)
    print("this is R^4")
    Print_Mat(Matrix4)
    r4 = Small_Relation_Builder(Matrix4)
    print(r4)
    print()
    
    Matrix5 = Mat_Builder(5, 5)
    matMultBool(Matrix1, Matrix4, Matrix5)
    print("this is R^5")
    Print_Mat(Matrix5)
    r5 = Small_Relation_Builder(Matrix5)
    print(r5)
    print()
    
    
    
    Add_Matrix1 = Mat_Builder(5, 5)
    matAddBool(Matrix1, Matrix2, Add_Matrix1)
    
    Add_Matrix2 = Mat_Builder(5, 5)
    matAddBool(Add_Matrix1, Matrix3, Add_Matrix2)
    
    Add_Matrix3 = Mat_Builder(5, 5)
    matAddBool(Add_Matrix2, Matrix4, Add_Matrix3)
    
    Add_Matrix4 = Mat_Builder(5, 5)
    matAddBool(Add_Matrix3, Matrix5, Add_Matrix4)
    
    print("This is my sum of all my R")
    Print_Mat(Add_Matrix4)
    
    r_Add = Small_Relation_Builder(Add_Matrix4)
    print(r_Add)
    print()

print("Starting...\n")
myMain()