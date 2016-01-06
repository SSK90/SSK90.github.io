/**
*	Set Order By strive.
*	copyright by other.
**/
//t  当前时间
//b  初始值
//c  总距离
//d  总时间
//var cur=fx(t,b,c,d)
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};
/*拉钩效果*/
function hover(obj)
{
	var oDiv = obj;
	var oSpan = oDiv.getElementsByTagName('span')[0];
	var R = oDiv.offsetHeight/2;
	oDiv.onmouseenter = function(ev){
		var oEvent = ev || event;
		var n=getN(oDiv,oEvent);
		switch(n)
		{
			case 0:
				oSpan.style.left=oDiv.offsetWidth+'px';
				oSpan.style.top =0;
				break;
			case 1:
				oSpan.style.top = oDiv.offsetHeight+'px';
				oSpan.style.left =0;
				break;
			case 2:
				oSpan.style.left=-oDiv.offsetWidth+'px';
				oSpan.style.top =0;
				break;
			case 3:
				oSpan.style.top = -oDiv.offsetHeight+'px';
				oSpan.style.left =0;
				break;
		}
		move(oSpan,{left:0,top:0},{duration:300});
	};	
	oDiv.onmouseleave = function(ev){
		var oEvent = ev || event;
		var n=getN(oDiv,oEvent);
		switch(n)
		{
			case 0:
				move(oSpan,{left:oDiv.offsetWidth,top:0},{duration:300});
				break;
			case 1:
				move(oSpan,{left:0,top:oDiv.offsetHeight},{duration:300});
				break;
			case 2:
				move(oSpan,{left:-oDiv.offsetWidth,top:0},{duration:300});
				break;
			case 3:
				move(oSpan,{left:0,top:-oDiv.offsetHeight},{duration:300});
				break;
		}
	};
	/*获取进入的位置*/
	function getN(obj,ev)
	{
		var y = obj.offsetTop+R-ev.clientY;
		var x = obj.offsetLeft+R-ev.clientX;
		var n=Math.round((d2a(Math.atan2(y, x))+180)/90)%4;
		return n;
	}
}
/*运动*/
function move(obj,json,options)
{
	
	options=options || {};
	var duration = options.duration || 1000;
	var easing = options.easing || Tween.Linear;
	
	var start={};
	var dis = {};
	for(name in json)
	{
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	var n=0; 
	var count=Math.floor(duration/30);
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(name in json)
		{
			var cur = easing(duration*n/count,start[name],dis[name],duration);
			if(name=='opacity')
			{
				obj.style[name]=cur;
			}
			else
			{
				obj.style[name]=cur+'px';	
			}
		}
		if(n==count)
		{
			clearInterval(obj.timer);
			options.complete && options.complete();
		}	
	},30);
}
/*获取生效的属性*/
function getStyle(obj,sName)
{
	return (obj.currentStyle || getComputedStyle(obj,false))[sName];
}

/*角度转换*/
function d2a(n)
{
	return n*180/Math.PI;
}
/*getByClass*/
function getByClass(obj,sClass)
{
	if(obj.getElementsByClassName)
	{
		return obj.getElementsByClassName(sClass);
	}
	else
	{
		var arr=[];
		var aEle = obj.getElementsByTagName('*');
		for(var i=0; i<aEle.length; i++)
		{
			arr1=aEle[i].className.split(/\s+/);
			if(findInArr(arr1,sClass))
			{
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}
/*findAtArr*/
function findInArr(arr,str)
{
	for(var i=0; i<arr.length; i++)
	{
		if(arr[i]==str)
		{
			return true;
		}
	}
	return false;
}
/*随机数*/
function rnd(n,m)
{
	return Math.floor(Math.random()*(m-n)+n);
}



/*获取到页面的距离*/
function getPos(obj)
{
	var left=0;
	var top=0;
	while(obj)
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:left,top:top};
}
/*批量设置样式*/
function setStyle(obj,json)
{
	for(var name in json)
	{
		obj.style[name]=json[name]+'px';
	}
}
