#include <iostream>
#include <vector>
#include <string>
using namespace std;

template <class T>
using ELEM = vector<T>;

template <class T>
using VEC = vector<ELEM<T>>;

template <class T>
using action_t = T(*) (int);

template <class T>
using pred_t = bool (*) (T);

template <class T>
using map_t = T(*) (T, T);

void lines() {
	cout << string(10, '*') << '\n';
}

template <class T> void printElem(const ELEM<T>& v) {
	if (v.size() > 1) cout << "(";
	for (auto e : v)
		cout << e << " ";
	if (v.size() > 1) cout << ")";
}

template <class T> void initVec(VEC<T>& v, ELEM<T>&& cons) {
	v.resize(cons.size(), ELEM<T>(1));
	for (int i = 0; i < v.size(); i++)
		for (int j = 0; j < v[i].size(); j++) {
			v[i][j] = cons[i];
		}
}

template <class T> void printVec(VEC<T>& v) {
	int i = 0;
	cout << "[";
	for (auto e : v) {
		i++;
		printElem(e);
		if (i < v.size()) cout << ", ";
	}
	cout << "]";
	cout << "\n";
}

template <class T> VEC<T> generate(int N, action_t<T> f) {
	VEC<T> newVec;
	newVec.resize(N, ELEM<T>(1));
	int square = 0;
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < 1; j++) {
			square = f(i);
			newVec[i][j] = square;
		}
	}
	return newVec;
}

int f(int i) {
	return i * i;
}

template<class T> VEC<T> zip(VEC<T>& v, VEC<T>& w) {
	int len = v.size();
	int width = v[0].size() * 2;

	VEC<T> newVec;
	newVec.resize(len, ELEM<T>(width));

	for (int i = 0; i < len; i++) {
		int v_index = 0;
		int w_index = 0;
		for (int j = 0; j < width; j++) {
			if (j < (width / 2)) {
				newVec[i][j] = v[i][v_index];
				v_index++;
			}
			if (j >= (width / 2)) {
				newVec[i][j] = w[i][w_index];
				w_index++;
			}
		}
	}
	return newVec;
}

template<class T> VEC<T> filter(VEC<T>& v, pred_t<T> f) {
	VEC<T> newVec;
	ELEM<T> holder;

	for (int i = 0; i < v.size(); i++) {
		for (int j = 0; j < v[i].size(); j++) {
			if (f(v[i][j])) {
				holder.push_back(v[i][j]);
			}
		}
	}

	newVec.resize(holder.size(), ELEM<T>(1));
	for (int i = 0; i < newVec.size(); i++) {
		newVec[i][0] = holder[i];
	}
	return newVec;
}

bool g(int  i) {
	bool state = false;
	if (i >= 0) {
		state = true;
	}
	return state;
}

template<class T> VEC<T> map(VEC<T>& v, action_t<T> f) {
	VEC<T> newVec;
	newVec.resize(v.size(), ELEM<T>(1));
	for (int i = 0; i < newVec.size(); i++) {
		for (int j = 0; j < 1; j++) {
			newVec[i][j] = f(v[i][j]);
		}
	}
	return newVec;
}

int h(int i) {
	int num = 0;
	if (i >= 0) {
		num = 1;
	}
	return num;
}

template<class T> ELEM<T> reduce(VEC<T>& v, map_t<T> f, ELEM<T> ident) {
	T ans = ident[0];
	ELEM<T> newElem;
	for (int i = 0; i < v.size(); i++) {
		for (int j = 0; j < v[i].size(); j++) {
			ans = f(ans, v[i][j]);
		}
	}
	newElem.push_back(ans);
	return newElem;
}

template <typename T> T k(T i, T j) {
	return i + j;
}

int main() {
	VEC<int> v;
	initVec(v, ELEM<int>{1, 2, 3, 4});
	printVec(v);
	lines();

	VEC<int> w;
	initVec(w, ELEM<int>{-1, 3, -3, 4});
	printVec(w);
	lines();

	VEC<int> z = zip(v, w);
	printVec(z);
	lines();

	VEC<int> x = zip(z, z);
	printVec(x);
	lines();

	VEC<int> a = generate(10, f);
	printVec(a);
	lines();

	VEC<int> y = filter(w, g);
	printVec(y);
	lines();

	VEC<int> u = map(w, h);
	printVec(u);
	lines();

	ELEM<int> e = reduce(u, k, ELEM<int>{0});
	printElem(e);

	cout << endl << string(10, '$') << endl;
	VEC<string> ws;
	initVec(ws, ELEM<string>{"Hello", "there", "franco", "carlacci"});
	printVec(ws);

	ELEM<string> es = reduce(ws, k, ELEM<string>{""});
	printElem(es);

	VEC<char> wc;
	initVec(wc, ELEM<char>{'a', 'b', 'c', 'd'});
	cout << endl << string(10, '$') << endl;
	printVec(wc);

	ELEM<char> ec = reduce(wc, k, ELEM<char>{' '});
	cout << string(10, '$') << endl;
	printElem(ec);

	return 0;
}