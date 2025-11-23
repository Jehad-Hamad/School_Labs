#include <fstream>
#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<string> parse(string const &line);
void loadFromFile(string const &filename, int *n, int *m, vector<vector<int>> &allocated, vector<vector<int>> &max, vector<int> &available);
vector<vector<int>> makeNeed(vector<vector<int>> &alloc, vector<vector<int>> &max);
bool safetyAlgorithim(string &seq, int *n, vector<int> available, vector<vector<int>> allocated, vector<vector<int>> need);

bool lessThan(vector<int> a, vector<int> b);
vector<int> add(vector<int> a, vector<int>b);

void printer(string const &name, vector<vector<int>> &matrix);
void dump(int *n, int *m, vector<vector<int>> &max, vector<vector<int>> &allocated, vector<int> &available, vector<vector<int>> &need);

int main(){

    string filename = "h.txt";
    vector<vector<int>> allocated;
    vector<vector<int>> max;
    vector<int> available;

    int n = 0;
    int m = 0;

    loadFromFile(filename, &n, &m, allocated, max, available);
    vector<vector<int>> need = makeNeed(allocated,max);

    dump(&n, &m, max, allocated, available, need);

    string sequence = "";
    bool safe = safetyAlgorithim(sequence, &n, available, allocated, need);

    if(safe){
        cout << "This is safe " << sequence << endl;
    } else {
        cout << "This is not safe" << endl;
    }
    return 0;
}

vector<string> parse(string const &line) {

    vector<string> parsed;
    string word = "";
    char delimiter = ' ';

    for (char c : line) {
        if (c != delimiter) word += c;
        else if (!word.empty()) {
            parsed.push_back(word);
            word = "";
        }
    }

    if (!word.empty()) parsed.push_back(word);
    return parsed;
}

void loadFromFile(string const &filename, int *n, int *m, vector<vector<int>> &allocated, vector<vector<int>> &max, vector<int> &available){

    ifstream inputFile;

    inputFile.open(filename);
    if(!inputFile.is_open()){
        cerr << "Errror opening the file! Try again\n";
        exit(1);
    }

    string line = "";
    int count = 0;

    while (getline(inputFile, line)) {
        vector<string> parsedString = parse(line);

        // First line: n m
        if(count == 0){
            if(parsedString.size() == 2){
                *n = stoi(parsedString[0]);
                *m = stoi(parsedString[1]);
                count++;
            } else {
                cerr << "You should only have two ints in your first line: N than M";
                exit(1);
            }
        }

        // Next n lines = MAX matrix
        else if (count >= 1 && count <= *n) {
            vector<int> row;
            for (string &s : parsedString) row.push_back(stoi(s));
            max.push_back(row);
            count++;
        }
        
        // Next n lines = ALLOCATION matrix
        else if (count >= *n + 1 && count <= *n + *n) {
            vector<int> row;
            for (string &s : parsedString) row.push_back(stoi(s));

            int index = allocated.size();     // process index
            int col = 0;
            for (int val : row) {
                if (val > max[index][col]) {
                    cerr << "Error: ALLOCATION exceeds MAX at process " << index << " resource " << col << "\n";
                    exit(1);
                }
                col++;
            }
            allocated.push_back(row);
            count++;
        }

        // Last line = AVAILABLE vector
        else if (count == *n + *n + 1) {
            for (string &s : parsedString) available.push_back(stoi(s));
            count++;
            continue;
        }
    }
}

void printer(string const &name, vector<vector<int>> &matrix){

    cout << "\n===========|| " + name + " ||============\n";
    int num = 0;

    for(auto row: matrix){
        cout << "   p" << num <<"  ";
        for(auto col: row) cout << "   " << col << "  ";
        cout << '\n';
        num++;
    }

    for(int i = 0; i <= int(28 + name.size()); i++) cout << "=";
    cout << '\n';
}

void dump(int *n, int *m, vector<vector<int>> &max, vector<vector<int>> &allocated, vector<int> &available, vector<vector<int>> &need){

    cout << '\n';
    cout << "Number of process: " << *n << " Number of Resouces: " << *m << '\n';
    printer("MAX", max);
    printer("Allocatd", allocated);
    
    cout << "\n========|| AVAILABLE ||========\n";
    cout << "       ";
    for (int v : available) cout << "   " << v << "  ";
    cout << "\n===============================\n";

    printer("Need", need);

}

vector<vector<int>> makeNeed(vector<vector<int>> &allocated, vector<vector<int>> &max){
    vector<vector<int>> need;
    for(int i = 0; i < int(allocated.size()); i++){
        vector<int> values;
        for(int j = 0; j < int(allocated[i].size()); j++){
            int val = max[i][j] - allocated[i][j];
            values.push_back(val);
        }
        need.push_back(values);
    }
    return need;
}

bool safetyAlgorithim(string &seq, int *n, vector<int> available, vector<vector<int>> allocated, vector<vector<int>> need) {
    vector<bool> finish(*n, false);
    vector<int> work = available;
    bool progress = true;

    while (progress) {
        progress = false;
        for (int i = 0; i < *n; i++) {
            if (!finish[i] && lessThan(need[i], work)) {
                work = add(work, allocated[i]);
                finish[i] = true;
                seq += "p" + to_string(i) + " ";
                progress = true;
            }
        }
    }

    for (int i = 0; i < *n; i++)
        if (!finish[i]) return false;
    return true;
}

bool lessThan(vector<int> a, vector<int>b){
    for(int i = 0; i < int(a.size()); i++){
        if(a[i] > b[i]) return false;
    }
    return  true;
}

vector<int> add(vector<int> a, vector<int>b){
    vector<int> result;
    for(int i = 0; i < int(a.size()); i++){
        result.push_back(a[i] + b[i]);
    }
    return result;
}