// JavaScript Document
window.onload = function(){
	
	//选项卡调用
	var aTab = getByClass(document,'j-tab');
	for(var i=0; i<aTab.length; i++)
	{
		tab(aTab[i]);
	}
	var aAd = getByClass(document,'ad')[0];
	//广告延时关闭
	aAd && (function(){
		
		var timer=null; //全局
		var closeBtn = document.getElementById('closeAd');
		timer=setTimeout(function(){
			aAd.style.display='none';	
		},5000);
		aAd.onmouseover=function(){
			clearTimeout(timer);	
		};
		aAd.onmouseout=function(){
			timer=setTimeout(function(){
				aAd.style.display='none';	
			},3000);	
		};
		closeBtn.onclick = function(){
			aAd.style.display='none';	
		};	
	})();	
	
	//点击改变内容
	(function(){
		var ochoice = getByClass(document,'choice')[0];
		var aEm = ochoice.getElementsByTagName('em');
		var oDiv = ochoice.getElementsByTagName('div')[0];
		aEm[1].onclick = function(){
			var sTem = aEm[0].innerHTML;
			aEm[0].innerHTML = this.innerHTML;
			this.innerHTML=sTem;
			oDiv.className='j-box';
		};
	})();
	//搜索框js
	var oSearchBtn = document.getElementById('searchBtn');
	var oTxt = document.getElementById('txt');
	//改变搜索框内容
	(function(){
		
		oSearchBtn.onclick = oTxt.onfocus = function(){
			oSearchBtn.style.display='none';	
			oTxt.focus();
		};
		var oDiv = getByClass(document,'option-list')[0];	
		var aList = oDiv.getElementsByTagName('a');
		
		for(var i=0; i<aList.length; i++)
		{
			aList[i].onclick = function(){
				oSearchBtn.innerHTML=this.innerHTML;	
			};
		}
		oTxt.onblur = function(){
			if(oTxt.value=='')
			{
				oSearchBtn.style.display='block';
			}	
		};
	})();
	
	//自动播放选项卡
	var aShow = getByClass(document,'j-show');
	var oUl = getByClass(document,'hot-food');
	for(var i=0; i<aShow.length; i++)
	{
		aShow[i].onmouseover= function(){
			this.className = 'active j-show';
		};
		aShow[i].onmouseout= function(){
			this.className = ' j-show';
		};
	}
	function showNext (index,num,x,s)
	{
		var aNext = getByClass(aShow[index],'next');
		var aPrev = getByClass(aShow[index],'prev');
		var oUl = getByClass(aShow[index],'j-ul')[0];
		var n=0;
		var timer=null;
		timer=setInterval(function(){
			next();	
		},s);
		
		aNext[0].onclick =function(){
			clearInterval(timer);
			next();
		}; 
		
		function next(){
			n++;
			if(n>x)
			{
				n=0;
			}
			oUl.style.left= -num*n+'px';
			x==1 ? aNext[0].innerHTML='' : aNext[0].innerHTML = n+1+'/'+(x+1);
		};
		aPrev[0].onclick = function(){
			clearInterval(timer);
			n--;
			if(n<0)
			{
				n=x;
			}	
			oUl.style.left= -num*n+'px';
			x==1 ? aNext[0].innerHTML='' : aNext[0].innerHTML = n+1+'/'+(x+1);
		};
			
	}
	//自动播放选项卡结束
	//调用
	showNext(0,708,2,3000);
	showNext(1,186,1,2000);
	showNext(2,1170,2,5000);
	//页面侧边栏的js效果
	(function(){
		var aH3 = getByClass(document,'m-bg');
		var oSideBar = getByClass(document,'side-bar')[0];
		var arr=[];
		for(var i=0; i<aH3.length; i++)
		{
			arr.push(getPos(aH3[i]).top);
		}
		//获取滚动距离  侧边框
		window.onscroll=function(){
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;	
			if(scrollTop>arr[0])
			{
				oSideBar.style.position='fixed';
				oSideBar.style.top=0+'px';
			}
			else
			{
				oSideBar.style.top=arr[0]+'px';
				oSideBar.style.position='absolute';
			}
			//问题 去不掉上面的
			for(var i=0; i<arr.length; i++)
			{
				if(scrollTop>arr[i])
				{
					oSideBar.children[i].className='active';  
				}
				else
				{
					oSideBar.children[i].className='';	
				}
				
			}
		};
	})();
	
	tick();
	setInterval(tick,1000);
	//倒计时
	function tick()
	{
		var oDate = new Date();
		var str=toDub(oDate.getHours())+toDub(oDate.getMinutes())+toDub(oDate.getSeconds());
		var oTime = getByClass(document,'last-time')[0];
		var aSpanTimg = oTime.getElementsByTagName('span'); 		
		for(var i=1; i<aSpanTimg.length; i++)
		{
			aSpanTimg[i].innerHTML = str.charAt(i-1);
		}
	}
};