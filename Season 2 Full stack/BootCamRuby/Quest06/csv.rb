def my_csv_to_array(csv_str, separator)
    rows = csv_str.split("\n")
    result = []
    rows.each do |row|
      columns = row.split(separator)
      result << columns
    end
    return result
  end
  