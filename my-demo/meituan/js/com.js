// ActionScript Document

	
//获取到页面的距离
function getPos(obj)
{
	var top=0;
	var left=0;
	while(obj)
	{
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
	return {top:top,left:left};
}	
//补0
function toDub(n)
{
	return n<10 ? '0'+n : n+'';
}
	
//选项卡
function tab(oParent)
{
	var aBtn = getByClass(oParent,'j-btn');
	var aDiv = getByClass(oParent,'j-box');
	
	for(var i=0; i<aBtn.length; i++)
	{
		(function(index){
			var timer=null;
			aBtn[i].onmouseover = aDiv[index].onmouseover = function(){
				clearTimeout(timer);
				timer=setTimeout(function(){
					aBtn[index].className= 'active j-btn';
					aDiv[index].className='j-box active';
				},100);
			};
			aBtn[i].onmouseout = aDiv[index].onmouseout= function(){
				clearTimeout(timer);
				timer= setTimeout(function(){
					for(var i=0; i<aBtn.length; i++)
					{
						aBtn[i].className='j-btn';
						aDiv[i].className='j-box';
					}	
				},100);
					
			};
		})(i);
	}
}


//通过class名获取元素  获取出来的是一组元素
function getByClass(oParent,sName)
{
	
	if(oParent.getElementsByClassName)  //相当于函数
	{
		return oParent.getElementsByClassName(sName);
	}
	else
	{
		var aChild =oParent.getElementsByTagName('*');
		var aRes =[];
		for(var i=0; i<aChild.length; i++)
		{
			var ojb = aChild[i];
			var str = ojb.className;
			var arr = str.split(' ');
			
			for(var j=0; j<arr.length; j++)
			{
				arr[j]==sName && aRes.push(ojb);
			}
		
		}
		return aRes;
	}
}	