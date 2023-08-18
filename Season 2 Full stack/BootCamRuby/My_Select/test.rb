class MySelectQuery
  def initialize(csv_content)
    @csv_content = csv_content
    @column_names = @csv_content.lines.first.chomp.split(",")
   
    @data = @csv_content.lines[1..-1].map { |line| line.chomp.split(",") }
    
  end

  def where(column_name, value)
      column_index = @column_names.index(column_name)
      result = @data.select { |row| row[column_index] == value }
      me = result.join(',')
      return [me]
  end
end

  
csv_content = "name,year_start,year_end,position,height,weight,birth_date,college\nAlaa Abdelnaby,1991,1995,F-C,6-10,240,'June 24, 1968',Duke University\nZaid Abdul-Aziz,1969,1978,C-F,6-9,235,'April 7, 1946',Iowa State University\nKareem Abdul-Jabbar,1970,1989,C,7-2,225,'April 16, 1947','University of California, Los Angeles'\nMahmoud Abdul-Rauf,1991,2001,G,6-1,162,'March 9, 1969',Louisiana State University\n"
query = MySelectQuery.new(csv_content)
puts query.where("name", "Alaa Abdelnaby")

