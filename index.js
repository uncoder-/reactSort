var SortAble = React.createClass({
	render:function(){
		return (
			<div>
				<SortContainer data = {this.props.data}/>
			</div>
		)
	}
});
var SortContainer = React.createClass({
	getInitialState:function(){
		this.orginPosition = [];
		this.orginIndex = [];
		return {
			movePosition : []
		}
	},
	static:{
		/**
		 * [moveToTarget 移动元素]
		 */
		moveToTarget:function(self,items){
			var items = items;
			var orginPosition = self.orginPosition;
			var movePosition = self.state.movePosition;
			movePosition.forEach(function(item,i,array) {
				for (var j = 0; j < items.length; j++) {
					if(items[j].dataset.value == item.item){
						items[j].style.top = orginPosition[item.to].top-orginPosition[item.from].top+"px";
						items[j].style.left = orginPosition[item.to].left-orginPosition[item.from].left+"px";
					}
				}
			});
		},
	},
	handleSort:function(e){
		var e = e.target;
		
		//复制一个新的索引，防止改变原始索引
		var newIndex = new Array();
		for (var i = 0; i < this.orginIndex.length; i++) {
			newIndex[i] = (this.orginIndex[i]);
		};
		
		//对索引进行排序，排序的内容暂时只考虑数字
		switch (e.className){
			case "asc":
				newIndex.sort(function(a,b){return a-b;});
				break;
			case "desc":
				newIndex.sort(function(a,b){return b-a;});
				break;
			case "random":
				//洗牌算法，Fisher-Yates乱序算法
				newIndex.sort(function(){return Math.random()-0.5});
				break;
			case "reset": break;
			default: break;
		}
		//设置排序过后的位置数据
		var movePosition = [];
		for (var i = 0; i < newIndex.length; i++) {
			var fromTo = {};
			for(var j = 0;j < this.orginIndex.length;j++){
				if(this.orginIndex[i] == newIndex[j]){
					fromTo.item = this.orginIndex[i]; 
					fromTo.from = i;
					fromTo.to = j;
					movePosition.push(fromTo);
				}
			}
		};
		//变更状态，引发重绘
		this.setState({movePosition:movePosition});
	},
	componentDidMount:function(){
		var items = this.getDOMNode().children[1].children;
		//初始化并且获取原始数据
		for (var i = 0; i < items.length; i++) {
			var el = {};
			el.top = items[i].offsetTop;
			el.left = items[i].offsetLeft;
			//存储原始位置数据
			this.orginPosition.push(el);
			//存储原始索引数据
			this.orginIndex.push(items[i].dataset.value);
		};
		//复制一个新的索引，防止改变原始索引
		var newIndex = new Array();
		for (var i = 0; i < this.orginIndex.length; i++) {
			newIndex[i] = (this.orginIndex[i]);
		};	
		newIndex.sort(function(){return Math.random()-0.5});
		//设置排序过后的位置数据
		var movePosition = [];
		for (var i = 0; i < newIndex.length; i++) {
			var fromTo = {};
			for(var j = 0;j < this.orginIndex.length;j++){
				if(this.orginIndex[i] == newIndex[j]){
					fromTo.item = this.orginIndex[i]; 
					fromTo.from = i;
					fromTo.to = j;
					movePosition.push(fromTo);
				}
			}
		};
		this.setState({movePosition:movePosition});
	},
	shouldComponentUpdate:function(){
		var items = this.getDOMNode().children[1].children;
		this.static.moveToTarget(this,items);
	
		//console.log("当数据变化时重绘，和此功能关系,我们这里无需重绘，返回false即可");
		return false;
	},
	render:function(){
		//console.log("渲染");
		var Nodes = this.props.data.map(function(item){
			return (
				<div className="item" data-value={item.value}>{item.text}</div>
			)
		});
		return (
			<div>
				<div className="control" onClick={this.handleSort}>
					<button className="asc">升序</button>
					<button className="desc">降序</button>
					<button className="random">随机</button>
					<button className="reset">还原</button>
				</div>
				<div className = "container">
					{Nodes}
				</div>
			</div>
		);
	}
});
var data = [{value:0,text:0},{value:14,text:14},{value:2,text:2},{value:26,text:26},{value:67,text:67},{value:89,text:89},{value:30,text:30},{value:11,text:11},{value:12,text:18},{value:18,text:12},{value:25,text:25},{value:29,text:29},{value:120,text:120},{value:219,text:219},{value:10,text:10}];
React.render(<SortAble data = {data}/>,document.body);