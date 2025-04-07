#include <iostream>
#include "Graph/graphs.h"

using namespace std;

int main()
{

    MatrixGraph matrix = createMatrixGraph("test1.txt", false);
    matrix.printMatrix();
    return 0;
}