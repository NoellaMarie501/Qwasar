def count_different_characters(str1, str2)
    # Check if the strings have the same size
    return -1 if str1.length != str2.length
  
    # Initialize the counter
    count = 0
  
    # Iterate over the characters in the strings
    str1.length.times do |i|
      count += 1 if str1[i] != str2[i]
    end
  
    return count
  end
  