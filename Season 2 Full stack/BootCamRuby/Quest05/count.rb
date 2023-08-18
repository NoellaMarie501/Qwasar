def my_count_on_it(str_arr)
    len_arr = []
    str_arr.each do |str|
      len_arr << str.chars.count
    end
    return len_arr
  end
  