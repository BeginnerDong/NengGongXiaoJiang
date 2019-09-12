<template>
	<view>
		
		<cNavList></cNavList>
		
		<c-swiper></c-swiper>
		
		<view class="ind_seach flex pdlr4  flexRowBetween">
			<view class="sqr_name">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
				</view>
				<image class="arrow" src="../../static/images/home-icon1.png"></image>
			</view>
			<view class="seachInput flex">
				<input type="text" placeholder="请输入你需要的工种" placeholder-style="color:#999"/>
				<button class="Btn" type="submint"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/seachWorker/seachWorker'}})"></button>
			</view>
		</view>
		
		<view class="ind-cont4">
			<scroll-view class="list" scroll-x>
				<view class="item" v-for="(item,index) in classLis" :key="index"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/classify/classify'}})">
					<image :src="item.iconUrl" mode=""></image>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="f5H10"></view>
		
		<view class="ind_cont5">
			<view class="flexRowBetween">
				<view class="item" @click="webSelf.$Router.navigateTo({route:{path:'/pages/indexDesign/indexDesign'}})">
					<image src="../../static/images/home-img1.png" mode=""></image>
					<view class="tit">优秀设计师</view>
				</view>
				<view class="item"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/indexWorker/indexWorker'}})">
					<image src="../../static/images/home-img1.png" mode=""></image>
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
			<view class="item-lis" v-for="(item,index) in produtList" :key="index" @click="webSelf.$Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail'}})">
				<image class="img" src="../../static/images/home-img3.png" alt="" />
				<view class="tit avoidOverflow">名称名称名称名称名称</view>
				<view class="price">56.00</view>
			</view>
		</view>
		
		<view class="f5H10"></view>
		<view class="infor-title flexRowBetween">
			<view class="xian"></view>
			<view class="tt">特价辅料</view>
		</view>
		<view class="tejiaBox">
			<scroll-view class="scrollX" scroll-x>
				<view class="item-lis" v-for="(item,index) in produtList" :key="index" @click="webSelf.$Router.navigateTo({route:{path:'/pages/pageDetail/pageDetail'}})">
					<image class="img" src="../../static/images/home-img4.png" alt="" />
					<view class="tit avoidOverflow">名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称</view>
					<view class="price">56.00</view>
				</view>
			</scroll-view>
		</view>
		
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
				webSelf: this,
				showView: false,
				score:'',
				Router:this.$Router,
				wx_info:{},
				scrollTop: 100,
				index: 0,
				classLis:[
					{iconUrl:"../../static/images/home-icon3.png",name:"建筑工"},
					{iconUrl:"../../static/images/home-icon4.png",name:"装修工"},
					{iconUrl:"../../static/images/home-icon5.png",name:"维修工"},
					{iconUrl:"../../static/images/home-icon6.png",name:"园林工"},
					{iconUrl:"../../static/images/home-icon7.png",name:"市政工"},
					{iconUrl:"../../static/images/home-icon8.png",name:"安装工"},
					{iconUrl:"../../static/images/home-icon9.png",name:"其他"}
				],
				produtList: [
					{},{},{},{}
				],
				array:['建筑工','装修工','维修工','园林工','市政工','安装工','其他']
			}
		},
		
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			activeNav:function(index){
				const self = this;
				
			},
			bindPickerChange(e) {
				// 搜索选择分类
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';

				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.mainData = res.info.data;
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');

				};
				self.$apis.orderGet(postData, callback);
			},
		},
	};
</script>

<style>
	@import "../../assets/style/index.css";

	page {
		padding-bottom: 60rpx;
	}
	

</style>
