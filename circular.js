window.onload=function(){
	var ball1=new Ball(600,400,30,"rgb(100,200,200)",{x:600,y:400},0);
	var ball2=new Ball(600,100,20,"rgb(100,200,200)",ball1,1);
	var ball3=new Ball(600,100,15,"rgb(100,200,200)",ball2,5,100);
}
var tool={
	getdistance:function(p1,p2){
		return Math.sqrt(Math.pow((p1[0]-p2[0]),2)+Math.pow((p1[1]-p2[1]),2));
	}
}


function Ball(x,y,r,color,center,speed,R){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	this.x=x;
	this.y=y;
	this.r=r;
	this.speed=speed;
	this.R=0;
	this.a=0;
	this.center=center;
	this.color=color;
	this.render=function(){
		drawMath.circle(context,this.x,this.y,this.color,this.r);
	};
	this.circular=function(){
		var centercoord=[center.x,center.y];
		console.log(this.R);
		var This=this;
		drawMath.clear(context,this.x,this.y,this.r);
		this.a=this.a+Math.PI/360*this.speed;
		this.x=this.R*Math.cos(this.a)+center.x;
		this.y=this.R*Math.sin(this.a)+center.y;
		this.render();
		circular=window.requestAnimationFrame(function(){This.circular()});
	};
	this.init=(function(This){
		This.R=tool.getdistance([This.x,This.y],[This.center.x,This.center.y]);
		if(R){
			This.R=R;
		}
		This.render();
		This.circular();
	})(this);
}

var drawMath={
	clear:function(context,x,y,r){
		context.clearRect(x-r-1,y-r-1,2*r+2,2*r+2);
	},
	circle:function(context,x,y,color,r){
		context.beginPath();
		context.arc(x,y,r,0,2*Math.PI);
		context.fillStyle=color;
		context.fill();
	},
	line:function(context,x,y,length,width,color){
		context.beginPath();
		context.moveTo(x,y);
		context.lineTo(x,y+length);
		context.lineWidth=width;
		context.strokeStyle=color;
		context.stroke();
	}
}
