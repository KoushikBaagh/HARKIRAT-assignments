# def divideANDconquer(lst):
#     if len(lst) == 1:
#         return lst[0]
#     if not lst:
#         return None
    
#     mid = len(lst) // 2
#     left_max = divideANDconquer(lst[:mid])
#     right_max = divideANDconquer(lst[mid:])
    
#     # Return the maximum of the two halves
#     return max(left_max, right_max)
    
# # Example usage
# numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
# print(divideANDconquer(numbers))  # Output: 9


def MergeSort(lst):
    if len(lst) == 1:
        return lst
    if not lst:
        return []
    
    mid = len(lst) // 2
    low = MergeSort(lst[:mid])
    high = MergeSort(lst[mid:])
    

    return sorted(low + high)
    
# Example usage
numbers = [5,4,3,2,1]
print(MergeSort(numbers))  # Output: [1,2,3,4,5]