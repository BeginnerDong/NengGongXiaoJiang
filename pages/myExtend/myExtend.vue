<template>
	<view>
		<view class="myExtendTop">
			<view class="money">{{userData.info.balance}}</view>
			<view class="yuan">推广奖励</view>
			<view class="txBtn" @click=" Router.navigateTo({route:{path:'/pages/myCashOut/myCashOut?type=0'}})">提现</view>
			<!-- myCashOut -->
		</view>
		
		<view class="tooling_indNav">
			<view class="list">
				<view class="item" :class="num==1?'on':''" @click="change('1')">推广赏金</view>
				<view class="item" :class="num==2?'on':''" @click="change('2')">推广海报</view>
			</view>
		</view>
		
		<view class="myExtendBox1" v-if="num==1">
			<view class="item flexRowBetween" v-for="(item,index) in mainData" :key="index">
				<view class="left">{{item.create_time}}</view>
				<view class="right red">{{item.count}}</view>
			</view>
		</view>
		<view class="myExtendBox2" v-if="num==2">
			<view class="postersbox pr" @click=" Router.navigateTo({route:{path:'/pages/myExtend_starEdeem/myExtend_starEdeem?type=user'}})">
				<image class="pic" :src="artData.mainImg&&artData.mainImg[0]?artData.mainImg[0].url:''" mode=""></image>
				<view class="infor">
					<view class="red font11">{{userData.code}}</view>
					<view class="copyBtn font11">复制</view>
				</view>
				<view class="textB">《推广说明》</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				userData:{},
				num:1,
				rewardData:[
					{},{},{}
				],
				mainData:[],
				artData:{}
			}
		},
		
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserData','getArtData'], self);
		},
		
		onShow() {
			const self = this;
		
			self.mainData = [];
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		methods: {
			
			getArtData() {
				const self = this;			
				const postData = {};
			
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['推广说明']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.artData = res.info.data[0];
						const regex = new RegExp('<img', 'gi');
						self.artData.content = self.artData.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					console.log('self.artData',self.artData)
					self.$Utils.finishFunc('getArtData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			getUserData() {
				const self = this;
				console.log('852369')
				const postData = {
					searchItem:{}
				};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem.user_no = uni.getStorageSync('user_info').user_no
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getUserData');	
				};
				self.$apis.userGet(postData, callback);
			},
			
			change(num){
				const self = this;
				if(num!= self.num){
					self.num = num
				}
			},
			
			getMainData(isNew) {
				const self = this;
				console.log('852369')
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
					type:2
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData.push.apply(self.mainData,res.info.data)
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.flowLogGet(postData, callback);

			},

		},
	};
</script>

<style>
	@import "../../assets/style/tooling_indNav.css";
	@import "../../assets/style/myExtend.css";
	
	.tooling_indNav .list .item{width: 50%; color: #222;}
	

</style>
