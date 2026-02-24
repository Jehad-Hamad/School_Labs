# CS3860 Lab 4

Implements `chunkIt` — splits a range of integers into chunks of size `n` — in three languages: C++, Haskell, and Smalltalk.

---

## main.cpp (C++)

**Compile & Run:**
```bash
g++ main.cpp -o main
./main
```

**Prompts:**
```
Enter chunk size: 3
Enter range (start end): 1 9
```

**Output:**
```
[[1,2,3],[4,5,6],[7,8,9]]
```

---

## main.hs (Haskell)

Contains two functions — load in GHCi to use them interactively.

**Run:**
```bash
ghci main.hs
```

**`chunkIt` — splits a list into chunks of size n:**
```haskell
chunkIt 3 [1..9]
-- [[1,2,3],[4,5,6],[7,8,9]]
```

**`firstLoc` — returns the index of the first occurrence of a value (-1 if not found):**
```haskell
firstLoc 5 [1..9]
-- 4

firstLoc 99 [1..9]
-- -1
```

---

## partTwo.hs (Haskell — Hill Cipher)

Implements a Hill cipher encrypt/decrypt using a 3×3 key matrix.

**Run:**
```bash
ghci partTwo.hs
```

**Encrypt — `cipherMsg`:**
```haskell
key = threeXn [6, 24, 1, 13, 16, 10, 20, 17, 15]
cipheredMsg = cipherMsg key "SELLITNOW"
-- "HSVRTRUPW"
```

**Decrypt — `deCipherMsg`:**
```haskell
inverseKey = threeXn [8, 5, 10, 21, 8, 21, 21, 12, 8]
deCipherMsg inverseKey cipheredMsg
-- "SELLITNOW"
```

---

## main.st (Smalltalk)

**Run with GNU Smalltalk:**
```bash
gst main.st
```

**Prompts:**
```
How much do you want to chunk by? 3

Enter range
Start: 1
End: 9
```

**Output:**
```
[[1,2,3],[4,5,6],[7,8,9]]
```
