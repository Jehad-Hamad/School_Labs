#include "vecBuilder.h"

// File: vecBuilder.cpp
// name: Jehad M Hamad
// date: Tuesday Feb 18
// builds you a 2D vector of any size that you want
vector<vector<int>> VecBuilder::buildVector(int row, int col){
    vector<vector<int>> vec(row, vector<int>(col, 0));
    return vec;
}

// File: vecBuilder.cpp
// name: Jehad M Hamad
// date: Tuesday Feb 18
// pass it the 2D vector so it can populate it with random numbers
void VecBuilder::buildRandomVector(vector<vector<int>> &vec){
    for (auto &row : vec){
        for (auto &j : row){
            j = rand() % 101;
        }
    }
}

// File: vecBuilder.cpp
// name: Jehad M Hamad
// date: Tuesday Feb 18
// pass it a 2D random vector and will return a sorted 2D vector
vector<vector<int>> VecBuilder::buildSortedVector(vector<vector<int>> &vec){
    // make 2d vector to store the changed rows
    vector<vector<int>> tmp;
    // sort the rows then push it to the new vector
    for (auto row : vec){
        sort(row.begin(), row.end());
        tmp.push_back(row);
    }
    // return that vector
    return tmp;
}

// File: vecBuilder.cpp
// name: Jehad M Hamad
// date: Tuesday Feb 18
// pass it a 2D random vector and will return a  reverse sorted 2D vector
vector<vector<int>> VecBuilder::buildReverseSortedVector(vector<vector<int>> &vec)
{
    // make 2d vector to store the changed rows
    vector<vector<int>> tmp;
    // Reverse sort the rows then push it to the new vector
    for (auto row : vec){
        sort(row.begin(), row.end(), greater<int>());
        tmp.push_back(row);
    }
    // return that vector
    return tmp;
}