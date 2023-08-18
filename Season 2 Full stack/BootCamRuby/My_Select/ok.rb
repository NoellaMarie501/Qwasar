students = [["noel", 2022], ["marie", 2001]]

result = students.select { |student| student[0] == "noel" }

puts result.inspect
