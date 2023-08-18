def my_string_index(haystack, needle)
    haystack.each_char.with_index do |char, index|#It uses the each_char method to iterate over each character in the haystack string, and the with_index method to keep track of the current index
      if char == needle
        return index
      end
    end
    return -1
  end
  

haystack = "hello"
needle = "l"
index = my_string_index(haystack, needle)
puts index
