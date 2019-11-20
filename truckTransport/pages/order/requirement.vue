<template>
	<view class="content">
		<view class="ui-divide-bar"></view>
		<checkbox-group class="ui-list" @change="checkboxChange">
			<label class="ui-list-item" v-for="(item, index) in order.attach" :key="item.attach_id">
				<view class="ui-list-item-container">
					<view class="ui-list-text" v-if="item.attach_type === 0">
						{{ item.attach_title + '(' + (parserFloat(item.attach_price) == 0 ? item.attach_remark : item.attach_price) + '元)' }}
					</view>
					<view class="ui-list-text" v-if="item.attach_type === 1">
						{{ item.attach_title + '(' + (parserFloat(item.attach_price_rate) == 0 ? item.attach_remark : ('订单总额的'+(parserFloat(item.attach_price_rate)*100)) + '%)' }}
					</view>
					<view class="ui-select-icon"><checkbox :value="String(index)" :checked="item.status" color="#FF5723" /></view>
				</view>
			</label>
		</checkbox-group>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['order']),
	data() {
		return {
			is_change: false,
			attach_index: []
		};
	},
	onLoad() {
		for (let i = 0; i < this.order.attach.length; i++) {
			if (this.order.attach[i].status) {
				this.attach_index.push(i);
			}
		}
	},
	onBackPress(e) {
		this.$fire.fire('order_attach_des', { is_change: this.is_change, attach_index: this.attach_index });
	},
	methods: {
		checkboxChange: function(e) {
			let that = this;
			that.is_change = true;
			this.attach_index = e.detail.value;
		}
	}
};
</script>

<style>
.content {
	background: #fff;
}
.ui-list {
	margin-top: 20upx;
	padding: 0 30upx;
}
.ui-list-item-container {
	display: flex;
	line-height: 92upx;
	font-size: 14px;
}
.ui-list-text {
	flex: 1;
}
.ui-list-item:after {
	content: '';
	display: block;
	height: 1px;
	transform: scaleY(0.5);
	background: #ddd;
}
.ui-list-item.active .ui-select-icon {
	display: inline-block;
}
</style>
