TREE_DIR=Tree
CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -Werror -pedantic
all: main.cpp $(TREE_DIR)/node.cpp
	$(CC) $(CC_FLAGS) $^ -o a.out

run: 
	./a.out 

check: main.cpp $(TREE_DIR)/node.cpp
	cppcheck $^