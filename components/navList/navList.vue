<template>
	<view>
		<scroll-view class="navLisBox" scroll-x>
			<!-- 点击导航选中当前项 -->
			<view class="nav-item " :class="num==1?'active':''" @click="Router.switchTab({route:{path:'/pages/index/index'}})">热门</view>
			<view class="nav-item" :class="num==2?'active':''" @click="Router.redirectTo({route:{path:'/pages/indexDesign/indexDesign'}})">设计</view>
			<view class="nav-item" :class="num==3?'active':''" @click="Router.redirectTo({route:{path:'/pages/indexWorker/indexWorker'}})">工人</view>
			<view class="nav-item" :class="num==4?'active':''"  @click="Router.redirectTo({route:{path:'/pages/material/material'}})">材料</view>
			<view class="nav-item" :class="num==5?'active':''"  @click="Router.redirectTo({route:{path:'/pages/houseShow/houseShow'}})">房源展示</view>
			<view class="nav-item" :class="num==6?'active':''"  @click="Router.redirectTo({route:{path:'/pages/interactive/interactive'}})">互动</view>
			<view class="nav-item" :class="num==7?'active':''"  @click="Router.redirectTo({route:{path:'/pages/supervision/supervision'}})">监理</view>
			<view class="nav-item" :class="num==8?'active':''"  @click="Router.redirectTo({route:{path:'/pages/college/college'}})">学院</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {
				currIndex: 0,
				Router:this.$Router,
				num:1
			};
		},
		mounted() {
			// 导航当前项
			const self = this;
			var pages = getCurrentPages();
			var page = pages[pages.length - 1].route;
			console.log('222',page)
			if(page=='pages/index/index'){
				self.num=1
			}else if(page=='pages/indexDesign/indexDesign'){
				self.num=2
			}else if(page=='pages/indexWorker/indexWorker'){
				self.num=3
			}else if(page=='pages/material/material'){
				self.num=4
			}else if(page=='pages/houseShow/houseShow'){
				self.num=5
			}else if(page=='pages/interactive/interactive'){
				self.num=6
			}else if(page=='pages/supervision/supervision'){
				self.num=7
			}else if(page=='pages/college/college'){
				self.num=8
			}
		},
		
		methods: {
			change(num){
				const self = this;
				if(num!=self.num){
					self.num = num
				}
			}
		}
	}
</script>
<style>
	
	.navLisBox{ white-space: nowrap; padding:20rpx 10rpx;}
	.nav-item{line-height: 44rpx; font-size: 28rpx; display: inline-block;margin: 0 26rpx;}
	.nav-item.active{ border-bottom: 6rpx solid #FFCB1E;}
	
</style>

