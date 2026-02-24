letterNum :: [(Char, Integer)]
letterNum = zip ['A' .. 'Z'] [0 ..]

stringToNum :: [Char] -> [Integer]
stringToNum str = [y | x <- str, Just y <- [lookup x letterNum]]

threeXn :: [a] -> [[a]]
threeXn [] = []
threeXn list = take 3 list : threeXn (drop 3 list)

transp :: [[a]] -> [[a]]
transp [] = []
transp ([] : _) = []
transp lists = map head lists : transp (map tail lists)

matrix :: [a] -> [[a]]
matrix list = result
  where
    lists = threeXn list
    result = transp lists

dotProduct :: (Num a) => [a] -> [a] -> a
dotProduct xs ys = sum (zipWith (*) xs ys)

matMult :: (Num b) => [[b]] -> [[b]] -> [[b]]
matMult a b = map (\rowA -> map (dotProduct rowA) (transp b)) a

modder :: (Integral a) => [[a]] -> [[a]]
modder [] = []
modder ([] : _) = []
modder lists = map (\x -> x `mod` 26) (map head lists) : modder (map tail lists)

numLetter :: [(Integer, Char)]
numLetter = zip [0 ..] ['A' .. 'Z']

numToString :: [Integer] -> String
numToString nums = [c | n <- nums, Just c <- [lookup n numLetter]]

cipherMsg :: [[Integer]] -> [Char] -> String
cipherMsg key msg = numToString flat
  where
    msgMatrix = matrix (stringToNum msg)
    ciphered = matMult key msgMatrix
    modded = modder ciphered
    flat = concat (modded)

-- Example usage:
-- cipheredMsg = cipherMsg (threeXn [6, 24, 1, 13, 16, 10, 20, 17, 15]) "SELLITNOW"

deCipherMsg :: [[Integer]] -> [Char] -> String
deCipherMsg deCipher cipherMsg = numToString flat
  where
    msg = stringToNum cipherMsg
    msgMatrix = matrix msg
    ciphered = matMult deCipher msgMatrix
    modded = modder ciphered
    flat = concat (modded)

-- Example usage:
-- deCipherMsg (threeXn [8, 5, 10, 21, 8, 21, 21, 12, 8]) cipheredMsg