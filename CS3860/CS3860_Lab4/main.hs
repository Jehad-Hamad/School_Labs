-- Part 1
-- A
chunkIt :: Int -> [a] -> [[a]]
chunkIt n [] = []
chunkIt 0 xs = []
chunkIt n xs = result
  where
    result = take n xs : chunkIt n (drop n xs)

-- B
firstLoc :: (Eq a, Num b, Enum b) => a -> [a] -> b
firstLoc value xs = foldr (\(x, i) acc -> if x == value then i else acc) (-1) (zip xs [0..])