sub :: Int -> Int -> [a] -> [a]
sub a b xs = result
    where
        x = (drop a xs)
        result = take (b - a + 1) x


shuffle :: Int -> [Int]
shuffle n = result
    where
        array = [0..(2 ^ n) - 1]
        r1 = take (ceiling (fromIntegral (length array) / 2)) array 
        r2 = drop (ceiling (fromIntegral (length array) / 2)) array
        result = r2 ++ r1


at :: Int -> [Int] -> Int
at n xs = result
    where
        result = (xs !! n)


replicate :: Int -> Int -> [Int]
replicate v n = result
    where
        result = take (n) (repeat v)