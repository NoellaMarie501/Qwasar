def integer_to_roman(num)
    # Define the lookup table
    lookup = {
      1000 => "M",
      900 => "CM",
      500 => "D",
      400 => "CD",
      100 => "C",
      90 => "XC",
      50 => "L",
      40 => "XL",
      10 => "X",
      9 => "IX",
      5 => "V",
      4 => "IV",
      1 => "I"
    }
  
    # Initialize the result string
    result = ""
  
    # Iterate over the lookup table in descending order
    lookup.each do |decimal, roman|
      # Subtract the decimal value from the input integer as many times as possible
      while num >= decimal
        result += roman
        num -= decimal
      end
    end
  
    return result
  end
  


  num = 20
roman = integer_to_roman(num)
puts roman
