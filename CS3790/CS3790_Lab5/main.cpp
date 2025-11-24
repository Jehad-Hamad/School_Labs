#include "lib/lib.h"

int main(int argc, char* argv[]) {
    string filename = argv[1];
    vector<vector<int>> allocated;
    vector<vector<int>> max;
    vector<int> available;

    int n = 0;
    int m = 0;

    loadFromFile(filename, &n, &m, allocated, max, available);
    vector<vector<int>> need = makeNeed(allocated, max);

    dump(&n, &m, max, allocated, available, need);

    requestAlgorithim(&n, &m, allocated, max, need, available);
    return 0;
}