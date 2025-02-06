# Count the number of subset with a given differnce
arr = [1, 1, 2, 3]
diff = 1
s = sum(arr)

# Finding required subset sum (s1)
s1 = (s + diff) // 2

def CountSubsetSum(arr, s1):
    n = len(arr)
    t = [[0 for _ in range(s1 + 1)] for _ in range(n + 1)]

    # Base case: If sum is 0, there's always one subset (empty subset)
    for i in range(n + 1):
        t[i][0] = 1

    # Filling DP table
    for i in range(1, n + 1):
        for j in range(s1 + 1):
            if arr[i - 1] <= j:
                t[i][j] = t[i - 1][j] + t[i - 1][j - arr[i - 1]]
            else:
                t[i][j] = t[i - 1][j]

    return t[n][s1]

# Get the result
result = CountSubsetSum(arr, s1)
print(result)
