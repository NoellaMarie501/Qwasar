def my_size(string)
   return string.chars.count
 end





 def my_size(str)
    count = 0
    str.each_char { |char| count += 1 }
    return count
  end
  






haystack = "AbcE Fgef1"
needle = "l"
num = my_size(haystack)
puts num





