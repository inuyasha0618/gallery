var container  = document.getElementById('container'),
	list = document.getElementById('list'),
	buttons = document.getElementById('buttons').getElementsByTagName('span'),
	prev = document.getElementById('prev'),
	next = document.getElementById('next'),
	btnIndex = 0,
	animating = false,
	timer;

function showDot(index){
	for(var i = 0; i < buttons.length; i++){
		if(buttons[i].className == 'on'){
			buttons[i].className = '';
			break;
		}
	}
	buttons[index].className = 'on';
}

function animate(to){
    animating = true;
	var distance = to - parseInt(list.style.left),
    durantion = 300,
    interval = 10,
    distancePerStep = distance/(durantion/interval);
    function go(){
    	if((distancePerStep < 0 && parseInt(list.style.left) > to) || (distancePerStep >0 && parseInt(list.style.left) < to)){
    		list.style.left = parseInt(list.style.left) + distancePerStep + 'px';
    		setTimeout(go,interval);
    	}
    	else{
    		list.style.left = to + 'px';
    		if(parseInt(list.style.left) == 0){
    			list.style.left = '-3000px';
    		}else if(parseInt(list.style.left) == -3600){
    			list.style.left = '-600px';
    		}
    		animating = false;
    	}
    }
    go();
}

function play(){
	timer = setInterval(next.onclick,3000);
}

function stop(){
	clearInterval(timer)
}

next.onclick = function(){
	if(animating)
		return;
	animate(parseInt(list.style.left) - 600);
	if(btnIndex == 4){
		btnIndex = 0;
	}else{
		btnIndex++;
	}
	showDot(btnIndex);
}

prev.onclick = function(){
	if(animating)
		return;
	animate(parseInt(list.style.left) + 600);
	if(btnIndex == 0){
		btnIndex = 4;
	}else{
		btnIndex--;
	}
	showDot(btnIndex);
}

for(var i = 0; i < buttons.length; i++){
	buttons[i].onclick = function(){
		if(this.className == 'on') return;
		var targetIndex = parseInt(this.getAttribute('index'));
		animate(-600 * targetIndex);
		showDot(targetIndex - 1);

	}
}

container.onmouseover = function(){
	stop();
}

container.onmouseout = function(){
	play();
}

play();
