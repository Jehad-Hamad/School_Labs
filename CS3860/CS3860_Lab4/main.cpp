#include <iostream>
#include <vector>
using namespace std;

void printer(vector<int> list) {
    cout << "[";
    for (int i = 0; i < list.size(); i++) {
        if (i > 0) cout << ",";
        cout << list[i];
    }
    cout << "]";
}

vector<int> take(int n, vector<int> list) {
    vector<int> a;

    if (list.empty()) return a;
    if (n > list.size()) n = list.size();
    for (int i = 0; i < n; i++) a.push_back(list[i]);
    return a;
}

vector<int> drop(int n, vector<int> list) {
    vector<int> a;

    if (list.empty()) return a;
    if (n > list.size()) n = list.size();
    for (int i = n; i < list.size(); i++) a.push_back(list[i]);
    return a;
}

vector<vector<int>> chunkIt(int n, vector<int> list) {
    if (list.empty() || n <= 0) return {};

    auto chunk = take(n, list);
    auto dropped = drop(n, list);

    auto result = chunkIt(n, dropped);
    result.insert(result.begin(), chunk);
    return result;
}

int main() {
    int n;

    cout << "Enter chunk size: ";
    cin >> n;

    int start, end;
    cout << "Enter range (start end): ";
    cin >> start >> end;

    vector<int> list;
    for (int i = start; i <= end; i++) list.push_back(i);

    auto chunks = chunkIt(n, list);

    cout << "[";
    for (int i = 0; i < chunks.size(); i++) {
        if (i > 0) cout << ",";
        printer(chunks[i]);
    }
    cout << "]";
}