<template>
	<view class="classifyBox">
		<view class="classifyCont" style="padding-top: 30rpx;">
			<view class="class_leftNav" style="top: 120rpx;">
				<view class="cont">
					<view class="child" 
					v-for="(item,index) in labelData.child" :class="chooseId==item.id?'on':''" 
					@click="change(item.id)">{{item.title}}</view>
					
				</view>
			</view>
			<view class="class_rightCont">
				<view class="class_sketch" 
				>
					<view class="item boxShaow" v-for="(item,index) in mainData" :key="index" 
					@click="Router.navigateTo({route:{path:'/pages/indexDesign_classify_sketchDetail/indexDesign_classify_sketchDetail?id='+item.id}})">
						<view class="photo">
							<image :src="item.mainImg[0].url" mode=""></image>
						</view>
						<view class="lable">{{item.label[item.menu_id].title}}</view>
						<view class="cont">
							<view class="text avoidOverflow">{{item.title}}</view>
							<view class="name">{{item.description}}</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currIndex: 0,
				Router: this.$Router,
				num: 1,
				curr: 1,
				sketchData: [{}, {}, {}, {}],
				labelData: {},
				mainData:[],
				chooseId:0
			}
		},
	
		
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getLabelData'], self);
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

			change(id) {
				const self = this;
				if (id != self.chooseId) {
					self.chooseId = id
					self.getMainData(true)
				}
			},

			getLabelData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.searchItem = {
					title: '效果图',
					type: 1
				};
				postData.getAfter = {
					child: {
						order: {
							create_time: 'asc'
						},
						tableName: 'Label',
						middleKey: 'id',
						key: 'parentid',
						condition: '=',
						searchItem: {
							status: 1,
							type: 1
						}
					}
				};
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.labelData = res.info.data[0];
						if (self.labelData.child.length > 0) {
							self.chooseId = self.labelData.child[0].id
							self.getMainData()
						}
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getLabelData');

				};
				self.$apis.labelGet(postData, callback);
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
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id:self.chooseId
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了', 'none');
					};
					console.log('self.mainData', self.mainData)
					
				};
				self.$apis.articleGet(postData, callback);
			},

		},
	};
</script>
<style>
	@import "../../assets/style/index.css";

	page {
		padding-bottom: 100rpx;
		background: #f5f5f5;
	}
</style>
