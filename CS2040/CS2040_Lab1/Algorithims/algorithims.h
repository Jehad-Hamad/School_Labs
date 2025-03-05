#ifndef ALGORITHIMS_H
#define ALGORITHIMS_H
// a header file that includes the soring algorithims.

#include <vector>
using namespace std;

class Algorithims{
public:
    Algorithims() = default;

    // selection sort
    void selectionSort(vector<int> &vec);

    // bubble sort
    void bubbleSort(vector<int> &vec);

    // insertion sort
    void insertionSort(vector<int> &vec);

    // merge sort
    void mergeSort(vector<int> &vec);
    void merge(vector<int> &left, vector<int> &right, vector<int> &vec);

    // quick sort
    void quickSortReal(vector<int> &vec, int left, int right);
    void quickSort(vector<int> &vec);
    int partition(vector<int>& vec, int left, int right);

};

#endif