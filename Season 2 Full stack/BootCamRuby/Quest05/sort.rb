def my_array_sorted(int_arr)
    ascending = true
    descending = true
  
    (int_arr.length - 1).times do |i|
      if int_arr[i] > int_arr[i + 1]
        ascending = false
      elsif int_arr[i] < int_arr[i + 1]
        descending = false
      end
    end
  
    return ascending || descending
  end

  








  def my_array_sorted(int_arr)
    sorted_arr = int_arr.sort
    return int_arr == sorted_arr || int_arr == sorted_arr.reverse
  end
  


