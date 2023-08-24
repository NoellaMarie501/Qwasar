require 'csv'

class MySqliteRequest
  # ... existing code ...

  def run
        if @table_name.nil?
        raise "No table specified"
        end

        if @columns.empty?
        @columns = ["*"]
        end

        query = "SELECT #{@columns.join(", ")} FROM #{@table_name}"

        if !@where_conditions.empty?
        where_clause = @where_conditions.map do |condition|
            "#{condition[:column_name]} = '#{condition[:value]}'"
        end.join(" AND ")
        query += " WHERE #{where_clause}"
        end

        if !@join_conditions.empty?
        join_clause = @join_conditions.map do |condition|
            "JOIN #{condition[:filename_db_b]} ON #{@table_name}.#{condition[:column_on_db_a]} = #{condition[:filename_db_b]}.#{condition[:column_on_db_b]}"
        end.join(" ")
        query += " #{join_clause}"
        end

        if @order_by
        query += " ORDER BY #{@order_by}"
        if @order_direction
            query += " #{@order_direction}"
        end
        end

        if @insert_table_name
        query = "INSERT INTO #{@insert_table_name} (#{insert_data.keys.join(", ")}) VALUES (#{insert_data.values.map{|v| "'#{v}'"}.join(", ")})"
        end

        if @update_table_name
        set_clause = @update_data.map do |key, value|
            "#{key} = '#{value}'"
        end.join(", ")
        query = "UPDATE #{@update_table_name} SET #{set_clause}"
        if !@where_conditions.empty?
            where_clause = @where_conditions.map do |condition|
            "#{condition[:column_name]} = '#{condition[:value]}'"
            end.join(" AND ")
            query += " WHERE #{where_clause}"
        end
        end

        if @delete_conditions.any?
        where_clause = @delete_conditions.map do |condition|
            "#{condition[:column_name]} = '#{condition[:value]}'"
        end.join(" AND ")
        query = "DELETE FROM #{@table_name} WHERE #{where_clause}"
        end

        CSV.foreach(@table_name, headers: true) do |row|
        puts row.inspect
        end
  end
end
