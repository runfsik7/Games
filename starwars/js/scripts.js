$(document).ready(function(){
	var battleShip = $('#battleShip'),
		shipX = parseInt(battleShip.css('left')),
		shipY = parseInt(battleShip.css('top')),
		step = 4,
		bulletV = 5,
		enemyV = 5,
		bullet = '<div class=bullet>&nbsp;</div>',
		shots = parseInt($('#shots').text()),
		destr = parseInt($('#destr').text());
        level = 1;



	 setInterval(spawnEvent, 3000 / level);
	 setInterval(bulletMove, 100);
	 setInterval(enemyMove, 100 / level);
	 setInterval(shopChecker, 100);
	 $( document ).keypress(function( event ) {
	 	switch(event.which){
	 		case 97:
	 			shipAction('left')
	 		break;
	 		case 100:
	 			shipAction('right')
	 		break;
	 		case 32:
	 			shipAction('fire')
	 		break;
	 	}
	 });

	function shopChecker(){
		$( ".enemy" ).each(function() {
			var enemy = $(this);
			var enemyX = parseInt(enemy.css("left"));
	  		var enemyY = parseInt(enemy.css("top"));
			$('.bullet').each(function(){
				var bulletX = parseInt($(this).css('left'));
				var bulletY = parseInt($(this).css('top'));

				if(bulletY - 5 <= enemyY && bulletY + 1 >= enemyY){
					console.log('same Y');
					if(bulletX - 15 <= enemyX && bulletX >= enemyX ){
					console.log('shotted');
					enemy.remove();
					$(this).remove();
					destr++;
					$('#destr').text(destr);
				}
				}

			});
		});
	}

	function bulletMove(){
		$('.bullet').each(function(){
			var bulletY = parseInt($(this).css('top'));
			if(bulletY < 0 )
				$(this).remove();
			$(this).css('top', bulletY - bulletV + 'px');

		});
	}

	function enemyMove(){
		$( ".enemy" ).each(function() {
	  		var enemy = $( this );
	  		var enemyX = parseInt(enemy.css("left"));
	  		var enemyY = parseInt(enemy.css("top"));
	  		enemy.css('top', enemyY + enemyV + 'px');
	  		if(enemyY >= 500)
	  			enemy.remove();
		});
	}

	function spawnEvent() {
		$('.battleGround').append('<div class=enemy>&nbsp;</div>');
		var randomPos = Math.floor((Math.random() * 500) + 100);
		$('.enemy:last').css('left',randomPos + 'px');
	 console.log('Enemy has spotted');


	}

	function shipAction(attr){
		if(shipX <= 0 || shipX >= 600){
			console.log('Wall block');
			return false;
		}
		if(attr == 'left'){
			shipX-= step;
			battleShip.css('left',shipX + 'px');
		}else if(attr == 'right'){
			shipX+= step;
			battleShip.css('left',shipX + 'px');
		}else if(attr == 'fire'){
			$(' .battleGround ').append(bullet);
			$(' .bullet ').last().css({ left: shipX + 10 + 'px', top: shipY + 'px'});
			shots++;
			$('#shots').text(shots);
			console.log('Fire');
		}
	}

});



