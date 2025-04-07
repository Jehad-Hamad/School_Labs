#include "graphs.h"

void MatrixGraph::addEdge(int source, int destination, int weight)
{
    matrix[source][destination] = weight;
}

void MatrixGraph::printMatrix()
{
    for (auto row : matrix)
    {
        for (auto val : row)
        {
            if (val == INT_MAX)
                cout << left << setw(4) << "INF";
            else
                cout << left << setw(4) << val;
        }
        cout << endl;
    }
}

MatrixGraph createMatrixGraph(string fileName, bool directed)
{
    ifstream file(fileName);
    string line;

    getline(file, line); // First line: number of vertices
    stringstream ss(line);

    int V;
    ss >> V;

    MatrixGraph matrix(V);

    // Now read edges
    while (getline(file, line))
    {
        stringstream edgeStream(line);
        int source, destination, weight;

        edgeStream >> source >> destination >> weight;
        matrix.addEdge(source, destination, weight);

        if (!directed)
        {
            matrix.addEdge(destination, source, weight);
        }
    }

    return matrix;
}
