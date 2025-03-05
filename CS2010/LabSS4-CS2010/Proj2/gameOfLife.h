#include<vector>
#include <iostream>
using namespace std;

using VEC = vector<int>;
using MATRIX = vector<VEC>;

MATRIX makeMat();
void printMat(MATRIX currentMat);
void placeCells(MATRIX& currentMat);
void rules(MATRIX& copyMat, MATRIX& currentMat);
void genertions(MATRIX& copyMat, MATRIX& currentMat);