# knapsack problem
#w =50
# wt= [10,20,30]
# val = [60,100,120]

# n= len(val)

# memo ={}


def knapsack(W, wt, val, n=None, memo=None):
    if n == None:
        n = len(val)
    if memo ==  None:
        memo = {}
        
    if  n==0:
        return 0
    if (n,W) in memo:
        return memo[(n,W)]
    
    if wt[n-1]<=W:
        yes = val[n-1] + knapsack(W-wt[n-1], wt, val,n-1,memo)
        no = knapsack(W, wt, val, n-1,memo)
        memo[(n,W)] = max(yes,no)
        return memo[(n,W)]
    
    if wt[n-1]> W:
        memo[(n,W)] = knapsack(W-wt[n-1], wt, val,n-1,memo)
        return memo[(n,W)]
print(knapsack(50 , [10,20,30] , [60,100,120]))