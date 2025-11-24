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

    string seq = "";
    bool safe = safetyAlgorithim(seq, &n, available, allocated, need);
    if (!safe) {
        cout << "NOT SAFE STARTING TABLE" << endl;
        exit(1);
    }

    cout << "Safe starting table with sequence: " << seq << endl << endl;
    requestAlgorithim(&n, &m, allocated, max, need, available);
    return 0;
}