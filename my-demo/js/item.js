window.onload = function(){
	/*存储分界线距离来比较滚动距离*/
	var aLine = getByClass(document,'line1');
	var aTop=[];
	var bFlag= true;
	var n2=0;
	var n3=0;
	/*轮播图的定时器*/
	var timer=null;
	/*轮播图*/
	;(function(){
		
		var oUl = getByClass(document,'carousel-list')[0];
		var oBox=oUl.parentNode.parentNode;
		oUl.innerHTML+=oUl.innerHTML;
		var aLi = oUl.children;
		var oOl = getByClass(document,'carousel-btn')[0];
		var aBtn = oOl.children;
		var W=aLi[0].offsetWidth;
		var now=0;
		
		oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
		var timer=null;
		for(var i=0; i<aBtn.length; i++)
		{
			(function(index){
				aBtn[i].onclick=function(){
					for(var i=0; i<aBtn.length; i++)
					{
						aBtn[i].className='';
					}
					this.className='active';
					move(oUl,{left:-index*W},{
						duration:300	
					});
					now=index;
				};
			})(i);
		}
		oBox.onmouseover=function(){
			clearInterval(timer);	
		};
		oBox.onmouseout=function(){
			timer=setInterval(next,3000);
		};
		timer=setInterval(next,3000);
		
		function next(){
			
			now++;
			for(var i=0; i<aBtn.length; i++)
			{
				aBtn[i].className='';
			}
			var l=oUl.offsetLeft;
			if(l<=-oUl.offsetWidth/2 ){
				l=0;
				now=0;
				oUl.style.left=l+'px';
				
			}
			move(oUl,{left:-now*W});
			if(now==7)
			{
				aBtn[0].className='active';
			}
			else
			{
				aBtn[now].className='active';
			}
			
		}
	})();
	for(var i=0; i<aLine.length;i++)
	{
		aTop.push(aLine[i].offsetTop);
	}
	/*背景图片变换*/
	var Row=5;
	var Col=8;
	var W=document.documentElement.clientWidth;
	var H=document.documentElement.clientHeight;
	var width=W/Col;
	var height=H/Row;
	
	var bgBox=document.getElementById('bgBox');
	
	var aSpan=[];
	for (var r=0; r<Row; r++)
	{
		for (var c=0; c<Col; c++)
		{
			var oSpan=document.createElement('span');
			oSpan.style.position='absolute';
			oSpan.style.width=width+'px';
			oSpan.style.height=height+'px';
			var left=c*width;
			var top=r*height;
			
			oSpan.style.left=left+'px';
			oSpan.style.top=top+'px';
			oSpan.style.backgroundSize=('100%*'+Col)+' '+('100%*'+Row);
			oSpan.style.backgroundPosition='-'+left+'px -'+top+'px';
			bgBox.appendChild(oSpan);
			aSpan.push(oSpan);
		}
	}
	var aPath=['#00BFFF','#AB82FF','#FFC1C1','#FF6EB4','#00FA9A'];
	function bgNext(now)
	{
		
		for (var i=0; i<aSpan.length; i++)
		{
			aSpan[i].style.opacity=0;
			aSpan[i].style.background=aPath[now];
		}
		var n=0; // 第几个
		var timer=setInterval(function (){
			(function (index){
				move(aSpan[n], {opacity:1}, {
					duration:300,
					complete:function (){
						if (index == aSpan.length-1)
						{
							bgBox.style.background=aPath[now];
						}
					}
				});
			})(n);
			
			n++;
			if (n == aSpan.length)
			{
				clearInterval(timer);
			}
		}, 30);
	}
	/*导航滑块*/
	(function(){
		var oUl = document.getElementById('nav');
		var aLi = oUl.getElementsByTagName('li');
		for(var i=0; i<aLi.length; i++)
		{
			hover(aLi[i]);
		}
		/*导航点击*/
		for(var i=0; i<aLi.length-1; i++)
		{
			(function (index){
				aLi[i].onclick=function(){
					if(index==0)
					{
						moveScroll(0,300)
					}
					else
					{
						moveScroll(aTop[index-1],300)	
					}
					bgNext(index);
				};
			})(i);
		}
	})();
	/*滚动条运动函数*/
	function moveScroll(target, time)
	{
		var start=document.documentElement.scrollTop || document.body.scrollTop;
		var dis=target-start;
		var count=Math.floor(time/30);
		var n=0;
		
		clearInterval(timer);
		timer=setInterval(function (){
			//userScroll=false;
			n++;	
			var cur=start+dis*n/count;
			// 先
			document.body.scrollTop=cur;
			document.documentElement.scrollTop=cur;
			
			if (n == count)
			{
				clearInterval(timer);
			}
		}, 30);
	}
	/*获取页面滚动距离*/
	/*导航侧边栏*/
	;(function(win){
		win.oSideBar = getByClass(document,'side-bar')[0];
		var aNavList=oSideBar.children;
		var oLi=getByClass(oSideBar,'moveBox')[0];
		var iNow=0;
		for(var i=0; i<aNavList.length; i++)
		{
			(function (index){
				aNavList[i].onclick=function(){
					if(index==0)
					{
						moveScroll(0,300)
					}
					else if(index==aNavList.length-1)
					{
						
					}
					else
					{
						moveScroll(aTop[index-1],300)	
					}
					bgNext(index);
					iNow=index;
				};
				aNavList[i].onmouseover=function(){
					startMove(oLi,this.offsetTop);
				};
				aNavList[i].onmouseout=function(){
					startMove(oLi,aNavList[0].offsetHeight*iNow);
				};
			})(i);
		}
	})(window);
	window.onscroll=function(){
		scrollTop=document.documentElement.scrollTop || document.body.scrollTop;	
		if(scrollTop>=aTop[2]-300 && scrollTop<aTop[3])
		{
			/*小球在可视区*/
			bFlag = false;
			next();
			profileShow();
		}
		else
		{
			bFlag = true;
		}
		if(scrollTop>aTop[1]-300)
		{
			n2++;
			if(n2==1)
			{
				skillShow();	
			}
		}
		if(scrollTop>=aTop[0]-300)
		{
			n3++;
			if(n3==1)
			{
				showWorksList();	
			}
			move(oSideBar,{opacity:1},{duration:2000});
		}
		else
		{
			move(oSideBar,{opacity:0});
		}
		
	};
	/*作品集拖拽*/
	;(function(){
		var oWorks = document.getElementById('works');
		var aLi = oWorks.children;
		var zIndex=1;
		/*布局转换*/
		var aPos=[];
		for(var i=0; i<aLi.length; i++)
		{
			aPos.push({
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop	
			});
		}	
		for(var i=0; i<aLi.length;i++)
		{
			aLi[i].index=i;
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0;
		}
		for(var i=0; i<aLi.length; i++)
		{
			aLi[i].style.left=0;
			aLi[i].style.top=0;
			aLi[i].style.height=0;
			aLi[i].style.width=0;
		}
		window.showWorksList=function(){
			var n=aLi.length-1;
			var timer=setInterval(function(){
				move(aLi[n],{
					left:aPos[n].left,
					top:aPos[n].top,
					width:150,
					height:150	
				});
				n--;
				if(n==-1)
				{
					clearInterval(timer);
				}
			},200);
		};
		/*拖拽*/
		for(var i=0; i<aLi.length; i++)
		{
			drag(aLi[i]);
		}
		function drag(obj)
		{
			obj.onmousedown=function(ev){
				obj.style.zIndex=zIndex++;
				var oEvent=ev || event;
				var oNear=null;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function(ev){
					var oEvent = ev || event;
					var left = oEvent.clientX-disX;
					var top = oEvent.clientY-disY;
					setStyle(obj,{left:left,top:top});
					oNear = findNear(obj,aLi);
					if(oNear)
					{
						if(oNear && oNear!=obj){
							var n=obj.index;
							var m=oNear.index;

							if(n<m){
								for(var i=0; i<aLi.length; i++){
									if(aLi[i].index>=n+1 && aLi[i].index<=m){
										aLi[i].index--;
										move(aLi[i],aPos[aLi[i].index]);
									}
								}
								obj.index=m;
							}else{
								for(var i=0; i<aLi.length; i++){
									if(aLi[i].index>=m && aLi[i].index<=n-1){
										aLi[i].index++;
										move(aLi[i],aPos[aLi[i].index]);
									}
								}
								obj.index=m;
							}
						}
						
					}
				
				};
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					/*交换位置*/	
					
					move(obj,aPos[obj.index]);
					obj.releaseCapture && obj.releaseCapture();
				};
				obj.setCapture && obj.setCapture();
				return false;
			};	
			
		}	
		/*计算两个物体间距离*/
		function getDis(obj1,obj2)
		{
			var a = obj1.offsetLeft+obj1.offsetWidth/2-aPos[obj2.index].left-obj2.offsetWidth/2;
			var b = obj1.offsetTop+obj1.offsetHeight/2-aPos[obj2.index].top-obj2.offsetHeight/2;
			return Math.sqrt(a*a+b*b);
		}
		/*碰撞检测*/
		function collTest(obj1,obj2)
		{
			var l1 = obj1.offsetLeft;
			var r1 = l1+obj1.offsetWidth;
			var t1 = obj1.offsetTop;
			var b1 = t1+obj1.offsetHeight;
			
			var l2=aPos[obj2.index].left;
			var r2=aPos[obj2.index].left+obj2.offsetWidth;
			var t2=aPos[obj2.index].top;
			var b2=aPos[obj2.index].top+obj2.offsetHeight;
			if(l2>r1 || l1>r2 || t2>b1 || t1>b2)
			{
				return false;
			}
			else
			{
				return true;	
			}
		}
		/*找最近*/
		function findNear(obj,aLi)
		{
			var nMin = 9999;
			var nMinIndex = -1;
			for(var i=0; i<aLi.length; i++)
			{
				
				if(collTest(obj,aLi[i])) //发生碰撞了
				{
					var dis = getDis(obj,aLi[i]);  //计算碰撞了的距离
					if(dis<nMin)
					{
						nMin=dis;
						nMinIndex =i;
					}
				}
				
			}
			if(nMinIndex == -1)
			{
				return null;
			}
			else
			{
				return aLi[nMinIndex];
			}
		}
	})();
	/*自由运动的小球*/
	;(function(){
		var oDiv = getByClass(document,'move-boll')[0];
		var oBoll = oDiv.children[0];	
		var maxLeft = oDiv.offsetWidth-oBoll.offsetWidth;
		var maxTop = oDiv.offsetHeight-oBoll.offsetHeight;
		window.next=function()
		{	
			var aPos={
				left:rnd(0,maxLeft),top:rnd(0,maxTop)	
			};	
			move(oBoll,aPos,{
				complete:function(){
					if(bFlag)return;
					next();
				}	
			});
		}
	})();
	/*skills预加载效果*/
	function skillShow()
	{
		var oDiv1 = document.getElementById('left-box');
		var oDiv2 = document.getElementById('right-box');
		move(oDiv1,{left:0},{
			easing:Tween.Elastic.easeOut,
		});	
		move(oDiv2,{top:50},{
			easing:Tween.Elastic.easeOut,
		});	
	}
	function profileShow()
	{
		var oDiv = getByClass(document,'profile-msg')[0];
		move(oDiv,{left:0},{
			easing:Tween.Elastic.easeOut,
		});	
	}
	/*bilibili*/
	;(function(){
		var oOl=getByClass(document,'works-msg')[0];
		var aLi = oOl.children;
		for(var i=0; i<aLi.length;i++)
		{
			aLi[i].onmouseover=function(){
				this.className='active';	
			};
			aLi[i].onmouseout=function(){
				for(var i=0; i<aLi.length;i++)
				{
					aLi[i].className='';
				}
			};
		}
	})();
	
	/*侧边栏弹性运动*/
	;(function(win){
		var iSpeed=0;
		var timer=null;
		var top=0;
		win.startMove=function (obj,target){
			clearInterval(timer);
			timer=setInterval(function(){
	
				iSpeed+=(target-top)/5;
				iSpeed*=0.7;
	
				top+=iSpeed;
	
				obj.style.top=top+'px';
	
				if(Math.round(iSpeed)==0 && Math.round(top)==target){
					clearInterval(timer);
				}
	
			},30);
		}
	})(window);
};