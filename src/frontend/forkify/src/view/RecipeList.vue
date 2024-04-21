<template>
    
    <div class="collection" v-for="recipe in results">
        <div v-on:click="emiterFunc(recipe.recipe_id)">
        <a href="#!" class="collection-item avatar list-items">
            <img :src=recipe.image_url alt="" class="circle">
            <span class="title">{{ recipe.title }}</span>
            <p>{{ recipe.publisher }} </p>
        </a>
    </div>
</div>



    <!-- Pagination -->
    <div class="card-action">
						<ul class="pagination">
							<li :class="[startPage >= 1 ? 'disabled' : '']" v-on:click="pageSelector('moveLeft')">
								<a href="#!" class="blue-text">
									<i class="material-icons">chevron_left</i>
								</a>
							</li>

							<li v-for="pageNumber in renderBtn" :key="pageNumber.name" :class="[pageNumber.name === page ? 'active blue lighten-1' : 'waves-effect']" v-on:click="pageSelector(pageNumber.name)">
								<a href="#!" :class="[pageNumber.name === page ? 'white-text' : 'blue-text']">{{ pageNumber.name }}</a>
							</li>

							<li class="waves-effect" v-on:click="pageSelector('moveRight')">
								<a href="#!" class="blue-text">
									<i class="material-icons">chevron_right</i>
								</a>
							</li>
			
						</ul>
					</div>



</template>

<script>

export default{
    data(){
        return{
                page: 1,
				pageCount: 5,
				listIndex: 1,
				totalRecords: 0,
                
                firstEle: 0,
                lastEle: 6,      
                resultsPerPage: 6,
                results: [],
        }
    },
    props:{
        arr: {
            type: Array,
            required: true
        }
    },
    mounted(){
        this.displayResults();
    },
    emits: ["emit"], // <--- add this line

        computed: {
			startPage() {
				if (this.page === 1) {
					return 1;
				} else if (this.page === this.totalPages) {
					return this.totalPages - 3;
				} else {
					return this.page - 1;
				}

			},
			renderBtn() {
				let btnList = [];
				for (let i = this.startPage; i <= Math.min((this.totalPages -1), this.startPage + 3 - 1); i++) {
					btnList.push({
						name: i,
						isDisabled: i === this.page
					});
				}

				return btnList;
			},
            totalPages(){
                return Math.ceil((this.totalRecords / this.resultsPerPage));
            }
        },
        methods:{
            pageSelector(arg) {
				if (typeof arg === 'number') {
					this.page = arg;
				} else if (arg === 'moveLeft') {
					this.page = Math.max(this.page - 1, 1);
				} else if (arg === 'moveRight') {
					this.page = Math.min(this.page + 1, this.totalPages);
				}

                this.firstEle = (this.page - 1) * this.resultsPerPage;
                this.lastEle = this.page * this.resultsPerPage;


                this.displayResults();
			},
            displayResults(){
                let vissibleArray = [];

                this.totalRecords = this.arr.length;
                if(this.lastEle < this.arr.length){
                    
                    vissibleArray = this.arr.slice(this.firstEle, this.lastEle);
                    
                    // this.currentPage += 3;
                    // this.resultsPerPage += 3;
                this.results = vissibleArray;
                }else{
                    this.Page = 1;
                    this.resultsPerPage = 6;
                alert("End of array");
}
            },
            emiterFunc(recipeId){
                this.$emit('emit', recipeId);
            }
        }
    
    
    
}

</script>

<style scoped>
    .title{
        font-weight: bold;
    }
    .list-items{
        height: 100px;
        /* margin: 100%; */
    }
</style>