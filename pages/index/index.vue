<template>
	<view>

		<cNavList></cNavList>

		<c-swiper></c-swiper>

		<view class="ind_seach flex pdlr4  flexRowBetween">
			<view class="sqr_name">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="classLis" range-key="name">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
				</view>
				<image class="arrow" src="../../static/images/home-icon1.png"></image>
			</view>
			<view class="seachInput flex">
				<input type="text" v-model="title" placeholder="请输入你需要的工种" placeholder-style="color:#999" />
				<button class="Btn" type="submint" 
				@click="Router.navigateTo({route:{path:'/pages/seachWorker/seachWorker?parent_id='+parent_id+'&title='+title}})"></button>
			</view>
		</view>

		<view class="ind-cont4">
			<scroll-view class="list" scroll-x>
				<view class="item" v-for="(item,index) in classLis" :key="index" @click="Router.navigateTo({route:{path:'/pages/classify/classify?id='+item.id+'&name='+item.name}})">
					<image :src="item.iconUrl" mode=""></image>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
		</view>

		<view class="f5H10"></view>

		<view class="ind_cont5">
			<view class="flexRowBetween">
				<view class="item" @click="Router.redirectTo({route:{path:'/pages/indexDesign/indexDesign'}})">
					<image :src="labelData.mainImg&&labelData.mainImg[0]?labelData.mainImg[0].url:''" mode=""></image>
					<view class="tit">优秀设计师</view>
				</view>
				<view class="item" @click="Router.redirectTo({route:{path:'/pages/indexWorker/indexWorker'}})">
					<image :src="labelData.mainImg&&labelData.mainImg[1]?labelData.mainImg[1].url:''" mode=""></image>
					<view class="tit">优秀工人</view>
				</view>
			</view>
		</view>
		<view class="f5H10"></view>


		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">推荐商品</view>
			<view class="more">更多&gt;</view>
		</view>
		<view class="proLis flexRowBetween">
			<view class="item-lis" v-for="(item,index) in mainData" :key="index" 
			@click="Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail?id='+item.id+'&type='+item.type}})">
				<image class="img" :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" alt="" />
				<view class="tit avoidOverflow">{{item.title}}</view>
				<view class="price">{{item.price}}</view>
			</view>
		</view>

		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">特价辅料</view>
		</view>
		<view class="tejiaBox">
			<scroll-view class="scrollX" scroll-x>
				<view class="item-lis" v-for="(item,index) in specialData" :key="index" @click="Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail'}})">
					<image class="img" :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" alt="" />
					<view class="tit avoidOverflow">{{item.title}}</view>
					<view class="price">{{item.price}}</view>
				</view>
			</scroll-view>
		</view>

		<!--底部tab键-->
		<view class="navbar">
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<view class="nav_img">
					<image src="../../static/images/nabar1-a.png" />
				</view>
				<view class="text this-text">首页</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/needs/needs'}})" >
				<view class="nav_img">
					<image src="../../static/images/nabar2.png" />
				</view>
				<view class="text">发需求</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/car/car'}})" >
				<view class="nav_img">
					<image src="../../static/images/nabar3.png" />
				</view>
				<view class="text">购物车</view>
			</view>
			<view class="navbar_item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<view class="nav_img">
					<image src="../../static/images/nabar4.png" />
				</view>
				<view class="text">我的</view>
			</view>
		</view>
		<!--底部tab键 end-->
	
	</view>

</template>

<script>
	import cSwiper from "@/components/swiper/swiper.vue";
	import cNavList from "@/components/navList/navList.vue"

	export default {
		components: {
			cSwiper,
			cNavList
		},
		data() {
			return {
				Router: this.$Router,
				index: 0,
				title:'',
				parent_id:4,
				classLis: [{
						iconUrl: "../../static/images/home-icon3.png",
						name: "建筑工",
						id: 4
					},
					{
						iconUrl: "../../static/images/home-icon4.png",
						name: "装修工",
						id: 5
					},
					{
						iconUrl: "../../static/images/home-icon5.png",
						name: "维修工",
						id: 6
					},
					{
						iconUrl: "../../static/images/home-icon8.png",
						name: "安装工",
						id: 10
					},
					{
						iconUrl: "../../static/images/home-icon6.png",
						name: "园林工",
						id: 8
					},
					{
						iconUrl: "../../static/images/home-icon7.png",
						name: "市政工",
						id: 9
					},
					{
						iconUrl: "../../static/images/home-icon9.png",
						name: "其他",
						id: 11
					}
				],
				produtList: [{}, {}, {}, {}],
				mainData: [],
				specialData: [],
				array: ['建筑工', '装修工', '维修工','安装工', '园林工', '市政工',  '其他'],
				labelData:[]
			}
		},

		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData', 'getSpecialData','getLabelData'], self);
		},
		methods: {
			
			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id:2,
					title:'首页背景图'
				};
				
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData = res.info.data[0]
					}
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},

			bindPickerChange(e) {
				// 搜索选择分类
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.parent_id = this.classLis[this.index].id;
			},

			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.paginate = {
					count: 0,
					currentPage: 1,
					is_page: true,
					pagesize: 4
				}
				postData.searchItem = {
					type: 4,
					category_id: ['not in', [46]]
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},

			getSpecialData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.searchItem = {
					type: 4,
					category_id: ['in', [46]]
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.specialData.push.apply(self.specialData, res.info.data);
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getSpecialData');
				};
				self.$apis.productGet(postData, callback);
			},
		}
	};
</script>

<style>
	
	@import "../../assets/style/index.css";
	@import "../../assets/style/tejiaBox.css";
	@import "../../assets/style/navbar.css";

	page {
		padding-bottom: 140rpx;
	}
	.ind_cont5{padding: 30rpx 4%;}
	.ind_cont5 .item{width: 330rpx;height: 200rpx;overflow: hidden;position: relative;border-radius: 8rpx;}
	.ind_cont5 .item image{width: 100%;height: 100%;}
	.ind_cont5 .item .tit{position: absolute;top: 0;right: 0;left: 0;bottom: 0;background: rgba(0,0,0,0.4);color: #fff;display: flex;justify-content: center;align-items: center;font-size: 28rpx;}
</style>
