noel = {"name"=>"Don Ackerman", "year_start"=>"1950", "year_end"=>"1957", "position"=>"G", "height"=>"6-0", "weight"=>"183", "birth_date"=>"September 4, 1930", "college"=>"Long Island University"}
me = {"name"=>"Forest Able", "year_start"=>"1957", "year_end"=>"4563", "position"=>"G", "height"=>"6-3", "weight"=>"180", "birth_date"=>"July 27, 1932", "college"=>"Western Kentucky University"}

puts noel.merge(me) { |key, old_value, new_value| new_value }