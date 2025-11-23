CC = g++
CC_FLAGS = -std=c++11 -Wall -Wextra -pedantic

BIN = bin

all: $(BIN)/main.out 

# Main program
$(BIN)/main.out: main.cpp
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) main.cpp  -o $(BIN)/main.out

check:
	cppcheck main.cpp

clean:
	rm -rf $(BIN)