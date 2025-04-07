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
    if (!file)
    {
        cerr << "Error: Could not open the file." << endl;
        exit(1);
    }
    string line;

    getline(file, line); // First line: number of vertices
    stringstream ss(line);

    int V;
    ss >> V;
    if (V <= 0)
    {
        cerr << "Number of vertices is less than 1" << endl;
        exit(1);
    }

    MatrixGraph matrix(V);

    // Now read edges
    while (getline(file, line))
    {
        stringstream edgeStream(line);
        int source, destination, weight;
        edgeStream >> source >> destination >> weight;
        if (source < 0 || source >= V || destination < 0 || destination >= V)
        {
            cerr << "Issue with one of your source or destination" << endl;
            exit(1);
        }
        if (weight < 0)
        {
            cerr << "Cant have neg weight";
            exit(1);
        }
        matrix.addEdge(source, destination, weight);

        if (!directed)
        {
            matrix.addEdge(destination, source, weight);
        }
    }

    return matrix;
}

vector<pair<int, int>> MatrixGraph::getNeighbors(int source)
{
    vector<pair<int, int>> neighbors;
    int n = (int)(matrix[source].size());
    for (int dest = 0; dest < n; ++dest)
    {
        int weight = matrix[source][dest];
        if (weight != INT_MAX)
        {
            neighbors.push_back({dest, weight});
        }
    }
    return neighbors;
}
