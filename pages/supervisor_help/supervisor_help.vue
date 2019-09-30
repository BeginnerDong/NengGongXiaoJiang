<template>
	<view>
		
		<view class="tooling_indNav">
			<view class="list">
				<view class="item" :class="num==1?'on':''" @click="change('1')">佣金抽取规则</view>
				<view class="item" :class="num==2?'on':''" @click="change('2')">监理入驻规则</view>
			</view>
		</view>
		<view class="guizebox pdlr4" v-if="num==1">
			<view class="texbox">
				<view class="tit">{{artData.title}}</view>
				<view class="content ql-editor" v-html="artData.content">
				</view>
			</view>
		</view>
		<view class="guizebox pdlr4" v-if="num==2">
			<view class="texbox">
				<view class="tit">{{artDataOne.title}}</view>
				<view class="content ql-editor" v-html="artDataOne.content">
				</view>
			</view>
		</view>
		
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				artData:{},
				artDataOne:{},
				num:1
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getArtData','getArtOneData'], self);
		},
		methods: {
			change(num){
				const self = this;
				if(num!= self.num){
					self.num = num
				}
			},
			
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
							title: ['=', ['佣金抽取规则']],
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
			
			getArtOneData() {
				const self = this;			
				const postData = {};	
				postData.searchItem = {
					thirdapp_id:2,
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['监理入驻规则']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.artDataOne = res.info.data[0];
						const regex = new RegExp('<img', 'gi');
						self.artDataOne.content = self.artDataOne.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					console.log('self.artDataOne',self.artDataOne)
					self.$Utils.finishFunc('getArtOneData');
				};
				self.$apis.articleGet(postData, callback);
			},

		},
	};
</script>

<style>
	@import "../../assets/style/user.css";
	.tooling_indNav .list .item{width: 50%; color: #222;}
	.guizebox .texbox{font-size: 28rpx; line-height: 46rpx;padding: 30rpx 0; color: #666;}
	.guizebox .texbox .tit{font-size: 30rpx;color:#222;}
	.guizebox .texbox view{padding-bottom: 20rpx;}

</style>
