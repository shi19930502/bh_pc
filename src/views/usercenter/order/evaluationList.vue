<template>
	<div id="evaluationList">
		<shop-header />
		<!--搜索-->
		<shop-search :isStore="true" />

		<!--主体-->
		<section class="shop-content">
			<div class="shop-product flex flex-x-between min-width">
				<div class="left">
					<shop-category />
				</div>
				<div class="right">
					<div class="top flex flex-x-between flex-y-center">
						<p>信用评分<span style="color: #FF541F;">{{totalScore}}分</span></p>
						<p>{{productDataCount}}条</p>
					</div>
					<template v-if="reviewList.length>0">
						<ul class="datalist">
							<li class="flex" v-for="d in reviewList">
								<div class="datalistleft flex flex-y-center">
									<div class="headimg">
										<img src="../../../../static/img/mine_icon_toux@2x.png"/>
									</div>
									<p>{{d.reviewPersonName}}</p>
								</div>
								<div class="datalistright">
									<el-rate v-model="d.totalScore" disabled></el-rate>
									<p>{{d.reviewContent}}</p>
									<p class="time">{{d.reviewDate}}</p>
								</div>
							</li>
						</ul>
						<div class="flex flex-x-end" style="margin: 20px 0;">
							<el-pagination background small layout="total,prev, pager, next" :total="productDataCount" @current-change="handleCurrentChange">
							</el-pagination>
						</div>
					</template>
					<div v-else class=" flex flex-x-center flex-y-center" style="height: 444px;color: #d1d1d1;">
						<div>
							<img src="../../../../static/img/my_default_img.png" />
							<p class="tac">暂无评价</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<shop-footer />

	</div>
</template>
<script>
	import ShopTop from '../../components/header.vue'
	import ShopFooter from '../../components/footer.vue'
	import btn from '../../components/shopbtn.vue'
	import Search from '../../components/search.vue'
	import Category from '../../components/category.vue'

	import { Badge, Dialog, Table, TableColumn, InputNumber, Rate, Input, Pagination } from 'element-ui'
	import mixin from '../../../utils/mixin.js'
	export default {
		mixins: [mixin],
		components: {
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,
			[btn.name]: btn,
			[Search.name]: Search,
			[Category.name]: Category,
			// element component
			[Badge.name]: Badge,
			[Dialog.name]: Dialog,
			[Table.name]: Table,
			[TableColumn.name]: TableColumn,
			[InputNumber.name]: InputNumber,
			[Rate.name]: Rate,
			[Input.name]: Input,
			[Pagination.name]: Pagination,

		},
		data() {
			return {
				value1: 5,
				productDataCount: 0,
				pageNum: 1,
				pageSize: 10,
				reviewList: [],
				totalScore: 0
			}
		},
		created() {
			this.storeId = this.$route.query.storeId
			this.queryReviewlistByStore()
		},
		mounted() {

		},
		methods: {
			queryReviewlistByStore() {
				this.postRequest('store/queryReviewlistByStore', {
					id: this.storeId
				}).then(d => {
					if(d && d.data.state == 0) {
						if(d.data.aaData && d.data.aaData.length > 0) {
							var totalScore = 0
							for(var item of d.data.aaData) {
								totalScore += item.totalScore / 20
								item.totalScore = parseInt(item.totalScore / 20)
								item.reviewPersonName = `${item.reviewPersonName.slice(0,1)}******${item.reviewPersonName.slice(item.reviewPersonName.length-1,item.reviewPersonName.length)}`
							}
							this.productDataCount = d.data.dataCount
							this.totalScore = (totalScore / d.data.aaData.length).toFixed(1)
							this.reviewList = d.data.aaData
						}
					}
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val
				//				this.getProductList()
			},
		}
	}
</script>
<style lang="scss">
	#evaluationList {
		.shop-content {
			width: 100%;
			background: #F1F1F1;
			.shop-product {
				.left {
					background: #fff;
					width: 200px;
					height: 530px;
					overflow-y: auto;
				}
				.right {
					width: 970px;
					.top {
						margin-top: 20px;
						height: 40px;
						background: #fff;
						p {
							padding: 0 15px;
							font-size: 14px;
							color: #666;
						}
					}
				}
			}
			.datalist {
				width: 100%;
				margin-top: 20px;
				li {
					border-bottom: 1px solid #ddd;
					padding-top: 10px;
					width: 100%;
					background: #fff;
					.datalistleft {
						padding-left: 20px;
						.headimg {
							width: 40px;
							height: 40px;
							border-radius: 24px;
							overflow: hidden;
							margin-right: 10px;
							img {
								width: 100%;
								height: 100%;
							}
						}
						p {
							font-size: 12px;
							color: #666;
						}
					}
					.datalistright {
						padding-left: 64px;
						padding-right: 20px;
						p {
							font-size: 14px;
							color: #333;
							margin: 10px 0;
						}
						p.time {
							font-size: 12px;
							color: #999;
						}
					}
				}
			}
		}
	}
</style>