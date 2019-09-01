<template>
  <div class="">
    <button @click="pre">pre</button>
    <button @click="next">next</button>
    <input type="text" v-model="titleKeyword">
    <button @click="search">search</button>
    <div>
      
    <table>
      <th>
        <td>index</td>
        <td>title</td>
      </th>
      <tr v-for="(blog, index) in listBlogs.items" :key="blog.id">
        <td>{{index}}</td>
        <td @click="selectedTitle(index)">{{blog.title}}</td>
      </tr>
    </table>
    </div>
    
    <div style="border: 1px solid black;margin-top: 14px">
      selected blog
      <ul v-if="getBlog != null">
        <li style="display:block">{{getBlog.title}}</li>
        <li style="display:block">{{getBlog.content}}</li>
        <li style="display:block">{{getBlog.rating}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {listBlogs} from "@/graphql/queryBlog";
import {getBlog} from "@/graphql/queryBlog";

export default {
  name: "HelloWorld",
  data() {
    return {
      limit: 5,
      selectedId: '1',
      previousBlogs: new Array(),
      titleKeyword: '',
      titleFilter: {title: {contains: null} },
      searchFilter: null,
      getBlog: {},
      listBlogs: {},
      nextToken: ''
    };
  },
  methods: {
    pre(){
      //this.$apollo.queries.tagsPage.fetchMore
    },
    next() {
      this.previousBlogs.push(...this.listBlogs.items);
      this.nextToken = this.listBlogs.nextToken;
    },
    search(){
      if(this.titleKeyword == ""){
        this.searchFilter = null;
      }else{
        this.searchFilter = {title: {contains: this.titleKeyword}}
      }
    },
    selectedTitle(index){
      this.selectedId = this.listBlogs.items[index].id;
    }
  },
  apollo: {
    listBlogs: {
      query: listBlogs,
      variables() {
        return {
          filter: this.searchFilter,
          limit: this.limit,
          nextToken: this.nextToken
        };
      }
    },
    getBlog: {
      query: getBlog,
      variables(){
        return {
           id: this.selectedId
        }
      }
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
