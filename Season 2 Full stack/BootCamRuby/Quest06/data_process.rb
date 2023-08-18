require 'json'

def my_data_process(csv_arr)
  # Split the CSV array into an array of rows
  rows = csv_arr.map { |row| row.split(",") }

  # Get the column names from the first row
  columns = rows.shift.map(&:strip)

  # Initialize the result hash of hash
  result = {}
  columns.each { |column| result[column] = {} }

  # Count the occurrences of each value for each column
  rows.each do |row|
    columns.each_with_index do |column, index|
      value = row[index].strip
      result[column][value] ||= 0
      result[column][value] += 1
    end
  end

  # Convert the result hash of hash to a JSON string
  json_str = JSON.generate(result)

  return json_str
end

puts my_data_process(["Gender,FirstName,LastName,UserName,Email,Age,City,Device,Coffee Quantity,Order At", "Male,Carl,Wilderman,carl,yahoo.com,21->40,Seattle,Safari iPhone,2,afternoon", "Male,Marvin,Lind,marvin,hotmail.com,66->99,Detroit,Chrome Android,2,afternoon", "Female,Shanelle,Marquardt,shanelle,hotmail.com,21->40,Las Vegas,Chrome,1,afternoon", "Female,Lavonne,Romaguera,lavonne,yahoo.com,66->99,Seattle,Chrome,2,morning", "Male,Derick,McLaughlin,derick,hotmail.com,41->65,Chicago,Chrome Android,1,afternoon"])