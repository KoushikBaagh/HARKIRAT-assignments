# Output :- 3

def subset(arr, sum):
    n = len(arr)
    t = [[0 for _ in range(sum + 1)] for _ in range(n + 1)]
    
    for i in range(n + 1):
        for j in range(sum + 1):
            if i == 0:
                t[i][j] = 0
            if j == 0:
                t[i][j] = 1
            if i > 0 and arr[i - 1] <= j:
                t[i][j] = t[i - 1][j] + t[i - 1][j - arr[i - 1]]
            elif i > 0:
                t[i][j] = t[i - 1][j]
    
    return t[n][sum]

arr = [2, 3, 5, 6, 8, 10]
result = subset(arr, 10)
print(result)