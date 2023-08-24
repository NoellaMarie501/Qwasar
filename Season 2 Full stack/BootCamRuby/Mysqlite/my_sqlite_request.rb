require 'csv'

class MySqliteRequest
    def initialize
        @table_name = nil
        @columns = []
        @where_conditions = []
        @join_conditions = []
        @order_by = nil
        @order_direction = nil
        @insert_table_name = nil
        @insert_data = {}
        @update_table_name = nil
        @update_data = {}
        @delete_conditions = []
    end
  
    def from(table_name)
      @table_name = table_name
      return self
    end
  
    def select(*columns)
      @columns = columns
      self
    end
  
    def where(column_name, value)
      @where_conditions << { column_name: column_name, value: value }
      return self
      # Code for the where method here
    end
  
    def join(column_on_db_a, filename_db_b, column_on_db_b)
      @join_conditions << { column_on_db_a: column_on_db_a, filename_db_b: filename_db_b, column_on_db_b: column_on_db_b }
      return self
      # Code for the join method here
    end
  
    def order(order, column_name)
      @order_by = column_name
      @order_direction = order
      self
      # Code for the order method here
    end
  
    def insert(table_name)
      @table_name = table_name
      self
      # Code for the insert method here
    end
  
    def values(data)
      @insert_data = data
      CSV.open(@table_name, 'a') do |csv|
        csv << @insert_data.values
      end
    end
  
    def update(table_name)
      @update_table_name = table_name
      self
    end
  
    def set(data)
      @update_data = data
      CSV.open(@update_table_name, 'r+') do |csv|#opening dile in read and wite mode
        #column = data.keys.first
        headers = csv.first
        @update_data.each do |key, value|
          index = headers.index(key)
          csv.each do |row|
            if row[0] != headers && match_conditions?(row)#checking if the value at row index matches where condition
              row[index] = value
            end
          end
        end
        csv.rewind#place the file pointer to the beginning of the file since it is initially at the bottom when using open 
        csv.write(headers)#rewrite all the headers of the file into the file again to ensure it is updated succesfully
        csv.each do |row|# rewrite the rows of the file 
          csv.write(row)
        end
      end
    end
  
    def delete
      CSV.open(@table_name, 'r+') do |csv|
        headers = csv.first
        csv.rewind
        csv.write(headers)
        csv.each do |row|
          if row[0] != headers && match_conditions?(row)
            csv.delete(row)
          end
        end
      end
      self
    end

    def match_conditions?(row)
      @where_conditions.each do |condition|
        index = headers.index(condition[:column_name])
        if row[index] != condition[:value]
          return false
        end
      end
      true
    end
  
    def run
      result = nil
    
      if @table_name.nil?
        raise "No table specified"
      end
    
      if @columns.empty?
        @columns = ["*"]
      end
    
      result = from(@table_name)
      result = select(*@columns)
      result = where(@where_conditions[:column_name], @where_conditions[:value]) if @where_conditions.any?
      result = join(@join_conditions[:column_on_db_a],@join_conditions[:column_name],@join_conditions[:column_on_db_b]) if @join_conditions.any?
      result = order(@order_direction, @order_by) if @order_by
      result = insert(@insert_table_name) if @insert_table_name
      result = values(@insert_data) if @insert_data.any?
      result = update(@update_table_name) if @update_table_name
      result = set(@update_data) if @update_data.any?
      result = delete if @delete_conditions.any?
    
     puts result
    end    
  end
  



request = MySqliteRequest.new()
# request = request.insert(data.csv)
# request = request.values
request = request.from('data.csv')
request = request.select("name")
request = request.where('year_start', '2018')
request.run

  