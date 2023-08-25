request = MySqliteRequest.new()
#request = request.from('data.csv').select("name").where('position', 'G').order("name","desc").run
#request = request.update("data.csv").set({"position" => "G"}).where("name","Mahmoud Abdul-Rauf").run
request = request.from('data.csv').select.join("year_start","data1.csv","year_end").run