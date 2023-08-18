function my_spaceship(string) {
    var result = ""
    var path = string.split("")
    const Direction = {
          Up: 'up',
          Down: 'down',
          Left: 'left',
          Right: 'right'
    };
         var current_direction = Direction.Up;
         var  X = 0;
         var  Y = 0;
    path.forEach((i) => {
        
            switch(i){
                case 'L':
                    if(current_direction == Direction.Up) {
                        current_direction = Direction.Left;
                    } else if(current_direction == Direction.Left) {
                        current_direction = Direction.Down;
                    } else if(current_direction == Direction.Down) {
                        current_direction = Direction.Right;
                    } else if(current_direction == Direction.Right) {
                        current_direction = Direction.Up;
                    } 
                    break;
                case 'R':
                    if(current_direction == Direction.Up){ 
                        
                        current_direction = Direction.Right;
                    } else if(current_direction == Direction.Right) {
                        current_direction = Direction.Down;
                    } else if(current_direction == Direction.Down) {
                        current_direction = Direction.Left;
                    } else if(current_direction = Direction.Left) {
                        current_direction = Direction.Up;
                    }
                    break;
                case 'A':
                    if(current_direction == Direction.Up) {
                        Y -= 1;
                       
                    } else if(current_direction == Direction.Right) {
                        X += 1; 
                       
                    } else if(current_direction == Direction.Down) {
                        Y += 1;
                    } else if(current_direction == Direction.Left) {
                        X -= 1;
                    }
                break;
            }
    })
  
   result = `{x:  ${X} , y: ${Y}, direction: '${current_direction}'}`; 
   return result
}
 console.log(my_spaceship("RAALALL"));
 console.log(my_spaceship("AAAA"));
 console.log(my_spaceship(""));
  console.log(my_spaceship("RAARA"));