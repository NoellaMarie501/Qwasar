require 'csv'
require 'json'

def my_data_transform(data)
  csv_data = data.join("\n")
  CSV.parse(csv_data, headers: true).map(&:to_h)
end

def my_data_process(data)
  data = my_data_transform(data)
  columns = data.first.keys - ["FirstName", "LastName", "UserName", "Coffee Quantity"]
  result = {}
  columns.each do |column|
    result[column] = Hash.new(0)
    data.each do |row|
      result[column][row[column]] += 1
    end
  end
  result.to_json
end

puts my_data_process(["Gender,FirstName,LastName,UserName,Email,Age,City,Device,Coffee Quantity,Order At", "Male,Carl,Wilderman,carl,yahoo.com,21->40,Seattle,Safari iPhone,2,afternoon", "Male,Marvin,Lind,marvin,hotmail.com,66->99,Detroit,Chrome Android,2,afternoon", "Female,Shanelle,Marquardt,shanelle,hotmail.com,21->40,Las Vegas,Chrome,1,afternoon", "Female,Lavonne,Romaguera,lavonne,yahoo.com,66->99,Seattle,Chrome,2,morning", "Male,Derick,McLaughlin,derick,hotmail.com,41->65,Chicago,Chrome Android,1,afternoon"])