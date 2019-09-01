<template>
  <div class="">
    <button @click="pre">pre</button>
    <button @click="next">next</button>
    <input type="text" v-model="titleKeyword">
    <button @click="search">search</button>
    
    글 개수 : <input type="number" v-model="limit">
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
      <ul v-if="selectedBlog != null">
        <li style="display:block">{{selectedBlog.title}}</li>
        <li style="display:block">{{selectedBlog.content}}</li>
        <li style="display:block">{{selectedBlog.rating}}</li>
      </ul>
    </div>

    <div style="margin-top: 50px">
      블로그 글 추가<br>
      제목
      <input type="text" v-model="addedBlog.title"><br>
      본문
      <textarea v-model="addedBlog.content"></textarea><br>
      추천 점수
      <input type="number" v-model="addedBlog.rating">
    </div>

      <button @click="addBlog">추가</button>
      <button @click="editBlog">수정</button>
  </div>
</template>

<script>
import {LIST_BLOGS} from "@/graphql/queryBlog";
import EDIT_BLOG from "@/graphql/editBlog";
import ON_CREATE_BLOG from "@/graphql/onCreateBlog";
import {getBlog} from "@/graphql/queryBlog";
import createBlog from "@/graphql/createBlog"

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
      selectedBlog: {},
      nextToken: '',
      addedBlog: {
        title: '',
        content: '',
        rating: 0.0
      }
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
    },
    addBlog(){
      const newBlog = this.addedBlog;
      this.addedBlog = {
        title: '',
        content: '',
        rating: 0.0
      };
        this.$apollo.mutate({
          mutation: createBlog,
          variables: {
            title: newBlog.title,
            content: newBlog.content,
            rating: newBlog.rating,
          },
          update: (store, { data: { createBlog }}) => {
            const allBlogs = {
              query: LIST_BLOGS,
              variables: {filter: null, limit: 5, nextToken: null}
            }
            const data = store.readQuery(allBlogs)
            data.listBlogs.items.push(createBlog)
            store.writeQuery({...allBlogs, data})
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createBlog : {
              __typename: 'Blog',
              id: -1,
              title: '',
              content: '',
              approved: true,
              rating: 0
            }
          }
        }).then((data) => {
            console.log('addBLog success')
            console.log(data)
        }).catch((error) => {
          console.log(error)
        })
    },
    editBlog(){
        this.$apollo.mutate({
          mutation: EDIT_BLOG,
          variables: {
            id: this.getBlog.id,
            title: this.addedBlog.title,
            content: this.addedBlog.content,
            rating: this.addedBlog.rating,
            approved: true
          },
          update: (store, {data: {updateBlog}}) => {

          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateBlog : {
              __typename: 'Blog',
              id: -1,
              title: '',
              content: '',
              approved: true,
              rating: 0
            }
          }
        }).then((data) => {
          console.log(data)
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  apollo: {
    listBlogs: {
      query: LIST_BLOGS,
      variables() {
        return {
          filter: this.searchFilter,
          limit: this.limit,
          nextToken: this.nextToken
        };
      },
      subscribeToMore: {
        document: ON_CREATE_BLOG,
        result: (data) => { 
          console.log('subscription create blog')
          console.log(data)}
      }
    },
    selectedBlog: {
      query: getBlog,
      update(data){
        return data.getBlog
      },
      // result({data, loading, networkStatus}){
      //   this.selectedBlog = data.getBlog;
      //   this.getBlog = data.getBlog;
      //   console.log(data.getBlog)
      // },
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
a {
  color: #42b983;
}
</style>
