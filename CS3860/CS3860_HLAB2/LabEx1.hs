{-
Jehad Hamad
CS3860
Lab Assigment #3
-}

--Task 1 
transp :: [[Int]] -> [[Int]]
transp [] = []
transp ([]:_) = []
transp xs = map head xs : transp(map tail xs)

-- Task 2

dotProduct :: [Int] -> [Int] -> Int
dotProduct xs ys = sum (zipWith (*) xs ys)

matMult :: [[Int]] -> [[Int]] -> [[Int]]
matMult a b = map (\rowA -> map (\colB -> dotProduct rowA colB) (transp b)) a
--Task 3
pascal :: [Int] -> [Int] 
pascal list = result
    where
        a = 0 : list
        b = list ++ [0]
        result = zipWith (+) a b


triangleR :: Int -> [Int]
triangleR 0 = [1]
triangleR x = pascal(triangleR(x-1))

pascalTriangle :: Int -> [[Int]]
pascalTriangle 0 = [[1]]
pascalTriangle x =  pascalTriangle(x-1) ++ [triangleR(x)]


--Task 4
letterNums :: [(Char, Int)]
letterNums = result
    where
        x =  ['A'..'Z'] ++ ['a'..'z'] ++ [' ']
        result =  zip x [0..]

shifter :: [Int] -> Int -> [Int]
shifter list shift = result 
    where 
        result = map (\x -> (x + shift) `mod` 53) list


stringToNum :: String -> [Int]
stringToNum str = [result | letter <- str, Just result <- [lookup letter letterNums]]

numLetters :: [(Int, Char)]
numLetters = zip [0..] (['A'..'Z'] ++ ['a'..'z'] ++ [' '])

numToString :: [Int] -> String
numToString list = result 
    where
        result = [result | char <- list, Just result <- [lookup char numLetters]]

cipher :: String -> Int -> String
cipher message shift = result 
    where 
        a = stringToNum message
        b = shifter a shift
        result = numToString b

dicipher message shift = result
    where
        a = stringToNum message
        b = shifter a (-1*shift)
        result = numToString b
