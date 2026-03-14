data TTTree a
  = Empty
  | TwoNode (TTTree a) a (TTTree a)
  | ThreeNode (TTTree a) a (TTTree a) a (TTTree a)
  deriving (Show, Eq, Ord)

inOrder :: TTTree a -> [a]
inOrder Empty = []
inOrder (TwoNode left v right) = inOrder left ++ [v] ++ inOrder right
inOrder (ThreeNode left v1 middle v2 right) = inOrder left ++ [v1] ++ inOrder middle ++ [v2] ++ inOrder right

height :: TTTree a -> Int
height Empty = -1
height (TwoNode left _ right) = 1 + max (height left) (height right)
height (ThreeNode left _ middle _ right) = 1 + max (height left) (max (height middle) (height right))

balance :: TTTree a -> Bool
balance Empty = True
balance (TwoNode left _ right) = height left == height right && balance left && balance right
balance (ThreeNode left _ middle _ right) = height left == height middle && height middle == height right && balance left && balance middle && balance right

sorted :: (Ord a) => [a] -> Bool
sorted [] = True
sorted [x] = True
sorted (x : xs) = (x <= head xs) && sorted xs

ordered :: (Ord a) => TTTree a -> Bool
ordered t = sorted (inOrder t)

instance Functor TTTree where
  fmap :: (a -> b) -> TTTree a -> TTTree b
  fmap f Empty = Empty
  fmap f (TwoNode left v right) = TwoNode (fmap f left) (f v) (fmap f right)
  fmap f (ThreeNode left v1 mid v2 right) = ThreeNode (fmap f left) (f v1) (fmap f mid) (f v2) (fmap f right)

main :: IO ()
main = do
  let t = TwoNode
            (ThreeNode (TwoNode Empty 1 Empty) 2 (TwoNode Empty 3 Empty) 4 (TwoNode Empty 5 Empty))
            6
            (TwoNode (TwoNode Empty 7 Empty) 8 (TwoNode Empty 9 Empty))
  print t
  print (inOrder t)
  print (height t)
  print (balance t)
  print (ordered t)
  print (fmap (\x -> x > 4) t)