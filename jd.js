var imgList=document.querySelectorAll('#main_main #dd #thumb img');
for(var i=0; i<imgList.length;i++){
	imgList[i].onmouseover=toggle;
}
function toggle(){
	var hovered=document.querySelector('.redBorder');
	if(this!=hovered){
		hovered.removeAttribute('class','redBorder');
		hovered.className='transBorder';
	}
	this.className='redBorder';
	//修改小图对应的大图
	var hoveredImgSrc=this.src;
	var dot=hoveredImgSrc.lastIndexOf('.');
	var preStr=hoveredImgSrc.substring(0,dot);
	var lastStr=hoveredImgSrc.substring(dot);
	var strSrc=preStr+'-m'+lastStr;
	var imagem=document.getElementById('image-m');
	imagem.src=strSrc;

}
//如果imgAcount>4右箭头点一次counter++
//当counter==1;左箭头变亮
//thumb左移64px；
//当counter==imgAmount-4;右箭头变灰，不能点了
var counter=0;
document.querySelector('#right').onclick=function(){
	var imgAmount=imgList.length;
	if(imgList.length<4||this.className=='rightDisabled'){
		return;
	}
	counter++;
	if(counter>=1){
		var leftArrow=document.querySelector('#left');
		leftArrow.className='left';
	}
	document.querySelector('#thumb span').style.left=-64*counter+'px';
	if(counter==imgAmount-4){
		var rightArrow=document.querySelector('#right');
		this.className='rightDisabled';
	}
}
//左箭头点一次counter--
//只要点一次，右箭头变亮
//thumb右移64px;
//当counter==0,左箭头变灰
document.querySelector('#left').onclick=function(){
	if(counter==0){
		return;
	}
	var rightArrow=document.querySelector('#right');
	rightArrow.className='right';
	counter--;
	document.querySelector('#thumb span').style.left=-64*counter+'px';
	if(counter==0){
		var leftArrow=document.querySelector('#left');
		leftArrow.className='leftDisabled';
	}
}

//在中图上移动时，黄色遮罩层出现
//在最上层覆盖一层透明的div来确定位置
//通过left,top确定黄色遮罩层的位置
document.getElementById('maskTop').onmouseover=function(){
	document.getElementById('mask').style.display='block';
	document.getElementById('largeImgContainer').style.display='block';
}
document.getElementById('maskTop').onmouseout=function(){
	document.getElementById('mask').style.display='none';
	document.getElementById('largeImgContainer').style.display='none';
}
document.getElementById('maskTop').onmousemove=function(event){
	var x=event.offsetX;
	var y=event.offsetY;
	var mask=document.getElementById('mask');
	var w=mask.offsetWidth;
	var h=mask.offsetHeight;
	var left=0;
	var top=0;
	left=x<w/2?0:(x-w/2);
	if(x>(this.offsetWidth-w/2)){
		left=this.offsetWidth-w;
	}
	mask.style.left=left+'px';
	top=y<h/2?0:y-h/2;
	if(y>this.offsetHeight-h/2){
		top=this.offsetHeight-h;
	}
	mask.style.top=top+'px';

	var largeImg=document.querySelector('#largeImgContainer img');
	largeImg.src='images/loading.gif';
	var mediumImgSrc=document.querySelector('#dt img').src;
	var dot=mediumImgSrc.lastIndexOf('.');
	var preStr=mediumImgSrc.substring(0,dot-2);
	var lastStr=mediumImgSrc.substring(dot);
	var strSrc=preStr+'-l'+lastStr;
	largeImg.src=strSrc;

	var largeContainerWidth=w*largeImg.width/this.offsetWidth;
	var largeContainerHeight=h*largeImg.height/this.offsetHeight;
	var largeImgContainer=document.querySelector('#largeImgContainer');
	largeImgContainer.style.width=largeContainerWidth+'px';
	largeImgContainer.style.height=largeContainerHeight+'px';

	var largeLeft=-left*largeImg.width/this.offsetWidth;
	var largeTop=-top*largeImg.height/this.offsetHeight;
	largeImg.style.left=largeLeft+'px';
	largeImg.style.top=largeTop+'px';
}
//右侧的放大图
//改大图的src
//先得到大图的宽和高
//