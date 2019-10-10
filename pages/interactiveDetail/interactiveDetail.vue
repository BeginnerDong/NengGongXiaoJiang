<template>
	<view>
		<view class="interct_idexLis" style="border-radius: 0;">
			<view class="child">
				<view class="flex">
					<view class="photo"><image :src="originData.mainImg&&originData.mainImg[0]?originData.mainImg[0]:''" mode=""></image></view>
					<view class="name">
						<view class="font13">{{originData.title}}</view>
						<view class="time">{{originData.create_time}}</view>
					</view>
				</view>
				<view class="text font13">{{originData.content}}</view>
				<view class="imgbox">
					<view v-for="item in originData.bannerImg" 
					:class="originData.bannerImg.length==1?'lisOne':(originData.bannerImg.length==2?'lisTwo':'lisThree')">
						<image :src="item" mode=""></image>
					</view>
				</view>
				<view class="label">
					<view class="lis">
						<image src="../../static/images/home-interactive-icon3.png" mode=""></image>
						<view>{{originData.view_count}}</view>
					</view>
					<view class="lis">
						<image src="../../static/images/home-interactive-icon2.png" mode=""></image>
						<view>{{originData.reply.count}}</view>
					</view>
					<view class="lis" @click="Utils.stopMultiClick(clickGood)">
						<image src="../../static/images/home-interactive-icon4.png" mode=""></image>
						<view>{{originData.like.count}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5H10"></view>
		
		<view class="interct_pllis">
			<view class="child"  v-for="(item,index) in mainData" :key="index">
				<view class="flexRowBetween">
					<view class="name flex">
						<image class="photo" :src="item.mainImg[0]" mode=""></image>
						<view>{{item.title}}</view>
					</view>
					<view class="date color3 font12">{{item.create_time}}</view>
				</view>
				<view class="text">{{item.content}}</view>
			</view>
		</view>
		
		<view class="openMore" v-if="!isAll">展开更多 <image class="icon" src="../../static/images/workers-icon2.png"></image></view>
		
		<view class="interDtFixd flexRowBetween">
			<input type="text" value="" placeholder="说点什么" v-model="content"/>
			<button class="sendBtn" style="font-size:14px;background-color:none"
			open-type="getUserInfo"  @getuserinfo="Utils.stopMultiClick(submit)">发送</button>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				Utils:this.$Utils,
				content:'',
				originData:{},
				mainData:[],
				isAll:false,
				isFirst:true
			}
		},

		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getOriginData'], self);
		},

		methods: {
			
			getOriginData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					id:self.id
				};
				postData.getAfter = {
					likeMe: {
						tableName: 'Log',
						searchItem: {
							status:1,
							type:1,
							user_no:wx.getStorageSync('user_info').user_no
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
					},
					like: {
						tableName: 'Log',
						searchItem: {
							status:1,
							type:1
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
						compute:{
						  
						  count:[
						    'count',
						    'count',
						    {
						      status:1,
						    }
						  ]
						},
					},
					reply: {
						tableName: 'Message',
						searchItem: {
							status:1,
							type:3
						},
						middleKey: 'id',
						key: 'relation_id',
						condition: 'in',
						compute:{
						  
						  count:[
						    'count',
						    'count',
						    {
						      status:1,
						    }
						  ]
						},
					},
				};
				postData.saveFunction = [{
					FuncName: 'viewMessage',
					searchItem:{
						id:self.id
					}
				}];
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.originData = res.info.data[0];
						self.isFirst = false;
						self.getMainData(true)
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getOriginData');
				};
				self.$apis.messageGet(postData, callback);
			},
			
			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						is_page: true,
						pagesize: 5
					}
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: 2,
					user_type:0,
					type:3,
					relation_id:self.originData.id,
					relation_table:'message'
				};		
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}else{
						self.isAll = true
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.messageGet(postData, callback);
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);			
				if(self.content!=''){
					var pass = true
				};	
				if (pass) {								
					const callback = (user, res) => {
						self.mainImg = [];
						self.title = user.nickName;
						self.mainImg.push(user.avatarUrl);
						self.messageAdd();
						console.log('user',user)
						console.log('res',res)
					};
					self.$Utils.getAuthSetting(callback);
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('评论不能为空', 'none')
				};
			},
			
			messageAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				if(!wx.getStorageSync('user_info')||!wx.getStorageSync('user_info').headImgUrl){
					postData.refreshToken = true;
				};
				postData.data = {
					type:3,
					relation_id:self.originData.id,
					title:self.title,
					mainImg:self.mainImg,
					content:self.content,
					relation_table:'message'
				};
				console.log('postData',postData)
				
				const callback = (data) => {				
					if (data.solely_code == 100000) {					
						self.$Utils.showToast('评论成功', 'none');
						
						self.getOriginData()
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.messageAdd(postData, callback);
			},
			
			clickGood(e) {
				const self = this;
				uni.setStorageSync('canClick', false);	
				if (self.originData.likeMe.length == 0) {
					self.addGoodLog()
				} else {
					self.updateGoodLog()
				};
			},
			
			addGoodLog() {
				const self = this;
				const postData = {};
				postData.data = {
					type: 1,
					title: '点赞成功',
					relation_id: self.id,
					relation_table:'Message',
					user_no: wx.getStorageSync('info').user_no,
				};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.originData.likeMe.push({
							status: 1,
							id: res.info.id
						});
						self.originData.like.count = self.originData.like.count+1
						self.$Utils.showToast('点赞成功', 'none', 1000)
						console.log('self.originData',self.originData)
					} else {
						self.$Utils.showToast('点赞失败', 'none', 1000)
					};
					uni.setStorageSync('canClick', true);	
				};
				self.$apis.logAdd(postData, callback);
			},
			
			
			updateGoodLog() {
				const self = this;
			
				const postData = {
					searchItem: {
						id: self.originData.likeMe[0].id
						
					},
					data: {
						status: -self.originData.likeMe[0].status
					}
				};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res.solely_code == 100000) {
						self.originData.likeMe[0].status = -self.originData.likeMe[0].status;
						if(self.originData.likeMe[0].status==1){
							self.originData.like.count = self.originData.like.count+1
							self.$Utils.showToast('点赞成功', 'none', 1000)
						}else{
							self.originData.like.count = self.originData.like.count-1
							self.$Utils.showToast('取消成功', 'none', 1000)
						}
					} else {
						self.$Utils.showToast(res.msg, 'none', 1000)
					};
					self.setData({
						web_shopData: self.data.shopData
					})
			
				};
				self.$apis.logUpdate(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";

	page {
		padding-bottom: 140rpx;
	}
	.interct_idexLis .imgbox .lisThree{width: 210rpx; height: 210rpx;}
	
</style>
