def my_array_uniq(int_arr)
    new_arr = []
    int_arr.each do |num|
      if !new_arr.include?(num)
        new_arr << num
      end
    end
    return new_arr
  end
  