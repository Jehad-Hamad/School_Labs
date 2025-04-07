#ifndef GRAPH_H
#define GRAPH_H

#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <fstream>
#include <sstream>
#include <climits> // For INT_MAX

using namespace std;

class MatrixGraph
{
public:
    vector<vector<int>> matrix;
    MatrixGraph(int n) : matrix(n, vector<int>(n, INT_MAX)) {};
    void addEdge(int source, int destination, int weight);
    void printMatrix();
};

MatrixGraph createMatrixGraph(string fileName, bool directed);
#endif
